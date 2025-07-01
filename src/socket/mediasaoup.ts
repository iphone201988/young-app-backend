/**
 * integrating mediasoup server with a node.js application
 */

/* Please follow mediasoup installation requirements */
/* https://mediasoup.org/documentation/v3/mediasoup/installation/ */

import * as mediasoup from "mediasoup";
import { DefaultEventsMap, Server } from "socket.io";
import path from "path";
import fs from "fs";
import net from "net";
import { spawn } from "child_process";

console.log("mediasoup:L::", mediasoup);

export let transportProduceAPI: any;

const useMediaSoup = async (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  // socket.io namespace (could represent a room?)
  // const connections = io.of("/mediasoup");
  let recordings = {};
  /**
   * Worker
   * |-> Router(s)
   *     |-> Producer Transport(s)
   *         |-> Producer
   *     |-> Consumer Transport(s)
   *         |-> Consumer
   **/
  let worker;
  let rooms = {}; // { roomName1: { Router, rooms: [ sicketId1, ... ] }, ...}
  let peers = {}; // { socketId1: { roomName1, socket, transports = [id1, id2,] }, producers = [id1, id2,] }, consumers = [id1, id2,], peerDetails }, ...}
  let transports = []; // [ { socketId1, roomName1, transport, consumer }, ... ]
  let producers = []; // [ { socketId1, roomName1, producer, }, ... ]
  let consumers = []; // [ { socketId1, roomName1, consumer, }, ... ]

  // STEP 1:  Create worker (so that we can create routes=> then producers and consumers on the  route)
  const createWorker = async () => {
    try {
      worker = await mediasoup.createWorker({
        // Local
        // rtcMinPort: 2000,
        // rtcMaxPort: 2020,
        // Server
        rtcMinPort: 40000,
        rtcMaxPort: 49999,
      });
      console.log(`worker pid ${worker.pid}`);

      worker.on("died", (error) => {
        // This implies something serious happened, so kill the application
        console.error("mediasoup worker has died");
        setTimeout(() => process.exit(1), 2000); // exit in 2 seconds
      });

      return worker;
    } catch (error) {
      console.log("error12454:::::", error);
    }
  };

  // We create a Worker as soon as our application starts (STEP 1)
  worker = await createWorker();

  // This is an Array of RtpCapabilities
  // https://mediasoup.org/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpCodecCapability
  // list of media codecs supported by mediasoup ...
  // https://github.com/versatica/mediasoup/blob/v3/src/supportedRtpCapabilities.ts
  const mediaCodecs = [
    {
      kind: "audio",
      mimeType: "audio/opus",
      clockRate: 48000,
      channels: 2,
    },
    {
      kind: "video",
      mimeType: "video/VP8",
      clockRate: 90000,
      parameters: {
        "x-google-start-bitrate": 1000,
      },
    },
  ];

  io.on("connection", async (socket) => {
    console.log("connected successfully", socket.id);
    // Passing id to ourselves
    socket.emit("connection-success", {
      socketId: socket.id,
    });

    const removeItems = (items, socketId, type) => {
      items.forEach((item) => {
        if (item.socketId === socket.id) {
          item[type].close();
        }
      });
      items = items.filter((item) => item.socketId !== socket.id);

      return items;
    };

    // socket.on("disconnect", () => {
    //   // do some cleanup
    //   console.log("peer disconnected");
    //   consumers = removeItems(consumers, socket.id, "consumer");
    //   producers = removeItems(producers, socket.id, "producer");
    //   transports = removeItems(transports, socket.id, "transport");

    //   const { roomName } = peers[socket.id];
    //   delete peers[socket.id];

    //   // remove socket from room
    //   rooms[roomName] = {
    //     router: rooms[roomName].router,
    //     peers: rooms[roomName].peers.filter(
    //       (socketId) => socketId !== socket.id
    //     ),
    //   };
    // });

    // socket.on("joinRoom", ({ roomName }) => {
    //   console.log("joinRoom event received", roomName);
    // });

    socket.on("disconnect", async () => {
      // do some cleanup

      try {
        console.log("peer disconnected");
        // await stopRecording(socket.id);
        consumers = removeItems(consumers, socket.id, "consumer");
        producers = removeItems(producers, socket.id, "producer");
        transports = removeItems(transports, socket.id, "transport");

        const { roomName } = peers[socket.id];
        delete peers[socket.id];

        // remove socket from room
        rooms[roomName] = {
          router: rooms[roomName].router,
          peers: rooms[roomName].peers.filter(
            (socketId) => socketId !== socket.id
          ),
        };
      } catch (error) {
        console.log("Error in disconnect event:::", error);
      }
    });

    socket.on("joinRoom", async ({ roomName }, callback) => {
      try {
        console.log("joinRoom emitted", roomName);
        // create Router if it does not exist
        // const router1 = rooms[roomName] && rooms[roomName].get('data').router || await createRoom(roomName, socket.id)
        const router1 = await createRoom(roomName, socket.id);

        const producers = isProducerExists(roomName);

        peers[socket.id] = {
          socket,
          roomName, // Name for the Router this Peer joined
          transports: [],
          producers: [],
          consumers: [],
          peerDetails: {
            name: "",
            isAdmin: false, // Is this Peer the Admin?
          },
        };

        // get Router RTP Capabilities
        const rtpCapabilities = router1.rtpCapabilities;

        console.log("rtpCapabilities:::", rtpCapabilities);
        console.log("rtpCapabilities:::", typeof callback);

        const roomProducers: any = {};
        if (producers?.length) {
          producers.forEach((producer: any) => {
            if (producer.producer.kind == "video") {
              roomProducers.videoProducer = producer.producer.id;
            } else {
              roomProducers.audioProducer = producer.producer.id;
            }
          });

          console.log("producers.length:::", producers);
        }

        // call callback from the client and send back the rtpCapabilities
        callback({
          rtpCapabilities,
          roomProducers,
        });
      } catch (error) {
        console.log("Error in joinRoom:", error);
      }
    });

    const createRoom = async (roomName, socketId) => {
      // worker.createRouter(options)
      // options = { mediaCodecs, appData }
      // mediaCodecs -> defined above
      // appData -> custom application data - we are not supplying any
      // none of the two are required
      let router1;
      let peers = [];
      if (rooms[roomName]) {
        router1 = rooms[roomName].router;
        peers = rooms[roomName].peers || [];
      } else {
        router1 = await worker.createRouter({ mediaCodecs });
      }

      console.log(`Router ID: ${router1.id}`, peers.length);

      rooms[roomName] = {
        router: router1,
        peers: [...peers, socketId],
      };

      return router1;
    };

    // socket.on('createRoom', async (callback) => {
    //   if (router === undefined) {
    //     // worker.createRouter(options)
    //     // options = { mediaCodecs, appData }
    //     // mediaCodecs -> defined above
    //     // appData -> custom application data - we are not supplying any
    //     // none of the two are required
    //     router = await worker.createRouter({ mediaCodecs, })
    //     console.log(`Router ID: ${router.id}`)
    //   }

    //   getRtpCapabilities(callback)
    // })

    // const getRtpCapabilities = (callback) => {
    //   const rtpCapabilities = router.rtpCapabilities

    //   callback({ rtpCapabilities })
    // }

    // Client emits a request to create server side Transport
    // We need to differentiate between the producer and consumer transports
    socket.on("createWebRtcTransport", async ({ consumer }, callback) => {
      try {
        console.log("Enter in createWebRtcTransport");
        // get Room Name from Peer's properties
        const roomName = peers[socket.id].roomName;

        // get Router (Room) object this peer is in based on RoomName
        const router = rooms[roomName].router;

        createWebRtcTransport(router).then(
          (transport: any) => {
            callback({
              params: {
                id: transport.id,
                iceParameters: transport.iceParameters,
                iceCandidates: transport.iceCandidates,
                dtlsParameters: transport.dtlsParameters,
              },
            });

            // add transport to Peer's properties
            addTransport(transport, roomName, consumer);
          },
          (error) => {
            console.log(error);
          }
        );
      } catch (error) {
        console.log("Error in createWebRtcTransport:", error);
      }
    });

    const addTransport = (transport: any, roomName: any, consumer: any) => {
      transports = [
        ...transports,
        { socketId: socket.id, transport, roomName, consumer },
      ];

      peers[socket.id] = {
        ...peers[socket.id],
        transports: [...peers[socket.id].transports, transport.id],
      };
    };

    const addProducer = (producer: any, roomName: any) => {
      producers = [...producers, { socketId: socket.id, producer, roomName }];

      peers[socket.id] = {
        ...peers[socket.id],
        producers: [...peers[socket.id].producers, producer.id],
      };
    };

    const addConsumer = (consumer: any, roomName: any) => {
      // add the consumer to the consumers list
      consumers = [...consumers, { socketId: socket.id, consumer, roomName }];

      // add the consumer id to the peers list
      peers[socket.id] = {
        ...peers[socket.id],

        consumers: [...peers[socket.id].consumers, consumer.id],
      };
    };

    socket.on("getProducers", (callback) => {
      //return all producer transports
      const { roomName } = peers[socket.id];

      let producerList = [];
      producers.forEach((producerData) => {
        if (
          producerData.socketId !== socket.id &&
          producerData.roomName === roomName
        ) {
          producerList = [...producerList, producerData.producer.id];
        }
      });

      // return the producer list back to the client
      callback(producerList);
    });

    const informConsumers = (roomName: any, socketId: any, id: any) => {
      console.log(`just joined, id ${id} ${roomName}, ${socketId}`);
      // A new producer just joined
      // let all consumers to consume this producer
      producers.forEach((producerData) => {
        if (
          producerData.socketId !== socketId &&
          producerData.roomName === roomName
        ) {
          const producerSocket = peers[producerData.socketId].socket;
          // use socket to send producer id to producer
          producerSocket.emit("new-producer", { producerId: id });
        }
      });
    };

    const isProducerExists = (roomName: string) => {
      console.log("total producers:::", producers);
      const rommProducers = producers.filter(
        (producerData) => producerData.roomName === roomName
      );

      console.log("producer::::::", rommProducers);

      return rommProducers.length ? rommProducers : null;
    };

    const getTransport = (socketId: any) => {
      const [producerTransport] = transports.filter(
        (transport) => transport.socketId === socketId && !transport.consumer
      );
      return producerTransport.transport;
    };

    // see client's socket.emit('transport-connect', ...)
    socket.on("transport-connect", ({ dtlsParameters }) => {
      try {
        console.log("DTLS PARAMS... ", { dtlsParameters });

        getTransport(socket.id).connect({ dtlsParameters });
      } catch (error) {
        console.log("Error in transport-conne:", error);
      }
    });

    transportProduceAPI = async ({ kind, rtpParameters }) => {
      try {
        const producer = await getTransport(socket.id).produce({
          kind,
          rtpParameters,
        });
        const { roomName } = peers[socket.id];
        addProducer(producer, roomName);

        if (kind === "video") {
          try {
            const filePath = await startRecording(
              rooms[roomName].router,
              producer,
              roomName,
              socket.id
            );
            console.log(
              `Auto-started recording for video producer: ${filePath}`
            );
          } catch (error) {
            console.error("Failed to auto-start recording:", error);
          }
        }

        console.log("Producer ID: ", producer.id, producer.kind);

        producer.on("transportclose", () => {
          console.log("transport for this producer closed ");
          producer.close();
        });

        socket.emit("parminder", producer.id);
        // Send back to the client the Producer's id

        return producer.id;
      } catch (error) {
        console.log("Error in transport-produce:", error);
      }
    };

    // see client's socket.emit('transport-produce', ...)
    socket.on(
      "transport-produce",
      async ({ kind, rtpParameters, appData }, callback) => {
        try {
          // call produce based on the prameters from the client
          const producer = await getTransport(socket.id).produce({
            kind,
            rtpParameters,
          });
          producer.on("trace", (trace) => {
            console.log("📡 [TRACE] Producer trace event:", trace);
          });
          setInterval(async () => {
            const stats = await producer.getStats();
            stats.forEach((stat) => {
              console.log("Producer stats:", {
                type: stat.type,
                bitrate: stat.bitrate, // if available
                packetsSent: stat.packetsSent,
                timestamp: stat.timestamp,
              });
            });
          }, 5000);

          console.log("reached here::::::::::::::::::");

          // add producer to the producers array
          const { roomName } = peers[socket.id];

          // const producerId = isProducerExists(roomName);

          // if (producerId) {
          //   socket.emit("error", "Producer already exist");
          //   return;
          // }

          addProducer(producer, roomName);
          // isProducerExists(roomName);

          if (kind === "video") {
            try {
              const filePath = await startRecording(
                rooms[roomName].router,
                producer,
                roomName,
                socket.id
              );
              console.log(
                `Auto-started recording for video producer: ${filePath}`
              );
            } catch (error) {
              console.error("Failed to auto-start recording:", error);
            }
          }

          // informConsumers(roomName, socket.id, producer.id);

          console.log("Producer ID: ", producer.id, producer.kind);

          producer.on("transportclose", () => {
            console.log("transport for this producer closed ");
            producer.close();
          });

          console.log("parminder emitted", typeof callback);
          socket.emit("parminder", producer.id);
          // Send back to the client the Producer's id
          callback({
            id: producer.id,
            producersExist: producers.length > 1 ? true : false,
          });
        } catch (error) {
          console.log("Error in transport-produce:", error);
        }
      }
    );

    // see client's socket.emit('transport-recv-connect', ...)
    socket.on(
      "transport-recv-connect",
      async ({ dtlsParameters, serverConsumerTransportId }) => {
        console.log(`DTLS PARAMS: ${dtlsParameters}`);
        try {
          const consumerTransport = transports.find(
            (transportData) =>
              transportData.consumer &&
              transportData.transport.id == serverConsumerTransportId
          ).transport;
          await consumerTransport.connect({ dtlsParameters });
        } catch (error) {
          console.log("Error in transport-recv-connect::::", error);
        }
      }
    );

    socket.on(
      "consume",
      async (
        { rtpCapabilities, remoteProducerId, serverConsumerTransportId },
        callback
      ) => {
        try {
          const { roomName } = peers[socket.id];
          const router = rooms[roomName].router;
          let consumerTransport = transports.find(
            (transportData) =>
              transportData.consumer &&
              transportData.transport.id == serverConsumerTransportId
          ).transport;

          console.log(
            "enter in the consume event",
            roomName,
            router.canConsume({
              producerId: remoteProducerId,
              rtpCapabilities,
            })
          );
          // check if the router can consume the specified producer
          if (
            router.canConsume({
              producerId: remoteProducerId,
              rtpCapabilities,
            })
          ) {
            // transport can now consume and return a consumer
            const consumer = await consumerTransport.consume({
              producerId: remoteProducerId,
              rtpCapabilities,
              paused: true,
            });

            consumer.on("transportclose", () => {
              console.log("transport close from consumer");
            });

            consumer.on("producerclose", () => {
              console.log("producer of consumer closed");
              socket.emit("producer-closed", { remoteProducerId });

              consumerTransport.close([]);
              transports = transports.filter(
                (transportData) =>
                  transportData.transport.id !== consumerTransport.id
              );
              consumer.close();
              consumers = consumers.filter(
                (consumerData) => consumerData.consumer.id !== consumer.id
              );
            });

            addConsumer(consumer, roomName);

            console.log("consumer.rtpParameters::::", consumer.rtpParameters);

            // from the consumer extract the following params
            // to send back to the Client
            const params = {
              id: consumer.id,
              producerId: remoteProducerId,
              kind: consumer.kind,
              rtpParameters: consumer.rtpParameters,
              serverConsumerId: consumer.id,
            };

            // send the parameters to the client
            callback({ params });
          }
        } catch (error) {
          console.log(error.message);
          callback({
            params: {
              error: error,
            },
          });
        }
      }
    );

    socket.on("consumer-resume", async ({ serverConsumerId }) => {
      console.log("consumer resume");
      const { consumer } = consumers.find(
        (consumerData) => consumerData.consumer.id === serverConsumerId
      );
      await consumer.resume();
    });
  });

  const createWebRtcTransport = async (router) => {
    return new Promise(async (resolve, reject) => {
      try {
        // https://mediasoup.org/documentation/v3/mediasoup/api/#WebRtcTransportOptions
        const webRtcTransport_options = {
          listenIps: [
            {
              // Server
              ip: "172.31.12.187", // replace with relevant IP address
              announcedIp: '3.148.147.103',
              // Local
              // ip: "0.0.0.0", // replace with relevant IP address
              // announcedIp: "127.0.0.1",
            },
          ],
          enableUdp: true,
          enableTcp: true,
          preferUdp: true,
        };

        // https://mediasoup.org/documentation/v3/mediasoup/api/#router-createWebRtcTransport
        let transport = await router.createWebRtcTransport(
          webRtcTransport_options
        );
        console.log(`transport id: ${transport.id}`);

        transport.on("dtlsstatechange", (dtlsState) => {
          if (dtlsState === "closed") {
            transport.close();
          }
        });

        transport.on("close", () => {
          console.log("transport closed");
        });

        resolve(transport);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getFFmpegPath = () => {
    // Windows common paths
    if (process.platform === "win32") {
      // Option 1: Use double backslashes to escape them
      return "C:\\Users\\User\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-7.1.1-full_build\\bin\\ffmpeg.exe";
    }
    // Linux/Mac - usually in PATH
    // return "ffmpeg";

    if (process.env.NODE_ENV == "local") {
      return "/Users/techwin/Downloads/ffmpeg";
    } else {
      return "/usr/bin/ffmpeg";
    }
  };

  const getFreePort = () => {
    return new Promise((resolve, reject) => {
      const server = net.createServer();
      server.listen(0, () => {
        //@ts-ignore
        const port = server.address()?.port;
        server.close(() => resolve(port));
      });
      server.on("error", reject);
    });
  };

  const debugRecording = (message: any, data = null) => {
    const timestamp = new Date().toISOString();
    console.log(`[RECORDING DEBUG ${timestamp}] ${message}`);
    if (data) {
      console.log(JSON.stringify(data, null, 2));
    }
  };

  const recordingsDir = path.join(__dirname, "../../../recordings");
  console.log("recordingsDir::::", recordingsDir);
  if (!fs.existsSync(recordingsDir)) {
    fs.mkdirSync(recordingsDir, { recursive: true });
  }

  const startRecording = async (router, producer, roomName, socketId) => {
    try {
      debugRecording(`Starting combined MKV recording for room: ${roomName}`);

      // Find audio and video producers for this socket
      const audioProducerData = producers.find(
        (p) => p.socketId === socketId && p.producer.kind === "audio"
      );
      const videoProducerData = producers.find(
        (p) => p.socketId === socketId && p.producer.kind === "video"
      );

      console.log("audioProducerData::::::", audioProducerData);
      console.log("videoProducerData::::::", videoProducerData);

      if (!audioProducerData || !videoProducerData) {
        throw new Error("Both audio and video producers are required");
      }

      const audioProducer = audioProducerData.producer;
      const videoProducer = videoProducerData.producer;

      const createConsumerAndTransport = async (producer) => {
        const plainTransport = await router.createPlainTransport({
          // listenIp: { ip: "127.0.0.1", announcedIp: null }, // Local
          listenIp: { ip: "0.0.0.0", announcedIp: "3.148.147.103" }, // Sever
          rtcpMux: false,
          comedia: false,
        });

        const rtpPort = await getFreePort();
        const rtcpPort = await getFreePort();

        await plainTransport.connect({
          // ip: "127.0.0.1", // Local
          ip: "3.148.147.103", // Server
          port: rtpPort,
          rtcpPort: rtcpPort,
        });

        const consumer = await plainTransport.consume({
          producerId: producer.id,
          rtpCapabilities: router.rtpCapabilities,
          paused: false,
        });

        return { consumer, plainTransport, rtpPort, rtcpPort };
      };

      const audio = await createConsumerAndTransport(audioProducer);
      debugRecording(
        "Audio consumer parameters:",
        audio.consumer.rtpParameters
      );
      const video = await createConsumerAndTransport(videoProducer);

      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const fileName = `recording_${roomName}_${socketId}_${timestamp}.mkv`; // Changed to .mkv
      const filePath = path.join(recordingsDir, fileName);
      const sdpPath = path.join(recordingsDir, `recording_${socketId}.sdp`);

      // Generate combined SDP with proper formatting
      const generateSdp = (
        audioConsumer,
        audioPort,
        audioRtcpPort,
        videoConsumer,
        videoPort,
        videoRtcpPort
      ) => {
        const audioCodec = audioConsumer.rtpParameters.codecs[0];
        const videoCodec = videoConsumer.rtpParameters.codecs[0];

        const audioPayloadType = audioCodec.payloadType;
        const videoPayloadType = videoCodec.payloadType;

        const audioMimeType = audioCodec.mimeType.split("/")[1];
        const videoMimeType = videoCodec.mimeType.split("/")[1];

        const audioClockRate = audioCodec.clockRate;
        const videoClockRate = videoCodec.clockRate;

        const audioChannels = audioCodec.channels || 2;

        const audioSsrc = audioConsumer.rtpParameters.encodings[0].ssrc;
        const videoSsrc = videoConsumer.rtpParameters.encodings[0].ssrc;

        const audioCname = audioConsumer.rtpParameters.rtcp.cname || "audio";
        const videoCname = videoConsumer.rtpParameters.rtcp.cname || "video";

        return `v=0
o=- 0 0 IN IP4 3.148.147.103
s=MediaStream
t=0 0
c=IN IP4 3.148.147.103

m=audio ${audioPort} RTP/AVP ${audioPayloadType}
c=IN IP4 3.148.147.103
a=rtpmap:${audioPayloadType} ${audioMimeType}/${audioClockRate}/${audioChannels}
a=rtcp:${audioRtcpPort} IN IP4 3.148.147.103
a=recvonly
a=ssrc:${audioSsrc} cname:${audioCname}

m=video ${videoPort} RTP/AVP ${videoPayloadType}
c=IN IP4 3.148.147.103
a=rtpmap:${videoPayloadType} ${videoMimeType}/${videoClockRate}
a=rtcp:${videoRtcpPort} IN IP4 3.148.147.103
a=recvonly
a=ssrc:${videoSsrc} cname:${videoCname}
`;
      };

      const sdp = generateSdp(
        audio.consumer,
        audio.rtpPort,
        audio.rtcpPort,
        video.consumer,
        video.rtpPort,
        video.rtcpPort
      );

      fs.writeFileSync(sdpPath, sdp);
      debugRecording(`Combined SDP file written: ${sdpPath}`);
      debugRecording(`SDP content:\n${sdp}`);

      const ffmpegPath = getFFmpegPath();

      // Optimized FFmpeg arguments for MKV recording
      const ffmpegArgs = [
        "-protocol_whitelist",
        "file,udp,rtp",
        "-analyzeduration",
        "30000000",
        "-probesize",
        "30000000",
        "-f",
        "sdp",
        "-i",
        sdpPath,
        "-map",
        "0:v:0",
        "-map",
        "0:a:0",

        // Video encoding
        "-c:v",
        "libx264",
        "-preset",
        "veryfast",
        "-tune",
        "zerolatency",
        "-crf",
        "25",
        "-minrate",
        "4M", // Minimum bitrate
        "-maxrate",
        "6M",
        "-bufsize",
        "16M",
        "-x264-params",
        "nal-hrd=none:vbv-maxrate=4000:vbv-bufsize=16000",
        "-pix_fmt",
        "yuv420p",
        "-g",
        "30",
        "-keyint_min",
        "15",
        "-sc_threshold",
        "0",

        // Audio
        "-c:a",
        "libopus",
        "-b:a",
        "128k",
        "-ar",
        "48000",
        "-ac",
        "2",

        // Container
        "-f",
        "matroska",
        "-avoid_negative_ts",
        "make_zero",
        "-fflags",
        "+genpts+igndts+flush_packets",
        "-max_muxing_queue_size",
        "1024",
        "-muxdelay",
        "0",
        "-muxpreload",
        "0",

        // Stability
        // "-use_wallclock_as_timestamps", "1",
        "-thread_queue_size",
        "512",
        "-rtbufsize",
        "100M",
        "-vsync",
        "0",

        "-y",
        filePath,
      ];

      debugRecording("FFmpeg MKV args:", ffmpegArgs);

      const ffmpegProcess = spawn(ffmpegPath, ffmpegArgs, {
        stdio: ["pipe", "pipe", "pipe"],
      });

      debugRecording(
        `FFmpeg MKV process started with PID: ${ffmpegProcess.pid}`
      );

      // Process monitoring
      let lastOutputTime = Date.now();
      let frameCount = 0;

      ffmpegProcess.stdout.on("data", (data) => {
        lastOutputTime = Date.now();
        debugRecording("FFmpeg stdout: " + data.toString());
      });

      ffmpegProcess.stderr.on("data", (data) => {
        lastOutputTime = Date.now();
        const output = data.toString();
        debugRecording("FFmpeg stderr: " + output);

        // Extract frame count for monitoring
        const frameMatch = output.match(/frame=\s*(\d+)/);
        if (frameMatch) {
          frameCount = parseInt(frameMatch[1]);
        }

        // Monitor for critical errors
        if (output.includes("error") || output.includes("failed")) {
          console.warn("FFmpeg reported an error:", output);
        }
      });

      ffmpegProcess.on("exit", (code, signal) => {
        debugRecording(`FFmpeg exited with code ${code}, signal: ${signal}`);
        debugRecording(`Total frames recorded: ${frameCount}`);

        // Check if file was created successfully
        if (fs.existsSync(filePath)) {
          const stats = fs.statSync(filePath);
          debugRecording(
            `Recording MKV file created: ${filePath}, Size: ${stats.size} bytes`
          );
        } else {
          debugRecording("Recording MKV file was not created!");
        }
      });

      ffmpegProcess.on("error", (error) => {
        debugRecording("FFmpeg process error:", error);
      });

      // Watchdog for process monitoring
      const watchdog = setInterval(() => {
        if (Date.now() - lastOutputTime > 30000) {
          // 30 seconds without output
          console.warn("FFmpeg appears to be stuck, may need intervention");
          debugRecording(`Last frame count: ${frameCount}`);
        }
      }, 10000);

      recordings[socketId] = {
        consumers: [audio.consumer, video.consumer],
        transports: [audio.plainTransport, video.plainTransport],
        ffmpegProcess,
        filePath,
        startTime: new Date(),
        sdpPath,
        watchdog,
        frameCount: 0,
      };

      return filePath;
    } catch (err) {
      debugRecording("Error in combined MKV startRecording:", err);
      throw err;
    }
  };

  const stopRecording = async (socketId) => {
    try {
      const recording = recordings[socketId];
      if (!recording) {
        console.log(`No recording found for socket: ${socketId}`);
        return;
      }

      console.log(`Stopping MKV recording for socket: ${socketId}`);

      // Clear watchdog
      if (recording.watchdog) {
        clearInterval(recording.watchdog);
      }

      // Close consumers first to stop RTP flow
      if (recording.consumers) {
        recording.consumers.forEach((consumer) => {
          if (consumer && !consumer.closed) {
            consumer.close();
            console.log("Consumer closed");
          }
        });
      }

      // Give FFmpeg time to process remaining packets
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Gracefully terminate FFmpeg
      if (recording.ffmpegProcess && !recording.ffmpegProcess.killed) {
        console.log("Attempting graceful FFmpeg shutdown...");

        // Create a promise that resolves when FFmpeg exits
        const ffmpegExitPromise = new Promise((resolve: any) => {
          recording.ffmpegProcess.on("exit", (code, signal) => {
            console.log(`FFmpeg exited with code: ${code}, signal: ${signal}`);
            resolve();
          });

          recording.ffmpegProcess.on("error", (error) => {
            console.log("FFmpeg error during shutdown:", error.message);
            resolve();
          });
        });

        try {
          // For MKV, we can send 'q' command for graceful shutdown
          if (
            recording.ffmpegProcess.stdin &&
            !recording.ffmpegProcess.stdin.destroyed
          ) {
            recording.ffmpegProcess.stdin.write("q\n");
            recording.ffmpegProcess.stdin.end();
            console.log("Sent quit command to FFmpeg");
          }
        } catch (error) {
          console.log("Could not send quit command to FFmpeg:", error.message);
          // For MKV, try SIGINT which is gentler than SIGTERM
          recording.ffmpegProcess.kill("SIGINT");
        }

        // Wait for graceful shutdown with reasonable timeout
        const timeoutPromise = new Promise((resolve: any) => {
          setTimeout(() => {
            if (!recording.ffmpegProcess.killed) {
              console.log("FFmpeg graceful shutdown timeout, using SIGTERM...");
              recording.ffmpegProcess.kill("SIGTERM");

              // Last resort: SIGKILL after additional delay
              setTimeout(() => {
                if (!recording.ffmpegProcess.killed) {
                  console.log("SIGTERM failed, using SIGKILL");
                  recording.ffmpegProcess.kill("SIGKILL");
                }
              }, 3000);
            }
            resolve();
          }, 8000); // 8 seconds timeout for MKV (more forgiving than MP4)
        });

        // Wait for either FFmpeg to exit or timeout
        await Promise.race([ffmpegExitPromise, timeoutPromise]);
      }

      // Close transports
      if (recording.transports) {
        recording.transports.forEach((transport) => {
          if (transport && !transport.closed) {
            transport.close();
            console.log("Plain transport closed");
          }
        });
      }

      // Clean up SDP file
      if (recording.sdpPath && fs.existsSync(recording.sdpPath)) {
        try {
          fs.unlinkSync(recording.sdpPath);
          console.log("SDP file cleaned up");
        } catch (error) {
          console.error("Could not delete SDP file:", error.message);
        }
      }

      // Validate the MKV file
      let finalFilePath = recording.filePath;
      if (fs.existsSync(recording.filePath)) {
        const stats = fs.statSync(recording.filePath);
        console.log(`Recording MKV file size: ${stats.size} bytes`);

        if (stats.size > 0) {
          // MKV files are generally more robust, but we can still validate
          console.log("MKV recording appears to be valid");
        } else {
          console.warn("Warning: Recording MKV file is empty!");
        }
      } else {
        console.error("Recording MKV file was not created!");
      }

      // Clean up
      delete recordings[socketId];

      const duration = Date.now() - recording.startTime;
      console.log(`MKV Recording stopped: ${finalFilePath}`);
      console.log(`Recording duration: ${Math.round(duration / 1000)}s`);

      return finalFilePath;
    } catch (error) {
      console.error("Error stopping MKV recording:", error);
      throw error;
    }
  };
};

export default useMediaSoup;

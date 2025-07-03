(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/mediasoup-client/node_modules/ms/index.js
  var require_ms = __commonJS({
    "node_modules/mediasoup-client/node_modules/ms/index.js"(exports, module) {
      var s = 1e3;
      var m = s * 60;
      var h = m * 60;
      var d = h * 24;
      var w = d * 7;
      var y = d * 365.25;
      module.exports = function(val, options) {
        options = options || {};
        var type = typeof val;
        if (type === "string" && val.length > 0) {
          return parse2(val);
        } else if (type === "number" && isFinite(val)) {
          return options.long ? fmtLong(val) : fmtShort(val);
        }
        throw new Error(
          "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
        );
      };
      function parse2(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          str
        );
        if (!match) {
          return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || "ms").toLowerCase();
        switch (type) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return n * y;
          case "weeks":
          case "week":
          case "w":
            return n * w;
          case "days":
          case "day":
          case "d":
            return n * d;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return n * h;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return n * m;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return n * s;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return n;
          default:
            return void 0;
        }
      }
      function fmtShort(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return Math.round(ms / d) + "d";
        }
        if (msAbs >= h) {
          return Math.round(ms / h) + "h";
        }
        if (msAbs >= m) {
          return Math.round(ms / m) + "m";
        }
        if (msAbs >= s) {
          return Math.round(ms / s) + "s";
        }
        return ms + "ms";
      }
      function fmtLong(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return plural(ms, msAbs, d, "day");
        }
        if (msAbs >= h) {
          return plural(ms, msAbs, h, "hour");
        }
        if (msAbs >= m) {
          return plural(ms, msAbs, m, "minute");
        }
        if (msAbs >= s) {
          return plural(ms, msAbs, s, "second");
        }
        return ms + " ms";
      }
      function plural(ms, msAbs, n, name) {
        var isPlural = msAbs >= n * 1.5;
        return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
      }
    }
  });

  // node_modules/mediasoup-client/node_modules/debug/src/common.js
  var require_common = __commonJS({
    "node_modules/mediasoup-client/node_modules/debug/src/common.js"(exports, module) {
      function setup(env) {
        createDebug.debug = createDebug;
        createDebug.default = createDebug;
        createDebug.coerce = coerce;
        createDebug.disable = disable;
        createDebug.enable = enable;
        createDebug.enabled = enabled;
        createDebug.humanize = require_ms();
        createDebug.destroy = destroy;
        Object.keys(env).forEach((key) => {
          createDebug[key] = env[key];
        });
        createDebug.names = [];
        createDebug.skips = [];
        createDebug.formatters = {};
        function selectColor(namespace) {
          let hash = 0;
          for (let i = 0; i < namespace.length; i++) {
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0;
          }
          return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
        }
        createDebug.selectColor = selectColor;
        function createDebug(namespace) {
          let prevTime;
          let enableOverride = null;
          let namespacesCache;
          let enabledCache;
          function debug(...args) {
            if (!debug.enabled) {
              return;
            }
            const self2 = debug;
            const curr = Number(/* @__PURE__ */ new Date());
            const ms = curr - (prevTime || curr);
            self2.diff = ms;
            self2.prev = prevTime;
            self2.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== "string") {
              args.unshift("%O");
            }
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
              if (match === "%%") {
                return "%";
              }
              index++;
              const formatter = createDebug.formatters[format];
              if (typeof formatter === "function") {
                const val = args[index];
                match = formatter.call(self2, val);
                args.splice(index, 1);
                index--;
              }
              return match;
            });
            createDebug.formatArgs.call(self2, args);
            const logFn = self2.log || createDebug.log;
            logFn.apply(self2, args);
          }
          debug.namespace = namespace;
          debug.useColors = createDebug.useColors();
          debug.color = createDebug.selectColor(namespace);
          debug.extend = extend;
          debug.destroy = createDebug.destroy;
          Object.defineProperty(debug, "enabled", {
            enumerable: true,
            configurable: false,
            get: () => {
              if (enableOverride !== null) {
                return enableOverride;
              }
              if (namespacesCache !== createDebug.namespaces) {
                namespacesCache = createDebug.namespaces;
                enabledCache = createDebug.enabled(namespace);
              }
              return enabledCache;
            },
            set: (v) => {
              enableOverride = v;
            }
          });
          if (typeof createDebug.init === "function") {
            createDebug.init(debug);
          }
          return debug;
        }
        function extend(namespace, delimiter) {
          const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
          newDebug.log = this.log;
          return newDebug;
        }
        function enable(namespaces) {
          createDebug.save(namespaces);
          createDebug.namespaces = namespaces;
          createDebug.names = [];
          createDebug.skips = [];
          const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
          for (const ns of split) {
            if (ns[0] === "-") {
              createDebug.skips.push(ns.slice(1));
            } else {
              createDebug.names.push(ns);
            }
          }
        }
        function matchesTemplate(search, template) {
          let searchIndex = 0;
          let templateIndex = 0;
          let starIndex = -1;
          let matchIndex = 0;
          while (searchIndex < search.length) {
            if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
              if (template[templateIndex] === "*") {
                starIndex = templateIndex;
                matchIndex = searchIndex;
                templateIndex++;
              } else {
                searchIndex++;
                templateIndex++;
              }
            } else if (starIndex !== -1) {
              templateIndex = starIndex + 1;
              matchIndex++;
              searchIndex = matchIndex;
            } else {
              return false;
            }
          }
          while (templateIndex < template.length && template[templateIndex] === "*") {
            templateIndex++;
          }
          return templateIndex === template.length;
        }
        function disable() {
          const namespaces = [
            ...createDebug.names,
            ...createDebug.skips.map((namespace) => "-" + namespace)
          ].join(",");
          createDebug.enable("");
          return namespaces;
        }
        function enabled(name) {
          for (const skip of createDebug.skips) {
            if (matchesTemplate(name, skip)) {
              return false;
            }
          }
          for (const ns of createDebug.names) {
            if (matchesTemplate(name, ns)) {
              return true;
            }
          }
          return false;
        }
        function coerce(val) {
          if (val instanceof Error) {
            return val.stack || val.message;
          }
          return val;
        }
        function destroy() {
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
        createDebug.enable(createDebug.load());
        return createDebug;
      }
      module.exports = setup;
    }
  });

  // node_modules/mediasoup-client/node_modules/debug/src/browser.js
  var require_browser = __commonJS({
    "node_modules/mediasoup-client/node_modules/debug/src/browser.js"(exports, module) {
      exports.formatArgs = formatArgs;
      exports.save = save;
      exports.load = load;
      exports.useColors = useColors;
      exports.storage = localstorage();
      exports.destroy = /* @__PURE__ */ (() => {
        let warned = false;
        return () => {
          if (!warned) {
            warned = true;
            console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
          }
        };
      })();
      exports.colors = [
        "#0000CC",
        "#0000FF",
        "#0033CC",
        "#0033FF",
        "#0066CC",
        "#0066FF",
        "#0099CC",
        "#0099FF",
        "#00CC00",
        "#00CC33",
        "#00CC66",
        "#00CC99",
        "#00CCCC",
        "#00CCFF",
        "#3300CC",
        "#3300FF",
        "#3333CC",
        "#3333FF",
        "#3366CC",
        "#3366FF",
        "#3399CC",
        "#3399FF",
        "#33CC00",
        "#33CC33",
        "#33CC66",
        "#33CC99",
        "#33CCCC",
        "#33CCFF",
        "#6600CC",
        "#6600FF",
        "#6633CC",
        "#6633FF",
        "#66CC00",
        "#66CC33",
        "#9900CC",
        "#9900FF",
        "#9933CC",
        "#9933FF",
        "#99CC00",
        "#99CC33",
        "#CC0000",
        "#CC0033",
        "#CC0066",
        "#CC0099",
        "#CC00CC",
        "#CC00FF",
        "#CC3300",
        "#CC3333",
        "#CC3366",
        "#CC3399",
        "#CC33CC",
        "#CC33FF",
        "#CC6600",
        "#CC6633",
        "#CC9900",
        "#CC9933",
        "#CCCC00",
        "#CCCC33",
        "#FF0000",
        "#FF0033",
        "#FF0066",
        "#FF0099",
        "#FF00CC",
        "#FF00FF",
        "#FF3300",
        "#FF3333",
        "#FF3366",
        "#FF3399",
        "#FF33CC",
        "#FF33FF",
        "#FF6600",
        "#FF6633",
        "#FF9900",
        "#FF9933",
        "#FFCC00",
        "#FFCC33"
      ];
      function useColors() {
        if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
          return true;
        }
        if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
          return false;
        }
        let m;
        return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
        typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
        // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
        typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
        typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
      }
      function formatArgs(args) {
        args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
        if (!this.useColors) {
          return;
        }
        const c = "color: " + this.color;
        args.splice(1, 0, c, "color: inherit");
        let index = 0;
        let lastC = 0;
        args[0].replace(/%[a-zA-Z%]/g, (match) => {
          if (match === "%%") {
            return;
          }
          index++;
          if (match === "%c") {
            lastC = index;
          }
        });
        args.splice(lastC, 0, c);
      }
      exports.log = console.debug || console.log || (() => {
      });
      function save(namespaces) {
        try {
          if (namespaces) {
            exports.storage.setItem("debug", namespaces);
          } else {
            exports.storage.removeItem("debug");
          }
        } catch (error) {
        }
      }
      function load() {
        let r;
        try {
          r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
        } catch (error) {
        }
        if (!r && typeof process !== "undefined" && "env" in process) {
          r = process.env.DEBUG;
        }
        return r;
      }
      function localstorage() {
        try {
          return localStorage;
        } catch (error) {
        }
      }
      module.exports = require_common()(exports);
      var { formatters } = module.exports;
      formatters.j = function(v) {
        try {
          return JSON.stringify(v);
        } catch (error) {
          return "[UnexpectedJSONParseError]: " + error.message;
        }
      };
    }
  });

  // node_modules/ua-parser-js/src/main/ua-parser.js
  var require_ua_parser = __commonJS({
    "node_modules/ua-parser-js/src/main/ua-parser.js"(exports, module) {
      (function(window2, undefined2) {
        "use strict";
        var LIBVERSION = "2.0.4", UA_MAX_LENGTH = 500, USER_AGENT = "user-agent", EMPTY = "", UNKNOWN = "?", FUNC_TYPE = "function", UNDEF_TYPE = "undefined", OBJ_TYPE = "object", STR_TYPE = "string", UA_BROWSER = "browser", UA_CPU = "cpu", UA_DEVICE = "device", UA_ENGINE = "engine", UA_OS = "os", UA_RESULT = "result", NAME = "name", TYPE = "type", VENDOR = "vendor", VERSION = "version", ARCHITECTURE = "architecture", MAJOR = "major", MODEL = "model", CONSOLE = "console", MOBILE = "mobile", TABLET = "tablet", SMARTTV = "smarttv", WEARABLE = "wearable", XR = "xr", EMBEDDED = "embedded", INAPP = "inapp", BRANDS = "brands", FORMFACTORS = "formFactors", FULLVERLIST = "fullVersionList", PLATFORM = "platform", PLATFORMVER = "platformVersion", BITNESS = "bitness", CH_HEADER = "sec-ch-ua", CH_HEADER_FULL_VER_LIST = CH_HEADER + "-full-version-list", CH_HEADER_ARCH = CH_HEADER + "-arch", CH_HEADER_BITNESS = CH_HEADER + "-" + BITNESS, CH_HEADER_FORM_FACTORS = CH_HEADER + "-form-factors", CH_HEADER_MOBILE = CH_HEADER + "-" + MOBILE, CH_HEADER_MODEL = CH_HEADER + "-" + MODEL, CH_HEADER_PLATFORM = CH_HEADER + "-" + PLATFORM, CH_HEADER_PLATFORM_VER = CH_HEADER_PLATFORM + "-version", CH_ALL_VALUES = [BRANDS, FULLVERLIST, MOBILE, MODEL, PLATFORM, PLATFORMVER, ARCHITECTURE, FORMFACTORS, BITNESS], AMAZON = "Amazon", APPLE = "Apple", ASUS = "ASUS", BLACKBERRY = "BlackBerry", GOOGLE = "Google", HUAWEI = "Huawei", LENOVO = "Lenovo", HONOR = "Honor", LG = "LG", MICROSOFT = "Microsoft", MOTOROLA = "Motorola", NVIDIA = "Nvidia", ONEPLUS = "OnePlus", OPPO = "OPPO", SAMSUNG = "Samsung", SHARP = "Sharp", SONY = "Sony", XIAOMI = "Xiaomi", ZEBRA = "Zebra", CHROME = "Chrome", CHROMIUM = "Chromium", CHROMECAST = "Chromecast", EDGE = "Edge", FIREFOX = "Firefox", OPERA = "Opera", FACEBOOK = "Facebook", SOGOU = "Sogou", PREFIX_MOBILE = "Mobile ", SUFFIX_BROWSER = " Browser", WINDOWS = "Windows";
        var isWindow = typeof window2 !== UNDEF_TYPE, NAVIGATOR = isWindow && window2.navigator ? window2.navigator : undefined2, NAVIGATOR_UADATA = NAVIGATOR && NAVIGATOR.userAgentData ? NAVIGATOR.userAgentData : undefined2;
        var extend = function(defaultRgx, extensions) {
          var mergedRgx = {};
          var extraRgx = extensions;
          if (!isExtensions(extensions)) {
            extraRgx = {};
            for (var i in extensions) {
              for (var j in extensions[i]) {
                extraRgx[j] = extensions[i][j].concat(extraRgx[j] ? extraRgx[j] : []);
              }
            }
          }
          for (var k in defaultRgx) {
            mergedRgx[k] = extraRgx[k] && extraRgx[k].length % 2 === 0 ? extraRgx[k].concat(defaultRgx[k]) : defaultRgx[k];
          }
          return mergedRgx;
        }, enumerize = function(arr) {
          var enums = {};
          for (var i = 0; i < arr.length; i++) {
            enums[arr[i].toUpperCase()] = arr[i];
          }
          return enums;
        }, has = function(str1, str2) {
          if (typeof str1 === OBJ_TYPE && str1.length > 0) {
            for (var i in str1) {
              if (lowerize(str2) == lowerize(str1[i])) return true;
            }
            return false;
          }
          return isString(str1) ? lowerize(str2) == lowerize(str1) : false;
        }, isExtensions = function(obj, deep) {
          for (var prop in obj) {
            return /^(browser|cpu|device|engine|os)$/.test(prop) || (deep ? isExtensions(obj[prop]) : false);
          }
        }, isString = function(val) {
          return typeof val === STR_TYPE;
        }, itemListToArray = function(header) {
          if (!header) return undefined2;
          var arr = [];
          var tokens = strip(/\\?\"/g, header).split(",");
          for (var i = 0; i < tokens.length; i++) {
            if (tokens[i].indexOf(";") > -1) {
              var token = trim(tokens[i]).split(";v=");
              arr[i] = { brand: token[0], version: token[1] };
            } else {
              arr[i] = trim(tokens[i]);
            }
          }
          return arr;
        }, lowerize = function(str) {
          return isString(str) ? str.toLowerCase() : str;
        }, majorize = function(version) {
          return isString(version) ? strip(/[^\d\.]/g, version).split(".")[0] : undefined2;
        }, setProps = function(arr) {
          for (var i in arr) {
            var propName = arr[i];
            if (typeof propName == OBJ_TYPE && propName.length == 2) {
              this[propName[0]] = propName[1];
            } else {
              this[propName] = undefined2;
            }
          }
          return this;
        }, strip = function(pattern, str) {
          return isString(str) ? str.replace(pattern, EMPTY) : str;
        }, stripQuotes = function(str) {
          return strip(/\\?\"/g, str);
        }, trim = function(str, len) {
          if (isString(str)) {
            str = strip(/^\s\s*/, str);
            return typeof len === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
          }
        };
        var rgxMapper = function(ua, arrays) {
          if (!ua || !arrays) return;
          var i = 0, j, k, p, q, matches, match;
          while (i < arrays.length && !matches) {
            var regex = arrays[i], props = arrays[i + 1];
            j = k = 0;
            while (j < regex.length && !matches) {
              if (!regex[j]) {
                break;
              }
              matches = regex[j++].exec(ua);
              if (!!matches) {
                for (p = 0; p < props.length; p++) {
                  match = matches[++k];
                  q = props[p];
                  if (typeof q === OBJ_TYPE && q.length > 0) {
                    if (q.length === 2) {
                      if (typeof q[1] == FUNC_TYPE) {
                        this[q[0]] = q[1].call(this, match);
                      } else {
                        this[q[0]] = q[1];
                      }
                    } else if (q.length >= 3) {
                      if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                        if (q.length > 3) {
                          this[q[0]] = match ? q[1].apply(this, q.slice(2)) : undefined2;
                        } else {
                          this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined2;
                        }
                      } else {
                        if (q.length == 3) {
                          this[q[0]] = match ? match.replace(q[1], q[2]) : undefined2;
                        } else if (q.length == 4) {
                          this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined2;
                        } else if (q.length > 4) {
                          this[q[0]] = match ? q[3].apply(this, [match.replace(q[1], q[2])].concat(q.slice(4))) : undefined2;
                        }
                      }
                    }
                  } else {
                    this[q] = match ? match : undefined2;
                  }
                }
              }
            }
            i += 2;
          }
        }, strMapper = function(str, map) {
          for (var i in map) {
            if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
              for (var j = 0; j < map[i].length; j++) {
                if (has(map[i][j], str)) {
                  return i === UNKNOWN ? undefined2 : i;
                }
              }
            } else if (has(map[i], str)) {
              return i === UNKNOWN ? undefined2 : i;
            }
          }
          return map.hasOwnProperty("*") ? map["*"] : str;
        };
        var windowsVersionMap = {
          "ME": "4.90",
          "NT 3.51": "3.51",
          "NT 4.0": "4.0",
          "2000": ["5.0", "5.01"],
          "XP": ["5.1", "5.2"],
          "Vista": "6.0",
          "7": "6.1",
          "8": "6.2",
          "8.1": "6.3",
          "10": ["6.4", "10.0"],
          "NT": ""
        }, formFactorsMap = {
          "embedded": "Automotive",
          "mobile": "Mobile",
          "tablet": ["Tablet", "EInk"],
          "smarttv": "TV",
          "wearable": "Watch",
          "xr": ["VR", "XR"],
          "?": ["Desktop", "Unknown"],
          "*": undefined2
        }, browserHintsMap = {
          "Chrome": "Google Chrome",
          "Edge": "Microsoft Edge",
          "Edge WebView2": "Microsoft Edge WebView2",
          "Chrome WebView": "Android WebView",
          "Chrome Headless": "HeadlessChrome",
          "Huawei Browser": "HuaweiBrowser",
          "MIUI Browser": "Miui Browser",
          "Opera Mobi": "OperaMobile",
          "Yandex": "YaBrowser"
        };
        var defaultRegexes = {
          browser: [
            [
              // Most common regardless engine
              /\b(?:crmo|crios)\/([\w\.]+)/i
              // Chrome for Android/iOS
            ],
            [VERSION, [NAME, PREFIX_MOBILE + "Chrome"]],
            [
              /webview.+edge\/([\w\.]+)/i
              // Microsoft Edge
            ],
            [VERSION, [NAME, EDGE + " WebView"]],
            [
              /edg(?:e|ios|a)?\/([\w\.]+)/i
            ],
            [VERSION, [NAME, "Edge"]],
            [
              // Presto based
              /(opera mini)\/([-\w\.]+)/i,
              // Opera Mini
              /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
              // Opera Mobi/Tablet
              /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i
              // Opera
            ],
            [NAME, VERSION],
            [
              /opios[\/ ]+([\w\.]+)/i
              // Opera mini on iphone >= 8.0
            ],
            [VERSION, [NAME, OPERA + " Mini"]],
            [
              /\bop(?:rg)?x\/([\w\.]+)/i
              // Opera GX
            ],
            [VERSION, [NAME, OPERA + " GX"]],
            [
              /\bopr\/([\w\.]+)/i
              // Opera Webkit
            ],
            [VERSION, [NAME, OPERA]],
            [
              // Mixed
              /\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i
              // Baidu
            ],
            [VERSION, [NAME, "Baidu"]],
            [
              /\b(?:mxbrowser|mxios|myie2)\/?([-\w\.]*)\b/i
              // Maxthon
            ],
            [VERSION, [NAME, "Maxthon"]],
            [
              /(kindle)\/([\w\.]+)/i,
              // Kindle
              /(lunascape|maxthon|netfront|jasmine|blazer|sleipnir)[\/ ]?([\w\.]*)/i,
              // Lunascape/Maxthon/Netfront/Jasmine/Blazer/Sleipnir
              // Trident based
              /(avant|iemobile|slim(?:browser|boat|jet))[\/ ]?([\d\.]*)/i,
              // Avant/IEMobile/SlimBrowser/SlimBoat/Slimjet
              /(?:ms|\()(ie) ([\w\.]+)/i,
              // Internet Explorer
              // Blink/Webkit/KHTML based                                         // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon/LG Browser/Otter/qutebrowser/Dooble
              /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|duckduckgo|klar|helio|(?=comodo_)?dragon|otter|dooble|(?:lg |qute)browser)\/([-\w\.]+)/i,
              // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ//Vivaldi/DuckDuckGo/Klar/Helio/Dragon
              /(heytap|ovi|115|surf)browser\/([\d\.]+)/i,
              // HeyTap/Ovi/115/Surf
              /(ecosia|weibo)(?:__| \w+@)([\d\.]+)/i
              // Ecosia/Weibo
            ],
            [NAME, VERSION],
            [
              /quark(?:pc)?\/([-\w\.]+)/i
              // Quark
            ],
            [VERSION, [NAME, "Quark"]],
            [
              /\bddg\/([\w\.]+)/i
              // DuckDuckGo
            ],
            [VERSION, [NAME, "DuckDuckGo"]],
            [
              /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i
              // UCBrowser
            ],
            [VERSION, [NAME, "UCBrowser"]],
            [
              /microm.+\bqbcore\/([\w\.]+)/i,
              // WeChat Desktop for Windows Built-in Browser
              /\bqbcore\/([\w\.]+).+microm/i,
              /micromessenger\/([\w\.]+)/i
              // WeChat
            ],
            [VERSION, [NAME, "WeChat"]],
            [
              /konqueror\/([\w\.]+)/i
              // Konqueror
            ],
            [VERSION, [NAME, "Konqueror"]],
            [
              /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i
              // IE11
            ],
            [VERSION, [NAME, "IE"]],
            [
              /ya(?:search)?browser\/([\w\.]+)/i
              // Yandex
            ],
            [VERSION, [NAME, "Yandex"]],
            [
              /slbrowser\/([\w\.]+)/i
              // Smart Lenovo Browser
            ],
            [VERSION, [NAME, "Smart " + LENOVO + SUFFIX_BROWSER]],
            [
              /(avast|avg)\/([\w\.]+)/i
              // Avast/AVG Secure Browser
            ],
            [[NAME, /(.+)/, "$1 Secure" + SUFFIX_BROWSER], VERSION],
            [
              /\bfocus\/([\w\.]+)/i
              // Firefox Focus
            ],
            [VERSION, [NAME, FIREFOX + " Focus"]],
            [
              /\bopt\/([\w\.]+)/i
              // Opera Touch
            ],
            [VERSION, [NAME, OPERA + " Touch"]],
            [
              /coc_coc\w+\/([\w\.]+)/i
              // Coc Coc Browser
            ],
            [VERSION, [NAME, "Coc Coc"]],
            [
              /dolfin\/([\w\.]+)/i
              // Dolphin
            ],
            [VERSION, [NAME, "Dolphin"]],
            [
              /coast\/([\w\.]+)/i
              // Opera Coast
            ],
            [VERSION, [NAME, OPERA + " Coast"]],
            [
              /miuibrowser\/([\w\.]+)/i
              // MIUI Browser
            ],
            [VERSION, [NAME, "MIUI" + SUFFIX_BROWSER]],
            [
              /fxios\/([\w\.-]+)/i
              // Firefox for iOS
            ],
            [VERSION, [NAME, PREFIX_MOBILE + FIREFOX]],
            [
              /\bqihoobrowser\/?([\w\.]*)/i
              // 360
            ],
            [VERSION, [NAME, "360"]],
            [
              /\b(qq)\/([\w\.]+)/i
              // QQ
            ],
            [[NAME, /(.+)/, "$1Browser"], VERSION],
            [
              /(oculus|sailfish|huawei|vivo|pico)browser\/([\w\.]+)/i
            ],
            [[NAME, /(.+)/, "$1" + SUFFIX_BROWSER], VERSION],
            [
              // Oculus/Sailfish/HuaweiBrowser/VivoBrowser/PicoBrowser
              /samsungbrowser\/([\w\.]+)/i
              // Samsung Internet
            ],
            [VERSION, [NAME, SAMSUNG + " Internet"]],
            [
              /metasr[\/ ]?([\d\.]+)/i
              // Sogou Explorer
            ],
            [VERSION, [NAME, SOGOU + " Explorer"]],
            [
              /(sogou)mo\w+\/([\d\.]+)/i
              // Sogou Mobile
            ],
            [[NAME, SOGOU + " Mobile"], VERSION],
            [
              /(electron)\/([\w\.]+) safari/i,
              // Electron-based App
              /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
              // Tesla
              /m?(qqbrowser|2345(?=browser|chrome|explorer))\w*[\/ ]?v?([\w\.]+)/i
              // QQ/2345
            ],
            [NAME, VERSION],
            [
              /(lbbrowser|rekonq)/i
              // LieBao Browser/Rekonq
            ],
            [NAME],
            [
              /ome\/([\w\.]+) \w* ?(iron) saf/i,
              // Iron
              /ome\/([\w\.]+).+qihu (360)[es]e/i
              // 360
            ],
            [VERSION, NAME],
            [
              // WebView
              /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i
              // Facebook App for iOS & Android
            ],
            [[NAME, FACEBOOK], VERSION, [TYPE, INAPP]],
            [
              /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
              // Kakao App
              /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
              // Naver InApp
              /(daum)apps[\/ ]([\w\.]+)/i,
              // Daum App
              /safari (line)\/([\w\.]+)/i,
              // Line App for iOS
              /\b(line)\/([\w\.]+)\/iab/i,
              // Line App for Android
              /(alipay)client\/([\w\.]+)/i,
              // Alipay
              /(twitter)(?:and| f.+e\/([\w\.]+))/i,
              // Twitter
              /(instagram|snapchat|klarna)[\/ ]([-\w\.]+)/i
              // Instagram/Snapchat/Klarna
            ],
            [NAME, VERSION, [TYPE, INAPP]],
            [
              /\bgsa\/([\w\.]+) .*safari\//i
              // Google Search Appliance on iOS
            ],
            [VERSION, [NAME, "GSA"], [TYPE, INAPP]],
            [
              /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i
              // TikTok
            ],
            [VERSION, [NAME, "TikTok"], [TYPE, INAPP]],
            [
              /\[(linkedin)app\]/i
              // LinkedIn App for iOS & Android
            ],
            [NAME, [TYPE, INAPP]],
            [
              /(chromium)[\/ ]([-\w\.]+)/i
              // Chromium
            ],
            [NAME, VERSION],
            [
              /headlesschrome(?:\/([\w\.]+)| )/i
              // Chrome Headless
            ],
            [VERSION, [NAME, CHROME + " Headless"]],
            [
              /wv\).+chrome\/([\w\.]+).+edgw\//i
              // Edge WebView2
            ],
            [VERSION, [NAME, EDGE + " WebView2"]],
            [
              / wv\).+(chrome)\/([\w\.]+)/i
              // Chrome WebView
            ],
            [[NAME, CHROME + " WebView"], VERSION],
            [
              /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i
              // Android Browser
            ],
            [VERSION, [NAME, "Android" + SUFFIX_BROWSER]],
            [
              /chrome\/([\w\.]+) mobile/i
              // Chrome Mobile
            ],
            [VERSION, [NAME, PREFIX_MOBILE + "Chrome"]],
            [
              /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i
              // Chrome/OmniWeb/Arora/Tizen/Nokia
            ],
            [NAME, VERSION],
            [
              /version\/([\w\.\,]+) .*mobile(?:\/\w+ | ?)safari/i
              // Safari Mobile
            ],
            [VERSION, [NAME, PREFIX_MOBILE + "Safari"]],
            [
              /iphone .*mobile(?:\/\w+ | ?)safari/i
            ],
            [[NAME, PREFIX_MOBILE + "Safari"]],
            [
              /version\/([\w\.\,]+) .*(safari)/i
              // Safari
            ],
            [VERSION, NAME],
            [
              /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i
              // Safari < 3.0
            ],
            [NAME, [VERSION, "1"]],
            [
              /(webkit|khtml)\/([\w\.]+)/i
            ],
            [NAME, VERSION],
            [
              // Gecko based
              /(?:mobile|tablet);.*(firefox)\/([\w\.-]+)/i
              // Firefox Mobile
            ],
            [[NAME, PREFIX_MOBILE + FIREFOX], VERSION],
            [
              /(navigator|netscape\d?)\/([-\w\.]+)/i
              // Netscape
            ],
            [[NAME, "Netscape"], VERSION],
            [
              /(wolvic|librewolf)\/([\w\.]+)/i
              // Wolvic/LibreWolf
            ],
            [NAME, VERSION],
            [
              /mobile vr; rv:([\w\.]+)\).+firefox/i
              // Firefox Reality
            ],
            [VERSION, [NAME, FIREFOX + " Reality"]],
            [
              /ekiohf.+(flow)\/([\w\.]+)/i,
              // Flow
              /(swiftfox)/i,
              // Swiftfox
              /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror)[\/ ]?([\w\.\+]+)/i,
              // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
              /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
              // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
              /(firefox)\/([\w\.]+)/i,
              // Other Firefox-based
              /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
              // Mozilla
              // Other
              /(amaya|dillo|doris|icab|ladybird|lynx|mosaic|netsurf|obigo|polaris|w3m|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
              // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Obigo/Mosaic/Go/ICE/UP.Browser/Ladybird
              /\b(links) \(([\w\.]+)/i
              // Links
            ],
            [NAME, [VERSION, /_/g, "."]],
            [
              /(cobalt)\/([\w\.]+)/i
              // Cobalt
            ],
            [NAME, [VERSION, /[^\d\.]+./, EMPTY]]
          ],
          cpu: [
            [
              /\b((amd|x|x86[-_]?|wow|win)64)\b/i
              // AMD64 (x64)
            ],
            [[ARCHITECTURE, "amd64"]],
            [
              /(ia32(?=;))/i,
              // IA32 (quicktime)
              /\b((i[346]|x)86)(pc)?\b/i
              // IA32 (x86)
            ],
            [[ARCHITECTURE, "ia32"]],
            [
              /\b(aarch64|arm(v?[89]e?l?|_?64))\b/i
              // ARM64
            ],
            [[ARCHITECTURE, "arm64"]],
            [
              /\b(arm(v[67])?ht?n?[fl]p?)\b/i
              // ARMHF
            ],
            [[ARCHITECTURE, "armhf"]],
            [
              // PocketPC mistakenly identified as PowerPC
              /( (ce|mobile); ppc;|\/[\w\.]+arm\b)/i
            ],
            [[ARCHITECTURE, "arm"]],
            [
              /((ppc|powerpc)(64)?)( mac|;|\))/i
              // PowerPC
            ],
            [[ARCHITECTURE, /ower/, EMPTY, lowerize]],
            [
              / sun4\w[;\)]/i
              // SPARC
            ],
            [[ARCHITECTURE, "sparc"]],
            [
              /\b(avr32|ia64(?=;)|68k(?=\))|\barm(?=v([1-7]|[5-7]1)l?|;|eabi)|(irix|mips|sparc)(64)?\b|pa-risc)/i
              // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
            ],
            [[ARCHITECTURE, lowerize]]
          ],
          device: [
            [
              //////////////////////////
              // MOBILES & TABLETS
              /////////////////////////
              // Samsung
              /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
            ],
            [MODEL, [VENDOR, SAMSUNG], [TYPE, TABLET]],
            [
              /\b((?:s[cgp]h|gt|sm)-(?![lr])\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
              /samsung[- ]((?!sm-[lr]|browser)[-\w]+)/i,
              /sec-(sgh\w+)/i
            ],
            [MODEL, [VENDOR, SAMSUNG], [TYPE, MOBILE]],
            [
              // Apple
              /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i
              // iPod/iPhone
            ],
            [MODEL, [VENDOR, APPLE], [TYPE, MOBILE]],
            [
              /\((ipad);[-\w\),; ]+apple/i,
              // iPad
              /applecoremedia\/[\w\.]+ \((ipad)/i,
              /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
            ],
            [MODEL, [VENDOR, APPLE], [TYPE, TABLET]],
            [
              /(macintosh);/i
            ],
            [MODEL, [VENDOR, APPLE]],
            [
              // Sharp
              /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
            ],
            [MODEL, [VENDOR, SHARP], [TYPE, MOBILE]],
            [
              // Honor
              /\b((?:brt|eln|hey2?|gdi|jdn)-a?[lnw]09|(?:ag[rm]3?|jdn2|kob2)-a?[lw]0[09]hn)(?: bui|\)|;)/i
            ],
            [MODEL, [VENDOR, HONOR], [TYPE, TABLET]],
            [
              /honor([-\w ]+)[;\)]/i
            ],
            [MODEL, [VENDOR, HONOR], [TYPE, MOBILE]],
            [
              // Huawei
              /\b((?:ag[rs][2356]?k?|bah[234]?|bg[2o]|bt[kv]|cmr|cpn|db[ry]2?|jdn2|got|kob2?k?|mon|pce|scm|sht?|[tw]gr|vrd)-[ad]?[lw][0125][09]b?|605hw|bg2-u03|(?:gem|fdr|m2|ple|t1)-[7a]0[1-4][lu]|t1-a2[13][lw]|mediapad[\w\. ]*(?= bui|\)))\b(?!.+d\/s)/i
            ],
            [MODEL, [VENDOR, HUAWEI], [TYPE, TABLET]],
            [
              /(?:huawei)([-\w ]+)[;\)]/i,
              /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
            ],
            [MODEL, [VENDOR, HUAWEI], [TYPE, MOBILE]],
            [
              // Xiaomi
              /oid[^\)]+; (2[\dbc]{4}(182|283|rp\w{2})[cgl]|m2105k81a?c)(?: bui|\))/i,
              /\b((?:red)?mi[-_ ]?pad[\w- ]*)(?: bui|\))/i
              // Mi Pad tablets
            ],
            [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, TABLET]],
            [
              /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,
              // Xiaomi POCO
              /\b; (\w+) build\/hm\1/i,
              // Xiaomi Hongmi 'numeric' models
              /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
              // Xiaomi Hongmi
              /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
              // Xiaomi Redmi
              /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,
              // Xiaomi Redmi 'numeric' models
              /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite|pro)?)(?: bui|\))/i,
              // Xiaomi Mi
              / ([\w ]+) miui\/v?\d/i
            ],
            [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, MOBILE]],
            [
              // OnePlus
              /droid.+; (cph2[3-6]\d[13579]|((gm|hd)19|(ac|be|in|kb)20|(d[en]|eb|le|mt)21|ne22)[0-2]\d|p[g-k]\w[1m]10)\b/i,
              /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
            ],
            [MODEL, [VENDOR, ONEPLUS], [TYPE, MOBILE]],
            [
              // OPPO
              /; (\w+) bui.+ oppo/i,
              /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
            ],
            [MODEL, [VENDOR, OPPO], [TYPE, MOBILE]],
            [
              /\b(opd2(\d{3}a?))(?: bui|\))/i
            ],
            [MODEL, [VENDOR, strMapper, { "OnePlus": ["203", "304", "403", "404", "413", "415"], "*": OPPO }], [TYPE, TABLET]],
            [
              // BLU
              /(vivo (5r?|6|8l?|go|one|s|x[il]?[2-4]?)[\w\+ ]*)(?: bui|\))/i
              // Vivo series
            ],
            [MODEL, [VENDOR, "BLU"], [TYPE, MOBILE]],
            [
              // Vivo
              /; vivo (\w+)(?: bui|\))/i,
              /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
            ],
            [MODEL, [VENDOR, "Vivo"], [TYPE, MOBILE]],
            [
              // Realme
              /\b(rmx[1-3]\d{3})(?: bui|;|\))/i
            ],
            [MODEL, [VENDOR, "Realme"], [TYPE, MOBILE]],
            [
              // Lenovo
              /(ideatab[-\w ]+|602lv|d-42a|a101lv|a2109a|a3500-hv|s[56]000|pb-6505[my]|tb-?x?\d{3,4}(?:f[cu]|xu|[av])|yt\d?-[jx]?\d+[lfmx])( bui|;|\)|\/)/i,
              /lenovo ?(b[68]0[08]0-?[hf]?|tab(?:[\w- ]+?)|tb[\w-]{6,7})( bui|;|\)|\/)/i
            ],
            [MODEL, [VENDOR, LENOVO], [TYPE, TABLET]],
            [
              /lenovo[-_ ]?([-\w ]+?)(?: bui|\)|\/)/i
            ],
            [MODEL, [VENDOR, LENOVO], [TYPE, MOBILE]],
            [
              // Motorola
              /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
              /\bmot(?:orola)?[- ]([\w\s]+)(\)| bui)/i,
              /((?:moto(?! 360)[-\w\(\) ]+|xt\d{3,4}[cgkosw\+]?[-\d]*|nexus 6)(?= bui|\)))/i
            ],
            [MODEL, [VENDOR, MOTOROLA], [TYPE, MOBILE]],
            [
              /\b(mz60\d|xoom[2 ]{0,2}) build\//i
            ],
            [MODEL, [VENDOR, MOTOROLA], [TYPE, TABLET]],
            [
              // LG
              /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
            ],
            [MODEL, [VENDOR, LG], [TYPE, TABLET]],
            [
              /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
              /\blg[-e;\/ ]+(?!.*(?:browser|netcast|android tv|watch|webos))(\w+)/i,
              /\blg-?([\d\w]+) bui/i
            ],
            [MODEL, [VENDOR, LG], [TYPE, MOBILE]],
            [
              // Nokia
              /(nokia) (t[12][01])/i
            ],
            [VENDOR, MODEL, [TYPE, TABLET]],
            [
              /(?:maemo|nokia).*(n900|lumia \d+|rm-\d+)/i,
              /nokia[-_ ]?(([-\w\. ]*))/i
            ],
            [[MODEL, /_/g, " "], [TYPE, MOBILE], [VENDOR, "Nokia"]],
            [
              // Google
              /(pixel (c|tablet))\b/i
              // Google Pixel C/Tablet
            ],
            [MODEL, [VENDOR, GOOGLE], [TYPE, TABLET]],
            [
              // Google Pixel
              /droid.+;(?: google)? (g(01[13]a|020[aem]|025[jn]|1b60|1f8f|2ybb|4s1m|576d|5nz6|8hhn|8vou|a02099|c15s|d1yq|e2ae|ec77|gh2x|kv4x|p4bc|pj41|r83y|tt9q|ur25|wvk6)|pixel[\d ]*a?( pro)?( xl)?( fold)?( \(5g\))?)( bui|\))/i
            ],
            [MODEL, [VENDOR, GOOGLE], [TYPE, MOBILE]],
            [
              /(google) (pixelbook( go)?)/i
            ],
            [VENDOR, MODEL],
            [
              // Sony
              /droid.+; (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-\w\w\d\d)(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
            ],
            [MODEL, [VENDOR, SONY], [TYPE, MOBILE]],
            [
              /sony tablet [ps]/i,
              /\b(?:sony)?sgp\w+(?: bui|\))/i
            ],
            [[MODEL, "Xperia Tablet"], [VENDOR, SONY], [TYPE, TABLET]],
            [
              // Amazon
              /(alexa)webm/i,
              /(kf[a-z]{2}wi|aeo(?!bc)\w\w)( bui|\))/i,
              // Kindle Fire without Silk / Echo Show
              /(kf[a-z]+)( bui|\)).+silk\//i
              // Kindle Fire HD
            ],
            [MODEL, [VENDOR, AMAZON], [TYPE, TABLET]],
            [
              /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i
              // Fire Phone
            ],
            [[MODEL, /(.+)/g, "Fire Phone $1"], [VENDOR, AMAZON], [TYPE, MOBILE]],
            [
              // BlackBerry
              /(playbook);[-\w\),; ]+(rim)/i
              // BlackBerry PlayBook
            ],
            [MODEL, VENDOR, [TYPE, TABLET]],
            [
              /\b((?:bb[a-f]|st[hv])100-\d)/i,
              /\(bb10; (\w+)/i
              // BlackBerry 10
            ],
            [MODEL, [VENDOR, BLACKBERRY], [TYPE, MOBILE]],
            [
              // Asus
              /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
            ],
            [MODEL, [VENDOR, ASUS], [TYPE, TABLET]],
            [
              / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
            ],
            [MODEL, [VENDOR, ASUS], [TYPE, MOBILE]],
            [
              // HTC
              /(nexus 9)/i
              // HTC Nexus 9
            ],
            [MODEL, [VENDOR, "HTC"], [TYPE, TABLET]],
            [
              /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
              // HTC
              // ZTE
              /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
              /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i
              // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
            ],
            [VENDOR, [MODEL, /_/g, " "], [TYPE, MOBILE]],
            [
              // TCL
              /tcl (xess p17aa)/i,
              /droid [\w\.]+; ((?:8[14]9[16]|9(?:0(?:48|60|8[01])|1(?:3[27]|66)|2(?:6[69]|9[56])|466))[gqswx])(_\w(\w|\w\w))?(\)| bui)/i
            ],
            [MODEL, [VENDOR, "TCL"], [TYPE, TABLET]],
            [
              /droid [\w\.]+; (418(?:7d|8v)|5087z|5102l|61(?:02[dh]|25[adfh]|27[ai]|56[dh]|59k|65[ah])|a509dl|t(?:43(?:0w|1[adepqu])|50(?:6d|7[adju])|6(?:09dl|10k|12b|71[efho]|76[hjk])|7(?:66[ahju]|67[hw]|7[045][bh]|71[hk]|73o|76[ho]|79w|81[hks]?|82h|90[bhsy]|99b)|810[hs]))(_\w(\w|\w\w))?(\)| bui)/i
            ],
            [MODEL, [VENDOR, "TCL"], [TYPE, MOBILE]],
            [
              // itel
              /(itel) ((\w+))/i
            ],
            [[VENDOR, lowerize], MODEL, [TYPE, strMapper, { "tablet": ["p10001l", "w7001"], "*": "mobile" }]],
            [
              // Acer
              /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
            ],
            [MODEL, [VENDOR, "Acer"], [TYPE, TABLET]],
            [
              // Meizu
              /droid.+; (m[1-5] note) bui/i,
              /\bmz-([-\w]{2,})/i
            ],
            [MODEL, [VENDOR, "Meizu"], [TYPE, MOBILE]],
            [
              // Ulefone
              /; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i
            ],
            [MODEL, [VENDOR, "Ulefone"], [TYPE, MOBILE]],
            [
              // Energizer
              /; (energy ?\w+)(?: bui|\))/i,
              /; energizer ([\w ]+)(?: bui|\))/i
            ],
            [MODEL, [VENDOR, "Energizer"], [TYPE, MOBILE]],
            [
              // Cat
              /; cat (b35);/i,
              /; (b15q?|s22 flip|s48c|s62 pro)(?: bui|\))/i
            ],
            [MODEL, [VENDOR, "Cat"], [TYPE, MOBILE]],
            [
              // Smartfren
              /((?:new )?andromax[\w- ]+)(?: bui|\))/i
            ],
            [MODEL, [VENDOR, "Smartfren"], [TYPE, MOBILE]],
            [
              // Nothing
              /droid.+; (a(in)?(0(15|59|6[35])|142)p?)/i
            ],
            [MODEL, [VENDOR, "Nothing"], [TYPE, MOBILE]],
            [
              // Archos
              /; (x67 5g|tikeasy \w+|ac[1789]\d\w+)( b|\))/i,
              /archos ?(5|gamepad2?|([\w ]*[t1789]|hello) ?\d+[\w ]*)( b|\))/i
            ],
            [MODEL, [VENDOR, "Archos"], [TYPE, TABLET]],
            [
              /archos ([\w ]+)( b|\))/i,
              /; (ac[3-6]\d\w{2,8})( b|\))/i
            ],
            [MODEL, [VENDOR, "Archos"], [TYPE, MOBILE]],
            [
              // HMD
              /; (n159v)/i
            ],
            [MODEL, [VENDOR, "HMD"], [TYPE, MOBILE]],
            [
              // MIXED
              /(imo) (tab \w+)/i,
              // IMO
              /(infinix|tecno) (x1101b?|p904|dp(7c|8d|10a)( pro)?|p70[1-3]a?|p904|t1101)/i
              // Infinix XPad / Tecno
            ],
            [VENDOR, MODEL, [TYPE, TABLET]],
            [
              /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus(?! zenw)|dell|jolla|meizu|motorola|polytron|tecno|micromax|advan)[-_ ]?([-\w]*)/i,
              // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron/Tecno/Micromax/Advan
              /; (blu|hmd|imo|infinix|lava|oneplus|tcl)[_ ]([\w\+ ]+?)(?: bui|\)|; r)/i,
              // BLU/HMD/IMO/Infinix/Lava/OnePlus/TCL
              /(hp) ([\w ]+\w)/i,
              // HP iPAQ
              /(microsoft); (lumia[\w ]+)/i,
              // Microsoft Lumia
              /(oppo) ?([\w ]+) bui/i
              // OPPO
            ],
            [VENDOR, MODEL, [TYPE, MOBILE]],
            [
              /(kobo)\s(ereader|touch)/i,
              // Kobo
              /(hp).+(touchpad(?!.+tablet)|tablet)/i,
              // HP TouchPad
              /(kindle)\/([\w\.]+)/i
              // Kindle
            ],
            [VENDOR, MODEL, [TYPE, TABLET]],
            [
              /(surface duo)/i
              // Surface Duo
            ],
            [MODEL, [VENDOR, MICROSOFT], [TYPE, TABLET]],
            [
              /droid [\d\.]+; (fp\du?)(?: b|\))/i
              // Fairphone
            ],
            [MODEL, [VENDOR, "Fairphone"], [TYPE, MOBILE]],
            [
              /((?:tegranote|shield t(?!.+d tv))[\w- ]*?)(?: b|\))/i
              // Nvidia Tablets
            ],
            [MODEL, [VENDOR, NVIDIA], [TYPE, TABLET]],
            [
              /(sprint) (\w+)/i
              // Sprint Phones
            ],
            [VENDOR, MODEL, [TYPE, MOBILE]],
            [
              /(kin\.[onetw]{3})/i
              // Microsoft Kin
            ],
            [[MODEL, /\./g, " "], [VENDOR, MICROSOFT], [TYPE, MOBILE]],
            [
              /droid.+; ([c6]+|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i
              // Zebra
            ],
            [MODEL, [VENDOR, ZEBRA], [TYPE, TABLET]],
            [
              /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
            ],
            [MODEL, [VENDOR, ZEBRA], [TYPE, MOBILE]],
            [
              ///////////////////
              // SMARTTVS
              ///////////////////
              /smart-tv.+(samsung)/i
              // Samsung
            ],
            [VENDOR, [TYPE, SMARTTV]],
            [
              /hbbtv.+maple;(\d+)/i
            ],
            [[MODEL, /^/, "SmartTV"], [VENDOR, SAMSUNG], [TYPE, SMARTTV]],
            [
              /(vizio)(?: |.+model\/)(\w+-\w+)/i,
              // Vizio
              /tcast.+(lg)e?. ([-\w]+)/i
              // LG SmartTV
            ],
            [VENDOR, MODEL, [TYPE, SMARTTV]],
            [
              /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i
            ],
            [[VENDOR, LG], [TYPE, SMARTTV]],
            [
              /(apple) ?tv/i
              // Apple TV
            ],
            [VENDOR, [MODEL, APPLE + " TV"], [TYPE, SMARTTV]],
            [
              /crkey.*devicetype\/chromecast/i
              // Google Chromecast Third Generation
            ],
            [[MODEL, CHROMECAST + " Third Generation"], [VENDOR, GOOGLE], [TYPE, SMARTTV]],
            [
              /crkey.*devicetype\/([^/]*)/i
              // Google Chromecast with specific device type
            ],
            [[MODEL, /^/, "Chromecast "], [VENDOR, GOOGLE], [TYPE, SMARTTV]],
            [
              /fuchsia.*crkey/i
              // Google Chromecast Nest Hub
            ],
            [[MODEL, CHROMECAST + " Nest Hub"], [VENDOR, GOOGLE], [TYPE, SMARTTV]],
            [
              /crkey/i
              // Google Chromecast, Linux-based or unknown
            ],
            [[MODEL, CHROMECAST], [VENDOR, GOOGLE], [TYPE, SMARTTV]],
            [
              /(portaltv)/i
              // Facebook Portal TV
            ],
            [MODEL, [VENDOR, FACEBOOK], [TYPE, SMARTTV]],
            [
              /droid.+aft(\w+)( bui|\))/i
              // Fire TV
            ],
            [MODEL, [VENDOR, AMAZON], [TYPE, SMARTTV]],
            [
              /(shield \w+ tv)/i
              // Nvidia Shield TV
            ],
            [MODEL, [VENDOR, NVIDIA], [TYPE, SMARTTV]],
            [
              /\(dtv[\);].+(aquos)/i,
              /(aquos-tv[\w ]+)\)/i
              // Sharp
            ],
            [MODEL, [VENDOR, SHARP], [TYPE, SMARTTV]],
            [
              /(bravia[\w ]+)( bui|\))/i
              // Sony
            ],
            [MODEL, [VENDOR, SONY], [TYPE, SMARTTV]],
            [
              /(mi(tv|box)-?\w+) bui/i
              // Xiaomi
            ],
            [MODEL, [VENDOR, XIAOMI], [TYPE, SMARTTV]],
            [
              /Hbbtv.*(technisat) (.*);/i
              // TechniSAT
            ],
            [VENDOR, MODEL, [TYPE, SMARTTV]],
            [
              /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
              // Roku
              /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i
              // HbbTV devices
            ],
            [[VENDOR, /.+\/(\w+)/, "$1", strMapper, { "LG": "lge" }], [MODEL, trim], [TYPE, SMARTTV]],
            [
              // SmartTV from Unidentified Vendors
              /droid.+; ([\w- ]+) (?:android tv|smart[- ]?tv)/i
            ],
            [MODEL, [TYPE, SMARTTV]],
            [
              /\b(android tv|smart[- ]?tv|opera tv|tv; rv:|large screen[\w ]+safari)\b/i
            ],
            [[TYPE, SMARTTV]],
            [
              ///////////////////
              // CONSOLES
              ///////////////////
              /(playstation \w+)/i
              // Playstation
            ],
            [MODEL, [VENDOR, SONY], [TYPE, CONSOLE]],
            [
              /\b(xbox(?: one)?(?!; xbox))[\); ]/i
              // Microsoft Xbox
            ],
            [MODEL, [VENDOR, MICROSOFT], [TYPE, CONSOLE]],
            [
              /(ouya)/i,
              // Ouya
              /(nintendo) (\w+)/i,
              // Nintendo
              /(retroid) (pocket ([^\)]+))/i
              // Retroid Pocket
            ],
            [VENDOR, MODEL, [TYPE, CONSOLE]],
            [
              /droid.+; (shield)( bui|\))/i
              // Nvidia Portable
            ],
            [MODEL, [VENDOR, NVIDIA], [TYPE, CONSOLE]],
            [
              ///////////////////
              // WEARABLES
              ///////////////////
              /\b(sm-[lr]\d\d[0156][fnuw]?s?|gear live)\b/i
              // Samsung Galaxy Watch
            ],
            [MODEL, [VENDOR, SAMSUNG], [TYPE, WEARABLE]],
            [
              /((pebble))app/i,
              // Pebble
              /(asus|google|lg|oppo) ((pixel |zen)?watch[\w ]*)( bui|\))/i
              // Asus ZenWatch / LG Watch / Pixel Watch
            ],
            [VENDOR, MODEL, [TYPE, WEARABLE]],
            [
              /(ow(?:19|20)?we?[1-3]{1,3})/i
              // Oppo Watch
            ],
            [MODEL, [VENDOR, OPPO], [TYPE, WEARABLE]],
            [
              /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i
              // Apple Watch
            ],
            [MODEL, [VENDOR, APPLE], [TYPE, WEARABLE]],
            [
              /(opwwe\d{3})/i
              // OnePlus Watch
            ],
            [MODEL, [VENDOR, ONEPLUS], [TYPE, WEARABLE]],
            [
              /(moto 360)/i
              // Motorola 360
            ],
            [MODEL, [VENDOR, MOTOROLA], [TYPE, WEARABLE]],
            [
              /(smartwatch 3)/i
              // Sony SmartWatch
            ],
            [MODEL, [VENDOR, SONY], [TYPE, WEARABLE]],
            [
              /(g watch r)/i
              // LG G Watch R
            ],
            [MODEL, [VENDOR, LG], [TYPE, WEARABLE]],
            [
              /droid.+; (wt63?0{2,3})\)/i
            ],
            [MODEL, [VENDOR, ZEBRA], [TYPE, WEARABLE]],
            [
              ///////////////////
              // XR
              ///////////////////
              /droid.+; (glass) \d/i
              // Google Glass
            ],
            [MODEL, [VENDOR, GOOGLE], [TYPE, XR]],
            [
              /(pico) (4|neo3(?: link|pro)?)/i
              // Pico
            ],
            [VENDOR, MODEL, [TYPE, XR]],
            [
              /(quest( \d| pro)?s?).+vr/i
              // Meta Quest
            ],
            [MODEL, [VENDOR, FACEBOOK], [TYPE, XR]],
            [
              /mobile vr; rv.+firefox/i
              // Unidentifiable VR device using Firefox Reality / Wolvic
            ],
            [[TYPE, XR]],
            [
              ///////////////////
              // EMBEDDED
              ///////////////////
              /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i
              // Tesla
            ],
            [VENDOR, [TYPE, EMBEDDED]],
            [
              /(aeobc)\b/i
              // Echo Dot
            ],
            [MODEL, [VENDOR, AMAZON], [TYPE, EMBEDDED]],
            [
              /(homepod).+mac os/i
              // Apple HomePod
            ],
            [MODEL, [VENDOR, APPLE], [TYPE, EMBEDDED]],
            [
              /windows iot/i
              // Unidentifiable embedded device using Windows IoT
            ],
            [[TYPE, EMBEDDED]],
            [
              ////////////////////
              // MIXED (GENERIC)
              ///////////////////
              /droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+?(mobile|vr|\d) safari/i
            ],
            [MODEL, [TYPE, strMapper, { "mobile": "Mobile", "xr": "VR", "*": TABLET }]],
            [
              /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i
              // Unidentifiable Tablet
            ],
            [[TYPE, TABLET]],
            [
              /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i
              // Unidentifiable Mobile
            ],
            [[TYPE, MOBILE]],
            [
              /droid .+?; ([\w\. -]+)( bui|\))/i
              // Generic Android Device
            ],
            [MODEL, [VENDOR, "Generic"]]
          ],
          engine: [
            [
              /windows.+ edge\/([\w\.]+)/i
              // EdgeHTML
            ],
            [VERSION, [NAME, EDGE + "HTML"]],
            [
              /(arkweb)\/([\w\.]+)/i
              // ArkWeb
            ],
            [NAME, VERSION],
            [
              /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i
              // Blink
            ],
            [VERSION, [NAME, "Blink"]],
            [
              /(presto)\/([\w\.]+)/i,
              // Presto
              /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna|servo)\/([\w\.]+)/i,
              // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna/Servo
              /ekioh(flow)\/([\w\.]+)/i,
              // Flow
              /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
              // KHTML/Tasman/Links
              /(icab)[\/ ]([23]\.[\d\.]+)/i,
              // iCab
              /\b(libweb)/i
              // LibWeb
            ],
            [NAME, VERSION],
            [
              /ladybird\//i
            ],
            [[NAME, "LibWeb"]],
            [
              /rv\:([\w\.]{1,9})\b.+(gecko)/i
              // Gecko
            ],
            [VERSION, NAME]
          ],
          os: [
            [
              // Windows
              /(windows nt) (6\.[23]); arm/i
              // Windows RT
            ],
            [[NAME, /N/, "R"], [VERSION, strMapper, windowsVersionMap]],
            [
              /(windows (?:phone|mobile|iot))(?: os)?[\/ ]?([\d\.]*( se)?)/i,
              // Windows IoT/Mobile/Phone
              // Windows NT/3.1/95/98/ME/2000/XP/Vista/7/8/8.1/10/11
              /(windows)[\/ ](1[01]|2000|3\.1|7|8(\.1)?|9[58]|me|server 20\d\d( r2)?|vista|xp)/i
            ],
            [NAME, VERSION],
            [
              /windows nt ?([\d\.\)]*)(?!.+xbox)/i,
              /\bwin(?=3| ?9|n)(?:nt| 9x )?([\d\.;]*)/i
            ],
            [[VERSION, /(;|\))/g, "", strMapper, windowsVersionMap], [NAME, WINDOWS]],
            [
              /(windows ce)\/?([\d\.]*)/i
              // Windows CE
            ],
            [NAME, VERSION],
            [
              // iOS/macOS
              /[adehimnop]{4,7}\b(?:.*os ([\w]+) like mac|; opera)/i,
              // iOS
              /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
              /cfnetwork\/.+darwin/i
            ],
            [[VERSION, /_/g, "."], [NAME, "iOS"]],
            [
              /(mac os x) ?([\w\. ]*)/i,
              /(macintosh|mac_powerpc\b)(?!.+(haiku|morphos))/i
              // Mac OS
            ],
            [[NAME, "macOS"], [VERSION, /_/g, "."]],
            [
              // Google Chromecast
              /android ([\d\.]+).*crkey/i
              // Google Chromecast, Android-based
            ],
            [VERSION, [NAME, CHROMECAST + " Android"]],
            [
              /fuchsia.*crkey\/([\d\.]+)/i
              // Google Chromecast, Fuchsia-based
            ],
            [VERSION, [NAME, CHROMECAST + " Fuchsia"]],
            [
              /crkey\/([\d\.]+).*devicetype\/smartspeaker/i
              // Google Chromecast, Linux-based Smart Speaker
            ],
            [VERSION, [NAME, CHROMECAST + " SmartSpeaker"]],
            [
              /linux.*crkey\/([\d\.]+)/i
              // Google Chromecast, Legacy Linux-based
            ],
            [VERSION, [NAME, CHROMECAST + " Linux"]],
            [
              /crkey\/([\d\.]+)/i
              // Google Chromecast, unknown
            ],
            [VERSION, [NAME, CHROMECAST]],
            [
              // Mobile OSes
              /droid ([\w\.]+)\b.+(android[- ]x86)/i
              // Android-x86
            ],
            [VERSION, NAME],
            [
              /(ubuntu) ([\w\.]+) like android/i
              // Ubuntu Touch
            ],
            [[NAME, /(.+)/, "$1 Touch"], VERSION],
            [
              /(harmonyos)[\/ ]?([\d\.]*)/i,
              // HarmonyOS
              // Android/Blackberry/WebOS/QNX/Bada/RIM/KaiOS/Maemo/MeeGo/S40/Sailfish OS/OpenHarmony/Tizen
              /(android|bada|blackberry|kaios|maemo|meego|openharmony|qnx|rim tablet os|sailfish|series40|symbian|tizen)\w*[-\/\.; ]?([\d\.]*)/i
            ],
            [NAME, VERSION],
            [
              /\(bb(10);/i
              // BlackBerry 10
            ],
            [VERSION, [NAME, BLACKBERRY]],
            [
              /(?:symbian ?os|symbos|s60(?=;)|series ?60)[-\/ ]?([\w\.]*)/i
              // Symbian
            ],
            [VERSION, [NAME, "Symbian"]],
            [
              /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i
              // Firefox OS
            ],
            [VERSION, [NAME, FIREFOX + " OS"]],
            [
              /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i,
              // WebOS
              /webos(?:[ \/]?|\.tv-20(?=2[2-9]))(\d[\d\.]*)/i
            ],
            [VERSION, [NAME, "webOS"]],
            [
              /web0s;.+?(?:chr[o0]me|safari)\/(\d+)/i
              // https://webostv.developer.lge.com/develop/specifications/web-api-and-web-engine
            ],
            [[VERSION, strMapper, { "25": "120", "24": "108", "23": "94", "22": "87", "6": "79", "5": "68", "4": "53", "3": "38", "2": "538", "1": "537", "*": "TV" }], [NAME, "webOS"]],
            [
              /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i
              // watchOS
            ],
            [VERSION, [NAME, "watchOS"]],
            [
              // Google ChromeOS
              /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i
              // Chromium OS
            ],
            [[NAME, "Chrome OS"], VERSION],
            [
              // Smart TVs
              /panasonic;(viera)/i,
              // Panasonic Viera
              /(netrange)mmh/i,
              // Netrange
              /(nettv)\/(\d+\.[\w\.]+)/i,
              // NetTV
              // Console
              /(nintendo|playstation) (\w+)/i,
              // Nintendo/Playstation
              /(xbox); +xbox ([^\);]+)/i,
              // Microsoft Xbox (360, One, X, S, Series X, Series S)
              /(pico) .+os([\w\.]+)/i,
              // Pico
              // Other
              /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
              // Joli/Palm
              /linux.+(mint)[\/\(\) ]?([\w\.]*)/i,
              // Mint
              /(mageia|vectorlinux|fuchsia|arcaos|arch(?= ?linux))[;l ]([\d\.]*)/i,
              // Mageia/VectorLinux/Fuchsia/ArcaOS/Arch
              /([kxln]?ubuntu|debian|suse|opensuse|gentoo|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire|knoppix)(?: gnu[\/ ]linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
              // Ubuntu/Debian/SUSE/Gentoo/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire/Knoppix
              /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
              // Solaris
              /\b(aix)[; ]([1-9\.]{0,4})/i,
              // AIX
              /(hurd|linux|morphos)(?: (?:arm|x86|ppc)\w*| ?)([\w\.]*)/i,
              // Hurd/Linux/MorphOS
              /(gnu) ?([\w\.]*)/i,
              // GNU
              /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
              // FreeBSD/NetBSD/OpenBSD/PC-BSD/GhostBSD/DragonFly
              /(haiku) ?(r\d)?/i
              // Haiku
            ],
            [NAME, VERSION],
            [
              /(sunos) ?([\d\.]*)/i
              // Solaris
            ],
            [[NAME, "Solaris"], VERSION],
            [
              /\b(beos|os\/2|amigaos|openvms|hp-ux|serenityos)/i,
              // BeOS/OS2/AmigaOS/OpenVMS/HP-UX/SerenityOS
              /(unix) ?([\w\.]*)/i
              // UNIX
            ],
            [NAME, VERSION]
          ]
        };
        var defaultProps = function() {
          var props = { init: {}, isIgnore: {}, isIgnoreRgx: {}, toString: {} };
          setProps.call(props.init, [
            [UA_BROWSER, [NAME, VERSION, MAJOR, TYPE]],
            [UA_CPU, [ARCHITECTURE]],
            [UA_DEVICE, [TYPE, MODEL, VENDOR]],
            [UA_ENGINE, [NAME, VERSION]],
            [UA_OS, [NAME, VERSION]]
          ]);
          setProps.call(props.isIgnore, [
            [UA_BROWSER, [VERSION, MAJOR]],
            [UA_ENGINE, [VERSION]],
            [UA_OS, [VERSION]]
          ]);
          setProps.call(props.isIgnoreRgx, [
            [UA_BROWSER, / ?browser$/i],
            [UA_OS, / ?os$/i]
          ]);
          setProps.call(props.toString, [
            [UA_BROWSER, [NAME, VERSION]],
            [UA_CPU, [ARCHITECTURE]],
            [UA_DEVICE, [VENDOR, MODEL]],
            [UA_ENGINE, [NAME, VERSION]],
            [UA_OS, [NAME, VERSION]]
          ]);
          return props;
        }();
        var createIData = function(item, itemType) {
          var init_props = defaultProps.init[itemType], is_ignoreProps = defaultProps.isIgnore[itemType] || 0, is_ignoreRgx = defaultProps.isIgnoreRgx[itemType] || 0, toString_props = defaultProps.toString[itemType] || 0;
          function IData() {
            setProps.call(this, init_props);
          }
          IData.prototype.getItem = function() {
            return item;
          };
          IData.prototype.withClientHints = function() {
            if (!NAVIGATOR_UADATA) {
              return item.parseCH().get();
            }
            return NAVIGATOR_UADATA.getHighEntropyValues(CH_ALL_VALUES).then(function(res) {
              return item.setCH(new UACHData(res, false)).parseCH().get();
            });
          };
          IData.prototype.withFeatureCheck = function() {
            return item.detectFeature().get();
          };
          if (itemType != UA_RESULT) {
            IData.prototype.is = function(strToCheck) {
              var is = false;
              for (var i in this) {
                if (this.hasOwnProperty(i) && !has(is_ignoreProps, i) && lowerize(is_ignoreRgx ? strip(is_ignoreRgx, this[i]) : this[i]) == lowerize(is_ignoreRgx ? strip(is_ignoreRgx, strToCheck) : strToCheck)) {
                  is = true;
                  if (strToCheck != UNDEF_TYPE) break;
                } else if (strToCheck == UNDEF_TYPE && is) {
                  is = !is;
                  break;
                }
              }
              return is;
            };
            IData.prototype.toString = function() {
              var str = EMPTY;
              for (var i in toString_props) {
                if (typeof this[toString_props[i]] !== UNDEF_TYPE) {
                  str += (str ? " " : EMPTY) + this[toString_props[i]];
                }
              }
              return str || UNDEF_TYPE;
            };
          }
          if (!NAVIGATOR_UADATA) {
            IData.prototype.then = function(cb) {
              var that = this;
              var IDataResolve = function() {
                for (var prop in that) {
                  if (that.hasOwnProperty(prop)) {
                    this[prop] = that[prop];
                  }
                }
              };
              IDataResolve.prototype = {
                is: IData.prototype.is,
                toString: IData.prototype.toString
              };
              var resolveData = new IDataResolve();
              cb(resolveData);
              return resolveData;
            };
          }
          return new IData();
        };
        function UACHData(uach, isHttpUACH) {
          uach = uach || {};
          setProps.call(this, CH_ALL_VALUES);
          if (isHttpUACH) {
            setProps.call(this, [
              [BRANDS, itemListToArray(uach[CH_HEADER])],
              [FULLVERLIST, itemListToArray(uach[CH_HEADER_FULL_VER_LIST])],
              [MOBILE, /\?1/.test(uach[CH_HEADER_MOBILE])],
              [MODEL, stripQuotes(uach[CH_HEADER_MODEL])],
              [PLATFORM, stripQuotes(uach[CH_HEADER_PLATFORM])],
              [PLATFORMVER, stripQuotes(uach[CH_HEADER_PLATFORM_VER])],
              [ARCHITECTURE, stripQuotes(uach[CH_HEADER_ARCH])],
              [FORMFACTORS, itemListToArray(uach[CH_HEADER_FORM_FACTORS])],
              [BITNESS, stripQuotes(uach[CH_HEADER_BITNESS])]
            ]);
          } else {
            for (var prop in uach) {
              if (this.hasOwnProperty(prop) && typeof uach[prop] !== UNDEF_TYPE) this[prop] = uach[prop];
            }
          }
        }
        function UAItem(itemType, ua, rgxMap, uaCH) {
          this.get = function(prop) {
            if (!prop) return this.data;
            return this.data.hasOwnProperty(prop) ? this.data[prop] : undefined2;
          };
          this.set = function(prop, val) {
            this.data[prop] = val;
            return this;
          };
          this.setCH = function(ch) {
            this.uaCH = ch;
            return this;
          };
          this.detectFeature = function() {
            if (NAVIGATOR && NAVIGATOR.userAgent == this.ua) {
              switch (this.itemType) {
                case UA_BROWSER:
                  if (NAVIGATOR.brave && typeof NAVIGATOR.brave.isBrave == FUNC_TYPE) {
                    this.set(NAME, "Brave");
                  }
                  break;
                case UA_DEVICE:
                  if (!this.get(TYPE) && NAVIGATOR_UADATA && NAVIGATOR_UADATA[MOBILE]) {
                    this.set(TYPE, MOBILE);
                  }
                  if (this.get(MODEL) == "Macintosh" && NAVIGATOR && typeof NAVIGATOR.standalone !== UNDEF_TYPE && NAVIGATOR.maxTouchPoints && NAVIGATOR.maxTouchPoints > 2) {
                    this.set(MODEL, "iPad").set(TYPE, TABLET);
                  }
                  break;
                case UA_OS:
                  if (!this.get(NAME) && NAVIGATOR_UADATA && NAVIGATOR_UADATA[PLATFORM]) {
                    this.set(NAME, NAVIGATOR_UADATA[PLATFORM]);
                  }
                  break;
                case UA_RESULT:
                  var data = this.data;
                  var detect = function(itemType2) {
                    return data[itemType2].getItem().detectFeature().get();
                  };
                  this.set(UA_BROWSER, detect(UA_BROWSER)).set(UA_CPU, detect(UA_CPU)).set(UA_DEVICE, detect(UA_DEVICE)).set(UA_ENGINE, detect(UA_ENGINE)).set(UA_OS, detect(UA_OS));
              }
            }
            return this;
          };
          this.parseUA = function() {
            if (this.itemType != UA_RESULT) {
              rgxMapper.call(this.data, this.ua, this.rgxMap);
            }
            if (this.itemType == UA_BROWSER) {
              this.set(MAJOR, majorize(this.get(VERSION)));
            }
            return this;
          };
          this.parseCH = function() {
            var uaCH2 = this.uaCH, rgxMap2 = this.rgxMap;
            switch (this.itemType) {
              case UA_BROWSER:
              case UA_ENGINE:
                var brands = uaCH2[FULLVERLIST] || uaCH2[BRANDS], prevName;
                if (brands) {
                  for (var i in brands) {
                    var brandName = brands[i].brand || brands[i], brandVersion = brands[i].version;
                    if (this.itemType == UA_BROWSER && !/not.a.brand/i.test(brandName) && (!prevName || /Chrom/.test(prevName) && brandName != CHROMIUM || prevName == EDGE && /WebView2/.test(brandName))) {
                      brandName = strMapper(brandName, browserHintsMap);
                      prevName = this.get(NAME);
                      if (!(prevName && !/Chrom/.test(prevName) && /Chrom/.test(brandName))) {
                        this.set(NAME, brandName).set(VERSION, brandVersion).set(MAJOR, majorize(brandVersion));
                      }
                      prevName = brandName;
                    }
                    if (this.itemType == UA_ENGINE && brandName == CHROMIUM) {
                      this.set(VERSION, brandVersion);
                    }
                  }
                }
                break;
              case UA_CPU:
                var archName = uaCH2[ARCHITECTURE];
                if (archName) {
                  if (archName && uaCH2[BITNESS] == "64") archName += "64";
                  rgxMapper.call(this.data, archName + ";", rgxMap2);
                }
                break;
              case UA_DEVICE:
                if (uaCH2[MOBILE]) {
                  this.set(TYPE, MOBILE);
                }
                if (uaCH2[MODEL]) {
                  this.set(MODEL, uaCH2[MODEL]);
                  if (!this.get(TYPE) || !this.get(VENDOR)) {
                    var reParse = {};
                    rgxMapper.call(reParse, "droid 9; " + uaCH2[MODEL] + ")", rgxMap2);
                    if (!this.get(TYPE) && !!reParse.type) {
                      this.set(TYPE, reParse.type);
                    }
                    if (!this.get(VENDOR) && !!reParse.vendor) {
                      this.set(VENDOR, reParse.vendor);
                    }
                  }
                }
                if (uaCH2[FORMFACTORS]) {
                  var ff;
                  if (typeof uaCH2[FORMFACTORS] !== "string") {
                    var idx = 0;
                    while (!ff && idx < uaCH2[FORMFACTORS].length) {
                      ff = strMapper(uaCH2[FORMFACTORS][idx++], formFactorsMap);
                    }
                  } else {
                    ff = strMapper(uaCH2[FORMFACTORS], formFactorsMap);
                  }
                  this.set(TYPE, ff);
                }
                break;
              case UA_OS:
                var osName = uaCH2[PLATFORM];
                if (osName) {
                  var osVersion = uaCH2[PLATFORMVER];
                  if (osName == WINDOWS) osVersion = parseInt(majorize(osVersion), 10) >= 13 ? "11" : "10";
                  this.set(NAME, osName).set(VERSION, osVersion);
                }
                if (this.get(NAME) == WINDOWS && uaCH2[MODEL] == "Xbox") {
                  this.set(NAME, "Xbox").set(VERSION, undefined2);
                }
                break;
              case UA_RESULT:
                var data = this.data;
                var parse2 = function(itemType2) {
                  return data[itemType2].getItem().setCH(uaCH2).parseCH().get();
                };
                this.set(UA_BROWSER, parse2(UA_BROWSER)).set(UA_CPU, parse2(UA_CPU)).set(UA_DEVICE, parse2(UA_DEVICE)).set(UA_ENGINE, parse2(UA_ENGINE)).set(UA_OS, parse2(UA_OS));
            }
            return this;
          };
          setProps.call(this, [
            ["itemType", itemType],
            ["ua", ua],
            ["uaCH", uaCH],
            ["rgxMap", rgxMap],
            ["data", createIData(this, itemType)]
          ]);
          return this;
        }
        function UAParser(ua, extensions, headers) {
          if (typeof ua === OBJ_TYPE) {
            if (isExtensions(ua, true)) {
              if (typeof extensions === OBJ_TYPE) {
                headers = extensions;
              }
              extensions = ua;
            } else {
              headers = ua;
              extensions = undefined2;
            }
            ua = undefined2;
          } else if (typeof ua === STR_TYPE && !isExtensions(extensions, true)) {
            headers = extensions;
            extensions = undefined2;
          }
          if (headers && typeof headers.append === FUNC_TYPE) {
            var kv = {};
            headers.forEach(function(v, k) {
              kv[k] = v;
            });
            headers = kv;
          }
          if (!(this instanceof UAParser)) {
            return new UAParser(ua, extensions, headers).getResult();
          }
          var userAgent = typeof ua === STR_TYPE ? ua : (
            // Passed user-agent string
            headers && headers[USER_AGENT] ? headers[USER_AGENT] : (
              // User-Agent from passed headers
              NAVIGATOR && NAVIGATOR.userAgent ? NAVIGATOR.userAgent : (
                // navigator.userAgent
                EMPTY
              )
            )
          ), httpUACH = new UACHData(headers, true), regexMap = extensions ? extend(defaultRegexes, extensions) : defaultRegexes, createItemFunc = function(itemType) {
            if (itemType == UA_RESULT) {
              return function() {
                return new UAItem(itemType, userAgent, regexMap, httpUACH).set("ua", userAgent).set(UA_BROWSER, this.getBrowser()).set(UA_CPU, this.getCPU()).set(UA_DEVICE, this.getDevice()).set(UA_ENGINE, this.getEngine()).set(UA_OS, this.getOS()).get();
              };
            } else {
              return function() {
                return new UAItem(itemType, userAgent, regexMap[itemType], httpUACH).parseUA().get();
              };
            }
          };
          setProps.call(this, [
            ["getBrowser", createItemFunc(UA_BROWSER)],
            ["getCPU", createItemFunc(UA_CPU)],
            ["getDevice", createItemFunc(UA_DEVICE)],
            ["getEngine", createItemFunc(UA_ENGINE)],
            ["getOS", createItemFunc(UA_OS)],
            ["getResult", createItemFunc(UA_RESULT)],
            ["getUA", function() {
              return userAgent;
            }],
            ["setUA", function(ua2) {
              if (isString(ua2))
                userAgent = ua2.length > UA_MAX_LENGTH ? trim(ua2, UA_MAX_LENGTH) : ua2;
              return this;
            }]
          ]).setUA(userAgent);
          return this;
        }
        UAParser.VERSION = LIBVERSION;
        UAParser.BROWSER = enumerize([NAME, VERSION, MAJOR, TYPE]);
        UAParser.CPU = enumerize([ARCHITECTURE]);
        UAParser.DEVICE = enumerize([MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED]);
        UAParser.ENGINE = UAParser.OS = enumerize([NAME, VERSION]);
        if (typeof exports !== UNDEF_TYPE) {
          if (typeof module !== UNDEF_TYPE && module.exports) {
            exports = module.exports = UAParser;
          }
          exports.UAParser = UAParser;
        } else {
          if (typeof define === FUNC_TYPE && define.amd) {
            define(function() {
              return UAParser;
            });
          } else if (isWindow) {
            window2.UAParser = UAParser;
          }
        }
        var $ = isWindow && (window2.jQuery || window2.Zepto);
        if ($ && !$.ua) {
          var parser = new UAParser();
          $.ua = parser.getResult();
          $.ua.get = function() {
            return parser.getUA();
          };
          $.ua.set = function(ua) {
            parser.setUA(ua);
            var result = parser.getResult();
            for (var prop in result) {
              $.ua[prop] = result[prop];
            }
          };
        }
      })(typeof window === "object" ? window : exports);
    }
  });

  // node_modules/mediasoup-client/lib/Logger.js
  var require_Logger = __commonJS({
    "node_modules/mediasoup-client/lib/Logger.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Logger = void 0;
      var debug_1 = require_browser();
      var APP_NAME = "mediasoup-client";
      var Logger = class {
        _debug;
        _warn;
        _error;
        constructor(prefix) {
          if (prefix) {
            this._debug = (0, debug_1.default)(`${APP_NAME}:${prefix}`);
            this._warn = (0, debug_1.default)(`${APP_NAME}:WARN:${prefix}`);
            this._error = (0, debug_1.default)(`${APP_NAME}:ERROR:${prefix}`);
          } else {
            this._debug = (0, debug_1.default)(APP_NAME);
            this._warn = (0, debug_1.default)(`${APP_NAME}:WARN`);
            this._error = (0, debug_1.default)(`${APP_NAME}:ERROR`);
          }
          this._debug.log = console.info.bind(console);
          this._warn.log = console.warn.bind(console);
          this._error.log = console.error.bind(console);
        }
        get debug() {
          return this._debug;
        }
        get warn() {
          return this._warn;
        }
        get error() {
          return this._error;
        }
      };
      exports.Logger = Logger;
    }
  });

  // node_modules/events-alias/events.js
  var require_events = __commonJS({
    "node_modules/events-alias/events.js"(exports, module) {
      "use strict";
      var R = typeof Reflect === "object" ? Reflect : null;
      var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };
      var ReflectOwnKeys;
      if (R && typeof R.ownKeys === "function") {
        ReflectOwnKeys = R.ownKeys;
      } else if (Object.getOwnPropertySymbols) {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
        };
      } else {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target);
        };
      }
      function ProcessEmitWarning(warning) {
        if (console && console.warn) console.warn(warning);
      }
      var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value2) {
        return value2 !== value2;
      };
      function EventEmitter() {
        EventEmitter.init.call(this);
      }
      module.exports = EventEmitter;
      module.exports.once = once;
      EventEmitter.EventEmitter = EventEmitter;
      EventEmitter.prototype._events = void 0;
      EventEmitter.prototype._eventsCount = 0;
      EventEmitter.prototype._maxListeners = void 0;
      var defaultMaxListeners = 10;
      function checkListener(listener) {
        if (typeof listener !== "function") {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
      }
      Object.defineProperty(EventEmitter, "defaultMaxListeners", {
        enumerable: true,
        get: function() {
          return defaultMaxListeners;
        },
        set: function(arg) {
          if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
          }
          defaultMaxListeners = arg;
        }
      });
      EventEmitter.init = function() {
        if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      };
      EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
        if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
        }
        this._maxListeners = n;
        return this;
      };
      function _getMaxListeners(that) {
        if (that._maxListeners === void 0)
          return EventEmitter.defaultMaxListeners;
        return that._maxListeners;
      }
      EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
        return _getMaxListeners(this);
      };
      EventEmitter.prototype.emit = function emit(type) {
        var args = [];
        for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
        var doError = type === "error";
        var events = this._events;
        if (events !== void 0)
          doError = doError && events.error === void 0;
        else if (!doError)
          return false;
        if (doError) {
          var er;
          if (args.length > 0)
            er = args[0];
          if (er instanceof Error) {
            throw er;
          }
          var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
          err.context = er;
          throw err;
        }
        var handler = events[type];
        if (handler === void 0)
          return false;
        if (typeof handler === "function") {
          ReflectApply(handler, this, args);
        } else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            ReflectApply(listeners[i], this, args);
        }
        return true;
      };
      function _addListener(target, type, listener, prepend) {
        var m;
        var events;
        var existing;
        checkListener(listener);
        events = target._events;
        if (events === void 0) {
          events = target._events = /* @__PURE__ */ Object.create(null);
          target._eventsCount = 0;
        } else {
          if (events.newListener !== void 0) {
            target.emit(
              "newListener",
              type,
              listener.listener ? listener.listener : listener
            );
            events = target._events;
          }
          existing = events[type];
        }
        if (existing === void 0) {
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === "function") {
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
          } else if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
          m = _getMaxListeners(target);
          if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
          }
        }
        return target;
      }
      EventEmitter.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };
      EventEmitter.prototype.on = EventEmitter.prototype.addListener;
      EventEmitter.prototype.prependListener = function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };
      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          if (arguments.length === 0)
            return this.listener.call(this.target);
          return this.listener.apply(this.target, arguments);
        }
      }
      function _onceWrap(target, type, listener) {
        var state = { fired: false, wrapFn: void 0, target, type, listener };
        var wrapped = onceWrapper.bind(state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }
      EventEmitter.prototype.once = function once2(type, listener) {
        checkListener(listener);
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter.prototype.removeListener = function removeListener(type, listener) {
        var list, events, position, i, originalListener;
        checkListener(listener);
        events = this._events;
        if (events === void 0)
          return this;
        list = events[type];
        if (list === void 0)
          return this;
        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list.listener || listener);
          }
        } else if (typeof list !== "function") {
          position = -1;
          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }
          if (position < 0)
            return this;
          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }
          if (list.length === 1)
            events[type] = list[0];
          if (events.removeListener !== void 0)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      };
      EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
      EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
        var listeners, events, i;
        events = this._events;
        if (events === void 0)
          return this;
        if (events.removeListener === void 0) {
          if (arguments.length === 0) {
            this._events = /* @__PURE__ */ Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== void 0) {
            if (--this._eventsCount === 0)
              this._events = /* @__PURE__ */ Object.create(null);
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === "removeListener") continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
          return this;
        }
        listeners = events[type];
        if (typeof listeners === "function") {
          this.removeListener(type, listeners);
        } else if (listeners !== void 0) {
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }
        return this;
      };
      function _listeners(target, type, unwrap) {
        var events = target._events;
        if (events === void 0)
          return [];
        var evlistener = events[type];
        if (evlistener === void 0)
          return [];
        if (typeof evlistener === "function")
          return unwrap ? [evlistener.listener || evlistener] : [evlistener];
        return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }
      EventEmitter.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };
      EventEmitter.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };
      EventEmitter.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === "function") {
          return emitter.listenerCount(type);
        } else {
          return listenerCount.call(emitter, type);
        }
      };
      EventEmitter.prototype.listenerCount = listenerCount;
      function listenerCount(type) {
        var events = this._events;
        if (events !== void 0) {
          var evlistener = events[type];
          if (typeof evlistener === "function") {
            return 1;
          } else if (evlistener !== void 0) {
            return evlistener.length;
          }
        }
        return 0;
      }
      EventEmitter.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
      };
      function arrayClone(arr, n) {
        var copy = new Array(n);
        for (var i = 0; i < n; ++i)
          copy[i] = arr[i];
        return copy;
      }
      function spliceOne(list, index) {
        for (; index + 1 < list.length; index++)
          list[index] = list[index + 1];
        list.pop();
      }
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < ret.length; ++i) {
          ret[i] = arr[i].listener || arr[i];
        }
        return ret;
      }
      function once(emitter, name) {
        return new Promise(function(resolve, reject) {
          function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
          }
          function resolver() {
            if (typeof emitter.removeListener === "function") {
              emitter.removeListener("error", errorListener);
            }
            resolve([].slice.call(arguments));
          }
          ;
          eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
          if (name !== "error") {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
          }
        });
      }
      function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
        if (typeof emitter.on === "function") {
          eventTargetAgnosticAddListener(emitter, "error", handler, flags);
        }
      }
      function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
        if (typeof emitter.on === "function") {
          if (flags.once) {
            emitter.once(name, listener);
          } else {
            emitter.on(name, listener);
          }
        } else if (typeof emitter.addEventListener === "function") {
          emitter.addEventListener(name, function wrapListener(arg) {
            if (flags.once) {
              emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
          });
        } else {
          throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
        }
      }
    }
  });

  // node_modules/mediasoup-client/lib/enhancedEvents.js
  var require_enhancedEvents = __commonJS({
    "node_modules/mediasoup-client/lib/enhancedEvents.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.EnhancedEventEmitter = void 0;
      var events_alias_1 = require_events();
      var Logger_1 = require_Logger();
      var enhancedEventEmitterLogger = new Logger_1.Logger("EnhancedEventEmitter");
      var EnhancedEventEmitter = class extends events_alias_1.EventEmitter {
        constructor() {
          super();
          this.setMaxListeners(Infinity);
        }
        emit(eventName, ...args) {
          return super.emit(eventName, ...args);
        }
        /**
         * Special addition to the EventEmitter API.
         */
        safeEmit(eventName, ...args) {
          try {
            return super.emit(eventName, ...args);
          } catch (error) {
            enhancedEventEmitterLogger.error("safeEmit() | event listener threw an error [eventName:%s]:%o", eventName, error);
            try {
              super.emit("listenererror", eventName, error);
            } catch (error2) {
            }
            return Boolean(super.listenerCount(eventName));
          }
        }
        on(eventName, listener) {
          super.on(eventName, listener);
          return this;
        }
        off(eventName, listener) {
          super.off(eventName, listener);
          return this;
        }
        addListener(eventName, listener) {
          super.on(eventName, listener);
          return this;
        }
        prependListener(eventName, listener) {
          super.prependListener(eventName, listener);
          return this;
        }
        once(eventName, listener) {
          super.once(eventName, listener);
          return this;
        }
        prependOnceListener(eventName, listener) {
          super.prependOnceListener(eventName, listener);
          return this;
        }
        removeListener(eventName, listener) {
          super.off(eventName, listener);
          return this;
        }
        removeAllListeners(eventName) {
          super.removeAllListeners(eventName);
          return this;
        }
        listenerCount(eventName) {
          return super.listenerCount(eventName);
        }
        listeners(eventName) {
          return super.listeners(eventName);
        }
        rawListeners(eventName) {
          return super.rawListeners(eventName);
        }
      };
      exports.EnhancedEventEmitter = EnhancedEventEmitter;
    }
  });

  // node_modules/mediasoup-client/lib/errors.js
  var require_errors = __commonJS({
    "node_modules/mediasoup-client/lib/errors.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.InvalidStateError = exports.UnsupportedError = void 0;
      var UnsupportedError = class _UnsupportedError extends Error {
        constructor(message) {
          super(message);
          this.name = "UnsupportedError";
          if (Error.hasOwnProperty("captureStackTrace")) {
            Error.captureStackTrace(this, _UnsupportedError);
          } else {
            this.stack = new Error(message).stack;
          }
        }
      };
      exports.UnsupportedError = UnsupportedError;
      var InvalidStateError = class _InvalidStateError extends Error {
        constructor(message) {
          super(message);
          this.name = "InvalidStateError";
          if (Error.hasOwnProperty("captureStackTrace")) {
            Error.captureStackTrace(this, _InvalidStateError);
          } else {
            this.stack = new Error(message).stack;
          }
        }
      };
      exports.InvalidStateError = InvalidStateError;
    }
  });

  // node_modules/mediasoup-client/lib/utils.js
  var require_utils = __commonJS({
    "node_modules/mediasoup-client/lib/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.clone = clone;
      exports.generateRandomNumber = generateRandomNumber;
      exports.deepFreeze = deepFreeze;
      function clone(value2) {
        if (value2 === void 0) {
          return void 0;
        } else if (Number.isNaN(value2)) {
          return NaN;
        } else if (typeof structuredClone === "function") {
          return structuredClone(value2);
        } else {
          return JSON.parse(JSON.stringify(value2));
        }
      }
      function generateRandomNumber() {
        return Math.round(Math.random() * 1e7);
      }
      function deepFreeze(object) {
        const propNames = Reflect.ownKeys(object);
        for (const name of propNames) {
          const value2 = object[name];
          if (value2 && typeof value2 === "object" || typeof value2 === "function") {
            deepFreeze(value2);
          }
        }
        return Object.freeze(object);
      }
    }
  });

  // node_modules/h264-profile-level-id/node_modules/ms/index.js
  var require_ms2 = __commonJS({
    "node_modules/h264-profile-level-id/node_modules/ms/index.js"(exports, module) {
      var s = 1e3;
      var m = s * 60;
      var h = m * 60;
      var d = h * 24;
      var w = d * 7;
      var y = d * 365.25;
      module.exports = function(val, options) {
        options = options || {};
        var type = typeof val;
        if (type === "string" && val.length > 0) {
          return parse2(val);
        } else if (type === "number" && isFinite(val)) {
          return options.long ? fmtLong(val) : fmtShort(val);
        }
        throw new Error(
          "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
        );
      };
      function parse2(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          str
        );
        if (!match) {
          return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || "ms").toLowerCase();
        switch (type) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return n * y;
          case "weeks":
          case "week":
          case "w":
            return n * w;
          case "days":
          case "day":
          case "d":
            return n * d;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return n * h;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return n * m;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return n * s;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return n;
          default:
            return void 0;
        }
      }
      function fmtShort(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return Math.round(ms / d) + "d";
        }
        if (msAbs >= h) {
          return Math.round(ms / h) + "h";
        }
        if (msAbs >= m) {
          return Math.round(ms / m) + "m";
        }
        if (msAbs >= s) {
          return Math.round(ms / s) + "s";
        }
        return ms + "ms";
      }
      function fmtLong(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return plural(ms, msAbs, d, "day");
        }
        if (msAbs >= h) {
          return plural(ms, msAbs, h, "hour");
        }
        if (msAbs >= m) {
          return plural(ms, msAbs, m, "minute");
        }
        if (msAbs >= s) {
          return plural(ms, msAbs, s, "second");
        }
        return ms + " ms";
      }
      function plural(ms, msAbs, n, name) {
        var isPlural = msAbs >= n * 1.5;
        return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
      }
    }
  });

  // node_modules/h264-profile-level-id/node_modules/debug/src/common.js
  var require_common2 = __commonJS({
    "node_modules/h264-profile-level-id/node_modules/debug/src/common.js"(exports, module) {
      function setup(env) {
        createDebug.debug = createDebug;
        createDebug.default = createDebug;
        createDebug.coerce = coerce;
        createDebug.disable = disable;
        createDebug.enable = enable;
        createDebug.enabled = enabled;
        createDebug.humanize = require_ms2();
        createDebug.destroy = destroy;
        Object.keys(env).forEach((key) => {
          createDebug[key] = env[key];
        });
        createDebug.names = [];
        createDebug.skips = [];
        createDebug.formatters = {};
        function selectColor(namespace) {
          let hash = 0;
          for (let i = 0; i < namespace.length; i++) {
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0;
          }
          return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
        }
        createDebug.selectColor = selectColor;
        function createDebug(namespace) {
          let prevTime;
          let enableOverride = null;
          let namespacesCache;
          let enabledCache;
          function debug(...args) {
            if (!debug.enabled) {
              return;
            }
            const self2 = debug;
            const curr = Number(/* @__PURE__ */ new Date());
            const ms = curr - (prevTime || curr);
            self2.diff = ms;
            self2.prev = prevTime;
            self2.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== "string") {
              args.unshift("%O");
            }
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
              if (match === "%%") {
                return "%";
              }
              index++;
              const formatter = createDebug.formatters[format];
              if (typeof formatter === "function") {
                const val = args[index];
                match = formatter.call(self2, val);
                args.splice(index, 1);
                index--;
              }
              return match;
            });
            createDebug.formatArgs.call(self2, args);
            const logFn = self2.log || createDebug.log;
            logFn.apply(self2, args);
          }
          debug.namespace = namespace;
          debug.useColors = createDebug.useColors();
          debug.color = createDebug.selectColor(namespace);
          debug.extend = extend;
          debug.destroy = createDebug.destroy;
          Object.defineProperty(debug, "enabled", {
            enumerable: true,
            configurable: false,
            get: () => {
              if (enableOverride !== null) {
                return enableOverride;
              }
              if (namespacesCache !== createDebug.namespaces) {
                namespacesCache = createDebug.namespaces;
                enabledCache = createDebug.enabled(namespace);
              }
              return enabledCache;
            },
            set: (v) => {
              enableOverride = v;
            }
          });
          if (typeof createDebug.init === "function") {
            createDebug.init(debug);
          }
          return debug;
        }
        function extend(namespace, delimiter) {
          const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
          newDebug.log = this.log;
          return newDebug;
        }
        function enable(namespaces) {
          createDebug.save(namespaces);
          createDebug.namespaces = namespaces;
          createDebug.names = [];
          createDebug.skips = [];
          const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
          for (const ns of split) {
            if (ns[0] === "-") {
              createDebug.skips.push(ns.slice(1));
            } else {
              createDebug.names.push(ns);
            }
          }
        }
        function matchesTemplate(search, template) {
          let searchIndex = 0;
          let templateIndex = 0;
          let starIndex = -1;
          let matchIndex = 0;
          while (searchIndex < search.length) {
            if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
              if (template[templateIndex] === "*") {
                starIndex = templateIndex;
                matchIndex = searchIndex;
                templateIndex++;
              } else {
                searchIndex++;
                templateIndex++;
              }
            } else if (starIndex !== -1) {
              templateIndex = starIndex + 1;
              matchIndex++;
              searchIndex = matchIndex;
            } else {
              return false;
            }
          }
          while (templateIndex < template.length && template[templateIndex] === "*") {
            templateIndex++;
          }
          return templateIndex === template.length;
        }
        function disable() {
          const namespaces = [
            ...createDebug.names,
            ...createDebug.skips.map((namespace) => "-" + namespace)
          ].join(",");
          createDebug.enable("");
          return namespaces;
        }
        function enabled(name) {
          for (const skip of createDebug.skips) {
            if (matchesTemplate(name, skip)) {
              return false;
            }
          }
          for (const ns of createDebug.names) {
            if (matchesTemplate(name, ns)) {
              return true;
            }
          }
          return false;
        }
        function coerce(val) {
          if (val instanceof Error) {
            return val.stack || val.message;
          }
          return val;
        }
        function destroy() {
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
        createDebug.enable(createDebug.load());
        return createDebug;
      }
      module.exports = setup;
    }
  });

  // node_modules/h264-profile-level-id/node_modules/debug/src/browser.js
  var require_browser2 = __commonJS({
    "node_modules/h264-profile-level-id/node_modules/debug/src/browser.js"(exports, module) {
      exports.formatArgs = formatArgs;
      exports.save = save;
      exports.load = load;
      exports.useColors = useColors;
      exports.storage = localstorage();
      exports.destroy = /* @__PURE__ */ (() => {
        let warned = false;
        return () => {
          if (!warned) {
            warned = true;
            console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
          }
        };
      })();
      exports.colors = [
        "#0000CC",
        "#0000FF",
        "#0033CC",
        "#0033FF",
        "#0066CC",
        "#0066FF",
        "#0099CC",
        "#0099FF",
        "#00CC00",
        "#00CC33",
        "#00CC66",
        "#00CC99",
        "#00CCCC",
        "#00CCFF",
        "#3300CC",
        "#3300FF",
        "#3333CC",
        "#3333FF",
        "#3366CC",
        "#3366FF",
        "#3399CC",
        "#3399FF",
        "#33CC00",
        "#33CC33",
        "#33CC66",
        "#33CC99",
        "#33CCCC",
        "#33CCFF",
        "#6600CC",
        "#6600FF",
        "#6633CC",
        "#6633FF",
        "#66CC00",
        "#66CC33",
        "#9900CC",
        "#9900FF",
        "#9933CC",
        "#9933FF",
        "#99CC00",
        "#99CC33",
        "#CC0000",
        "#CC0033",
        "#CC0066",
        "#CC0099",
        "#CC00CC",
        "#CC00FF",
        "#CC3300",
        "#CC3333",
        "#CC3366",
        "#CC3399",
        "#CC33CC",
        "#CC33FF",
        "#CC6600",
        "#CC6633",
        "#CC9900",
        "#CC9933",
        "#CCCC00",
        "#CCCC33",
        "#FF0000",
        "#FF0033",
        "#FF0066",
        "#FF0099",
        "#FF00CC",
        "#FF00FF",
        "#FF3300",
        "#FF3333",
        "#FF3366",
        "#FF3399",
        "#FF33CC",
        "#FF33FF",
        "#FF6600",
        "#FF6633",
        "#FF9900",
        "#FF9933",
        "#FFCC00",
        "#FFCC33"
      ];
      function useColors() {
        if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
          return true;
        }
        if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
          return false;
        }
        let m;
        return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
        typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
        // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
        typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
        typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
      }
      function formatArgs(args) {
        args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
        if (!this.useColors) {
          return;
        }
        const c = "color: " + this.color;
        args.splice(1, 0, c, "color: inherit");
        let index = 0;
        let lastC = 0;
        args[0].replace(/%[a-zA-Z%]/g, (match) => {
          if (match === "%%") {
            return;
          }
          index++;
          if (match === "%c") {
            lastC = index;
          }
        });
        args.splice(lastC, 0, c);
      }
      exports.log = console.debug || console.log || (() => {
      });
      function save(namespaces) {
        try {
          if (namespaces) {
            exports.storage.setItem("debug", namespaces);
          } else {
            exports.storage.removeItem("debug");
          }
        } catch (error) {
        }
      }
      function load() {
        let r;
        try {
          r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
        } catch (error) {
        }
        if (!r && typeof process !== "undefined" && "env" in process) {
          r = process.env.DEBUG;
        }
        return r;
      }
      function localstorage() {
        try {
          return localStorage;
        } catch (error) {
        }
      }
      module.exports = require_common2()(exports);
      var { formatters } = module.exports;
      formatters.j = function(v) {
        try {
          return JSON.stringify(v);
        } catch (error) {
          return "[UnexpectedJSONParseError]: " + error.message;
        }
      };
    }
  });

  // node_modules/h264-profile-level-id/lib/Logger.js
  var require_Logger2 = __commonJS({
    "node_modules/h264-profile-level-id/lib/Logger.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Logger = void 0;
      var debug_1 = __importDefault(require_browser2());
      var APP_NAME = "h264-profile-level-id";
      var Logger = class {
        constructor(prefix) {
          if (prefix) {
            this._debug = (0, debug_1.default)(`${APP_NAME}:${prefix}`);
            this._warn = (0, debug_1.default)(`${APP_NAME}:WARN:${prefix}`);
            this._error = (0, debug_1.default)(`${APP_NAME}:ERROR:${prefix}`);
          } else {
            this._debug = (0, debug_1.default)(APP_NAME);
            this._warn = (0, debug_1.default)(`${APP_NAME}:WARN`);
            this._error = (0, debug_1.default)(`${APP_NAME}:ERROR`);
          }
          this._debug.log = console.info.bind(console);
          this._warn.log = console.warn.bind(console);
          this._error.log = console.error.bind(console);
        }
        get debug() {
          return this._debug;
        }
        get warn() {
          return this._warn;
        }
        get error() {
          return this._error;
        }
      };
      exports.Logger = Logger;
    }
  });

  // node_modules/h264-profile-level-id/lib/index.js
  var require_lib = __commonJS({
    "node_modules/h264-profile-level-id/lib/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ProfileLevelId = exports.Level = exports.Profile = void 0;
      exports.parseProfileLevelId = parseProfileLevelId;
      exports.profileLevelIdToString = profileLevelIdToString;
      exports.profileToString = profileToString;
      exports.levelToString = levelToString;
      exports.parseSdpProfileLevelId = parseSdpProfileLevelId;
      exports.isSameProfile = isSameProfile;
      exports.isSameProfileAndLevel = isSameProfileAndLevel;
      exports.generateProfileLevelIdStringForAnswer = generateProfileLevelIdStringForAnswer;
      exports.supportedLevel = supportedLevel;
      var Logger_1 = require_Logger2();
      var logger = new Logger_1.Logger();
      var Profile;
      (function(Profile2) {
        Profile2[Profile2["ConstrainedBaseline"] = 1] = "ConstrainedBaseline";
        Profile2[Profile2["Baseline"] = 2] = "Baseline";
        Profile2[Profile2["Main"] = 3] = "Main";
        Profile2[Profile2["ConstrainedHigh"] = 4] = "ConstrainedHigh";
        Profile2[Profile2["High"] = 5] = "High";
        Profile2[Profile2["PredictiveHigh444"] = 6] = "PredictiveHigh444";
      })(Profile || (exports.Profile = Profile = {}));
      var Level;
      (function(Level2) {
        Level2[Level2["L1_b"] = 0] = "L1_b";
        Level2[Level2["L1"] = 10] = "L1";
        Level2[Level2["L1_1"] = 11] = "L1_1";
        Level2[Level2["L1_2"] = 12] = "L1_2";
        Level2[Level2["L1_3"] = 13] = "L1_3";
        Level2[Level2["L2"] = 20] = "L2";
        Level2[Level2["L2_1"] = 21] = "L2_1";
        Level2[Level2["L2_2"] = 22] = "L2_2";
        Level2[Level2["L3"] = 30] = "L3";
        Level2[Level2["L3_1"] = 31] = "L3_1";
        Level2[Level2["L3_2"] = 32] = "L3_2";
        Level2[Level2["L4"] = 40] = "L4";
        Level2[Level2["L4_1"] = 41] = "L4_1";
        Level2[Level2["L4_2"] = 42] = "L4_2";
        Level2[Level2["L5"] = 50] = "L5";
        Level2[Level2["L5_1"] = 51] = "L5_1";
        Level2[Level2["L5_2"] = 52] = "L5_2";
      })(Level || (exports.Level = Level = {}));
      var ProfileLevelId = class {
        constructor(profile, level) {
          this.profile = profile;
          this.level = level;
        }
      };
      exports.ProfileLevelId = ProfileLevelId;
      var DefaultProfileLevelId = new ProfileLevelId(Profile.ConstrainedBaseline, Level.L3_1);
      var BitPattern = class {
        constructor(str) {
          this.mask = ~byteMaskString("x", str);
          this.masked_value = byteMaskString("1", str);
        }
        isMatch(value2) {
          return this.masked_value === (value2 & this.mask);
        }
      };
      var ProfilePattern = class {
        constructor(profile_idc, profile_iop, profile) {
          this.profile_idc = profile_idc;
          this.profile_iop = profile_iop;
          this.profile = profile;
        }
      };
      var ProfilePatterns = [
        new ProfilePattern(66, new BitPattern("x1xx0000"), Profile.ConstrainedBaseline),
        new ProfilePattern(77, new BitPattern("1xxx0000"), Profile.ConstrainedBaseline),
        new ProfilePattern(88, new BitPattern("11xx0000"), Profile.ConstrainedBaseline),
        new ProfilePattern(66, new BitPattern("x0xx0000"), Profile.Baseline),
        new ProfilePattern(88, new BitPattern("10xx0000"), Profile.Baseline),
        new ProfilePattern(77, new BitPattern("0x0x0000"), Profile.Main),
        new ProfilePattern(100, new BitPattern("00000000"), Profile.High),
        new ProfilePattern(100, new BitPattern("00001100"), Profile.ConstrainedHigh),
        new ProfilePattern(244, new BitPattern("00000000"), Profile.PredictiveHigh444)
      ];
      var LevelConstraints = [
        {
          max_macroblocks_per_second: 1485,
          max_macroblock_frame_size: 99,
          level: Level.L1
        },
        {
          max_macroblocks_per_second: 1485,
          max_macroblock_frame_size: 99,
          level: Level.L1_b
        },
        {
          max_macroblocks_per_second: 3e3,
          max_macroblock_frame_size: 396,
          level: Level.L1_1
        },
        {
          max_macroblocks_per_second: 6e3,
          max_macroblock_frame_size: 396,
          level: Level.L1_2
        },
        {
          max_macroblocks_per_second: 11880,
          max_macroblock_frame_size: 396,
          level: Level.L1_3
        },
        {
          max_macroblocks_per_second: 11880,
          max_macroblock_frame_size: 396,
          level: Level.L2
        },
        {
          max_macroblocks_per_second: 19800,
          max_macroblock_frame_size: 792,
          level: Level.L2_1
        },
        {
          max_macroblocks_per_second: 20250,
          max_macroblock_frame_size: 1620,
          level: Level.L2_2
        },
        {
          max_macroblocks_per_second: 40500,
          max_macroblock_frame_size: 1620,
          level: Level.L3
        },
        {
          max_macroblocks_per_second: 108e3,
          max_macroblock_frame_size: 3600,
          level: Level.L3_1
        },
        {
          max_macroblocks_per_second: 216e3,
          max_macroblock_frame_size: 5120,
          level: Level.L3_2
        },
        {
          max_macroblocks_per_second: 245760,
          max_macroblock_frame_size: 8192,
          level: Level.L4
        },
        {
          max_macroblocks_per_second: 245760,
          max_macroblock_frame_size: 8192,
          level: Level.L4_1
        },
        {
          max_macroblocks_per_second: 522240,
          max_macroblock_frame_size: 8704,
          level: Level.L4_2
        },
        {
          max_macroblocks_per_second: 589824,
          max_macroblock_frame_size: 22080,
          level: Level.L5
        },
        {
          max_macroblocks_per_second: 983040,
          max_macroblock_frame_size: 36864,
          level: Level.L5_1
        },
        {
          max_macroblocks_per_second: 2073600,
          max_macroblock_frame_size: 36864,
          level: Level.L5_2
        }
      ];
      function parseProfileLevelId(str) {
        const ConstraintSet3Flag = 16;
        if (typeof str !== "string" || str.length !== 6) {
          return void 0;
        }
        const profile_level_id_numeric = parseInt(str, 16);
        if (profile_level_id_numeric === 0) {
          return void 0;
        }
        const level_idc = profile_level_id_numeric & 255;
        const profile_iop = profile_level_id_numeric >> 8 & 255;
        const profile_idc = profile_level_id_numeric >> 16 & 255;
        let level;
        switch (level_idc) {
          case Level.L1_1: {
            level = (profile_iop & ConstraintSet3Flag) !== 0 ? Level.L1_b : Level.L1_1;
            break;
          }
          case Level.L1:
          case Level.L1_2:
          case Level.L1_3:
          case Level.L2:
          case Level.L2_1:
          case Level.L2_2:
          case Level.L3:
          case Level.L3_1:
          case Level.L3_2:
          case Level.L4:
          case Level.L4_1:
          case Level.L4_2:
          case Level.L5:
          case Level.L5_1:
          case Level.L5_2: {
            level = level_idc;
            break;
          }
          // Unrecognized level_idc.
          default: {
            logger.warn(`parseProfileLevelId() | unrecognized level_idc [str:${str}, level_idc:${level_idc}]`);
            return void 0;
          }
        }
        for (const pattern of ProfilePatterns) {
          if (profile_idc === pattern.profile_idc && pattern.profile_iop.isMatch(profile_iop)) {
            logger.debug(`parseProfileLevelId() | result [str:${str}, profile:${pattern.profile}, level:${level}]`);
            return new ProfileLevelId(pattern.profile, level);
          }
        }
        logger.warn(`parseProfileLevelId() | unrecognized profile_idc/profile_iop combination [str:${str}, profile_idc:${profile_idc}, profile_iop:${profile_iop}]`);
        return void 0;
      }
      function profileLevelIdToString(profile_level_id) {
        if (profile_level_id.level == Level.L1_b) {
          switch (profile_level_id.profile) {
            case Profile.ConstrainedBaseline: {
              return "42f00b";
            }
            case Profile.Baseline: {
              return "42100b";
            }
            case Profile.Main: {
              return "4d100b";
            }
            // Level 1_b is not allowed for other profiles.
            default: {
              logger.warn(`profileLevelIdToString() | Level 1_b not is allowed for profile ${profile_level_id.profile}`);
              return void 0;
            }
          }
        }
        let profile_idc_iop_string;
        switch (profile_level_id.profile) {
          case Profile.ConstrainedBaseline: {
            profile_idc_iop_string = "42e0";
            break;
          }
          case Profile.Baseline: {
            profile_idc_iop_string = "4200";
            break;
          }
          case Profile.Main: {
            profile_idc_iop_string = "4d00";
            break;
          }
          case Profile.ConstrainedHigh: {
            profile_idc_iop_string = "640c";
            break;
          }
          case Profile.High: {
            profile_idc_iop_string = "6400";
            break;
          }
          case Profile.PredictiveHigh444: {
            profile_idc_iop_string = "f400";
            break;
          }
          default: {
            logger.warn(`profileLevelIdToString() | unrecognized profile ${profile_level_id.profile}`);
            return void 0;
          }
        }
        let levelStr = profile_level_id.level.toString(16);
        if (levelStr.length === 1) {
          levelStr = `0${levelStr}`;
        }
        return `${profile_idc_iop_string}${levelStr}`;
      }
      function profileToString(profile) {
        switch (profile) {
          case Profile.ConstrainedBaseline: {
            return "ConstrainedBaseline";
          }
          case Profile.Baseline: {
            return "Baseline";
          }
          case Profile.Main: {
            return "Main";
          }
          case Profile.ConstrainedHigh: {
            return "ConstrainedHigh";
          }
          case Profile.High: {
            return "High";
          }
          case Profile.PredictiveHigh444: {
            return "PredictiveHigh444";
          }
          default: {
            logger.warn(`profileToString() | unrecognized profile ${profile}`);
            return void 0;
          }
        }
      }
      function levelToString(level) {
        switch (level) {
          case Level.L1_b: {
            return "1b";
          }
          case Level.L1: {
            return "1";
          }
          case Level.L1_1: {
            return "1.1";
          }
          case Level.L1_2: {
            return "1.2";
          }
          case Level.L1_3: {
            return "1.3";
          }
          case Level.L2: {
            return "2";
          }
          case Level.L2_1: {
            return "2.1";
          }
          case Level.L2_2: {
            return "2.2";
          }
          case Level.L3: {
            return "3";
          }
          case Level.L3_1: {
            return "3.1";
          }
          case Level.L3_2: {
            return "3.2";
          }
          case Level.L4: {
            return "4";
          }
          case Level.L4_1: {
            return "4.1";
          }
          case Level.L4_2: {
            return "4.2";
          }
          case Level.L5: {
            return "5";
          }
          case Level.L5_1: {
            return "5.1";
          }
          case Level.L5_2: {
            return "5.2";
          }
          default: {
            logger.warn(`levelToString() | unrecognized level ${level}`);
            return void 0;
          }
        }
      }
      function parseSdpProfileLevelId(params2 = {}) {
        const profile_level_id = params2["profile-level-id"];
        return profile_level_id ? parseProfileLevelId(profile_level_id) : DefaultProfileLevelId;
      }
      function isSameProfile(params1 = {}, params2 = {}) {
        const profile_level_id_1 = parseSdpProfileLevelId(params1);
        const profile_level_id_2 = parseSdpProfileLevelId(params2);
        return Boolean(profile_level_id_1 && profile_level_id_2 && profile_level_id_1.profile === profile_level_id_2.profile);
      }
      function isSameProfileAndLevel(params1 = {}, params2 = {}) {
        const profile_level_id_1 = parseSdpProfileLevelId(params1);
        const profile_level_id_2 = parseSdpProfileLevelId(params2);
        return Boolean(profile_level_id_1 && profile_level_id_2 && profile_level_id_1.profile === profile_level_id_2.profile && profile_level_id_1.level == profile_level_id_2.level);
      }
      function generateProfileLevelIdStringForAnswer(local_supported_params = {}, remote_offered_params = {}) {
        if (!local_supported_params["profile-level-id"] && !remote_offered_params["profile-level-id"]) {
          logger.warn("generateProfileLevelIdStringForAnswer() | profile-level-id missing in local and remote params");
          return void 0;
        }
        const local_profile_level_id = parseSdpProfileLevelId(local_supported_params);
        const remote_profile_level_id = parseSdpProfileLevelId(remote_offered_params);
        if (!local_profile_level_id) {
          throw new TypeError("invalid local_profile_level_id");
        }
        if (!remote_profile_level_id) {
          throw new TypeError("invalid remote_profile_level_id");
        }
        if (local_profile_level_id.profile !== remote_profile_level_id.profile) {
          throw new TypeError("H264 Profile mismatch");
        }
        const level_asymmetry_allowed = isLevelAsymmetryAllowed(local_supported_params) && isLevelAsymmetryAllowed(remote_offered_params);
        const local_level = local_profile_level_id.level;
        const remote_level = remote_profile_level_id.level;
        const min_level = minLevel(local_level, remote_level);
        const answer_level = level_asymmetry_allowed ? local_level : min_level;
        logger.debug(`generateProfileLevelIdStringForAnswer() | result [profile:${local_profile_level_id.profile}, level:${answer_level}]`);
        return profileLevelIdToString(new ProfileLevelId(local_profile_level_id.profile, answer_level));
      }
      function supportedLevel(max_frame_pixel_count, max_fps) {
        const PixelsPerMacroblock = 16 * 16;
        for (let i = LevelConstraints.length - 1; i >= 0; --i) {
          const level_constraint = LevelConstraints[i];
          if (level_constraint.max_macroblock_frame_size * PixelsPerMacroblock <= max_frame_pixel_count && level_constraint.max_macroblocks_per_second <= max_fps * level_constraint.max_macroblock_frame_size) {
            logger.debug(`supportedLevel() | result [max_frame_pixel_count:${max_frame_pixel_count}, max_fps:${max_fps}, level:${level_constraint.level}]`);
            return level_constraint.level;
          }
        }
        logger.warn(`supportedLevel() | no level supported [max_frame_pixel_count:${max_frame_pixel_count}, max_fps:${max_fps}]`);
        return void 0;
      }
      function byteMaskString(c, str) {
        return Number(str[0] === c) << 7 | Number(str[1] === c) << 6 | Number(str[2] === c) << 5 | Number(str[3] === c) << 4 | Number(str[4] === c) << 3 | Number(str[5] === c) << 2 | Number(str[6] === c) << 1 | Number(str[7] === c) << 0;
      }
      function isLessLevel(a, b) {
        if (a === Level.L1_b) {
          return b !== Level.L1 && b !== Level.L1_b;
        }
        if (b === Level.L1_b) {
          return a !== Level.L1;
        }
        return a < b;
      }
      function minLevel(a, b) {
        return isLessLevel(a, b) ? a : b;
      }
      function isLevelAsymmetryAllowed(params2 = {}) {
        const level_asymmetry_allowed = params2["level-asymmetry-allowed"];
        return level_asymmetry_allowed === true || level_asymmetry_allowed === 1 || level_asymmetry_allowed === "1";
      }
    }
  });

  // node_modules/mediasoup-client/lib/ortc.js
  var require_ortc = __commonJS({
    "node_modules/mediasoup-client/lib/ortc.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.validateRtpCapabilities = validateRtpCapabilities;
      exports.validateRtpParameters = validateRtpParameters;
      exports.validateSctpStreamParameters = validateSctpStreamParameters;
      exports.validateSctpCapabilities = validateSctpCapabilities;
      exports.getExtendedRtpCapabilities = getExtendedRtpCapabilities;
      exports.getRecvRtpCapabilities = getRecvRtpCapabilities;
      exports.getSendingRtpParameters = getSendingRtpParameters;
      exports.getSendingRemoteRtpParameters = getSendingRemoteRtpParameters;
      exports.reduceCodecs = reduceCodecs;
      exports.generateProbatorRtpParameters = generateProbatorRtpParameters;
      exports.canSend = canSend;
      exports.canReceive = canReceive;
      var h264 = require_lib();
      var utils = require_utils();
      var RTP_PROBATOR_MID = "probator";
      var RTP_PROBATOR_SSRC = 1234;
      var RTP_PROBATOR_CODEC_PAYLOAD_TYPE = 127;
      function validateRtpCapabilities(caps) {
        if (typeof caps !== "object") {
          throw new TypeError("caps is not an object");
        }
        if (caps.codecs && !Array.isArray(caps.codecs)) {
          throw new TypeError("caps.codecs is not an array");
        } else if (!caps.codecs) {
          caps.codecs = [];
        }
        for (const codec of caps.codecs) {
          validateRtpCodecCapability(codec);
        }
        if (caps.headerExtensions && !Array.isArray(caps.headerExtensions)) {
          throw new TypeError("caps.headerExtensions is not an array");
        } else if (!caps.headerExtensions) {
          caps.headerExtensions = [];
        }
        for (const ext of caps.headerExtensions) {
          validateRtpHeaderExtension(ext);
        }
      }
      function validateRtpParameters(params2) {
        if (typeof params2 !== "object") {
          throw new TypeError("params is not an object");
        }
        if (params2.mid && typeof params2.mid !== "string") {
          throw new TypeError("params.mid is not a string");
        }
        if (!Array.isArray(params2.codecs)) {
          throw new TypeError("missing params.codecs");
        }
        for (const codec of params2.codecs) {
          validateRtpCodecParameters(codec);
        }
        if (params2.headerExtensions && !Array.isArray(params2.headerExtensions)) {
          throw new TypeError("params.headerExtensions is not an array");
        } else if (!params2.headerExtensions) {
          params2.headerExtensions = [];
        }
        for (const ext of params2.headerExtensions) {
          validateRtpHeaderExtensionParameters(ext);
        }
        if (params2.encodings && !Array.isArray(params2.encodings)) {
          throw new TypeError("params.encodings is not an array");
        } else if (!params2.encodings) {
          params2.encodings = [];
        }
        for (const encoding of params2.encodings) {
          validateRtpEncodingParameters(encoding);
        }
        if (params2.rtcp && typeof params2.rtcp !== "object") {
          throw new TypeError("params.rtcp is not an object");
        } else if (!params2.rtcp) {
          params2.rtcp = {};
        }
        validateRtcpParameters(params2.rtcp);
      }
      function validateSctpStreamParameters(params2) {
        if (typeof params2 !== "object") {
          throw new TypeError("params is not an object");
        }
        if (typeof params2.streamId !== "number") {
          throw new TypeError("missing params.streamId");
        }
        let orderedGiven = false;
        if (typeof params2.ordered === "boolean") {
          orderedGiven = true;
        } else {
          params2.ordered = true;
        }
        if (params2.maxPacketLifeTime && typeof params2.maxPacketLifeTime !== "number") {
          throw new TypeError("invalid params.maxPacketLifeTime");
        }
        if (params2.maxRetransmits && typeof params2.maxRetransmits !== "number") {
          throw new TypeError("invalid params.maxRetransmits");
        }
        if (params2.maxPacketLifeTime && params2.maxRetransmits) {
          throw new TypeError("cannot provide both maxPacketLifeTime and maxRetransmits");
        }
        if (orderedGiven && params2.ordered && (params2.maxPacketLifeTime || params2.maxRetransmits)) {
          throw new TypeError("cannot be ordered with maxPacketLifeTime or maxRetransmits");
        } else if (!orderedGiven && (params2.maxPacketLifeTime || params2.maxRetransmits)) {
          params2.ordered = false;
        }
        if (params2.label && typeof params2.label !== "string") {
          throw new TypeError("invalid params.label");
        }
        if (params2.protocol && typeof params2.protocol !== "string") {
          throw new TypeError("invalid params.protocol");
        }
      }
      function validateSctpCapabilities(caps) {
        if (typeof caps !== "object") {
          throw new TypeError("caps is not an object");
        }
        if (!caps.numStreams || typeof caps.numStreams !== "object") {
          throw new TypeError("missing caps.numStreams");
        }
        validateNumSctpStreams(caps.numStreams);
      }
      function getExtendedRtpCapabilities(localCaps, remoteCaps, preferLocalCodecsOrder) {
        const extendedRtpCapabilities = {
          codecs: [],
          headerExtensions: []
        };
        if (preferLocalCodecsOrder) {
          for (const localCodec of localCaps.codecs ?? []) {
            if (isRtxCodec(localCodec)) {
              continue;
            }
            const matchingRemoteCodec = (remoteCaps.codecs ?? []).find((remoteCodec) => matchCodecs(remoteCodec, localCodec, { strict: true, modify: true }));
            if (!matchingRemoteCodec) {
              continue;
            }
            const extendedCodec = {
              mimeType: localCodec.mimeType,
              kind: localCodec.kind,
              clockRate: localCodec.clockRate,
              channels: localCodec.channels,
              localPayloadType: localCodec.preferredPayloadType,
              localRtxPayloadType: void 0,
              remotePayloadType: matchingRemoteCodec.preferredPayloadType,
              remoteRtxPayloadType: void 0,
              localParameters: localCodec.parameters,
              remoteParameters: matchingRemoteCodec.parameters,
              rtcpFeedback: reduceRtcpFeedback(localCodec, matchingRemoteCodec)
            };
            extendedRtpCapabilities.codecs.push(extendedCodec);
          }
        } else {
          for (const remoteCodec of remoteCaps.codecs ?? []) {
            if (isRtxCodec(remoteCodec)) {
              continue;
            }
            const matchingLocalCodec = (localCaps.codecs ?? []).find((localCodec) => matchCodecs(localCodec, remoteCodec, { strict: true, modify: true }));
            if (!matchingLocalCodec) {
              continue;
            }
            const extendedCodec = {
              mimeType: matchingLocalCodec.mimeType,
              kind: matchingLocalCodec.kind,
              clockRate: matchingLocalCodec.clockRate,
              channels: matchingLocalCodec.channels,
              localPayloadType: matchingLocalCodec.preferredPayloadType,
              localRtxPayloadType: void 0,
              remotePayloadType: remoteCodec.preferredPayloadType,
              remoteRtxPayloadType: void 0,
              localParameters: matchingLocalCodec.parameters,
              remoteParameters: remoteCodec.parameters,
              rtcpFeedback: reduceRtcpFeedback(matchingLocalCodec, remoteCodec)
            };
            extendedRtpCapabilities.codecs.push(extendedCodec);
          }
        }
        for (const extendedCodec of extendedRtpCapabilities.codecs) {
          const matchingLocalRtxCodec = localCaps.codecs.find((localCodec) => isRtxCodec(localCodec) && localCodec.parameters.apt === extendedCodec.localPayloadType);
          const matchingRemoteRtxCodec = remoteCaps.codecs.find((remoteCodec) => isRtxCodec(remoteCodec) && remoteCodec.parameters.apt === extendedCodec.remotePayloadType);
          if (matchingLocalRtxCodec && matchingRemoteRtxCodec) {
            extendedCodec.localRtxPayloadType = matchingLocalRtxCodec.preferredPayloadType;
            extendedCodec.remoteRtxPayloadType = matchingRemoteRtxCodec.preferredPayloadType;
          }
        }
        for (const remoteExt of remoteCaps.headerExtensions) {
          const matchingLocalExt = localCaps.headerExtensions.find((localExt) => matchHeaderExtensions(localExt, remoteExt));
          if (!matchingLocalExt) {
            continue;
          }
          const extendedExt = {
            kind: remoteExt.kind,
            uri: remoteExt.uri,
            sendId: matchingLocalExt.preferredId,
            recvId: remoteExt.preferredId,
            encrypt: matchingLocalExt.preferredEncrypt,
            direction: "sendrecv"
          };
          switch (remoteExt.direction) {
            case "sendrecv": {
              extendedExt.direction = "sendrecv";
              break;
            }
            case "recvonly": {
              extendedExt.direction = "sendonly";
              break;
            }
            case "sendonly": {
              extendedExt.direction = "recvonly";
              break;
            }
            case "inactive": {
              extendedExt.direction = "inactive";
              break;
            }
          }
          extendedRtpCapabilities.headerExtensions.push(extendedExt);
        }
        return extendedRtpCapabilities;
      }
      function getRecvRtpCapabilities(extendedRtpCapabilities) {
        const rtpCapabilities2 = {
          codecs: [],
          headerExtensions: []
        };
        for (const extendedCodec of extendedRtpCapabilities.codecs) {
          const codec = {
            mimeType: extendedCodec.mimeType,
            kind: extendedCodec.kind,
            preferredPayloadType: extendedCodec.remotePayloadType,
            clockRate: extendedCodec.clockRate,
            channels: extendedCodec.channels,
            parameters: extendedCodec.localParameters,
            rtcpFeedback: extendedCodec.rtcpFeedback
          };
          rtpCapabilities2.codecs.push(codec);
          if (!extendedCodec.remoteRtxPayloadType) {
            continue;
          }
          const rtxCodec = {
            mimeType: `${extendedCodec.kind}/rtx`,
            kind: extendedCodec.kind,
            preferredPayloadType: extendedCodec.remoteRtxPayloadType,
            clockRate: extendedCodec.clockRate,
            parameters: {
              apt: extendedCodec.remotePayloadType
            },
            rtcpFeedback: []
          };
          rtpCapabilities2.codecs.push(rtxCodec);
        }
        for (const extendedExtension of extendedRtpCapabilities.headerExtensions) {
          if (extendedExtension.direction !== "sendrecv" && extendedExtension.direction !== "recvonly") {
            continue;
          }
          const ext = {
            kind: extendedExtension.kind,
            uri: extendedExtension.uri,
            preferredId: extendedExtension.recvId,
            preferredEncrypt: extendedExtension.encrypt,
            direction: extendedExtension.direction
          };
          rtpCapabilities2.headerExtensions.push(ext);
        }
        return rtpCapabilities2;
      }
      function getSendingRtpParameters(kind, extendedRtpCapabilities) {
        const rtpParameters = {
          mid: void 0,
          codecs: [],
          headerExtensions: [],
          encodings: [],
          rtcp: {}
        };
        for (const extendedCodec of extendedRtpCapabilities.codecs) {
          if (extendedCodec.kind !== kind) {
            continue;
          }
          const codec = {
            mimeType: extendedCodec.mimeType,
            payloadType: extendedCodec.localPayloadType,
            clockRate: extendedCodec.clockRate,
            channels: extendedCodec.channels,
            parameters: extendedCodec.localParameters,
            rtcpFeedback: extendedCodec.rtcpFeedback
          };
          rtpParameters.codecs.push(codec);
          if (extendedCodec.localRtxPayloadType) {
            const rtxCodec = {
              mimeType: `${extendedCodec.kind}/rtx`,
              payloadType: extendedCodec.localRtxPayloadType,
              clockRate: extendedCodec.clockRate,
              parameters: {
                apt: extendedCodec.localPayloadType
              },
              rtcpFeedback: []
            };
            rtpParameters.codecs.push(rtxCodec);
          }
        }
        for (const extendedExtension of extendedRtpCapabilities.headerExtensions) {
          if (extendedExtension.kind && extendedExtension.kind !== kind || extendedExtension.direction !== "sendrecv" && extendedExtension.direction !== "sendonly") {
            continue;
          }
          const ext = {
            uri: extendedExtension.uri,
            id: extendedExtension.sendId,
            encrypt: extendedExtension.encrypt,
            parameters: {}
          };
          rtpParameters.headerExtensions.push(ext);
        }
        return rtpParameters;
      }
      function getSendingRemoteRtpParameters(kind, extendedRtpCapabilities) {
        const rtpParameters = {
          mid: void 0,
          codecs: [],
          headerExtensions: [],
          encodings: [],
          rtcp: {}
        };
        for (const extendedCodec of extendedRtpCapabilities.codecs) {
          if (extendedCodec.kind !== kind) {
            continue;
          }
          const codec = {
            mimeType: extendedCodec.mimeType,
            payloadType: extendedCodec.localPayloadType,
            clockRate: extendedCodec.clockRate,
            channels: extendedCodec.channels,
            parameters: extendedCodec.remoteParameters,
            rtcpFeedback: extendedCodec.rtcpFeedback
          };
          rtpParameters.codecs.push(codec);
          if (extendedCodec.localRtxPayloadType) {
            const rtxCodec = {
              mimeType: `${extendedCodec.kind}/rtx`,
              payloadType: extendedCodec.localRtxPayloadType,
              clockRate: extendedCodec.clockRate,
              parameters: {
                apt: extendedCodec.localPayloadType
              },
              rtcpFeedback: []
            };
            rtpParameters.codecs.push(rtxCodec);
          }
        }
        for (const extendedExtension of extendedRtpCapabilities.headerExtensions) {
          if (extendedExtension.kind && extendedExtension.kind !== kind || extendedExtension.direction !== "sendrecv" && extendedExtension.direction !== "sendonly") {
            continue;
          }
          const ext = {
            uri: extendedExtension.uri,
            id: extendedExtension.sendId,
            encrypt: extendedExtension.encrypt,
            parameters: {}
          };
          rtpParameters.headerExtensions.push(ext);
        }
        if (rtpParameters.headerExtensions.some((ext) => ext.uri === "http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01")) {
          for (const codec of rtpParameters.codecs) {
            codec.rtcpFeedback = (codec.rtcpFeedback ?? []).filter((fb) => fb.type !== "goog-remb");
          }
        } else if (rtpParameters.headerExtensions.some((ext) => ext.uri === "http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time")) {
          for (const codec of rtpParameters.codecs) {
            codec.rtcpFeedback = (codec.rtcpFeedback ?? []).filter((fb) => fb.type !== "transport-cc");
          }
        } else {
          for (const codec of rtpParameters.codecs) {
            codec.rtcpFeedback = (codec.rtcpFeedback ?? []).filter((fb) => fb.type !== "transport-cc" && fb.type !== "goog-remb");
          }
        }
        return rtpParameters;
      }
      function reduceCodecs(codecs, capCodec) {
        const filteredCodecs = [];
        if (!capCodec) {
          filteredCodecs.push(codecs[0]);
          if (isRtxCodec(codecs[1])) {
            filteredCodecs.push(codecs[1]);
          }
        } else {
          for (let idx = 0; idx < codecs.length; ++idx) {
            if (matchCodecs(codecs[idx], capCodec, { strict: true })) {
              filteredCodecs.push(codecs[idx]);
              if (isRtxCodec(codecs[idx + 1])) {
                filteredCodecs.push(codecs[idx + 1]);
              }
              break;
            }
          }
          if (filteredCodecs.length === 0) {
            throw new TypeError("no matching codec found");
          }
        }
        return filteredCodecs;
      }
      function generateProbatorRtpParameters(videoRtpParameters) {
        videoRtpParameters = utils.clone(videoRtpParameters);
        validateRtpParameters(videoRtpParameters);
        const rtpParameters = {
          mid: RTP_PROBATOR_MID,
          codecs: [],
          headerExtensions: [],
          encodings: [{ ssrc: RTP_PROBATOR_SSRC }],
          rtcp: { cname: "probator" }
        };
        rtpParameters.codecs.push(videoRtpParameters.codecs[0]);
        rtpParameters.codecs[0].payloadType = RTP_PROBATOR_CODEC_PAYLOAD_TYPE;
        rtpParameters.headerExtensions = videoRtpParameters.headerExtensions;
        return rtpParameters;
      }
      function canSend(kind, extendedRtpCapabilities) {
        return extendedRtpCapabilities.codecs.some((codec) => codec.kind === kind);
      }
      function canReceive(rtpParameters, extendedRtpCapabilities) {
        validateRtpParameters(rtpParameters);
        if (rtpParameters.codecs.length === 0) {
          return false;
        }
        const firstMediaCodec = rtpParameters.codecs[0];
        return extendedRtpCapabilities.codecs.some((codec) => codec.remotePayloadType === firstMediaCodec.payloadType);
      }
      function validateRtpCodecCapability(codec) {
        const MimeTypeRegex = new RegExp("^(audio|video)/(.+)", "i");
        if (typeof codec !== "object") {
          throw new TypeError("codec is not an object");
        }
        if (!codec.mimeType || typeof codec.mimeType !== "string") {
          throw new TypeError("missing codec.mimeType");
        }
        const mimeTypeMatch = MimeTypeRegex.exec(codec.mimeType);
        if (!mimeTypeMatch) {
          throw new TypeError("invalid codec.mimeType");
        }
        codec.kind = mimeTypeMatch[1].toLowerCase();
        if (codec.preferredPayloadType && typeof codec.preferredPayloadType !== "number") {
          throw new TypeError("invalid codec.preferredPayloadType");
        }
        if (typeof codec.clockRate !== "number") {
          throw new TypeError("missing codec.clockRate");
        }
        if (codec.kind === "audio") {
          if (typeof codec.channels !== "number") {
            codec.channels = 1;
          }
        } else {
          delete codec.channels;
        }
        if (!codec.parameters || typeof codec.parameters !== "object") {
          codec.parameters = {};
        }
        for (const key of Object.keys(codec.parameters)) {
          let value2 = codec.parameters[key];
          if (value2 === void 0) {
            codec.parameters[key] = "";
            value2 = "";
          }
          if (typeof value2 !== "string" && typeof value2 !== "number") {
            throw new TypeError(`invalid codec parameter [key:${key}s, value:${value2}]`);
          }
          if (key === "apt") {
            if (typeof value2 !== "number") {
              throw new TypeError("invalid codec apt parameter");
            }
          }
        }
        if (!codec.rtcpFeedback || !Array.isArray(codec.rtcpFeedback)) {
          codec.rtcpFeedback = [];
        }
        for (const fb of codec.rtcpFeedback) {
          validateRtcpFeedback(fb);
        }
      }
      function validateRtcpFeedback(fb) {
        if (typeof fb !== "object") {
          throw new TypeError("fb is not an object");
        }
        if (!fb.type || typeof fb.type !== "string") {
          throw new TypeError("missing fb.type");
        }
        if (!fb.parameter || typeof fb.parameter !== "string") {
          fb.parameter = "";
        }
      }
      function validateRtpHeaderExtension(ext) {
        if (typeof ext !== "object") {
          throw new TypeError("ext is not an object");
        }
        if (ext.kind !== "audio" && ext.kind !== "video") {
          throw new TypeError("invalid ext.kind");
        }
        if (!ext.uri || typeof ext.uri !== "string") {
          throw new TypeError("missing ext.uri");
        }
        if (typeof ext.preferredId !== "number") {
          throw new TypeError("missing ext.preferredId");
        }
        if (ext.preferredEncrypt && typeof ext.preferredEncrypt !== "boolean") {
          throw new TypeError("invalid ext.preferredEncrypt");
        } else if (!ext.preferredEncrypt) {
          ext.preferredEncrypt = false;
        }
        if (ext.direction && typeof ext.direction !== "string") {
          throw new TypeError("invalid ext.direction");
        } else if (!ext.direction) {
          ext.direction = "sendrecv";
        }
      }
      function validateRtpCodecParameters(codec) {
        const MimeTypeRegex = new RegExp("^(audio|video)/(.+)", "i");
        if (typeof codec !== "object") {
          throw new TypeError("codec is not an object");
        }
        if (!codec.mimeType || typeof codec.mimeType !== "string") {
          throw new TypeError("missing codec.mimeType");
        }
        const mimeTypeMatch = MimeTypeRegex.exec(codec.mimeType);
        if (!mimeTypeMatch) {
          throw new TypeError("invalid codec.mimeType");
        }
        if (typeof codec.payloadType !== "number") {
          throw new TypeError("missing codec.payloadType");
        }
        if (typeof codec.clockRate !== "number") {
          throw new TypeError("missing codec.clockRate");
        }
        const kind = mimeTypeMatch[1].toLowerCase();
        if (kind === "audio") {
          if (typeof codec.channels !== "number") {
            codec.channels = 1;
          }
        } else {
          delete codec.channels;
        }
        if (!codec.parameters || typeof codec.parameters !== "object") {
          codec.parameters = {};
        }
        for (const key of Object.keys(codec.parameters)) {
          let value2 = codec.parameters[key];
          if (value2 === void 0) {
            codec.parameters[key] = "";
            value2 = "";
          }
          if (typeof value2 !== "string" && typeof value2 !== "number") {
            throw new TypeError(`invalid codec parameter [key:${key}s, value:${value2}]`);
          }
          if (key === "apt") {
            if (typeof value2 !== "number") {
              throw new TypeError("invalid codec apt parameter");
            }
          }
        }
        if (!codec.rtcpFeedback || !Array.isArray(codec.rtcpFeedback)) {
          codec.rtcpFeedback = [];
        }
        for (const fb of codec.rtcpFeedback) {
          validateRtcpFeedback(fb);
        }
      }
      function validateRtpHeaderExtensionParameters(ext) {
        if (typeof ext !== "object") {
          throw new TypeError("ext is not an object");
        }
        if (!ext.uri || typeof ext.uri !== "string") {
          throw new TypeError("missing ext.uri");
        }
        if (typeof ext.id !== "number") {
          throw new TypeError("missing ext.id");
        }
        if (ext.encrypt && typeof ext.encrypt !== "boolean") {
          throw new TypeError("invalid ext.encrypt");
        } else if (!ext.encrypt) {
          ext.encrypt = false;
        }
        if (!ext.parameters || typeof ext.parameters !== "object") {
          ext.parameters = {};
        }
        for (const key of Object.keys(ext.parameters)) {
          let value2 = ext.parameters[key];
          if (value2 === void 0) {
            ext.parameters[key] = "";
            value2 = "";
          }
          if (typeof value2 !== "string" && typeof value2 !== "number") {
            throw new TypeError("invalid header extension parameter");
          }
        }
      }
      function validateRtpEncodingParameters(encoding) {
        if (typeof encoding !== "object") {
          throw new TypeError("encoding is not an object");
        }
        if (encoding.ssrc && typeof encoding.ssrc !== "number") {
          throw new TypeError("invalid encoding.ssrc");
        }
        if (encoding.rid && typeof encoding.rid !== "string") {
          throw new TypeError("invalid encoding.rid");
        }
        if (encoding.rtx && typeof encoding.rtx !== "object") {
          throw new TypeError("invalid encoding.rtx");
        } else if (encoding.rtx) {
          if (typeof encoding.rtx.ssrc !== "number") {
            throw new TypeError("missing encoding.rtx.ssrc");
          }
        }
        if (!encoding.dtx || typeof encoding.dtx !== "boolean") {
          encoding.dtx = false;
        }
        if (encoding.scalabilityMode && typeof encoding.scalabilityMode !== "string") {
          throw new TypeError("invalid encoding.scalabilityMode");
        }
      }
      function validateRtcpParameters(rtcp) {
        if (typeof rtcp !== "object") {
          throw new TypeError("rtcp is not an object");
        }
        if (rtcp.cname && typeof rtcp.cname !== "string") {
          throw new TypeError("invalid rtcp.cname");
        }
        if (!rtcp.reducedSize || typeof rtcp.reducedSize !== "boolean") {
          rtcp.reducedSize = true;
        }
      }
      function validateNumSctpStreams(numStreams) {
        if (typeof numStreams !== "object") {
          throw new TypeError("numStreams is not an object");
        }
        if (typeof numStreams.OS !== "number") {
          throw new TypeError("missing numStreams.OS");
        }
        if (typeof numStreams.MIS !== "number") {
          throw new TypeError("missing numStreams.MIS");
        }
      }
      function isRtxCodec(codec) {
        if (!codec) {
          return false;
        }
        return /.+\/rtx$/i.test(codec.mimeType);
      }
      function matchCodecs(aCodec, bCodec, { strict = false, modify = false } = {}) {
        const aMimeType = aCodec.mimeType.toLowerCase();
        const bMimeType = bCodec.mimeType.toLowerCase();
        if (aMimeType !== bMimeType) {
          return false;
        }
        if (aCodec.clockRate !== bCodec.clockRate) {
          return false;
        }
        if (aCodec.channels !== bCodec.channels) {
          return false;
        }
        switch (aMimeType) {
          case "video/h264": {
            if (strict) {
              const aPacketizationMode = aCodec.parameters["packetization-mode"] ?? 0;
              const bPacketizationMode = bCodec.parameters["packetization-mode"] ?? 0;
              if (aPacketizationMode !== bPacketizationMode) {
                return false;
              }
              if (!h264.isSameProfile(aCodec.parameters, bCodec.parameters)) {
                return false;
              }
              let selectedProfileLevelId;
              try {
                selectedProfileLevelId = h264.generateProfileLevelIdStringForAnswer(aCodec.parameters, bCodec.parameters);
              } catch (error) {
                return false;
              }
              if (modify) {
                if (selectedProfileLevelId) {
                  aCodec.parameters["profile-level-id"] = selectedProfileLevelId;
                  bCodec.parameters["profile-level-id"] = selectedProfileLevelId;
                } else {
                  delete aCodec.parameters["profile-level-id"];
                  delete bCodec.parameters["profile-level-id"];
                }
              }
            }
            break;
          }
          case "video/vp9": {
            if (strict) {
              const aProfileId = aCodec.parameters["profile-id"] ?? 0;
              const bProfileId = bCodec.parameters["profile-id"] ?? 0;
              if (aProfileId !== bProfileId) {
                return false;
              }
            }
            break;
          }
        }
        return true;
      }
      function matchHeaderExtensions(aExt, bExt) {
        if (aExt.kind && bExt.kind && aExt.kind !== bExt.kind) {
          return false;
        }
        if (aExt.uri !== bExt.uri) {
          return false;
        }
        return true;
      }
      function reduceRtcpFeedback(codecA, codecB) {
        const reducedRtcpFeedback = [];
        for (const aFb of codecA.rtcpFeedback ?? []) {
          const matchingBFb = (codecB.rtcpFeedback ?? []).find((bFb) => bFb.type === aFb.type && (bFb.parameter === aFb.parameter || !bFb.parameter && !aFb.parameter));
          if (matchingBFb) {
            reducedRtcpFeedback.push(matchingBFb);
          }
        }
        return reducedRtcpFeedback;
      }
    }
  });

  // node_modules/awaitqueue/node_modules/ms/index.js
  var require_ms3 = __commonJS({
    "node_modules/awaitqueue/node_modules/ms/index.js"(exports, module) {
      var s = 1e3;
      var m = s * 60;
      var h = m * 60;
      var d = h * 24;
      var w = d * 7;
      var y = d * 365.25;
      module.exports = function(val, options) {
        options = options || {};
        var type = typeof val;
        if (type === "string" && val.length > 0) {
          return parse2(val);
        } else if (type === "number" && isFinite(val)) {
          return options.long ? fmtLong(val) : fmtShort(val);
        }
        throw new Error(
          "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
        );
      };
      function parse2(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          str
        );
        if (!match) {
          return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || "ms").toLowerCase();
        switch (type) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return n * y;
          case "weeks":
          case "week":
          case "w":
            return n * w;
          case "days":
          case "day":
          case "d":
            return n * d;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return n * h;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return n * m;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return n * s;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return n;
          default:
            return void 0;
        }
      }
      function fmtShort(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return Math.round(ms / d) + "d";
        }
        if (msAbs >= h) {
          return Math.round(ms / h) + "h";
        }
        if (msAbs >= m) {
          return Math.round(ms / m) + "m";
        }
        if (msAbs >= s) {
          return Math.round(ms / s) + "s";
        }
        return ms + "ms";
      }
      function fmtLong(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return plural(ms, msAbs, d, "day");
        }
        if (msAbs >= h) {
          return plural(ms, msAbs, h, "hour");
        }
        if (msAbs >= m) {
          return plural(ms, msAbs, m, "minute");
        }
        if (msAbs >= s) {
          return plural(ms, msAbs, s, "second");
        }
        return ms + " ms";
      }
      function plural(ms, msAbs, n, name) {
        var isPlural = msAbs >= n * 1.5;
        return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
      }
    }
  });

  // node_modules/awaitqueue/node_modules/debug/src/common.js
  var require_common3 = __commonJS({
    "node_modules/awaitqueue/node_modules/debug/src/common.js"(exports, module) {
      function setup(env) {
        createDebug.debug = createDebug;
        createDebug.default = createDebug;
        createDebug.coerce = coerce;
        createDebug.disable = disable;
        createDebug.enable = enable;
        createDebug.enabled = enabled;
        createDebug.humanize = require_ms3();
        createDebug.destroy = destroy;
        Object.keys(env).forEach((key) => {
          createDebug[key] = env[key];
        });
        createDebug.names = [];
        createDebug.skips = [];
        createDebug.formatters = {};
        function selectColor(namespace) {
          let hash = 0;
          for (let i = 0; i < namespace.length; i++) {
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0;
          }
          return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
        }
        createDebug.selectColor = selectColor;
        function createDebug(namespace) {
          let prevTime;
          let enableOverride = null;
          let namespacesCache;
          let enabledCache;
          function debug(...args) {
            if (!debug.enabled) {
              return;
            }
            const self2 = debug;
            const curr = Number(/* @__PURE__ */ new Date());
            const ms = curr - (prevTime || curr);
            self2.diff = ms;
            self2.prev = prevTime;
            self2.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== "string") {
              args.unshift("%O");
            }
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
              if (match === "%%") {
                return "%";
              }
              index++;
              const formatter = createDebug.formatters[format];
              if (typeof formatter === "function") {
                const val = args[index];
                match = formatter.call(self2, val);
                args.splice(index, 1);
                index--;
              }
              return match;
            });
            createDebug.formatArgs.call(self2, args);
            const logFn = self2.log || createDebug.log;
            logFn.apply(self2, args);
          }
          debug.namespace = namespace;
          debug.useColors = createDebug.useColors();
          debug.color = createDebug.selectColor(namespace);
          debug.extend = extend;
          debug.destroy = createDebug.destroy;
          Object.defineProperty(debug, "enabled", {
            enumerable: true,
            configurable: false,
            get: () => {
              if (enableOverride !== null) {
                return enableOverride;
              }
              if (namespacesCache !== createDebug.namespaces) {
                namespacesCache = createDebug.namespaces;
                enabledCache = createDebug.enabled(namespace);
              }
              return enabledCache;
            },
            set: (v) => {
              enableOverride = v;
            }
          });
          if (typeof createDebug.init === "function") {
            createDebug.init(debug);
          }
          return debug;
        }
        function extend(namespace, delimiter) {
          const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
          newDebug.log = this.log;
          return newDebug;
        }
        function enable(namespaces) {
          createDebug.save(namespaces);
          createDebug.namespaces = namespaces;
          createDebug.names = [];
          createDebug.skips = [];
          const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
          for (const ns of split) {
            if (ns[0] === "-") {
              createDebug.skips.push(ns.slice(1));
            } else {
              createDebug.names.push(ns);
            }
          }
        }
        function matchesTemplate(search, template) {
          let searchIndex = 0;
          let templateIndex = 0;
          let starIndex = -1;
          let matchIndex = 0;
          while (searchIndex < search.length) {
            if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
              if (template[templateIndex] === "*") {
                starIndex = templateIndex;
                matchIndex = searchIndex;
                templateIndex++;
              } else {
                searchIndex++;
                templateIndex++;
              }
            } else if (starIndex !== -1) {
              templateIndex = starIndex + 1;
              matchIndex++;
              searchIndex = matchIndex;
            } else {
              return false;
            }
          }
          while (templateIndex < template.length && template[templateIndex] === "*") {
            templateIndex++;
          }
          return templateIndex === template.length;
        }
        function disable() {
          const namespaces = [
            ...createDebug.names,
            ...createDebug.skips.map((namespace) => "-" + namespace)
          ].join(",");
          createDebug.enable("");
          return namespaces;
        }
        function enabled(name) {
          for (const skip of createDebug.skips) {
            if (matchesTemplate(name, skip)) {
              return false;
            }
          }
          for (const ns of createDebug.names) {
            if (matchesTemplate(name, ns)) {
              return true;
            }
          }
          return false;
        }
        function coerce(val) {
          if (val instanceof Error) {
            return val.stack || val.message;
          }
          return val;
        }
        function destroy() {
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
        createDebug.enable(createDebug.load());
        return createDebug;
      }
      module.exports = setup;
    }
  });

  // node_modules/awaitqueue/node_modules/debug/src/browser.js
  var require_browser3 = __commonJS({
    "node_modules/awaitqueue/node_modules/debug/src/browser.js"(exports, module) {
      exports.formatArgs = formatArgs;
      exports.save = save;
      exports.load = load;
      exports.useColors = useColors;
      exports.storage = localstorage();
      exports.destroy = /* @__PURE__ */ (() => {
        let warned = false;
        return () => {
          if (!warned) {
            warned = true;
            console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
          }
        };
      })();
      exports.colors = [
        "#0000CC",
        "#0000FF",
        "#0033CC",
        "#0033FF",
        "#0066CC",
        "#0066FF",
        "#0099CC",
        "#0099FF",
        "#00CC00",
        "#00CC33",
        "#00CC66",
        "#00CC99",
        "#00CCCC",
        "#00CCFF",
        "#3300CC",
        "#3300FF",
        "#3333CC",
        "#3333FF",
        "#3366CC",
        "#3366FF",
        "#3399CC",
        "#3399FF",
        "#33CC00",
        "#33CC33",
        "#33CC66",
        "#33CC99",
        "#33CCCC",
        "#33CCFF",
        "#6600CC",
        "#6600FF",
        "#6633CC",
        "#6633FF",
        "#66CC00",
        "#66CC33",
        "#9900CC",
        "#9900FF",
        "#9933CC",
        "#9933FF",
        "#99CC00",
        "#99CC33",
        "#CC0000",
        "#CC0033",
        "#CC0066",
        "#CC0099",
        "#CC00CC",
        "#CC00FF",
        "#CC3300",
        "#CC3333",
        "#CC3366",
        "#CC3399",
        "#CC33CC",
        "#CC33FF",
        "#CC6600",
        "#CC6633",
        "#CC9900",
        "#CC9933",
        "#CCCC00",
        "#CCCC33",
        "#FF0000",
        "#FF0033",
        "#FF0066",
        "#FF0099",
        "#FF00CC",
        "#FF00FF",
        "#FF3300",
        "#FF3333",
        "#FF3366",
        "#FF3399",
        "#FF33CC",
        "#FF33FF",
        "#FF6600",
        "#FF6633",
        "#FF9900",
        "#FF9933",
        "#FFCC00",
        "#FFCC33"
      ];
      function useColors() {
        if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
          return true;
        }
        if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
          return false;
        }
        let m;
        return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
        typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
        // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
        typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
        typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
      }
      function formatArgs(args) {
        args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
        if (!this.useColors) {
          return;
        }
        const c = "color: " + this.color;
        args.splice(1, 0, c, "color: inherit");
        let index = 0;
        let lastC = 0;
        args[0].replace(/%[a-zA-Z%]/g, (match) => {
          if (match === "%%") {
            return;
          }
          index++;
          if (match === "%c") {
            lastC = index;
          }
        });
        args.splice(lastC, 0, c);
      }
      exports.log = console.debug || console.log || (() => {
      });
      function save(namespaces) {
        try {
          if (namespaces) {
            exports.storage.setItem("debug", namespaces);
          } else {
            exports.storage.removeItem("debug");
          }
        } catch (error) {
        }
      }
      function load() {
        let r;
        try {
          r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
        } catch (error) {
        }
        if (!r && typeof process !== "undefined" && "env" in process) {
          r = process.env.DEBUG;
        }
        return r;
      }
      function localstorage() {
        try {
          return localStorage;
        } catch (error) {
        }
      }
      module.exports = require_common3()(exports);
      var { formatters } = module.exports;
      formatters.j = function(v) {
        try {
          return JSON.stringify(v);
        } catch (error) {
          return "[UnexpectedJSONParseError]: " + error.message;
        }
      };
    }
  });

  // node_modules/awaitqueue/lib/Logger.js
  var require_Logger3 = __commonJS({
    "node_modules/awaitqueue/lib/Logger.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Logger = void 0;
      var debug = require_browser3();
      var LIB_NAME = "awaitqueue";
      var Logger = class {
        _debug;
        _warn;
        _error;
        constructor(prefix) {
          if (prefix) {
            this._debug = debug(`${LIB_NAME}:${prefix}`);
            this._warn = debug(`${LIB_NAME}:WARN:${prefix}`);
            this._error = debug(`${LIB_NAME}:ERROR:${prefix}`);
          } else {
            this._debug = debug(LIB_NAME);
            this._warn = debug(`${LIB_NAME}:WARN`);
            this._error = debug(`${LIB_NAME}:ERROR`);
          }
          this._debug.log = console.info.bind(console);
          this._warn.log = console.warn.bind(console);
          this._error.log = console.error.bind(console);
        }
        get debug() {
          return this._debug;
        }
        get warn() {
          return this._warn;
        }
        get error() {
          return this._error;
        }
      };
      exports.Logger = Logger;
    }
  });

  // node_modules/awaitqueue/lib/errors.js
  var require_errors2 = __commonJS({
    "node_modules/awaitqueue/lib/errors.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AwaitQueueRemovedTaskError = exports.AwaitQueueStoppedError = void 0;
      var AwaitQueueStoppedError = class _AwaitQueueStoppedError extends Error {
        constructor(message) {
          super(message ?? "queue stopped");
          this.name = "AwaitQueueStoppedError";
          if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, _AwaitQueueStoppedError);
          }
        }
      };
      exports.AwaitQueueStoppedError = AwaitQueueStoppedError;
      var AwaitQueueRemovedTaskError = class _AwaitQueueRemovedTaskError extends Error {
        constructor(message) {
          super(message ?? "queue task removed");
          this.name = "AwaitQueueRemovedTaskError";
          if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, _AwaitQueueRemovedTaskError);
          }
        }
      };
      exports.AwaitQueueRemovedTaskError = AwaitQueueRemovedTaskError;
    }
  });

  // node_modules/awaitqueue/lib/AwaitQueue.js
  var require_AwaitQueue = __commonJS({
    "node_modules/awaitqueue/lib/AwaitQueue.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AwaitQueue = void 0;
      var Logger_1 = require_Logger3();
      var errors_1 = require_errors2();
      var logger = new Logger_1.Logger("AwaitQueue");
      var AwaitQueue = class {
        // Queue of pending tasks (map of PendingTasks indexed by id).
        pendingTasks = /* @__PURE__ */ new Map();
        // Incrementing PendingTask id.
        nextTaskId = 0;
        // Whether stop() method is stopping all pending tasks.
        stopping = false;
        constructor() {
          logger.debug("constructor()");
        }
        get size() {
          return this.pendingTasks.size;
        }
        async push(task, name) {
          name = name ?? task.name;
          logger.debug(`push() [name:${name}]`);
          if (typeof task !== "function") {
            throw new TypeError("given task is not a function");
          }
          if (name) {
            try {
              Object.defineProperty(task, "name", { value: name });
            } catch (error) {
            }
          }
          return new Promise((resolve, reject) => {
            const pendingTask = {
              id: this.nextTaskId++,
              task,
              name,
              enqueuedAt: Date.now(),
              executedAt: void 0,
              completed: false,
              resolve: (result) => {
                if (pendingTask.completed) {
                  return;
                }
                pendingTask.completed = true;
                this.pendingTasks.delete(pendingTask.id);
                logger.debug(`resolving task [name:${pendingTask.name}]`);
                resolve(result);
                const [nextPendingTask] = this.pendingTasks.values();
                if (nextPendingTask && !nextPendingTask.executedAt) {
                  void this.execute(nextPendingTask);
                }
              },
              reject: (error) => {
                if (pendingTask.completed) {
                  return;
                }
                pendingTask.completed = true;
                this.pendingTasks.delete(pendingTask.id);
                logger.debug(`rejecting task [name:${pendingTask.name}]: %s`, String(error));
                reject(error);
                if (!this.stopping) {
                  const [nextPendingTask] = this.pendingTasks.values();
                  if (nextPendingTask && !nextPendingTask.executedAt) {
                    void this.execute(nextPendingTask);
                  }
                }
              }
            };
            this.pendingTasks.set(pendingTask.id, pendingTask);
            if (this.pendingTasks.size === 1) {
              void this.execute(pendingTask);
            }
          });
        }
        stop() {
          logger.debug("stop()");
          this.stopping = true;
          for (const pendingTask of this.pendingTasks.values()) {
            logger.debug(`stop() | stopping task [name:${pendingTask.name}]`);
            pendingTask.reject(new errors_1.AwaitQueueStoppedError());
          }
          this.stopping = false;
        }
        remove(taskIdx) {
          logger.debug(`remove() [taskIdx:${taskIdx}]`);
          const pendingTask = Array.from(this.pendingTasks.values())[taskIdx];
          if (!pendingTask) {
            logger.debug(`stop() | no task with given idx [taskIdx:${taskIdx}]`);
            return;
          }
          pendingTask.reject(new errors_1.AwaitQueueRemovedTaskError());
        }
        dump() {
          const now = Date.now();
          let idx = 0;
          return Array.from(this.pendingTasks.values()).map((pendingTask) => ({
            idx: idx++,
            task: pendingTask.task,
            name: pendingTask.name,
            enqueuedTime: pendingTask.executedAt ? pendingTask.executedAt - pendingTask.enqueuedAt : now - pendingTask.enqueuedAt,
            executionTime: pendingTask.executedAt ? now - pendingTask.executedAt : 0
          }));
        }
        async execute(pendingTask) {
          logger.debug(`execute() [name:${pendingTask.name}]`);
          if (pendingTask.executedAt) {
            throw new Error("task already being executed");
          }
          pendingTask.executedAt = Date.now();
          try {
            const result = await pendingTask.task();
            pendingTask.resolve(result);
          } catch (error) {
            pendingTask.reject(error);
          }
        }
      };
      exports.AwaitQueue = AwaitQueue;
    }
  });

  // node_modules/awaitqueue/lib/index.js
  var require_lib2 = __commonJS({
    "node_modules/awaitqueue/lib/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AwaitQueueRemovedTaskError = exports.AwaitQueueStoppedError = exports.AwaitQueue = void 0;
      var AwaitQueue_1 = require_AwaitQueue();
      Object.defineProperty(exports, "AwaitQueue", { enumerable: true, get: function() {
        return AwaitQueue_1.AwaitQueue;
      } });
      var errors_1 = require_errors2();
      Object.defineProperty(exports, "AwaitQueueStoppedError", { enumerable: true, get: function() {
        return errors_1.AwaitQueueStoppedError;
      } });
      Object.defineProperty(exports, "AwaitQueueRemovedTaskError", { enumerable: true, get: function() {
        return errors_1.AwaitQueueRemovedTaskError;
      } });
    }
  });

  // node_modules/mediasoup-client/lib/Producer.js
  var require_Producer = __commonJS({
    "node_modules/mediasoup-client/lib/Producer.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Producer = void 0;
      var Logger_1 = require_Logger();
      var enhancedEvents_1 = require_enhancedEvents();
      var errors_1 = require_errors();
      var logger = new Logger_1.Logger("Producer");
      var Producer = class extends enhancedEvents_1.EnhancedEventEmitter {
        // Id.
        _id;
        // Local id.
        _localId;
        // Closed flag.
        _closed = false;
        // Associated RTCRtpSender.
        _rtpSender;
        // Local track.
        _track;
        // Producer kind.
        _kind;
        // RTP parameters.
        _rtpParameters;
        // Paused flag.
        _paused;
        // Video max spatial layer.
        _maxSpatialLayer;
        // Whether the Producer should call stop() in given tracks.
        _stopTracks;
        // Whether the Producer should set track.enabled = false when paused.
        _disableTrackOnPause;
        // Whether we should replace the RTCRtpSender.track with null when paused.
        _zeroRtpOnPause;
        // App custom data.
        _appData;
        // Observer instance.
        _observer = new enhancedEvents_1.EnhancedEventEmitter();
        constructor({ id, localId, rtpSender, track, rtpParameters, stopTracks, disableTrackOnPause, zeroRtpOnPause, appData }) {
          super();
          logger.debug("constructor()");
          this._id = id;
          this._localId = localId;
          this._rtpSender = rtpSender;
          this._track = track;
          this._kind = track.kind;
          this._rtpParameters = rtpParameters;
          this._paused = disableTrackOnPause ? !track.enabled : false;
          this._maxSpatialLayer = void 0;
          this._stopTracks = stopTracks;
          this._disableTrackOnPause = disableTrackOnPause;
          this._zeroRtpOnPause = zeroRtpOnPause;
          this._appData = appData ?? {};
          this.onTrackEnded = this.onTrackEnded.bind(this);
          this.handleTrack();
        }
        /**
         * Producer id.
         */
        get id() {
          return this._id;
        }
        /**
         * Local id.
         */
        get localId() {
          return this._localId;
        }
        /**
         * Whether the Producer is closed.
         */
        get closed() {
          return this._closed;
        }
        /**
         * Media kind.
         */
        get kind() {
          return this._kind;
        }
        /**
         * Associated RTCRtpSender.
         */
        get rtpSender() {
          return this._rtpSender;
        }
        /**
         * The associated track.
         */
        get track() {
          return this._track;
        }
        /**
         * RTP parameters.
         */
        get rtpParameters() {
          return this._rtpParameters;
        }
        /**
         * Whether the Producer is paused.
         */
        get paused() {
          return this._paused;
        }
        /**
         * Max spatial layer.
         *
         * @type {Number | undefined}
         */
        get maxSpatialLayer() {
          return this._maxSpatialLayer;
        }
        /**
         * App custom data.
         */
        get appData() {
          return this._appData;
        }
        /**
         * App custom data setter.
         */
        set appData(appData) {
          this._appData = appData;
        }
        get observer() {
          return this._observer;
        }
        /**
         * Closes the Producer.
         */
        close() {
          if (this._closed) {
            return;
          }
          logger.debug("close()");
          this._closed = true;
          this.destroyTrack();
          this.emit("@close");
          this._observer.safeEmit("close");
        }
        /**
         * Transport was closed.
         */
        transportClosed() {
          if (this._closed) {
            return;
          }
          logger.debug("transportClosed()");
          this._closed = true;
          this.destroyTrack();
          this.safeEmit("transportclose");
          this._observer.safeEmit("close");
        }
        /**
         * Get associated RTCRtpSender stats.
         */
        async getStats() {
          if (this._closed) {
            throw new errors_1.InvalidStateError("closed");
          }
          return new Promise((resolve, reject) => {
            this.safeEmit("@getstats", resolve, reject);
          });
        }
        /**
         * Pauses sending media.
         */
        pause() {
          logger.debug("pause()");
          if (this._closed) {
            logger.error("pause() | Producer closed");
            return;
          }
          this._paused = true;
          if (this._track && this._disableTrackOnPause) {
            this._track.enabled = false;
          }
          if (this._zeroRtpOnPause) {
            new Promise((resolve, reject) => {
              this.safeEmit("@pause", resolve, reject);
            }).catch(() => {
            });
          }
          this._observer.safeEmit("pause");
        }
        /**
         * Resumes sending media.
         */
        resume() {
          logger.debug("resume()");
          if (this._closed) {
            logger.error("resume() | Producer closed");
            return;
          }
          this._paused = false;
          if (this._track && this._disableTrackOnPause) {
            this._track.enabled = true;
          }
          if (this._zeroRtpOnPause) {
            new Promise((resolve, reject) => {
              this.safeEmit("@resume", resolve, reject);
            }).catch(() => {
            });
          }
          this._observer.safeEmit("resume");
        }
        /**
         * Replaces the current track with a new one or null.
         */
        async replaceTrack({ track }) {
          logger.debug("replaceTrack() [track:%o]", track);
          if (this._closed) {
            if (track && this._stopTracks) {
              try {
                track.stop();
              } catch (error) {
              }
            }
            throw new errors_1.InvalidStateError("closed");
          } else if (track && track.readyState === "ended") {
            throw new errors_1.InvalidStateError("track ended");
          }
          if (track === this._track) {
            logger.debug("replaceTrack() | same track, ignored");
            return;
          }
          await new Promise((resolve, reject) => {
            this.safeEmit("@replacetrack", track, resolve, reject);
          });
          this.destroyTrack();
          this._track = track;
          if (this._track && this._disableTrackOnPause) {
            if (!this._paused) {
              this._track.enabled = true;
            } else if (this._paused) {
              this._track.enabled = false;
            }
          }
          this.handleTrack();
        }
        /**
         * Sets the video max spatial layer to be sent.
         */
        async setMaxSpatialLayer(spatialLayer) {
          if (this._closed) {
            throw new errors_1.InvalidStateError("closed");
          } else if (this._kind !== "video") {
            throw new errors_1.UnsupportedError("not a video Producer");
          } else if (typeof spatialLayer !== "number") {
            throw new TypeError("invalid spatialLayer");
          }
          if (spatialLayer === this._maxSpatialLayer) {
            return;
          }
          await new Promise((resolve, reject) => {
            this.safeEmit("@setmaxspatiallayer", spatialLayer, resolve, reject);
          }).catch(() => {
          });
          this._maxSpatialLayer = spatialLayer;
        }
        async setRtpEncodingParameters(params2) {
          if (this._closed) {
            throw new errors_1.InvalidStateError("closed");
          } else if (typeof params2 !== "object") {
            throw new TypeError("invalid params");
          }
          await new Promise((resolve, reject) => {
            this.safeEmit("@setrtpencodingparameters", params2, resolve, reject);
          });
        }
        onTrackEnded() {
          logger.debug('track "ended" event');
          this.safeEmit("trackended");
          this._observer.safeEmit("trackended");
        }
        handleTrack() {
          if (!this._track) {
            return;
          }
          this._track.addEventListener("ended", this.onTrackEnded);
        }
        destroyTrack() {
          if (!this._track) {
            return;
          }
          try {
            this._track.removeEventListener("ended", this.onTrackEnded);
            if (this._stopTracks) {
              this._track.stop();
            }
          } catch (error) {
          }
        }
      };
      exports.Producer = Producer;
    }
  });

  // node_modules/mediasoup-client/lib/Consumer.js
  var require_Consumer = __commonJS({
    "node_modules/mediasoup-client/lib/Consumer.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Consumer = void 0;
      var Logger_1 = require_Logger();
      var enhancedEvents_1 = require_enhancedEvents();
      var errors_1 = require_errors();
      var logger = new Logger_1.Logger("Consumer");
      var Consumer = class extends enhancedEvents_1.EnhancedEventEmitter {
        // Id.
        _id;
        // Local id.
        _localId;
        // Associated Producer id.
        _producerId;
        // Closed flag.
        _closed = false;
        // Associated RTCRtpReceiver.
        _rtpReceiver;
        // Remote track.
        _track;
        // RTP parameters.
        _rtpParameters;
        // Paused flag.
        _paused;
        // App custom data.
        _appData;
        // Observer instance.
        _observer = new enhancedEvents_1.EnhancedEventEmitter();
        constructor({ id, localId, producerId, rtpReceiver, track, rtpParameters, appData }) {
          super();
          logger.debug("constructor()");
          this._id = id;
          this._localId = localId;
          this._producerId = producerId;
          this._rtpReceiver = rtpReceiver;
          this._track = track;
          this._rtpParameters = rtpParameters;
          this._paused = !track.enabled;
          this._appData = appData ?? {};
          this.onTrackEnded = this.onTrackEnded.bind(this);
          this.handleTrack();
        }
        /**
         * Consumer id.
         */
        get id() {
          return this._id;
        }
        /**
         * Local id.
         */
        get localId() {
          return this._localId;
        }
        /**
         * Associated Producer id.
         */
        get producerId() {
          return this._producerId;
        }
        /**
         * Whether the Consumer is closed.
         */
        get closed() {
          return this._closed;
        }
        /**
         * Media kind.
         */
        get kind() {
          return this._track.kind;
        }
        /**
         * Associated RTCRtpReceiver.
         */
        get rtpReceiver() {
          return this._rtpReceiver;
        }
        /**
         * The associated track.
         */
        get track() {
          return this._track;
        }
        /**
         * RTP parameters.
         */
        get rtpParameters() {
          return this._rtpParameters;
        }
        /**
         * Whether the Consumer is paused.
         */
        get paused() {
          return this._paused;
        }
        /**
         * App custom data.
         */
        get appData() {
          return this._appData;
        }
        /**
         * App custom data setter.
         */
        set appData(appData) {
          this._appData = appData;
        }
        get observer() {
          return this._observer;
        }
        /**
         * Closes the Consumer.
         */
        close() {
          if (this._closed) {
            return;
          }
          logger.debug("close()");
          this._closed = true;
          this.destroyTrack();
          this.emit("@close");
          this._observer.safeEmit("close");
        }
        /**
         * Transport was closed.
         */
        transportClosed() {
          if (this._closed) {
            return;
          }
          logger.debug("transportClosed()");
          this._closed = true;
          this.destroyTrack();
          this.safeEmit("transportclose");
          this._observer.safeEmit("close");
        }
        /**
         * Get associated RTCRtpReceiver stats.
         */
        async getStats() {
          if (this._closed) {
            throw new errors_1.InvalidStateError("closed");
          }
          return new Promise((resolve, reject) => {
            this.safeEmit("@getstats", resolve, reject);
          });
        }
        /**
         * Pauses receiving media.
         */
        pause() {
          logger.debug("pause()");
          if (this._closed) {
            logger.error("pause() | Consumer closed");
            return;
          }
          if (this._paused) {
            logger.debug("pause() | Consumer is already paused");
            return;
          }
          this._paused = true;
          this._track.enabled = false;
          this.emit("@pause");
          this._observer.safeEmit("pause");
        }
        /**
         * Resumes receiving media.
         */
        resume() {
          logger.debug("resume()");
          if (this._closed) {
            logger.error("resume() | Consumer closed");
            return;
          }
          if (!this._paused) {
            logger.debug("resume() | Consumer is already resumed");
            return;
          }
          this._paused = false;
          this._track.enabled = true;
          this.emit("@resume");
          this._observer.safeEmit("resume");
        }
        onTrackEnded() {
          logger.debug('track "ended" event');
          this.safeEmit("trackended");
          this._observer.safeEmit("trackended");
        }
        handleTrack() {
          this._track.addEventListener("ended", this.onTrackEnded);
        }
        destroyTrack() {
          try {
            this._track.removeEventListener("ended", this.onTrackEnded);
            this._track.stop();
          } catch (error) {
          }
        }
      };
      exports.Consumer = Consumer;
    }
  });

  // node_modules/mediasoup-client/lib/DataProducer.js
  var require_DataProducer = __commonJS({
    "node_modules/mediasoup-client/lib/DataProducer.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DataProducer = void 0;
      var Logger_1 = require_Logger();
      var enhancedEvents_1 = require_enhancedEvents();
      var errors_1 = require_errors();
      var logger = new Logger_1.Logger("DataProducer");
      var DataProducer = class extends enhancedEvents_1.EnhancedEventEmitter {
        // Id.
        _id;
        // The underlying RTCDataChannel instance.
        _dataChannel;
        // Closed flag.
        _closed = false;
        // SCTP stream parameters.
        _sctpStreamParameters;
        // App custom data.
        _appData;
        // Observer instance.
        _observer = new enhancedEvents_1.EnhancedEventEmitter();
        constructor({ id, dataChannel, sctpStreamParameters, appData }) {
          super();
          logger.debug("constructor()");
          this._id = id;
          this._dataChannel = dataChannel;
          this._sctpStreamParameters = sctpStreamParameters;
          this._appData = appData ?? {};
          this.handleDataChannel();
        }
        /**
         * DataProducer id.
         */
        get id() {
          return this._id;
        }
        /**
         * Whether the DataProducer is closed.
         */
        get closed() {
          return this._closed;
        }
        /**
         * SCTP stream parameters.
         */
        get sctpStreamParameters() {
          return this._sctpStreamParameters;
        }
        /**
         * DataChannel readyState.
         */
        get readyState() {
          return this._dataChannel.readyState;
        }
        /**
         * DataChannel label.
         */
        get label() {
          return this._dataChannel.label;
        }
        /**
         * DataChannel protocol.
         */
        get protocol() {
          return this._dataChannel.protocol;
        }
        /**
         * DataChannel bufferedAmount.
         */
        get bufferedAmount() {
          return this._dataChannel.bufferedAmount;
        }
        /**
         * DataChannel bufferedAmountLowThreshold.
         */
        get bufferedAmountLowThreshold() {
          return this._dataChannel.bufferedAmountLowThreshold;
        }
        /**
         * Set DataChannel bufferedAmountLowThreshold.
         */
        set bufferedAmountLowThreshold(bufferedAmountLowThreshold) {
          this._dataChannel.bufferedAmountLowThreshold = bufferedAmountLowThreshold;
        }
        /**
         * App custom data.
         */
        get appData() {
          return this._appData;
        }
        /**
         * App custom data setter.
         */
        set appData(appData) {
          this._appData = appData;
        }
        get observer() {
          return this._observer;
        }
        /**
         * Closes the DataProducer.
         */
        close() {
          if (this._closed) {
            return;
          }
          logger.debug("close()");
          this._closed = true;
          this._dataChannel.close();
          this.emit("@close");
          this._observer.safeEmit("close");
        }
        /**
         * Transport was closed.
         */
        transportClosed() {
          if (this._closed) {
            return;
          }
          logger.debug("transportClosed()");
          this._closed = true;
          this._dataChannel.close();
          this.safeEmit("transportclose");
          this._observer.safeEmit("close");
        }
        /**
         * Send a message.
         *
         * @param {String|Blob|ArrayBuffer|ArrayBufferView} data.
         */
        send(data) {
          logger.debug("send()");
          if (this._closed) {
            throw new errors_1.InvalidStateError("closed");
          }
          this._dataChannel.send(data);
        }
        handleDataChannel() {
          this._dataChannel.addEventListener("open", () => {
            if (this._closed) {
              return;
            }
            logger.debug('DataChannel "open" event');
            this.safeEmit("open");
          });
          this._dataChannel.addEventListener("error", (event) => {
            if (this._closed) {
              return;
            }
            let { error } = event;
            if (!error) {
              error = new Error("unknown DataChannel error");
            }
            if (error.errorDetail === "sctp-failure") {
              logger.error("DataChannel SCTP error [sctpCauseCode:%s]: %s", error.sctpCauseCode, error.message);
            } else {
              logger.error('DataChannel "error" event: %o', error);
            }
            this.safeEmit("error", error);
          });
          this._dataChannel.addEventListener("close", () => {
            if (this._closed) {
              return;
            }
            logger.warn('DataChannel "close" event');
            this._closed = true;
            this.emit("@close");
            this.safeEmit("close");
            this._observer.safeEmit("close");
          });
          this._dataChannel.addEventListener("message", () => {
            if (this._closed) {
              return;
            }
            logger.warn('DataChannel "message" event in a DataProducer, message discarded');
          });
          this._dataChannel.addEventListener("bufferedamountlow", () => {
            if (this._closed) {
              return;
            }
            this.safeEmit("bufferedamountlow");
          });
        }
      };
      exports.DataProducer = DataProducer;
    }
  });

  // node_modules/mediasoup-client/lib/DataConsumer.js
  var require_DataConsumer = __commonJS({
    "node_modules/mediasoup-client/lib/DataConsumer.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DataConsumer = void 0;
      var Logger_1 = require_Logger();
      var enhancedEvents_1 = require_enhancedEvents();
      var logger = new Logger_1.Logger("DataConsumer");
      var DataConsumer = class extends enhancedEvents_1.EnhancedEventEmitter {
        // Id.
        _id;
        // Associated DataProducer Id.
        _dataProducerId;
        // The underlying RTCDataChannel instance.
        _dataChannel;
        // Closed flag.
        _closed = false;
        // SCTP stream parameters.
        _sctpStreamParameters;
        // App custom data.
        _appData;
        // Observer instance.
        _observer = new enhancedEvents_1.EnhancedEventEmitter();
        constructor({ id, dataProducerId, dataChannel, sctpStreamParameters, appData }) {
          super();
          logger.debug("constructor()");
          this._id = id;
          this._dataProducerId = dataProducerId;
          this._dataChannel = dataChannel;
          this._sctpStreamParameters = sctpStreamParameters;
          this._appData = appData ?? {};
          this.handleDataChannel();
        }
        /**
         * DataConsumer id.
         */
        get id() {
          return this._id;
        }
        /**
         * Associated DataProducer id.
         */
        get dataProducerId() {
          return this._dataProducerId;
        }
        /**
         * Whether the DataConsumer is closed.
         */
        get closed() {
          return this._closed;
        }
        /**
         * SCTP stream parameters.
         */
        get sctpStreamParameters() {
          return this._sctpStreamParameters;
        }
        /**
         * DataChannel readyState.
         */
        get readyState() {
          return this._dataChannel.readyState;
        }
        /**
         * DataChannel label.
         */
        get label() {
          return this._dataChannel.label;
        }
        /**
         * DataChannel protocol.
         */
        get protocol() {
          return this._dataChannel.protocol;
        }
        /**
         * DataChannel binaryType.
         */
        get binaryType() {
          return this._dataChannel.binaryType;
        }
        /**
         * Set DataChannel binaryType.
         */
        set binaryType(binaryType) {
          this._dataChannel.binaryType = binaryType;
        }
        /**
         * App custom data.
         */
        get appData() {
          return this._appData;
        }
        /**
         * App custom data setter.
         */
        set appData(appData) {
          this._appData = appData;
        }
        get observer() {
          return this._observer;
        }
        /**
         * Closes the DataConsumer.
         */
        close() {
          if (this._closed) {
            return;
          }
          logger.debug("close()");
          this._closed = true;
          this._dataChannel.close();
          this.emit("@close");
          this._observer.safeEmit("close");
        }
        /**
         * Transport was closed.
         */
        transportClosed() {
          if (this._closed) {
            return;
          }
          logger.debug("transportClosed()");
          this._closed = true;
          this._dataChannel.close();
          this.safeEmit("transportclose");
          this._observer.safeEmit("close");
        }
        handleDataChannel() {
          this._dataChannel.addEventListener("open", () => {
            if (this._closed) {
              return;
            }
            logger.debug('DataChannel "open" event');
            this.safeEmit("open");
          });
          this._dataChannel.addEventListener("error", (event) => {
            if (this._closed) {
              return;
            }
            let { error } = event;
            if (!error) {
              error = new Error("unknown DataChannel error");
            }
            if (error.errorDetail === "sctp-failure") {
              logger.error("DataChannel SCTP error [sctpCauseCode:%s]: %s", error.sctpCauseCode, error.message);
            } else {
              logger.error('DataChannel "error" event: %o', error);
            }
            this.safeEmit("error", error);
          });
          this._dataChannel.addEventListener("close", () => {
            if (this._closed) {
              return;
            }
            logger.warn('DataChannel "close" event');
            this._closed = true;
            this.emit("@close");
            this.safeEmit("close");
            this._observer.safeEmit("close");
          });
          this._dataChannel.addEventListener("message", (event) => {
            if (this._closed) {
              return;
            }
            this.safeEmit("message", event.data);
          });
        }
      };
      exports.DataConsumer = DataConsumer;
    }
  });

  // node_modules/mediasoup-client/lib/Transport.js
  var require_Transport = __commonJS({
    "node_modules/mediasoup-client/lib/Transport.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Transport = void 0;
      var awaitqueue_1 = require_lib2();
      var Logger_1 = require_Logger();
      var enhancedEvents_1 = require_enhancedEvents();
      var errors_1 = require_errors();
      var utils = require_utils();
      var ortc = require_ortc();
      var Producer_1 = require_Producer();
      var Consumer_1 = require_Consumer();
      var DataProducer_1 = require_DataProducer();
      var DataConsumer_1 = require_DataConsumer();
      var logger = new Logger_1.Logger("Transport");
      var ConsumerCreationTask = class {
        consumerOptions;
        promise;
        resolve;
        reject;
        constructor(consumerOptions) {
          this.consumerOptions = consumerOptions;
          this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
          });
        }
      };
      var Transport2 = class extends enhancedEvents_1.EnhancedEventEmitter {
        // Id.
        _id;
        // Closed flag.
        _closed = false;
        // Direction.
        _direction;
        // Extended RTP capabilities.
        _extendedRtpCapabilities;
        // Whether we can produce audio/video based on computed extended RTP
        // capabilities.
        _canProduceByKind;
        // SCTP max message size if enabled, null otherwise.
        _maxSctpMessageSize;
        // RTC handler isntance.
        _handler;
        // Transport ICE gathering state.
        _iceGatheringState = "new";
        // Transport connection state.
        _connectionState = "new";
        // App custom data.
        _appData;
        // Map of Producers indexed by id.
        _producers = /* @__PURE__ */ new Map();
        // Map of Consumers indexed by id.
        _consumers = /* @__PURE__ */ new Map();
        // Map of DataProducers indexed by id.
        _dataProducers = /* @__PURE__ */ new Map();
        // Map of DataConsumers indexed by id.
        _dataConsumers = /* @__PURE__ */ new Map();
        // Whether the Consumer for RTP probation has been created.
        _probatorConsumerCreated = false;
        // AwaitQueue instance to make async tasks happen sequentially.
        _awaitQueue = new awaitqueue_1.AwaitQueue();
        // Consumer creation tasks awaiting to be processed.
        _pendingConsumerTasks = [];
        // Consumer creation in progress flag.
        _consumerCreationInProgress = false;
        // Consumers pending to be paused.
        _pendingPauseConsumers = /* @__PURE__ */ new Map();
        // Consumer pause in progress flag.
        _consumerPauseInProgress = false;
        // Consumers pending to be resumed.
        _pendingResumeConsumers = /* @__PURE__ */ new Map();
        // Consumer resume in progress flag.
        _consumerResumeInProgress = false;
        // Consumers pending to be closed.
        _pendingCloseConsumers = /* @__PURE__ */ new Map();
        // Consumer close in progress flag.
        _consumerCloseInProgress = false;
        // Observer instance.
        _observer = new enhancedEvents_1.EnhancedEventEmitter();
        constructor({ direction, id, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, appData, handlerFactory, extendedRtpCapabilities, canProduceByKind }) {
          super();
          logger.debug("constructor() [id:%s, direction:%s]", id, direction);
          this._id = id;
          this._direction = direction;
          this._extendedRtpCapabilities = extendedRtpCapabilities;
          this._canProduceByKind = canProduceByKind;
          this._maxSctpMessageSize = sctpParameters ? sctpParameters.maxMessageSize : null;
          const clonedAdditionalSettings = utils.clone(additionalSettings) ?? {};
          delete clonedAdditionalSettings.iceServers;
          delete clonedAdditionalSettings.iceTransportPolicy;
          delete clonedAdditionalSettings.bundlePolicy;
          delete clonedAdditionalSettings.rtcpMuxPolicy;
          delete clonedAdditionalSettings.sdpSemantics;
          this._handler = handlerFactory();
          this._handler.run({
            direction,
            iceParameters,
            iceCandidates,
            dtlsParameters,
            sctpParameters,
            iceServers,
            iceTransportPolicy,
            additionalSettings: clonedAdditionalSettings,
            proprietaryConstraints,
            extendedRtpCapabilities
          });
          this._appData = appData ?? {};
          this.handleHandler();
        }
        /**
         * Transport id.
         */
        get id() {
          return this._id;
        }
        /**
         * Whether the Transport is closed.
         */
        get closed() {
          return this._closed;
        }
        /**
         * Transport direction.
         */
        get direction() {
          return this._direction;
        }
        /**
         * RTC handler instance.
         */
        get handler() {
          return this._handler;
        }
        /**
         * ICE gathering state.
         */
        get iceGatheringState() {
          return this._iceGatheringState;
        }
        /**
         * Connection state.
         */
        get connectionState() {
          return this._connectionState;
        }
        /**
         * App custom data.
         */
        get appData() {
          return this._appData;
        }
        /**
         * App custom data setter.
         */
        set appData(appData) {
          this._appData = appData;
        }
        get observer() {
          return this._observer;
        }
        /**
         * Close the Transport.
         */
        close() {
          if (this._closed) {
            return;
          }
          logger.debug("close()");
          this._closed = true;
          this._awaitQueue.stop();
          this._handler.close();
          this._connectionState = "closed";
          for (const producer of this._producers.values()) {
            producer.transportClosed();
          }
          this._producers.clear();
          for (const consumer of this._consumers.values()) {
            consumer.transportClosed();
          }
          this._consumers.clear();
          for (const dataProducer of this._dataProducers.values()) {
            dataProducer.transportClosed();
          }
          this._dataProducers.clear();
          for (const dataConsumer of this._dataConsumers.values()) {
            dataConsumer.transportClosed();
          }
          this._dataConsumers.clear();
          this._observer.safeEmit("close");
        }
        /**
         * Get associated Transport (RTCPeerConnection) stats.
         *
         * @returns {RTCStatsReport}
         */
        async getStats() {
          if (this._closed) {
            throw new errors_1.InvalidStateError("closed");
          }
          return this._handler.getTransportStats();
        }
        /**
         * Restart ICE connection.
         */
        async restartIce({ iceParameters }) {
          logger.debug("restartIce()");
          if (this._closed) {
            throw new errors_1.InvalidStateError("closed");
          } else if (!iceParameters) {
            throw new TypeError("missing iceParameters");
          }
          return this._awaitQueue.push(async () => await this._handler.restartIce(iceParameters), "transport.restartIce()");
        }
        /**
         * Update ICE servers.
         */
        async updateIceServers({ iceServers } = {}) {
          logger.debug("updateIceServers()");
          if (this._closed) {
            throw new errors_1.InvalidStateError("closed");
          } else if (!Array.isArray(iceServers)) {
            throw new TypeError("missing iceServers");
          }
          return this._awaitQueue.push(async () => this._handler.updateIceServers(iceServers), "transport.updateIceServers()");
        }
        /**
         * Create a Producer.
         */
        async produce({ track, encodings, codecOptions, codec, stopTracks = true, disableTrackOnPause = true, zeroRtpOnPause = false, onRtpSender, appData = {} } = {}) {
          logger.debug("produce() [track:%o]", track);
          if (this._closed) {
            throw new errors_1.InvalidStateError("closed");
          } else if (!track) {
            throw new TypeError("missing track");
          } else if (this._direction !== "send") {
            throw new errors_1.UnsupportedError("not a sending Transport");
          } else if (!this._canProduceByKind[track.kind]) {
            throw new errors_1.UnsupportedError(`cannot produce ${track.kind}`);
          } else if (track.readyState === "ended") {
            throw new errors_1.InvalidStateError("track ended");
          } else if (this.listenerCount("connect") === 0 && this._connectionState === "new") {
            throw new TypeError('no "connect" listener set into this transport');
          } else if (this.listenerCount("produce") === 0) {
            throw new TypeError('no "produce" listener set into this transport');
          } else if (appData && typeof appData !== "object") {
            throw new TypeError("if given, appData must be an object");
          }
          return this._awaitQueue.push(async () => {
            let normalizedEncodings;
            if (encodings && !Array.isArray(encodings)) {
              throw TypeError("encodings must be an array");
            } else if (encodings && encodings.length === 0) {
              normalizedEncodings = void 0;
            } else if (encodings) {
              normalizedEncodings = encodings.map((encoding) => {
                const normalizedEncoding = { active: true };
                if (encoding.active === false) {
                  normalizedEncoding.active = false;
                }
                if (typeof encoding.dtx === "boolean") {
                  normalizedEncoding.dtx = encoding.dtx;
                }
                if (typeof encoding.scalabilityMode === "string") {
                  normalizedEncoding.scalabilityMode = encoding.scalabilityMode;
                }
                if (typeof encoding.scaleResolutionDownBy === "number") {
                  normalizedEncoding.scaleResolutionDownBy = encoding.scaleResolutionDownBy;
                }
                if (typeof encoding.maxBitrate === "number") {
                  normalizedEncoding.maxBitrate = encoding.maxBitrate;
                }
                if (typeof encoding.maxFramerate === "number") {
                  normalizedEncoding.maxFramerate = encoding.maxFramerate;
                }
                if (typeof encoding.adaptivePtime === "boolean") {
                  normalizedEncoding.adaptivePtime = encoding.adaptivePtime;
                }
                if (typeof encoding.priority === "string") {
                  normalizedEncoding.priority = encoding.priority;
                }
                if (typeof encoding.networkPriority === "string") {
                  normalizedEncoding.networkPriority = encoding.networkPriority;
                }
                return normalizedEncoding;
              });
            }
            const { localId, rtpParameters, rtpSender } = await this._handler.send({
              track,
              encodings: normalizedEncodings,
              codecOptions,
              codec,
              onRtpSender
            });
            try {
              ortc.validateRtpParameters(rtpParameters);
              const { id } = await new Promise((resolve, reject) => {
                this.safeEmit("produce", {
                  kind: track.kind,
                  rtpParameters,
                  appData
                }, resolve, reject);
              });
              const producer = new Producer_1.Producer({
                id,
                localId,
                rtpSender,
                track,
                rtpParameters,
                stopTracks,
                disableTrackOnPause,
                zeroRtpOnPause,
                appData
              });
              this._producers.set(producer.id, producer);
              this.handleProducer(producer);
              this._observer.safeEmit("newproducer", producer);
              return producer;
            } catch (error) {
              this._handler.stopSending(localId).catch(() => {
              });
              throw error;
            }
          }, "transport.produce()").catch((error) => {
            if (stopTracks) {
              try {
                track.stop();
              } catch (error2) {
              }
            }
            throw error;
          });
        }
        /**
         * Create a Consumer to consume a remote Producer.
         */
        async consume({ id, producerId, kind, rtpParameters, streamId, onRtpReceiver, appData = {} }) {
          logger.debug("consume()");
          if (this._closed) {
            throw new errors_1.InvalidStateError("closed");
          } else if (this._direction !== "recv") {
            throw new errors_1.UnsupportedError("not a receiving Transport");
          } else if (typeof id !== "string") {
            throw new TypeError("missing id");
          } else if (typeof producerId !== "string") {
            throw new TypeError("missing producerId");
          } else if (kind !== "audio" && kind !== "video") {
            throw new TypeError(`invalid kind '${kind}'`);
          } else if (this.listenerCount("connect") === 0 && this._connectionState === "new") {
            throw new TypeError('no "connect" listener set into this transport');
          } else if (appData && typeof appData !== "object") {
            throw new TypeError("if given, appData must be an object");
          }
          const clonedRtpParameters = utils.clone(rtpParameters);
          const canConsume = ortc.canReceive(clonedRtpParameters, this._extendedRtpCapabilities);
          if (!canConsume) {
            throw new errors_1.UnsupportedError("cannot consume this Producer");
          }
          const consumerCreationTask = new ConsumerCreationTask({
            id,
            producerId,
            kind,
            rtpParameters: clonedRtpParameters,
            streamId,
            onRtpReceiver,
            appData
          });
          this._pendingConsumerTasks.push(consumerCreationTask);
          queueMicrotask(() => {
            if (this._closed) {
              return;
            }
            if (this._consumerCreationInProgress === false) {
              this.createPendingConsumers();
            }
          });
          return consumerCreationTask.promise;
        }
        /**
         * Create a DataProducer
         */
        async produceData({ ordered = true, maxPacketLifeTime, maxRetransmits, label = "", protocol: protocol4 = "", appData = {} } = {}) {
          logger.debug("produceData()");
          if (this._closed) {
            throw new errors_1.InvalidStateError("closed");
          } else if (this._direction !== "send") {
            throw new errors_1.UnsupportedError("not a sending Transport");
          } else if (!this._maxSctpMessageSize) {
            throw new errors_1.UnsupportedError("SCTP not enabled by remote Transport");
          } else if (this.listenerCount("connect") === 0 && this._connectionState === "new") {
            throw new TypeError('no "connect" listener set into this transport');
          } else if (this.listenerCount("producedata") === 0) {
            throw new TypeError('no "producedata" listener set into this transport');
          } else if (appData && typeof appData !== "object") {
            throw new TypeError("if given, appData must be an object");
          }
          if (maxPacketLifeTime || maxRetransmits) {
            ordered = false;
          }
          return this._awaitQueue.push(async () => {
            const { dataChannel, sctpStreamParameters } = await this._handler.sendDataChannel({
              ordered,
              maxPacketLifeTime,
              maxRetransmits,
              label,
              protocol: protocol4
            });
            ortc.validateSctpStreamParameters(sctpStreamParameters);
            const { id } = await new Promise((resolve, reject) => {
              this.safeEmit("producedata", {
                sctpStreamParameters,
                label,
                protocol: protocol4,
                appData
              }, resolve, reject);
            });
            const dataProducer = new DataProducer_1.DataProducer({
              id,
              dataChannel,
              sctpStreamParameters,
              appData
            });
            this._dataProducers.set(dataProducer.id, dataProducer);
            this.handleDataProducer(dataProducer);
            this._observer.safeEmit("newdataproducer", dataProducer);
            return dataProducer;
          }, "transport.produceData()");
        }
        /**
         * Create a DataConsumer
         */
        async consumeData({ id, dataProducerId, sctpStreamParameters, label = "", protocol: protocol4 = "", appData = {} }) {
          logger.debug("consumeData()");
          if (this._closed) {
            throw new errors_1.InvalidStateError("closed");
          } else if (this._direction !== "recv") {
            throw new errors_1.UnsupportedError("not a receiving Transport");
          } else if (!this._maxSctpMessageSize) {
            throw new errors_1.UnsupportedError("SCTP not enabled by remote Transport");
          } else if (typeof id !== "string") {
            throw new TypeError("missing id");
          } else if (typeof dataProducerId !== "string") {
            throw new TypeError("missing dataProducerId");
          } else if (this.listenerCount("connect") === 0 && this._connectionState === "new") {
            throw new TypeError('no "connect" listener set into this transport');
          } else if (appData && typeof appData !== "object") {
            throw new TypeError("if given, appData must be an object");
          }
          const clonedSctpStreamParameters = utils.clone(sctpStreamParameters);
          ortc.validateSctpStreamParameters(clonedSctpStreamParameters);
          return this._awaitQueue.push(async () => {
            const { dataChannel } = await this._handler.receiveDataChannel({
              sctpStreamParameters: clonedSctpStreamParameters,
              label,
              protocol: protocol4
            });
            const dataConsumer = new DataConsumer_1.DataConsumer({
              id,
              dataProducerId,
              dataChannel,
              sctpStreamParameters: clonedSctpStreamParameters,
              appData
            });
            this._dataConsumers.set(dataConsumer.id, dataConsumer);
            this.handleDataConsumer(dataConsumer);
            this._observer.safeEmit("newdataconsumer", dataConsumer);
            return dataConsumer;
          }, "transport.consumeData()");
        }
        // This method is guaranteed to never throw.
        createPendingConsumers() {
          this._consumerCreationInProgress = true;
          this._awaitQueue.push(async () => {
            if (this._pendingConsumerTasks.length === 0) {
              logger.debug("createPendingConsumers() | there is no Consumer to be created");
              return;
            }
            const pendingConsumerTasks = [...this._pendingConsumerTasks];
            this._pendingConsumerTasks = [];
            let videoConsumerForProbator = void 0;
            const optionsList = [];
            for (const task of pendingConsumerTasks) {
              const { id, kind, rtpParameters, streamId, onRtpReceiver } = task.consumerOptions;
              optionsList.push({
                trackId: id,
                kind,
                rtpParameters,
                streamId,
                onRtpReceiver
              });
            }
            try {
              const results = await this._handler.receive(optionsList);
              for (let idx = 0; idx < results.length; ++idx) {
                const task = pendingConsumerTasks[idx];
                const result = results[idx];
                const { id, producerId, kind, rtpParameters, appData } = task.consumerOptions;
                const { localId, rtpReceiver, track } = result;
                const consumer = new Consumer_1.Consumer({
                  id,
                  localId,
                  producerId,
                  rtpReceiver,
                  track,
                  rtpParameters,
                  appData
                });
                this._consumers.set(consumer.id, consumer);
                this.handleConsumer(consumer);
                if (!this._probatorConsumerCreated && !videoConsumerForProbator && kind === "video") {
                  videoConsumerForProbator = consumer;
                }
                this._observer.safeEmit("newconsumer", consumer);
                task.resolve(consumer);
              }
            } catch (error) {
              for (const task of pendingConsumerTasks) {
                task.reject(error);
              }
            }
            if (videoConsumerForProbator) {
              try {
                const probatorRtpParameters = ortc.generateProbatorRtpParameters(videoConsumerForProbator.rtpParameters);
                await this._handler.receive([
                  {
                    trackId: "probator",
                    kind: "video",
                    rtpParameters: probatorRtpParameters
                  }
                ]);
                logger.debug("createPendingConsumers() | Consumer for RTP probation created");
                this._probatorConsumerCreated = true;
              } catch (error) {
                logger.error("createPendingConsumers() | failed to create Consumer for RTP probation:%o", error);
              }
            }
          }, "transport.createPendingConsumers()").then(() => {
            this._consumerCreationInProgress = false;
            if (this._pendingConsumerTasks.length > 0) {
              this.createPendingConsumers();
            }
          }).catch(() => {
          });
        }
        pausePendingConsumers() {
          this._consumerPauseInProgress = true;
          this._awaitQueue.push(async () => {
            if (this._pendingPauseConsumers.size === 0) {
              logger.debug("pausePendingConsumers() | there is no Consumer to be paused");
              return;
            }
            const pendingPauseConsumers = Array.from(this._pendingPauseConsumers.values());
            this._pendingPauseConsumers.clear();
            try {
              const localIds = pendingPauseConsumers.map((consumer) => consumer.localId);
              await this._handler.pauseReceiving(localIds);
            } catch (error) {
              logger.error("pausePendingConsumers() | failed to pause Consumers:", error);
            }
          }, "transport.pausePendingConsumers").then(() => {
            this._consumerPauseInProgress = false;
            if (this._pendingPauseConsumers.size > 0) {
              this.pausePendingConsumers();
            }
          }).catch(() => {
          });
        }
        resumePendingConsumers() {
          this._consumerResumeInProgress = true;
          this._awaitQueue.push(async () => {
            if (this._pendingResumeConsumers.size === 0) {
              logger.debug("resumePendingConsumers() | there is no Consumer to be resumed");
              return;
            }
            const pendingResumeConsumers = Array.from(this._pendingResumeConsumers.values());
            this._pendingResumeConsumers.clear();
            try {
              const localIds = pendingResumeConsumers.map((consumer) => consumer.localId);
              await this._handler.resumeReceiving(localIds);
            } catch (error) {
              logger.error("resumePendingConsumers() | failed to resume Consumers:", error);
            }
          }, "transport.resumePendingConsumers").then(() => {
            this._consumerResumeInProgress = false;
            if (this._pendingResumeConsumers.size > 0) {
              this.resumePendingConsumers();
            }
          }).catch(() => {
          });
        }
        closePendingConsumers() {
          this._consumerCloseInProgress = true;
          this._awaitQueue.push(async () => {
            if (this._pendingCloseConsumers.size === 0) {
              logger.debug("closePendingConsumers() | there is no Consumer to be closed");
              return;
            }
            const pendingCloseConsumers = Array.from(this._pendingCloseConsumers.values());
            this._pendingCloseConsumers.clear();
            try {
              await this._handler.stopReceiving(pendingCloseConsumers.map((consumer) => consumer.localId));
            } catch (error) {
              logger.error("closePendingConsumers() | failed to close Consumers:", error);
            }
          }, "transport.closePendingConsumers").then(() => {
            this._consumerCloseInProgress = false;
            if (this._pendingCloseConsumers.size > 0) {
              this.closePendingConsumers();
            }
          }).catch(() => {
          });
        }
        handleHandler() {
          const handler = this._handler;
          handler.on("@connect", ({ dtlsParameters }, callback, errback) => {
            if (this._closed) {
              errback(new errors_1.InvalidStateError("closed"));
              return;
            }
            this.safeEmit("connect", { dtlsParameters }, callback, errback);
          });
          handler.on("@icegatheringstatechange", (iceGatheringState) => {
            if (iceGatheringState === this._iceGatheringState) {
              return;
            }
            logger.debug("ICE gathering state changed to %s", iceGatheringState);
            this._iceGatheringState = iceGatheringState;
            if (!this._closed) {
              this.safeEmit("icegatheringstatechange", iceGatheringState);
            }
          });
          handler.on("@icecandidateerror", (event) => {
            logger.warn(`ICE candidate error [url:${event.url}, localAddress:${event.address}, localPort:${event.port}]: ${event.errorCode} "${event.errorText}"`);
            this.safeEmit("icecandidateerror", event);
          });
          handler.on("@connectionstatechange", (connectionState) => {
            if (connectionState === this._connectionState) {
              return;
            }
            logger.debug("connection state changed to %s", connectionState);
            this._connectionState = connectionState;
            if (!this._closed) {
              this.safeEmit("connectionstatechange", connectionState);
            }
          });
        }
        handleProducer(producer) {
          producer.on("@close", () => {
            this._producers.delete(producer.id);
            if (this._closed) {
              return;
            }
            this._awaitQueue.push(async () => await this._handler.stopSending(producer.localId), "producer @close event").catch((error) => logger.warn("producer.close() failed:%o", error));
          });
          producer.on("@pause", (callback, errback) => {
            this._awaitQueue.push(async () => await this._handler.pauseSending(producer.localId), "producer @pause event").then(callback).catch(errback);
          });
          producer.on("@resume", (callback, errback) => {
            this._awaitQueue.push(async () => await this._handler.resumeSending(producer.localId), "producer @resume event").then(callback).catch(errback);
          });
          producer.on("@replacetrack", (track, callback, errback) => {
            this._awaitQueue.push(async () => await this._handler.replaceTrack(producer.localId, track), "producer @replacetrack event").then(callback).catch(errback);
          });
          producer.on("@setmaxspatiallayer", (spatialLayer, callback, errback) => {
            this._awaitQueue.push(async () => await this._handler.setMaxSpatialLayer(producer.localId, spatialLayer), "producer @setmaxspatiallayer event").then(callback).catch(errback);
          });
          producer.on("@setrtpencodingparameters", (params2, callback, errback) => {
            this._awaitQueue.push(async () => await this._handler.setRtpEncodingParameters(producer.localId, params2), "producer @setrtpencodingparameters event").then(callback).catch(errback);
          });
          producer.on("@getstats", (callback, errback) => {
            if (this._closed) {
              return errback(new errors_1.InvalidStateError("closed"));
            }
            this._handler.getSenderStats(producer.localId).then(callback).catch(errback);
          });
        }
        handleConsumer(consumer) {
          consumer.on("@close", () => {
            this._consumers.delete(consumer.id);
            this._pendingPauseConsumers.delete(consumer.id);
            this._pendingResumeConsumers.delete(consumer.id);
            if (this._closed) {
              return;
            }
            this._pendingCloseConsumers.set(consumer.id, consumer);
            if (this._consumerCloseInProgress === false) {
              this.closePendingConsumers();
            }
          });
          consumer.on("@pause", () => {
            if (this._pendingResumeConsumers.has(consumer.id)) {
              this._pendingResumeConsumers.delete(consumer.id);
            }
            this._pendingPauseConsumers.set(consumer.id, consumer);
            queueMicrotask(() => {
              if (this._closed) {
                return;
              }
              if (this._consumerPauseInProgress === false) {
                this.pausePendingConsumers();
              }
            });
          });
          consumer.on("@resume", () => {
            if (this._pendingPauseConsumers.has(consumer.id)) {
              this._pendingPauseConsumers.delete(consumer.id);
            }
            this._pendingResumeConsumers.set(consumer.id, consumer);
            queueMicrotask(() => {
              if (this._closed) {
                return;
              }
              if (this._consumerResumeInProgress === false) {
                this.resumePendingConsumers();
              }
            });
          });
          consumer.on("@getstats", (callback, errback) => {
            if (this._closed) {
              return errback(new errors_1.InvalidStateError("closed"));
            }
            this._handler.getReceiverStats(consumer.localId).then(callback).catch(errback);
          });
        }
        handleDataProducer(dataProducer) {
          dataProducer.on("@close", () => {
            this._dataProducers.delete(dataProducer.id);
          });
        }
        handleDataConsumer(dataConsumer) {
          dataConsumer.on("@close", () => {
            this._dataConsumers.delete(dataConsumer.id);
          });
        }
      };
      exports.Transport = Transport2;
    }
  });

  // node_modules/sdp-transform/lib/grammar.js
  var require_grammar = __commonJS({
    "node_modules/sdp-transform/lib/grammar.js"(exports, module) {
      var grammar = module.exports = {
        v: [{
          name: "version",
          reg: /^(\d*)$/
        }],
        o: [{
          // o=- 20518 0 IN IP4 203.0.113.1
          // NB: sessionId will be a String in most cases because it is huge
          name: "origin",
          reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
          names: ["username", "sessionId", "sessionVersion", "netType", "ipVer", "address"],
          format: "%s %s %d %s IP%d %s"
        }],
        // default parsing of these only (though some of these feel outdated)
        s: [{ name: "name" }],
        i: [{ name: "description" }],
        u: [{ name: "uri" }],
        e: [{ name: "email" }],
        p: [{ name: "phone" }],
        z: [{ name: "timezones" }],
        // TODO: this one can actually be parsed properly...
        r: [{ name: "repeats" }],
        // TODO: this one can also be parsed properly
        // k: [{}], // outdated thing ignored
        t: [{
          // t=0 0
          name: "timing",
          reg: /^(\d*) (\d*)/,
          names: ["start", "stop"],
          format: "%d %d"
        }],
        c: [{
          // c=IN IP4 10.47.197.26
          name: "connection",
          reg: /^IN IP(\d) (\S*)/,
          names: ["version", "ip"],
          format: "IN IP%d %s"
        }],
        b: [{
          // b=AS:4000
          push: "bandwidth",
          reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
          names: ["type", "limit"],
          format: "%s:%s"
        }],
        m: [{
          // m=video 51744 RTP/AVP 126 97 98 34 31
          // NB: special - pushes to session
          // TODO: rtp/fmtp should be filtered by the payloads found here?
          reg: /^(\w*) (\d*) ([\w/]*)(?: (.*))?/,
          names: ["type", "port", "protocol", "payloads"],
          format: "%s %d %s %s"
        }],
        a: [
          {
            // a=rtpmap:110 opus/48000/2
            push: "rtp",
            reg: /^rtpmap:(\d*) ([\w\-.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
            names: ["payload", "codec", "rate", "encoding"],
            format: function(o) {
              return o.encoding ? "rtpmap:%d %s/%s/%s" : o.rate ? "rtpmap:%d %s/%s" : "rtpmap:%d %s";
            }
          },
          {
            // a=fmtp:108 profile-level-id=24;object=23;bitrate=64000
            // a=fmtp:111 minptime=10; useinbandfec=1
            push: "fmtp",
            reg: /^fmtp:(\d*) ([\S| ]*)/,
            names: ["payload", "config"],
            format: "fmtp:%d %s"
          },
          {
            // a=control:streamid=0
            name: "control",
            reg: /^control:(.*)/,
            format: "control:%s"
          },
          {
            // a=rtcp:65179 IN IP4 193.84.77.194
            name: "rtcp",
            reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
            names: ["port", "netType", "ipVer", "address"],
            format: function(o) {
              return o.address != null ? "rtcp:%d %s IP%d %s" : "rtcp:%d";
            }
          },
          {
            // a=rtcp-fb:98 trr-int 100
            push: "rtcpFbTrrInt",
            reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
            names: ["payload", "value"],
            format: "rtcp-fb:%s trr-int %d"
          },
          {
            // a=rtcp-fb:98 nack rpsi
            push: "rtcpFb",
            reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
            names: ["payload", "type", "subtype"],
            format: function(o) {
              return o.subtype != null ? "rtcp-fb:%s %s %s" : "rtcp-fb:%s %s";
            }
          },
          {
            // a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
            // a=extmap:1/recvonly URI-gps-string
            // a=extmap:3 urn:ietf:params:rtp-hdrext:encrypt urn:ietf:params:rtp-hdrext:smpte-tc 25@600/24
            push: "ext",
            reg: /^extmap:(\d+)(?:\/(\w+))?(?: (urn:ietf:params:rtp-hdrext:encrypt))? (\S*)(?: (\S*))?/,
            names: ["value", "direction", "encrypt-uri", "uri", "config"],
            format: function(o) {
              return "extmap:%d" + (o.direction ? "/%s" : "%v") + (o["encrypt-uri"] ? " %s" : "%v") + " %s" + (o.config ? " %s" : "");
            }
          },
          {
            // a=extmap-allow-mixed
            name: "extmapAllowMixed",
            reg: /^(extmap-allow-mixed)/
          },
          {
            // a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:PS1uQCVeeCFCanVmcjkpPywjNWhcYD0mXXtxaVBR|2^20|1:32
            push: "crypto",
            reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
            names: ["id", "suite", "config", "sessionConfig"],
            format: function(o) {
              return o.sessionConfig != null ? "crypto:%d %s %s %s" : "crypto:%d %s %s";
            }
          },
          {
            // a=setup:actpass
            name: "setup",
            reg: /^setup:(\w*)/,
            format: "setup:%s"
          },
          {
            // a=connection:new
            name: "connectionType",
            reg: /^connection:(new|existing)/,
            format: "connection:%s"
          },
          {
            // a=mid:1
            name: "mid",
            reg: /^mid:([^\s]*)/,
            format: "mid:%s"
          },
          {
            // a=msid:0c8b064d-d807-43b4-b434-f92a889d8587 98178685-d409-46e0-8e16-7ef0db0db64a
            name: "msid",
            reg: /^msid:(.*)/,
            format: "msid:%s"
          },
          {
            // a=ptime:20
            name: "ptime",
            reg: /^ptime:(\d*(?:\.\d*)*)/,
            format: "ptime:%d"
          },
          {
            // a=maxptime:60
            name: "maxptime",
            reg: /^maxptime:(\d*(?:\.\d*)*)/,
            format: "maxptime:%d"
          },
          {
            // a=sendrecv
            name: "direction",
            reg: /^(sendrecv|recvonly|sendonly|inactive)/
          },
          {
            // a=ice-lite
            name: "icelite",
            reg: /^(ice-lite)/
          },
          {
            // a=ice-ufrag:F7gI
            name: "iceUfrag",
            reg: /^ice-ufrag:(\S*)/,
            format: "ice-ufrag:%s"
          },
          {
            // a=ice-pwd:x9cml/YzichV2+XlhiMu8g
            name: "icePwd",
            reg: /^ice-pwd:(\S*)/,
            format: "ice-pwd:%s"
          },
          {
            // a=fingerprint:SHA-1 00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33
            name: "fingerprint",
            reg: /^fingerprint:(\S*) (\S*)/,
            names: ["type", "hash"],
            format: "fingerprint:%s %s"
          },
          {
            // a=candidate:0 1 UDP 2113667327 203.0.113.1 54400 typ host
            // a=candidate:1162875081 1 udp 2113937151 192.168.34.75 60017 typ host generation 0 network-id 3 network-cost 10
            // a=candidate:3289912957 2 udp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 generation 0 network-id 3 network-cost 10
            // a=candidate:229815620 1 tcp 1518280447 192.168.150.19 60017 typ host tcptype active generation 0 network-id 3 network-cost 10
            // a=candidate:3289912957 2 tcp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 tcptype passive generation 0 network-id 3 network-cost 10
            push: "candidates",
            reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/,
            names: ["foundation", "component", "transport", "priority", "ip", "port", "type", "raddr", "rport", "tcptype", "generation", "network-id", "network-cost"],
            format: function(o) {
              var str = "candidate:%s %d %s %d %s %d typ %s";
              str += o.raddr != null ? " raddr %s rport %d" : "%v%v";
              str += o.tcptype != null ? " tcptype %s" : "%v";
              if (o.generation != null) {
                str += " generation %d";
              }
              str += o["network-id"] != null ? " network-id %d" : "%v";
              str += o["network-cost"] != null ? " network-cost %d" : "%v";
              return str;
            }
          },
          {
            // a=end-of-candidates (keep after the candidates line for readability)
            name: "endOfCandidates",
            reg: /^(end-of-candidates)/
          },
          {
            // a=remote-candidates:1 203.0.113.1 54400 2 203.0.113.1 54401 ...
            name: "remoteCandidates",
            reg: /^remote-candidates:(.*)/,
            format: "remote-candidates:%s"
          },
          {
            // a=ice-options:google-ice
            name: "iceOptions",
            reg: /^ice-options:(\S*)/,
            format: "ice-options:%s"
          },
          {
            // a=ssrc:2566107569 cname:t9YU8M1UxTF8Y1A1
            push: "ssrcs",
            reg: /^ssrc:(\d*) ([\w_-]*)(?::(.*))?/,
            names: ["id", "attribute", "value"],
            format: function(o) {
              var str = "ssrc:%d";
              if (o.attribute != null) {
                str += " %s";
                if (o.value != null) {
                  str += ":%s";
                }
              }
              return str;
            }
          },
          {
            // a=ssrc-group:FEC 1 2
            // a=ssrc-group:FEC-FR 3004364195 1080772241
            push: "ssrcGroups",
            // token-char = %x21 / %x23-27 / %x2A-2B / %x2D-2E / %x30-39 / %x41-5A / %x5E-7E
            reg: /^ssrc-group:([\x21\x23\x24\x25\x26\x27\x2A\x2B\x2D\x2E\w]*) (.*)/,
            names: ["semantics", "ssrcs"],
            format: "ssrc-group:%s %s"
          },
          {
            // a=msid-semantic: WMS Jvlam5X3SX1OP6pn20zWogvaKJz5Hjf9OnlV
            name: "msidSemantic",
            reg: /^msid-semantic:\s?(\w*) (\S*)/,
            names: ["semantic", "token"],
            format: "msid-semantic: %s %s"
            // space after ':' is not accidental
          },
          {
            // a=group:BUNDLE audio video
            push: "groups",
            reg: /^group:(\w*) (.*)/,
            names: ["type", "mids"],
            format: "group:%s %s"
          },
          {
            // a=rtcp-mux
            name: "rtcpMux",
            reg: /^(rtcp-mux)/
          },
          {
            // a=rtcp-rsize
            name: "rtcpRsize",
            reg: /^(rtcp-rsize)/
          },
          {
            // a=sctpmap:5000 webrtc-datachannel 1024
            name: "sctpmap",
            reg: /^sctpmap:([\w_/]*) (\S*)(?: (\S*))?/,
            names: ["sctpmapNumber", "app", "maxMessageSize"],
            format: function(o) {
              return o.maxMessageSize != null ? "sctpmap:%s %s %s" : "sctpmap:%s %s";
            }
          },
          {
            // a=x-google-flag:conference
            name: "xGoogleFlag",
            reg: /^x-google-flag:([^\s]*)/,
            format: "x-google-flag:%s"
          },
          {
            // a=rid:1 send max-width=1280;max-height=720;max-fps=30;depend=0
            push: "rids",
            reg: /^rid:([\d\w]+) (\w+)(?: ([\S| ]*))?/,
            names: ["id", "direction", "params"],
            format: function(o) {
              return o.params ? "rid:%s %s %s" : "rid:%s %s";
            }
          },
          {
            // a=imageattr:97 send [x=800,y=640,sar=1.1,q=0.6] [x=480,y=320] recv [x=330,y=250]
            // a=imageattr:* send [x=800,y=640] recv *
            // a=imageattr:100 recv [x=320,y=240]
            push: "imageattrs",
            reg: new RegExp(
              // a=imageattr:97
              "^imageattr:(\\d+|\\*)[\\s\\t]+(send|recv)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*)(?:[\\s\\t]+(recv|send)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*))?"
            ),
            names: ["pt", "dir1", "attrs1", "dir2", "attrs2"],
            format: function(o) {
              return "imageattr:%s %s %s" + (o.dir2 ? " %s %s" : "");
            }
          },
          {
            // a=simulcast:send 1,2,3;~4,~5 recv 6;~7,~8
            // a=simulcast:recv 1;4,5 send 6;7
            name: "simulcast",
            reg: new RegExp(
              // a=simulcast:
              "^simulcast:(send|recv) ([a-zA-Z0-9\\-_~;,]+)(?:\\s?(send|recv) ([a-zA-Z0-9\\-_~;,]+))?$"
            ),
            names: ["dir1", "list1", "dir2", "list2"],
            format: function(o) {
              return "simulcast:%s %s" + (o.dir2 ? " %s %s" : "");
            }
          },
          {
            // old simulcast draft 03 (implemented by Firefox)
            //   https://tools.ietf.org/html/draft-ietf-mmusic-sdp-simulcast-03
            // a=simulcast: recv pt=97;98 send pt=97
            // a=simulcast: send rid=5;6;7 paused=6,7
            name: "simulcast_03",
            reg: /^simulcast:[\s\t]+([\S+\s\t]+)$/,
            names: ["value"],
            format: "simulcast: %s"
          },
          {
            // a=framerate:25
            // a=framerate:29.97
            name: "framerate",
            reg: /^framerate:(\d+(?:$|\.\d+))/,
            format: "framerate:%s"
          },
          {
            // RFC4570
            // a=source-filter: incl IN IP4 239.5.2.31 10.1.15.5
            name: "sourceFilter",
            reg: /^source-filter: *(excl|incl) (\S*) (IP4|IP6|\*) (\S*) (.*)/,
            names: ["filterMode", "netType", "addressTypes", "destAddress", "srcList"],
            format: "source-filter: %s %s %s %s %s"
          },
          {
            // a=bundle-only
            name: "bundleOnly",
            reg: /^(bundle-only)/
          },
          {
            // a=label:1
            name: "label",
            reg: /^label:(.+)/,
            format: "label:%s"
          },
          {
            // RFC version 26 for SCTP over DTLS
            // https://tools.ietf.org/html/draft-ietf-mmusic-sctp-sdp-26#section-5
            name: "sctpPort",
            reg: /^sctp-port:(\d+)$/,
            format: "sctp-port:%s"
          },
          {
            // RFC version 26 for SCTP over DTLS
            // https://tools.ietf.org/html/draft-ietf-mmusic-sctp-sdp-26#section-6
            name: "maxMessageSize",
            reg: /^max-message-size:(\d+)$/,
            format: "max-message-size:%s"
          },
          {
            // RFC7273
            // a=ts-refclk:ptp=IEEE1588-2008:39-A7-94-FF-FE-07-CB-D0:37
            push: "tsRefClocks",
            reg: /^ts-refclk:([^\s=]*)(?:=(\S*))?/,
            names: ["clksrc", "clksrcExt"],
            format: function(o) {
              return "ts-refclk:%s" + (o.clksrcExt != null ? "=%s" : "");
            }
          },
          {
            // RFC7273
            // a=mediaclk:direct=963214424
            name: "mediaClk",
            reg: /^mediaclk:(?:id=(\S*))? *([^\s=]*)(?:=(\S*))?(?: *rate=(\d+)\/(\d+))?/,
            names: ["id", "mediaClockName", "mediaClockValue", "rateNumerator", "rateDenominator"],
            format: function(o) {
              var str = "mediaclk:";
              str += o.id != null ? "id=%s %s" : "%v%s";
              str += o.mediaClockValue != null ? "=%s" : "";
              str += o.rateNumerator != null ? " rate=%s" : "";
              str += o.rateDenominator != null ? "/%s" : "";
              return str;
            }
          },
          {
            // a=keywds:keywords
            name: "keywords",
            reg: /^keywds:(.+)$/,
            format: "keywds:%s"
          },
          {
            // a=content:main
            name: "content",
            reg: /^content:(.+)/,
            format: "content:%s"
          },
          // BFCP https://tools.ietf.org/html/rfc4583
          {
            // a=floorctrl:c-s
            name: "bfcpFloorCtrl",
            reg: /^floorctrl:(c-only|s-only|c-s)/,
            format: "floorctrl:%s"
          },
          {
            // a=confid:1
            name: "bfcpConfId",
            reg: /^confid:(\d+)/,
            format: "confid:%s"
          },
          {
            // a=userid:1
            name: "bfcpUserId",
            reg: /^userid:(\d+)/,
            format: "userid:%s"
          },
          {
            // a=floorid:1
            name: "bfcpFloorId",
            reg: /^floorid:(.+) (?:m-stream|mstrm):(.+)/,
            names: ["id", "mStream"],
            format: "floorid:%s mstrm:%s"
          },
          {
            // any a= that we don't understand is kept verbatim on media.invalid
            push: "invalid",
            names: ["value"]
          }
        ]
      };
      Object.keys(grammar).forEach(function(key) {
        var objs = grammar[key];
        objs.forEach(function(obj) {
          if (!obj.reg) {
            obj.reg = /(.*)/;
          }
          if (!obj.format) {
            obj.format = "%s";
          }
        });
      });
    }
  });

  // node_modules/sdp-transform/lib/parser.js
  var require_parser = __commonJS({
    "node_modules/sdp-transform/lib/parser.js"(exports) {
      var toIntIfInt = function(v) {
        return String(Number(v)) === v ? Number(v) : v;
      };
      var attachProperties = function(match, location2, names, rawName) {
        if (rawName && !names) {
          location2[rawName] = toIntIfInt(match[1]);
        } else {
          for (var i = 0; i < names.length; i += 1) {
            if (match[i + 1] != null) {
              location2[names[i]] = toIntIfInt(match[i + 1]);
            }
          }
        }
      };
      var parseReg = function(obj, location2, content) {
        var needsBlank = obj.name && obj.names;
        if (obj.push && !location2[obj.push]) {
          location2[obj.push] = [];
        } else if (needsBlank && !location2[obj.name]) {
          location2[obj.name] = {};
        }
        var keyLocation = obj.push ? {} : (
          // blank object that will be pushed
          needsBlank ? location2[obj.name] : location2
        );
        attachProperties(content.match(obj.reg), keyLocation, obj.names, obj.name);
        if (obj.push) {
          location2[obj.push].push(keyLocation);
        }
      };
      var grammar = require_grammar();
      var validLine = RegExp.prototype.test.bind(/^([a-z])=(.*)/);
      exports.parse = function(sdp) {
        var session = {}, media = [], location2 = session;
        sdp.split(/(\r\n|\r|\n)/).filter(validLine).forEach(function(l) {
          var type = l[0];
          var content = l.slice(2);
          if (type === "m") {
            media.push({ rtp: [], fmtp: [] });
            location2 = media[media.length - 1];
          }
          for (var j = 0; j < (grammar[type] || []).length; j += 1) {
            var obj = grammar[type][j];
            if (obj.reg.test(content)) {
              return parseReg(obj, location2, content);
            }
          }
        });
        session.media = media;
        return session;
      };
      var paramReducer = function(acc, expr) {
        var s = expr.split(/=(.+)/, 2);
        if (s.length === 2) {
          acc[s[0]] = toIntIfInt(s[1]);
        } else if (s.length === 1 && expr.length > 1) {
          acc[s[0]] = void 0;
        }
        return acc;
      };
      exports.parseParams = function(str) {
        return str.split(/;\s?/).reduce(paramReducer, {});
      };
      exports.parseFmtpConfig = exports.parseParams;
      exports.parsePayloads = function(str) {
        return str.toString().split(" ").map(Number);
      };
      exports.parseRemoteCandidates = function(str) {
        var candidates = [];
        var parts2 = str.split(" ").map(toIntIfInt);
        for (var i = 0; i < parts2.length; i += 3) {
          candidates.push({
            component: parts2[i],
            ip: parts2[i + 1],
            port: parts2[i + 2]
          });
        }
        return candidates;
      };
      exports.parseImageAttributes = function(str) {
        return str.split(" ").map(function(item) {
          return item.substring(1, item.length - 1).split(",").reduce(paramReducer, {});
        });
      };
      exports.parseSimulcastStreamList = function(str) {
        return str.split(";").map(function(stream) {
          return stream.split(",").map(function(format) {
            var scid, paused = false;
            if (format[0] !== "~") {
              scid = toIntIfInt(format);
            } else {
              scid = toIntIfInt(format.substring(1, format.length));
              paused = true;
            }
            return {
              scid,
              paused
            };
          });
        });
      };
    }
  });

  // node_modules/sdp-transform/lib/writer.js
  var require_writer = __commonJS({
    "node_modules/sdp-transform/lib/writer.js"(exports, module) {
      var grammar = require_grammar();
      var formatRegExp = /%[sdv%]/g;
      var format = function(formatStr) {
        var i = 1;
        var args = arguments;
        var len = args.length;
        return formatStr.replace(formatRegExp, function(x) {
          if (i >= len) {
            return x;
          }
          var arg = args[i];
          i += 1;
          switch (x) {
            case "%%":
              return "%";
            case "%s":
              return String(arg);
            case "%d":
              return Number(arg);
            case "%v":
              return "";
          }
        });
      };
      var makeLine = function(type, obj, location2) {
        var str = obj.format instanceof Function ? obj.format(obj.push ? location2 : location2[obj.name]) : obj.format;
        var args = [type + "=" + str];
        if (obj.names) {
          for (var i = 0; i < obj.names.length; i += 1) {
            var n = obj.names[i];
            if (obj.name) {
              args.push(location2[obj.name][n]);
            } else {
              args.push(location2[obj.names[i]]);
            }
          }
        } else {
          args.push(location2[obj.name]);
        }
        return format.apply(null, args);
      };
      var defaultOuterOrder = [
        "v",
        "o",
        "s",
        "i",
        "u",
        "e",
        "p",
        "c",
        "b",
        "t",
        "r",
        "z",
        "a"
      ];
      var defaultInnerOrder = ["i", "c", "b", "a"];
      module.exports = function(session, opts) {
        opts = opts || {};
        if (session.version == null) {
          session.version = 0;
        }
        if (session.name == null) {
          session.name = " ";
        }
        session.media.forEach(function(mLine) {
          if (mLine.payloads == null) {
            mLine.payloads = "";
          }
        });
        var outerOrder = opts.outerOrder || defaultOuterOrder;
        var innerOrder = opts.innerOrder || defaultInnerOrder;
        var sdp = [];
        outerOrder.forEach(function(type) {
          grammar[type].forEach(function(obj) {
            if (obj.name in session && session[obj.name] != null) {
              sdp.push(makeLine(type, obj, session));
            } else if (obj.push in session && session[obj.push] != null) {
              session[obj.push].forEach(function(el) {
                sdp.push(makeLine(type, obj, el));
              });
            }
          });
        });
        session.media.forEach(function(mLine) {
          sdp.push(makeLine("m", grammar.m[0], mLine));
          innerOrder.forEach(function(type) {
            grammar[type].forEach(function(obj) {
              if (obj.name in mLine && mLine[obj.name] != null) {
                sdp.push(makeLine(type, obj, mLine));
              } else if (obj.push in mLine && mLine[obj.push] != null) {
                mLine[obj.push].forEach(function(el) {
                  sdp.push(makeLine(type, obj, el));
                });
              }
            });
          });
        });
        return sdp.join("\r\n") + "\r\n";
      };
    }
  });

  // node_modules/sdp-transform/lib/index.js
  var require_lib3 = __commonJS({
    "node_modules/sdp-transform/lib/index.js"(exports) {
      var parser = require_parser();
      var writer = require_writer();
      var grammar = require_grammar();
      exports.grammar = grammar;
      exports.write = writer;
      exports.parse = parser.parse;
      exports.parseParams = parser.parseParams;
      exports.parseFmtpConfig = parser.parseFmtpConfig;
      exports.parsePayloads = parser.parsePayloads;
      exports.parseRemoteCandidates = parser.parseRemoteCandidates;
      exports.parseImageAttributes = parser.parseImageAttributes;
      exports.parseSimulcastStreamList = parser.parseSimulcastStreamList;
    }
  });

  // node_modules/mediasoup-client/lib/handlers/sdp/commonUtils.js
  var require_commonUtils = __commonJS({
    "node_modules/mediasoup-client/lib/handlers/sdp/commonUtils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.extractRtpCapabilities = extractRtpCapabilities;
      exports.extractDtlsParameters = extractDtlsParameters;
      exports.getCname = getCname;
      exports.applyCodecParameters = applyCodecParameters;
      var sdpTransform = require_lib3();
      function extractRtpCapabilities({ sdpObject }) {
        const codecsMap = /* @__PURE__ */ new Map();
        const headerExtensions = [];
        let gotAudio = false;
        let gotVideo = false;
        for (const m of sdpObject.media) {
          const kind = m.type;
          switch (kind) {
            case "audio": {
              if (gotAudio) {
                continue;
              }
              gotAudio = true;
              break;
            }
            case "video": {
              if (gotVideo) {
                continue;
              }
              gotVideo = true;
              break;
            }
            default: {
              continue;
            }
          }
          for (const rtp of m.rtp) {
            const codec = {
              kind,
              mimeType: `${kind}/${rtp.codec}`,
              preferredPayloadType: rtp.payload,
              clockRate: rtp.rate,
              channels: rtp.encoding,
              parameters: {},
              rtcpFeedback: []
            };
            codecsMap.set(codec.preferredPayloadType, codec);
          }
          for (const fmtp of m.fmtp ?? []) {
            const parameters = sdpTransform.parseParams(fmtp.config);
            const codec = codecsMap.get(fmtp.payload);
            if (!codec) {
              continue;
            }
            if (parameters?.hasOwnProperty("profile-level-id")) {
              parameters["profile-level-id"] = String(parameters["profile-level-id"]);
            }
            codec.parameters = parameters;
          }
          for (const fb of m.rtcpFb ?? []) {
            const feedback = {
              type: fb.type,
              parameter: fb.subtype
            };
            if (!feedback.parameter) {
              delete feedback.parameter;
            }
            if (fb.payload !== "*") {
              const codec = codecsMap.get(fb.payload);
              if (!codec) {
                continue;
              }
              codec.rtcpFeedback.push(feedback);
            } else {
              for (const codec of codecsMap.values()) {
                if (codec.kind === kind && !/.+\/rtx$/i.test(codec.mimeType)) {
                  codec.rtcpFeedback.push(feedback);
                }
              }
            }
          }
          for (const ext of m.ext ?? []) {
            if (ext["encrypt-uri"]) {
              continue;
            }
            const headerExtension = {
              kind,
              uri: ext.uri,
              preferredId: ext.value
            };
            headerExtensions.push(headerExtension);
          }
        }
        const rtpCapabilities2 = {
          codecs: Array.from(codecsMap.values()),
          headerExtensions
        };
        return rtpCapabilities2;
      }
      function extractDtlsParameters({ sdpObject }) {
        let setup = sdpObject.setup;
        let fingerprint = sdpObject.fingerprint;
        if (!setup || !fingerprint) {
          const mediaObject = (sdpObject.media ?? []).find((m) => m.port !== 0);
          if (mediaObject) {
            setup ??= mediaObject.setup;
            fingerprint ??= mediaObject.fingerprint;
          }
        }
        if (!setup) {
          throw new Error("no a=setup found at SDP session or media level");
        } else if (!fingerprint) {
          throw new Error("no a=fingerprint found at SDP session or media level");
        }
        let role;
        switch (setup) {
          case "active": {
            role = "client";
            break;
          }
          case "passive": {
            role = "server";
            break;
          }
          case "actpass": {
            role = "auto";
            break;
          }
        }
        const dtlsParameters = {
          role,
          fingerprints: [
            {
              algorithm: fingerprint.type,
              value: fingerprint.hash
            }
          ]
        };
        return dtlsParameters;
      }
      function getCname({ offerMediaObject }) {
        const ssrcCnameLine = (offerMediaObject.ssrcs ?? []).find((line) => line.attribute === "cname");
        if (!ssrcCnameLine) {
          return "";
        }
        return ssrcCnameLine.value;
      }
      function applyCodecParameters({ offerRtpParameters, answerMediaObject }) {
        for (const codec of offerRtpParameters.codecs) {
          const mimeType = codec.mimeType.toLowerCase();
          if (mimeType !== "audio/opus") {
            continue;
          }
          const rtp = (answerMediaObject.rtp ?? []).find((r) => r.payload === codec.payloadType);
          if (!rtp) {
            continue;
          }
          answerMediaObject.fmtp = answerMediaObject.fmtp ?? [];
          let fmtp = answerMediaObject.fmtp.find((f) => f.payload === codec.payloadType);
          if (!fmtp) {
            fmtp = { payload: codec.payloadType, config: "" };
            answerMediaObject.fmtp.push(fmtp);
          }
          const parameters = sdpTransform.parseParams(fmtp.config);
          switch (mimeType) {
            case "audio/opus": {
              const spropStereo = codec.parameters["sprop-stereo"];
              if (spropStereo !== void 0) {
                parameters["stereo"] = Number(spropStereo) ? 1 : 0;
              }
              break;
            }
          }
          fmtp.config = "";
          for (const key of Object.keys(parameters)) {
            if (fmtp.config) {
              fmtp.config += ";";
            }
            fmtp.config += `${key}=${parameters[key]}`;
          }
        }
      }
    }
  });

  // node_modules/mediasoup-client/lib/handlers/sdp/unifiedPlanUtils.js
  var require_unifiedPlanUtils = __commonJS({
    "node_modules/mediasoup-client/lib/handlers/sdp/unifiedPlanUtils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getRtpEncodings = getRtpEncodings;
      exports.addLegacySimulcast = addLegacySimulcast;
      function getRtpEncodings({ offerMediaObject }) {
        const ssrcs = /* @__PURE__ */ new Set();
        for (const line of offerMediaObject.ssrcs ?? []) {
          const ssrc = line.id;
          ssrcs.add(ssrc);
        }
        if (ssrcs.size === 0) {
          throw new Error("no a=ssrc lines found");
        }
        const ssrcToRtxSsrc = /* @__PURE__ */ new Map();
        for (const line of offerMediaObject.ssrcGroups ?? []) {
          if (line.semantics !== "FID") {
            continue;
          }
          let [ssrc, rtxSsrc] = line.ssrcs.split(/\s+/);
          ssrc = Number(ssrc);
          rtxSsrc = Number(rtxSsrc);
          if (ssrcs.has(ssrc)) {
            ssrcs.delete(ssrc);
            ssrcs.delete(rtxSsrc);
            ssrcToRtxSsrc.set(ssrc, rtxSsrc);
          }
        }
        for (const ssrc of ssrcs) {
          ssrcToRtxSsrc.set(ssrc, null);
        }
        const encodings = [];
        for (const [ssrc, rtxSsrc] of ssrcToRtxSsrc) {
          const encoding = { ssrc };
          if (rtxSsrc) {
            encoding.rtx = { ssrc: rtxSsrc };
          }
          encodings.push(encoding);
        }
        return encodings;
      }
      function addLegacySimulcast({ offerMediaObject, numStreams }) {
        if (numStreams <= 1) {
          throw new TypeError("numStreams must be greater than 1");
        }
        const ssrcMsidLine = (offerMediaObject.ssrcs ?? []).find((line) => line.attribute === "msid");
        if (!ssrcMsidLine) {
          throw new Error("a=ssrc line with msid information not found");
        }
        const [streamId, trackId] = ssrcMsidLine.value.split(" ");
        const firstSsrc = Number(ssrcMsidLine.id);
        let firstRtxSsrc;
        (offerMediaObject.ssrcGroups ?? []).some((line) => {
          if (line.semantics !== "FID") {
            return false;
          }
          const ssrcs2 = line.ssrcs.split(/\s+/);
          if (Number(ssrcs2[0]) === firstSsrc) {
            firstRtxSsrc = Number(ssrcs2[1]);
            return true;
          } else {
            return false;
          }
        });
        const ssrcCnameLine = offerMediaObject.ssrcs.find((line) => line.attribute === "cname");
        if (!ssrcCnameLine) {
          throw new Error("a=ssrc line with cname information not found");
        }
        const cname = ssrcCnameLine.value;
        const ssrcs = [];
        const rtxSsrcs = [];
        for (let i = 0; i < numStreams; ++i) {
          ssrcs.push(firstSsrc + i);
          if (firstRtxSsrc) {
            rtxSsrcs.push(firstRtxSsrc + i);
          }
        }
        offerMediaObject.ssrcGroups = [];
        offerMediaObject.ssrcs = [];
        offerMediaObject.ssrcGroups.push({
          semantics: "SIM",
          ssrcs: ssrcs.join(" ")
        });
        for (const ssrc of ssrcs) {
          offerMediaObject.ssrcs.push({
            id: ssrc,
            attribute: "cname",
            value: cname
          });
          offerMediaObject.ssrcs.push({
            id: ssrc,
            attribute: "msid",
            value: `${streamId} ${trackId}`
          });
        }
        for (let i = 0; i < rtxSsrcs.length; ++i) {
          const ssrc = ssrcs[i];
          const rtxSsrc = rtxSsrcs[i];
          offerMediaObject.ssrcs.push({
            id: rtxSsrc,
            attribute: "cname",
            value: cname
          });
          offerMediaObject.ssrcs.push({
            id: rtxSsrc,
            attribute: "msid",
            value: `${streamId} ${trackId}`
          });
          offerMediaObject.ssrcGroups.push({
            semantics: "FID",
            ssrcs: `${ssrc} ${rtxSsrc}`
          });
        }
      }
    }
  });

  // node_modules/mediasoup-client/lib/handlers/ortc/utils.js
  var require_utils2 = __commonJS({
    "node_modules/mediasoup-client/lib/handlers/ortc/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.addNackSupportForOpus = addNackSupportForOpus;
      function addNackSupportForOpus(rtpCapabilities2) {
        for (const codec of rtpCapabilities2.codecs ?? []) {
          if ((codec.mimeType.toLowerCase() === "audio/opus" || codec.mimeType.toLowerCase() === "audio/multiopus") && !codec.rtcpFeedback?.some((fb) => fb.type === "nack" && !fb.parameter)) {
            if (!codec.rtcpFeedback) {
              codec.rtcpFeedback = [];
            }
            codec.rtcpFeedback.push({ type: "nack" });
          }
        }
      }
    }
  });

  // node_modules/mediasoup-client/lib/handlers/HandlerInterface.js
  var require_HandlerInterface = __commonJS({
    "node_modules/mediasoup-client/lib/handlers/HandlerInterface.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.HandlerInterface = void 0;
      var enhancedEvents_1 = require_enhancedEvents();
      var HandlerInterface = class extends enhancedEvents_1.EnhancedEventEmitter {
        constructor() {
          super();
        }
      };
      exports.HandlerInterface = HandlerInterface;
    }
  });

  // node_modules/mediasoup-client/lib/handlers/sdp/MediaSection.js
  var require_MediaSection = __commonJS({
    "node_modules/mediasoup-client/lib/handlers/sdp/MediaSection.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.OfferMediaSection = exports.AnswerMediaSection = exports.MediaSection = void 0;
      var sdpTransform = require_lib3();
      var utils = require_utils();
      var MediaSection = class {
        // SDP media object.
        _mediaObject;
        // Whether this is Plan-B SDP.
        _planB;
        constructor({ iceParameters, iceCandidates, dtlsParameters, planB = false }) {
          this._mediaObject = {};
          this._planB = planB;
          if (iceParameters) {
            this.setIceParameters(iceParameters);
          }
          if (iceCandidates) {
            this._mediaObject.candidates = [];
            for (const candidate of iceCandidates) {
              const candidateObject = {};
              candidateObject.component = 1;
              candidateObject.foundation = candidate.foundation;
              candidateObject.ip = candidate.address ?? candidate.ip;
              candidateObject.port = candidate.port;
              candidateObject.priority = candidate.priority;
              candidateObject.transport = candidate.protocol;
              candidateObject.type = candidate.type;
              if (candidate.tcpType) {
                candidateObject.tcptype = candidate.tcpType;
              }
              this._mediaObject.candidates.push(candidateObject);
            }
            this._mediaObject.endOfCandidates = "end-of-candidates";
            this._mediaObject.iceOptions = "renomination";
          }
          if (dtlsParameters) {
            this.setDtlsRole(dtlsParameters.role);
          }
        }
        get mid() {
          return String(this._mediaObject.mid);
        }
        get closed() {
          return this._mediaObject.port === 0;
        }
        getObject() {
          return this._mediaObject;
        }
        setIceParameters(iceParameters) {
          this._mediaObject.iceUfrag = iceParameters.usernameFragment;
          this._mediaObject.icePwd = iceParameters.password;
        }
        pause() {
          this._mediaObject.direction = "inactive";
        }
        disable() {
          this.pause();
          delete this._mediaObject.ext;
          delete this._mediaObject.ssrcs;
          delete this._mediaObject.ssrcGroups;
          delete this._mediaObject.simulcast;
          delete this._mediaObject.simulcast_03;
          delete this._mediaObject.rids;
          delete this._mediaObject.extmapAllowMixed;
        }
        close() {
          this.disable();
          this._mediaObject.port = 0;
        }
      };
      exports.MediaSection = MediaSection;
      var AnswerMediaSection = class extends MediaSection {
        constructor({ iceParameters, iceCandidates, dtlsParameters, sctpParameters, plainRtpParameters, planB = false, offerMediaObject, offerRtpParameters, answerRtpParameters, codecOptions }) {
          super({ iceParameters, iceCandidates, dtlsParameters, planB });
          this._mediaObject.mid = String(offerMediaObject.mid);
          this._mediaObject.type = offerMediaObject.type;
          this._mediaObject.protocol = offerMediaObject.protocol;
          if (!plainRtpParameters) {
            this._mediaObject.connection = { ip: "127.0.0.1", version: 4 };
            this._mediaObject.port = 7;
          } else {
            this._mediaObject.connection = {
              ip: plainRtpParameters.ip,
              version: plainRtpParameters.ipVersion
            };
            this._mediaObject.port = plainRtpParameters.port;
          }
          switch (offerMediaObject.type) {
            case "audio":
            case "video": {
              this._mediaObject.direction = "recvonly";
              this._mediaObject.rtp = [];
              this._mediaObject.rtcpFb = [];
              this._mediaObject.fmtp = [];
              for (const codec of answerRtpParameters.codecs) {
                const rtp = {
                  payload: codec.payloadType,
                  codec: getCodecName(codec),
                  rate: codec.clockRate
                };
                if (codec.channels > 1) {
                  rtp.encoding = codec.channels;
                }
                this._mediaObject.rtp.push(rtp);
                const codecParameters = utils.clone(codec.parameters) ?? {};
                let codecRtcpFeedback = utils.clone(codec.rtcpFeedback) ?? [];
                if (codecOptions) {
                  const { opusStereo, opusFec, opusDtx, opusMaxPlaybackRate, opusMaxAverageBitrate, opusPtime, opusNack, videoGoogleStartBitrate, videoGoogleMaxBitrate, videoGoogleMinBitrate } = codecOptions;
                  const offerCodec = offerRtpParameters.codecs.find((c) => c.payloadType === codec.payloadType);
                  switch (codec.mimeType.toLowerCase()) {
                    case "audio/opus":
                    case "audio/multiopus": {
                      if (opusStereo !== void 0) {
                        offerCodec.parameters["sprop-stereo"] = opusStereo ? 1 : 0;
                        codecParameters.stereo = opusStereo ? 1 : 0;
                      }
                      if (opusFec !== void 0) {
                        offerCodec.parameters.useinbandfec = opusFec ? 1 : 0;
                        codecParameters.useinbandfec = opusFec ? 1 : 0;
                      }
                      if (opusDtx !== void 0) {
                        offerCodec.parameters.usedtx = opusDtx ? 1 : 0;
                        codecParameters.usedtx = opusDtx ? 1 : 0;
                      }
                      if (opusMaxPlaybackRate !== void 0) {
                        codecParameters.maxplaybackrate = opusMaxPlaybackRate;
                      }
                      if (opusMaxAverageBitrate !== void 0) {
                        codecParameters.maxaveragebitrate = opusMaxAverageBitrate;
                      }
                      if (opusPtime !== void 0) {
                        offerCodec.parameters.ptime = opusPtime;
                        codecParameters.ptime = opusPtime;
                      }
                      if (!opusNack) {
                        offerCodec.rtcpFeedback = offerCodec.rtcpFeedback.filter((fb) => fb.type !== "nack" || fb.parameter);
                        codecRtcpFeedback = codecRtcpFeedback.filter((fb) => fb.type !== "nack" || fb.parameter);
                      }
                      break;
                    }
                    case "video/vp8":
                    case "video/vp9":
                    case "video/h264":
                    case "video/h265":
                    case "video/av1": {
                      if (videoGoogleStartBitrate !== void 0) {
                        codecParameters["x-google-start-bitrate"] = videoGoogleStartBitrate;
                      }
                      if (videoGoogleMaxBitrate !== void 0) {
                        codecParameters["x-google-max-bitrate"] = videoGoogleMaxBitrate;
                      }
                      if (videoGoogleMinBitrate !== void 0) {
                        codecParameters["x-google-min-bitrate"] = videoGoogleMinBitrate;
                      }
                      break;
                    }
                  }
                }
                const fmtp = {
                  payload: codec.payloadType,
                  config: ""
                };
                for (const key of Object.keys(codecParameters)) {
                  if (fmtp.config) {
                    fmtp.config += ";";
                  }
                  fmtp.config += `${key}=${codecParameters[key]}`;
                }
                if (fmtp.config) {
                  this._mediaObject.fmtp.push(fmtp);
                }
                for (const fb of codecRtcpFeedback) {
                  this._mediaObject.rtcpFb.push({
                    payload: codec.payloadType,
                    type: fb.type,
                    subtype: fb.parameter
                  });
                }
              }
              this._mediaObject.payloads = answerRtpParameters.codecs.map((codec) => codec.payloadType).join(" ");
              this._mediaObject.ext = [];
              for (const ext of answerRtpParameters.headerExtensions) {
                const found = (offerMediaObject.ext ?? []).some((localExt) => localExt.uri === ext.uri);
                if (!found) {
                  continue;
                }
                this._mediaObject.ext.push({
                  uri: ext.uri,
                  value: ext.id
                });
              }
              if (offerMediaObject.extmapAllowMixed === "extmap-allow-mixed") {
                this._mediaObject.extmapAllowMixed = "extmap-allow-mixed";
              }
              if (offerMediaObject.simulcast) {
                this._mediaObject.simulcast = {
                  dir1: "recv",
                  list1: offerMediaObject.simulcast.list1
                };
                this._mediaObject.rids = [];
                for (const rid of offerMediaObject.rids ?? []) {
                  if (rid.direction !== "send") {
                    continue;
                  }
                  this._mediaObject.rids.push({
                    id: rid.id,
                    direction: "recv"
                  });
                }
              } else if (offerMediaObject.simulcast_03) {
                this._mediaObject.simulcast_03 = {
                  value: offerMediaObject.simulcast_03.value.replace(/send/g, "recv")
                };
                this._mediaObject.rids = [];
                for (const rid of offerMediaObject.rids ?? []) {
                  if (rid.direction !== "send") {
                    continue;
                  }
                  this._mediaObject.rids.push({
                    id: rid.id,
                    direction: "recv"
                  });
                }
              }
              this._mediaObject.rtcpMux = "rtcp-mux";
              this._mediaObject.rtcpRsize = "rtcp-rsize";
              if (this._planB && this._mediaObject.type === "video") {
                this._mediaObject.xGoogleFlag = "conference";
              }
              break;
            }
            case "application": {
              if (typeof offerMediaObject.sctpPort === "number") {
                this._mediaObject.payloads = "webrtc-datachannel";
                this._mediaObject.sctpPort = sctpParameters.port;
                this._mediaObject.maxMessageSize = sctpParameters.maxMessageSize;
              } else if (offerMediaObject.sctpmap) {
                this._mediaObject.payloads = sctpParameters.port;
                this._mediaObject.sctpmap = {
                  app: "webrtc-datachannel",
                  sctpmapNumber: sctpParameters.port,
                  maxMessageSize: sctpParameters.maxMessageSize
                };
              }
              break;
            }
          }
        }
        setDtlsRole(role) {
          switch (role) {
            case "client": {
              this._mediaObject.setup = "active";
              break;
            }
            case "server": {
              this._mediaObject.setup = "passive";
              break;
            }
            case "auto": {
              this._mediaObject.setup = "actpass";
              break;
            }
          }
        }
        resume() {
          this._mediaObject.direction = "recvonly";
        }
        muxSimulcastStreams(encodings) {
          if (!this._mediaObject.simulcast?.list1) {
            return;
          }
          const layers = {};
          for (const encoding of encodings) {
            if (encoding.rid) {
              layers[encoding.rid] = encoding;
            }
          }
          const raw = this._mediaObject.simulcast.list1;
          const simulcastStreams = sdpTransform.parseSimulcastStreamList(raw);
          for (const simulcastStream of simulcastStreams) {
            for (const simulcastFormat of simulcastStream) {
              simulcastFormat.paused = !layers[simulcastFormat.scid]?.active;
            }
          }
          this._mediaObject.simulcast.list1 = simulcastStreams.map((simulcastFormats) => simulcastFormats.map((f) => `${f.paused ? "~" : ""}${f.scid}`).join(",")).join(";");
        }
      };
      exports.AnswerMediaSection = AnswerMediaSection;
      var OfferMediaSection = class extends MediaSection {
        constructor({ iceParameters, iceCandidates, dtlsParameters, sctpParameters, plainRtpParameters, planB = false, mid, kind, offerRtpParameters, streamId, trackId, oldDataChannelSpec = false }) {
          super({ iceParameters, iceCandidates, dtlsParameters, planB });
          this._mediaObject.mid = String(mid);
          this._mediaObject.type = kind;
          if (!plainRtpParameters) {
            this._mediaObject.connection = { ip: "127.0.0.1", version: 4 };
            if (!sctpParameters) {
              this._mediaObject.protocol = "UDP/TLS/RTP/SAVPF";
            } else {
              this._mediaObject.protocol = "UDP/DTLS/SCTP";
            }
            this._mediaObject.port = 7;
          } else {
            this._mediaObject.connection = {
              ip: plainRtpParameters.ip,
              version: plainRtpParameters.ipVersion
            };
            this._mediaObject.protocol = "RTP/AVP";
            this._mediaObject.port = plainRtpParameters.port;
          }
          this._mediaObject.extmapAllowMixed = "extmap-allow-mixed";
          switch (kind) {
            case "audio":
            case "video": {
              this._mediaObject.direction = "sendonly";
              this._mediaObject.rtp = [];
              this._mediaObject.rtcpFb = [];
              this._mediaObject.fmtp = [];
              if (!this._planB) {
                this._mediaObject.msid = `${streamId ?? "-"} ${trackId}`;
              }
              for (const codec of offerRtpParameters.codecs) {
                const rtp = {
                  payload: codec.payloadType,
                  codec: getCodecName(codec),
                  rate: codec.clockRate
                };
                if (codec.channels > 1) {
                  rtp.encoding = codec.channels;
                }
                this._mediaObject.rtp.push(rtp);
                const fmtp = {
                  payload: codec.payloadType,
                  config: ""
                };
                for (const key of Object.keys(codec.parameters)) {
                  if (fmtp.config) {
                    fmtp.config += ";";
                  }
                  fmtp.config += `${key}=${codec.parameters[key]}`;
                }
                if (fmtp.config) {
                  this._mediaObject.fmtp.push(fmtp);
                }
                for (const fb of codec.rtcpFeedback) {
                  this._mediaObject.rtcpFb.push({
                    payload: codec.payloadType,
                    type: fb.type,
                    subtype: fb.parameter
                  });
                }
              }
              this._mediaObject.payloads = offerRtpParameters.codecs.map((codec) => codec.payloadType).join(" ");
              this._mediaObject.ext = [];
              for (const ext of offerRtpParameters.headerExtensions) {
                this._mediaObject.ext.push({
                  uri: ext.uri,
                  value: ext.id
                });
              }
              this._mediaObject.rtcpMux = "rtcp-mux";
              this._mediaObject.rtcpRsize = "rtcp-rsize";
              const encoding = offerRtpParameters.encodings[0];
              const ssrc = encoding.ssrc;
              const rtxSsrc = encoding.rtx?.ssrc;
              this._mediaObject.ssrcs = [];
              this._mediaObject.ssrcGroups = [];
              if (offerRtpParameters.rtcp.cname) {
                this._mediaObject.ssrcs.push({
                  id: ssrc,
                  attribute: "cname",
                  value: offerRtpParameters.rtcp.cname
                });
              }
              if (this._planB) {
                this._mediaObject.ssrcs.push({
                  id: ssrc,
                  attribute: "msid",
                  value: `${streamId ?? "-"} ${trackId}`
                });
              }
              if (rtxSsrc) {
                if (offerRtpParameters.rtcp.cname) {
                  this._mediaObject.ssrcs.push({
                    id: rtxSsrc,
                    attribute: "cname",
                    value: offerRtpParameters.rtcp.cname
                  });
                }
                if (this._planB) {
                  this._mediaObject.ssrcs.push({
                    id: rtxSsrc,
                    attribute: "msid",
                    value: `${streamId ?? "-"} ${trackId}`
                  });
                }
                this._mediaObject.ssrcGroups.push({
                  semantics: "FID",
                  ssrcs: `${ssrc} ${rtxSsrc}`
                });
              }
              break;
            }
            case "application": {
              if (!oldDataChannelSpec) {
                this._mediaObject.payloads = "webrtc-datachannel";
                this._mediaObject.sctpPort = sctpParameters.port;
                this._mediaObject.maxMessageSize = sctpParameters.maxMessageSize;
              } else {
                this._mediaObject.payloads = sctpParameters.port;
                this._mediaObject.sctpmap = {
                  app: "webrtc-datachannel",
                  sctpmapNumber: sctpParameters.port,
                  maxMessageSize: sctpParameters.maxMessageSize
                };
              }
              break;
            }
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setDtlsRole(role) {
          this._mediaObject.setup = "actpass";
        }
        resume() {
          this._mediaObject.direction = "sendonly";
        }
        planBReceive({ offerRtpParameters, streamId, trackId }) {
          const encoding = offerRtpParameters.encodings[0];
          const ssrc = encoding.ssrc;
          const rtxSsrc = encoding.rtx?.ssrc;
          const payloads = this._mediaObject.payloads.split(" ");
          for (const codec of offerRtpParameters.codecs) {
            if (payloads.includes(String(codec.payloadType))) {
              continue;
            }
            const rtp = {
              payload: codec.payloadType,
              codec: getCodecName(codec),
              rate: codec.clockRate
            };
            if (codec.channels > 1) {
              rtp.encoding = codec.channels;
            }
            this._mediaObject.rtp.push(rtp);
            const fmtp = {
              payload: codec.payloadType,
              config: ""
            };
            for (const key of Object.keys(codec.parameters)) {
              if (fmtp.config) {
                fmtp.config += ";";
              }
              fmtp.config += `${key}=${codec.parameters[key]}`;
            }
            if (fmtp.config) {
              this._mediaObject.fmtp.push(fmtp);
            }
            for (const fb of codec.rtcpFeedback) {
              this._mediaObject.rtcpFb.push({
                payload: codec.payloadType,
                type: fb.type,
                subtype: fb.parameter
              });
            }
          }
          this._mediaObject.payloads += ` ${offerRtpParameters.codecs.filter((codec) => !this._mediaObject.payloads.includes(codec.payloadType)).map((codec) => codec.payloadType).join(" ")}`;
          this._mediaObject.payloads = this._mediaObject.payloads.trim();
          if (offerRtpParameters.rtcp.cname) {
            this._mediaObject.ssrcs.push({
              id: ssrc,
              attribute: "cname",
              value: offerRtpParameters.rtcp.cname
            });
          }
          this._mediaObject.ssrcs.push({
            id: ssrc,
            attribute: "msid",
            value: `${streamId ?? "-"} ${trackId}`
          });
          if (rtxSsrc) {
            if (offerRtpParameters.rtcp.cname) {
              this._mediaObject.ssrcs.push({
                id: rtxSsrc,
                attribute: "cname",
                value: offerRtpParameters.rtcp.cname
              });
            }
            this._mediaObject.ssrcs.push({
              id: rtxSsrc,
              attribute: "msid",
              value: `${streamId ?? "-"} ${trackId}`
            });
            this._mediaObject.ssrcGroups.push({
              semantics: "FID",
              ssrcs: `${ssrc} ${rtxSsrc}`
            });
          }
        }
        planBStopReceiving({ offerRtpParameters }) {
          const encoding = offerRtpParameters.encodings[0];
          const ssrc = encoding.ssrc;
          const rtxSsrc = encoding.rtx?.ssrc;
          this._mediaObject.ssrcs = this._mediaObject.ssrcs.filter((s) => s.id !== ssrc && s.id !== rtxSsrc);
          if (rtxSsrc) {
            this._mediaObject.ssrcGroups = this._mediaObject.ssrcGroups.filter((group) => group.ssrcs !== `${ssrc} ${rtxSsrc}`);
          }
        }
      };
      exports.OfferMediaSection = OfferMediaSection;
      function getCodecName(codec) {
        const MimeTypeRegex = new RegExp("^(audio|video)/(.+)", "i");
        const mimeTypeMatch = MimeTypeRegex.exec(codec.mimeType);
        if (!mimeTypeMatch) {
          throw new TypeError("invalid codec.mimeType");
        }
        return mimeTypeMatch[2];
      }
    }
  });

  // node_modules/mediasoup-client/lib/handlers/sdp/RemoteSdp.js
  var require_RemoteSdp = __commonJS({
    "node_modules/mediasoup-client/lib/handlers/sdp/RemoteSdp.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.RemoteSdp = void 0;
      var sdpTransform = require_lib3();
      var Logger_1 = require_Logger();
      var MediaSection_1 = require_MediaSection();
      var DD_CODECS = ["av1", "h264"];
      var logger = new Logger_1.Logger("RemoteSdp");
      var RemoteSdp = class {
        // Remote ICE parameters.
        _iceParameters;
        // Remote ICE candidates.
        _iceCandidates;
        // Remote DTLS parameters.
        _dtlsParameters;
        // Remote SCTP parameters.
        _sctpParameters;
        // Parameters for plain RTP (no SRTP nor DTLS no BUNDLE).
        _plainRtpParameters;
        // Whether this is Plan-B SDP.
        _planB;
        // MediaSection instances with same order as in the SDP.
        _mediaSections = [];
        // MediaSection indices indexed by MID.
        _midToIndex = /* @__PURE__ */ new Map();
        // First MID.
        _firstMid;
        // SDP object.
        _sdpObject;
        constructor({ iceParameters, iceCandidates, dtlsParameters, sctpParameters, plainRtpParameters, planB = false }) {
          this._iceParameters = iceParameters;
          this._iceCandidates = iceCandidates;
          this._dtlsParameters = dtlsParameters;
          this._sctpParameters = sctpParameters;
          this._plainRtpParameters = plainRtpParameters;
          this._planB = planB;
          this._sdpObject = {
            version: 0,
            origin: {
              address: "0.0.0.0",
              ipVer: 4,
              netType: "IN",
              sessionId: 1e4,
              sessionVersion: 0,
              username: "mediasoup-client"
            },
            name: "-",
            timing: { start: 0, stop: 0 },
            media: []
          };
          if (iceParameters?.iceLite) {
            this._sdpObject.icelite = "ice-lite";
          }
          if (dtlsParameters) {
            this._sdpObject.msidSemantic = { semantic: "WMS", token: "*" };
            const numFingerprints = this._dtlsParameters.fingerprints.length;
            this._sdpObject.fingerprint = {
              type: dtlsParameters.fingerprints[numFingerprints - 1].algorithm,
              hash: dtlsParameters.fingerprints[numFingerprints - 1].value
            };
            this._sdpObject.groups = [{ type: "BUNDLE", mids: "" }];
          }
          if (plainRtpParameters) {
            this._sdpObject.origin.address = plainRtpParameters.ip;
            this._sdpObject.origin.ipVer = plainRtpParameters.ipVersion;
          }
        }
        updateIceParameters(iceParameters) {
          logger.debug("updateIceParameters() [iceParameters:%o]", iceParameters);
          this._iceParameters = iceParameters;
          this._sdpObject.icelite = iceParameters.iceLite ? "ice-lite" : void 0;
          for (const mediaSection of this._mediaSections) {
            mediaSection.setIceParameters(iceParameters);
          }
        }
        updateDtlsRole(role) {
          logger.debug("updateDtlsRole() [role:%s]", role);
          this._dtlsParameters.role = role;
          for (const mediaSection of this._mediaSections) {
            mediaSection.setDtlsRole(role);
          }
        }
        /**
         * Set session level a=extmap-allow-mixed attibute.
         */
        setSessionExtmapAllowMixed() {
          logger.debug("setSessionExtmapAllowMixed()");
          this._sdpObject.extmapAllowMixed = "extmap-allow-mixed";
        }
        getNextMediaSectionIdx() {
          for (let idx = 0; idx < this._mediaSections.length; ++idx) {
            const mediaSection = this._mediaSections[idx];
            if (mediaSection.closed) {
              return { idx, reuseMid: mediaSection.mid };
            }
          }
          return { idx: this._mediaSections.length };
        }
        send({ offerMediaObject, reuseMid, offerRtpParameters, answerRtpParameters, codecOptions }) {
          const mediaSection = new MediaSection_1.AnswerMediaSection({
            iceParameters: this._iceParameters,
            iceCandidates: this._iceCandidates,
            dtlsParameters: this._dtlsParameters,
            plainRtpParameters: this._plainRtpParameters,
            planB: this._planB,
            offerMediaObject,
            offerRtpParameters,
            answerRtpParameters,
            codecOptions
          });
          const mediaObject = mediaSection.getObject();
          const ddCodec = mediaObject.rtp.find((rtp) => DD_CODECS.includes(rtp.codec.toLowerCase()));
          if (!ddCodec) {
            mediaObject.ext = mediaObject.ext.filter((extmap) => extmap.uri !== "https://aomediacodec.github.io/av1-rtp-spec/#dependency-descriptor-rtp-header-extension");
          }
          if (reuseMid) {
            this._replaceMediaSection(mediaSection, reuseMid);
          } else if (!this._midToIndex.has(mediaSection.mid)) {
            this._addMediaSection(mediaSection);
          } else {
            this._replaceMediaSection(mediaSection);
          }
        }
        receive({ mid, kind, offerRtpParameters, streamId, trackId }) {
          const idx = this._midToIndex.get(mid);
          let mediaSection;
          if (idx !== void 0) {
            mediaSection = this._mediaSections[idx];
          }
          this.setSessionExtmapAllowMixed();
          if (!mediaSection) {
            mediaSection = new MediaSection_1.OfferMediaSection({
              iceParameters: this._iceParameters,
              iceCandidates: this._iceCandidates,
              dtlsParameters: this._dtlsParameters,
              plainRtpParameters: this._plainRtpParameters,
              planB: this._planB,
              mid,
              kind,
              offerRtpParameters,
              streamId,
              trackId
            });
            const oldMediaSection = this._mediaSections.find((m) => m.closed);
            if (oldMediaSection) {
              this._replaceMediaSection(mediaSection, oldMediaSection.mid);
            } else {
              this._addMediaSection(mediaSection);
            }
          } else {
            mediaSection.planBReceive({ offerRtpParameters, streamId, trackId });
            this._replaceMediaSection(mediaSection);
          }
        }
        pauseMediaSection(mid) {
          const mediaSection = this._findMediaSection(mid);
          mediaSection.pause();
        }
        resumeSendingMediaSection(mid) {
          const mediaSection = this._findMediaSection(mid);
          mediaSection.resume();
        }
        resumeReceivingMediaSection(mid) {
          const mediaSection = this._findMediaSection(mid);
          mediaSection.resume();
        }
        disableMediaSection(mid) {
          const mediaSection = this._findMediaSection(mid);
          mediaSection.disable();
        }
        /**
         * Closes media section. Returns true if the given MID corresponds to a m
         * section that has been indeed closed. False otherwise.
         *
         * NOTE: Closing the first m section is a pain since it invalidates the bundled
         * transport, so instead closing it we just disable it.
         */
        closeMediaSection(mid) {
          const mediaSection = this._findMediaSection(mid);
          if (mid === this._firstMid) {
            logger.debug("closeMediaSection() | cannot close first media section, disabling it instead [mid:%s]", mid);
            this.disableMediaSection(mid);
            return false;
          }
          mediaSection.close();
          this._regenerateBundleMids();
          return true;
        }
        muxMediaSectionSimulcast(mid, encodings) {
          const mediaSection = this._findMediaSection(mid);
          mediaSection.muxSimulcastStreams(encodings);
          this._replaceMediaSection(mediaSection);
        }
        planBStopReceiving({ mid, offerRtpParameters }) {
          const mediaSection = this._findMediaSection(mid);
          mediaSection.planBStopReceiving({ offerRtpParameters });
          this._replaceMediaSection(mediaSection);
        }
        sendSctpAssociation({ offerMediaObject }) {
          const mediaSection = new MediaSection_1.AnswerMediaSection({
            iceParameters: this._iceParameters,
            iceCandidates: this._iceCandidates,
            dtlsParameters: this._dtlsParameters,
            sctpParameters: this._sctpParameters,
            plainRtpParameters: this._plainRtpParameters,
            offerMediaObject
          });
          this._addMediaSection(mediaSection);
        }
        receiveSctpAssociation({ oldDataChannelSpec = false } = {}) {
          const mediaSection = new MediaSection_1.OfferMediaSection({
            iceParameters: this._iceParameters,
            iceCandidates: this._iceCandidates,
            dtlsParameters: this._dtlsParameters,
            sctpParameters: this._sctpParameters,
            plainRtpParameters: this._plainRtpParameters,
            mid: "datachannel",
            kind: "application",
            oldDataChannelSpec
          });
          this._addMediaSection(mediaSection);
        }
        getSdp() {
          this._sdpObject.origin.sessionVersion++;
          return sdpTransform.write(this._sdpObject);
        }
        _addMediaSection(newMediaSection) {
          if (!this._firstMid) {
            this._firstMid = newMediaSection.mid;
          }
          this._mediaSections.push(newMediaSection);
          this._midToIndex.set(newMediaSection.mid, this._mediaSections.length - 1);
          this._sdpObject.media.push(newMediaSection.getObject());
          this._regenerateBundleMids();
        }
        _replaceMediaSection(newMediaSection, reuseMid) {
          if (typeof reuseMid === "string") {
            const idx = this._midToIndex.get(reuseMid);
            if (idx === void 0) {
              throw new Error(`no media section found for reuseMid '${reuseMid}'`);
            }
            const oldMediaSection = this._mediaSections[idx];
            this._mediaSections[idx] = newMediaSection;
            this._midToIndex.delete(oldMediaSection.mid);
            this._midToIndex.set(newMediaSection.mid, idx);
            this._sdpObject.media[idx] = newMediaSection.getObject();
            this._regenerateBundleMids();
          } else {
            const idx = this._midToIndex.get(newMediaSection.mid);
            if (idx === void 0) {
              throw new Error(`no media section found with mid '${newMediaSection.mid}'`);
            }
            this._mediaSections[idx] = newMediaSection;
            this._sdpObject.media[idx] = newMediaSection.getObject();
          }
        }
        _findMediaSection(mid) {
          const idx = this._midToIndex.get(mid);
          if (idx === void 0) {
            throw new Error(`no media section found with mid '${mid}'`);
          }
          return this._mediaSections[idx];
        }
        _regenerateBundleMids() {
          if (!this._dtlsParameters) {
            return;
          }
          this._sdpObject.groups[0].mids = this._mediaSections.filter((mediaSection) => !mediaSection.closed).map((mediaSection) => mediaSection.mid).join(" ");
        }
      };
      exports.RemoteSdp = RemoteSdp;
    }
  });

  // node_modules/mediasoup-client/lib/scalabilityModes.js
  var require_scalabilityModes = __commonJS({
    "node_modules/mediasoup-client/lib/scalabilityModes.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parse = parse2;
      var ScalabilityModeRegex = new RegExp("^[LS]([1-9]\\d{0,1})T([1-9]\\d{0,1})");
      function parse2(scalabilityMode) {
        const match = ScalabilityModeRegex.exec(scalabilityMode ?? "");
        if (match) {
          return {
            spatialLayers: Number(match[1]),
            temporalLayers: Number(match[2])
          };
        } else {
          return {
            spatialLayers: 1,
            temporalLayers: 1
          };
        }
      }
    }
  });

  // node_modules/mediasoup-client/lib/handlers/Chrome111.js
  var require_Chrome111 = __commonJS({
    "node_modules/mediasoup-client/lib/handlers/Chrome111.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Chrome111 = void 0;
      var sdpTransform = require_lib3();
      var Logger_1 = require_Logger();
      var utils = require_utils();
      var ortc = require_ortc();
      var sdpCommonUtils = require_commonUtils();
      var sdpUnifiedPlanUtils = require_unifiedPlanUtils();
      var ortcUtils = require_utils2();
      var errors_1 = require_errors();
      var HandlerInterface_1 = require_HandlerInterface();
      var RemoteSdp_1 = require_RemoteSdp();
      var scalabilityModes_1 = require_scalabilityModes();
      var logger = new Logger_1.Logger("Chrome111");
      var NAME = "Chrome111";
      var SCTP_NUM_STREAMS = { OS: 1024, MIS: 1024 };
      var Chrome111 = class _Chrome111 extends HandlerInterface_1.HandlerInterface {
        // Closed flag.
        _closed = false;
        // Handler direction.
        _direction;
        // Remote SDP handler.
        _remoteSdp;
        // Generic sending RTP parameters for audio and video.
        _sendingRtpParametersByKind;
        // Generic sending RTP parameters for audio and video suitable for the SDP
        // remote answer.
        _sendingRemoteRtpParametersByKind;
        // Initial server side DTLS role. If not 'auto', it will force the opposite
        // value in client side.
        _forcedLocalDtlsRole;
        // RTCPeerConnection instance.
        _pc;
        // Map of RTCTransceivers indexed by MID.
        _mapMidTransceiver = /* @__PURE__ */ new Map();
        // Local stream for sending.
        _sendStream = new MediaStream();
        // Whether a DataChannel m=application section has been created.
        _hasDataChannelMediaSection = false;
        // Sending DataChannel id value counter. Incremented for each new DataChannel.
        _nextSendSctpStreamId = 0;
        // Got transport local and remote parameters.
        _transportReady = false;
        /**
         * Creates a factory function.
         */
        static createFactory() {
          return () => new _Chrome111();
        }
        constructor() {
          super();
        }
        get name() {
          return NAME;
        }
        close() {
          logger.debug("close()");
          if (this._closed) {
            return;
          }
          this._closed = true;
          if (this._pc) {
            try {
              this._pc.close();
            } catch (error) {
            }
          }
          this.emit("@close");
        }
        async getNativeRtpCapabilities() {
          logger.debug("getNativeRtpCapabilities()");
          const pc = new RTCPeerConnection({
            iceServers: [],
            iceTransportPolicy: "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require",
            sdpSemantics: "unified-plan"
          });
          try {
            pc.addTransceiver("audio");
            pc.addTransceiver("video", {
              sendEncodings: [{ scalabilityMode: "L3T3" }]
            });
            const offer = await pc.createOffer();
            try {
              pc.close();
            } catch (error) {
            }
            const sdpObject = sdpTransform.parse(offer.sdp);
            const nativeRtpCapabilities = sdpCommonUtils.extractRtpCapabilities({
              sdpObject
            });
            ortcUtils.addNackSupportForOpus(nativeRtpCapabilities);
            return nativeRtpCapabilities;
          } catch (error) {
            try {
              pc.close();
            } catch (error2) {
            }
            throw error;
          }
        }
        async getNativeSctpCapabilities() {
          logger.debug("getNativeSctpCapabilities()");
          return {
            numStreams: SCTP_NUM_STREAMS
          };
        }
        run({ direction, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, extendedRtpCapabilities }) {
          this.assertNotClosed();
          logger.debug("run()");
          this._direction = direction;
          this._remoteSdp = new RemoteSdp_1.RemoteSdp({
            iceParameters,
            iceCandidates,
            dtlsParameters,
            sctpParameters
          });
          this._sendingRtpParametersByKind = {
            audio: ortc.getSendingRtpParameters("audio", extendedRtpCapabilities),
            video: ortc.getSendingRtpParameters("video", extendedRtpCapabilities)
          };
          this._sendingRemoteRtpParametersByKind = {
            audio: ortc.getSendingRemoteRtpParameters("audio", extendedRtpCapabilities),
            video: ortc.getSendingRemoteRtpParameters("video", extendedRtpCapabilities)
          };
          if (dtlsParameters.role && dtlsParameters.role !== "auto") {
            this._forcedLocalDtlsRole = dtlsParameters.role === "server" ? "client" : "server";
          }
          this._pc = new RTCPeerConnection({
            iceServers: iceServers ?? [],
            iceTransportPolicy: iceTransportPolicy ?? "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require",
            sdpSemantics: "unified-plan",
            ...additionalSettings
          }, proprietaryConstraints);
          this._pc.addEventListener("icegatheringstatechange", () => {
            this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
          });
          this._pc.addEventListener("icecandidateerror", (event) => {
            this.emit("@icecandidateerror", event);
          });
          if (this._pc.connectionState) {
            this._pc.addEventListener("connectionstatechange", () => {
              this.emit("@connectionstatechange", this._pc.connectionState);
            });
          } else {
            logger.warn("run() | pc.connectionState not supported, using pc.iceConnectionState");
            this._pc.addEventListener("iceconnectionstatechange", () => {
              switch (this._pc.iceConnectionState) {
                case "checking": {
                  this.emit("@connectionstatechange", "connecting");
                  break;
                }
                case "connected":
                case "completed": {
                  this.emit("@connectionstatechange", "connected");
                  break;
                }
                case "failed": {
                  this.emit("@connectionstatechange", "failed");
                  break;
                }
                case "disconnected": {
                  this.emit("@connectionstatechange", "disconnected");
                  break;
                }
                case "closed": {
                  this.emit("@connectionstatechange", "closed");
                  break;
                }
              }
            });
          }
        }
        async updateIceServers(iceServers) {
          this.assertNotClosed();
          logger.debug("updateIceServers()");
          const configuration = this._pc.getConfiguration();
          configuration.iceServers = iceServers;
          this._pc.setConfiguration(configuration);
        }
        async restartIce(iceParameters) {
          this.assertNotClosed();
          logger.debug("restartIce()");
          this._remoteSdp.updateIceParameters(iceParameters);
          if (!this._transportReady) {
            return;
          }
          if (this._direction === "send") {
            const offer = await this._pc.createOffer({ iceRestart: true });
            logger.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", offer);
            await this._pc.setLocalDescription(offer);
            const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
            logger.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setRemoteDescription(answer);
          } else {
            const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
            logger.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", offer);
            await this._pc.setRemoteDescription(offer);
            const answer = await this._pc.createAnswer();
            logger.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", answer);
            await this._pc.setLocalDescription(answer);
          }
        }
        async getTransportStats() {
          this.assertNotClosed();
          return this._pc.getStats();
        }
        async send({ track, encodings, codecOptions, codec, onRtpSender }) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("send() [kind:%s, track.id:%s]", track.kind, track.id);
          if (encodings && encodings.length > 1) {
            let maxTemporalLayers = 1;
            for (const encoding of encodings) {
              const temporalLayers = encoding.scalabilityMode ? (0, scalabilityModes_1.parse)(encoding.scalabilityMode).temporalLayers : 3;
              if (temporalLayers > maxTemporalLayers) {
                maxTemporalLayers = temporalLayers;
              }
            }
            encodings.forEach((encoding, idx) => {
              encoding.rid = `r${idx}`;
              encoding.scalabilityMode = `L1T${maxTemporalLayers}`;
            });
          }
          const sendingRtpParameters = utils.clone(this._sendingRtpParametersByKind[track.kind]);
          sendingRtpParameters.codecs = ortc.reduceCodecs(sendingRtpParameters.codecs, codec);
          const sendingRemoteRtpParameters = utils.clone(this._sendingRemoteRtpParametersByKind[track.kind]);
          sendingRemoteRtpParameters.codecs = ortc.reduceCodecs(sendingRemoteRtpParameters.codecs, codec);
          const mediaSectionIdx = this._remoteSdp.getNextMediaSectionIdx();
          const transceiver = this._pc.addTransceiver(track, {
            direction: "sendonly",
            streams: [this._sendStream],
            sendEncodings: encodings
          });
          if (onRtpSender) {
            onRtpSender(transceiver.sender);
          }
          const offer = await this._pc.createOffer();
          let localSdpObject = sdpTransform.parse(offer.sdp);
          if (localSdpObject.extmapAllowMixed) {
            this._remoteSdp.setSessionExtmapAllowMixed();
          }
          if (!this._transportReady) {
            await this.setupTransport({
              localDtlsRole: this._forcedLocalDtlsRole ?? "client",
              localSdpObject
            });
          }
          logger.debug("send() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const localId = transceiver.mid;
          sendingRtpParameters.mid = localId;
          localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          const offerMediaObject = localSdpObject.media[mediaSectionIdx.idx];
          sendingRtpParameters.rtcp.cname = sdpCommonUtils.getCname({
            offerMediaObject
          });
          if (!encodings) {
            sendingRtpParameters.encodings = sdpUnifiedPlanUtils.getRtpEncodings({
              offerMediaObject
            });
          } else if (encodings.length === 1) {
            const newEncodings = sdpUnifiedPlanUtils.getRtpEncodings({
              offerMediaObject
            });
            Object.assign(newEncodings[0], encodings[0]);
            sendingRtpParameters.encodings = newEncodings;
          } else {
            sendingRtpParameters.encodings = encodings;
          }
          this._remoteSdp.send({
            offerMediaObject,
            reuseMid: mediaSectionIdx.reuseMid,
            offerRtpParameters: sendingRtpParameters,
            answerRtpParameters: sendingRemoteRtpParameters,
            codecOptions
          });
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("send() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
          this._mapMidTransceiver.set(localId, transceiver);
          return {
            localId,
            rtpParameters: sendingRtpParameters,
            rtpSender: transceiver.sender
          };
        }
        async stopSending(localId) {
          this.assertSendDirection();
          logger.debug("stopSending() [localId:%s]", localId);
          if (this._closed) {
            return;
          }
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          void transceiver.sender.replaceTrack(null);
          this._pc.removeTrack(transceiver.sender);
          const mediaSectionClosed = this._remoteSdp.closeMediaSection(transceiver.mid);
          if (mediaSectionClosed) {
            try {
              transceiver.stop();
            } catch (error) {
            }
          }
          const offer = await this._pc.createOffer();
          logger.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
          this._mapMidTransceiver.delete(localId);
        }
        async pauseSending(localId) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("pauseSending() [localId:%s]", localId);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          transceiver.direction = "inactive";
          this._remoteSdp.pauseMediaSection(localId);
          const offer = await this._pc.createOffer();
          logger.debug("pauseSending() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("pauseSending() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async resumeSending(localId) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("resumeSending() [localId:%s]", localId);
          const transceiver = this._mapMidTransceiver.get(localId);
          this._remoteSdp.resumeSendingMediaSection(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          transceiver.direction = "sendonly";
          const offer = await this._pc.createOffer();
          logger.debug("resumeSending() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("resumeSending() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async replaceTrack(localId, track) {
          this.assertNotClosed();
          this.assertSendDirection();
          if (track) {
            logger.debug("replaceTrack() [localId:%s, track.id:%s]", localId, track.id);
          } else {
            logger.debug("replaceTrack() [localId:%s, no track]", localId);
          }
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          await transceiver.sender.replaceTrack(track);
        }
        async setMaxSpatialLayer(localId, spatialLayer) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", localId, spatialLayer);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          const parameters = transceiver.sender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
            if (idx <= spatialLayer) {
              encoding.active = true;
            } else {
              encoding.active = false;
            }
          });
          await transceiver.sender.setParameters(parameters);
          this._remoteSdp.muxMediaSectionSimulcast(localId, parameters.encodings);
          const offer = await this._pc.createOffer();
          logger.debug("setMaxSpatialLayer() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("setMaxSpatialLayer() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async setRtpEncodingParameters(localId, params2) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("setRtpEncodingParameters() [localId:%s, params:%o]", localId, params2);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          const parameters = transceiver.sender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
            parameters.encodings[idx] = { ...encoding, ...params2 };
          });
          await transceiver.sender.setParameters(parameters);
          this._remoteSdp.muxMediaSectionSimulcast(localId, parameters.encodings);
          const offer = await this._pc.createOffer();
          logger.debug("setRtpEncodingParameters() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("setRtpEncodingParameters() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async getSenderStats(localId) {
          this.assertNotClosed();
          this.assertSendDirection();
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          return transceiver.sender.getStats();
        }
        async sendDataChannel({ ordered, maxPacketLifeTime, maxRetransmits, label, protocol: protocol4 }) {
          this.assertNotClosed();
          this.assertSendDirection();
          const options = {
            negotiated: true,
            id: this._nextSendSctpStreamId,
            ordered,
            maxPacketLifeTime,
            maxRetransmits,
            protocol: protocol4
          };
          logger.debug("sendDataChannel() [options:%o]", options);
          const dataChannel = this._pc.createDataChannel(label, options);
          this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % SCTP_NUM_STREAMS.MIS;
          if (!this._hasDataChannelMediaSection) {
            const offer = await this._pc.createOffer();
            const localSdpObject = sdpTransform.parse(offer.sdp);
            const offerMediaObject = localSdpObject.media.find((m) => m.type === "application");
            if (!this._transportReady) {
              await this.setupTransport({
                localDtlsRole: this._forcedLocalDtlsRole ?? "client",
                localSdpObject
              });
            }
            logger.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", offer);
            await this._pc.setLocalDescription(offer);
            this._remoteSdp.sendSctpAssociation({ offerMediaObject });
            const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
            logger.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setRemoteDescription(answer);
            this._hasDataChannelMediaSection = true;
          }
          const sctpStreamParameters = {
            streamId: options.id,
            ordered: options.ordered,
            maxPacketLifeTime: options.maxPacketLifeTime,
            maxRetransmits: options.maxRetransmits
          };
          return { dataChannel, sctpStreamParameters };
        }
        async receive(optionsList) {
          this.assertNotClosed();
          this.assertRecvDirection();
          const results = [];
          const mapLocalId = /* @__PURE__ */ new Map();
          for (const options of optionsList) {
            const { trackId, kind, rtpParameters, streamId } = options;
            logger.debug("receive() [trackId:%s, kind:%s]", trackId, kind);
            const localId = rtpParameters.mid ?? String(this._mapMidTransceiver.size);
            mapLocalId.set(trackId, localId);
            this._remoteSdp.receive({
              mid: localId,
              kind,
              offerRtpParameters: rtpParameters,
              streamId: streamId ?? rtpParameters.rtcp.cname,
              trackId
            });
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          for (const options of optionsList) {
            const { trackId, onRtpReceiver } = options;
            if (onRtpReceiver) {
              const localId = mapLocalId.get(trackId);
              const transceiver = this._pc.getTransceivers().find((t) => t.mid === localId);
              if (!transceiver) {
                throw new Error("transceiver not found");
              }
              onRtpReceiver(transceiver.receiver);
            }
          }
          let answer = await this._pc.createAnswer();
          const localSdpObject = sdpTransform.parse(answer.sdp);
          for (const options of optionsList) {
            const { trackId, rtpParameters } = options;
            const localId = mapLocalId.get(trackId);
            const answerMediaObject = localSdpObject.media.find((m) => String(m.mid) === localId);
            sdpCommonUtils.applyCodecParameters({
              offerRtpParameters: rtpParameters,
              answerMediaObject
            });
          }
          answer = { type: "answer", sdp: sdpTransform.write(localSdpObject) };
          if (!this._transportReady) {
            await this.setupTransport({
              localDtlsRole: this._forcedLocalDtlsRole ?? "client",
              localSdpObject
            });
          }
          logger.debug("receive() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
          for (const options of optionsList) {
            const { trackId } = options;
            const localId = mapLocalId.get(trackId);
            const transceiver = this._pc.getTransceivers().find((t) => t.mid === localId);
            if (!transceiver) {
              throw new Error("new RTCRtpTransceiver not found");
            } else {
              this._mapMidTransceiver.set(localId, transceiver);
              results.push({
                localId,
                track: transceiver.receiver.track,
                rtpReceiver: transceiver.receiver
              });
            }
          }
          return results;
        }
        async stopReceiving(localIds) {
          this.assertRecvDirection();
          if (this._closed) {
            return;
          }
          for (const localId of localIds) {
            logger.debug("stopReceiving() [localId:%s]", localId);
            const transceiver = this._mapMidTransceiver.get(localId);
            if (!transceiver) {
              throw new Error("associated RTCRtpTransceiver not found");
            }
            this._remoteSdp.closeMediaSection(transceiver.mid);
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
          for (const localId of localIds) {
            this._mapMidTransceiver.delete(localId);
          }
        }
        async pauseReceiving(localIds) {
          this.assertNotClosed();
          this.assertRecvDirection();
          for (const localId of localIds) {
            logger.debug("pauseReceiving() [localId:%s]", localId);
            const transceiver = this._mapMidTransceiver.get(localId);
            if (!transceiver) {
              throw new Error("associated RTCRtpTransceiver not found");
            }
            transceiver.direction = "inactive";
            this._remoteSdp.pauseMediaSection(localId);
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("pauseReceiving() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug("pauseReceiving() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
        }
        async resumeReceiving(localIds) {
          this.assertNotClosed();
          this.assertRecvDirection();
          for (const localId of localIds) {
            logger.debug("resumeReceiving() [localId:%s]", localId);
            const transceiver = this._mapMidTransceiver.get(localId);
            if (!transceiver) {
              throw new Error("associated RTCRtpTransceiver not found");
            }
            transceiver.direction = "recvonly";
            this._remoteSdp.resumeReceivingMediaSection(localId);
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("resumeReceiving() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug("resumeReceiving() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
        }
        async getReceiverStats(localId) {
          this.assertNotClosed();
          this.assertRecvDirection();
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          return transceiver.receiver.getStats();
        }
        async receiveDataChannel({ sctpStreamParameters, label, protocol: protocol4 }) {
          this.assertNotClosed();
          this.assertRecvDirection();
          const { streamId, ordered, maxPacketLifeTime, maxRetransmits } = sctpStreamParameters;
          const options = {
            negotiated: true,
            id: streamId,
            ordered,
            maxPacketLifeTime,
            maxRetransmits,
            protocol: protocol4
          };
          logger.debug("receiveDataChannel() [options:%o]", options);
          const dataChannel = this._pc.createDataChannel(label, options);
          if (!this._hasDataChannelMediaSection) {
            this._remoteSdp.receiveSctpAssociation();
            const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
            logger.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", offer);
            await this._pc.setRemoteDescription(offer);
            const answer = await this._pc.createAnswer();
            if (!this._transportReady) {
              const localSdpObject = sdpTransform.parse(answer.sdp);
              await this.setupTransport({
                localDtlsRole: this._forcedLocalDtlsRole ?? "client",
                localSdpObject
              });
            }
            logger.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setLocalDescription(answer);
            this._hasDataChannelMediaSection = true;
          }
          return { dataChannel };
        }
        async setupTransport({ localDtlsRole, localSdpObject }) {
          if (!localSdpObject) {
            localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          }
          const dtlsParameters = sdpCommonUtils.extractDtlsParameters({
            sdpObject: localSdpObject
          });
          dtlsParameters.role = localDtlsRole;
          this._remoteSdp.updateDtlsRole(localDtlsRole === "client" ? "server" : "client");
          await new Promise((resolve, reject) => {
            this.safeEmit("@connect", { dtlsParameters }, resolve, reject);
          });
          this._transportReady = true;
        }
        assertNotClosed() {
          if (this._closed) {
            throw new errors_1.InvalidStateError("method called in a closed handler");
          }
        }
        assertSendDirection() {
          if (this._direction !== "send") {
            throw new Error('method can just be called for handlers with "send" direction');
          }
        }
        assertRecvDirection() {
          if (this._direction !== "recv") {
            throw new Error('method can just be called for handlers with "recv" direction');
          }
        }
      };
      exports.Chrome111 = Chrome111;
    }
  });

  // node_modules/mediasoup-client/lib/handlers/Chrome74.js
  var require_Chrome74 = __commonJS({
    "node_modules/mediasoup-client/lib/handlers/Chrome74.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Chrome74 = void 0;
      var sdpTransform = require_lib3();
      var Logger_1 = require_Logger();
      var utils = require_utils();
      var ortc = require_ortc();
      var sdpCommonUtils = require_commonUtils();
      var sdpUnifiedPlanUtils = require_unifiedPlanUtils();
      var ortcUtils = require_utils2();
      var errors_1 = require_errors();
      var HandlerInterface_1 = require_HandlerInterface();
      var RemoteSdp_1 = require_RemoteSdp();
      var scalabilityModes_1 = require_scalabilityModes();
      var logger = new Logger_1.Logger("Chrome74");
      var NAME = "Chrome74";
      var SCTP_NUM_STREAMS = { OS: 1024, MIS: 1024 };
      var Chrome74 = class _Chrome74 extends HandlerInterface_1.HandlerInterface {
        // Closed flag.
        _closed = false;
        // Handler direction.
        _direction;
        // Remote SDP handler.
        _remoteSdp;
        // Generic sending RTP parameters for audio and video.
        _sendingRtpParametersByKind;
        // Generic sending RTP parameters for audio and video suitable for the SDP
        // remote answer.
        _sendingRemoteRtpParametersByKind;
        // Initial server side DTLS role. If not 'auto', it will force the opposite
        // value in client side.
        _forcedLocalDtlsRole;
        // RTCPeerConnection instance.
        _pc;
        // Map of RTCTransceivers indexed by MID.
        _mapMidTransceiver = /* @__PURE__ */ new Map();
        // Local stream for sending.
        _sendStream = new MediaStream();
        // Whether a DataChannel m=application section has been created.
        _hasDataChannelMediaSection = false;
        // Sending DataChannel id value counter. Incremented for each new DataChannel.
        _nextSendSctpStreamId = 0;
        // Got transport local and remote parameters.
        _transportReady = false;
        /**
         * Creates a factory function.
         */
        static createFactory() {
          return () => new _Chrome74();
        }
        constructor() {
          super();
        }
        get name() {
          return NAME;
        }
        close() {
          logger.debug("close()");
          if (this._closed) {
            return;
          }
          this._closed = true;
          if (this._pc) {
            try {
              this._pc.close();
            } catch (error) {
            }
          }
          this.emit("@close");
        }
        async getNativeRtpCapabilities() {
          logger.debug("getNativeRtpCapabilities()");
          const pc = new RTCPeerConnection({
            iceServers: [],
            iceTransportPolicy: "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require",
            sdpSemantics: "unified-plan"
          });
          try {
            pc.addTransceiver("audio");
            pc.addTransceiver("video");
            const offer = await pc.createOffer();
            try {
              pc.close();
            } catch (error) {
            }
            const sdpObject = sdpTransform.parse(offer.sdp);
            const nativeRtpCapabilities = sdpCommonUtils.extractRtpCapabilities({
              sdpObject
            });
            ortcUtils.addNackSupportForOpus(nativeRtpCapabilities);
            return nativeRtpCapabilities;
          } catch (error) {
            try {
              pc.close();
            } catch (error2) {
            }
            throw error;
          }
        }
        async getNativeSctpCapabilities() {
          logger.debug("getNativeSctpCapabilities()");
          return {
            numStreams: SCTP_NUM_STREAMS
          };
        }
        run({ direction, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, extendedRtpCapabilities }) {
          logger.debug("run()");
          this._direction = direction;
          this._remoteSdp = new RemoteSdp_1.RemoteSdp({
            iceParameters,
            iceCandidates,
            dtlsParameters,
            sctpParameters
          });
          this._sendingRtpParametersByKind = {
            audio: ortc.getSendingRtpParameters("audio", extendedRtpCapabilities),
            video: ortc.getSendingRtpParameters("video", extendedRtpCapabilities)
          };
          this._sendingRemoteRtpParametersByKind = {
            audio: ortc.getSendingRemoteRtpParameters("audio", extendedRtpCapabilities),
            video: ortc.getSendingRemoteRtpParameters("video", extendedRtpCapabilities)
          };
          if (dtlsParameters.role && dtlsParameters.role !== "auto") {
            this._forcedLocalDtlsRole = dtlsParameters.role === "server" ? "client" : "server";
          }
          this._pc = new RTCPeerConnection({
            iceServers: iceServers ?? [],
            iceTransportPolicy: iceTransportPolicy ?? "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require",
            sdpSemantics: "unified-plan",
            ...additionalSettings
          }, proprietaryConstraints);
          this._pc.addEventListener("icegatheringstatechange", () => {
            this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
          });
          this._pc.addEventListener("icecandidateerror", (event) => {
            this.emit("@icecandidateerror", event);
          });
          if (this._pc.connectionState) {
            this._pc.addEventListener("connectionstatechange", () => {
              this.emit("@connectionstatechange", this._pc.connectionState);
            });
          } else {
            logger.warn("run() | pc.connectionState not supported, using pc.iceConnectionState");
            this._pc.addEventListener("iceconnectionstatechange", () => {
              switch (this._pc.iceConnectionState) {
                case "checking": {
                  this.emit("@connectionstatechange", "connecting");
                  break;
                }
                case "connected":
                case "completed": {
                  this.emit("@connectionstatechange", "connected");
                  break;
                }
                case "failed": {
                  this.emit("@connectionstatechange", "failed");
                  break;
                }
                case "disconnected": {
                  this.emit("@connectionstatechange", "disconnected");
                  break;
                }
                case "closed": {
                  this.emit("@connectionstatechange", "closed");
                  break;
                }
              }
            });
          }
        }
        async updateIceServers(iceServers) {
          this.assertNotClosed();
          logger.debug("updateIceServers()");
          const configuration = this._pc.getConfiguration();
          configuration.iceServers = iceServers;
          this._pc.setConfiguration(configuration);
        }
        async restartIce(iceParameters) {
          this.assertNotClosed();
          logger.debug("restartIce()");
          this._remoteSdp.updateIceParameters(iceParameters);
          if (!this._transportReady) {
            return;
          }
          if (this._direction === "send") {
            const offer = await this._pc.createOffer({ iceRestart: true });
            logger.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", offer);
            await this._pc.setLocalDescription(offer);
            const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
            logger.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setRemoteDescription(answer);
          } else {
            const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
            logger.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", offer);
            await this._pc.setRemoteDescription(offer);
            const answer = await this._pc.createAnswer();
            logger.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", answer);
            await this._pc.setLocalDescription(answer);
          }
        }
        async getTransportStats() {
          this.assertNotClosed();
          return this._pc.getStats();
        }
        async send({ track, encodings, codecOptions, codec }) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("send() [kind:%s, track.id:%s]", track.kind, track.id);
          if (encodings && encodings.length > 1) {
            encodings.forEach((encoding, idx) => {
              encoding.rid = `r${idx}`;
            });
          }
          const sendingRtpParameters = utils.clone(this._sendingRtpParametersByKind[track.kind]);
          sendingRtpParameters.codecs = ortc.reduceCodecs(sendingRtpParameters.codecs, codec);
          const sendingRemoteRtpParameters = utils.clone(this._sendingRemoteRtpParametersByKind[track.kind]);
          sendingRemoteRtpParameters.codecs = ortc.reduceCodecs(sendingRemoteRtpParameters.codecs, codec);
          const mediaSectionIdx = this._remoteSdp.getNextMediaSectionIdx();
          const transceiver = this._pc.addTransceiver(track, {
            direction: "sendonly",
            streams: [this._sendStream],
            sendEncodings: encodings
          });
          let offer = await this._pc.createOffer();
          let localSdpObject = sdpTransform.parse(offer.sdp);
          if (localSdpObject.extmapAllowMixed) {
            this._remoteSdp.setSessionExtmapAllowMixed();
          }
          let offerMediaObject;
          if (!this._transportReady) {
            await this.setupTransport({
              localDtlsRole: this._forcedLocalDtlsRole ?? "client",
              localSdpObject
            });
          }
          let hackVp9Svc = false;
          const layers = (0, scalabilityModes_1.parse)((encodings ?? [{}])[0].scalabilityMode);
          if (encodings && encodings.length === 1 && layers.spatialLayers > 1 && sendingRtpParameters.codecs[0].mimeType.toLowerCase() === "video/vp9") {
            logger.debug("send() | enabling legacy simulcast for VP9 SVC");
            hackVp9Svc = true;
            localSdpObject = sdpTransform.parse(offer.sdp);
            offerMediaObject = localSdpObject.media[mediaSectionIdx.idx];
            sdpUnifiedPlanUtils.addLegacySimulcast({
              offerMediaObject,
              numStreams: layers.spatialLayers
            });
            offer = { type: "offer", sdp: sdpTransform.write(localSdpObject) };
          }
          logger.debug("send() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const localId = transceiver.mid;
          sendingRtpParameters.mid = localId;
          localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          offerMediaObject = localSdpObject.media[mediaSectionIdx.idx];
          sendingRtpParameters.rtcp.cname = sdpCommonUtils.getCname({
            offerMediaObject
          });
          if (!encodings) {
            sendingRtpParameters.encodings = sdpUnifiedPlanUtils.getRtpEncodings({
              offerMediaObject
            });
          } else if (encodings.length === 1) {
            let newEncodings = sdpUnifiedPlanUtils.getRtpEncodings({
              offerMediaObject
            });
            Object.assign(newEncodings[0], encodings[0]);
            if (hackVp9Svc) {
              newEncodings = [newEncodings[0]];
            }
            sendingRtpParameters.encodings = newEncodings;
          } else {
            sendingRtpParameters.encodings = encodings;
          }
          if (sendingRtpParameters.encodings.length > 1 && (sendingRtpParameters.codecs[0].mimeType.toLowerCase() === "video/vp8" || sendingRtpParameters.codecs[0].mimeType.toLowerCase() === "video/h264")) {
            for (const encoding of sendingRtpParameters.encodings) {
              if (encoding.scalabilityMode) {
                encoding.scalabilityMode = `L1T${layers.temporalLayers}`;
              } else {
                encoding.scalabilityMode = "L1T3";
              }
            }
          }
          this._remoteSdp.send({
            offerMediaObject,
            reuseMid: mediaSectionIdx.reuseMid,
            offerRtpParameters: sendingRtpParameters,
            answerRtpParameters: sendingRemoteRtpParameters,
            codecOptions
          });
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("send() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
          this._mapMidTransceiver.set(localId, transceiver);
          return {
            localId,
            rtpParameters: sendingRtpParameters,
            rtpSender: transceiver.sender
          };
        }
        async stopSending(localId) {
          this.assertSendDirection();
          logger.debug("stopSending() [localId:%s]", localId);
          if (this._closed) {
            return;
          }
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          void transceiver.sender.replaceTrack(null);
          this._pc.removeTrack(transceiver.sender);
          const mediaSectionClosed = this._remoteSdp.closeMediaSection(transceiver.mid);
          if (mediaSectionClosed) {
            try {
              transceiver.stop();
            } catch (error) {
            }
          }
          const offer = await this._pc.createOffer();
          logger.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
          this._mapMidTransceiver.delete(localId);
        }
        async pauseSending(localId) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("pauseSending() [localId:%s]", localId);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          transceiver.direction = "inactive";
          this._remoteSdp.pauseMediaSection(localId);
          const offer = await this._pc.createOffer();
          logger.debug("pauseSending() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("pauseSending() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async resumeSending(localId) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("resumeSending() [localId:%s]", localId);
          const transceiver = this._mapMidTransceiver.get(localId);
          this._remoteSdp.resumeSendingMediaSection(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          transceiver.direction = "sendonly";
          const offer = await this._pc.createOffer();
          logger.debug("resumeSending() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("resumeSending() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async replaceTrack(localId, track) {
          this.assertNotClosed();
          this.assertSendDirection();
          if (track) {
            logger.debug("replaceTrack() [localId:%s, track.id:%s]", localId, track.id);
          } else {
            logger.debug("replaceTrack() [localId:%s, no track]", localId);
          }
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          await transceiver.sender.replaceTrack(track);
        }
        async setMaxSpatialLayer(localId, spatialLayer) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", localId, spatialLayer);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          const parameters = transceiver.sender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
            if (idx <= spatialLayer) {
              encoding.active = true;
            } else {
              encoding.active = false;
            }
          });
          await transceiver.sender.setParameters(parameters);
          this._remoteSdp.muxMediaSectionSimulcast(localId, parameters.encodings);
          const offer = await this._pc.createOffer();
          logger.debug("setMaxSpatialLayer() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("setMaxSpatialLayer() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async setRtpEncodingParameters(localId, params2) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("setRtpEncodingParameters() [localId:%s, params:%o]", localId, params2);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          const parameters = transceiver.sender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
            parameters.encodings[idx] = { ...encoding, ...params2 };
          });
          await transceiver.sender.setParameters(parameters);
          this._remoteSdp.muxMediaSectionSimulcast(localId, parameters.encodings);
          const offer = await this._pc.createOffer();
          logger.debug("setRtpEncodingParameters() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("setRtpEncodingParameters() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async getSenderStats(localId) {
          this.assertNotClosed();
          this.assertSendDirection();
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          return transceiver.sender.getStats();
        }
        async sendDataChannel({ ordered, maxPacketLifeTime, maxRetransmits, label, protocol: protocol4 }) {
          this.assertNotClosed();
          this.assertSendDirection();
          const options = {
            negotiated: true,
            id: this._nextSendSctpStreamId,
            ordered,
            maxPacketLifeTime,
            maxRetransmits,
            protocol: protocol4
          };
          logger.debug("sendDataChannel() [options:%o]", options);
          const dataChannel = this._pc.createDataChannel(label, options);
          this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % SCTP_NUM_STREAMS.MIS;
          if (!this._hasDataChannelMediaSection) {
            const offer = await this._pc.createOffer();
            const localSdpObject = sdpTransform.parse(offer.sdp);
            const offerMediaObject = localSdpObject.media.find((m) => m.type === "application");
            if (!this._transportReady) {
              await this.setupTransport({
                localDtlsRole: this._forcedLocalDtlsRole ?? "client",
                localSdpObject
              });
            }
            logger.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", offer);
            await this._pc.setLocalDescription(offer);
            this._remoteSdp.sendSctpAssociation({ offerMediaObject });
            const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
            logger.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setRemoteDescription(answer);
            this._hasDataChannelMediaSection = true;
          }
          const sctpStreamParameters = {
            streamId: options.id,
            ordered: options.ordered,
            maxPacketLifeTime: options.maxPacketLifeTime,
            maxRetransmits: options.maxRetransmits
          };
          return { dataChannel, sctpStreamParameters };
        }
        async receive(optionsList) {
          this.assertNotClosed();
          this.assertRecvDirection();
          const results = [];
          const mapLocalId = /* @__PURE__ */ new Map();
          for (const options of optionsList) {
            const { trackId, kind, rtpParameters, streamId } = options;
            logger.debug("receive() [trackId:%s, kind:%s]", trackId, kind);
            const localId = rtpParameters.mid ?? String(this._mapMidTransceiver.size);
            mapLocalId.set(trackId, localId);
            this._remoteSdp.receive({
              mid: localId,
              kind,
              offerRtpParameters: rtpParameters,
              streamId: streamId ?? rtpParameters.rtcp.cname,
              trackId
            });
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          let answer = await this._pc.createAnswer();
          const localSdpObject = sdpTransform.parse(answer.sdp);
          for (const options of optionsList) {
            const { trackId, rtpParameters } = options;
            const localId = mapLocalId.get(trackId);
            const answerMediaObject = localSdpObject.media.find((m) => String(m.mid) === localId);
            sdpCommonUtils.applyCodecParameters({
              offerRtpParameters: rtpParameters,
              answerMediaObject
            });
          }
          answer = { type: "answer", sdp: sdpTransform.write(localSdpObject) };
          if (!this._transportReady) {
            await this.setupTransport({
              localDtlsRole: this._forcedLocalDtlsRole ?? "client",
              localSdpObject
            });
          }
          logger.debug("receive() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
          for (const options of optionsList) {
            const { trackId } = options;
            const localId = mapLocalId.get(trackId);
            const transceiver = this._pc.getTransceivers().find((t) => t.mid === localId);
            if (!transceiver) {
              throw new Error("new RTCRtpTransceiver not found");
            } else {
              this._mapMidTransceiver.set(localId, transceiver);
              results.push({
                localId,
                track: transceiver.receiver.track,
                rtpReceiver: transceiver.receiver
              });
            }
          }
          return results;
        }
        async stopReceiving(localIds) {
          this.assertRecvDirection();
          if (this._closed) {
            return;
          }
          for (const localId of localIds) {
            logger.debug("stopReceiving() [localId:%s]", localId);
            const transceiver = this._mapMidTransceiver.get(localId);
            if (!transceiver) {
              throw new Error("associated RTCRtpTransceiver not found");
            }
            this._remoteSdp.closeMediaSection(transceiver.mid);
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
          for (const localId of localIds) {
            this._mapMidTransceiver.delete(localId);
          }
        }
        async pauseReceiving(localIds) {
          this.assertNotClosed();
          this.assertRecvDirection();
          for (const localId of localIds) {
            logger.debug("pauseReceiving() [localId:%s]", localId);
            const transceiver = this._mapMidTransceiver.get(localId);
            if (!transceiver) {
              throw new Error("associated RTCRtpTransceiver not found");
            }
            transceiver.direction = "inactive";
            this._remoteSdp.pauseMediaSection(localId);
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("pauseReceiving() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug("pauseReceiving() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
        }
        async resumeReceiving(localIds) {
          this.assertNotClosed();
          this.assertRecvDirection();
          for (const localId of localIds) {
            logger.debug("resumeReceiving() [localId:%s]", localId);
            const transceiver = this._mapMidTransceiver.get(localId);
            if (!transceiver) {
              throw new Error("associated RTCRtpTransceiver not found");
            }
            transceiver.direction = "recvonly";
            this._remoteSdp.resumeReceivingMediaSection(localId);
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("resumeReceiving() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug("resumeReceiving() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
        }
        async getReceiverStats(localId) {
          this.assertNotClosed();
          this.assertRecvDirection();
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          return transceiver.receiver.getStats();
        }
        async receiveDataChannel({ sctpStreamParameters, label, protocol: protocol4 }) {
          this.assertNotClosed();
          this.assertRecvDirection();
          const { streamId, ordered, maxPacketLifeTime, maxRetransmits } = sctpStreamParameters;
          const options = {
            negotiated: true,
            id: streamId,
            ordered,
            maxPacketLifeTime,
            maxRetransmits,
            protocol: protocol4
          };
          logger.debug("receiveDataChannel() [options:%o]", options);
          const dataChannel = this._pc.createDataChannel(label, options);
          if (!this._hasDataChannelMediaSection) {
            this._remoteSdp.receiveSctpAssociation();
            const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
            logger.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", offer);
            await this._pc.setRemoteDescription(offer);
            const answer = await this._pc.createAnswer();
            if (!this._transportReady) {
              const localSdpObject = sdpTransform.parse(answer.sdp);
              await this.setupTransport({
                localDtlsRole: this._forcedLocalDtlsRole ?? "client",
                localSdpObject
              });
            }
            logger.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setLocalDescription(answer);
            this._hasDataChannelMediaSection = true;
          }
          return { dataChannel };
        }
        async setupTransport({ localDtlsRole, localSdpObject }) {
          if (!localSdpObject) {
            localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          }
          const dtlsParameters = sdpCommonUtils.extractDtlsParameters({
            sdpObject: localSdpObject
          });
          dtlsParameters.role = localDtlsRole;
          this._remoteSdp.updateDtlsRole(localDtlsRole === "client" ? "server" : "client");
          await new Promise((resolve, reject) => {
            this.safeEmit("@connect", { dtlsParameters }, resolve, reject);
          });
          this._transportReady = true;
        }
        assertNotClosed() {
          if (this._closed) {
            throw new errors_1.InvalidStateError("method called in a closed handler");
          }
        }
        assertSendDirection() {
          if (this._direction !== "send") {
            throw new Error('method can just be called for handlers with "send" direction');
          }
        }
        assertRecvDirection() {
          if (this._direction !== "recv") {
            throw new Error('method can just be called for handlers with "recv" direction');
          }
        }
      };
      exports.Chrome74 = Chrome74;
    }
  });

  // node_modules/mediasoup-client/lib/handlers/Chrome70.js
  var require_Chrome70 = __commonJS({
    "node_modules/mediasoup-client/lib/handlers/Chrome70.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Chrome70 = void 0;
      var sdpTransform = require_lib3();
      var Logger_1 = require_Logger();
      var utils = require_utils();
      var ortc = require_ortc();
      var sdpCommonUtils = require_commonUtils();
      var sdpUnifiedPlanUtils = require_unifiedPlanUtils();
      var HandlerInterface_1 = require_HandlerInterface();
      var RemoteSdp_1 = require_RemoteSdp();
      var scalabilityModes_1 = require_scalabilityModes();
      var logger = new Logger_1.Logger("Chrome70");
      var NAME = "Chrome70";
      var SCTP_NUM_STREAMS = { OS: 1024, MIS: 1024 };
      var Chrome70 = class _Chrome70 extends HandlerInterface_1.HandlerInterface {
        // Handler direction.
        _direction;
        // Remote SDP handler.
        _remoteSdp;
        // Generic sending RTP parameters for audio and video.
        _sendingRtpParametersByKind;
        // Generic sending RTP parameters for audio and video suitable for the SDP
        // remote answer.
        _sendingRemoteRtpParametersByKind;
        // Initial server side DTLS role. If not 'auto', it will force the opposite
        // value in client side.
        _forcedLocalDtlsRole;
        // RTCPeerConnection instance.
        _pc;
        // Map of RTCTransceivers indexed by MID.
        _mapMidTransceiver = /* @__PURE__ */ new Map();
        // Local stream for sending.
        _sendStream = new MediaStream();
        // Whether a DataChannel m=application section has been created.
        _hasDataChannelMediaSection = false;
        // Sending DataChannel id value counter. Incremented for each new DataChannel.
        _nextSendSctpStreamId = 0;
        // Got transport local and remote parameters.
        _transportReady = false;
        /**
         * Creates a factory function.
         */
        static createFactory() {
          return () => new _Chrome70();
        }
        constructor() {
          super();
        }
        get name() {
          return NAME;
        }
        close() {
          logger.debug("close()");
          if (this._pc) {
            try {
              this._pc.close();
            } catch (error) {
            }
          }
          this.emit("@close");
        }
        async getNativeRtpCapabilities() {
          logger.debug("getNativeRtpCapabilities()");
          const pc = new RTCPeerConnection({
            iceServers: [],
            iceTransportPolicy: "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require",
            sdpSemantics: "unified-plan"
          });
          try {
            pc.addTransceiver("audio");
            pc.addTransceiver("video");
            const offer = await pc.createOffer();
            try {
              pc.close();
            } catch (error) {
            }
            const sdpObject = sdpTransform.parse(offer.sdp);
            const nativeRtpCapabilities = sdpCommonUtils.extractRtpCapabilities({
              sdpObject
            });
            return nativeRtpCapabilities;
          } catch (error) {
            try {
              pc.close();
            } catch (error2) {
            }
            throw error;
          }
        }
        async getNativeSctpCapabilities() {
          logger.debug("getNativeSctpCapabilities()");
          return {
            numStreams: SCTP_NUM_STREAMS
          };
        }
        run({ direction, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, extendedRtpCapabilities }) {
          logger.debug("run()");
          this._direction = direction;
          this._remoteSdp = new RemoteSdp_1.RemoteSdp({
            iceParameters,
            iceCandidates,
            dtlsParameters,
            sctpParameters
          });
          this._sendingRtpParametersByKind = {
            audio: ortc.getSendingRtpParameters("audio", extendedRtpCapabilities),
            video: ortc.getSendingRtpParameters("video", extendedRtpCapabilities)
          };
          this._sendingRemoteRtpParametersByKind = {
            audio: ortc.getSendingRemoteRtpParameters("audio", extendedRtpCapabilities),
            video: ortc.getSendingRemoteRtpParameters("video", extendedRtpCapabilities)
          };
          if (dtlsParameters.role && dtlsParameters.role !== "auto") {
            this._forcedLocalDtlsRole = dtlsParameters.role === "server" ? "client" : "server";
          }
          this._pc = new RTCPeerConnection({
            iceServers: iceServers ?? [],
            iceTransportPolicy: iceTransportPolicy ?? "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require",
            sdpSemantics: "unified-plan",
            ...additionalSettings
          }, proprietaryConstraints);
          this._pc.addEventListener("icegatheringstatechange", () => {
            this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
          });
          this._pc.addEventListener("icecandidateerror", (event) => {
            this.emit("@icecandidateerror", event);
          });
          if (this._pc.connectionState) {
            this._pc.addEventListener("connectionstatechange", () => {
              this.emit("@connectionstatechange", this._pc.connectionState);
            });
          } else {
            this._pc.addEventListener("iceconnectionstatechange", () => {
              logger.warn("run() | pc.connectionState not supported, using pc.iceConnectionState");
              switch (this._pc.iceConnectionState) {
                case "checking": {
                  this.emit("@connectionstatechange", "connecting");
                  break;
                }
                case "connected":
                case "completed": {
                  this.emit("@connectionstatechange", "connected");
                  break;
                }
                case "failed": {
                  this.emit("@connectionstatechange", "failed");
                  break;
                }
                case "disconnected": {
                  this.emit("@connectionstatechange", "disconnected");
                  break;
                }
                case "closed": {
                  this.emit("@connectionstatechange", "closed");
                  break;
                }
              }
            });
          }
        }
        async updateIceServers(iceServers) {
          logger.debug("updateIceServers()");
          const configuration = this._pc.getConfiguration();
          configuration.iceServers = iceServers;
          this._pc.setConfiguration(configuration);
        }
        async restartIce(iceParameters) {
          logger.debug("restartIce()");
          this._remoteSdp.updateIceParameters(iceParameters);
          if (!this._transportReady) {
            return;
          }
          if (this._direction === "send") {
            const offer = await this._pc.createOffer({ iceRestart: true });
            logger.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", offer);
            await this._pc.setLocalDescription(offer);
            const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
            logger.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setRemoteDescription(answer);
          } else {
            const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
            logger.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", offer);
            await this._pc.setRemoteDescription(offer);
            const answer = await this._pc.createAnswer();
            logger.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", answer);
            await this._pc.setLocalDescription(answer);
          }
        }
        async getTransportStats() {
          return this._pc.getStats();
        }
        async send({ track, encodings, codecOptions, codec }) {
          this.assertSendDirection();
          logger.debug("send() [kind:%s, track.id:%s]", track.kind, track.id);
          const sendingRtpParameters = utils.clone(this._sendingRtpParametersByKind[track.kind]);
          sendingRtpParameters.codecs = ortc.reduceCodecs(sendingRtpParameters.codecs, codec);
          const sendingRemoteRtpParameters = utils.clone(this._sendingRemoteRtpParametersByKind[track.kind]);
          sendingRemoteRtpParameters.codecs = ortc.reduceCodecs(sendingRemoteRtpParameters.codecs, codec);
          const mediaSectionIdx = this._remoteSdp.getNextMediaSectionIdx();
          const transceiver = this._pc.addTransceiver(track, {
            direction: "sendonly",
            streams: [this._sendStream]
          });
          let offer = await this._pc.createOffer();
          let localSdpObject = sdpTransform.parse(offer.sdp);
          if (localSdpObject.extmapAllowMixed) {
            this._remoteSdp.setSessionExtmapAllowMixed();
          }
          let offerMediaObject;
          if (!this._transportReady) {
            await this.setupTransport({
              localDtlsRole: this._forcedLocalDtlsRole ?? "client",
              localSdpObject
            });
          }
          if (encodings && encodings.length > 1) {
            logger.debug("send() | enabling legacy simulcast");
            localSdpObject = sdpTransform.parse(offer.sdp);
            offerMediaObject = localSdpObject.media[mediaSectionIdx.idx];
            sdpUnifiedPlanUtils.addLegacySimulcast({
              offerMediaObject,
              numStreams: encodings.length
            });
            offer = { type: "offer", sdp: sdpTransform.write(localSdpObject) };
          }
          let hackVp9Svc = false;
          const layers = (0, scalabilityModes_1.parse)((encodings ?? [{}])[0].scalabilityMode);
          if (encodings && encodings.length === 1 && layers.spatialLayers > 1 && sendingRtpParameters.codecs[0].mimeType.toLowerCase() === "video/vp9") {
            logger.debug("send() | enabling legacy simulcast for VP9 SVC");
            hackVp9Svc = true;
            localSdpObject = sdpTransform.parse(offer.sdp);
            offerMediaObject = localSdpObject.media[mediaSectionIdx.idx];
            sdpUnifiedPlanUtils.addLegacySimulcast({
              offerMediaObject,
              numStreams: layers.spatialLayers
            });
            offer = { type: "offer", sdp: sdpTransform.write(localSdpObject) };
          }
          logger.debug("send() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          if (encodings) {
            logger.debug("send() | applying given encodings");
            const parameters = transceiver.sender.getParameters();
            for (let idx = 0; idx < (parameters.encodings ?? []).length; ++idx) {
              const encoding = parameters.encodings[idx];
              const desiredEncoding = encodings[idx];
              if (!desiredEncoding) {
                break;
              }
              parameters.encodings[idx] = Object.assign(encoding, desiredEncoding);
            }
            await transceiver.sender.setParameters(parameters);
          }
          const localId = transceiver.mid;
          sendingRtpParameters.mid = localId;
          localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          offerMediaObject = localSdpObject.media[mediaSectionIdx.idx];
          sendingRtpParameters.rtcp.cname = sdpCommonUtils.getCname({
            offerMediaObject
          });
          sendingRtpParameters.encodings = sdpUnifiedPlanUtils.getRtpEncodings({
            offerMediaObject
          });
          if (encodings) {
            for (let idx = 0; idx < sendingRtpParameters.encodings.length; ++idx) {
              if (encodings[idx]) {
                Object.assign(sendingRtpParameters.encodings[idx], encodings[idx]);
              }
            }
          }
          if (hackVp9Svc) {
            sendingRtpParameters.encodings = [sendingRtpParameters.encodings[0]];
          }
          if (sendingRtpParameters.encodings.length > 1 && (sendingRtpParameters.codecs[0].mimeType.toLowerCase() === "video/vp8" || sendingRtpParameters.codecs[0].mimeType.toLowerCase() === "video/h264")) {
            for (const encoding of sendingRtpParameters.encodings) {
              encoding.scalabilityMode = "L1T3";
            }
          }
          this._remoteSdp.send({
            offerMediaObject,
            reuseMid: mediaSectionIdx.reuseMid,
            offerRtpParameters: sendingRtpParameters,
            answerRtpParameters: sendingRemoteRtpParameters,
            codecOptions
          });
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("send() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
          this._mapMidTransceiver.set(localId, transceiver);
          return {
            localId,
            rtpParameters: sendingRtpParameters,
            rtpSender: transceiver.sender
          };
        }
        async stopSending(localId) {
          this.assertSendDirection();
          logger.debug("stopSending() [localId:%s]", localId);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          void transceiver.sender.replaceTrack(null);
          this._pc.removeTrack(transceiver.sender);
          const mediaSectionClosed = this._remoteSdp.closeMediaSection(transceiver.mid);
          if (mediaSectionClosed) {
            try {
              transceiver.stop();
            } catch (error) {
            }
          }
          const offer = await this._pc.createOffer();
          logger.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
          this._mapMidTransceiver.delete(localId);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async pauseSending(localId) {
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async resumeSending(localId) {
        }
        async replaceTrack(localId, track) {
          this.assertSendDirection();
          if (track) {
            logger.debug("replaceTrack() [localId:%s, track.id:%s]", localId, track.id);
          } else {
            logger.debug("replaceTrack() [localId:%s, no track]", localId);
          }
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          await transceiver.sender.replaceTrack(track);
        }
        async setMaxSpatialLayer(localId, spatialLayer) {
          this.assertSendDirection();
          logger.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", localId, spatialLayer);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          const parameters = transceiver.sender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
            if (idx <= spatialLayer) {
              encoding.active = true;
            } else {
              encoding.active = false;
            }
          });
          await transceiver.sender.setParameters(parameters);
          this._remoteSdp.muxMediaSectionSimulcast(localId, parameters.encodings);
          const offer = await this._pc.createOffer();
          logger.debug("setMaxSpatialLayer() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("setMaxSpatialLayer() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async setRtpEncodingParameters(localId, params2) {
          this.assertSendDirection();
          logger.debug("setRtpEncodingParameters() [localId:%s, params:%o]", localId, params2);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          const parameters = transceiver.sender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
            parameters.encodings[idx] = { ...encoding, ...params2 };
          });
          await transceiver.sender.setParameters(parameters);
          this._remoteSdp.muxMediaSectionSimulcast(localId, parameters.encodings);
          const offer = await this._pc.createOffer();
          logger.debug("setRtpEncodingParameters() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("setRtpEncodingParameters() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async getSenderStats(localId) {
          this.assertSendDirection();
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          return transceiver.sender.getStats();
        }
        async sendDataChannel({ ordered, maxPacketLifeTime, maxRetransmits, label, protocol: protocol4 }) {
          this.assertSendDirection();
          const options = {
            negotiated: true,
            id: this._nextSendSctpStreamId,
            ordered,
            maxPacketLifeTime,
            maxRetransmitTime: maxPacketLifeTime,
            // NOTE: Old spec.
            maxRetransmits,
            protocol: protocol4
          };
          logger.debug("sendDataChannel() [options:%o]", options);
          const dataChannel = this._pc.createDataChannel(label, options);
          this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % SCTP_NUM_STREAMS.MIS;
          if (!this._hasDataChannelMediaSection) {
            const offer = await this._pc.createOffer();
            const localSdpObject = sdpTransform.parse(offer.sdp);
            const offerMediaObject = localSdpObject.media.find((m) => m.type === "application");
            if (!this._transportReady) {
              await this.setupTransport({
                localDtlsRole: this._forcedLocalDtlsRole ?? "client",
                localSdpObject
              });
            }
            logger.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", offer);
            await this._pc.setLocalDescription(offer);
            this._remoteSdp.sendSctpAssociation({ offerMediaObject });
            const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
            logger.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setRemoteDescription(answer);
            this._hasDataChannelMediaSection = true;
          }
          const sctpStreamParameters = {
            streamId: options.id,
            ordered: options.ordered,
            maxPacketLifeTime: options.maxPacketLifeTime,
            maxRetransmits: options.maxRetransmits
          };
          return { dataChannel, sctpStreamParameters };
        }
        async receive(optionsList) {
          this.assertRecvDirection();
          const results = [];
          const mapLocalId = /* @__PURE__ */ new Map();
          for (const options of optionsList) {
            const { trackId, kind, rtpParameters, streamId } = options;
            logger.debug("receive() [trackId:%s, kind:%s]", trackId, kind);
            const localId = rtpParameters.mid ?? String(this._mapMidTransceiver.size);
            mapLocalId.set(trackId, localId);
            this._remoteSdp.receive({
              mid: localId,
              kind,
              offerRtpParameters: rtpParameters,
              streamId: streamId ?? rtpParameters.rtcp.cname,
              trackId
            });
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          let answer = await this._pc.createAnswer();
          const localSdpObject = sdpTransform.parse(answer.sdp);
          for (const options of optionsList) {
            const { trackId, rtpParameters } = options;
            const localId = mapLocalId.get(trackId);
            const answerMediaObject = localSdpObject.media.find((m) => String(m.mid) === localId);
            sdpCommonUtils.applyCodecParameters({
              offerRtpParameters: rtpParameters,
              answerMediaObject
            });
          }
          answer = { type: "answer", sdp: sdpTransform.write(localSdpObject) };
          if (!this._transportReady) {
            await this.setupTransport({
              localDtlsRole: this._forcedLocalDtlsRole ?? "client",
              localSdpObject
            });
          }
          logger.debug("receive() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
          for (const options of optionsList) {
            const { trackId } = options;
            const localId = mapLocalId.get(trackId);
            const transceiver = this._pc.getTransceivers().find((t) => t.mid === localId);
            if (!transceiver) {
              throw new Error("new RTCRtpTransceiver not found");
            }
            this._mapMidTransceiver.set(localId, transceiver);
            results.push({
              localId,
              track: transceiver.receiver.track,
              rtpReceiver: transceiver.receiver
            });
          }
          return results;
        }
        async stopReceiving(localIds) {
          this.assertRecvDirection();
          for (const localId of localIds) {
            logger.debug("stopReceiving() [localId:%s]", localId);
            const transceiver = this._mapMidTransceiver.get(localId);
            if (!transceiver) {
              throw new Error("associated RTCRtpTransceiver not found");
            }
            this._remoteSdp.closeMediaSection(transceiver.mid);
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
          for (const localId of localIds) {
            this._mapMidTransceiver.delete(localId);
          }
        }
        async pauseReceiving(localIds) {
        }
        async resumeReceiving(localIds) {
        }
        async getReceiverStats(localId) {
          this.assertRecvDirection();
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          return transceiver.receiver.getStats();
        }
        async receiveDataChannel({ sctpStreamParameters, label, protocol: protocol4 }) {
          this.assertRecvDirection();
          const { streamId, ordered, maxPacketLifeTime, maxRetransmits } = sctpStreamParameters;
          const options = {
            negotiated: true,
            id: streamId,
            ordered,
            maxPacketLifeTime,
            maxRetransmitTime: maxPacketLifeTime,
            // NOTE: Old spec.
            maxRetransmits,
            protocol: protocol4
          };
          logger.debug("receiveDataChannel() [options:%o]", options);
          const dataChannel = this._pc.createDataChannel(label, options);
          if (!this._hasDataChannelMediaSection) {
            this._remoteSdp.receiveSctpAssociation();
            const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
            logger.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", offer);
            await this._pc.setRemoteDescription(offer);
            const answer = await this._pc.createAnswer();
            if (!this._transportReady) {
              const localSdpObject = sdpTransform.parse(answer.sdp);
              await this.setupTransport({
                localDtlsRole: this._forcedLocalDtlsRole ?? "client",
                localSdpObject
              });
            }
            logger.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setLocalDescription(answer);
            this._hasDataChannelMediaSection = true;
          }
          return { dataChannel };
        }
        async setupTransport({ localDtlsRole, localSdpObject }) {
          if (!localSdpObject) {
            localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          }
          const dtlsParameters = sdpCommonUtils.extractDtlsParameters({
            sdpObject: localSdpObject
          });
          dtlsParameters.role = localDtlsRole;
          this._remoteSdp.updateDtlsRole(localDtlsRole === "client" ? "server" : "client");
          await new Promise((resolve, reject) => {
            this.safeEmit("@connect", { dtlsParameters }, resolve, reject);
          });
          this._transportReady = true;
        }
        assertSendDirection() {
          if (this._direction !== "send") {
            throw new Error('method can just be called for handlers with "send" direction');
          }
        }
        assertRecvDirection() {
          if (this._direction !== "recv") {
            throw new Error('method can just be called for handlers with "recv" direction');
          }
        }
      };
      exports.Chrome70 = Chrome70;
    }
  });

  // node_modules/mediasoup-client/lib/handlers/sdp/planBUtils.js
  var require_planBUtils = __commonJS({
    "node_modules/mediasoup-client/lib/handlers/sdp/planBUtils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getRtpEncodings = getRtpEncodings;
      exports.addLegacySimulcast = addLegacySimulcast;
      function getRtpEncodings({ offerMediaObject, track }) {
        let firstSsrc;
        const ssrcs = /* @__PURE__ */ new Set();
        for (const line of offerMediaObject.ssrcs ?? []) {
          if (line.attribute !== "msid") {
            continue;
          }
          const trackId = line.value.split(" ")[1];
          if (trackId === track.id) {
            const ssrc = line.id;
            ssrcs.add(ssrc);
            if (!firstSsrc) {
              firstSsrc = ssrc;
            }
          }
        }
        if (ssrcs.size === 0) {
          throw new Error(`a=ssrc line with msid information not found [track.id:${track.id}]`);
        }
        const ssrcToRtxSsrc = /* @__PURE__ */ new Map();
        for (const line of offerMediaObject.ssrcGroups ?? []) {
          if (line.semantics !== "FID") {
            continue;
          }
          let [ssrc, rtxSsrc] = line.ssrcs.split(/\s+/);
          ssrc = Number(ssrc);
          rtxSsrc = Number(rtxSsrc);
          if (ssrcs.has(ssrc)) {
            ssrcs.delete(ssrc);
            ssrcs.delete(rtxSsrc);
            ssrcToRtxSsrc.set(ssrc, rtxSsrc);
          }
        }
        for (const ssrc of ssrcs) {
          ssrcToRtxSsrc.set(ssrc, null);
        }
        const encodings = [];
        for (const [ssrc, rtxSsrc] of ssrcToRtxSsrc) {
          const encoding = { ssrc };
          if (rtxSsrc) {
            encoding.rtx = { ssrc: rtxSsrc };
          }
          encodings.push(encoding);
        }
        return encodings;
      }
      function addLegacySimulcast({ offerMediaObject, track, numStreams }) {
        if (numStreams <= 1) {
          throw new TypeError("numStreams must be greater than 1");
        }
        let firstSsrc;
        let firstRtxSsrc;
        let streamId;
        const ssrcMsidLine = (offerMediaObject.ssrcs ?? []).find((line) => {
          if (line.attribute !== "msid") {
            return false;
          }
          const trackId = line.value.split(" ")[1];
          if (trackId === track.id) {
            firstSsrc = line.id;
            streamId = line.value.split(" ")[0];
            return true;
          } else {
            return false;
          }
        });
        if (!ssrcMsidLine) {
          throw new Error(`a=ssrc line with msid information not found [track.id:${track.id}]`);
        }
        (offerMediaObject.ssrcGroups ?? []).some((line) => {
          if (line.semantics !== "FID") {
            return false;
          }
          const ssrcs2 = line.ssrcs.split(/\s+/);
          if (Number(ssrcs2[0]) === firstSsrc) {
            firstRtxSsrc = Number(ssrcs2[1]);
            return true;
          } else {
            return false;
          }
        });
        const ssrcCnameLine = offerMediaObject.ssrcs.find((line) => line.attribute === "cname" && line.id === firstSsrc);
        if (!ssrcCnameLine) {
          throw new Error(`a=ssrc line with cname information not found [track.id:${track.id}]`);
        }
        const cname = ssrcCnameLine.value;
        const ssrcs = [];
        const rtxSsrcs = [];
        for (let i = 0; i < numStreams; ++i) {
          ssrcs.push(firstSsrc + i);
          if (firstRtxSsrc) {
            rtxSsrcs.push(firstRtxSsrc + i);
          }
        }
        offerMediaObject.ssrcGroups = offerMediaObject.ssrcGroups ?? [];
        offerMediaObject.ssrcs = offerMediaObject.ssrcs ?? [];
        offerMediaObject.ssrcGroups.push({
          semantics: "SIM",
          ssrcs: ssrcs.join(" ")
        });
        for (const ssrc of ssrcs) {
          offerMediaObject.ssrcs.push({
            id: ssrc,
            attribute: "cname",
            value: cname
          });
          offerMediaObject.ssrcs.push({
            id: ssrc,
            attribute: "msid",
            value: `${streamId} ${track.id}`
          });
        }
        for (let i = 0; i < rtxSsrcs.length; ++i) {
          const ssrc = ssrcs[i];
          const rtxSsrc = rtxSsrcs[i];
          offerMediaObject.ssrcs.push({
            id: rtxSsrc,
            attribute: "cname",
            value: cname
          });
          offerMediaObject.ssrcs.push({
            id: rtxSsrc,
            attribute: "msid",
            value: `${streamId} ${track.id}`
          });
          offerMediaObject.ssrcGroups.push({
            semantics: "FID",
            ssrcs: `${ssrc} ${rtxSsrc}`
          });
        }
      }
    }
  });

  // node_modules/mediasoup-client/lib/handlers/Chrome67.js
  var require_Chrome67 = __commonJS({
    "node_modules/mediasoup-client/lib/handlers/Chrome67.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Chrome67 = void 0;
      var sdpTransform = require_lib3();
      var Logger_1 = require_Logger();
      var utils = require_utils();
      var ortc = require_ortc();
      var sdpCommonUtils = require_commonUtils();
      var sdpPlanBUtils = require_planBUtils();
      var HandlerInterface_1 = require_HandlerInterface();
      var RemoteSdp_1 = require_RemoteSdp();
      var logger = new Logger_1.Logger("Chrome67");
      var NAME = "Chrome67";
      var SCTP_NUM_STREAMS = { OS: 1024, MIS: 1024 };
      var Chrome67 = class _Chrome67 extends HandlerInterface_1.HandlerInterface {
        // Handler direction.
        _direction;
        // Remote SDP handler.
        _remoteSdp;
        // Generic sending RTP parameters for audio and video.
        _sendingRtpParametersByKind;
        // Generic sending RTP parameters for audio and video suitable for the SDP
        // remote answer.
        _sendingRemoteRtpParametersByKind;
        // Initial server side DTLS role. If not 'auto', it will force the opposite
        // value in client side.
        _forcedLocalDtlsRole;
        // RTCPeerConnection instance.
        _pc;
        // Local stream for sending.
        _sendStream = new MediaStream();
        // Map of RTCRtpSender indexed by localId.
        _mapSendLocalIdRtpSender = /* @__PURE__ */ new Map();
        // Next sending localId.
        _nextSendLocalId = 0;
        // Map of MID, RTP parameters and RTCRtpReceiver indexed by local id.
        // Value is an Object with mid, rtpParameters and rtpReceiver.
        _mapRecvLocalIdInfo = /* @__PURE__ */ new Map();
        // Whether a DataChannel m=application section has been created.
        _hasDataChannelMediaSection = false;
        // Sending DataChannel id value counter. Incremented for each new DataChannel.
        _nextSendSctpStreamId = 0;
        // Got transport local and remote parameters.
        _transportReady = false;
        /**
         * Creates a factory function.
         */
        static createFactory() {
          return () => new _Chrome67();
        }
        constructor() {
          super();
        }
        get name() {
          return NAME;
        }
        close() {
          logger.debug("close()");
          if (this._pc) {
            try {
              this._pc.close();
            } catch (error) {
            }
          }
          this.emit("@close");
        }
        async getNativeRtpCapabilities() {
          logger.debug("getNativeRtpCapabilities()");
          const pc = new RTCPeerConnection({
            iceServers: [],
            iceTransportPolicy: "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require",
            sdpSemantics: "plan-b"
          });
          try {
            const offer = await pc.createOffer({
              offerToReceiveAudio: true,
              offerToReceiveVideo: true
            });
            try {
              pc.close();
            } catch (error) {
            }
            const sdpObject = sdpTransform.parse(offer.sdp);
            const nativeRtpCapabilities = sdpCommonUtils.extractRtpCapabilities({
              sdpObject
            });
            return nativeRtpCapabilities;
          } catch (error) {
            try {
              pc.close();
            } catch (error2) {
            }
            throw error;
          }
        }
        async getNativeSctpCapabilities() {
          logger.debug("getNativeSctpCapabilities()");
          return {
            numStreams: SCTP_NUM_STREAMS
          };
        }
        run({ direction, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, extendedRtpCapabilities }) {
          logger.debug("run()");
          this._direction = direction;
          this._remoteSdp = new RemoteSdp_1.RemoteSdp({
            iceParameters,
            iceCandidates,
            dtlsParameters,
            sctpParameters,
            planB: true
          });
          this._sendingRtpParametersByKind = {
            audio: ortc.getSendingRtpParameters("audio", extendedRtpCapabilities),
            video: ortc.getSendingRtpParameters("video", extendedRtpCapabilities)
          };
          this._sendingRemoteRtpParametersByKind = {
            audio: ortc.getSendingRemoteRtpParameters("audio", extendedRtpCapabilities),
            video: ortc.getSendingRemoteRtpParameters("video", extendedRtpCapabilities)
          };
          if (dtlsParameters.role && dtlsParameters.role !== "auto") {
            this._forcedLocalDtlsRole = dtlsParameters.role === "server" ? "client" : "server";
          }
          this._pc = new RTCPeerConnection({
            iceServers: iceServers ?? [],
            iceTransportPolicy: iceTransportPolicy ?? "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require",
            sdpSemantics: "plan-b",
            ...additionalSettings
          }, proprietaryConstraints);
          this._pc.addEventListener("icegatheringstatechange", () => {
            this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
          });
          this._pc.addEventListener("icecandidateerror", (event) => {
            this.emit("@icecandidateerror", event);
          });
          if (this._pc.connectionState) {
            this._pc.addEventListener("connectionstatechange", () => {
              this.emit("@connectionstatechange", this._pc.connectionState);
            });
          } else {
            this._pc.addEventListener("iceconnectionstatechange", () => {
              logger.warn("run() | pc.connectionState not supported, using pc.iceConnectionState");
              switch (this._pc.iceConnectionState) {
                case "checking": {
                  this.emit("@connectionstatechange", "connecting");
                  break;
                }
                case "connected":
                case "completed": {
                  this.emit("@connectionstatechange", "connected");
                  break;
                }
                case "failed": {
                  this.emit("@connectionstatechange", "failed");
                  break;
                }
                case "disconnected": {
                  this.emit("@connectionstatechange", "disconnected");
                  break;
                }
                case "closed": {
                  this.emit("@connectionstatechange", "closed");
                  break;
                }
              }
            });
          }
        }
        async updateIceServers(iceServers) {
          logger.debug("updateIceServers()");
          const configuration = this._pc.getConfiguration();
          configuration.iceServers = iceServers;
          this._pc.setConfiguration(configuration);
        }
        async restartIce(iceParameters) {
          logger.debug("restartIce()");
          this._remoteSdp.updateIceParameters(iceParameters);
          if (!this._transportReady) {
            return;
          }
          if (this._direction === "send") {
            const offer = await this._pc.createOffer({ iceRestart: true });
            logger.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", offer);
            await this._pc.setLocalDescription(offer);
            const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
            logger.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setRemoteDescription(answer);
          } else {
            const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
            logger.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", offer);
            await this._pc.setRemoteDescription(offer);
            const answer = await this._pc.createAnswer();
            logger.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", answer);
            await this._pc.setLocalDescription(answer);
          }
        }
        async getTransportStats() {
          return this._pc.getStats();
        }
        async send({ track, encodings, codecOptions, codec }) {
          this.assertSendDirection();
          logger.debug("send() [kind:%s, track.id:%s]", track.kind, track.id);
          if (codec) {
            logger.warn("send() | codec selection is not available in %s handler", this.name);
          }
          this._sendStream.addTrack(track);
          this._pc.addTrack(track, this._sendStream);
          let offer = await this._pc.createOffer();
          let localSdpObject = sdpTransform.parse(offer.sdp);
          if (localSdpObject.extmapAllowMixed) {
            this._remoteSdp.setSessionExtmapAllowMixed();
          }
          let offerMediaObject;
          const sendingRtpParameters = utils.clone(this._sendingRtpParametersByKind[track.kind]);
          sendingRtpParameters.codecs = ortc.reduceCodecs(sendingRtpParameters.codecs);
          const sendingRemoteRtpParameters = utils.clone(this._sendingRemoteRtpParametersByKind[track.kind]);
          sendingRemoteRtpParameters.codecs = ortc.reduceCodecs(sendingRemoteRtpParameters.codecs);
          if (!this._transportReady) {
            await this.setupTransport({
              localDtlsRole: this._forcedLocalDtlsRole ?? "client",
              localSdpObject
            });
          }
          if (track.kind === "video" && encodings && encodings.length > 1) {
            logger.debug("send() | enabling simulcast");
            localSdpObject = sdpTransform.parse(offer.sdp);
            offerMediaObject = localSdpObject.media.find((m) => m.type === "video");
            sdpPlanBUtils.addLegacySimulcast({
              offerMediaObject,
              track,
              numStreams: encodings.length
            });
            offer = { type: "offer", sdp: sdpTransform.write(localSdpObject) };
          }
          logger.debug("send() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          offerMediaObject = localSdpObject.media.find((m) => m.type === track.kind);
          sendingRtpParameters.rtcp.cname = sdpCommonUtils.getCname({
            offerMediaObject
          });
          sendingRtpParameters.encodings = sdpPlanBUtils.getRtpEncodings({
            offerMediaObject,
            track
          });
          if (encodings) {
            for (let idx = 0; idx < sendingRtpParameters.encodings.length; ++idx) {
              if (encodings[idx]) {
                Object.assign(sendingRtpParameters.encodings[idx], encodings[idx]);
              }
            }
          }
          if (sendingRtpParameters.encodings.length > 1 && sendingRtpParameters.codecs[0].mimeType.toLowerCase() === "video/vp8") {
            for (const encoding of sendingRtpParameters.encodings) {
              encoding.scalabilityMode = "L1T3";
            }
          }
          this._remoteSdp.send({
            offerMediaObject,
            offerRtpParameters: sendingRtpParameters,
            answerRtpParameters: sendingRemoteRtpParameters,
            codecOptions
          });
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("send() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
          const localId = String(this._nextSendLocalId);
          this._nextSendLocalId++;
          const rtpSender = this._pc.getSenders().find((s) => s.track === track);
          this._mapSendLocalIdRtpSender.set(localId, rtpSender);
          return {
            localId,
            rtpParameters: sendingRtpParameters,
            rtpSender
          };
        }
        async stopSending(localId) {
          this.assertSendDirection();
          logger.debug("stopSending() [localId:%s]", localId);
          const rtpSender = this._mapSendLocalIdRtpSender.get(localId);
          if (!rtpSender) {
            throw new Error("associated RTCRtpSender not found");
          }
          this._pc.removeTrack(rtpSender);
          if (rtpSender.track) {
            this._sendStream.removeTrack(rtpSender.track);
          }
          this._mapSendLocalIdRtpSender.delete(localId);
          const offer = await this._pc.createOffer();
          logger.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", offer);
          try {
            await this._pc.setLocalDescription(offer);
          } catch (error) {
            if (this._sendStream.getTracks().length === 0) {
              logger.warn("stopSending() | ignoring expected error due no sending tracks: %s", error.toString());
              return;
            }
            throw error;
          }
          if (this._pc.signalingState === "stable") {
            return;
          }
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async pauseSending(localId) {
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async resumeSending(localId) {
        }
        async replaceTrack(localId, track) {
          this.assertSendDirection();
          if (track) {
            logger.debug("replaceTrack() [localId:%s, track.id:%s]", localId, track.id);
          } else {
            logger.debug("replaceTrack() [localId:%s, no track]", localId);
          }
          const rtpSender = this._mapSendLocalIdRtpSender.get(localId);
          if (!rtpSender) {
            throw new Error("associated RTCRtpSender not found");
          }
          const oldTrack = rtpSender.track;
          await rtpSender.replaceTrack(track);
          if (oldTrack) {
            this._sendStream.removeTrack(oldTrack);
          }
          if (track) {
            this._sendStream.addTrack(track);
          }
        }
        async setMaxSpatialLayer(localId, spatialLayer) {
          this.assertSendDirection();
          logger.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", localId, spatialLayer);
          const rtpSender = this._mapSendLocalIdRtpSender.get(localId);
          if (!rtpSender) {
            throw new Error("associated RTCRtpSender not found");
          }
          const parameters = rtpSender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
            if (idx <= spatialLayer) {
              encoding.active = true;
            } else {
              encoding.active = false;
            }
          });
          await rtpSender.setParameters(parameters);
        }
        async setRtpEncodingParameters(localId, params2) {
          this.assertSendDirection();
          logger.debug("setRtpEncodingParameters() [localId:%s, params:%o]", localId, params2);
          const rtpSender = this._mapSendLocalIdRtpSender.get(localId);
          if (!rtpSender) {
            throw new Error("associated RTCRtpSender not found");
          }
          const parameters = rtpSender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
            parameters.encodings[idx] = { ...encoding, ...params2 };
          });
          await rtpSender.setParameters(parameters);
        }
        async getSenderStats(localId) {
          this.assertSendDirection();
          const rtpSender = this._mapSendLocalIdRtpSender.get(localId);
          if (!rtpSender) {
            throw new Error("associated RTCRtpSender not found");
          }
          return rtpSender.getStats();
        }
        async sendDataChannel({ ordered, maxPacketLifeTime, maxRetransmits, label, protocol: protocol4 }) {
          this.assertSendDirection();
          const options = {
            negotiated: true,
            id: this._nextSendSctpStreamId,
            ordered,
            maxPacketLifeTime,
            maxRetransmitTime: maxPacketLifeTime,
            // NOTE: Old spec.
            maxRetransmits,
            protocol: protocol4
          };
          logger.debug("sendDataChannel() [options:%o]", options);
          const dataChannel = this._pc.createDataChannel(label, options);
          this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % SCTP_NUM_STREAMS.MIS;
          if (!this._hasDataChannelMediaSection) {
            const offer = await this._pc.createOffer();
            const localSdpObject = sdpTransform.parse(offer.sdp);
            const offerMediaObject = localSdpObject.media.find((m) => m.type === "application");
            if (!this._transportReady) {
              await this.setupTransport({
                localDtlsRole: this._forcedLocalDtlsRole ?? "client",
                localSdpObject
              });
            }
            logger.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", offer);
            await this._pc.setLocalDescription(offer);
            this._remoteSdp.sendSctpAssociation({ offerMediaObject });
            const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
            logger.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setRemoteDescription(answer);
            this._hasDataChannelMediaSection = true;
          }
          const sctpStreamParameters = {
            streamId: options.id,
            ordered: options.ordered,
            maxPacketLifeTime: options.maxPacketLifeTime,
            maxRetransmits: options.maxRetransmits
          };
          return { dataChannel, sctpStreamParameters };
        }
        async receive(optionsList) {
          this.assertRecvDirection();
          const results = [];
          for (const options of optionsList) {
            const { trackId, kind, rtpParameters, streamId } = options;
            logger.debug("receive() [trackId:%s, kind:%s]", trackId, kind);
            const mid = kind;
            this._remoteSdp.receive({
              mid,
              kind,
              offerRtpParameters: rtpParameters,
              streamId: streamId ?? rtpParameters.rtcp.cname,
              trackId
            });
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          let answer = await this._pc.createAnswer();
          const localSdpObject = sdpTransform.parse(answer.sdp);
          for (const options of optionsList) {
            const { kind, rtpParameters } = options;
            const mid = kind;
            const answerMediaObject = localSdpObject.media.find((m) => String(m.mid) === mid);
            sdpCommonUtils.applyCodecParameters({
              offerRtpParameters: rtpParameters,
              answerMediaObject
            });
          }
          answer = { type: "answer", sdp: sdpTransform.write(localSdpObject) };
          if (!this._transportReady) {
            await this.setupTransport({
              localDtlsRole: this._forcedLocalDtlsRole ?? "client",
              localSdpObject
            });
          }
          logger.debug("receive() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
          for (const options of optionsList) {
            const { kind, trackId, rtpParameters } = options;
            const localId = trackId;
            const mid = kind;
            const rtpReceiver = this._pc.getReceivers().find((r) => r.track && r.track.id === localId);
            if (!rtpReceiver) {
              throw new Error("new RTCRtpReceiver not");
            }
            this._mapRecvLocalIdInfo.set(localId, {
              mid,
              rtpParameters,
              rtpReceiver
            });
            results.push({
              localId,
              track: rtpReceiver.track,
              rtpReceiver
            });
          }
          return results;
        }
        async stopReceiving(localIds) {
          this.assertRecvDirection();
          for (const localId of localIds) {
            logger.debug("stopReceiving() [localId:%s]", localId);
            const { mid, rtpParameters } = this._mapRecvLocalIdInfo.get(localId) ?? {};
            this._mapRecvLocalIdInfo.delete(localId);
            this._remoteSdp.planBStopReceiving({
              mid,
              offerRtpParameters: rtpParameters
            });
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
        }
        async pauseReceiving(localIds) {
        }
        async resumeReceiving(localIds) {
        }
        async getReceiverStats(localId) {
          this.assertRecvDirection();
          const { rtpReceiver } = this._mapRecvLocalIdInfo.get(localId) ?? {};
          if (!rtpReceiver) {
            throw new Error("associated RTCRtpReceiver not found");
          }
          return rtpReceiver.getStats();
        }
        async receiveDataChannel({ sctpStreamParameters, label, protocol: protocol4 }) {
          this.assertRecvDirection();
          const { streamId, ordered, maxPacketLifeTime, maxRetransmits } = sctpStreamParameters;
          const options = {
            negotiated: true,
            id: streamId,
            ordered,
            maxPacketLifeTime,
            maxRetransmitTime: maxPacketLifeTime,
            // NOTE: Old spec.
            maxRetransmits,
            protocol: protocol4
          };
          logger.debug("receiveDataChannel() [options:%o]", options);
          const dataChannel = this._pc.createDataChannel(label, options);
          if (!this._hasDataChannelMediaSection) {
            this._remoteSdp.receiveSctpAssociation({ oldDataChannelSpec: true });
            const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
            logger.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", offer);
            await this._pc.setRemoteDescription(offer);
            const answer = await this._pc.createAnswer();
            if (!this._transportReady) {
              const localSdpObject = sdpTransform.parse(answer.sdp);
              await this.setupTransport({
                localDtlsRole: this._forcedLocalDtlsRole ?? "client",
                localSdpObject
              });
            }
            logger.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setLocalDescription(answer);
            this._hasDataChannelMediaSection = true;
          }
          return { dataChannel };
        }
        async setupTransport({ localDtlsRole, localSdpObject }) {
          if (!localSdpObject) {
            localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          }
          const dtlsParameters = sdpCommonUtils.extractDtlsParameters({
            sdpObject: localSdpObject
          });
          dtlsParameters.role = localDtlsRole;
          this._remoteSdp.updateDtlsRole(localDtlsRole === "client" ? "server" : "client");
          await new Promise((resolve, reject) => {
            this.safeEmit("@connect", { dtlsParameters }, resolve, reject);
          });
          this._transportReady = true;
        }
        assertSendDirection() {
          if (this._direction !== "send") {
            throw new Error('method can just be called for handlers with "send" direction');
          }
        }
        assertRecvDirection() {
          if (this._direction !== "recv") {
            throw new Error('method can just be called for handlers with "recv" direction');
          }
        }
      };
      exports.Chrome67 = Chrome67;
    }
  });

  // node_modules/mediasoup-client/lib/handlers/Chrome55.js
  var require_Chrome55 = __commonJS({
    "node_modules/mediasoup-client/lib/handlers/Chrome55.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Chrome55 = void 0;
      var sdpTransform = require_lib3();
      var Logger_1 = require_Logger();
      var errors_1 = require_errors();
      var utils = require_utils();
      var ortc = require_ortc();
      var sdpCommonUtils = require_commonUtils();
      var sdpPlanBUtils = require_planBUtils();
      var HandlerInterface_1 = require_HandlerInterface();
      var RemoteSdp_1 = require_RemoteSdp();
      var logger = new Logger_1.Logger("Chrome55");
      var NAME = "Chrome55";
      var SCTP_NUM_STREAMS = { OS: 1024, MIS: 1024 };
      var Chrome55 = class _Chrome55 extends HandlerInterface_1.HandlerInterface {
        // Handler direction.
        _direction;
        // Remote SDP handler.
        _remoteSdp;
        // Generic sending RTP parameters for audio and video.
        _sendingRtpParametersByKind;
        // Generic sending RTP parameters for audio and video suitable for the SDP
        // remote answer.
        _sendingRemoteRtpParametersByKind;
        // Initial server side DTLS role. If not 'auto', it will force the opposite
        // value in client side.
        _forcedLocalDtlsRole;
        // RTCPeerConnection instance.
        _pc;
        // Local stream for sending.
        _sendStream = new MediaStream();
        // Map of sending MediaStreamTracks indexed by localId.
        _mapSendLocalIdTrack = /* @__PURE__ */ new Map();
        // Next sending localId.
        _nextSendLocalId = 0;
        // Map of MID, RTP parameters and RTCRtpReceiver indexed by local id.
        // Value is an Object with mid, rtpParameters and rtpReceiver.
        _mapRecvLocalIdInfo = /* @__PURE__ */ new Map();
        // Whether a DataChannel m=application section has been created.
        _hasDataChannelMediaSection = false;
        // Sending DataChannel id value counter. Incremented for each new DataChannel.
        _nextSendSctpStreamId = 0;
        // Got transport local and remote parameters.
        _transportReady = false;
        /**
         * Creates a factory function.
         */
        static createFactory() {
          return () => new _Chrome55();
        }
        constructor() {
          super();
        }
        get name() {
          return NAME;
        }
        close() {
          logger.debug("close()");
          if (this._pc) {
            try {
              this._pc.close();
            } catch (error) {
            }
          }
          this.emit("@close");
        }
        async getNativeRtpCapabilities() {
          logger.debug("getNativeRtpCapabilities()");
          const pc = new RTCPeerConnection({
            iceServers: [],
            iceTransportPolicy: "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require",
            sdpSemantics: "plan-b"
          });
          try {
            const offer = await pc.createOffer({
              offerToReceiveAudio: true,
              offerToReceiveVideo: true
            });
            try {
              pc.close();
            } catch (error) {
            }
            const sdpObject = sdpTransform.parse(offer.sdp);
            const nativeRtpCapabilities = sdpCommonUtils.extractRtpCapabilities({
              sdpObject
            });
            return nativeRtpCapabilities;
          } catch (error) {
            try {
              pc.close();
            } catch (error2) {
            }
            throw error;
          }
        }
        async getNativeSctpCapabilities() {
          logger.debug("getNativeSctpCapabilities()");
          return {
            numStreams: SCTP_NUM_STREAMS
          };
        }
        run({ direction, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, extendedRtpCapabilities }) {
          logger.debug("run()");
          this._direction = direction;
          this._remoteSdp = new RemoteSdp_1.RemoteSdp({
            iceParameters,
            iceCandidates,
            dtlsParameters,
            sctpParameters,
            planB: true
          });
          this._sendingRtpParametersByKind = {
            audio: ortc.getSendingRtpParameters("audio", extendedRtpCapabilities),
            video: ortc.getSendingRtpParameters("video", extendedRtpCapabilities)
          };
          this._sendingRemoteRtpParametersByKind = {
            audio: ortc.getSendingRemoteRtpParameters("audio", extendedRtpCapabilities),
            video: ortc.getSendingRemoteRtpParameters("video", extendedRtpCapabilities)
          };
          if (dtlsParameters.role && dtlsParameters.role !== "auto") {
            this._forcedLocalDtlsRole = dtlsParameters.role === "server" ? "client" : "server";
          }
          this._pc = new RTCPeerConnection({
            iceServers: iceServers ?? [],
            iceTransportPolicy: iceTransportPolicy ?? "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require",
            sdpSemantics: "plan-b",
            ...additionalSettings
          }, proprietaryConstraints);
          this._pc.addEventListener("icegatheringstatechange", () => {
            this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
          });
          this._pc.addEventListener("icecandidateerror", (event) => {
            this.emit("@icecandidateerror", event);
          });
          if (this._pc.connectionState) {
            this._pc.addEventListener("connectionstatechange", () => {
              this.emit("@connectionstatechange", this._pc.connectionState);
            });
          } else {
            this._pc.addEventListener("iceconnectionstatechange", () => {
              logger.warn("run() | pc.connectionState not supported, using pc.iceConnectionState");
              switch (this._pc.iceConnectionState) {
                case "checking": {
                  this.emit("@connectionstatechange", "connecting");
                  break;
                }
                case "connected":
                case "completed": {
                  this.emit("@connectionstatechange", "connected");
                  break;
                }
                case "failed": {
                  this.emit("@connectionstatechange", "failed");
                  break;
                }
                case "disconnected": {
                  this.emit("@connectionstatechange", "disconnected");
                  break;
                }
                case "closed": {
                  this.emit("@connectionstatechange", "closed");
                  break;
                }
              }
            });
          }
        }
        async updateIceServers(iceServers) {
          logger.debug("updateIceServers()");
          const configuration = this._pc.getConfiguration();
          configuration.iceServers = iceServers;
          this._pc.setConfiguration(configuration);
        }
        async restartIce(iceParameters) {
          logger.debug("restartIce()");
          this._remoteSdp.updateIceParameters(iceParameters);
          if (!this._transportReady) {
            return;
          }
          if (this._direction === "send") {
            const offer = await this._pc.createOffer({ iceRestart: true });
            logger.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", offer);
            await this._pc.setLocalDescription(offer);
            const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
            logger.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setRemoteDescription(answer);
          } else {
            const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
            logger.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", offer);
            await this._pc.setRemoteDescription(offer);
            const answer = await this._pc.createAnswer();
            logger.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", answer);
            await this._pc.setLocalDescription(answer);
          }
        }
        async getTransportStats() {
          return this._pc.getStats();
        }
        async send({ track, encodings, codecOptions, codec }) {
          this.assertSendDirection();
          logger.debug("send() [kind:%s, track.id:%s]", track.kind, track.id);
          if (codec) {
            logger.warn("send() | codec selection is not available in %s handler", this.name);
          }
          this._sendStream.addTrack(track);
          this._pc.addStream(this._sendStream);
          let offer = await this._pc.createOffer();
          let localSdpObject = sdpTransform.parse(offer.sdp);
          if (localSdpObject.extmapAllowMixed) {
            this._remoteSdp.setSessionExtmapAllowMixed();
          }
          let offerMediaObject;
          const sendingRtpParameters = utils.clone(this._sendingRtpParametersByKind[track.kind]);
          sendingRtpParameters.codecs = ortc.reduceCodecs(sendingRtpParameters.codecs);
          const sendingRemoteRtpParameters = utils.clone(this._sendingRemoteRtpParametersByKind[track.kind]);
          sendingRemoteRtpParameters.codecs = ortc.reduceCodecs(sendingRemoteRtpParameters.codecs);
          if (!this._transportReady) {
            await this.setupTransport({
              localDtlsRole: this._forcedLocalDtlsRole ?? "client",
              localSdpObject
            });
          }
          if (track.kind === "video" && encodings && encodings.length > 1) {
            logger.debug("send() | enabling simulcast");
            localSdpObject = sdpTransform.parse(offer.sdp);
            offerMediaObject = localSdpObject.media.find((m) => m.type === "video");
            sdpPlanBUtils.addLegacySimulcast({
              offerMediaObject,
              track,
              numStreams: encodings.length
            });
            offer = { type: "offer", sdp: sdpTransform.write(localSdpObject) };
          }
          logger.debug("send() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          offerMediaObject = localSdpObject.media.find((m) => m.type === track.kind);
          sendingRtpParameters.rtcp.cname = sdpCommonUtils.getCname({
            offerMediaObject
          });
          sendingRtpParameters.encodings = sdpPlanBUtils.getRtpEncodings({
            offerMediaObject,
            track
          });
          if (encodings) {
            for (let idx = 0; idx < sendingRtpParameters.encodings.length; ++idx) {
              if (encodings[idx]) {
                Object.assign(sendingRtpParameters.encodings[idx], encodings[idx]);
              }
            }
          }
          if (sendingRtpParameters.encodings.length > 1 && sendingRtpParameters.codecs[0].mimeType.toLowerCase() === "video/vp8") {
            for (const encoding of sendingRtpParameters.encodings) {
              encoding.scalabilityMode = "L1T3";
            }
          }
          this._remoteSdp.send({
            offerMediaObject,
            offerRtpParameters: sendingRtpParameters,
            answerRtpParameters: sendingRemoteRtpParameters,
            codecOptions
          });
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("send() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
          const localId = String(this._nextSendLocalId);
          this._nextSendLocalId++;
          this._mapSendLocalIdTrack.set(localId, track);
          return {
            localId,
            rtpParameters: sendingRtpParameters
          };
        }
        async stopSending(localId) {
          this.assertSendDirection();
          logger.debug("stopSending() [localId:%s]", localId);
          const track = this._mapSendLocalIdTrack.get(localId);
          if (!track) {
            throw new Error("track not found");
          }
          this._mapSendLocalIdTrack.delete(localId);
          this._sendStream.removeTrack(track);
          this._pc.addStream(this._sendStream);
          const offer = await this._pc.createOffer();
          logger.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", offer);
          try {
            await this._pc.setLocalDescription(offer);
          } catch (error) {
            if (this._sendStream.getTracks().length === 0) {
              logger.warn("stopSending() | ignoring expected error due no sending tracks: %s", error.toString());
              return;
            }
            throw error;
          }
          if (this._pc.signalingState === "stable") {
            return;
          }
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async pauseSending(localId) {
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async resumeSending(localId) {
        }
        async replaceTrack(localId, track) {
          throw new errors_1.UnsupportedError("not implemented");
        }
        async setMaxSpatialLayer(localId, spatialLayer) {
          throw new errors_1.UnsupportedError(" not implemented");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async setRtpEncodingParameters(localId, params2) {
          throw new errors_1.UnsupportedError("not supported");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async getSenderStats(localId) {
          throw new errors_1.UnsupportedError("not implemented");
        }
        async sendDataChannel({ ordered, maxPacketLifeTime, maxRetransmits, label, protocol: protocol4 }) {
          this.assertSendDirection();
          const options = {
            negotiated: true,
            id: this._nextSendSctpStreamId,
            ordered,
            maxPacketLifeTime,
            maxRetransmitTime: maxPacketLifeTime,
            // NOTE: Old spec.
            maxRetransmits,
            protocol: protocol4
          };
          logger.debug("sendDataChannel() [options:%o]", options);
          const dataChannel = this._pc.createDataChannel(label, options);
          this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % SCTP_NUM_STREAMS.MIS;
          if (!this._hasDataChannelMediaSection) {
            const offer = await this._pc.createOffer();
            const localSdpObject = sdpTransform.parse(offer.sdp);
            const offerMediaObject = localSdpObject.media.find((m) => m.type === "application");
            if (!this._transportReady) {
              await this.setupTransport({
                localDtlsRole: this._forcedLocalDtlsRole ?? "client",
                localSdpObject
              });
            }
            logger.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", offer);
            await this._pc.setLocalDescription(offer);
            this._remoteSdp.sendSctpAssociation({ offerMediaObject });
            const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
            logger.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setRemoteDescription(answer);
            this._hasDataChannelMediaSection = true;
          }
          const sctpStreamParameters = {
            streamId: options.id,
            ordered: options.ordered,
            maxPacketLifeTime: options.maxPacketLifeTime,
            maxRetransmits: options.maxRetransmits
          };
          return { dataChannel, sctpStreamParameters };
        }
        async receive(optionsList) {
          this.assertRecvDirection();
          const results = [];
          for (const options of optionsList) {
            const { trackId, kind, rtpParameters, streamId } = options;
            logger.debug("receive() [trackId:%s, kind:%s]", trackId, kind);
            const mid = kind;
            this._remoteSdp.receive({
              mid,
              kind,
              offerRtpParameters: rtpParameters,
              streamId: streamId ?? rtpParameters.rtcp.cname,
              trackId
            });
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          let answer = await this._pc.createAnswer();
          const localSdpObject = sdpTransform.parse(answer.sdp);
          for (const options of optionsList) {
            const { kind, rtpParameters } = options;
            const mid = kind;
            const answerMediaObject = localSdpObject.media.find((m) => String(m.mid) === mid);
            sdpCommonUtils.applyCodecParameters({
              offerRtpParameters: rtpParameters,
              answerMediaObject
            });
          }
          answer = { type: "answer", sdp: sdpTransform.write(localSdpObject) };
          if (!this._transportReady) {
            await this.setupTransport({
              localDtlsRole: this._forcedLocalDtlsRole ?? "client",
              localSdpObject
            });
          }
          logger.debug("receive() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
          for (const options of optionsList) {
            const { kind, trackId, rtpParameters } = options;
            const mid = kind;
            const localId = trackId;
            const streamId = options.streamId ?? rtpParameters.rtcp.cname;
            const stream = this._pc.getRemoteStreams().find((s) => s.id === streamId);
            const track = stream.getTrackById(localId);
            if (!track) {
              throw new Error("remote track not found");
            }
            this._mapRecvLocalIdInfo.set(localId, { mid, rtpParameters });
            results.push({ localId, track });
          }
          return results;
        }
        async stopReceiving(localIds) {
          this.assertRecvDirection();
          for (const localId of localIds) {
            logger.debug("stopReceiving() [localId:%s]", localId);
            const { mid, rtpParameters } = this._mapRecvLocalIdInfo.get(localId) ?? {};
            this._mapRecvLocalIdInfo.delete(localId);
            this._remoteSdp.planBStopReceiving({
              mid,
              offerRtpParameters: rtpParameters
            });
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
        }
        async pauseReceiving(localIds) {
        }
        async resumeReceiving(localIds) {
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async getReceiverStats(localId) {
          throw new errors_1.UnsupportedError("not implemented");
        }
        async receiveDataChannel({ sctpStreamParameters, label, protocol: protocol4 }) {
          this.assertRecvDirection();
          const { streamId, ordered, maxPacketLifeTime, maxRetransmits } = sctpStreamParameters;
          const options = {
            negotiated: true,
            id: streamId,
            ordered,
            maxPacketLifeTime,
            maxRetransmitTime: maxPacketLifeTime,
            // NOTE: Old spec.
            maxRetransmits,
            protocol: protocol4
          };
          logger.debug("receiveDataChannel() [options:%o]", options);
          const dataChannel = this._pc.createDataChannel(label, options);
          if (!this._hasDataChannelMediaSection) {
            this._remoteSdp.receiveSctpAssociation({ oldDataChannelSpec: true });
            const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
            logger.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", offer);
            await this._pc.setRemoteDescription(offer);
            const answer = await this._pc.createAnswer();
            if (!this._transportReady) {
              const localSdpObject = sdpTransform.parse(answer.sdp);
              await this.setupTransport({
                localDtlsRole: this._forcedLocalDtlsRole ?? "client",
                localSdpObject
              });
            }
            logger.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setLocalDescription(answer);
            this._hasDataChannelMediaSection = true;
          }
          return { dataChannel };
        }
        async setupTransport({ localDtlsRole, localSdpObject }) {
          if (!localSdpObject) {
            localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          }
          const dtlsParameters = sdpCommonUtils.extractDtlsParameters({
            sdpObject: localSdpObject
          });
          dtlsParameters.role = localDtlsRole;
          this._remoteSdp.updateDtlsRole(localDtlsRole === "client" ? "server" : "client");
          await new Promise((resolve, reject) => {
            this.safeEmit("@connect", { dtlsParameters }, resolve, reject);
          });
          this._transportReady = true;
        }
        assertSendDirection() {
          if (this._direction !== "send") {
            throw new Error('method can just be called for handlers with "send" direction');
          }
        }
        assertRecvDirection() {
          if (this._direction !== "recv") {
            throw new Error('method can just be called for handlers with "recv" direction');
          }
        }
      };
      exports.Chrome55 = Chrome55;
    }
  });

  // node_modules/mediasoup-client/lib/handlers/Firefox120.js
  var require_Firefox120 = __commonJS({
    "node_modules/mediasoup-client/lib/handlers/Firefox120.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Firefox120 = void 0;
      var sdpTransform = require_lib3();
      var Logger_1 = require_Logger();
      var errors_1 = require_errors();
      var utils = require_utils();
      var ortc = require_ortc();
      var sdpCommonUtils = require_commonUtils();
      var sdpUnifiedPlanUtils = require_unifiedPlanUtils();
      var HandlerInterface_1 = require_HandlerInterface();
      var RemoteSdp_1 = require_RemoteSdp();
      var scalabilityModes_1 = require_scalabilityModes();
      var logger = new Logger_1.Logger("Firefox120");
      var NAME = "Firefox120";
      var SCTP_NUM_STREAMS = { OS: 16, MIS: 2048 };
      var Firefox120 = class _Firefox120 extends HandlerInterface_1.HandlerInterface {
        // Closed flag.
        _closed = false;
        // Handler direction.
        _direction;
        // Remote SDP handler.
        _remoteSdp;
        // Generic sending RTP parameters for audio and video.
        _sendingRtpParametersByKind;
        // Generic sending RTP parameters for audio and video suitable for the SDP
        // remote answer.
        _sendingRemoteRtpParametersByKind;
        // RTCPeerConnection instance.
        _pc;
        // Map of RTCTransceivers indexed by MID.
        _mapMidTransceiver = /* @__PURE__ */ new Map();
        // Local stream for sending.
        _sendStream = new MediaStream();
        // Whether a DataChannel m=application section has been created.
        _hasDataChannelMediaSection = false;
        // Sending DataChannel id value counter. Incremented for each new DataChannel.
        _nextSendSctpStreamId = 0;
        // Got transport local and remote parameters.
        _transportReady = false;
        /**
         * Creates a factory function.
         */
        static createFactory() {
          return () => new _Firefox120();
        }
        constructor() {
          super();
        }
        get name() {
          return NAME;
        }
        close() {
          logger.debug("close()");
          if (this._closed) {
            return;
          }
          this._closed = true;
          if (this._pc) {
            try {
              this._pc.close();
            } catch (error) {
            }
          }
          this.emit("@close");
        }
        async getNativeRtpCapabilities() {
          logger.debug("getNativeRtpCapabilities()");
          const pc = new RTCPeerConnection({
            iceServers: [],
            iceTransportPolicy: "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require"
          });
          const canvas = document.createElement("canvas");
          canvas.getContext("2d");
          const fakeStream = canvas.captureStream();
          const fakeVideoTrack = fakeStream.getVideoTracks()[0];
          try {
            pc.addTransceiver("audio", { direction: "sendrecv" });
            pc.addTransceiver(fakeVideoTrack, {
              direction: "sendrecv",
              sendEncodings: [
                { rid: "r0", maxBitrate: 1e5 },
                { rid: "r1", maxBitrate: 5e5 }
              ]
            });
            const offer = await pc.createOffer();
            try {
              canvas.remove();
            } catch (error) {
            }
            try {
              fakeVideoTrack.stop();
            } catch (error) {
            }
            try {
              pc.close();
            } catch (error) {
            }
            const sdpObject = sdpTransform.parse(offer.sdp);
            const nativeRtpCapabilities = sdpCommonUtils.extractRtpCapabilities({
              sdpObject
            });
            return nativeRtpCapabilities;
          } catch (error) {
            try {
              canvas.remove();
            } catch (error2) {
            }
            try {
              fakeVideoTrack.stop();
            } catch (error2) {
            }
            try {
              pc.close();
            } catch (error2) {
            }
            throw error;
          }
        }
        async getNativeSctpCapabilities() {
          logger.debug("getNativeSctpCapabilities()");
          return {
            numStreams: SCTP_NUM_STREAMS
          };
        }
        run({ direction, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, extendedRtpCapabilities }) {
          this.assertNotClosed();
          logger.debug("run()");
          this._direction = direction;
          this._remoteSdp = new RemoteSdp_1.RemoteSdp({
            iceParameters,
            iceCandidates,
            dtlsParameters,
            sctpParameters
          });
          this._sendingRtpParametersByKind = {
            audio: ortc.getSendingRtpParameters("audio", extendedRtpCapabilities),
            video: ortc.getSendingRtpParameters("video", extendedRtpCapabilities)
          };
          this._sendingRemoteRtpParametersByKind = {
            audio: ortc.getSendingRemoteRtpParameters("audio", extendedRtpCapabilities),
            video: ortc.getSendingRemoteRtpParameters("video", extendedRtpCapabilities)
          };
          this._pc = new RTCPeerConnection({
            iceServers: iceServers ?? [],
            iceTransportPolicy: iceTransportPolicy ?? "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require",
            ...additionalSettings
          }, proprietaryConstraints);
          this._pc.addEventListener("icegatheringstatechange", () => {
            this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
          });
          this._pc.addEventListener("icecandidateerror", (event) => {
            this.emit("@icecandidateerror", event);
          });
          if (this._pc.connectionState) {
            this._pc.addEventListener("connectionstatechange", () => {
              this.emit("@connectionstatechange", this._pc.connectionState);
            });
          } else {
            this._pc.addEventListener("iceconnectionstatechange", () => {
              logger.warn("run() | pc.connectionState not supported, using pc.iceConnectionState");
              switch (this._pc.iceConnectionState) {
                case "checking": {
                  this.emit("@connectionstatechange", "connecting");
                  break;
                }
                case "connected":
                case "completed": {
                  this.emit("@connectionstatechange", "connected");
                  break;
                }
                case "failed": {
                  this.emit("@connectionstatechange", "failed");
                  break;
                }
                case "disconnected": {
                  this.emit("@connectionstatechange", "disconnected");
                  break;
                }
                case "closed": {
                  this.emit("@connectionstatechange", "closed");
                  break;
                }
              }
            });
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async updateIceServers(iceServers) {
          this.assertNotClosed();
          throw new errors_1.UnsupportedError("not supported");
        }
        async restartIce(iceParameters) {
          this.assertNotClosed();
          logger.debug("restartIce()");
          this._remoteSdp.updateIceParameters(iceParameters);
          if (!this._transportReady) {
            return;
          }
          if (this._direction === "send") {
            const offer = await this._pc.createOffer({ iceRestart: true });
            logger.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", offer);
            await this._pc.setLocalDescription(offer);
            const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
            logger.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setRemoteDescription(answer);
          } else {
            const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
            logger.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", offer);
            await this._pc.setRemoteDescription(offer);
            const answer = await this._pc.createAnswer();
            logger.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", answer);
            await this._pc.setLocalDescription(answer);
          }
        }
        async getTransportStats() {
          this.assertNotClosed();
          return this._pc.getStats();
        }
        async send({ track, encodings, codecOptions, codec, onRtpSender }) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("send() [kind:%s, track.id:%s]", track.kind, track.id);
          if (encodings && encodings.length > 1) {
            encodings.forEach((encoding, idx) => {
              encoding.rid = `r${idx}`;
            });
          }
          const sendingRtpParameters = utils.clone(this._sendingRtpParametersByKind[track.kind]);
          sendingRtpParameters.codecs = ortc.reduceCodecs(sendingRtpParameters.codecs, codec);
          const sendingRemoteRtpParameters = utils.clone(this._sendingRemoteRtpParametersByKind[track.kind]);
          sendingRemoteRtpParameters.codecs = ortc.reduceCodecs(sendingRemoteRtpParameters.codecs, codec);
          const transceiver = this._pc.addTransceiver(track, {
            direction: "sendonly",
            streams: [this._sendStream],
            sendEncodings: encodings
          });
          if (onRtpSender) {
            onRtpSender(transceiver.sender);
          }
          const offer = await this._pc.createOffer();
          let localSdpObject = sdpTransform.parse(offer.sdp);
          if (localSdpObject.extmapAllowMixed) {
            this._remoteSdp.setSessionExtmapAllowMixed();
          }
          if (!this._transportReady) {
            await this.setupTransport({ localDtlsRole: "client", localSdpObject });
          }
          const layers = (0, scalabilityModes_1.parse)((encodings ?? [{}])[0].scalabilityMode);
          logger.debug("send() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const localId = transceiver.mid;
          sendingRtpParameters.mid = localId;
          localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          const offerMediaObject = localSdpObject.media[localSdpObject.media.length - 1];
          sendingRtpParameters.rtcp.cname = sdpCommonUtils.getCname({
            offerMediaObject
          });
          if (!encodings) {
            sendingRtpParameters.encodings = sdpUnifiedPlanUtils.getRtpEncodings({
              offerMediaObject
            });
          } else if (encodings.length === 1) {
            const newEncodings = sdpUnifiedPlanUtils.getRtpEncodings({
              offerMediaObject
            });
            Object.assign(newEncodings[0], encodings[0]);
            sendingRtpParameters.encodings = newEncodings;
          } else {
            sendingRtpParameters.encodings = encodings;
          }
          if (sendingRtpParameters.encodings.length > 1 && (sendingRtpParameters.codecs[0].mimeType.toLowerCase() === "video/vp8" || sendingRtpParameters.codecs[0].mimeType.toLowerCase() === "video/h264")) {
            for (const encoding of sendingRtpParameters.encodings) {
              if (encoding.scalabilityMode) {
                encoding.scalabilityMode = `L1T${layers.temporalLayers}`;
              } else {
                encoding.scalabilityMode = "L1T3";
              }
            }
          }
          this._remoteSdp.send({
            offerMediaObject,
            offerRtpParameters: sendingRtpParameters,
            answerRtpParameters: sendingRemoteRtpParameters,
            codecOptions
          });
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("send() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
          this._mapMidTransceiver.set(localId, transceiver);
          return {
            localId,
            rtpParameters: sendingRtpParameters,
            rtpSender: transceiver.sender
          };
        }
        async stopSending(localId) {
          this.assertSendDirection();
          logger.debug("stopSending() [localId:%s]", localId);
          if (this._closed) {
            return;
          }
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated transceiver not found");
          }
          void transceiver.sender.replaceTrack(null);
          this._pc.removeTrack(transceiver.sender);
          this._remoteSdp.disableMediaSection(transceiver.mid);
          const offer = await this._pc.createOffer();
          logger.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
          this._mapMidTransceiver.delete(localId);
        }
        async pauseSending(localId) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("pauseSending() [localId:%s]", localId);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          transceiver.direction = "inactive";
          this._remoteSdp.pauseMediaSection(localId);
          const offer = await this._pc.createOffer();
          logger.debug("pauseSending() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("pauseSending() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async resumeSending(localId) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("resumeSending() [localId:%s]", localId);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          transceiver.direction = "sendonly";
          this._remoteSdp.resumeSendingMediaSection(localId);
          const offer = await this._pc.createOffer();
          logger.debug("resumeSending() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("resumeSending() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async replaceTrack(localId, track) {
          this.assertNotClosed();
          this.assertSendDirection();
          if (track) {
            logger.debug("replaceTrack() [localId:%s, track.id:%s]", localId, track.id);
          } else {
            logger.debug("replaceTrack() [localId:%s, no track]", localId);
          }
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          await transceiver.sender.replaceTrack(track);
        }
        async setMaxSpatialLayer(localId, spatialLayer) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", localId, spatialLayer);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated transceiver not found");
          }
          const parameters = transceiver.sender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
            if (idx <= spatialLayer) {
              encoding.active = true;
            } else {
              encoding.active = false;
            }
          });
          await transceiver.sender.setParameters(parameters);
          this._remoteSdp.muxMediaSectionSimulcast(localId, parameters.encodings);
          const offer = await this._pc.createOffer();
          logger.debug("setMaxSpatialLayer() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("setMaxSpatialLayer() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async setRtpEncodingParameters(localId, params2) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("setRtpEncodingParameters() [localId:%s, params:%o]", localId, params2);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          const parameters = transceiver.sender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
            parameters.encodings[idx] = { ...encoding, ...params2 };
          });
          await transceiver.sender.setParameters(parameters);
          this._remoteSdp.muxMediaSectionSimulcast(localId, parameters.encodings);
          const offer = await this._pc.createOffer();
          logger.debug("setRtpEncodingParameters() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("setRtpEncodingParameters() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async getSenderStats(localId) {
          this.assertNotClosed();
          this.assertSendDirection();
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          return transceiver.sender.getStats();
        }
        async sendDataChannel({ ordered, maxPacketLifeTime, maxRetransmits, label, protocol: protocol4 }) {
          this.assertNotClosed();
          this.assertSendDirection();
          const options = {
            negotiated: true,
            id: this._nextSendSctpStreamId,
            ordered,
            maxPacketLifeTime,
            maxRetransmits,
            protocol: protocol4
          };
          logger.debug("sendDataChannel() [options:%o]", options);
          const dataChannel = this._pc.createDataChannel(label, options);
          this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % SCTP_NUM_STREAMS.MIS;
          if (!this._hasDataChannelMediaSection) {
            const offer = await this._pc.createOffer();
            const localSdpObject = sdpTransform.parse(offer.sdp);
            const offerMediaObject = localSdpObject.media.find((m) => m.type === "application");
            if (!this._transportReady) {
              await this.setupTransport({ localDtlsRole: "client", localSdpObject });
            }
            logger.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", offer);
            await this._pc.setLocalDescription(offer);
            this._remoteSdp.sendSctpAssociation({ offerMediaObject });
            const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
            logger.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setRemoteDescription(answer);
            this._hasDataChannelMediaSection = true;
          }
          const sctpStreamParameters = {
            streamId: options.id,
            ordered: options.ordered,
            maxPacketLifeTime: options.maxPacketLifeTime,
            maxRetransmits: options.maxRetransmits
          };
          return { dataChannel, sctpStreamParameters };
        }
        async receive(optionsList) {
          this.assertNotClosed();
          this.assertRecvDirection();
          const results = [];
          const mapLocalId = /* @__PURE__ */ new Map();
          for (const options of optionsList) {
            const { trackId, kind, rtpParameters, streamId } = options;
            logger.debug("receive() [trackId:%s, kind:%s]", trackId, kind);
            const localId = rtpParameters.mid ?? String(this._mapMidTransceiver.size);
            mapLocalId.set(trackId, localId);
            this._remoteSdp.receive({
              mid: localId,
              kind,
              offerRtpParameters: rtpParameters,
              streamId: streamId ?? rtpParameters.rtcp.cname,
              trackId
            });
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          for (const options of optionsList) {
            const { trackId, onRtpReceiver } = options;
            if (onRtpReceiver) {
              const localId = mapLocalId.get(trackId);
              const transceiver = this._pc.getTransceivers().find((t) => t.mid === localId);
              if (!transceiver) {
                throw new Error("transceiver not found");
              }
              onRtpReceiver(transceiver.receiver);
            }
          }
          let answer = await this._pc.createAnswer();
          const localSdpObject = sdpTransform.parse(answer.sdp);
          for (const options of optionsList) {
            const { trackId, rtpParameters } = options;
            const localId = mapLocalId.get(trackId);
            const answerMediaObject = localSdpObject.media.find((m) => String(m.mid) === localId);
            sdpCommonUtils.applyCodecParameters({
              offerRtpParameters: rtpParameters,
              answerMediaObject
            });
            answer = { type: "answer", sdp: sdpTransform.write(localSdpObject) };
          }
          if (!this._transportReady) {
            await this.setupTransport({ localDtlsRole: "client", localSdpObject });
          }
          logger.debug("receive() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
          for (const options of optionsList) {
            const { trackId } = options;
            const localId = mapLocalId.get(trackId);
            const transceiver = this._pc.getTransceivers().find((t) => t.mid === localId);
            if (!transceiver) {
              throw new Error("new RTCRtpTransceiver not found");
            }
            this._mapMidTransceiver.set(localId, transceiver);
            results.push({
              localId,
              track: transceiver.receiver.track,
              rtpReceiver: transceiver.receiver
            });
          }
          return results;
        }
        async stopReceiving(localIds) {
          this.assertRecvDirection();
          if (this._closed) {
            return;
          }
          for (const localId of localIds) {
            logger.debug("stopReceiving() [localId:%s]", localId);
            const transceiver = this._mapMidTransceiver.get(localId);
            if (!transceiver) {
              throw new Error("associated RTCRtpTransceiver not found");
            }
            this._remoteSdp.closeMediaSection(transceiver.mid);
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
          for (const localId of localIds) {
            this._mapMidTransceiver.delete(localId);
          }
        }
        async pauseReceiving(localIds) {
          this.assertNotClosed();
          this.assertRecvDirection();
          for (const localId of localIds) {
            logger.debug("pauseReceiving() [localId:%s]", localId);
            const transceiver = this._mapMidTransceiver.get(localId);
            if (!transceiver) {
              throw new Error("associated RTCRtpTransceiver not found");
            }
            transceiver.direction = "inactive";
            this._remoteSdp.pauseMediaSection(localId);
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("pauseReceiving() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug("pauseReceiving() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
        }
        async resumeReceiving(localIds) {
          this.assertNotClosed();
          this.assertRecvDirection();
          for (const localId of localIds) {
            logger.debug("resumeReceiving() [localId:%s]", localId);
            const transceiver = this._mapMidTransceiver.get(localId);
            if (!transceiver) {
              throw new Error("associated RTCRtpTransceiver not found");
            }
            transceiver.direction = "recvonly";
            this._remoteSdp.resumeReceivingMediaSection(localId);
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("resumeReceiving() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug("resumeReceiving() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
        }
        async getReceiverStats(localId) {
          this.assertRecvDirection();
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          return transceiver.receiver.getStats();
        }
        async receiveDataChannel({ sctpStreamParameters, label, protocol: protocol4 }) {
          this.assertNotClosed();
          this.assertRecvDirection();
          const { streamId, ordered, maxPacketLifeTime, maxRetransmits } = sctpStreamParameters;
          const options = {
            negotiated: true,
            id: streamId,
            ordered,
            maxPacketLifeTime,
            maxRetransmits,
            protocol: protocol4
          };
          logger.debug("receiveDataChannel() [options:%o]", options);
          const dataChannel = this._pc.createDataChannel(label, options);
          if (!this._hasDataChannelMediaSection) {
            this._remoteSdp.receiveSctpAssociation();
            const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
            logger.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", offer);
            await this._pc.setRemoteDescription(offer);
            const answer = await this._pc.createAnswer();
            if (!this._transportReady) {
              const localSdpObject = sdpTransform.parse(answer.sdp);
              await this.setupTransport({ localDtlsRole: "client", localSdpObject });
            }
            logger.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setLocalDescription(answer);
            this._hasDataChannelMediaSection = true;
          }
          return { dataChannel };
        }
        async setupTransport({ localDtlsRole, localSdpObject }) {
          if (!localSdpObject) {
            localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          }
          const dtlsParameters = sdpCommonUtils.extractDtlsParameters({
            sdpObject: localSdpObject
          });
          dtlsParameters.role = localDtlsRole;
          this._remoteSdp.updateDtlsRole(localDtlsRole === "client" ? "server" : "client");
          await new Promise((resolve, reject) => {
            this.safeEmit("@connect", { dtlsParameters }, resolve, reject);
          });
          this._transportReady = true;
        }
        assertNotClosed() {
          if (this._closed) {
            throw new errors_1.InvalidStateError("method called in a closed handler");
          }
        }
        assertSendDirection() {
          if (this._direction !== "send") {
            throw new Error('method can just be called for handlers with "send" direction');
          }
        }
        assertRecvDirection() {
          if (this._direction !== "recv") {
            throw new Error('method can just be called for handlers with "recv" direction');
          }
        }
      };
      exports.Firefox120 = Firefox120;
    }
  });

  // node_modules/mediasoup-client/lib/handlers/Firefox60.js
  var require_Firefox60 = __commonJS({
    "node_modules/mediasoup-client/lib/handlers/Firefox60.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Firefox60 = void 0;
      var sdpTransform = require_lib3();
      var Logger_1 = require_Logger();
      var errors_1 = require_errors();
      var utils = require_utils();
      var ortc = require_ortc();
      var sdpCommonUtils = require_commonUtils();
      var sdpUnifiedPlanUtils = require_unifiedPlanUtils();
      var HandlerInterface_1 = require_HandlerInterface();
      var RemoteSdp_1 = require_RemoteSdp();
      var scalabilityModes_1 = require_scalabilityModes();
      var logger = new Logger_1.Logger("Firefox60");
      var NAME = "Firefox60";
      var SCTP_NUM_STREAMS = { OS: 16, MIS: 2048 };
      var Firefox60 = class _Firefox60 extends HandlerInterface_1.HandlerInterface {
        // Closed flag.
        _closed = false;
        // Handler direction.
        _direction;
        // Remote SDP handler.
        _remoteSdp;
        // Generic sending RTP parameters for audio and video.
        _sendingRtpParametersByKind;
        // Generic sending RTP parameters for audio and video suitable for the SDP
        // remote answer.
        _sendingRemoteRtpParametersByKind;
        // RTCPeerConnection instance.
        _pc;
        // Map of RTCTransceivers indexed by MID.
        _mapMidTransceiver = /* @__PURE__ */ new Map();
        // Local stream for sending.
        _sendStream = new MediaStream();
        // Whether a DataChannel m=application section has been created.
        _hasDataChannelMediaSection = false;
        // Sending DataChannel id value counter. Incremented for each new DataChannel.
        _nextSendSctpStreamId = 0;
        // Got transport local and remote parameters.
        _transportReady = false;
        /**
         * Creates a factory function.
         */
        static createFactory() {
          return () => new _Firefox60();
        }
        constructor() {
          super();
        }
        get name() {
          return NAME;
        }
        close() {
          logger.debug("close()");
          if (this._closed) {
            return;
          }
          this._closed = true;
          if (this._pc) {
            try {
              this._pc.close();
            } catch (error) {
            }
          }
          this.emit("@close");
        }
        async getNativeRtpCapabilities() {
          logger.debug("getNativeRtpCapabilities()");
          const pc = new RTCPeerConnection({
            iceServers: [],
            iceTransportPolicy: "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require"
          });
          const canvas = document.createElement("canvas");
          canvas.getContext("2d");
          const fakeStream = canvas.captureStream();
          const fakeVideoTrack = fakeStream.getVideoTracks()[0];
          try {
            pc.addTransceiver("audio", { direction: "sendrecv" });
            const videoTransceiver = pc.addTransceiver(fakeVideoTrack, {
              direction: "sendrecv"
            });
            const parameters = videoTransceiver.sender.getParameters();
            const encodings = [
              { rid: "r0", maxBitrate: 1e5 },
              { rid: "r1", maxBitrate: 5e5 }
            ];
            parameters.encodings = encodings;
            await videoTransceiver.sender.setParameters(parameters);
            const offer = await pc.createOffer();
            try {
              canvas.remove();
            } catch (error) {
            }
            try {
              fakeVideoTrack.stop();
            } catch (error) {
            }
            try {
              pc.close();
            } catch (error) {
            }
            const sdpObject = sdpTransform.parse(offer.sdp);
            const nativeRtpCapabilities = sdpCommonUtils.extractRtpCapabilities({
              sdpObject
            });
            return nativeRtpCapabilities;
          } catch (error) {
            try {
              canvas.remove();
            } catch (error2) {
            }
            try {
              fakeVideoTrack.stop();
            } catch (error2) {
            }
            try {
              pc.close();
            } catch (error2) {
            }
            throw error;
          }
        }
        async getNativeSctpCapabilities() {
          logger.debug("getNativeSctpCapabilities()");
          return {
            numStreams: SCTP_NUM_STREAMS
          };
        }
        run({ direction, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, extendedRtpCapabilities }) {
          this.assertNotClosed();
          logger.debug("run()");
          this._direction = direction;
          this._remoteSdp = new RemoteSdp_1.RemoteSdp({
            iceParameters,
            iceCandidates,
            dtlsParameters,
            sctpParameters
          });
          this._sendingRtpParametersByKind = {
            audio: ortc.getSendingRtpParameters("audio", extendedRtpCapabilities),
            video: ortc.getSendingRtpParameters("video", extendedRtpCapabilities)
          };
          this._sendingRemoteRtpParametersByKind = {
            audio: ortc.getSendingRemoteRtpParameters("audio", extendedRtpCapabilities),
            video: ortc.getSendingRemoteRtpParameters("video", extendedRtpCapabilities)
          };
          this._pc = new RTCPeerConnection({
            iceServers: iceServers ?? [],
            iceTransportPolicy: iceTransportPolicy ?? "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require",
            ...additionalSettings
          }, proprietaryConstraints);
          this._pc.addEventListener("icegatheringstatechange", () => {
            this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
          });
          this._pc.addEventListener("icecandidateerror", (event) => {
            this.emit("@icecandidateerror", event);
          });
          if (this._pc.connectionState) {
            this._pc.addEventListener("connectionstatechange", () => {
              this.emit("@connectionstatechange", this._pc.connectionState);
            });
          } else {
            this._pc.addEventListener("iceconnectionstatechange", () => {
              logger.warn("run() | pc.connectionState not supported, using pc.iceConnectionState");
              switch (this._pc.iceConnectionState) {
                case "checking": {
                  this.emit("@connectionstatechange", "connecting");
                  break;
                }
                case "connected":
                case "completed": {
                  this.emit("@connectionstatechange", "connected");
                  break;
                }
                case "failed": {
                  this.emit("@connectionstatechange", "failed");
                  break;
                }
                case "disconnected": {
                  this.emit("@connectionstatechange", "disconnected");
                  break;
                }
                case "closed": {
                  this.emit("@connectionstatechange", "closed");
                  break;
                }
              }
            });
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async updateIceServers(iceServers) {
          this.assertNotClosed();
          throw new errors_1.UnsupportedError("not supported");
        }
        async restartIce(iceParameters) {
          this.assertNotClosed();
          logger.debug("restartIce()");
          this._remoteSdp.updateIceParameters(iceParameters);
          if (!this._transportReady) {
            return;
          }
          if (this._direction === "send") {
            const offer = await this._pc.createOffer({ iceRestart: true });
            logger.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", offer);
            await this._pc.setLocalDescription(offer);
            const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
            logger.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setRemoteDescription(answer);
          } else {
            const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
            logger.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", offer);
            await this._pc.setRemoteDescription(offer);
            const answer = await this._pc.createAnswer();
            logger.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", answer);
            await this._pc.setLocalDescription(answer);
          }
        }
        async getTransportStats() {
          this.assertNotClosed();
          return this._pc.getStats();
        }
        async send({ track, encodings, codecOptions, codec }) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("send() [kind:%s, track.id:%s]", track.kind, track.id);
          if (encodings) {
            encodings = utils.clone(encodings);
            encodings.forEach((encoding, idx) => {
              encoding.rid = `r${idx}`;
            });
            encodings.reverse();
          }
          const sendingRtpParameters = utils.clone(this._sendingRtpParametersByKind[track.kind]);
          sendingRtpParameters.codecs = ortc.reduceCodecs(sendingRtpParameters.codecs, codec);
          const sendingRemoteRtpParameters = utils.clone(this._sendingRemoteRtpParametersByKind[track.kind]);
          sendingRemoteRtpParameters.codecs = ortc.reduceCodecs(sendingRemoteRtpParameters.codecs, codec);
          const transceiver = this._pc.addTransceiver(track, {
            direction: "sendonly",
            streams: [this._sendStream]
          });
          if (encodings) {
            const parameters = transceiver.sender.getParameters();
            parameters.encodings = encodings;
            await transceiver.sender.setParameters(parameters);
          }
          const offer = await this._pc.createOffer();
          let localSdpObject = sdpTransform.parse(offer.sdp);
          if (localSdpObject.extmapAllowMixed) {
            this._remoteSdp.setSessionExtmapAllowMixed();
          }
          if (!this._transportReady) {
            await this.setupTransport({ localDtlsRole: "client", localSdpObject });
          }
          const layers = (0, scalabilityModes_1.parse)((encodings ?? [{}])[0].scalabilityMode);
          logger.debug("send() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const localId = transceiver.mid;
          sendingRtpParameters.mid = localId;
          localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          const offerMediaObject = localSdpObject.media[localSdpObject.media.length - 1];
          sendingRtpParameters.rtcp.cname = sdpCommonUtils.getCname({
            offerMediaObject
          });
          if (!encodings) {
            sendingRtpParameters.encodings = sdpUnifiedPlanUtils.getRtpEncodings({
              offerMediaObject
            });
          } else if (encodings.length === 1) {
            const newEncodings = sdpUnifiedPlanUtils.getRtpEncodings({
              offerMediaObject
            });
            Object.assign(newEncodings[0], encodings[0]);
            sendingRtpParameters.encodings = newEncodings;
          } else {
            sendingRtpParameters.encodings = encodings.reverse();
          }
          if (sendingRtpParameters.encodings.length > 1 && (sendingRtpParameters.codecs[0].mimeType.toLowerCase() === "video/vp8" || sendingRtpParameters.codecs[0].mimeType.toLowerCase() === "video/h264")) {
            for (const encoding of sendingRtpParameters.encodings) {
              if (encoding.scalabilityMode) {
                encoding.scalabilityMode = `L1T${layers.temporalLayers}`;
              } else {
                encoding.scalabilityMode = "L1T3";
              }
            }
          }
          this._remoteSdp.send({
            offerMediaObject,
            offerRtpParameters: sendingRtpParameters,
            answerRtpParameters: sendingRemoteRtpParameters,
            codecOptions
          });
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("send() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
          this._mapMidTransceiver.set(localId, transceiver);
          return {
            localId,
            rtpParameters: sendingRtpParameters,
            rtpSender: transceiver.sender
          };
        }
        async stopSending(localId) {
          this.assertSendDirection();
          logger.debug("stopSending() [localId:%s]", localId);
          if (this._closed) {
            return;
          }
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated transceiver not found");
          }
          void transceiver.sender.replaceTrack(null);
          this._pc.removeTrack(transceiver.sender);
          this._remoteSdp.disableMediaSection(transceiver.mid);
          const offer = await this._pc.createOffer();
          logger.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
          this._mapMidTransceiver.delete(localId);
        }
        async pauseSending(localId) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("pauseSending() [localId:%s]", localId);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          transceiver.direction = "inactive";
          this._remoteSdp.pauseMediaSection(localId);
          const offer = await this._pc.createOffer();
          logger.debug("pauseSending() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("pauseSending() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async resumeSending(localId) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("resumeSending() [localId:%s]", localId);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          transceiver.direction = "sendonly";
          this._remoteSdp.resumeSendingMediaSection(localId);
          const offer = await this._pc.createOffer();
          logger.debug("resumeSending() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("resumeSending() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async replaceTrack(localId, track) {
          this.assertNotClosed();
          this.assertSendDirection();
          if (track) {
            logger.debug("replaceTrack() [localId:%s, track.id:%s]", localId, track.id);
          } else {
            logger.debug("replaceTrack() [localId:%s, no track]", localId);
          }
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          await transceiver.sender.replaceTrack(track);
        }
        async setMaxSpatialLayer(localId, spatialLayer) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", localId, spatialLayer);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated transceiver not found");
          }
          const parameters = transceiver.sender.getParameters();
          spatialLayer = parameters.encodings.length - 1 - spatialLayer;
          parameters.encodings.forEach((encoding, idx) => {
            if (idx >= spatialLayer) {
              encoding.active = true;
            } else {
              encoding.active = false;
            }
          });
          await transceiver.sender.setParameters(parameters);
          this._remoteSdp.muxMediaSectionSimulcast(localId, parameters.encodings);
          const offer = await this._pc.createOffer();
          logger.debug("setMaxSpatialLayer() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("setMaxSpatialLayer() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async setRtpEncodingParameters(localId, params2) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("setRtpEncodingParameters() [localId:%s, params:%o]", localId, params2);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          const parameters = transceiver.sender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
            parameters.encodings[idx] = { ...encoding, ...params2 };
          });
          await transceiver.sender.setParameters(parameters);
          this._remoteSdp.muxMediaSectionSimulcast(localId, parameters.encodings);
          const offer = await this._pc.createOffer();
          logger.debug("setRtpEncodingParameters() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("setRtpEncodingParameters() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async getSenderStats(localId) {
          this.assertNotClosed();
          this.assertSendDirection();
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          return transceiver.sender.getStats();
        }
        async sendDataChannel({ ordered, maxPacketLifeTime, maxRetransmits, label, protocol: protocol4 }) {
          this.assertNotClosed();
          this.assertSendDirection();
          const options = {
            negotiated: true,
            id: this._nextSendSctpStreamId,
            ordered,
            maxPacketLifeTime,
            maxRetransmits,
            protocol: protocol4
          };
          logger.debug("sendDataChannel() [options:%o]", options);
          const dataChannel = this._pc.createDataChannel(label, options);
          this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % SCTP_NUM_STREAMS.MIS;
          if (!this._hasDataChannelMediaSection) {
            const offer = await this._pc.createOffer();
            const localSdpObject = sdpTransform.parse(offer.sdp);
            const offerMediaObject = localSdpObject.media.find((m) => m.type === "application");
            if (!this._transportReady) {
              await this.setupTransport({ localDtlsRole: "client", localSdpObject });
            }
            logger.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", offer);
            await this._pc.setLocalDescription(offer);
            this._remoteSdp.sendSctpAssociation({ offerMediaObject });
            const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
            logger.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setRemoteDescription(answer);
            this._hasDataChannelMediaSection = true;
          }
          const sctpStreamParameters = {
            streamId: options.id,
            ordered: options.ordered,
            maxPacketLifeTime: options.maxPacketLifeTime,
            maxRetransmits: options.maxRetransmits
          };
          return { dataChannel, sctpStreamParameters };
        }
        async receive(optionsList) {
          this.assertNotClosed();
          this.assertRecvDirection();
          const results = [];
          const mapLocalId = /* @__PURE__ */ new Map();
          for (const options of optionsList) {
            const { trackId, kind, rtpParameters, streamId } = options;
            logger.debug("receive() [trackId:%s, kind:%s]", trackId, kind);
            const localId = rtpParameters.mid ?? String(this._mapMidTransceiver.size);
            mapLocalId.set(trackId, localId);
            this._remoteSdp.receive({
              mid: localId,
              kind,
              offerRtpParameters: rtpParameters,
              streamId: streamId ?? rtpParameters.rtcp.cname,
              trackId
            });
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          let answer = await this._pc.createAnswer();
          const localSdpObject = sdpTransform.parse(answer.sdp);
          for (const options of optionsList) {
            const { trackId, rtpParameters } = options;
            const localId = mapLocalId.get(trackId);
            const answerMediaObject = localSdpObject.media.find((m) => String(m.mid) === localId);
            sdpCommonUtils.applyCodecParameters({
              offerRtpParameters: rtpParameters,
              answerMediaObject
            });
            answer = { type: "answer", sdp: sdpTransform.write(localSdpObject) };
          }
          if (!this._transportReady) {
            await this.setupTransport({ localDtlsRole: "client", localSdpObject });
          }
          logger.debug("receive() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
          for (const options of optionsList) {
            const { trackId } = options;
            const localId = mapLocalId.get(trackId);
            const transceiver = this._pc.getTransceivers().find((t) => t.mid === localId);
            if (!transceiver) {
              throw new Error("new RTCRtpTransceiver not found");
            }
            this._mapMidTransceiver.set(localId, transceiver);
            results.push({
              localId,
              track: transceiver.receiver.track,
              rtpReceiver: transceiver.receiver
            });
          }
          return results;
        }
        async stopReceiving(localIds) {
          this.assertRecvDirection();
          if (this._closed) {
            return;
          }
          for (const localId of localIds) {
            logger.debug("stopReceiving() [localId:%s]", localId);
            const transceiver = this._mapMidTransceiver.get(localId);
            if (!transceiver) {
              throw new Error("associated RTCRtpTransceiver not found");
            }
            this._remoteSdp.closeMediaSection(transceiver.mid);
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
          for (const localId of localIds) {
            this._mapMidTransceiver.delete(localId);
          }
        }
        async pauseReceiving(localIds) {
          this.assertNotClosed();
          this.assertRecvDirection();
          for (const localId of localIds) {
            logger.debug("pauseReceiving() [localId:%s]", localId);
            const transceiver = this._mapMidTransceiver.get(localId);
            if (!transceiver) {
              throw new Error("associated RTCRtpTransceiver not found");
            }
            transceiver.direction = "inactive";
            this._remoteSdp.pauseMediaSection(localId);
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("pauseReceiving() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug("pauseReceiving() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
        }
        async resumeReceiving(localIds) {
          this.assertNotClosed();
          this.assertRecvDirection();
          for (const localId of localIds) {
            logger.debug("resumeReceiving() [localId:%s]", localId);
            const transceiver = this._mapMidTransceiver.get(localId);
            if (!transceiver) {
              throw new Error("associated RTCRtpTransceiver not found");
            }
            transceiver.direction = "recvonly";
            this._remoteSdp.resumeReceivingMediaSection(localId);
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("resumeReceiving() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug("resumeReceiving() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
        }
        async getReceiverStats(localId) {
          this.assertRecvDirection();
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          return transceiver.receiver.getStats();
        }
        async receiveDataChannel({ sctpStreamParameters, label, protocol: protocol4 }) {
          this.assertNotClosed();
          this.assertRecvDirection();
          const { streamId, ordered, maxPacketLifeTime, maxRetransmits } = sctpStreamParameters;
          const options = {
            negotiated: true,
            id: streamId,
            ordered,
            maxPacketLifeTime,
            maxRetransmits,
            protocol: protocol4
          };
          logger.debug("receiveDataChannel() [options:%o]", options);
          const dataChannel = this._pc.createDataChannel(label, options);
          if (!this._hasDataChannelMediaSection) {
            this._remoteSdp.receiveSctpAssociation();
            const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
            logger.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", offer);
            await this._pc.setRemoteDescription(offer);
            const answer = await this._pc.createAnswer();
            if (!this._transportReady) {
              const localSdpObject = sdpTransform.parse(answer.sdp);
              await this.setupTransport({ localDtlsRole: "client", localSdpObject });
            }
            logger.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setLocalDescription(answer);
            this._hasDataChannelMediaSection = true;
          }
          return { dataChannel };
        }
        async setupTransport({ localDtlsRole, localSdpObject }) {
          if (!localSdpObject) {
            localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          }
          const dtlsParameters = sdpCommonUtils.extractDtlsParameters({
            sdpObject: localSdpObject
          });
          dtlsParameters.role = localDtlsRole;
          this._remoteSdp.updateDtlsRole(localDtlsRole === "client" ? "server" : "client");
          await new Promise((resolve, reject) => {
            this.safeEmit("@connect", { dtlsParameters }, resolve, reject);
          });
          this._transportReady = true;
        }
        assertNotClosed() {
          if (this._closed) {
            throw new errors_1.InvalidStateError("method called in a closed handler");
          }
        }
        assertSendDirection() {
          if (this._direction !== "send") {
            throw new Error('method can just be called for handlers with "send" direction');
          }
        }
        assertRecvDirection() {
          if (this._direction !== "recv") {
            throw new Error('method can just be called for handlers with "recv" direction');
          }
        }
      };
      exports.Firefox60 = Firefox60;
    }
  });

  // node_modules/mediasoup-client/lib/handlers/Safari12.js
  var require_Safari12 = __commonJS({
    "node_modules/mediasoup-client/lib/handlers/Safari12.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Safari12 = void 0;
      var sdpTransform = require_lib3();
      var Logger_1 = require_Logger();
      var utils = require_utils();
      var ortc = require_ortc();
      var sdpCommonUtils = require_commonUtils();
      var sdpUnifiedPlanUtils = require_unifiedPlanUtils();
      var ortcUtils = require_utils2();
      var errors_1 = require_errors();
      var HandlerInterface_1 = require_HandlerInterface();
      var RemoteSdp_1 = require_RemoteSdp();
      var scalabilityModes_1 = require_scalabilityModes();
      var logger = new Logger_1.Logger("Safari12");
      var NAME = "Safari12";
      var SCTP_NUM_STREAMS = { OS: 1024, MIS: 1024 };
      var Safari12 = class _Safari12 extends HandlerInterface_1.HandlerInterface {
        // Closed flag.
        _closed = false;
        // Handler direction.
        _direction;
        // Remote SDP handler.
        _remoteSdp;
        // Generic sending RTP parameters for audio and video.
        _sendingRtpParametersByKind;
        // Generic sending RTP parameters for audio and video suitable for the SDP
        // remote answer.
        _sendingRemoteRtpParametersByKind;
        // Initial server side DTLS role. If not 'auto', it will force the opposite
        // value in client side.
        _forcedLocalDtlsRole;
        // RTCPeerConnection instance.
        _pc;
        // Map of RTCTransceivers indexed by MID.
        _mapMidTransceiver = /* @__PURE__ */ new Map();
        // Local stream for sending.
        _sendStream = new MediaStream();
        // Whether a DataChannel m=application section has been created.
        _hasDataChannelMediaSection = false;
        // Sending DataChannel id value counter. Incremented for each new DataChannel.
        _nextSendSctpStreamId = 0;
        // Got transport local and remote parameters.
        _transportReady = false;
        /**
         * Creates a factory function.
         */
        static createFactory() {
          return () => new _Safari12();
        }
        constructor() {
          super();
        }
        get name() {
          return NAME;
        }
        close() {
          logger.debug("close()");
          if (this._closed) {
            return;
          }
          this._closed = true;
          if (this._pc) {
            try {
              this._pc.close();
            } catch (error) {
            }
          }
          this.emit("@close");
        }
        async getNativeRtpCapabilities() {
          logger.debug("getNativeRtpCapabilities()");
          const pc = new RTCPeerConnection({
            iceServers: [],
            iceTransportPolicy: "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require"
          });
          try {
            pc.addTransceiver("audio");
            pc.addTransceiver("video");
            const offer = await pc.createOffer();
            try {
              pc.close();
            } catch (error) {
            }
            const sdpObject = sdpTransform.parse(offer.sdp);
            const nativeRtpCapabilities = sdpCommonUtils.extractRtpCapabilities({
              sdpObject
            });
            ortcUtils.addNackSupportForOpus(nativeRtpCapabilities);
            return nativeRtpCapabilities;
          } catch (error) {
            try {
              pc.close();
            } catch (error2) {
            }
            throw error;
          }
        }
        async getNativeSctpCapabilities() {
          logger.debug("getNativeSctpCapabilities()");
          return {
            numStreams: SCTP_NUM_STREAMS
          };
        }
        run({ direction, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, extendedRtpCapabilities }) {
          this.assertNotClosed();
          logger.debug("run()");
          this._direction = direction;
          this._remoteSdp = new RemoteSdp_1.RemoteSdp({
            iceParameters,
            iceCandidates,
            dtlsParameters,
            sctpParameters
          });
          this._sendingRtpParametersByKind = {
            audio: ortc.getSendingRtpParameters("audio", extendedRtpCapabilities),
            video: ortc.getSendingRtpParameters("video", extendedRtpCapabilities)
          };
          this._sendingRemoteRtpParametersByKind = {
            audio: ortc.getSendingRemoteRtpParameters("audio", extendedRtpCapabilities),
            video: ortc.getSendingRemoteRtpParameters("video", extendedRtpCapabilities)
          };
          if (dtlsParameters.role && dtlsParameters.role !== "auto") {
            this._forcedLocalDtlsRole = dtlsParameters.role === "server" ? "client" : "server";
          }
          this._pc = new RTCPeerConnection({
            iceServers: iceServers ?? [],
            iceTransportPolicy: iceTransportPolicy ?? "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require",
            ...additionalSettings
          }, proprietaryConstraints);
          this._pc.addEventListener("icegatheringstatechange", () => {
            this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
          });
          this._pc.addEventListener("icecandidateerror", (event) => {
            this.emit("@icecandidateerror", event);
          });
          if (this._pc.connectionState) {
            this._pc.addEventListener("connectionstatechange", () => {
              this.emit("@connectionstatechange", this._pc.connectionState);
            });
          } else {
            this._pc.addEventListener("iceconnectionstatechange", () => {
              logger.warn("run() | pc.connectionState not supported, using pc.iceConnectionState");
              switch (this._pc.iceConnectionState) {
                case "checking": {
                  this.emit("@connectionstatechange", "connecting");
                  break;
                }
                case "connected":
                case "completed": {
                  this.emit("@connectionstatechange", "connected");
                  break;
                }
                case "failed": {
                  this.emit("@connectionstatechange", "failed");
                  break;
                }
                case "disconnected": {
                  this.emit("@connectionstatechange", "disconnected");
                  break;
                }
                case "closed": {
                  this.emit("@connectionstatechange", "closed");
                  break;
                }
              }
            });
          }
        }
        async updateIceServers(iceServers) {
          this.assertNotClosed();
          logger.debug("updateIceServers()");
          const configuration = this._pc.getConfiguration();
          configuration.iceServers = iceServers;
          this._pc.setConfiguration(configuration);
        }
        async restartIce(iceParameters) {
          this.assertNotClosed();
          logger.debug("restartIce()");
          this._remoteSdp.updateIceParameters(iceParameters);
          if (!this._transportReady) {
            return;
          }
          if (this._direction === "send") {
            const offer = await this._pc.createOffer({ iceRestart: true });
            logger.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", offer);
            await this._pc.setLocalDescription(offer);
            const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
            logger.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setRemoteDescription(answer);
          } else {
            const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
            logger.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", offer);
            await this._pc.setRemoteDescription(offer);
            const answer = await this._pc.createAnswer();
            logger.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", answer);
            await this._pc.setLocalDescription(answer);
          }
        }
        async getTransportStats() {
          this.assertNotClosed();
          return this._pc.getStats();
        }
        async send({ track, encodings, codecOptions, codec, onRtpSender }) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("send() [kind:%s, track.id:%s]", track.kind, track.id);
          const sendingRtpParameters = utils.clone(this._sendingRtpParametersByKind[track.kind]);
          sendingRtpParameters.codecs = ortc.reduceCodecs(sendingRtpParameters.codecs, codec);
          const sendingRemoteRtpParameters = utils.clone(this._sendingRemoteRtpParametersByKind[track.kind]);
          sendingRemoteRtpParameters.codecs = ortc.reduceCodecs(sendingRemoteRtpParameters.codecs, codec);
          const mediaSectionIdx = this._remoteSdp.getNextMediaSectionIdx();
          const transceiver = this._pc.addTransceiver(track, {
            direction: "sendonly",
            streams: [this._sendStream]
          });
          if (onRtpSender) {
            onRtpSender(transceiver.sender);
          }
          let offer = await this._pc.createOffer();
          let localSdpObject = sdpTransform.parse(offer.sdp);
          if (localSdpObject.extmapAllowMixed) {
            this._remoteSdp.setSessionExtmapAllowMixed();
          }
          let offerMediaObject;
          if (!this._transportReady) {
            await this.setupTransport({
              localDtlsRole: this._forcedLocalDtlsRole ?? "client",
              localSdpObject
            });
          }
          const layers = (0, scalabilityModes_1.parse)((encodings ?? [{}])[0].scalabilityMode);
          if (encodings && encodings.length > 1) {
            logger.debug("send() | enabling legacy simulcast");
            localSdpObject = sdpTransform.parse(offer.sdp);
            offerMediaObject = localSdpObject.media[mediaSectionIdx.idx];
            sdpUnifiedPlanUtils.addLegacySimulcast({
              offerMediaObject,
              numStreams: encodings.length
            });
            offer = { type: "offer", sdp: sdpTransform.write(localSdpObject) };
          }
          logger.debug("send() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const localId = transceiver.mid;
          sendingRtpParameters.mid = localId;
          localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          offerMediaObject = localSdpObject.media[mediaSectionIdx.idx];
          sendingRtpParameters.rtcp.cname = sdpCommonUtils.getCname({
            offerMediaObject
          });
          sendingRtpParameters.encodings = sdpUnifiedPlanUtils.getRtpEncodings({
            offerMediaObject
          });
          if (encodings) {
            for (let idx = 0; idx < sendingRtpParameters.encodings.length; ++idx) {
              if (encodings[idx]) {
                Object.assign(sendingRtpParameters.encodings[idx], encodings[idx]);
              }
            }
          }
          if (sendingRtpParameters.encodings.length > 1 && (sendingRtpParameters.codecs[0].mimeType.toLowerCase() === "video/vp8" || sendingRtpParameters.codecs[0].mimeType.toLowerCase() === "video/h264")) {
            for (const encoding of sendingRtpParameters.encodings) {
              if (encoding.scalabilityMode) {
                encoding.scalabilityMode = `L1T${layers.temporalLayers}`;
              } else {
                encoding.scalabilityMode = "L1T3";
              }
            }
          }
          this._remoteSdp.send({
            offerMediaObject,
            reuseMid: mediaSectionIdx.reuseMid,
            offerRtpParameters: sendingRtpParameters,
            answerRtpParameters: sendingRemoteRtpParameters,
            codecOptions
          });
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("send() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
          this._mapMidTransceiver.set(localId, transceiver);
          return {
            localId,
            rtpParameters: sendingRtpParameters,
            rtpSender: transceiver.sender
          };
        }
        async stopSending(localId) {
          this.assertSendDirection();
          if (this._closed) {
            return;
          }
          logger.debug("stopSending() [localId:%s]", localId);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          void transceiver.sender.replaceTrack(null);
          this._pc.removeTrack(transceiver.sender);
          const mediaSectionClosed = this._remoteSdp.closeMediaSection(transceiver.mid);
          if (mediaSectionClosed) {
            try {
              transceiver.stop();
            } catch (error) {
            }
          }
          const offer = await this._pc.createOffer();
          logger.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
          this._mapMidTransceiver.delete(localId);
        }
        async pauseSending(localId) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("pauseSending() [localId:%s]", localId);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          transceiver.direction = "inactive";
          this._remoteSdp.pauseMediaSection(localId);
          const offer = await this._pc.createOffer();
          logger.debug("pauseSending() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("pauseSending() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async resumeSending(localId) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("resumeSending() [localId:%s]", localId);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          transceiver.direction = "sendonly";
          this._remoteSdp.resumeSendingMediaSection(localId);
          const offer = await this._pc.createOffer();
          logger.debug("resumeSending() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("resumeSending() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async replaceTrack(localId, track) {
          this.assertNotClosed();
          this.assertSendDirection();
          if (track) {
            logger.debug("replaceTrack() [localId:%s, track.id:%s]", localId, track.id);
          } else {
            logger.debug("replaceTrack() [localId:%s, no track]", localId);
          }
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          await transceiver.sender.replaceTrack(track);
        }
        async setMaxSpatialLayer(localId, spatialLayer) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", localId, spatialLayer);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          const parameters = transceiver.sender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
            if (idx <= spatialLayer) {
              encoding.active = true;
            } else {
              encoding.active = false;
            }
          });
          await transceiver.sender.setParameters(parameters);
          this._remoteSdp.muxMediaSectionSimulcast(localId, parameters.encodings);
          const offer = await this._pc.createOffer();
          logger.debug("setMaxSpatialLayer() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("setMaxSpatialLayer() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async setRtpEncodingParameters(localId, params2) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("setRtpEncodingParameters() [localId:%s, params:%o]", localId, params2);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          const parameters = transceiver.sender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
            parameters.encodings[idx] = { ...encoding, ...params2 };
          });
          await transceiver.sender.setParameters(parameters);
          this._remoteSdp.muxMediaSectionSimulcast(localId, parameters.encodings);
          const offer = await this._pc.createOffer();
          logger.debug("setRtpEncodingParameters() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("setRtpEncodingParameters() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async getSenderStats(localId) {
          this.assertNotClosed();
          this.assertSendDirection();
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          return transceiver.sender.getStats();
        }
        async sendDataChannel({ ordered, maxPacketLifeTime, maxRetransmits, label, protocol: protocol4 }) {
          this.assertNotClosed();
          this.assertSendDirection();
          const options = {
            negotiated: true,
            id: this._nextSendSctpStreamId,
            ordered,
            maxPacketLifeTime,
            maxRetransmits,
            protocol: protocol4
          };
          logger.debug("sendDataChannel() [options:%o]", options);
          const dataChannel = this._pc.createDataChannel(label, options);
          this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % SCTP_NUM_STREAMS.MIS;
          if (!this._hasDataChannelMediaSection) {
            const offer = await this._pc.createOffer();
            const localSdpObject = sdpTransform.parse(offer.sdp);
            const offerMediaObject = localSdpObject.media.find((m) => m.type === "application");
            if (!this._transportReady) {
              await this.setupTransport({
                localDtlsRole: this._forcedLocalDtlsRole ?? "client",
                localSdpObject
              });
            }
            logger.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", offer);
            await this._pc.setLocalDescription(offer);
            this._remoteSdp.sendSctpAssociation({ offerMediaObject });
            const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
            logger.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setRemoteDescription(answer);
            this._hasDataChannelMediaSection = true;
          }
          const sctpStreamParameters = {
            streamId: options.id,
            ordered: options.ordered,
            maxPacketLifeTime: options.maxPacketLifeTime,
            maxRetransmits: options.maxRetransmits
          };
          return { dataChannel, sctpStreamParameters };
        }
        async receive(optionsList) {
          this.assertNotClosed();
          this.assertRecvDirection();
          const results = [];
          const mapLocalId = /* @__PURE__ */ new Map();
          for (const options of optionsList) {
            const { trackId, kind, rtpParameters, streamId } = options;
            logger.debug("receive() [trackId:%s, kind:%s]", trackId, kind);
            const localId = rtpParameters.mid ?? String(this._mapMidTransceiver.size);
            mapLocalId.set(trackId, localId);
            this._remoteSdp.receive({
              mid: localId,
              kind,
              offerRtpParameters: rtpParameters,
              streamId: streamId ?? rtpParameters.rtcp.cname,
              trackId
            });
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          for (const options of optionsList) {
            const { trackId, onRtpReceiver } = options;
            if (onRtpReceiver) {
              const localId = mapLocalId.get(trackId);
              const transceiver = this._pc.getTransceivers().find((t) => t.mid === localId);
              if (!transceiver) {
                throw new Error("transceiver not found");
              }
              onRtpReceiver(transceiver.receiver);
            }
          }
          let answer = await this._pc.createAnswer();
          const localSdpObject = sdpTransform.parse(answer.sdp);
          for (const options of optionsList) {
            const { trackId, rtpParameters } = options;
            const localId = mapLocalId.get(trackId);
            const answerMediaObject = localSdpObject.media.find((m) => String(m.mid) === localId);
            sdpCommonUtils.applyCodecParameters({
              offerRtpParameters: rtpParameters,
              answerMediaObject
            });
          }
          answer = { type: "answer", sdp: sdpTransform.write(localSdpObject) };
          if (!this._transportReady) {
            await this.setupTransport({
              localDtlsRole: this._forcedLocalDtlsRole ?? "client",
              localSdpObject
            });
          }
          logger.debug("receive() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
          for (const options of optionsList) {
            const { trackId } = options;
            const localId = mapLocalId.get(trackId);
            const transceiver = this._pc.getTransceivers().find((t) => t.mid === localId);
            if (!transceiver) {
              throw new Error("new RTCRtpTransceiver not found");
            }
            this._mapMidTransceiver.set(localId, transceiver);
            results.push({
              localId,
              track: transceiver.receiver.track,
              rtpReceiver: transceiver.receiver
            });
          }
          return results;
        }
        async stopReceiving(localIds) {
          this.assertRecvDirection();
          if (this._closed) {
            return;
          }
          for (const localId of localIds) {
            logger.debug("stopReceiving() [localId:%s]", localId);
            const transceiver = this._mapMidTransceiver.get(localId);
            if (!transceiver) {
              throw new Error("associated RTCRtpTransceiver not found");
            }
            this._remoteSdp.closeMediaSection(transceiver.mid);
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
          for (const localId of localIds) {
            this._mapMidTransceiver.delete(localId);
          }
        }
        async pauseReceiving(localIds) {
          this.assertNotClosed();
          this.assertRecvDirection();
          for (const localId of localIds) {
            logger.debug("pauseReceiving() [localId:%s]", localId);
            const transceiver = this._mapMidTransceiver.get(localId);
            if (!transceiver) {
              throw new Error("associated RTCRtpTransceiver not found");
            }
            transceiver.direction = "inactive";
            this._remoteSdp.pauseMediaSection(localId);
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("pauseReceiving() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug("pauseReceiving() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
        }
        async resumeReceiving(localIds) {
          this.assertNotClosed();
          this.assertRecvDirection();
          for (const localId of localIds) {
            logger.debug("resumeReceiving() [localId:%s]", localId);
            const transceiver = this._mapMidTransceiver.get(localId);
            if (!transceiver) {
              throw new Error("associated RTCRtpTransceiver not found");
            }
            transceiver.direction = "recvonly";
            this._remoteSdp.resumeReceivingMediaSection(localId);
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("resumeReceiving() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug("resumeReceiving() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
        }
        async getReceiverStats(localId) {
          this.assertNotClosed();
          this.assertRecvDirection();
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          return transceiver.receiver.getStats();
        }
        async receiveDataChannel({ sctpStreamParameters, label, protocol: protocol4 }) {
          this.assertNotClosed();
          this.assertRecvDirection();
          const { streamId, ordered, maxPacketLifeTime, maxRetransmits } = sctpStreamParameters;
          const options = {
            negotiated: true,
            id: streamId,
            ordered,
            maxPacketLifeTime,
            maxRetransmits,
            protocol: protocol4
          };
          logger.debug("receiveDataChannel() [options:%o]", options);
          const dataChannel = this._pc.createDataChannel(label, options);
          if (!this._hasDataChannelMediaSection) {
            this._remoteSdp.receiveSctpAssociation();
            const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
            logger.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", offer);
            await this._pc.setRemoteDescription(offer);
            const answer = await this._pc.createAnswer();
            if (!this._transportReady) {
              const localSdpObject = sdpTransform.parse(answer.sdp);
              await this.setupTransport({
                localDtlsRole: this._forcedLocalDtlsRole ?? "client",
                localSdpObject
              });
            }
            logger.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setLocalDescription(answer);
            this._hasDataChannelMediaSection = true;
          }
          return { dataChannel };
        }
        async setupTransport({ localDtlsRole, localSdpObject }) {
          if (!localSdpObject) {
            localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          }
          const dtlsParameters = sdpCommonUtils.extractDtlsParameters({
            sdpObject: localSdpObject
          });
          dtlsParameters.role = localDtlsRole;
          this._remoteSdp.updateDtlsRole(localDtlsRole === "client" ? "server" : "client");
          await new Promise((resolve, reject) => {
            this.safeEmit("@connect", { dtlsParameters }, resolve, reject);
          });
          this._transportReady = true;
        }
        assertNotClosed() {
          if (this._closed) {
            throw new errors_1.InvalidStateError("method called in a closed handler");
          }
        }
        assertSendDirection() {
          if (this._direction !== "send") {
            throw new Error('method can just be called for handlers with "send" direction');
          }
        }
        assertRecvDirection() {
          if (this._direction !== "recv") {
            throw new Error('method can just be called for handlers with "recv" direction');
          }
        }
      };
      exports.Safari12 = Safari12;
    }
  });

  // node_modules/mediasoup-client/lib/handlers/Safari11.js
  var require_Safari11 = __commonJS({
    "node_modules/mediasoup-client/lib/handlers/Safari11.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Safari11 = void 0;
      var sdpTransform = require_lib3();
      var Logger_1 = require_Logger();
      var utils = require_utils();
      var ortc = require_ortc();
      var sdpCommonUtils = require_commonUtils();
      var sdpPlanBUtils = require_planBUtils();
      var HandlerInterface_1 = require_HandlerInterface();
      var RemoteSdp_1 = require_RemoteSdp();
      var logger = new Logger_1.Logger("Safari11");
      var NAME = "Safari11";
      var SCTP_NUM_STREAMS = { OS: 1024, MIS: 1024 };
      var Safari11 = class _Safari11 extends HandlerInterface_1.HandlerInterface {
        // Handler direction.
        _direction;
        // Remote SDP handler.
        _remoteSdp;
        // Generic sending RTP parameters for audio and video.
        _sendingRtpParametersByKind;
        // Generic sending RTP parameters for audio and video suitable for the SDP
        // remote answer.
        _sendingRemoteRtpParametersByKind;
        // Initial server side DTLS role. If not 'auto', it will force the opposite
        // value in client side.
        _forcedLocalDtlsRole;
        // RTCPeerConnection instance.
        _pc;
        // Local stream for sending.
        _sendStream = new MediaStream();
        // Map of RTCRtpSender indexed by localId.
        _mapSendLocalIdRtpSender = /* @__PURE__ */ new Map();
        // Next sending localId.
        _nextSendLocalId = 0;
        // Map of MID, RTP parameters and RTCRtpReceiver indexed by local id.
        // Value is an Object with mid, rtpParameters and rtpReceiver.
        _mapRecvLocalIdInfo = /* @__PURE__ */ new Map();
        // Whether a DataChannel m=application section has been created.
        _hasDataChannelMediaSection = false;
        // Sending DataChannel id value counter. Incremented for each new DataChannel.
        _nextSendSctpStreamId = 0;
        // Got transport local and remote parameters.
        _transportReady = false;
        /**
         * Creates a factory function.
         */
        static createFactory() {
          return () => new _Safari11();
        }
        constructor() {
          super();
        }
        get name() {
          return NAME;
        }
        close() {
          logger.debug("close()");
          if (this._pc) {
            try {
              this._pc.close();
            } catch (error) {
            }
          }
          this.emit("@close");
        }
        async getNativeRtpCapabilities() {
          logger.debug("getNativeRtpCapabilities()");
          const pc = new RTCPeerConnection({
            iceServers: [],
            iceTransportPolicy: "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require",
            sdpSemantics: "plan-b"
          });
          try {
            const offer = await pc.createOffer({
              offerToReceiveAudio: true,
              offerToReceiveVideo: true
            });
            try {
              pc.close();
            } catch (error) {
            }
            const sdpObject = sdpTransform.parse(offer.sdp);
            const nativeRtpCapabilities = sdpCommonUtils.extractRtpCapabilities({
              sdpObject
            });
            return nativeRtpCapabilities;
          } catch (error) {
            try {
              pc.close();
            } catch (error2) {
            }
            throw error;
          }
        }
        async getNativeSctpCapabilities() {
          logger.debug("getNativeSctpCapabilities()");
          return {
            numStreams: SCTP_NUM_STREAMS
          };
        }
        run({ direction, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, extendedRtpCapabilities }) {
          logger.debug("run()");
          this._direction = direction;
          this._remoteSdp = new RemoteSdp_1.RemoteSdp({
            iceParameters,
            iceCandidates,
            dtlsParameters,
            sctpParameters,
            planB: true
          });
          this._sendingRtpParametersByKind = {
            audio: ortc.getSendingRtpParameters("audio", extendedRtpCapabilities),
            video: ortc.getSendingRtpParameters("video", extendedRtpCapabilities)
          };
          this._sendingRemoteRtpParametersByKind = {
            audio: ortc.getSendingRemoteRtpParameters("audio", extendedRtpCapabilities),
            video: ortc.getSendingRemoteRtpParameters("video", extendedRtpCapabilities)
          };
          if (dtlsParameters.role && dtlsParameters.role !== "auto") {
            this._forcedLocalDtlsRole = dtlsParameters.role === "server" ? "client" : "server";
          }
          this._pc = new RTCPeerConnection({
            iceServers: iceServers ?? [],
            iceTransportPolicy: iceTransportPolicy ?? "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require",
            ...additionalSettings
          }, proprietaryConstraints);
          this._pc.addEventListener("icegatheringstatechange", () => {
            this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
          });
          this._pc.addEventListener("icecandidateerror", (event) => {
            this.emit("@icecandidateerror", event);
          });
          if (this._pc.connectionState) {
            this._pc.addEventListener("connectionstatechange", () => {
              this.emit("@connectionstatechange", this._pc.connectionState);
            });
          } else {
            this._pc.addEventListener("iceconnectionstatechange", () => {
              logger.warn("run() | pc.connectionState not supported, using pc.iceConnectionState");
              switch (this._pc.iceConnectionState) {
                case "checking": {
                  this.emit("@connectionstatechange", "connecting");
                  break;
                }
                case "connected":
                case "completed": {
                  this.emit("@connectionstatechange", "connected");
                  break;
                }
                case "failed": {
                  this.emit("@connectionstatechange", "failed");
                  break;
                }
                case "disconnected": {
                  this.emit("@connectionstatechange", "disconnected");
                  break;
                }
                case "closed": {
                  this.emit("@connectionstatechange", "closed");
                  break;
                }
              }
            });
          }
        }
        async updateIceServers(iceServers) {
          logger.debug("updateIceServers()");
          const configuration = this._pc.getConfiguration();
          configuration.iceServers = iceServers;
          this._pc.setConfiguration(configuration);
        }
        async restartIce(iceParameters) {
          logger.debug("restartIce()");
          this._remoteSdp.updateIceParameters(iceParameters);
          if (!this._transportReady) {
            return;
          }
          if (this._direction === "send") {
            const offer = await this._pc.createOffer({ iceRestart: true });
            logger.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", offer);
            await this._pc.setLocalDescription(offer);
            const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
            logger.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setRemoteDescription(answer);
          } else {
            const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
            logger.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", offer);
            await this._pc.setRemoteDescription(offer);
            const answer = await this._pc.createAnswer();
            logger.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", answer);
            await this._pc.setLocalDescription(answer);
          }
        }
        async getTransportStats() {
          return this._pc.getStats();
        }
        async send({ track, encodings, codecOptions, codec }) {
          this.assertSendDirection();
          logger.debug("send() [kind:%s, track.id:%s]", track.kind, track.id);
          if (codec) {
            logger.warn("send() | codec selection is not available in %s handler", this.name);
          }
          this._sendStream.addTrack(track);
          this._pc.addTrack(track, this._sendStream);
          let offer = await this._pc.createOffer();
          let localSdpObject = sdpTransform.parse(offer.sdp);
          if (localSdpObject.extmapAllowMixed) {
            this._remoteSdp.setSessionExtmapAllowMixed();
          }
          let offerMediaObject;
          const sendingRtpParameters = utils.clone(this._sendingRtpParametersByKind[track.kind]);
          sendingRtpParameters.codecs = ortc.reduceCodecs(sendingRtpParameters.codecs);
          const sendingRemoteRtpParameters = utils.clone(this._sendingRemoteRtpParametersByKind[track.kind]);
          sendingRemoteRtpParameters.codecs = ortc.reduceCodecs(sendingRemoteRtpParameters.codecs);
          if (!this._transportReady) {
            await this.setupTransport({
              localDtlsRole: this._forcedLocalDtlsRole ?? "client",
              localSdpObject
            });
          }
          if (track.kind === "video" && encodings && encodings.length > 1) {
            logger.debug("send() | enabling simulcast");
            localSdpObject = sdpTransform.parse(offer.sdp);
            offerMediaObject = localSdpObject.media.find((m) => m.type === "video");
            sdpPlanBUtils.addLegacySimulcast({
              offerMediaObject,
              track,
              numStreams: encodings.length
            });
            offer = { type: "offer", sdp: sdpTransform.write(localSdpObject) };
          }
          logger.debug("send() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          offerMediaObject = localSdpObject.media.find((m) => m.type === track.kind);
          sendingRtpParameters.rtcp.cname = sdpCommonUtils.getCname({
            offerMediaObject
          });
          sendingRtpParameters.encodings = sdpPlanBUtils.getRtpEncodings({
            offerMediaObject,
            track
          });
          if (encodings) {
            for (let idx = 0; idx < sendingRtpParameters.encodings.length; ++idx) {
              if (encodings[idx]) {
                Object.assign(sendingRtpParameters.encodings[idx], encodings[idx]);
              }
            }
          }
          if (sendingRtpParameters.encodings.length > 1 && sendingRtpParameters.codecs[0].mimeType.toLowerCase() === "video/vp8") {
            for (const encoding of sendingRtpParameters.encodings) {
              encoding.scalabilityMode = "L1T3";
            }
          }
          this._remoteSdp.send({
            offerMediaObject,
            offerRtpParameters: sendingRtpParameters,
            answerRtpParameters: sendingRemoteRtpParameters,
            codecOptions
          });
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("send() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
          const localId = String(this._nextSendLocalId);
          this._nextSendLocalId++;
          const rtpSender = this._pc.getSenders().find((s) => s.track === track);
          this._mapSendLocalIdRtpSender.set(localId, rtpSender);
          return {
            localId,
            rtpParameters: sendingRtpParameters,
            rtpSender
          };
        }
        async stopSending(localId) {
          this.assertSendDirection();
          const rtpSender = this._mapSendLocalIdRtpSender.get(localId);
          if (!rtpSender) {
            throw new Error("associated RTCRtpSender not found");
          }
          if (rtpSender.track) {
            this._sendStream.removeTrack(rtpSender.track);
          }
          this._mapSendLocalIdRtpSender.delete(localId);
          const offer = await this._pc.createOffer();
          logger.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", offer);
          try {
            await this._pc.setLocalDescription(offer);
          } catch (error) {
            if (this._sendStream.getTracks().length === 0) {
              logger.warn("stopSending() | ignoring expected error due no sending tracks: %s", error.toString());
              return;
            }
            throw error;
          }
          if (this._pc.signalingState === "stable") {
            return;
          }
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async pauseSending(localId) {
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async resumeSending(localId) {
        }
        async replaceTrack(localId, track) {
          this.assertSendDirection();
          if (track) {
            logger.debug("replaceTrack() [localId:%s, track.id:%s]", localId, track.id);
          } else {
            logger.debug("replaceTrack() [localId:%s, no track]", localId);
          }
          const rtpSender = this._mapSendLocalIdRtpSender.get(localId);
          if (!rtpSender) {
            throw new Error("associated RTCRtpSender not found");
          }
          const oldTrack = rtpSender.track;
          await rtpSender.replaceTrack(track);
          if (oldTrack) {
            this._sendStream.removeTrack(oldTrack);
          }
          if (track) {
            this._sendStream.addTrack(track);
          }
        }
        async setMaxSpatialLayer(localId, spatialLayer) {
          this.assertSendDirection();
          logger.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", localId, spatialLayer);
          const rtpSender = this._mapSendLocalIdRtpSender.get(localId);
          if (!rtpSender) {
            throw new Error("associated RTCRtpSender not found");
          }
          const parameters = rtpSender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
            if (idx <= spatialLayer) {
              encoding.active = true;
            } else {
              encoding.active = false;
            }
          });
          await rtpSender.setParameters(parameters);
        }
        async setRtpEncodingParameters(localId, params2) {
          this.assertSendDirection();
          logger.debug("setRtpEncodingParameters() [localId:%s, params:%o]", localId, params2);
          const rtpSender = this._mapSendLocalIdRtpSender.get(localId);
          if (!rtpSender) {
            throw new Error("associated RTCRtpSender not found");
          }
          const parameters = rtpSender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
            parameters.encodings[idx] = { ...encoding, ...params2 };
          });
          await rtpSender.setParameters(parameters);
        }
        async getSenderStats(localId) {
          this.assertSendDirection();
          const rtpSender = this._mapSendLocalIdRtpSender.get(localId);
          if (!rtpSender) {
            throw new Error("associated RTCRtpSender not found");
          }
          return rtpSender.getStats();
        }
        async sendDataChannel({ ordered, maxPacketLifeTime, maxRetransmits, label, protocol: protocol4 }) {
          this.assertSendDirection();
          const options = {
            negotiated: true,
            id: this._nextSendSctpStreamId,
            ordered,
            maxPacketLifeTime,
            maxRetransmits,
            protocol: protocol4
          };
          logger.debug("sendDataChannel() [options:%o]", options);
          const dataChannel = this._pc.createDataChannel(label, options);
          this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % SCTP_NUM_STREAMS.MIS;
          if (!this._hasDataChannelMediaSection) {
            const offer = await this._pc.createOffer();
            const localSdpObject = sdpTransform.parse(offer.sdp);
            const offerMediaObject = localSdpObject.media.find((m) => m.type === "application");
            if (!this._transportReady) {
              await this.setupTransport({
                localDtlsRole: this._forcedLocalDtlsRole ?? "client",
                localSdpObject
              });
            }
            logger.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", offer);
            await this._pc.setLocalDescription(offer);
            this._remoteSdp.sendSctpAssociation({ offerMediaObject });
            const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
            logger.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setRemoteDescription(answer);
            this._hasDataChannelMediaSection = true;
          }
          const sctpStreamParameters = {
            streamId: options.id,
            ordered: options.ordered,
            maxPacketLifeTime: options.maxPacketLifeTime,
            maxRetransmits: options.maxRetransmits
          };
          return { dataChannel, sctpStreamParameters };
        }
        async receive(optionsList) {
          this.assertRecvDirection();
          const results = [];
          for (const options of optionsList) {
            const { trackId, kind, rtpParameters, streamId } = options;
            logger.debug("receive() [trackId:%s, kind:%s]", trackId, kind);
            const mid = kind;
            this._remoteSdp.receive({
              mid,
              kind,
              offerRtpParameters: rtpParameters,
              streamId: streamId ?? rtpParameters.rtcp.cname,
              trackId
            });
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          let answer = await this._pc.createAnswer();
          const localSdpObject = sdpTransform.parse(answer.sdp);
          for (const options of optionsList) {
            const { kind, rtpParameters } = options;
            const mid = kind;
            const answerMediaObject = localSdpObject.media.find((m) => String(m.mid) === mid);
            sdpCommonUtils.applyCodecParameters({
              offerRtpParameters: rtpParameters,
              answerMediaObject
            });
          }
          answer = { type: "answer", sdp: sdpTransform.write(localSdpObject) };
          if (!this._transportReady) {
            await this.setupTransport({
              localDtlsRole: this._forcedLocalDtlsRole ?? "client",
              localSdpObject
            });
          }
          logger.debug("receive() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
          for (const options of optionsList) {
            const { kind, trackId, rtpParameters } = options;
            const mid = kind;
            const localId = trackId;
            const rtpReceiver = this._pc.getReceivers().find((r) => r.track && r.track.id === localId);
            if (!rtpReceiver) {
              throw new Error("new RTCRtpReceiver not");
            }
            this._mapRecvLocalIdInfo.set(localId, {
              mid,
              rtpParameters,
              rtpReceiver
            });
            results.push({
              localId,
              track: rtpReceiver.track,
              rtpReceiver
            });
          }
          return results;
        }
        async stopReceiving(localIds) {
          this.assertRecvDirection();
          for (const localId of localIds) {
            logger.debug("stopReceiving() [localId:%s]", localId);
            const { mid, rtpParameters } = this._mapRecvLocalIdInfo.get(localId) ?? {};
            this._mapRecvLocalIdInfo.delete(localId);
            this._remoteSdp.planBStopReceiving({
              mid,
              offerRtpParameters: rtpParameters
            });
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
        }
        async getReceiverStats(localId) {
          this.assertRecvDirection();
          const { rtpReceiver } = this._mapRecvLocalIdInfo.get(localId) ?? {};
          if (!rtpReceiver) {
            throw new Error("associated RTCRtpReceiver not found");
          }
          return rtpReceiver.getStats();
        }
        async pauseReceiving(localIds) {
        }
        async resumeReceiving(localIds) {
        }
        async receiveDataChannel({ sctpStreamParameters, label, protocol: protocol4 }) {
          this.assertRecvDirection();
          const { streamId, ordered, maxPacketLifeTime, maxRetransmits } = sctpStreamParameters;
          const options = {
            negotiated: true,
            id: streamId,
            ordered,
            maxPacketLifeTime,
            maxRetransmits,
            protocol: protocol4
          };
          logger.debug("receiveDataChannel() [options:%o]", options);
          const dataChannel = this._pc.createDataChannel(label, options);
          if (!this._hasDataChannelMediaSection) {
            this._remoteSdp.receiveSctpAssociation({ oldDataChannelSpec: true });
            const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
            logger.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", offer);
            await this._pc.setRemoteDescription(offer);
            const answer = await this._pc.createAnswer();
            if (!this._transportReady) {
              const localSdpObject = sdpTransform.parse(answer.sdp);
              await this.setupTransport({
                localDtlsRole: this._forcedLocalDtlsRole ?? "client",
                localSdpObject
              });
            }
            logger.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setLocalDescription(answer);
            this._hasDataChannelMediaSection = true;
          }
          return { dataChannel };
        }
        async setupTransport({ localDtlsRole, localSdpObject }) {
          if (!localSdpObject) {
            localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          }
          const dtlsParameters = sdpCommonUtils.extractDtlsParameters({
            sdpObject: localSdpObject
          });
          dtlsParameters.role = localDtlsRole;
          this._remoteSdp.updateDtlsRole(localDtlsRole === "client" ? "server" : "client");
          await new Promise((resolve, reject) => {
            this.safeEmit("@connect", { dtlsParameters }, resolve, reject);
          });
          this._transportReady = true;
        }
        assertSendDirection() {
          if (this._direction !== "send") {
            throw new Error('method can just be called for handlers with "send" direction');
          }
        }
        assertRecvDirection() {
          if (this._direction !== "recv") {
            throw new Error('method can just be called for handlers with "recv" direction');
          }
        }
      };
      exports.Safari11 = Safari11;
    }
  });

  // node_modules/mediasoup-client/lib/handlers/ortc/edgeUtils.js
  var require_edgeUtils = __commonJS({
    "node_modules/mediasoup-client/lib/handlers/ortc/edgeUtils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getCapabilities = getCapabilities;
      exports.mangleRtpParameters = mangleRtpParameters;
      var utils = require_utils();
      function getCapabilities() {
        const nativeCaps = RTCRtpReceiver.getCapabilities();
        const caps = utils.clone(nativeCaps);
        for (const codec of caps.codecs ?? []) {
          codec.channels = codec.numChannels;
          delete codec.numChannels;
          codec.mimeType = codec.mimeType ?? `${codec.kind}/${codec.name}`;
          if (codec.parameters) {
            const parameters = codec.parameters;
            if (parameters.apt) {
              parameters.apt = Number(parameters.apt);
            }
            if (parameters["packetization-mode"]) {
              parameters["packetization-mode"] = Number(parameters["packetization-mode"]);
            }
          }
          for (const feedback of codec.rtcpFeedback ?? []) {
            if (!feedback.parameter) {
              feedback.parameter = "";
            }
          }
        }
        return caps;
      }
      function mangleRtpParameters(rtpParameters) {
        const params2 = utils.clone(rtpParameters);
        if (params2.mid) {
          params2.muxId = params2.mid;
          delete params2.mid;
        }
        for (const codec of params2.codecs) {
          if (codec.channels) {
            codec.numChannels = codec.channels;
            delete codec.channels;
          }
          if (codec.mimeType && !codec.name) {
            codec.name = codec.mimeType.split("/")[1];
          }
          delete codec.mimeType;
        }
        return params2;
      }
    }
  });

  // node_modules/mediasoup-client/lib/handlers/Edge11.js
  var require_Edge11 = __commonJS({
    "node_modules/mediasoup-client/lib/handlers/Edge11.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Edge11 = void 0;
      var Logger_1 = require_Logger();
      var errors_1 = require_errors();
      var utils = require_utils();
      var ortc = require_ortc();
      var edgeUtils = require_edgeUtils();
      var HandlerInterface_1 = require_HandlerInterface();
      var logger = new Logger_1.Logger("Edge11");
      var NAME = "Edge11";
      var Edge11 = class _Edge11 extends HandlerInterface_1.HandlerInterface {
        // Generic sending RTP parameters for audio and video.
        _sendingRtpParametersByKind;
        // Transport remote ICE parameters.
        _remoteIceParameters;
        // Transport remote ICE candidates.
        _remoteIceCandidates;
        // Transport remote DTLS parameters.
        _remoteDtlsParameters;
        // ICE gatherer.
        _iceGatherer;
        // ICE transport.
        _iceTransport;
        // DTLS transport.
        _dtlsTransport;
        // Map of RTCRtpSenders indexed by id.
        _rtpSenders = /* @__PURE__ */ new Map();
        // Map of RTCRtpReceivers indexed by id.
        _rtpReceivers = /* @__PURE__ */ new Map();
        // Next localId for sending tracks.
        _nextSendLocalId = 0;
        // Local RTCP CNAME.
        _cname;
        // Got transport local and remote parameters.
        _transportReady = false;
        /**
         * Creates a factory function.
         */
        static createFactory() {
          return () => new _Edge11();
        }
        constructor() {
          super();
        }
        get name() {
          return NAME;
        }
        close() {
          logger.debug("close()");
          try {
            this._iceGatherer.close();
          } catch (error) {
          }
          try {
            this._iceTransport.stop();
          } catch (error) {
          }
          try {
            this._dtlsTransport.stop();
          } catch (error) {
          }
          for (const rtpSender of this._rtpSenders.values()) {
            try {
              rtpSender.stop();
            } catch (error) {
            }
          }
          for (const rtpReceiver of this._rtpReceivers.values()) {
            try {
              rtpReceiver.stop();
            } catch (error) {
            }
          }
          this.emit("@close");
        }
        async getNativeRtpCapabilities() {
          logger.debug("getNativeRtpCapabilities()");
          return edgeUtils.getCapabilities();
        }
        async getNativeSctpCapabilities() {
          logger.debug("getNativeSctpCapabilities()");
          return {
            numStreams: { OS: 0, MIS: 0 }
          };
        }
        run({
          direction,
          // eslint-disable-line @typescript-eslint/no-unused-vars
          iceParameters,
          iceCandidates,
          dtlsParameters,
          sctpParameters,
          // eslint-disable-line @typescript-eslint/no-unused-vars
          iceServers,
          iceTransportPolicy,
          additionalSettings,
          // eslint-disable-line @typescript-eslint/no-unused-vars
          proprietaryConstraints,
          // eslint-disable-line @typescript-eslint/no-unused-vars
          extendedRtpCapabilities
        }) {
          logger.debug("run()");
          this._sendingRtpParametersByKind = {
            audio: ortc.getSendingRtpParameters("audio", extendedRtpCapabilities),
            video: ortc.getSendingRtpParameters("video", extendedRtpCapabilities)
          };
          this._remoteIceParameters = iceParameters;
          this._remoteIceCandidates = iceCandidates;
          this._remoteDtlsParameters = dtlsParameters;
          this._cname = `CNAME-${utils.generateRandomNumber()}`;
          this.setIceGatherer({ iceServers, iceTransportPolicy });
          this.setIceTransport();
          this.setDtlsTransport();
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async updateIceServers(iceServers) {
          throw new errors_1.UnsupportedError("not supported");
        }
        async restartIce(iceParameters) {
          logger.debug("restartIce()");
          this._remoteIceParameters = iceParameters;
          if (!this._transportReady) {
            return;
          }
          logger.debug("restartIce() | calling iceTransport.start()");
          this._iceTransport.start(this._iceGatherer, iceParameters, "controlling");
          for (const candidate of this._remoteIceCandidates) {
            this._iceTransport.addRemoteCandidate(candidate);
          }
          this._iceTransport.addRemoteCandidate({});
        }
        async getTransportStats() {
          return this._iceTransport.getStats();
        }
        async send({ track, encodings, codecOptions, codec }) {
          logger.debug("send() [kind:%s, track.id:%s]", track.kind, track.id);
          if (!this._transportReady) {
            await this.setupTransport({ localDtlsRole: "server" });
          }
          logger.debug("send() | calling new RTCRtpSender()");
          const rtpSender = new RTCRtpSender(track, this._dtlsTransport);
          const rtpParameters = utils.clone(this._sendingRtpParametersByKind[track.kind]);
          rtpParameters.codecs = ortc.reduceCodecs(rtpParameters.codecs, codec);
          const useRtx = rtpParameters.codecs.some((_codec) => /.+\/rtx$/i.test(_codec.mimeType));
          if (!encodings) {
            encodings = [{}];
          }
          for (const encoding of encodings) {
            encoding.ssrc = utils.generateRandomNumber();
            if (useRtx) {
              encoding.rtx = { ssrc: utils.generateRandomNumber() };
            }
          }
          rtpParameters.encodings = encodings;
          rtpParameters.rtcp = {
            cname: this._cname,
            reducedSize: true,
            mux: true
          };
          const edgeRtpParameters = edgeUtils.mangleRtpParameters(rtpParameters);
          logger.debug("send() | calling rtpSender.send() [params:%o]", edgeRtpParameters);
          await rtpSender.send(edgeRtpParameters);
          const localId = String(this._nextSendLocalId);
          this._nextSendLocalId++;
          this._rtpSenders.set(localId, rtpSender);
          return { localId, rtpParameters, rtpSender };
        }
        async stopSending(localId) {
          logger.debug("stopSending() [localId:%s]", localId);
          const rtpSender = this._rtpSenders.get(localId);
          if (!rtpSender) {
            throw new Error("RTCRtpSender not found");
          }
          this._rtpSenders.delete(localId);
          try {
            logger.debug("stopSending() | calling rtpSender.stop()");
            rtpSender.stop();
          } catch (error) {
            logger.warn("stopSending() | rtpSender.stop() failed:%o", error);
            throw error;
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async pauseSending(localId) {
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async resumeSending(localId) {
        }
        async replaceTrack(localId, track) {
          if (track) {
            logger.debug("replaceTrack() [localId:%s, track.id:%s]", localId, track.id);
          } else {
            logger.debug("replaceTrack() [localId:%s, no track]", localId);
          }
          const rtpSender = this._rtpSenders.get(localId);
          if (!rtpSender) {
            throw new Error("RTCRtpSender not found");
          }
          rtpSender.setTrack(track);
        }
        async setMaxSpatialLayer(localId, spatialLayer) {
          logger.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", localId, spatialLayer);
          const rtpSender = this._rtpSenders.get(localId);
          if (!rtpSender) {
            throw new Error("RTCRtpSender not found");
          }
          const parameters = rtpSender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
            if (idx <= spatialLayer) {
              encoding.active = true;
            } else {
              encoding.active = false;
            }
          });
          await rtpSender.setParameters(parameters);
        }
        async setRtpEncodingParameters(localId, params2) {
          logger.debug("setRtpEncodingParameters() [localId:%s, params:%o]", localId, params2);
          const rtpSender = this._rtpSenders.get(localId);
          if (!rtpSender) {
            throw new Error("RTCRtpSender not found");
          }
          const parameters = rtpSender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
            parameters.encodings[idx] = { ...encoding, ...params2 };
          });
          await rtpSender.setParameters(parameters);
        }
        async getSenderStats(localId) {
          const rtpSender = this._rtpSenders.get(localId);
          if (!rtpSender) {
            throw new Error("RTCRtpSender not found");
          }
          return rtpSender.getStats();
        }
        async sendDataChannel(options) {
          throw new errors_1.UnsupportedError("not implemented");
        }
        async receive(optionsList) {
          const results = [];
          for (const options of optionsList) {
            const { trackId, kind } = options;
            logger.debug("receive() [trackId:%s, kind:%s]", trackId, kind);
          }
          if (!this._transportReady) {
            await this.setupTransport({ localDtlsRole: "server" });
          }
          for (const options of optionsList) {
            const { trackId, kind, rtpParameters } = options;
            logger.debug("receive() | calling new RTCRtpReceiver()");
            const rtpReceiver = new RTCRtpReceiver(this._dtlsTransport, kind);
            rtpReceiver.addEventListener("error", (event) => {
              logger.error('rtpReceiver "error" event [event:%o]', event);
            });
            const edgeRtpParameters = edgeUtils.mangleRtpParameters(rtpParameters);
            logger.debug("receive() | calling rtpReceiver.receive() [params:%o]", edgeRtpParameters);
            await rtpReceiver.receive(edgeRtpParameters);
            const localId = trackId;
            this._rtpReceivers.set(localId, rtpReceiver);
            results.push({
              localId,
              track: rtpReceiver.track,
              rtpReceiver
            });
          }
          return results;
        }
        async stopReceiving(localIds) {
          for (const localId of localIds) {
            logger.debug("stopReceiving() [localId:%s]", localId);
            const rtpReceiver = this._rtpReceivers.get(localId);
            if (!rtpReceiver) {
              throw new Error("RTCRtpReceiver not found");
            }
            this._rtpReceivers.delete(localId);
            try {
              logger.debug("stopReceiving() | calling rtpReceiver.stop()");
              rtpReceiver.stop();
            } catch (error) {
              logger.warn("stopReceiving() | rtpReceiver.stop() failed:%o", error);
            }
          }
        }
        async pauseReceiving(localIds) {
        }
        async resumeReceiving(localIds) {
        }
        async getReceiverStats(localId) {
          const rtpReceiver = this._rtpReceivers.get(localId);
          if (!rtpReceiver) {
            throw new Error("RTCRtpReceiver not found");
          }
          return rtpReceiver.getStats();
        }
        async receiveDataChannel(options) {
          throw new errors_1.UnsupportedError("not implemented");
        }
        setIceGatherer({ iceServers, iceTransportPolicy }) {
          const iceGatherer = new RTCIceGatherer({
            iceServers: iceServers ?? [],
            gatherPolicy: iceTransportPolicy ?? "all"
          });
          iceGatherer.addEventListener("error", (event) => {
            logger.error('iceGatherer "error" event [event:%o]', event);
          });
          try {
            iceGatherer.gather();
          } catch (error) {
            logger.debug("setIceGatherer() | iceGatherer.gather() failed: %s", error.toString());
          }
          this._iceGatherer = iceGatherer;
        }
        setIceTransport() {
          const iceTransport = new RTCIceTransport(this._iceGatherer);
          iceTransport.addEventListener("statechange", () => {
            switch (iceTransport.state) {
              case "checking": {
                this.emit("@connectionstatechange", "connecting");
                break;
              }
              case "connected":
              case "completed": {
                this.emit("@connectionstatechange", "connected");
                break;
              }
              case "failed": {
                this.emit("@connectionstatechange", "failed");
                break;
              }
              case "disconnected": {
                this.emit("@connectionstatechange", "disconnected");
                break;
              }
              case "closed": {
                this.emit("@connectionstatechange", "closed");
                break;
              }
            }
          });
          iceTransport.addEventListener("icestatechange", () => {
            switch (iceTransport.state) {
              case "checking": {
                this.emit("@connectionstatechange", "connecting");
                break;
              }
              case "connected":
              case "completed": {
                this.emit("@connectionstatechange", "connected");
                break;
              }
              case "failed": {
                this.emit("@connectionstatechange", "failed");
                break;
              }
              case "disconnected": {
                this.emit("@connectionstatechange", "disconnected");
                break;
              }
              case "closed": {
                this.emit("@connectionstatechange", "closed");
                break;
              }
            }
          });
          iceTransport.addEventListener("candidatepairchange", (event) => {
            logger.debug('iceTransport "candidatepairchange" event [pair:%o]', event.pair);
          });
          this._iceTransport = iceTransport;
        }
        setDtlsTransport() {
          const dtlsTransport = new RTCDtlsTransport(this._iceTransport);
          dtlsTransport.addEventListener("statechange", () => {
            logger.debug('dtlsTransport "statechange" event [state:%s]', dtlsTransport.state);
          });
          dtlsTransport.addEventListener("dtlsstatechange", () => {
            logger.debug('dtlsTransport "dtlsstatechange" event [state:%s]', dtlsTransport.state);
            if (dtlsTransport.state === "closed") {
              this.emit("@connectionstatechange", "closed");
            }
          });
          dtlsTransport.addEventListener("error", (event) => {
            logger.error('dtlsTransport "error" event [event:%o]', event);
          });
          this._dtlsTransport = dtlsTransport;
        }
        async setupTransport({ localDtlsRole }) {
          logger.debug("setupTransport()");
          const dtlsParameters = this._dtlsTransport.getLocalParameters();
          dtlsParameters.role = localDtlsRole;
          await new Promise((resolve, reject) => {
            this.safeEmit("@connect", { dtlsParameters }, resolve, reject);
          });
          this._iceTransport.start(this._iceGatherer, this._remoteIceParameters, "controlling");
          for (const candidate of this._remoteIceCandidates) {
            this._iceTransport.addRemoteCandidate(candidate);
          }
          this._iceTransport.addRemoteCandidate({});
          this._remoteDtlsParameters.fingerprints = this._remoteDtlsParameters.fingerprints.filter((fingerprint) => {
            return fingerprint.algorithm === "sha-256" || fingerprint.algorithm === "sha-384" || fingerprint.algorithm === "sha-512";
          });
          this._dtlsTransport.start(this._remoteDtlsParameters);
          this._transportReady = true;
        }
      };
      exports.Edge11 = Edge11;
    }
  });

  // node_modules/mediasoup-client/lib/handlers/ReactNativeUnifiedPlan.js
  var require_ReactNativeUnifiedPlan = __commonJS({
    "node_modules/mediasoup-client/lib/handlers/ReactNativeUnifiedPlan.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ReactNativeUnifiedPlan = void 0;
      var sdpTransform = require_lib3();
      var Logger_1 = require_Logger();
      var utils = require_utils();
      var ortc = require_ortc();
      var sdpCommonUtils = require_commonUtils();
      var sdpUnifiedPlanUtils = require_unifiedPlanUtils();
      var ortcUtils = require_utils2();
      var errors_1 = require_errors();
      var HandlerInterface_1 = require_HandlerInterface();
      var RemoteSdp_1 = require_RemoteSdp();
      var scalabilityModes_1 = require_scalabilityModes();
      var logger = new Logger_1.Logger("ReactNativeUnifiedPlan");
      var NAME = "ReactNativeUnifiedPlan";
      var SCTP_NUM_STREAMS = { OS: 1024, MIS: 1024 };
      var ReactNativeUnifiedPlan = class _ReactNativeUnifiedPlan extends HandlerInterface_1.HandlerInterface {
        // Closed flag.
        _closed = false;
        // Handler direction.
        _direction;
        // Remote SDP handler.
        _remoteSdp;
        // Generic sending RTP parameters for audio and video.
        _sendingRtpParametersByKind;
        // Generic sending RTP parameters for audio and video suitable for the SDP
        // remote answer.
        _sendingRemoteRtpParametersByKind;
        // Initial server side DTLS role. If not 'auto', it will force the opposite
        // value in client side.
        _forcedLocalDtlsRole;
        // RTCPeerConnection instance.
        _pc;
        // Map of RTCTransceivers indexed by MID.
        _mapMidTransceiver = /* @__PURE__ */ new Map();
        // Local stream for sending.
        _sendStream = new MediaStream();
        // Whether a DataChannel m=application section has been created.
        _hasDataChannelMediaSection = false;
        // Sending DataChannel id value counter. Incremented for each new DataChannel.
        _nextSendSctpStreamId = 0;
        // Got transport local and remote parameters.
        _transportReady = false;
        /**
         * Creates a factory function.
         */
        static createFactory() {
          return () => new _ReactNativeUnifiedPlan();
        }
        constructor() {
          super();
        }
        get name() {
          return NAME;
        }
        close() {
          logger.debug("close()");
          if (this._closed) {
            return;
          }
          this._closed = true;
          this._sendStream.release(
            /* releaseTracks */
            false
          );
          if (this._pc) {
            try {
              this._pc.close();
            } catch (error) {
            }
          }
          this.emit("@close");
        }
        async getNativeRtpCapabilities() {
          logger.debug("getNativeRtpCapabilities()");
          const pc = new RTCPeerConnection({
            iceServers: [],
            iceTransportPolicy: "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require",
            sdpSemantics: "unified-plan"
          });
          try {
            pc.addTransceiver("audio");
            pc.addTransceiver("video");
            const offer = await pc.createOffer();
            try {
              pc.close();
            } catch (error) {
            }
            const sdpObject = sdpTransform.parse(offer.sdp);
            const nativeRtpCapabilities = sdpCommonUtils.extractRtpCapabilities({
              sdpObject
            });
            ortcUtils.addNackSupportForOpus(nativeRtpCapabilities);
            return nativeRtpCapabilities;
          } catch (error) {
            try {
              pc.close();
            } catch (error2) {
            }
            throw error;
          }
        }
        async getNativeSctpCapabilities() {
          logger.debug("getNativeSctpCapabilities()");
          return {
            numStreams: SCTP_NUM_STREAMS
          };
        }
        run({ direction, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, extendedRtpCapabilities }) {
          this.assertNotClosed();
          logger.debug("run()");
          this._direction = direction;
          this._remoteSdp = new RemoteSdp_1.RemoteSdp({
            iceParameters,
            iceCandidates,
            dtlsParameters,
            sctpParameters
          });
          this._sendingRtpParametersByKind = {
            audio: ortc.getSendingRtpParameters("audio", extendedRtpCapabilities),
            video: ortc.getSendingRtpParameters("video", extendedRtpCapabilities)
          };
          this._sendingRemoteRtpParametersByKind = {
            audio: ortc.getSendingRemoteRtpParameters("audio", extendedRtpCapabilities),
            video: ortc.getSendingRemoteRtpParameters("video", extendedRtpCapabilities)
          };
          if (dtlsParameters.role && dtlsParameters.role !== "auto") {
            this._forcedLocalDtlsRole = dtlsParameters.role === "server" ? "client" : "server";
          }
          this._pc = new RTCPeerConnection({
            iceServers: iceServers ?? [],
            iceTransportPolicy: iceTransportPolicy ?? "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require",
            sdpSemantics: "unified-plan",
            ...additionalSettings
          }, proprietaryConstraints);
          this._pc.addEventListener("icegatheringstatechange", () => {
            this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
          });
          this._pc.addEventListener("icecandidateerror", (event) => {
            this.emit("@icecandidateerror", event);
          });
          if (this._pc.connectionState) {
            this._pc.addEventListener("connectionstatechange", () => {
              this.emit("@connectionstatechange", this._pc.connectionState);
            });
          } else {
            this._pc.addEventListener("iceconnectionstatechange", () => {
              logger.warn("run() | pc.connectionState not supported, using pc.iceConnectionState");
              switch (this._pc.iceConnectionState) {
                case "checking": {
                  this.emit("@connectionstatechange", "connecting");
                  break;
                }
                case "connected":
                case "completed": {
                  this.emit("@connectionstatechange", "connected");
                  break;
                }
                case "failed": {
                  this.emit("@connectionstatechange", "failed");
                  break;
                }
                case "disconnected": {
                  this.emit("@connectionstatechange", "disconnected");
                  break;
                }
                case "closed": {
                  this.emit("@connectionstatechange", "closed");
                  break;
                }
              }
            });
          }
        }
        async updateIceServers(iceServers) {
          this.assertNotClosed();
          logger.debug("updateIceServers()");
          const configuration = this._pc.getConfiguration();
          configuration.iceServers = iceServers;
          this._pc.setConfiguration(configuration);
        }
        async restartIce(iceParameters) {
          this.assertNotClosed();
          logger.debug("restartIce()");
          this._remoteSdp.updateIceParameters(iceParameters);
          if (!this._transportReady) {
            return;
          }
          if (this._direction === "send") {
            const offer = await this._pc.createOffer({ iceRestart: true });
            logger.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", offer);
            await this._pc.setLocalDescription(offer);
            const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
            logger.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setRemoteDescription(answer);
          } else {
            const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
            logger.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", offer);
            await this._pc.setRemoteDescription(offer);
            const answer = await this._pc.createAnswer();
            logger.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", answer);
            await this._pc.setLocalDescription(answer);
          }
        }
        async getTransportStats() {
          this.assertNotClosed();
          return this._pc.getStats();
        }
        async send({ track, encodings, codecOptions, codec, onRtpSender }) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("send() [kind:%s, track.id:%s]", track.kind, track.id);
          if (encodings && encodings.length > 1) {
            encodings.forEach((encoding, idx) => {
              encoding.rid = `r${idx}`;
            });
          }
          const sendingRtpParameters = utils.clone(this._sendingRtpParametersByKind[track.kind]);
          sendingRtpParameters.codecs = ortc.reduceCodecs(sendingRtpParameters.codecs, codec);
          const sendingRemoteRtpParameters = utils.clone(this._sendingRemoteRtpParametersByKind[track.kind]);
          sendingRemoteRtpParameters.codecs = ortc.reduceCodecs(sendingRemoteRtpParameters.codecs, codec);
          const mediaSectionIdx = this._remoteSdp.getNextMediaSectionIdx();
          const transceiver = this._pc.addTransceiver(track, {
            direction: "sendonly",
            streams: [this._sendStream],
            sendEncodings: encodings
          });
          if (onRtpSender) {
            onRtpSender(transceiver.sender);
          }
          let offer = await this._pc.createOffer();
          let localSdpObject = sdpTransform.parse(offer.sdp);
          if (localSdpObject.extmapAllowMixed) {
            this._remoteSdp.setSessionExtmapAllowMixed();
          }
          let offerMediaObject;
          if (!this._transportReady) {
            await this.setupTransport({
              localDtlsRole: this._forcedLocalDtlsRole ?? "client",
              localSdpObject
            });
          }
          let hackVp9Svc = false;
          const layers = (0, scalabilityModes_1.parse)((encodings ?? [{}])[0].scalabilityMode);
          if (encodings && encodings.length === 1 && layers.spatialLayers > 1 && sendingRtpParameters.codecs[0].mimeType.toLowerCase() === "video/vp9") {
            logger.debug("send() | enabling legacy simulcast for VP9 SVC");
            hackVp9Svc = true;
            localSdpObject = sdpTransform.parse(offer.sdp);
            offerMediaObject = localSdpObject.media[mediaSectionIdx.idx];
            sdpUnifiedPlanUtils.addLegacySimulcast({
              offerMediaObject,
              numStreams: layers.spatialLayers
            });
            offer = { type: "offer", sdp: sdpTransform.write(localSdpObject) };
          }
          logger.debug("send() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          let localId = transceiver.mid ?? void 0;
          if (!localId) {
            logger.warn("send() | missing transceiver.mid (bug in react-native-webrtc, using a workaround");
          }
          sendingRtpParameters.mid = localId;
          localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          offerMediaObject = localSdpObject.media[mediaSectionIdx.idx];
          sendingRtpParameters.rtcp.cname = sdpCommonUtils.getCname({
            offerMediaObject
          });
          if (!encodings) {
            sendingRtpParameters.encodings = sdpUnifiedPlanUtils.getRtpEncodings({
              offerMediaObject
            });
          } else if (encodings.length === 1) {
            let newEncodings = sdpUnifiedPlanUtils.getRtpEncodings({
              offerMediaObject
            });
            Object.assign(newEncodings[0], encodings[0]);
            if (hackVp9Svc) {
              newEncodings = [newEncodings[0]];
            }
            sendingRtpParameters.encodings = newEncodings;
          } else {
            sendingRtpParameters.encodings = encodings;
          }
          if (sendingRtpParameters.encodings.length > 1 && (sendingRtpParameters.codecs[0].mimeType.toLowerCase() === "video/vp8" || sendingRtpParameters.codecs[0].mimeType.toLowerCase() === "video/h264")) {
            for (const encoding of sendingRtpParameters.encodings) {
              if (encoding.scalabilityMode) {
                encoding.scalabilityMode = `L1T${layers.temporalLayers}`;
              } else {
                encoding.scalabilityMode = "L1T3";
              }
            }
          }
          this._remoteSdp.send({
            offerMediaObject,
            reuseMid: mediaSectionIdx.reuseMid,
            offerRtpParameters: sendingRtpParameters,
            answerRtpParameters: sendingRemoteRtpParameters,
            codecOptions
          });
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("send() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
          if (!localId) {
            localId = transceiver.mid;
            sendingRtpParameters.mid = localId;
          }
          this._mapMidTransceiver.set(localId, transceiver);
          return {
            localId,
            rtpParameters: sendingRtpParameters,
            rtpSender: transceiver.sender
          };
        }
        async stopSending(localId) {
          this.assertSendDirection();
          if (this._closed) {
            return;
          }
          logger.debug("stopSending() [localId:%s]", localId);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          void transceiver.sender.replaceTrack(null);
          this._pc.removeTrack(transceiver.sender);
          const mediaSectionClosed = this._remoteSdp.closeMediaSection(transceiver.mid);
          if (mediaSectionClosed) {
            try {
              transceiver.stop();
            } catch (error) {
            }
          }
          const offer = await this._pc.createOffer();
          logger.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
          this._mapMidTransceiver.delete(localId);
        }
        async pauseSending(localId) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("pauseSending() [localId:%s]", localId);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          transceiver.direction = "inactive";
          this._remoteSdp.pauseMediaSection(localId);
          const offer = await this._pc.createOffer();
          logger.debug("pauseSending() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("pauseSending() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async resumeSending(localId) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("resumeSending() [localId:%s]", localId);
          const transceiver = this._mapMidTransceiver.get(localId);
          this._remoteSdp.resumeSendingMediaSection(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          transceiver.direction = "sendonly";
          const offer = await this._pc.createOffer();
          logger.debug("resumeSending() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("resumeSending() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async replaceTrack(localId, track) {
          this.assertNotClosed();
          this.assertSendDirection();
          if (track) {
            logger.debug("replaceTrack() [localId:%s, track.id:%s]", localId, track.id);
          } else {
            logger.debug("replaceTrack() [localId:%s, no track]", localId);
          }
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          await transceiver.sender.replaceTrack(track);
        }
        async setMaxSpatialLayer(localId, spatialLayer) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", localId, spatialLayer);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          const parameters = transceiver.sender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
            if (idx <= spatialLayer) {
              encoding.active = true;
            } else {
              encoding.active = false;
            }
          });
          await transceiver.sender.setParameters(parameters);
          this._remoteSdp.muxMediaSectionSimulcast(localId, parameters.encodings);
          const offer = await this._pc.createOffer();
          logger.debug("setMaxSpatialLayer() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("setMaxSpatialLayer() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async setRtpEncodingParameters(localId, params2) {
          this.assertNotClosed();
          this.assertSendDirection();
          logger.debug("setRtpEncodingParameters() [localId:%s, params:%o]", localId, params2);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          const parameters = transceiver.sender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
            parameters.encodings[idx] = { ...encoding, ...params2 };
          });
          await transceiver.sender.setParameters(parameters);
          this._remoteSdp.muxMediaSectionSimulcast(localId, parameters.encodings);
          const offer = await this._pc.createOffer();
          logger.debug("setRtpEncodingParameters() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("setRtpEncodingParameters() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        async getSenderStats(localId) {
          this.assertNotClosed();
          this.assertSendDirection();
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          return transceiver.sender.getStats();
        }
        async sendDataChannel({ ordered, maxPacketLifeTime, maxRetransmits, label, protocol: protocol4 }) {
          this.assertNotClosed();
          this.assertSendDirection();
          const options = {
            negotiated: true,
            id: this._nextSendSctpStreamId,
            ordered,
            maxPacketLifeTime,
            maxRetransmits,
            protocol: protocol4
          };
          logger.debug("sendDataChannel() [options:%o]", options);
          const dataChannel = this._pc.createDataChannel(label, options);
          this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % SCTP_NUM_STREAMS.MIS;
          if (!this._hasDataChannelMediaSection) {
            const offer = await this._pc.createOffer();
            const localSdpObject = sdpTransform.parse(offer.sdp);
            const offerMediaObject = localSdpObject.media.find((m) => m.type === "application");
            if (!this._transportReady) {
              await this.setupTransport({
                localDtlsRole: this._forcedLocalDtlsRole ?? "client",
                localSdpObject
              });
            }
            logger.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", offer);
            await this._pc.setLocalDescription(offer);
            this._remoteSdp.sendSctpAssociation({ offerMediaObject });
            const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
            logger.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setRemoteDescription(answer);
            this._hasDataChannelMediaSection = true;
          }
          const sctpStreamParameters = {
            streamId: options.id,
            ordered: options.ordered,
            maxPacketLifeTime: options.maxPacketLifeTime,
            maxRetransmits: options.maxRetransmits
          };
          return { dataChannel, sctpStreamParameters };
        }
        async receive(optionsList) {
          this.assertNotClosed();
          this.assertRecvDirection();
          const results = [];
          const mapLocalId = /* @__PURE__ */ new Map();
          for (const options of optionsList) {
            const { trackId, kind, rtpParameters, streamId } = options;
            logger.debug("receive() [trackId:%s, kind:%s]", trackId, kind);
            const localId = rtpParameters.mid ?? String(this._mapMidTransceiver.size);
            mapLocalId.set(trackId, localId);
            this._remoteSdp.receive({
              mid: localId,
              kind,
              offerRtpParameters: rtpParameters,
              streamId: streamId ?? rtpParameters.rtcp.cname,
              trackId
            });
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          for (const options of optionsList) {
            const { trackId, onRtpReceiver } = options;
            if (onRtpReceiver) {
              const localId = mapLocalId.get(trackId);
              const transceiver = this._pc.getTransceivers().find((t) => t.mid === localId);
              if (!transceiver) {
                throw new Error("transceiver not found");
              }
              onRtpReceiver(transceiver.receiver);
            }
          }
          let answer = await this._pc.createAnswer();
          const localSdpObject = sdpTransform.parse(answer.sdp);
          for (const options of optionsList) {
            const { trackId, rtpParameters } = options;
            const localId = mapLocalId.get(trackId);
            const answerMediaObject = localSdpObject.media.find((m) => String(m.mid) === localId);
            sdpCommonUtils.applyCodecParameters({
              offerRtpParameters: rtpParameters,
              answerMediaObject
            });
          }
          answer = { type: "answer", sdp: sdpTransform.write(localSdpObject) };
          if (!this._transportReady) {
            await this.setupTransport({
              localDtlsRole: this._forcedLocalDtlsRole ?? "client",
              localSdpObject
            });
          }
          logger.debug("receive() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
          for (const options of optionsList) {
            const { trackId } = options;
            const localId = mapLocalId.get(trackId);
            const transceiver = this._pc.getTransceivers().find((t) => t.mid === localId);
            if (!transceiver) {
              throw new Error("new RTCRtpTransceiver not found");
            } else {
              this._mapMidTransceiver.set(localId, transceiver);
              results.push({
                localId,
                track: transceiver.receiver.track,
                rtpReceiver: transceiver.receiver
              });
            }
          }
          return results;
        }
        async stopReceiving(localIds) {
          this.assertRecvDirection();
          if (this._closed) {
            return;
          }
          for (const localId of localIds) {
            logger.debug("stopReceiving() [localId:%s]", localId);
            const transceiver = this._mapMidTransceiver.get(localId);
            if (!transceiver) {
              throw new Error("associated RTCRtpTransceiver not found");
            }
            this._remoteSdp.closeMediaSection(transceiver.mid);
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
          for (const localId of localIds) {
            this._mapMidTransceiver.delete(localId);
          }
        }
        async pauseReceiving(localIds) {
          this.assertNotClosed();
          this.assertRecvDirection();
          for (const localId of localIds) {
            logger.debug("pauseReceiving() [localId:%s]", localId);
            const transceiver = this._mapMidTransceiver.get(localId);
            if (!transceiver) {
              throw new Error("associated RTCRtpTransceiver not found");
            }
            transceiver.direction = "inactive";
            this._remoteSdp.pauseMediaSection(localId);
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("pauseReceiving() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug("pauseReceiving() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
        }
        async resumeReceiving(localIds) {
          this.assertNotClosed();
          this.assertRecvDirection();
          for (const localId of localIds) {
            logger.debug("resumeReceiving() [localId:%s]", localId);
            const transceiver = this._mapMidTransceiver.get(localId);
            if (!transceiver) {
              throw new Error("associated RTCRtpTransceiver not found");
            }
            transceiver.direction = "recvonly";
            this._remoteSdp.resumeReceivingMediaSection(localId);
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("resumeReceiving() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug("resumeReceiving() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
        }
        async getReceiverStats(localId) {
          this.assertNotClosed();
          this.assertRecvDirection();
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver) {
            throw new Error("associated RTCRtpTransceiver not found");
          }
          return transceiver.receiver.getStats();
        }
        async receiveDataChannel({ sctpStreamParameters, label, protocol: protocol4 }) {
          this.assertNotClosed();
          this.assertRecvDirection();
          const { streamId, ordered, maxPacketLifeTime, maxRetransmits } = sctpStreamParameters;
          const options = {
            negotiated: true,
            id: streamId,
            ordered,
            maxPacketLifeTime,
            maxRetransmits,
            protocol: protocol4
          };
          logger.debug("receiveDataChannel() [options:%o]", options);
          const dataChannel = this._pc.createDataChannel(label, options);
          if (!this._hasDataChannelMediaSection) {
            this._remoteSdp.receiveSctpAssociation();
            const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
            logger.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", offer);
            await this._pc.setRemoteDescription(offer);
            const answer = await this._pc.createAnswer();
            if (!this._transportReady) {
              const localSdpObject = sdpTransform.parse(answer.sdp);
              await this.setupTransport({
                localDtlsRole: this._forcedLocalDtlsRole ?? "client",
                localSdpObject
              });
            }
            logger.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setLocalDescription(answer);
            this._hasDataChannelMediaSection = true;
          }
          return { dataChannel };
        }
        async setupTransport({ localDtlsRole, localSdpObject }) {
          if (!localSdpObject) {
            localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          }
          const dtlsParameters = sdpCommonUtils.extractDtlsParameters({
            sdpObject: localSdpObject
          });
          dtlsParameters.role = localDtlsRole;
          this._remoteSdp.updateDtlsRole(localDtlsRole === "client" ? "server" : "client");
          await new Promise((resolve, reject) => {
            this.safeEmit("@connect", { dtlsParameters }, resolve, reject);
          });
          this._transportReady = true;
        }
        assertNotClosed() {
          if (this._closed) {
            throw new errors_1.InvalidStateError("method called in a closed handler");
          }
        }
        assertSendDirection() {
          if (this._direction !== "send") {
            throw new Error('method can just be called for handlers with "send" direction');
          }
        }
        assertRecvDirection() {
          if (this._direction !== "recv") {
            throw new Error('method can just be called for handlers with "recv" direction');
          }
        }
      };
      exports.ReactNativeUnifiedPlan = ReactNativeUnifiedPlan;
    }
  });

  // node_modules/mediasoup-client/lib/handlers/ReactNative.js
  var require_ReactNative = __commonJS({
    "node_modules/mediasoup-client/lib/handlers/ReactNative.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ReactNative = void 0;
      var sdpTransform = require_lib3();
      var Logger_1 = require_Logger();
      var errors_1 = require_errors();
      var utils = require_utils();
      var ortc = require_ortc();
      var sdpCommonUtils = require_commonUtils();
      var sdpPlanBUtils = require_planBUtils();
      var HandlerInterface_1 = require_HandlerInterface();
      var RemoteSdp_1 = require_RemoteSdp();
      var logger = new Logger_1.Logger("ReactNative");
      var NAME = "ReactNative";
      var SCTP_NUM_STREAMS = { OS: 1024, MIS: 1024 };
      var ReactNative = class _ReactNative extends HandlerInterface_1.HandlerInterface {
        // Handler direction.
        _direction;
        // Remote SDP handler.
        _remoteSdp;
        // Generic sending RTP parameters for audio and video.
        _sendingRtpParametersByKind;
        // Generic sending RTP parameters for audio and video suitable for the SDP
        // remote answer.
        _sendingRemoteRtpParametersByKind;
        // Initial server side DTLS role. If not 'auto', it will force the opposite
        // value in client side.
        _forcedLocalDtlsRole;
        // RTCPeerConnection instance.
        _pc;
        // Local stream for sending.
        _sendStream = new MediaStream();
        // Map of sending MediaStreamTracks indexed by localId.
        _mapSendLocalIdTrack = /* @__PURE__ */ new Map();
        // Next sending localId.
        _nextSendLocalId = 0;
        // Map of MID, RTP parameters and RTCRtpReceiver indexed by local id.
        // Value is an Object with mid, rtpParameters and rtpReceiver.
        _mapRecvLocalIdInfo = /* @__PURE__ */ new Map();
        // Whether a DataChannel m=application section has been created.
        _hasDataChannelMediaSection = false;
        // Sending DataChannel id value counter. Incremented for each new DataChannel.
        _nextSendSctpStreamId = 0;
        // Got transport local and remote parameters.
        _transportReady = false;
        /**
         * Creates a factory function.
         */
        static createFactory() {
          return () => new _ReactNative();
        }
        constructor() {
          super();
        }
        get name() {
          return NAME;
        }
        close() {
          logger.debug("close()");
          this._sendStream.release(
            /* releaseTracks */
            false
          );
          if (this._pc) {
            try {
              this._pc.close();
            } catch (error) {
            }
          }
          this.emit("@close");
        }
        async getNativeRtpCapabilities() {
          logger.debug("getNativeRtpCapabilities()");
          const pc = new RTCPeerConnection({
            iceServers: [],
            iceTransportPolicy: "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require",
            sdpSemantics: "plan-b"
          });
          try {
            const offer = await pc.createOffer({
              offerToReceiveAudio: true,
              offerToReceiveVideo: true
            });
            try {
              pc.close();
            } catch (error) {
            }
            const sdpObject = sdpTransform.parse(offer.sdp);
            const nativeRtpCapabilities = sdpCommonUtils.extractRtpCapabilities({
              sdpObject
            });
            return nativeRtpCapabilities;
          } catch (error) {
            try {
              pc.close();
            } catch (error2) {
            }
            throw error;
          }
        }
        async getNativeSctpCapabilities() {
          logger.debug("getNativeSctpCapabilities()");
          return {
            numStreams: SCTP_NUM_STREAMS
          };
        }
        run({ direction, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, extendedRtpCapabilities }) {
          logger.debug("run()");
          this._direction = direction;
          this._remoteSdp = new RemoteSdp_1.RemoteSdp({
            iceParameters,
            iceCandidates,
            dtlsParameters,
            sctpParameters,
            planB: true
          });
          this._sendingRtpParametersByKind = {
            audio: ortc.getSendingRtpParameters("audio", extendedRtpCapabilities),
            video: ortc.getSendingRtpParameters("video", extendedRtpCapabilities)
          };
          this._sendingRemoteRtpParametersByKind = {
            audio: ortc.getSendingRemoteRtpParameters("audio", extendedRtpCapabilities),
            video: ortc.getSendingRemoteRtpParameters("video", extendedRtpCapabilities)
          };
          if (dtlsParameters.role && dtlsParameters.role !== "auto") {
            this._forcedLocalDtlsRole = dtlsParameters.role === "server" ? "client" : "server";
          }
          this._pc = new RTCPeerConnection({
            iceServers: iceServers ?? [],
            iceTransportPolicy: iceTransportPolicy ?? "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require",
            sdpSemantics: "plan-b",
            ...additionalSettings
          }, proprietaryConstraints);
          this._pc.addEventListener("icegatheringstatechange", () => {
            this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
          });
          this._pc.addEventListener("icecandidateerror", (event) => {
            this.emit("@icecandidateerror", event);
          });
          if (this._pc.connectionState) {
            this._pc.addEventListener("connectionstatechange", () => {
              this.emit("@connectionstatechange", this._pc.connectionState);
            });
          } else {
            this._pc.addEventListener("iceconnectionstatechange", () => {
              logger.warn("run() | pc.connectionState not supported, using pc.iceConnectionState");
              switch (this._pc.iceConnectionState) {
                case "checking": {
                  this.emit("@connectionstatechange", "connecting");
                  break;
                }
                case "connected":
                case "completed": {
                  this.emit("@connectionstatechange", "connected");
                  break;
                }
                case "failed": {
                  this.emit("@connectionstatechange", "failed");
                  break;
                }
                case "disconnected": {
                  this.emit("@connectionstatechange", "disconnected");
                  break;
                }
                case "closed": {
                  this.emit("@connectionstatechange", "closed");
                  break;
                }
              }
            });
          }
        }
        async updateIceServers(iceServers) {
          logger.debug("updateIceServers()");
          const configuration = this._pc.getConfiguration();
          configuration.iceServers = iceServers;
          this._pc.setConfiguration(configuration);
        }
        async restartIce(iceParameters) {
          logger.debug("restartIce()");
          this._remoteSdp.updateIceParameters(iceParameters);
          if (!this._transportReady) {
            return;
          }
          if (this._direction === "send") {
            const offer = await this._pc.createOffer({ iceRestart: true });
            logger.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", offer);
            await this._pc.setLocalDescription(offer);
            const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
            logger.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setRemoteDescription(answer);
          } else {
            const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
            logger.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", offer);
            await this._pc.setRemoteDescription(offer);
            const answer = await this._pc.createAnswer();
            logger.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", answer);
            await this._pc.setLocalDescription(answer);
          }
        }
        async getTransportStats() {
          return this._pc.getStats();
        }
        async send({ track, encodings, codecOptions, codec }) {
          this.assertSendDirection();
          logger.debug("send() [kind:%s, track.id:%s]", track.kind, track.id);
          if (codec) {
            logger.warn("send() | codec selection is not available in %s handler", this.name);
          }
          this._sendStream.addTrack(track);
          this._pc.addStream(this._sendStream);
          let offer = await this._pc.createOffer();
          let localSdpObject = sdpTransform.parse(offer.sdp);
          if (localSdpObject.extmapAllowMixed) {
            this._remoteSdp.setSessionExtmapAllowMixed();
          }
          let offerMediaObject;
          const sendingRtpParameters = utils.clone(this._sendingRtpParametersByKind[track.kind]);
          sendingRtpParameters.codecs = ortc.reduceCodecs(sendingRtpParameters.codecs);
          const sendingRemoteRtpParameters = utils.clone(this._sendingRemoteRtpParametersByKind[track.kind]);
          sendingRemoteRtpParameters.codecs = ortc.reduceCodecs(sendingRemoteRtpParameters.codecs);
          if (!this._transportReady) {
            await this.setupTransport({
              localDtlsRole: this._forcedLocalDtlsRole ?? "client",
              localSdpObject
            });
          }
          if (track.kind === "video" && encodings && encodings.length > 1) {
            logger.debug("send() | enabling simulcast");
            localSdpObject = sdpTransform.parse(offer.sdp);
            offerMediaObject = localSdpObject.media.find((m) => m.type === "video");
            sdpPlanBUtils.addLegacySimulcast({
              offerMediaObject,
              track,
              numStreams: encodings.length
            });
            offer = { type: "offer", sdp: sdpTransform.write(localSdpObject) };
          }
          logger.debug("send() | calling pc.setLocalDescription() [offer:%o]", offer);
          await this._pc.setLocalDescription(offer);
          localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          offerMediaObject = localSdpObject.media.find((m) => m.type === track.kind);
          sendingRtpParameters.rtcp.cname = sdpCommonUtils.getCname({
            offerMediaObject
          });
          sendingRtpParameters.encodings = sdpPlanBUtils.getRtpEncodings({
            offerMediaObject,
            track
          });
          if (encodings) {
            for (let idx = 0; idx < sendingRtpParameters.encodings.length; ++idx) {
              if (encodings[idx]) {
                Object.assign(sendingRtpParameters.encodings[idx], encodings[idx]);
              }
            }
          }
          if (sendingRtpParameters.encodings.length > 1 && (sendingRtpParameters.codecs[0].mimeType.toLowerCase() === "video/vp8" || sendingRtpParameters.codecs[0].mimeType.toLowerCase() === "video/h264")) {
            for (const encoding of sendingRtpParameters.encodings) {
              encoding.scalabilityMode = "L1T3";
            }
          }
          this._remoteSdp.send({
            offerMediaObject,
            offerRtpParameters: sendingRtpParameters,
            answerRtpParameters: sendingRemoteRtpParameters,
            codecOptions
          });
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("send() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
          const localId = String(this._nextSendLocalId);
          this._nextSendLocalId++;
          this._mapSendLocalIdTrack.set(localId, track);
          return {
            localId,
            rtpParameters: sendingRtpParameters
          };
        }
        async stopSending(localId) {
          this.assertSendDirection();
          logger.debug("stopSending() [localId:%s]", localId);
          const track = this._mapSendLocalIdTrack.get(localId);
          if (!track) {
            throw new Error("track not found");
          }
          this._mapSendLocalIdTrack.delete(localId);
          this._sendStream.removeTrack(track);
          this._pc.addStream(this._sendStream);
          const offer = await this._pc.createOffer();
          logger.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", offer);
          try {
            await this._pc.setLocalDescription(offer);
          } catch (error) {
            if (this._sendStream.getTracks().length === 0) {
              logger.warn("stopSending() | ignoring expected error due no sending tracks: %s", error.toString());
              return;
            }
            throw error;
          }
          if (this._pc.signalingState === "stable") {
            return;
          }
          const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
          logger.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", answer);
          await this._pc.setRemoteDescription(answer);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async pauseSending(localId) {
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async resumeSending(localId) {
        }
        async replaceTrack(localId, track) {
          throw new errors_1.UnsupportedError("not implemented");
        }
        async setMaxSpatialLayer(localId, spatialLayer) {
          throw new errors_1.UnsupportedError("not implemented");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async setRtpEncodingParameters(localId, params2) {
          throw new errors_1.UnsupportedError("not implemented");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async getSenderStats(localId) {
          throw new errors_1.UnsupportedError("not implemented");
        }
        async sendDataChannel({ ordered, maxPacketLifeTime, maxRetransmits, label, protocol: protocol4 }) {
          this.assertSendDirection();
          const options = {
            negotiated: true,
            id: this._nextSendSctpStreamId,
            ordered,
            maxPacketLifeTime,
            maxRetransmitTime: maxPacketLifeTime,
            // NOTE: Old spec.
            maxRetransmits,
            protocol: protocol4
          };
          logger.debug("sendDataChannel() [options:%o]", options);
          const dataChannel = this._pc.createDataChannel(label, options);
          this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % SCTP_NUM_STREAMS.MIS;
          if (!this._hasDataChannelMediaSection) {
            const offer = await this._pc.createOffer();
            const localSdpObject = sdpTransform.parse(offer.sdp);
            const offerMediaObject = localSdpObject.media.find((m) => m.type === "application");
            if (!this._transportReady) {
              await this.setupTransport({
                localDtlsRole: this._forcedLocalDtlsRole ?? "client",
                localSdpObject
              });
            }
            logger.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", offer);
            await this._pc.setLocalDescription(offer);
            this._remoteSdp.sendSctpAssociation({ offerMediaObject });
            const answer = { type: "answer", sdp: this._remoteSdp.getSdp() };
            logger.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setRemoteDescription(answer);
            this._hasDataChannelMediaSection = true;
          }
          const sctpStreamParameters = {
            streamId: options.id,
            ordered: options.ordered,
            maxPacketLifeTime: options.maxPacketLifeTime,
            maxRetransmits: options.maxRetransmits
          };
          return { dataChannel, sctpStreamParameters };
        }
        async receive(optionsList) {
          this.assertRecvDirection();
          const results = [];
          const mapStreamId = /* @__PURE__ */ new Map();
          for (const options of optionsList) {
            const { trackId, kind, rtpParameters } = options;
            logger.debug("receive() [trackId:%s, kind:%s]", trackId, kind);
            const mid = kind;
            let streamId = options.streamId ?? rtpParameters.rtcp.cname;
            logger.debug("receive() | forcing a random remote streamId to avoid well known bug in react-native-webrtc");
            streamId += `-hack-${utils.generateRandomNumber()}`;
            mapStreamId.set(trackId, streamId);
            this._remoteSdp.receive({
              mid,
              kind,
              offerRtpParameters: rtpParameters,
              streamId,
              trackId
            });
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          let answer = await this._pc.createAnswer();
          const localSdpObject = sdpTransform.parse(answer.sdp);
          for (const options of optionsList) {
            const { kind, rtpParameters } = options;
            const mid = kind;
            const answerMediaObject = localSdpObject.media.find((m) => String(m.mid) === mid);
            sdpCommonUtils.applyCodecParameters({
              offerRtpParameters: rtpParameters,
              answerMediaObject
            });
          }
          answer = { type: "answer", sdp: sdpTransform.write(localSdpObject) };
          if (!this._transportReady) {
            await this.setupTransport({
              localDtlsRole: this._forcedLocalDtlsRole ?? "client",
              localSdpObject
            });
          }
          logger.debug("receive() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
          for (const options of optionsList) {
            const { kind, trackId, rtpParameters } = options;
            const localId = trackId;
            const mid = kind;
            const streamId = mapStreamId.get(trackId);
            const stream = this._pc.getRemoteStreams().find((s) => s.id === streamId);
            const track = stream.getTrackById(localId);
            if (!track) {
              throw new Error("remote track not found");
            }
            this._mapRecvLocalIdInfo.set(localId, { mid, rtpParameters });
            results.push({ localId, track });
          }
          return results;
        }
        async stopReceiving(localIds) {
          this.assertRecvDirection();
          for (const localId of localIds) {
            logger.debug("stopReceiving() [localId:%s]", localId);
            const { mid, rtpParameters } = this._mapRecvLocalIdInfo.get(localId) ?? {};
            this._mapRecvLocalIdInfo.delete(localId);
            this._remoteSdp.planBStopReceiving({
              mid,
              offerRtpParameters: rtpParameters
            });
          }
          const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
          logger.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", answer);
          await this._pc.setLocalDescription(answer);
        }
        async pauseReceiving(localIds) {
        }
        async resumeReceiving(localIds) {
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async getReceiverStats(localId) {
          throw new errors_1.UnsupportedError("not implemented");
        }
        async receiveDataChannel({ sctpStreamParameters, label, protocol: protocol4 }) {
          this.assertRecvDirection();
          const { streamId, ordered, maxPacketLifeTime, maxRetransmits } = sctpStreamParameters;
          const options = {
            negotiated: true,
            id: streamId,
            ordered,
            maxPacketLifeTime,
            maxRetransmitTime: maxPacketLifeTime,
            // NOTE: Old spec.
            maxRetransmits,
            protocol: protocol4
          };
          logger.debug("receiveDataChannel() [options:%o]", options);
          const dataChannel = this._pc.createDataChannel(label, options);
          if (!this._hasDataChannelMediaSection) {
            this._remoteSdp.receiveSctpAssociation({ oldDataChannelSpec: true });
            const offer = { type: "offer", sdp: this._remoteSdp.getSdp() };
            logger.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", offer);
            await this._pc.setRemoteDescription(offer);
            const answer = await this._pc.createAnswer();
            if (!this._transportReady) {
              const localSdpObject = sdpTransform.parse(answer.sdp);
              await this.setupTransport({
                localDtlsRole: this._forcedLocalDtlsRole ?? "client",
                localSdpObject
              });
            }
            logger.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", answer);
            await this._pc.setLocalDescription(answer);
            this._hasDataChannelMediaSection = true;
          }
          return { dataChannel };
        }
        async setupTransport({ localDtlsRole, localSdpObject }) {
          if (!localSdpObject) {
            localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          }
          const dtlsParameters = sdpCommonUtils.extractDtlsParameters({
            sdpObject: localSdpObject
          });
          dtlsParameters.role = localDtlsRole;
          this._remoteSdp.updateDtlsRole(localDtlsRole === "client" ? "server" : "client");
          await new Promise((resolve, reject) => {
            this.safeEmit("@connect", { dtlsParameters }, resolve, reject);
          });
          this._transportReady = true;
        }
        assertSendDirection() {
          if (this._direction !== "send") {
            throw new Error('method can just be called for handlers with "send" direction');
          }
        }
        assertRecvDirection() {
          if (this._direction !== "recv") {
            throw new Error('method can just be called for handlers with "recv" direction');
          }
        }
      };
      exports.ReactNative = ReactNative;
    }
  });

  // node_modules/mediasoup-client/lib/Device.js
  var require_Device = __commonJS({
    "node_modules/mediasoup-client/lib/Device.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Device = void 0;
      exports.detectDeviceAsync = detectDeviceAsync;
      exports.detectDevice = detectDevice;
      var ua_parser_js_1 = require_ua_parser();
      var Logger_1 = require_Logger();
      var enhancedEvents_1 = require_enhancedEvents();
      var errors_1 = require_errors();
      var utils = require_utils();
      var ortc = require_ortc();
      var Transport_1 = require_Transport();
      var Chrome111_1 = require_Chrome111();
      var Chrome74_1 = require_Chrome74();
      var Chrome70_1 = require_Chrome70();
      var Chrome67_1 = require_Chrome67();
      var Chrome55_1 = require_Chrome55();
      var Firefox120_1 = require_Firefox120();
      var Firefox60_1 = require_Firefox60();
      var Safari12_1 = require_Safari12();
      var Safari11_1 = require_Safari11();
      var Edge11_1 = require_Edge11();
      var ReactNativeUnifiedPlan_1 = require_ReactNativeUnifiedPlan();
      var ReactNative_1 = require_ReactNative();
      var logger = new Logger_1.Logger("Device");
      async function detectDeviceAsync(userAgent) {
        logger.debug("detectDeviceAsync() [userAgent:%s]", userAgent);
        if (!userAgent && typeof navigator === "object") {
          userAgent = navigator.userAgent;
        }
        const uaParserResult = await (0, ua_parser_js_1.UAParser)(userAgent).withFeatureCheck();
        return detectDeviceImpl(uaParserResult);
      }
      function detectDevice(userAgent) {
        logger.debug("detectDevice() [userAgent:%s]", userAgent);
        if (!userAgent && typeof navigator === "object") {
          userAgent = navigator.userAgent;
        }
        const uaParserResult = (0, ua_parser_js_1.UAParser)(userAgent);
        return detectDeviceImpl(uaParserResult);
      }
      var Device2 = class _Device {
        // RTC handler factory.
        _handlerFactory;
        // Handler name.
        _handlerName;
        // Loaded flag.
        _loaded = false;
        // Extended RTP capabilities.
        _extendedRtpCapabilities;
        // Local RTP capabilities for receiving media.
        _recvRtpCapabilities;
        // Whether we can produce audio/video based on computed extended RTP
        // capabilities.
        _canProduceByKind;
        // Local SCTP capabilities.
        _sctpCapabilities;
        // Observer instance.
        _observer = new enhancedEvents_1.EnhancedEventEmitter();
        /**
         * Create a new Device to connect to mediasoup server. It uses a more advanced
         * device detection.
         *
         * @throws {UnsupportedError} if device is not supported.
         */
        static async factory({ handlerName, handlerFactory } = {}) {
          logger.debug("factory()");
          if (handlerName && handlerFactory) {
            throw new TypeError("just one of handlerName or handlerInterface can be given");
          }
          if (!handlerName && !handlerFactory) {
            handlerName = await detectDeviceAsync();
            if (!handlerName) {
              throw new errors_1.UnsupportedError("device not supported");
            }
          }
          return new _Device({ handlerName, handlerFactory });
        }
        /**
         * Create a new Device to connect to mediasoup server.
         *
         * @throws {UnsupportedError} if device is not supported.
         */
        constructor({ handlerName, handlerFactory } = {}) {
          logger.debug("constructor()");
          if (handlerName && handlerFactory) {
            throw new TypeError("just one of handlerName or handlerInterface can be given");
          }
          if (handlerFactory) {
            this._handlerFactory = handlerFactory;
          } else {
            if (handlerName) {
              logger.debug("constructor() | handler given: %s", handlerName);
            } else {
              handlerName = detectDevice();
              if (handlerName) {
                logger.debug("constructor() | detected handler: %s", handlerName);
              } else {
                throw new errors_1.UnsupportedError("device not supported");
              }
            }
            switch (handlerName) {
              case "Chrome111": {
                this._handlerFactory = Chrome111_1.Chrome111.createFactory();
                break;
              }
              case "Chrome74": {
                this._handlerFactory = Chrome74_1.Chrome74.createFactory();
                break;
              }
              case "Chrome70": {
                this._handlerFactory = Chrome70_1.Chrome70.createFactory();
                break;
              }
              case "Chrome67": {
                this._handlerFactory = Chrome67_1.Chrome67.createFactory();
                break;
              }
              case "Chrome55": {
                this._handlerFactory = Chrome55_1.Chrome55.createFactory();
                break;
              }
              case "Firefox120": {
                this._handlerFactory = Firefox120_1.Firefox120.createFactory();
                break;
              }
              case "Firefox60": {
                this._handlerFactory = Firefox60_1.Firefox60.createFactory();
                break;
              }
              case "Safari12": {
                this._handlerFactory = Safari12_1.Safari12.createFactory();
                break;
              }
              case "Safari11": {
                this._handlerFactory = Safari11_1.Safari11.createFactory();
                break;
              }
              case "Edge11": {
                this._handlerFactory = Edge11_1.Edge11.createFactory();
                break;
              }
              case "ReactNativeUnifiedPlan": {
                this._handlerFactory = ReactNativeUnifiedPlan_1.ReactNativeUnifiedPlan.createFactory();
                break;
              }
              case "ReactNative": {
                this._handlerFactory = ReactNative_1.ReactNative.createFactory();
                break;
              }
              default: {
                throw new TypeError(`unknown handlerName "${handlerName}"`);
              }
            }
          }
          const handler = this._handlerFactory();
          this._handlerName = handler.name;
          handler.close();
          this._extendedRtpCapabilities = void 0;
          this._recvRtpCapabilities = void 0;
          this._canProduceByKind = {
            audio: false,
            video: false
          };
          this._sctpCapabilities = void 0;
        }
        /**
         * The RTC handler name.
         */
        get handlerName() {
          return this._handlerName;
        }
        /**
         * Whether the Device is loaded.
         */
        get loaded() {
          return this._loaded;
        }
        /**
         * RTP capabilities of the Device for receiving media.
         *
         * @throws {InvalidStateError} if not loaded.
         */
        get rtpCapabilities() {
          if (!this._loaded) {
            throw new errors_1.InvalidStateError("not loaded");
          }
          return this._recvRtpCapabilities;
        }
        /**
         * SCTP capabilities of the Device.
         *
         * @throws {InvalidStateError} if not loaded.
         */
        get sctpCapabilities() {
          if (!this._loaded) {
            throw new errors_1.InvalidStateError("not loaded");
          }
          return this._sctpCapabilities;
        }
        get observer() {
          return this._observer;
        }
        /**
         * Initialize the Device.
         */
        async load({ routerRtpCapabilities, preferLocalCodecsOrder = false }) {
          logger.debug("load() [routerRtpCapabilities:%o]", routerRtpCapabilities);
          let handler;
          try {
            if (this._loaded) {
              throw new errors_1.InvalidStateError("already loaded");
            }
            const clonedRouterRtpCapabilities = utils.clone(routerRtpCapabilities);
            ortc.validateRtpCapabilities(clonedRouterRtpCapabilities);
            handler = this._handlerFactory();
            const nativeRtpCapabilities = await handler.getNativeRtpCapabilities();
            logger.debug("load() | got native RTP capabilities:%o", nativeRtpCapabilities);
            const clonedNativeRtpCapabilities = utils.clone(nativeRtpCapabilities);
            ortc.validateRtpCapabilities(clonedNativeRtpCapabilities);
            this._extendedRtpCapabilities = ortc.getExtendedRtpCapabilities(clonedNativeRtpCapabilities, clonedRouterRtpCapabilities, preferLocalCodecsOrder);
            logger.debug("load() | got extended RTP capabilities:%o", this._extendedRtpCapabilities);
            this._canProduceByKind.audio = ortc.canSend("audio", this._extendedRtpCapabilities);
            this._canProduceByKind.video = ortc.canSend("video", this._extendedRtpCapabilities);
            this._recvRtpCapabilities = ortc.getRecvRtpCapabilities(this._extendedRtpCapabilities);
            ortc.validateRtpCapabilities(this._recvRtpCapabilities);
            logger.debug("load() | got receiving RTP capabilities:%o", this._recvRtpCapabilities);
            this._sctpCapabilities = await handler.getNativeSctpCapabilities();
            logger.debug("load() | got native SCTP capabilities:%o", this._sctpCapabilities);
            ortc.validateSctpCapabilities(this._sctpCapabilities);
            logger.debug("load() succeeded");
            this._loaded = true;
            handler.close();
          } catch (error) {
            if (handler) {
              handler.close();
            }
            throw error;
          }
        }
        /**
         * Whether we can produce audio/video.
         *
         * @throws {InvalidStateError} if not loaded.
         * @throws {TypeError} if wrong arguments.
         */
        canProduce(kind) {
          if (!this._loaded) {
            throw new errors_1.InvalidStateError("not loaded");
          } else if (kind !== "audio" && kind !== "video") {
            throw new TypeError(`invalid kind "${kind}"`);
          }
          return this._canProduceByKind[kind];
        }
        /**
         * Creates a Transport for sending media.
         *
         * @throws {InvalidStateError} if not loaded.
         * @throws {TypeError} if wrong arguments.
         */
        createSendTransport({ id, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, appData }) {
          logger.debug("createSendTransport()");
          return this.createTransport({
            direction: "send",
            id,
            iceParameters,
            iceCandidates,
            dtlsParameters,
            sctpParameters,
            iceServers,
            iceTransportPolicy,
            additionalSettings,
            proprietaryConstraints,
            appData
          });
        }
        /**
         * Creates a Transport for receiving media.
         *
         * @throws {InvalidStateError} if not loaded.
         * @throws {TypeError} if wrong arguments.
         */
        createRecvTransport({ id, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, appData }) {
          logger.debug("createRecvTransport()");
          return this.createTransport({
            direction: "recv",
            id,
            iceParameters,
            iceCandidates,
            dtlsParameters,
            sctpParameters,
            iceServers,
            iceTransportPolicy,
            additionalSettings,
            proprietaryConstraints,
            appData
          });
        }
        createTransport({ direction, id, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, appData }) {
          if (!this._loaded) {
            throw new errors_1.InvalidStateError("not loaded");
          } else if (typeof id !== "string") {
            throw new TypeError("missing id");
          } else if (typeof iceParameters !== "object") {
            throw new TypeError("missing iceParameters");
          } else if (!Array.isArray(iceCandidates)) {
            throw new TypeError("missing iceCandidates");
          } else if (typeof dtlsParameters !== "object") {
            throw new TypeError("missing dtlsParameters");
          } else if (sctpParameters && typeof sctpParameters !== "object") {
            throw new TypeError("wrong sctpParameters");
          } else if (appData && typeof appData !== "object") {
            throw new TypeError("if given, appData must be an object");
          }
          const transport = new Transport_1.Transport({
            direction,
            id,
            iceParameters,
            iceCandidates,
            dtlsParameters,
            sctpParameters,
            iceServers,
            iceTransportPolicy,
            additionalSettings,
            proprietaryConstraints,
            appData,
            handlerFactory: this._handlerFactory,
            extendedRtpCapabilities: this._extendedRtpCapabilities,
            canProduceByKind: this._canProduceByKind
          });
          this._observer.safeEmit("newtransport", transport);
          return transport;
        }
      };
      exports.Device = Device2;
      function detectDeviceImpl(uaParserResult) {
        if (typeof navigator === "object" && navigator.product === "ReactNative") {
          logger.debug("detectDeviceImpl() | React-Native detected");
          if (typeof RTCPeerConnection === "undefined") {
            logger.warn("detectDeviceImpl() | unsupported react-native-webrtc without RTCPeerConnection, forgot to call registerGlobals()?");
            return void 0;
          }
          if (typeof RTCRtpTransceiver !== "undefined") {
            logger.debug("detectDeviceImpl() | ReactNative UnifiedPlan handler chosen");
            return "ReactNativeUnifiedPlan";
          } else {
            logger.debug("detectDeviceImpl() | ReactNative PlanB handler chosen");
            return "ReactNative";
          }
        } else {
          logger.debug("detectDeviceImpl() | browser detected [userAgent:%s, parsed:%o]", uaParserResult.ua, uaParserResult);
          const browser = uaParserResult.browser;
          const browserName = browser.name?.toLowerCase();
          const browserVersion = parseInt(browser.major ?? "0");
          const engine = uaParserResult.engine;
          const engineName = engine.name?.toLowerCase();
          const os = uaParserResult.os;
          const osName = os.name?.toLowerCase();
          const osVersion = parseFloat(os.version ?? "0");
          const device2 = uaParserResult.device;
          const deviceModel = device2.model?.toLowerCase();
          const isIOS = osName === "ios" || deviceModel === "ipad";
          const isChrome = browserName && [
            "chrome",
            "chromium",
            "mobile chrome",
            "chrome webview",
            "chrome headless"
          ].includes(browserName);
          const isFirefox = browserName && ["firefox", "mobile firefox", "mobile focus"].includes(browserName);
          const isSafari = browserName && ["safari", "mobile safari"].includes(browserName);
          const isEdge = browserName && ["edge"].includes(browserName);
          if ((isChrome || isEdge) && !isIOS && browserVersion >= 111) {
            return "Chrome111";
          } else if (isChrome && !isIOS && browserVersion >= 74 || isEdge && !isIOS && browserVersion >= 88) {
            return "Chrome74";
          } else if (isChrome && !isIOS && browserVersion >= 70) {
            return "Chrome70";
          } else if (isChrome && !isIOS && browserVersion >= 67) {
            return "Chrome67";
          } else if (isChrome && !isIOS && browserVersion >= 55) {
            return "Chrome55";
          } else if (isFirefox && !isIOS && browserVersion >= 120) {
            return "Firefox120";
          } else if (isFirefox && !isIOS && browserVersion >= 60) {
            return "Firefox60";
          } else if (isFirefox && isIOS && osVersion >= 14.3) {
            return "Safari12";
          } else if (isSafari && browserVersion >= 12 && typeof RTCRtpTransceiver !== "undefined" && RTCRtpTransceiver.prototype.hasOwnProperty("currentDirection")) {
            return "Safari12";
          } else if (isSafari && browserVersion >= 11) {
            return "Safari11";
          } else if (isEdge && !isIOS && browserVersion >= 11 && browserVersion <= 18) {
            return "Edge11";
          } else if (engineName === "webkit" && isIOS && typeof RTCRtpTransceiver !== "undefined" && RTCRtpTransceiver.prototype.hasOwnProperty("currentDirection")) {
            return "Safari12";
          } else if (engineName === "blink") {
            const match = uaParserResult.ua.match(/(?:(?:Chrome|Chromium))[ /](\w+)/i);
            if (match) {
              const version = Number(match[1]);
              if (version >= 111) {
                return "Chrome111";
              } else if (version >= 74) {
                return "Chrome74";
              } else if (version >= 70) {
                return "Chrome70";
              } else if (version >= 67) {
                return "Chrome67";
              } else {
                return "Chrome55";
              }
            } else {
              return "Chrome111";
            }
          } else {
            logger.warn("detectDeviceImpl() | browser not supported [name:%s, version:%s]", browserName, browserVersion);
            return void 0;
          }
        }
      }
    }
  });

  // node_modules/mediasoup-client/lib/RtpParameters.js
  var require_RtpParameters = __commonJS({
    "node_modules/mediasoup-client/lib/RtpParameters.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/mediasoup-client/lib/SctpParameters.js
  var require_SctpParameters = __commonJS({
    "node_modules/mediasoup-client/lib/SctpParameters.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/mediasoup-client/lib/types.js
  var require_types = __commonJS({
    "node_modules/mediasoup-client/lib/types.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_Device(), exports);
      __exportStar(require_Transport(), exports);
      __exportStar(require_Producer(), exports);
      __exportStar(require_Consumer(), exports);
      __exportStar(require_DataProducer(), exports);
      __exportStar(require_DataConsumer(), exports);
      __exportStar(require_RtpParameters(), exports);
      __exportStar(require_SctpParameters(), exports);
      __exportStar(require_HandlerInterface(), exports);
      __exportStar(require_errors(), exports);
    }
  });

  // node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/max.js
  var require_max = __commonJS({
    "node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/max.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.default = "ffffffff-ffff-ffff-ffff-ffffffffffff";
    }
  });

  // node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/nil.js
  var require_nil = __commonJS({
    "node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/nil.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.default = "00000000-0000-0000-0000-000000000000";
    }
  });

  // node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/regex.js
  var require_regex = __commonJS({
    "node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/regex.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;
    }
  });

  // node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/validate.js
  var require_validate = __commonJS({
    "node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/validate.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var regex_js_1 = require_regex();
      function validate(uuid) {
        return typeof uuid === "string" && regex_js_1.default.test(uuid);
      }
      exports.default = validate;
    }
  });

  // node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/parse.js
  var require_parse = __commonJS({
    "node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/parse.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var validate_js_1 = require_validate();
      function parse2(uuid) {
        if (!(0, validate_js_1.default)(uuid)) {
          throw TypeError("Invalid UUID");
        }
        let v;
        return Uint8Array.of((v = parseInt(uuid.slice(0, 8), 16)) >>> 24, v >>> 16 & 255, v >>> 8 & 255, v & 255, (v = parseInt(uuid.slice(9, 13), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(14, 18), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(19, 23), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255, v / 4294967296 & 255, v >>> 24 & 255, v >>> 16 & 255, v >>> 8 & 255, v & 255);
      }
      exports.default = parse2;
    }
  });

  // node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/stringify.js
  var require_stringify = __commonJS({
    "node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/stringify.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.unsafeStringify = void 0;
      var validate_js_1 = require_validate();
      var byteToHex = [];
      for (let i = 0; i < 256; ++i) {
        byteToHex.push((i + 256).toString(16).slice(1));
      }
      function unsafeStringify(arr, offset = 0) {
        return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
      }
      exports.unsafeStringify = unsafeStringify;
      function stringify(arr, offset = 0) {
        const uuid = unsafeStringify(arr, offset);
        if (!(0, validate_js_1.default)(uuid)) {
          throw TypeError("Stringified UUID is invalid");
        }
        return uuid;
      }
      exports.default = stringify;
    }
  });

  // node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/rng.js
  var require_rng = __commonJS({
    "node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/rng.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var getRandomValues;
      var rnds8 = new Uint8Array(16);
      function rng() {
        if (!getRandomValues) {
          if (typeof crypto === "undefined" || !crypto.getRandomValues) {
            throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
          }
          getRandomValues = crypto.getRandomValues.bind(crypto);
        }
        return getRandomValues(rnds8);
      }
      exports.default = rng;
    }
  });

  // node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/v1.js
  var require_v1 = __commonJS({
    "node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/v1.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.updateV1State = void 0;
      var rng_js_1 = require_rng();
      var stringify_js_1 = require_stringify();
      var _state = {};
      function v1(options, buf, offset) {
        let bytes;
        const isV6 = options?._v6 ?? false;
        if (options) {
          const optionsKeys = Object.keys(options);
          if (optionsKeys.length === 1 && optionsKeys[0] === "_v6") {
            options = void 0;
          }
        }
        if (options) {
          bytes = v1Bytes(options.random ?? options.rng?.() ?? (0, rng_js_1.default)(), options.msecs, options.nsecs, options.clockseq, options.node, buf, offset);
        } else {
          const now = Date.now();
          const rnds = (0, rng_js_1.default)();
          updateV1State(_state, now, rnds);
          bytes = v1Bytes(rnds, _state.msecs, _state.nsecs, isV6 ? void 0 : _state.clockseq, isV6 ? void 0 : _state.node, buf, offset);
        }
        return buf ?? (0, stringify_js_1.unsafeStringify)(bytes);
      }
      function updateV1State(state, now, rnds) {
        state.msecs ??= -Infinity;
        state.nsecs ??= 0;
        if (now === state.msecs) {
          state.nsecs++;
          if (state.nsecs >= 1e4) {
            state.node = void 0;
            state.nsecs = 0;
          }
        } else if (now > state.msecs) {
          state.nsecs = 0;
        } else if (now < state.msecs) {
          state.node = void 0;
        }
        if (!state.node) {
          state.node = rnds.slice(10, 16);
          state.node[0] |= 1;
          state.clockseq = (rnds[8] << 8 | rnds[9]) & 16383;
        }
        state.msecs = now;
        return state;
      }
      exports.updateV1State = updateV1State;
      function v1Bytes(rnds, msecs, nsecs, clockseq, node, buf, offset = 0) {
        if (rnds.length < 16) {
          throw new Error("Random bytes length must be >= 16");
        }
        if (!buf) {
          buf = new Uint8Array(16);
          offset = 0;
        } else {
          if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
          }
        }
        msecs ??= Date.now();
        nsecs ??= 0;
        clockseq ??= (rnds[8] << 8 | rnds[9]) & 16383;
        node ??= rnds.slice(10, 16);
        msecs += 122192928e5;
        const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
        buf[offset++] = tl >>> 24 & 255;
        buf[offset++] = tl >>> 16 & 255;
        buf[offset++] = tl >>> 8 & 255;
        buf[offset++] = tl & 255;
        const tmh = msecs / 4294967296 * 1e4 & 268435455;
        buf[offset++] = tmh >>> 8 & 255;
        buf[offset++] = tmh & 255;
        buf[offset++] = tmh >>> 24 & 15 | 16;
        buf[offset++] = tmh >>> 16 & 255;
        buf[offset++] = clockseq >>> 8 | 128;
        buf[offset++] = clockseq & 255;
        for (let n = 0; n < 6; ++n) {
          buf[offset++] = node[n];
        }
        return buf;
      }
      exports.default = v1;
    }
  });

  // node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/v1ToV6.js
  var require_v1ToV6 = __commonJS({
    "node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/v1ToV6.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var parse_js_1 = require_parse();
      var stringify_js_1 = require_stringify();
      function v1ToV6(uuid) {
        const v1Bytes = typeof uuid === "string" ? (0, parse_js_1.default)(uuid) : uuid;
        const v6Bytes = _v1ToV6(v1Bytes);
        return typeof uuid === "string" ? (0, stringify_js_1.unsafeStringify)(v6Bytes) : v6Bytes;
      }
      exports.default = v1ToV6;
      function _v1ToV6(v1Bytes) {
        return Uint8Array.of((v1Bytes[6] & 15) << 4 | v1Bytes[7] >> 4 & 15, (v1Bytes[7] & 15) << 4 | (v1Bytes[4] & 240) >> 4, (v1Bytes[4] & 15) << 4 | (v1Bytes[5] & 240) >> 4, (v1Bytes[5] & 15) << 4 | (v1Bytes[0] & 240) >> 4, (v1Bytes[0] & 15) << 4 | (v1Bytes[1] & 240) >> 4, (v1Bytes[1] & 15) << 4 | (v1Bytes[2] & 240) >> 4, 96 | v1Bytes[2] & 15, v1Bytes[3], v1Bytes[8], v1Bytes[9], v1Bytes[10], v1Bytes[11], v1Bytes[12], v1Bytes[13], v1Bytes[14], v1Bytes[15]);
      }
    }
  });

  // node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/md5.js
  var require_md5 = __commonJS({
    "node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/md5.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function md5(bytes) {
        const words = uint8ToUint32(bytes);
        const md5Bytes = wordsToMd5(words, bytes.length * 8);
        return uint32ToUint8(md5Bytes);
      }
      function uint32ToUint8(input) {
        const bytes = new Uint8Array(input.length * 4);
        for (let i = 0; i < input.length * 4; i++) {
          bytes[i] = input[i >> 2] >>> i % 4 * 8 & 255;
        }
        return bytes;
      }
      function getOutputLength(inputLength8) {
        return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
      }
      function wordsToMd5(x, len) {
        const xpad = new Uint32Array(getOutputLength(len)).fill(0);
        xpad.set(x);
        xpad[len >> 5] |= 128 << len % 32;
        xpad[xpad.length - 1] = len;
        x = xpad;
        let a = 1732584193;
        let b = -271733879;
        let c = -1732584194;
        let d = 271733878;
        for (let i = 0; i < x.length; i += 16) {
          const olda = a;
          const oldb = b;
          const oldc = c;
          const oldd = d;
          a = md5ff(a, b, c, d, x[i], 7, -680876936);
          d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
          c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
          b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
          a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
          d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
          c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
          b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
          a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
          d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
          c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
          b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
          a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
          d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
          c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
          b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
          a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
          d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
          c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
          b = md5gg(b, c, d, a, x[i], 20, -373897302);
          a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
          d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
          c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
          b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
          a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
          d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
          c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
          b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
          a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
          d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
          c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
          b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
          a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
          d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
          c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
          b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
          a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
          d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
          c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
          b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
          a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
          d = md5hh(d, a, b, c, x[i], 11, -358537222);
          c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
          b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
          a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
          d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
          c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
          b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
          a = md5ii(a, b, c, d, x[i], 6, -198630844);
          d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
          c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
          b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
          a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
          d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
          c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
          b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
          a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
          d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
          c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
          b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
          a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
          d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
          c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
          b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
          a = safeAdd(a, olda);
          b = safeAdd(b, oldb);
          c = safeAdd(c, oldc);
          d = safeAdd(d, oldd);
        }
        return Uint32Array.of(a, b, c, d);
      }
      function uint8ToUint32(input) {
        if (input.length === 0) {
          return new Uint32Array();
        }
        const output = new Uint32Array(getOutputLength(input.length * 8)).fill(0);
        for (let i = 0; i < input.length; i++) {
          output[i >> 2] |= (input[i] & 255) << i % 4 * 8;
        }
        return output;
      }
      function safeAdd(x, y) {
        const lsw = (x & 65535) + (y & 65535);
        const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return msw << 16 | lsw & 65535;
      }
      function bitRotateLeft(num, cnt) {
        return num << cnt | num >>> 32 - cnt;
      }
      function md5cmn(q, a, b, x, s, t) {
        return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
      }
      function md5ff(a, b, c, d, x, s, t) {
        return md5cmn(b & c | ~b & d, a, b, x, s, t);
      }
      function md5gg(a, b, c, d, x, s, t) {
        return md5cmn(b & d | c & ~d, a, b, x, s, t);
      }
      function md5hh(a, b, c, d, x, s, t) {
        return md5cmn(b ^ c ^ d, a, b, x, s, t);
      }
      function md5ii(a, b, c, d, x, s, t) {
        return md5cmn(c ^ (b | ~d), a, b, x, s, t);
      }
      exports.default = md5;
    }
  });

  // node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/v35.js
  var require_v35 = __commonJS({
    "node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/v35.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.URL = exports.DNS = exports.stringToBytes = void 0;
      var parse_js_1 = require_parse();
      var stringify_js_1 = require_stringify();
      function stringToBytes(str) {
        str = unescape(encodeURIComponent(str));
        const bytes = new Uint8Array(str.length);
        for (let i = 0; i < str.length; ++i) {
          bytes[i] = str.charCodeAt(i);
        }
        return bytes;
      }
      exports.stringToBytes = stringToBytes;
      exports.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
      exports.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
      function v35(version, hash, value2, namespace, buf, offset) {
        const valueBytes = typeof value2 === "string" ? stringToBytes(value2) : value2;
        const namespaceBytes = typeof namespace === "string" ? (0, parse_js_1.default)(namespace) : namespace;
        if (typeof namespace === "string") {
          namespace = (0, parse_js_1.default)(namespace);
        }
        if (namespace?.length !== 16) {
          throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
        }
        let bytes = new Uint8Array(16 + valueBytes.length);
        bytes.set(namespaceBytes);
        bytes.set(valueBytes, namespaceBytes.length);
        bytes = hash(bytes);
        bytes[6] = bytes[6] & 15 | version;
        bytes[8] = bytes[8] & 63 | 128;
        if (buf) {
          offset = offset || 0;
          for (let i = 0; i < 16; ++i) {
            buf[offset + i] = bytes[i];
          }
          return buf;
        }
        return (0, stringify_js_1.unsafeStringify)(bytes);
      }
      exports.default = v35;
    }
  });

  // node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/v3.js
  var require_v3 = __commonJS({
    "node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/v3.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.URL = exports.DNS = void 0;
      var md5_js_1 = require_md5();
      var v35_js_1 = require_v35();
      var v35_js_2 = require_v35();
      Object.defineProperty(exports, "DNS", { enumerable: true, get: function() {
        return v35_js_2.DNS;
      } });
      Object.defineProperty(exports, "URL", { enumerable: true, get: function() {
        return v35_js_2.URL;
      } });
      function v3(value2, namespace, buf, offset) {
        return (0, v35_js_1.default)(48, md5_js_1.default, value2, namespace, buf, offset);
      }
      v3.DNS = v35_js_1.DNS;
      v3.URL = v35_js_1.URL;
      exports.default = v3;
    }
  });

  // node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/native.js
  var require_native = __commonJS({
    "node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/native.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
      exports.default = { randomUUID };
    }
  });

  // node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/v4.js
  var require_v4 = __commonJS({
    "node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/v4.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var native_js_1 = require_native();
      var rng_js_1 = require_rng();
      var stringify_js_1 = require_stringify();
      function v4(options, buf, offset) {
        if (native_js_1.default.randomUUID && !buf && !options) {
          return native_js_1.default.randomUUID();
        }
        options = options || {};
        const rnds = options.random ?? options.rng?.() ?? (0, rng_js_1.default)();
        if (rnds.length < 16) {
          throw new Error("Random bytes length must be >= 16");
        }
        rnds[6] = rnds[6] & 15 | 64;
        rnds[8] = rnds[8] & 63 | 128;
        if (buf) {
          offset = offset || 0;
          if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
          }
          for (let i = 0; i < 16; ++i) {
            buf[offset + i] = rnds[i];
          }
          return buf;
        }
        return (0, stringify_js_1.unsafeStringify)(rnds);
      }
      exports.default = v4;
    }
  });

  // node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/sha1.js
  var require_sha1 = __commonJS({
    "node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/sha1.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function f(s, x, y, z) {
        switch (s) {
          case 0:
            return x & y ^ ~x & z;
          case 1:
            return x ^ y ^ z;
          case 2:
            return x & y ^ x & z ^ y & z;
          case 3:
            return x ^ y ^ z;
        }
      }
      function ROTL(x, n) {
        return x << n | x >>> 32 - n;
      }
      function sha1(bytes) {
        const K = [1518500249, 1859775393, 2400959708, 3395469782];
        const H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
        const newBytes = new Uint8Array(bytes.length + 1);
        newBytes.set(bytes);
        newBytes[bytes.length] = 128;
        bytes = newBytes;
        const l = bytes.length / 4 + 2;
        const N = Math.ceil(l / 16);
        const M = new Array(N);
        for (let i = 0; i < N; ++i) {
          const arr = new Uint32Array(16);
          for (let j = 0; j < 16; ++j) {
            arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
          }
          M[i] = arr;
        }
        M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
        M[N - 1][14] = Math.floor(M[N - 1][14]);
        M[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
        for (let i = 0; i < N; ++i) {
          const W = new Uint32Array(80);
          for (let t = 0; t < 16; ++t) {
            W[t] = M[i][t];
          }
          for (let t = 16; t < 80; ++t) {
            W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
          }
          let a = H[0];
          let b = H[1];
          let c = H[2];
          let d = H[3];
          let e = H[4];
          for (let t = 0; t < 80; ++t) {
            const s = Math.floor(t / 20);
            const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
            e = d;
            d = c;
            c = ROTL(b, 30) >>> 0;
            b = a;
            a = T;
          }
          H[0] = H[0] + a >>> 0;
          H[1] = H[1] + b >>> 0;
          H[2] = H[2] + c >>> 0;
          H[3] = H[3] + d >>> 0;
          H[4] = H[4] + e >>> 0;
        }
        return Uint8Array.of(H[0] >> 24, H[0] >> 16, H[0] >> 8, H[0], H[1] >> 24, H[1] >> 16, H[1] >> 8, H[1], H[2] >> 24, H[2] >> 16, H[2] >> 8, H[2], H[3] >> 24, H[3] >> 16, H[3] >> 8, H[3], H[4] >> 24, H[4] >> 16, H[4] >> 8, H[4]);
      }
      exports.default = sha1;
    }
  });

  // node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/v5.js
  var require_v5 = __commonJS({
    "node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/v5.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.URL = exports.DNS = void 0;
      var sha1_js_1 = require_sha1();
      var v35_js_1 = require_v35();
      var v35_js_2 = require_v35();
      Object.defineProperty(exports, "DNS", { enumerable: true, get: function() {
        return v35_js_2.DNS;
      } });
      Object.defineProperty(exports, "URL", { enumerable: true, get: function() {
        return v35_js_2.URL;
      } });
      function v5(value2, namespace, buf, offset) {
        return (0, v35_js_1.default)(80, sha1_js_1.default, value2, namespace, buf, offset);
      }
      v5.DNS = v35_js_1.DNS;
      v5.URL = v35_js_1.URL;
      exports.default = v5;
    }
  });

  // node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/v6.js
  var require_v6 = __commonJS({
    "node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/v6.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var stringify_js_1 = require_stringify();
      var v1_js_1 = require_v1();
      var v1ToV6_js_1 = require_v1ToV6();
      function v6(options, buf, offset) {
        options ??= {};
        offset ??= 0;
        let bytes = (0, v1_js_1.default)({ ...options, _v6: true }, new Uint8Array(16));
        bytes = (0, v1ToV6_js_1.default)(bytes);
        if (buf) {
          for (let i = 0; i < 16; i++) {
            buf[offset + i] = bytes[i];
          }
          return buf;
        }
        return (0, stringify_js_1.unsafeStringify)(bytes);
      }
      exports.default = v6;
    }
  });

  // node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/v6ToV1.js
  var require_v6ToV1 = __commonJS({
    "node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/v6ToV1.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var parse_js_1 = require_parse();
      var stringify_js_1 = require_stringify();
      function v6ToV1(uuid) {
        const v6Bytes = typeof uuid === "string" ? (0, parse_js_1.default)(uuid) : uuid;
        const v1Bytes = _v6ToV1(v6Bytes);
        return typeof uuid === "string" ? (0, stringify_js_1.unsafeStringify)(v1Bytes) : v1Bytes;
      }
      exports.default = v6ToV1;
      function _v6ToV1(v6Bytes) {
        return Uint8Array.of((v6Bytes[3] & 15) << 4 | v6Bytes[4] >> 4 & 15, (v6Bytes[4] & 15) << 4 | (v6Bytes[5] & 240) >> 4, (v6Bytes[5] & 15) << 4 | v6Bytes[6] & 15, v6Bytes[7], (v6Bytes[1] & 15) << 4 | (v6Bytes[2] & 240) >> 4, (v6Bytes[2] & 15) << 4 | (v6Bytes[3] & 240) >> 4, 16 | (v6Bytes[0] & 240) >> 4, (v6Bytes[0] & 15) << 4 | (v6Bytes[1] & 240) >> 4, v6Bytes[8], v6Bytes[9], v6Bytes[10], v6Bytes[11], v6Bytes[12], v6Bytes[13], v6Bytes[14], v6Bytes[15]);
      }
    }
  });

  // node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/v7.js
  var require_v7 = __commonJS({
    "node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/v7.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.updateV7State = void 0;
      var rng_js_1 = require_rng();
      var stringify_js_1 = require_stringify();
      var _state = {};
      function v7(options, buf, offset) {
        let bytes;
        if (options) {
          bytes = v7Bytes(options.random ?? options.rng?.() ?? (0, rng_js_1.default)(), options.msecs, options.seq, buf, offset);
        } else {
          const now = Date.now();
          const rnds = (0, rng_js_1.default)();
          updateV7State(_state, now, rnds);
          bytes = v7Bytes(rnds, _state.msecs, _state.seq, buf, offset);
        }
        return buf ?? (0, stringify_js_1.unsafeStringify)(bytes);
      }
      function updateV7State(state, now, rnds) {
        state.msecs ??= -Infinity;
        state.seq ??= 0;
        if (now > state.msecs) {
          state.seq = rnds[6] << 23 | rnds[7] << 16 | rnds[8] << 8 | rnds[9];
          state.msecs = now;
        } else {
          state.seq = state.seq + 1 | 0;
          if (state.seq === 0) {
            state.msecs++;
          }
        }
        return state;
      }
      exports.updateV7State = updateV7State;
      function v7Bytes(rnds, msecs, seq, buf, offset = 0) {
        if (rnds.length < 16) {
          throw new Error("Random bytes length must be >= 16");
        }
        if (!buf) {
          buf = new Uint8Array(16);
          offset = 0;
        } else {
          if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
          }
        }
        msecs ??= Date.now();
        seq ??= rnds[6] * 127 << 24 | rnds[7] << 16 | rnds[8] << 8 | rnds[9];
        buf[offset++] = msecs / 1099511627776 & 255;
        buf[offset++] = msecs / 4294967296 & 255;
        buf[offset++] = msecs / 16777216 & 255;
        buf[offset++] = msecs / 65536 & 255;
        buf[offset++] = msecs / 256 & 255;
        buf[offset++] = msecs & 255;
        buf[offset++] = 112 | seq >>> 28 & 15;
        buf[offset++] = seq >>> 20 & 255;
        buf[offset++] = 128 | seq >>> 14 & 63;
        buf[offset++] = seq >>> 6 & 255;
        buf[offset++] = seq << 2 & 255 | rnds[10] & 3;
        buf[offset++] = rnds[11];
        buf[offset++] = rnds[12];
        buf[offset++] = rnds[13];
        buf[offset++] = rnds[14];
        buf[offset++] = rnds[15];
        return buf;
      }
      exports.default = v7;
    }
  });

  // node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/version.js
  var require_version = __commonJS({
    "node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/version.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var validate_js_1 = require_validate();
      function version(uuid) {
        if (!(0, validate_js_1.default)(uuid)) {
          throw TypeError("Invalid UUID");
        }
        return parseInt(uuid.slice(14, 15), 16);
      }
      exports.default = version;
    }
  });

  // node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/index.js
  var require_cjs_browser = __commonJS({
    "node_modules/fake-mediastreamtrack/node_modules/uuid/dist/cjs-browser/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.version = exports.validate = exports.v7 = exports.v6ToV1 = exports.v6 = exports.v5 = exports.v4 = exports.v3 = exports.v1ToV6 = exports.v1 = exports.stringify = exports.parse = exports.NIL = exports.MAX = void 0;
      var max_js_1 = require_max();
      Object.defineProperty(exports, "MAX", { enumerable: true, get: function() {
        return max_js_1.default;
      } });
      var nil_js_1 = require_nil();
      Object.defineProperty(exports, "NIL", { enumerable: true, get: function() {
        return nil_js_1.default;
      } });
      var parse_js_1 = require_parse();
      Object.defineProperty(exports, "parse", { enumerable: true, get: function() {
        return parse_js_1.default;
      } });
      var stringify_js_1 = require_stringify();
      Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
        return stringify_js_1.default;
      } });
      var v1_js_1 = require_v1();
      Object.defineProperty(exports, "v1", { enumerable: true, get: function() {
        return v1_js_1.default;
      } });
      var v1ToV6_js_1 = require_v1ToV6();
      Object.defineProperty(exports, "v1ToV6", { enumerable: true, get: function() {
        return v1ToV6_js_1.default;
      } });
      var v3_js_1 = require_v3();
      Object.defineProperty(exports, "v3", { enumerable: true, get: function() {
        return v3_js_1.default;
      } });
      var v4_js_1 = require_v4();
      Object.defineProperty(exports, "v4", { enumerable: true, get: function() {
        return v4_js_1.default;
      } });
      var v5_js_1 = require_v5();
      Object.defineProperty(exports, "v5", { enumerable: true, get: function() {
        return v5_js_1.default;
      } });
      var v6_js_1 = require_v6();
      Object.defineProperty(exports, "v6", { enumerable: true, get: function() {
        return v6_js_1.default;
      } });
      var v6ToV1_js_1 = require_v6ToV1();
      Object.defineProperty(exports, "v6ToV1", { enumerable: true, get: function() {
        return v6ToV1_js_1.default;
      } });
      var v7_js_1 = require_v7();
      Object.defineProperty(exports, "v7", { enumerable: true, get: function() {
        return v7_js_1.default;
      } });
      var validate_js_1 = require_validate();
      Object.defineProperty(exports, "validate", { enumerable: true, get: function() {
        return validate_js_1.default;
      } });
      var version_js_1 = require_version();
      Object.defineProperty(exports, "version", { enumerable: true, get: function() {
        return version_js_1.default;
      } });
    }
  });

  // node_modules/fake-mediastreamtrack/lib/FakeEventTarget.js
  var require_FakeEventTarget = __commonJS({
    "node_modules/fake-mediastreamtrack/lib/FakeEventTarget.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.FakeEventTarget = void 0;
      var FakeEventTarget = class {
        listeners = {};
        addEventListener(type, callback, options = {}) {
          if (!callback) {
            return;
          }
          this.listeners[type] ??= [];
          this.listeners[type].push({
            callback,
            once: options.once === true
          });
        }
        removeEventListener(type, callback) {
          if (!this.listeners[type]) {
            return;
          }
          this.listeners[type] = this.listeners[type].filter((listener) => listener.callback !== callback);
        }
        dispatchEvent(event) {
          if (!event || typeof event.type !== "string") {
            throw new Error("invalid event object");
          }
          const entries = this.listeners[event.type];
          if (!entries) {
            return true;
          }
          for (const listener of [...entries]) {
            try {
              listener.callback.call(this, event);
            } catch (error) {
              setTimeout(() => {
                throw error;
              }, 0);
            }
            if (listener.once) {
              this.removeEventListener(event.type, listener.callback);
            }
          }
          return !event.defaultPrevented;
        }
      };
      exports.FakeEventTarget = FakeEventTarget;
    }
  });

  // node_modules/fake-mediastreamtrack/lib/utils.js
  var require_utils3 = __commonJS({
    "node_modules/fake-mediastreamtrack/lib/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.clone = clone;
      function clone(value2) {
        if (value2 === void 0) {
          return void 0;
        } else if (Number.isNaN(value2)) {
          return NaN;
        } else if (typeof structuredClone === "function") {
          return structuredClone(value2);
        } else {
          return JSON.parse(JSON.stringify(value2));
        }
      }
    }
  });

  // node_modules/fake-mediastreamtrack/lib/index.js
  var require_lib4 = __commonJS({
    "node_modules/fake-mediastreamtrack/lib/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.FakeMediaStreamTrack = void 0;
      var uuid_1 = require_cjs_browser();
      var FakeEventTarget_1 = require_FakeEventTarget();
      var utils_1 = require_utils3();
      var FakeMediaStreamTrack = class _FakeMediaStreamTrack extends FakeEventTarget_1.FakeEventTarget {
        #id;
        #kind;
        #label;
        #readyState;
        #enabled;
        #muted;
        #contentHint;
        #capabilities;
        #constraints;
        #settings;
        #data;
        // Events.
        #onmute = null;
        #onunmute = null;
        #onended = null;
        // Custom events.
        #onenabledchange = null;
        #onstopped = null;
        constructor({ kind, id, label, contentHint, enabled, muted, readyState, capabilities, constraints, settings, data }) {
          super();
          this.#id = id ?? (0, uuid_1.v4)();
          this.#kind = kind;
          this.#label = label ?? "";
          this.#contentHint = contentHint ?? "";
          this.#enabled = enabled ?? true;
          this.#muted = muted ?? false;
          this.#readyState = readyState ?? "live";
          this.#capabilities = capabilities ?? {};
          this.#constraints = constraints ?? {};
          this.#settings = settings ?? {};
          this.#data = data ?? {};
        }
        get id() {
          return this.#id;
        }
        get kind() {
          return this.#kind;
        }
        get label() {
          return this.#label;
        }
        get contentHint() {
          return this.#contentHint;
        }
        set contentHint(contentHint) {
          this.#contentHint = contentHint;
        }
        get enabled() {
          return this.#enabled;
        }
        /**
         * Changes `enabled` member value and fires a custom "enabledchange" event.
         */
        set enabled(enabled) {
          const changed = this.#enabled !== enabled;
          this.#enabled = enabled;
          if (changed) {
            this.dispatchEvent(new Event("enabledchange"));
          }
        }
        get muted() {
          return this.#muted;
        }
        get readyState() {
          return this.#readyState;
        }
        /**
         * Application custom data getter.
         */
        get data() {
          return this.#data;
        }
        /**
         * Application custom data setter.
         */
        set data(data) {
          this.#data = data;
        }
        get onmute() {
          return this.#onmute;
        }
        set onmute(handler) {
          if (this.#onmute) {
            this.removeEventListener("mute", this.#onmute);
          }
          this.#onmute = handler;
          if (handler) {
            this.addEventListener("mute", handler);
          }
        }
        get onunmute() {
          return this.#onunmute;
        }
        set onunmute(handler) {
          if (this.#onunmute) {
            this.removeEventListener("unmute", this.#onunmute);
          }
          this.#onunmute = handler;
          if (handler) {
            this.addEventListener("unmute", handler);
          }
        }
        get onended() {
          return this.#onended;
        }
        set onended(handler) {
          if (this.#onended) {
            this.removeEventListener("ended", this.#onended);
          }
          this.#onended = handler;
          if (handler) {
            this.addEventListener("ended", handler);
          }
        }
        get onenabledchange() {
          return this.#onenabledchange;
        }
        set onenabledchange(handler) {
          if (this.#onenabledchange) {
            this.removeEventListener("enabledchange", this.#onenabledchange);
          }
          this.#onenabledchange = handler;
          if (handler) {
            this.addEventListener("enabledchange", handler);
          }
        }
        get onstopped() {
          return this.#onstopped;
        }
        set onstopped(handler) {
          if (this.#onstopped) {
            this.removeEventListener("stopped", this.#onstopped);
          }
          this.#onstopped = handler;
          if (handler) {
            this.addEventListener("stopped", handler);
          }
        }
        addEventListener(type, listener, options) {
          super.addEventListener(type, listener, options);
        }
        removeEventListener(type, listener) {
          super.removeEventListener(type, listener);
        }
        /**
         * Changes `readyState` member to "ended" and fires a custom "stopped" event
         * (if not already stopped).
         */
        stop() {
          if (this.#readyState === "ended") {
            return;
          }
          this.#readyState = "ended";
          this.dispatchEvent(new Event("stopped"));
        }
        /**
         * Clones current track into another FakeMediaStreamTrack. `id` and `data`
         * can be optionally given.
         */
        clone({ id, data } = {}) {
          return new _FakeMediaStreamTrack({
            id: id ?? (0, uuid_1.v4)(),
            kind: this.#kind,
            label: this.#label,
            contentHint: this.#contentHint,
            enabled: this.#enabled,
            muted: this.#muted,
            readyState: this.#readyState,
            capabilities: (0, utils_1.clone)(this.#capabilities),
            constraints: (0, utils_1.clone)(this.#constraints),
            settings: (0, utils_1.clone)(this.#settings),
            data: data ?? (0, utils_1.clone)(this.#data)
          });
        }
        getCapabilities() {
          return this.#capabilities;
        }
        getConstraints() {
          return this.#constraints;
        }
        async applyConstraints(constraints = {}) {
          this.#constraints = constraints;
          return Promise.resolve();
        }
        getSettings() {
          return this.#settings;
        }
        /**
         * Simulates a remotely triggered stop. It fires a custom "stopped" event and
         * the standard "ended" event (if the track was not already stopped).
         */
        remoteStop() {
          if (this.#readyState === "ended") {
            return;
          }
          this.#readyState = "ended";
          this.dispatchEvent(new Event("stopped"));
          this.dispatchEvent(new Event("ended"));
        }
        /**
         * Simulates a remotely triggered mute. It fires a "mute" event (if the track
         * was not already muted).
         */
        remoteMute() {
          if (this.#muted) {
            return;
          }
          this.#muted = true;
          this.dispatchEvent(new Event("mute"));
        }
        /**
         * Simulates a remotely triggered unmute. It fires an "unmute" event (if the
         * track was muted).
         */
        remoteUnmute() {
          if (!this.#muted) {
            return;
          }
          this.#muted = false;
          this.dispatchEvent(new Event("unmute"));
        }
      };
      exports.FakeMediaStreamTrack = FakeMediaStreamTrack;
    }
  });

  // node_modules/mediasoup-client/lib/handlers/FakeHandler.js
  var require_FakeHandler = __commonJS({
    "node_modules/mediasoup-client/lib/handlers/FakeHandler.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.FakeHandler = void 0;
      var fake_mediastreamtrack_1 = require_lib4();
      var enhancedEvents_1 = require_enhancedEvents();
      var Logger_1 = require_Logger();
      var utils = require_utils();
      var ortc = require_ortc();
      var errors_1 = require_errors();
      var HandlerInterface_1 = require_HandlerInterface();
      var logger = new Logger_1.Logger("FakeHandler");
      var NAME = "FakeHandler";
      var FakeDataChannel = class extends enhancedEvents_1.EnhancedEventEmitter {
        id;
        ordered;
        maxPacketLifeTime;
        maxRetransmits;
        label;
        protocol;
        constructor({ id, ordered, maxPacketLifeTime, maxRetransmits, label, protocol: protocol4 }) {
          super();
          this.id = id;
          this.ordered = ordered;
          this.maxPacketLifeTime = maxPacketLifeTime;
          this.maxRetransmits = maxRetransmits;
          this.label = label;
          this.protocol = protocol4;
        }
        close() {
          this.safeEmit("close");
          this.emit("@close");
        }
        send(data) {
          this.safeEmit("message", data);
        }
        addEventListener(event, fn) {
          this.on(event, fn);
        }
      };
      var FakeHandler = class _FakeHandler extends HandlerInterface_1.HandlerInterface {
        // Closed flag.
        _closed = false;
        // Fake parameters source of RTP and SCTP parameters and capabilities.
        fakeParameters;
        // Generic sending RTP parameters for audio and video.
        _rtpParametersByKind;
        // Local RTCP CNAME.
        _cname = `CNAME-${utils.generateRandomNumber()}`;
        // Got transport local and remote parameters.
        _transportReady = false;
        // Next localId.
        _nextLocalId = 1;
        // Sending and receiving tracks indexed by localId.
        _tracks = /* @__PURE__ */ new Map();
        // DataChannel id value counter. It must be incremented for each new DataChannel.
        _nextSctpStreamId = 0;
        /**
         * Creates a factory function.
         */
        static createFactory(fakeParameters) {
          return () => new _FakeHandler(fakeParameters);
        }
        constructor(fakeParameters) {
          super();
          this.fakeParameters = fakeParameters;
        }
        get name() {
          return NAME;
        }
        close() {
          logger.debug("close()");
          if (this._closed) {
            return;
          }
          this._closed = true;
        }
        // NOTE: Custom method for simulation purposes.
        setIceGatheringState(iceGatheringState) {
          this.emit("@icegatheringstatechange", iceGatheringState);
        }
        // NOTE: Custom method for simulation purposes.
        setConnectionState(connectionState) {
          this.emit("@connectionstatechange", connectionState);
        }
        async getNativeRtpCapabilities() {
          logger.debug("getNativeRtpCapabilities()");
          return this.fakeParameters.generateNativeRtpCapabilities();
        }
        async getNativeSctpCapabilities() {
          logger.debug("getNativeSctpCapabilities()");
          return this.fakeParameters.generateNativeSctpCapabilities();
        }
        run({
          /* eslint-disable @typescript-eslint/no-unused-vars */
          direction,
          iceParameters,
          iceCandidates,
          dtlsParameters,
          sctpParameters,
          iceServers,
          iceTransportPolicy,
          proprietaryConstraints,
          extendedRtpCapabilities
          /* eslint-enable @typescript-eslint/no-unused-vars */
        }) {
          this.assertNotClosed();
          logger.debug("run()");
          this._rtpParametersByKind = {
            audio: ortc.getSendingRtpParameters("audio", extendedRtpCapabilities),
            video: ortc.getSendingRtpParameters("video", extendedRtpCapabilities)
          };
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async updateIceServers(iceServers) {
          this.assertNotClosed();
          logger.debug("updateIceServers()");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async restartIce(iceParameters) {
          this.assertNotClosed();
          logger.debug("restartIce()");
        }
        async getTransportStats() {
          this.assertNotClosed();
          return /* @__PURE__ */ new Map();
        }
        async send({ track, encodings, codecOptions, codec }) {
          this.assertNotClosed();
          logger.debug("send() [kind:%s, track.id:%s]", track.kind, track.id);
          if (!this._transportReady) {
            await this.setupTransport({ localDtlsRole: "server" });
          }
          const rtpParameters = utils.clone(this._rtpParametersByKind[track.kind]);
          const useRtx = rtpParameters.codecs.some((_codec) => /.+\/rtx$/i.test(_codec.mimeType));
          rtpParameters.mid = `mid-${utils.generateRandomNumber()}`;
          if (!encodings) {
            encodings = [{}];
          }
          for (const encoding of encodings) {
            encoding.ssrc = utils.generateRandomNumber();
            if (useRtx) {
              encoding.rtx = { ssrc: utils.generateRandomNumber() };
            }
          }
          rtpParameters.encodings = encodings;
          rtpParameters.rtcp = {
            cname: this._cname,
            reducedSize: true,
            mux: true
          };
          const localId = this._nextLocalId++;
          this._tracks.set(localId, track);
          return { localId: String(localId), rtpParameters };
        }
        async stopSending(localId) {
          logger.debug("stopSending() [localId:%s]", localId);
          if (this._closed) {
            return;
          }
          if (!this._tracks.has(Number(localId))) {
            throw new Error("local track not found");
          }
          this._tracks.delete(Number(localId));
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async pauseSending(localId) {
          this.assertNotClosed();
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async resumeSending(localId) {
          this.assertNotClosed();
        }
        async replaceTrack(localId, track) {
          this.assertNotClosed();
          if (track) {
            logger.debug("replaceTrack() [localId:%s, track.id:%s]", localId, track.id);
          } else {
            logger.debug("replaceTrack() [localId:%s, no track]", localId);
          }
          this._tracks.delete(Number(localId));
          this._tracks.set(Number(localId), track);
        }
        async setMaxSpatialLayer(localId, spatialLayer) {
          this.assertNotClosed();
          logger.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", localId, spatialLayer);
        }
        async setRtpEncodingParameters(localId, params2) {
          this.assertNotClosed();
          logger.debug("setRtpEncodingParameters() [localId:%s, params:%o]", localId, params2);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async getSenderStats(localId) {
          this.assertNotClosed();
          return /* @__PURE__ */ new Map();
        }
        async sendDataChannel({ ordered, maxPacketLifeTime, maxRetransmits, label, protocol: protocol4 }) {
          this.assertNotClosed();
          if (!this._transportReady) {
            await this.setupTransport({ localDtlsRole: "server" });
          }
          logger.debug("sendDataChannel()");
          const dataChannel = new FakeDataChannel({
            id: this._nextSctpStreamId++,
            ordered,
            maxPacketLifeTime,
            maxRetransmits,
            label,
            protocol: protocol4
          });
          const sctpStreamParameters = {
            streamId: this._nextSctpStreamId,
            ordered,
            maxPacketLifeTime,
            maxRetransmits
          };
          return { dataChannel, sctpStreamParameters };
        }
        async receive(optionsList) {
          this.assertNotClosed();
          const results = [];
          for (const options of optionsList) {
            const { trackId, kind } = options;
            if (!this._transportReady) {
              await this.setupTransport({ localDtlsRole: "client" });
            }
            logger.debug("receive() [trackId:%s, kind:%s]", trackId, kind);
            const localId = this._nextLocalId++;
            const track = new fake_mediastreamtrack_1.FakeMediaStreamTrack({ kind });
            this._tracks.set(localId, track);
            results.push({ localId: String(localId), track });
          }
          return results;
        }
        async stopReceiving(localIds) {
          if (this._closed) {
            return;
          }
          for (const localId of localIds) {
            logger.debug("stopReceiving() [localId:%s]", localId);
            this._tracks.delete(Number(localId));
          }
        }
        async pauseReceiving(localIds) {
          this.assertNotClosed();
        }
        async resumeReceiving(localIds) {
          this.assertNotClosed();
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async getReceiverStats(localId) {
          this.assertNotClosed();
          return /* @__PURE__ */ new Map();
        }
        async receiveDataChannel({ sctpStreamParameters, label, protocol: protocol4 }) {
          this.assertNotClosed();
          if (!this._transportReady) {
            await this.setupTransport({ localDtlsRole: "client" });
          }
          logger.debug("receiveDataChannel()");
          const dataChannel = new FakeDataChannel({
            id: sctpStreamParameters.streamId,
            ordered: sctpStreamParameters.ordered,
            maxPacketLifeTime: sctpStreamParameters.maxPacketLifeTime,
            maxRetransmits: sctpStreamParameters.maxRetransmits,
            label,
            protocol: protocol4
          });
          return { dataChannel };
        }
        async setupTransport({
          localDtlsRole,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          localSdpObject
        }) {
          const dtlsParameters = utils.clone(this.fakeParameters.generateLocalDtlsParameters());
          if (localDtlsRole) {
            dtlsParameters.role = localDtlsRole;
          }
          this.emit("@connectionstatechange", "connecting");
          await new Promise((resolve, reject) => this.emit("@connect", { dtlsParameters }, resolve, reject));
          this._transportReady = true;
        }
        assertNotClosed() {
          if (this._closed) {
            throw new errors_1.InvalidStateError("method called in a closed handler");
          }
        }
      };
      exports.FakeHandler = FakeHandler;
    }
  });

  // node_modules/mediasoup-client/lib/test/fakeParameters.js
  var require_fakeParameters = __commonJS({
    "node_modules/mediasoup-client/lib/test/fakeParameters.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.generateRouterRtpCapabilities = generateRouterRtpCapabilities;
      exports.generateNativeRtpCapabilities = generateNativeRtpCapabilities;
      exports.generateNativeSctpCapabilities = generateNativeSctpCapabilities;
      exports.generateLocalDtlsParameters = generateLocalDtlsParameters;
      exports.generateTransportRemoteParameters = generateTransportRemoteParameters;
      exports.generateProducerRemoteParameters = generateProducerRemoteParameters;
      exports.generateConsumerRemoteParameters = generateConsumerRemoteParameters;
      exports.generateDataProducerRemoteParameters = generateDataProducerRemoteParameters;
      exports.generateDataConsumerRemoteParameters = generateDataConsumerRemoteParameters;
      var utils = require_utils();
      function generateFakeUuid() {
        return String(utils.generateRandomNumber());
      }
      function generateRouterRtpCapabilities() {
        return utils.deepFreeze({
          codecs: [
            {
              mimeType: "audio/opus",
              kind: "audio",
              preferredPayloadType: 100,
              clockRate: 48e3,
              channels: 2,
              rtcpFeedback: [{ type: "transport-cc" }],
              parameters: {
                useinbandfec: 1,
                foo: "bar"
              }
            },
            {
              mimeType: "video/VP8",
              kind: "video",
              preferredPayloadType: 101,
              clockRate: 9e4,
              rtcpFeedback: [
                { type: "nack" },
                { type: "nack", parameter: "pli" },
                { type: "ccm", parameter: "fir" },
                { type: "goog-remb" },
                { type: "transport-cc" }
              ],
              parameters: {
                "x-google-start-bitrate": 1500
              }
            },
            {
              mimeType: "video/rtx",
              kind: "video",
              preferredPayloadType: 102,
              clockRate: 9e4,
              rtcpFeedback: [],
              parameters: {
                apt: 101
              }
            },
            {
              mimeType: "video/H264",
              kind: "video",
              preferredPayloadType: 103,
              clockRate: 9e4,
              rtcpFeedback: [
                { type: "nack" },
                { type: "nack", parameter: "pli" },
                { type: "ccm", parameter: "fir" },
                { type: "goog-remb" },
                { type: "transport-cc" }
              ],
              parameters: {
                "level-asymmetry-allowed": 1,
                "packetization-mode": 1,
                "profile-level-id": "42e01f"
              }
            },
            {
              mimeType: "video/rtx",
              kind: "video",
              preferredPayloadType: 104,
              clockRate: 9e4,
              rtcpFeedback: [],
              parameters: {
                apt: 103
              }
            },
            {
              mimeType: "video/VP9",
              kind: "video",
              preferredPayloadType: 105,
              clockRate: 9e4,
              rtcpFeedback: [
                { type: "nack" },
                { type: "nack", parameter: "pli" },
                { type: "ccm", parameter: "fir" },
                { type: "goog-remb" },
                { type: "transport-cc" }
              ],
              parameters: {
                "profile-id": 0,
                "x-google-start-bitrate": 1500
              }
            },
            {
              mimeType: "video/rtx",
              kind: "video",
              preferredPayloadType: 106,
              clockRate: 9e4,
              rtcpFeedback: [],
              parameters: {
                apt: 105
              }
            }
          ],
          headerExtensions: [
            {
              kind: "audio",
              uri: "urn:ietf:params:rtp-hdrext:sdes:mid",
              preferredId: 1,
              preferredEncrypt: false,
              direction: "sendrecv"
            },
            {
              kind: "video",
              uri: "urn:ietf:params:rtp-hdrext:sdes:mid",
              preferredId: 1,
              preferredEncrypt: false,
              direction: "sendrecv"
            },
            {
              kind: "video",
              uri: "urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id",
              preferredId: 2,
              preferredEncrypt: false,
              direction: "recvonly"
            },
            {
              kind: "video",
              uri: "urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id",
              preferredId: 3,
              preferredEncrypt: false,
              direction: "recvonly"
            },
            {
              kind: "audio",
              uri: "http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time",
              preferredId: 4,
              preferredEncrypt: false,
              direction: "sendrecv"
            },
            {
              kind: "video",
              uri: "http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time",
              preferredId: 4,
              preferredEncrypt: false,
              direction: "sendrecv"
            },
            {
              kind: "audio",
              uri: "http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01",
              preferredId: 5,
              preferredEncrypt: false,
              direction: "recvonly"
            },
            {
              kind: "video",
              uri: "http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01",
              preferredId: 5,
              preferredEncrypt: false,
              direction: "sendrecv"
            },
            {
              kind: "video",
              uri: "http://tools.ietf.org/html/draft-ietf-avtext-framemarking-07",
              preferredId: 6,
              preferredEncrypt: false,
              direction: "sendrecv"
            },
            {
              kind: "video",
              uri: "urn:ietf:params:rtp-hdrext:framemarking",
              preferredId: 7,
              preferredEncrypt: false,
              direction: "sendrecv"
            },
            {
              kind: "audio",
              uri: "urn:ietf:params:rtp-hdrext:ssrc-audio-level",
              preferredId: 10,
              preferredEncrypt: false,
              direction: "sendrecv"
            },
            {
              kind: "video",
              uri: "urn:3gpp:video-orientation",
              preferredId: 11,
              preferredEncrypt: false,
              direction: "sendrecv"
            },
            {
              kind: "video",
              uri: "urn:ietf:params:rtp-hdrext:toffset",
              preferredId: 12,
              preferredEncrypt: false,
              direction: "sendrecv"
            }
          ]
        });
      }
      function generateNativeRtpCapabilities() {
        return utils.deepFreeze({
          codecs: [
            {
              mimeType: "audio/opus",
              kind: "audio",
              preferredPayloadType: 111,
              clockRate: 48e3,
              channels: 2,
              rtcpFeedback: [{ type: "transport-cc" }],
              parameters: {
                minptime: 10,
                useinbandfec: 1
              }
            },
            {
              mimeType: "audio/ISAC",
              kind: "audio",
              preferredPayloadType: 103,
              clockRate: 16e3,
              channels: 1,
              rtcpFeedback: [{ type: "transport-cc" }],
              parameters: {}
            },
            {
              mimeType: "audio/CN",
              kind: "audio",
              preferredPayloadType: 106,
              clockRate: 32e3,
              channels: 1,
              rtcpFeedback: [{ type: "transport-cc" }],
              parameters: {}
            },
            {
              mimeType: "video/VP8",
              kind: "video",
              preferredPayloadType: 96,
              clockRate: 9e4,
              rtcpFeedback: [
                { type: "goog-remb" },
                { type: "transport-cc" },
                { type: "ccm", parameter: "fir" },
                { type: "nack" },
                { type: "nack", parameter: "pli" }
              ],
              parameters: {
                baz: "1234abcd"
              }
            },
            {
              mimeType: "video/rtx",
              kind: "video",
              preferredPayloadType: 97,
              clockRate: 9e4,
              rtcpFeedback: [],
              parameters: {
                apt: 96
              }
            },
            {
              mimeType: "video/VP9",
              kind: "video",
              preferredPayloadType: 98,
              clockRate: 9e4,
              rtcpFeedback: [
                { type: "goog-remb" },
                { type: "transport-cc" },
                { type: "ccm", parameter: "fir" },
                { type: "nack" },
                { type: "nack", parameter: "pli" }
              ],
              parameters: {
                "profile-id": 0
              }
            },
            {
              mimeType: "video/rtx",
              kind: "video",
              preferredPayloadType: 99,
              clockRate: 9e4,
              rtcpFeedback: [],
              parameters: {
                apt: 98
              }
            }
          ],
          headerExtensions: [
            {
              kind: "audio",
              uri: "urn:ietf:params:rtp-hdrext:sdes:mid",
              preferredId: 1
            },
            {
              kind: "video",
              uri: "urn:ietf:params:rtp-hdrext:sdes:mid",
              preferredId: 1
            },
            {
              kind: "video",
              uri: "urn:ietf:params:rtp-hdrext:toffset",
              preferredId: 2
            },
            {
              kind: "video",
              uri: "http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time",
              preferredId: 3
            },
            {
              kind: "video",
              uri: "urn:3gpp:video-orientation",
              preferredId: 4
            },
            {
              kind: "video",
              uri: "http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01",
              preferredId: 5
            },
            {
              kind: "video",
              uri: "http://www.webrtc.org/experiments/rtp-hdrext/playout-delay",
              preferredId: 6
            },
            {
              kind: "video",
              // @ts-expect-error --- ON purpose.
              uri: "http://www.webrtc.org/experiments/rtp-hdrext/video-content-type",
              preferredId: 7
            },
            {
              kind: "video",
              // @ts-expect-error --- ON purpose.
              uri: "http://www.webrtc.org/experiments/rtp-hdrext/video-timing",
              preferredId: 8
            },
            {
              kind: "audio",
              uri: "urn:ietf:params:rtp-hdrext:ssrc-audio-level",
              preferredId: 10
            }
          ]
        });
      }
      function generateNativeSctpCapabilities() {
        return utils.deepFreeze({
          numStreams: { OS: 2048, MIS: 2048 }
        });
      }
      function generateLocalDtlsParameters() {
        return utils.deepFreeze({
          fingerprints: [
            {
              algorithm: "sha-256",
              value: "82:5A:68:3D:36:C3:0A:DE:AF:E7:32:43:D2:88:83:57:AC:2D:65:E5:80:C4:B6:FB:AF:1A:A0:21:9F:6D:0C:AD"
            }
          ],
          role: "auto"
        });
      }
      function generateTransportRemoteParameters() {
        return {
          id: generateFakeUuid(),
          iceParameters: utils.deepFreeze({
            iceLite: true,
            password: "yku5ej8nvfaor28lvtrabcx0wkrpkztz",
            usernameFragment: "h3hk1iz6qqlnqlne"
          }),
          iceCandidates: utils.deepFreeze([
            {
              foundation: "udpcandidate",
              address: "9.9.9.9",
              ip: "9.9.9.9",
              port: 40533,
              priority: 1078862079,
              protocol: "udp",
              type: "host",
              tcpType: "passive"
            },
            {
              foundation: "udpcandidate",
              address: "9.9.9.9",
              ip: "9:9:9:9:9:9",
              port: 41333,
              priority: 1078862089,
              protocol: "udp",
              type: "host",
              tcpType: "passive"
            }
          ]),
          dtlsParameters: utils.deepFreeze({
            fingerprints: [
              {
                algorithm: "sha-256",
                value: "A9:F4:E0:D2:74:D3:0F:D9:CA:A5:2F:9F:7F:47:FA:F0:C4:72:DD:73:49:D0:3B:14:90:20:51:30:1B:90:8E:71"
              },
              {
                algorithm: "sha-384",
                value: "03:D9:0B:87:13:98:F6:6D:BC:FC:92:2E:39:D4:E1:97:32:61:30:56:84:70:81:6E:D1:82:97:EA:D9:C1:21:0F:6B:C5:E7:7F:E1:97:0C:17:97:6E:CF:B3:EF:2E:74:B0"
              },
              {
                algorithm: "sha-512",
                value: "84:27:A4:28:A4:73:AF:43:02:2A:44:68:FF:2F:29:5C:3B:11:9A:60:F4:A8:F0:F5:AC:A0:E3:49:3E:B1:34:53:A9:85:CE:51:9B:ED:87:5E:B8:F4:8E:3D:FA:20:51:B8:96:EE:DA:56:DC:2F:5C:62:79:15:23:E0:21:82:2B:2C"
              }
            ],
            role: "auto"
          }),
          sctpParameters: utils.deepFreeze({
            port: 5e3,
            OS: 2048,
            MIS: 2048,
            maxMessageSize: 2e6
          })
        };
      }
      function generateProducerRemoteParameters() {
        return utils.deepFreeze({
          id: generateFakeUuid()
        });
      }
      function generateConsumerRemoteParameters({ id, codecMimeType } = {}) {
        switch (codecMimeType) {
          case "audio/opus": {
            return {
              id: id ?? generateFakeUuid(),
              producerId: generateFakeUuid(),
              kind: "audio",
              rtpParameters: utils.deepFreeze({
                codecs: [
                  {
                    mimeType: "audio/opus",
                    payloadType: 100,
                    clockRate: 48e3,
                    channels: 2,
                    rtcpFeedback: [{ type: "transport-cc" }],
                    parameters: {
                      useinbandfec: 1,
                      foo: "bar"
                    }
                  }
                ],
                encodings: [
                  {
                    ssrc: 46687003
                  }
                ],
                headerExtensions: [
                  {
                    uri: "urn:ietf:params:rtp-hdrext:sdes:mid",
                    id: 1
                  },
                  {
                    uri: "http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01",
                    id: 5
                  },
                  {
                    uri: "urn:ietf:params:rtp-hdrext:ssrc-audio-level",
                    id: 10
                  }
                ],
                rtcp: {
                  cname: "wB4Ql4lrsxYLjzuN",
                  reducedSize: true,
                  mux: true
                }
              })
            };
          }
          case "audio/ISAC": {
            return {
              id: id ?? generateFakeUuid(),
              producerId: generateFakeUuid(),
              kind: "audio",
              rtpParameters: utils.deepFreeze({
                codecs: [
                  {
                    mimeType: "audio/ISAC",
                    payloadType: 111,
                    clockRate: 16e3,
                    channels: 1,
                    rtcpFeedback: [{ type: "transport-cc" }],
                    parameters: {}
                  }
                ],
                encodings: [
                  {
                    ssrc: 46687004
                  }
                ],
                headerExtensions: [
                  {
                    uri: "urn:ietf:params:rtp-hdrext:sdes:mid",
                    id: 1
                  },
                  {
                    uri: "http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01",
                    id: 5
                  }
                ],
                rtcp: {
                  cname: "wB4Ql4lrsxYLjzuN",
                  reducedSize: true,
                  mux: true
                }
              })
            };
          }
          case "video/VP8": {
            return {
              id: id ?? generateFakeUuid(),
              producerId: generateFakeUuid(),
              kind: "video",
              rtpParameters: utils.deepFreeze({
                codecs: [
                  {
                    mimeType: "video/VP8",
                    payloadType: 101,
                    clockRate: 9e4,
                    rtcpFeedback: [
                      { type: "nack" },
                      { type: "nack", parameter: "pli" },
                      { type: "ccm", parameter: "fir" },
                      { type: "goog-remb" },
                      { type: "transport-cc" }
                    ],
                    parameters: {
                      "x-google-start-bitrate": 1500
                    }
                  },
                  {
                    mimeType: "video/rtx",
                    payloadType: 102,
                    clockRate: 9e4,
                    rtcpFeedback: [],
                    parameters: {
                      apt: 101
                    }
                  }
                ],
                encodings: [
                  {
                    ssrc: 99991111,
                    rtx: {
                      ssrc: 99991112
                    }
                  }
                ],
                headerExtensions: [
                  {
                    uri: "urn:ietf:params:rtp-hdrext:sdes:mid",
                    id: 1
                  },
                  {
                    uri: "http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time",
                    id: 4
                  },
                  {
                    uri: "http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01",
                    id: 5
                  },
                  {
                    uri: "urn:3gpp:video-orientation",
                    id: 11
                  },
                  {
                    uri: "urn:ietf:params:rtp-hdrext:toffset",
                    id: 12
                  }
                ],
                rtcp: {
                  cname: "wB4Ql4lrsxYLjzuN",
                  reducedSize: true,
                  mux: true
                }
              })
            };
          }
          case "video/H264": {
            return {
              id: id ?? generateFakeUuid(),
              producerId: generateFakeUuid(),
              kind: "video",
              rtpParameters: utils.deepFreeze({
                codecs: [
                  {
                    mimeType: "video/H264",
                    payloadType: 103,
                    clockRate: 9e4,
                    rtcpFeedback: [
                      { type: "nack" },
                      { type: "nack", parameter: "pli" },
                      { type: "ccm", parameter: "fir" },
                      { type: "goog-remb" },
                      { type: "transport-cc" }
                    ],
                    parameters: {
                      "level-asymmetry-allowed": 1,
                      "packetization-mode": 1,
                      "profile-level-id": "42e01f"
                    }
                  },
                  {
                    mimeType: "video/rtx",
                    payloadType: 104,
                    clockRate: 9e4,
                    rtcpFeedback: [],
                    parameters: {
                      apt: 103
                    }
                  }
                ],
                encodings: [
                  {
                    ssrc: 99991113,
                    rtx: {
                      ssrc: 99991114
                    }
                  }
                ],
                headerExtensions: [
                  {
                    uri: "urn:ietf:params:rtp-hdrext:sdes:mid",
                    id: 1
                  },
                  {
                    uri: "http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time",
                    id: 4
                  },
                  {
                    uri: "http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01",
                    id: 5
                  },
                  {
                    uri: "urn:3gpp:video-orientation",
                    id: 11
                  },
                  {
                    uri: "urn:ietf:params:rtp-hdrext:toffset",
                    id: 12
                  }
                ],
                rtcp: {
                  cname: "wB4Ql4lrsxYLjzuN",
                  reducedSize: true,
                  mux: true
                }
              })
            };
          }
          default: {
            throw new TypeError(`unknown codecMimeType '${codecMimeType}'`);
          }
        }
      }
      function generateDataProducerRemoteParameters() {
        return utils.deepFreeze({
          id: generateFakeUuid()
        });
      }
      function generateDataConsumerRemoteParameters({ id } = {}) {
        return {
          id: id ?? generateFakeUuid(),
          dataProducerId: generateFakeUuid(),
          sctpStreamParameters: utils.deepFreeze({
            streamId: 666,
            maxPacketLifeTime: 5e3,
            maxRetransmits: void 0
          })
        };
      }
    }
  });

  // node_modules/mediasoup-client/lib/index.js
  var require_lib5 = __commonJS({
    "node_modules/mediasoup-client/lib/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.debug = exports.testFakeParameters = exports.FakeHandler = exports.ortc = exports.parseScalabilityMode = exports.detectDeviceAsync = exports.detectDevice = exports.Device = exports.version = exports.types = void 0;
      var debug_1 = require_browser();
      exports.debug = debug_1.default;
      exports.types = require_types();
      exports.version = "3.12.2";
      var Device_1 = require_Device();
      Object.defineProperty(exports, "Device", { enumerable: true, get: function() {
        return Device_1.Device;
      } });
      Object.defineProperty(exports, "detectDevice", { enumerable: true, get: function() {
        return Device_1.detectDevice;
      } });
      Object.defineProperty(exports, "detectDeviceAsync", { enumerable: true, get: function() {
        return Device_1.detectDeviceAsync;
      } });
      var scalabilityModes_1 = require_scalabilityModes();
      Object.defineProperty(exports, "parseScalabilityMode", { enumerable: true, get: function() {
        return scalabilityModes_1.parse;
      } });
      exports.ortc = require_ortc();
      var FakeHandler_1 = require_FakeHandler();
      Object.defineProperty(exports, "FakeHandler", { enumerable: true, get: function() {
        return FakeHandler_1.FakeHandler;
      } });
      exports.testFakeParameters = require_fakeParameters();
    }
  });

  // node_modules/engine.io-parser/build/esm/commons.js
  var PACKET_TYPES = /* @__PURE__ */ Object.create(null);
  PACKET_TYPES["open"] = "0";
  PACKET_TYPES["close"] = "1";
  PACKET_TYPES["ping"] = "2";
  PACKET_TYPES["pong"] = "3";
  PACKET_TYPES["message"] = "4";
  PACKET_TYPES["upgrade"] = "5";
  PACKET_TYPES["noop"] = "6";
  var PACKET_TYPES_REVERSE = /* @__PURE__ */ Object.create(null);
  Object.keys(PACKET_TYPES).forEach((key) => {
    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
  });
  var ERROR_PACKET = { type: "error", data: "parser error" };

  // node_modules/engine.io-parser/build/esm/encodePacket.browser.js
  var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
  var withNativeArrayBuffer = typeof ArrayBuffer === "function";
  var isView = (obj) => {
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
  };
  var encodePacket = ({ type, data }, supportsBinary, callback) => {
    if (withNativeBlob && data instanceof Blob) {
      if (supportsBinary) {
        return callback(data);
      } else {
        return encodeBlobAsBase64(data, callback);
      }
    } else if (withNativeArrayBuffer && (data instanceof ArrayBuffer || isView(data))) {
      if (supportsBinary) {
        return callback(data);
      } else {
        return encodeBlobAsBase64(new Blob([data]), callback);
      }
    }
    return callback(PACKET_TYPES[type] + (data || ""));
  };
  var encodeBlobAsBase64 = (data, callback) => {
    const fileReader = new FileReader();
    fileReader.onload = function() {
      const content = fileReader.result.split(",")[1];
      callback("b" + (content || ""));
    };
    return fileReader.readAsDataURL(data);
  };
  function toArray(data) {
    if (data instanceof Uint8Array) {
      return data;
    } else if (data instanceof ArrayBuffer) {
      return new Uint8Array(data);
    } else {
      return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    }
  }
  var TEXT_ENCODER;
  function encodePacketToBinary(packet, callback) {
    if (withNativeBlob && packet.data instanceof Blob) {
      return packet.data.arrayBuffer().then(toArray).then(callback);
    } else if (withNativeArrayBuffer && (packet.data instanceof ArrayBuffer || isView(packet.data))) {
      return callback(toArray(packet.data));
    }
    encodePacket(packet, false, (encoded) => {
      if (!TEXT_ENCODER) {
        TEXT_ENCODER = new TextEncoder();
      }
      callback(TEXT_ENCODER.encode(encoded));
    });
  }

  // node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
  for (let i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }
  var decode = (base64) => {
    let bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }
    const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
    for (i = 0; i < len; i += 4) {
      encoded1 = lookup[base64.charCodeAt(i)];
      encoded2 = lookup[base64.charCodeAt(i + 1)];
      encoded3 = lookup[base64.charCodeAt(i + 2)];
      encoded4 = lookup[base64.charCodeAt(i + 3)];
      bytes[p++] = encoded1 << 2 | encoded2 >> 4;
      bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
      bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return arraybuffer;
  };

  // node_modules/engine.io-parser/build/esm/decodePacket.browser.js
  var withNativeArrayBuffer2 = typeof ArrayBuffer === "function";
  var decodePacket = (encodedPacket, binaryType) => {
    if (typeof encodedPacket !== "string") {
      return {
        type: "message",
        data: mapBinary(encodedPacket, binaryType)
      };
    }
    const type = encodedPacket.charAt(0);
    if (type === "b") {
      return {
        type: "message",
        data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
      };
    }
    const packetType = PACKET_TYPES_REVERSE[type];
    if (!packetType) {
      return ERROR_PACKET;
    }
    return encodedPacket.length > 1 ? {
      type: PACKET_TYPES_REVERSE[type],
      data: encodedPacket.substring(1)
    } : {
      type: PACKET_TYPES_REVERSE[type]
    };
  };
  var decodeBase64Packet = (data, binaryType) => {
    if (withNativeArrayBuffer2) {
      const decoded = decode(data);
      return mapBinary(decoded, binaryType);
    } else {
      return { base64: true, data };
    }
  };
  var mapBinary = (data, binaryType) => {
    switch (binaryType) {
      case "blob":
        if (data instanceof Blob) {
          return data;
        } else {
          return new Blob([data]);
        }
      case "arraybuffer":
      default:
        if (data instanceof ArrayBuffer) {
          return data;
        } else {
          return data.buffer;
        }
    }
  };

  // node_modules/engine.io-parser/build/esm/index.js
  var SEPARATOR = String.fromCharCode(30);
  var encodePayload = (packets, callback) => {
    const length = packets.length;
    const encodedPackets = new Array(length);
    let count = 0;
    packets.forEach((packet, i) => {
      encodePacket(packet, false, (encodedPacket) => {
        encodedPackets[i] = encodedPacket;
        if (++count === length) {
          callback(encodedPackets.join(SEPARATOR));
        }
      });
    });
  };
  var decodePayload = (encodedPayload, binaryType) => {
    const encodedPackets = encodedPayload.split(SEPARATOR);
    const packets = [];
    for (let i = 0; i < encodedPackets.length; i++) {
      const decodedPacket = decodePacket(encodedPackets[i], binaryType);
      packets.push(decodedPacket);
      if (decodedPacket.type === "error") {
        break;
      }
    }
    return packets;
  };
  function createPacketEncoderStream() {
    return new TransformStream({
      transform(packet, controller) {
        encodePacketToBinary(packet, (encodedPacket) => {
          const payloadLength = encodedPacket.length;
          let header;
          if (payloadLength < 126) {
            header = new Uint8Array(1);
            new DataView(header.buffer).setUint8(0, payloadLength);
          } else if (payloadLength < 65536) {
            header = new Uint8Array(3);
            const view = new DataView(header.buffer);
            view.setUint8(0, 126);
            view.setUint16(1, payloadLength);
          } else {
            header = new Uint8Array(9);
            const view = new DataView(header.buffer);
            view.setUint8(0, 127);
            view.setBigUint64(1, BigInt(payloadLength));
          }
          if (packet.data && typeof packet.data !== "string") {
            header[0] |= 128;
          }
          controller.enqueue(header);
          controller.enqueue(encodedPacket);
        });
      }
    });
  }
  var TEXT_DECODER;
  function totalLength(chunks) {
    return chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  }
  function concatChunks(chunks, size) {
    if (chunks[0].length === size) {
      return chunks.shift();
    }
    const buffer = new Uint8Array(size);
    let j = 0;
    for (let i = 0; i < size; i++) {
      buffer[i] = chunks[0][j++];
      if (j === chunks[0].length) {
        chunks.shift();
        j = 0;
      }
    }
    if (chunks.length && j < chunks[0].length) {
      chunks[0] = chunks[0].slice(j);
    }
    return buffer;
  }
  function createPacketDecoderStream(maxPayload, binaryType) {
    if (!TEXT_DECODER) {
      TEXT_DECODER = new TextDecoder();
    }
    const chunks = [];
    let state = 0;
    let expectedLength = -1;
    let isBinary2 = false;
    return new TransformStream({
      transform(chunk, controller) {
        chunks.push(chunk);
        while (true) {
          if (state === 0) {
            if (totalLength(chunks) < 1) {
              break;
            }
            const header = concatChunks(chunks, 1);
            isBinary2 = (header[0] & 128) === 128;
            expectedLength = header[0] & 127;
            if (expectedLength < 126) {
              state = 3;
            } else if (expectedLength === 126) {
              state = 1;
            } else {
              state = 2;
            }
          } else if (state === 1) {
            if (totalLength(chunks) < 2) {
              break;
            }
            const headerArray = concatChunks(chunks, 2);
            expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);
            state = 3;
          } else if (state === 2) {
            if (totalLength(chunks) < 8) {
              break;
            }
            const headerArray = concatChunks(chunks, 8);
            const view = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length);
            const n = view.getUint32(0);
            if (n > Math.pow(2, 53 - 32) - 1) {
              controller.enqueue(ERROR_PACKET);
              break;
            }
            expectedLength = n * Math.pow(2, 32) + view.getUint32(4);
            state = 3;
          } else {
            if (totalLength(chunks) < expectedLength) {
              break;
            }
            const data = concatChunks(chunks, expectedLength);
            controller.enqueue(decodePacket(isBinary2 ? data : TEXT_DECODER.decode(data), binaryType));
            state = 0;
          }
          if (expectedLength === 0 || expectedLength > maxPayload) {
            controller.enqueue(ERROR_PACKET);
            break;
          }
        }
      }
    });
  }
  var protocol = 4;

  // node_modules/@socket.io/component-emitter/lib/esm/index.js
  function Emitter(obj) {
    if (obj) return mixin(obj);
  }
  function mixin(obj) {
    for (var key in Emitter.prototype) {
      obj[key] = Emitter.prototype[key];
    }
    return obj;
  }
  Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
    this._callbacks = this._callbacks || {};
    (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
    return this;
  };
  Emitter.prototype.once = function(event, fn) {
    function on2() {
      this.off(event, on2);
      fn.apply(this, arguments);
    }
    on2.fn = fn;
    this.on(event, on2);
    return this;
  };
  Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
    this._callbacks = this._callbacks || {};
    if (0 == arguments.length) {
      this._callbacks = {};
      return this;
    }
    var callbacks = this._callbacks["$" + event];
    if (!callbacks) return this;
    if (1 == arguments.length) {
      delete this._callbacks["$" + event];
      return this;
    }
    var cb;
    for (var i = 0; i < callbacks.length; i++) {
      cb = callbacks[i];
      if (cb === fn || cb.fn === fn) {
        callbacks.splice(i, 1);
        break;
      }
    }
    if (callbacks.length === 0) {
      delete this._callbacks["$" + event];
    }
    return this;
  };
  Emitter.prototype.emit = function(event) {
    this._callbacks = this._callbacks || {};
    var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
    if (callbacks) {
      callbacks = callbacks.slice(0);
      for (var i = 0, len = callbacks.length; i < len; ++i) {
        callbacks[i].apply(this, args);
      }
    }
    return this;
  };
  Emitter.prototype.emitReserved = Emitter.prototype.emit;
  Emitter.prototype.listeners = function(event) {
    this._callbacks = this._callbacks || {};
    return this._callbacks["$" + event] || [];
  };
  Emitter.prototype.hasListeners = function(event) {
    return !!this.listeners(event).length;
  };

  // node_modules/engine.io-client/build/esm/globals.js
  var nextTick = (() => {
    const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
    if (isPromiseAvailable) {
      return (cb) => Promise.resolve().then(cb);
    } else {
      return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
    }
  })();
  var globalThisShim = (() => {
    if (typeof self !== "undefined") {
      return self;
    } else if (typeof window !== "undefined") {
      return window;
    } else {
      return Function("return this")();
    }
  })();
  var defaultBinaryType = "arraybuffer";
  function createCookieJar() {
  }

  // node_modules/engine.io-client/build/esm/util.js
  function pick(obj, ...attr) {
    return attr.reduce((acc, k) => {
      if (obj.hasOwnProperty(k)) {
        acc[k] = obj[k];
      }
      return acc;
    }, {});
  }
  var NATIVE_SET_TIMEOUT = globalThisShim.setTimeout;
  var NATIVE_CLEAR_TIMEOUT = globalThisShim.clearTimeout;
  function installTimerFunctions(obj, opts) {
    if (opts.useNativeTimers) {
      obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim);
      obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim);
    } else {
      obj.setTimeoutFn = globalThisShim.setTimeout.bind(globalThisShim);
      obj.clearTimeoutFn = globalThisShim.clearTimeout.bind(globalThisShim);
    }
  }
  var BASE64_OVERHEAD = 1.33;
  function byteLength(obj) {
    if (typeof obj === "string") {
      return utf8Length(obj);
    }
    return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
  }
  function utf8Length(str) {
    let c = 0, length = 0;
    for (let i = 0, l = str.length; i < l; i++) {
      c = str.charCodeAt(i);
      if (c < 128) {
        length += 1;
      } else if (c < 2048) {
        length += 2;
      } else if (c < 55296 || c >= 57344) {
        length += 3;
      } else {
        i++;
        length += 4;
      }
    }
    return length;
  }
  function randomString() {
    return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
  }

  // node_modules/engine.io-client/build/esm/contrib/parseqs.js
  function encode(obj) {
    let str = "";
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        if (str.length)
          str += "&";
        str += encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]);
      }
    }
    return str;
  }
  function decode2(qs) {
    let qry = {};
    let pairs = qs.split("&");
    for (let i = 0, l = pairs.length; i < l; i++) {
      let pair = pairs[i].split("=");
      qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return qry;
  }

  // node_modules/engine.io-client/build/esm/transport.js
  var TransportError = class extends Error {
    constructor(reason, description, context) {
      super(reason);
      this.description = description;
      this.context = context;
      this.type = "TransportError";
    }
  };
  var Transport = class extends Emitter {
    /**
     * Transport abstract constructor.
     *
     * @param {Object} opts - options
     * @protected
     */
    constructor(opts) {
      super();
      this.writable = false;
      installTimerFunctions(this, opts);
      this.opts = opts;
      this.query = opts.query;
      this.socket = opts.socket;
      this.supportsBinary = !opts.forceBase64;
    }
    /**
     * Emits an error.
     *
     * @param {String} reason
     * @param description
     * @param context - the error context
     * @return {Transport} for chaining
     * @protected
     */
    onError(reason, description, context) {
      super.emitReserved("error", new TransportError(reason, description, context));
      return this;
    }
    /**
     * Opens the transport.
     */
    open() {
      this.readyState = "opening";
      this.doOpen();
      return this;
    }
    /**
     * Closes the transport.
     */
    close() {
      if (this.readyState === "opening" || this.readyState === "open") {
        this.doClose();
        this.onClose();
      }
      return this;
    }
    /**
     * Sends multiple packets.
     *
     * @param {Array} packets
     */
    send(packets) {
      if (this.readyState === "open") {
        this.write(packets);
      } else {
      }
    }
    /**
     * Called upon open
     *
     * @protected
     */
    onOpen() {
      this.readyState = "open";
      this.writable = true;
      super.emitReserved("open");
    }
    /**
     * Called with data.
     *
     * @param {String} data
     * @protected
     */
    onData(data) {
      const packet = decodePacket(data, this.socket.binaryType);
      this.onPacket(packet);
    }
    /**
     * Called with a decoded packet.
     *
     * @protected
     */
    onPacket(packet) {
      super.emitReserved("packet", packet);
    }
    /**
     * Called upon close.
     *
     * @protected
     */
    onClose(details) {
      this.readyState = "closed";
      super.emitReserved("close", details);
    }
    /**
     * Pauses the transport, in order not to lose packets during an upgrade.
     *
     * @param onPause
     */
    pause(onPause) {
    }
    createUri(schema, query = {}) {
      return schema + "://" + this._hostname() + this._port() + this.opts.path + this._query(query);
    }
    _hostname() {
      const hostname = this.opts.hostname;
      return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
    }
    _port() {
      if (this.opts.port && (this.opts.secure && Number(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80)) {
        return ":" + this.opts.port;
      } else {
        return "";
      }
    }
    _query(query) {
      const encodedQuery = encode(query);
      return encodedQuery.length ? "?" + encodedQuery : "";
    }
  };

  // node_modules/engine.io-client/build/esm/transports/polling.js
  var Polling = class extends Transport {
    constructor() {
      super(...arguments);
      this._polling = false;
    }
    get name() {
      return "polling";
    }
    /**
     * Opens the socket (triggers polling). We write a PING message to determine
     * when the transport is open.
     *
     * @protected
     */
    doOpen() {
      this._poll();
    }
    /**
     * Pauses polling.
     *
     * @param {Function} onPause - callback upon buffers are flushed and transport is paused
     * @package
     */
    pause(onPause) {
      this.readyState = "pausing";
      const pause = () => {
        this.readyState = "paused";
        onPause();
      };
      if (this._polling || !this.writable) {
        let total = 0;
        if (this._polling) {
          total++;
          this.once("pollComplete", function() {
            --total || pause();
          });
        }
        if (!this.writable) {
          total++;
          this.once("drain", function() {
            --total || pause();
          });
        }
      } else {
        pause();
      }
    }
    /**
     * Starts polling cycle.
     *
     * @private
     */
    _poll() {
      this._polling = true;
      this.doPoll();
      this.emitReserved("poll");
    }
    /**
     * Overloads onData to detect payloads.
     *
     * @protected
     */
    onData(data) {
      const callback = (packet) => {
        if ("opening" === this.readyState && packet.type === "open") {
          this.onOpen();
        }
        if ("close" === packet.type) {
          this.onClose({ description: "transport closed by the server" });
          return false;
        }
        this.onPacket(packet);
      };
      decodePayload(data, this.socket.binaryType).forEach(callback);
      if ("closed" !== this.readyState) {
        this._polling = false;
        this.emitReserved("pollComplete");
        if ("open" === this.readyState) {
          this._poll();
        } else {
        }
      }
    }
    /**
     * For polling, send a close packet.
     *
     * @protected
     */
    doClose() {
      const close = () => {
        this.write([{ type: "close" }]);
      };
      if ("open" === this.readyState) {
        close();
      } else {
        this.once("open", close);
      }
    }
    /**
     * Writes a packets payload.
     *
     * @param {Array} packets - data packets
     * @protected
     */
    write(packets) {
      this.writable = false;
      encodePayload(packets, (data) => {
        this.doWrite(data, () => {
          this.writable = true;
          this.emitReserved("drain");
        });
      });
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */
    uri() {
      const schema = this.opts.secure ? "https" : "http";
      const query = this.query || {};
      if (false !== this.opts.timestampRequests) {
        query[this.opts.timestampParam] = randomString();
      }
      if (!this.supportsBinary && !query.sid) {
        query.b64 = 1;
      }
      return this.createUri(schema, query);
    }
  };

  // node_modules/engine.io-client/build/esm/contrib/has-cors.js
  var value = false;
  try {
    value = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
  } catch (err) {
  }
  var hasCORS = value;

  // node_modules/engine.io-client/build/esm/transports/polling-xhr.js
  function empty() {
  }
  var BaseXHR = class extends Polling {
    /**
     * XHR Polling constructor.
     *
     * @param {Object} opts
     * @package
     */
    constructor(opts) {
      super(opts);
      if (typeof location !== "undefined") {
        const isSSL = "https:" === location.protocol;
        let port = location.port;
        if (!port) {
          port = isSSL ? "443" : "80";
        }
        this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
      }
    }
    /**
     * Sends data.
     *
     * @param {String} data to send.
     * @param {Function} called upon flush.
     * @private
     */
    doWrite(data, fn) {
      const req = this.request({
        method: "POST",
        data
      });
      req.on("success", fn);
      req.on("error", (xhrStatus, context) => {
        this.onError("xhr post error", xhrStatus, context);
      });
    }
    /**
     * Starts a poll cycle.
     *
     * @private
     */
    doPoll() {
      const req = this.request();
      req.on("data", this.onData.bind(this));
      req.on("error", (xhrStatus, context) => {
        this.onError("xhr poll error", xhrStatus, context);
      });
      this.pollXhr = req;
    }
  };
  var Request = class _Request extends Emitter {
    /**
     * Request constructor
     *
     * @param {Object} options
     * @package
     */
    constructor(createRequest, uri, opts) {
      super();
      this.createRequest = createRequest;
      installTimerFunctions(this, opts);
      this._opts = opts;
      this._method = opts.method || "GET";
      this._uri = uri;
      this._data = void 0 !== opts.data ? opts.data : null;
      this._create();
    }
    /**
     * Creates the XHR object and sends the request.
     *
     * @private
     */
    _create() {
      var _a;
      const opts = pick(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
      opts.xdomain = !!this._opts.xd;
      const xhr = this._xhr = this.createRequest(opts);
      try {
        xhr.open(this._method, this._uri, true);
        try {
          if (this._opts.extraHeaders) {
            xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
            for (let i in this._opts.extraHeaders) {
              if (this._opts.extraHeaders.hasOwnProperty(i)) {
                xhr.setRequestHeader(i, this._opts.extraHeaders[i]);
              }
            }
          }
        } catch (e) {
        }
        if ("POST" === this._method) {
          try {
            xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
          } catch (e) {
          }
        }
        try {
          xhr.setRequestHeader("Accept", "*/*");
        } catch (e) {
        }
        (_a = this._opts.cookieJar) === null || _a === void 0 ? void 0 : _a.addCookies(xhr);
        if ("withCredentials" in xhr) {
          xhr.withCredentials = this._opts.withCredentials;
        }
        if (this._opts.requestTimeout) {
          xhr.timeout = this._opts.requestTimeout;
        }
        xhr.onreadystatechange = () => {
          var _a2;
          if (xhr.readyState === 3) {
            (_a2 = this._opts.cookieJar) === null || _a2 === void 0 ? void 0 : _a2.parseCookies(
              // @ts-ignore
              xhr.getResponseHeader("set-cookie")
            );
          }
          if (4 !== xhr.readyState)
            return;
          if (200 === xhr.status || 1223 === xhr.status) {
            this._onLoad();
          } else {
            this.setTimeoutFn(() => {
              this._onError(typeof xhr.status === "number" ? xhr.status : 0);
            }, 0);
          }
        };
        xhr.send(this._data);
      } catch (e) {
        this.setTimeoutFn(() => {
          this._onError(e);
        }, 0);
        return;
      }
      if (typeof document !== "undefined") {
        this._index = _Request.requestsCount++;
        _Request.requests[this._index] = this;
      }
    }
    /**
     * Called upon error.
     *
     * @private
     */
    _onError(err) {
      this.emitReserved("error", err, this._xhr);
      this._cleanup(true);
    }
    /**
     * Cleans up house.
     *
     * @private
     */
    _cleanup(fromError) {
      if ("undefined" === typeof this._xhr || null === this._xhr) {
        return;
      }
      this._xhr.onreadystatechange = empty;
      if (fromError) {
        try {
          this._xhr.abort();
        } catch (e) {
        }
      }
      if (typeof document !== "undefined") {
        delete _Request.requests[this._index];
      }
      this._xhr = null;
    }
    /**
     * Called upon load.
     *
     * @private
     */
    _onLoad() {
      const data = this._xhr.responseText;
      if (data !== null) {
        this.emitReserved("data", data);
        this.emitReserved("success");
        this._cleanup();
      }
    }
    /**
     * Aborts the request.
     *
     * @package
     */
    abort() {
      this._cleanup();
    }
  };
  Request.requestsCount = 0;
  Request.requests = {};
  if (typeof document !== "undefined") {
    if (typeof attachEvent === "function") {
      attachEvent("onunload", unloadHandler);
    } else if (typeof addEventListener === "function") {
      const terminationEvent = "onpagehide" in globalThisShim ? "pagehide" : "unload";
      addEventListener(terminationEvent, unloadHandler, false);
    }
  }
  function unloadHandler() {
    for (let i in Request.requests) {
      if (Request.requests.hasOwnProperty(i)) {
        Request.requests[i].abort();
      }
    }
  }
  var hasXHR2 = function() {
    const xhr = newRequest({
      xdomain: false
    });
    return xhr && xhr.responseType !== null;
  }();
  var XHR = class extends BaseXHR {
    constructor(opts) {
      super(opts);
      const forceBase64 = opts && opts.forceBase64;
      this.supportsBinary = hasXHR2 && !forceBase64;
    }
    request(opts = {}) {
      Object.assign(opts, { xd: this.xd }, this.opts);
      return new Request(newRequest, this.uri(), opts);
    }
  };
  function newRequest(opts) {
    const xdomain = opts.xdomain;
    try {
      if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
        return new XMLHttpRequest();
      }
    } catch (e) {
    }
    if (!xdomain) {
      try {
        return new globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
      } catch (e) {
      }
    }
  }

  // node_modules/engine.io-client/build/esm/transports/websocket.js
  var isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
  var BaseWS = class extends Transport {
    get name() {
      return "websocket";
    }
    doOpen() {
      const uri = this.uri();
      const protocols = this.opts.protocols;
      const opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
      if (this.opts.extraHeaders) {
        opts.headers = this.opts.extraHeaders;
      }
      try {
        this.ws = this.createSocket(uri, protocols, opts);
      } catch (err) {
        return this.emitReserved("error", err);
      }
      this.ws.binaryType = this.socket.binaryType;
      this.addEventListeners();
    }
    /**
     * Adds event listeners to the socket
     *
     * @private
     */
    addEventListeners() {
      this.ws.onopen = () => {
        if (this.opts.autoUnref) {
          this.ws._socket.unref();
        }
        this.onOpen();
      };
      this.ws.onclose = (closeEvent) => this.onClose({
        description: "websocket connection closed",
        context: closeEvent
      });
      this.ws.onmessage = (ev) => this.onData(ev.data);
      this.ws.onerror = (e) => this.onError("websocket error", e);
    }
    write(packets) {
      this.writable = false;
      for (let i = 0; i < packets.length; i++) {
        const packet = packets[i];
        const lastPacket = i === packets.length - 1;
        encodePacket(packet, this.supportsBinary, (data) => {
          try {
            this.doWrite(packet, data);
          } catch (e) {
          }
          if (lastPacket) {
            nextTick(() => {
              this.writable = true;
              this.emitReserved("drain");
            }, this.setTimeoutFn);
          }
        });
      }
    }
    doClose() {
      if (typeof this.ws !== "undefined") {
        this.ws.onerror = () => {
        };
        this.ws.close();
        this.ws = null;
      }
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */
    uri() {
      const schema = this.opts.secure ? "wss" : "ws";
      const query = this.query || {};
      if (this.opts.timestampRequests) {
        query[this.opts.timestampParam] = randomString();
      }
      if (!this.supportsBinary) {
        query.b64 = 1;
      }
      return this.createUri(schema, query);
    }
  };
  var WebSocketCtor = globalThisShim.WebSocket || globalThisShim.MozWebSocket;
  var WS = class extends BaseWS {
    createSocket(uri, protocols, opts) {
      return !isReactNative ? protocols ? new WebSocketCtor(uri, protocols) : new WebSocketCtor(uri) : new WebSocketCtor(uri, protocols, opts);
    }
    doWrite(_packet, data) {
      this.ws.send(data);
    }
  };

  // node_modules/engine.io-client/build/esm/transports/webtransport.js
  var WT = class extends Transport {
    get name() {
      return "webtransport";
    }
    doOpen() {
      try {
        this._transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
      } catch (err) {
        return this.emitReserved("error", err);
      }
      this._transport.closed.then(() => {
        this.onClose();
      }).catch((err) => {
        this.onError("webtransport error", err);
      });
      this._transport.ready.then(() => {
        this._transport.createBidirectionalStream().then((stream) => {
          const decoderStream = createPacketDecoderStream(Number.MAX_SAFE_INTEGER, this.socket.binaryType);
          const reader = stream.readable.pipeThrough(decoderStream).getReader();
          const encoderStream = createPacketEncoderStream();
          encoderStream.readable.pipeTo(stream.writable);
          this._writer = encoderStream.writable.getWriter();
          const read = () => {
            reader.read().then(({ done, value: value2 }) => {
              if (done) {
                return;
              }
              this.onPacket(value2);
              read();
            }).catch((err) => {
            });
          };
          read();
          const packet = { type: "open" };
          if (this.query.sid) {
            packet.data = `{"sid":"${this.query.sid}"}`;
          }
          this._writer.write(packet).then(() => this.onOpen());
        });
      });
    }
    write(packets) {
      this.writable = false;
      for (let i = 0; i < packets.length; i++) {
        const packet = packets[i];
        const lastPacket = i === packets.length - 1;
        this._writer.write(packet).then(() => {
          if (lastPacket) {
            nextTick(() => {
              this.writable = true;
              this.emitReserved("drain");
            }, this.setTimeoutFn);
          }
        });
      }
    }
    doClose() {
      var _a;
      (_a = this._transport) === null || _a === void 0 ? void 0 : _a.close();
    }
  };

  // node_modules/engine.io-client/build/esm/transports/index.js
  var transports = {
    websocket: WS,
    webtransport: WT,
    polling: XHR
  };

  // node_modules/engine.io-client/build/esm/contrib/parseuri.js
  var re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
  var parts = [
    "source",
    "protocol",
    "authority",
    "userInfo",
    "user",
    "password",
    "host",
    "port",
    "relative",
    "path",
    "directory",
    "file",
    "query",
    "anchor"
  ];
  function parse(str) {
    if (str.length > 8e3) {
      throw "URI too long";
    }
    const src = str, b = str.indexOf("["), e = str.indexOf("]");
    if (b != -1 && e != -1) {
      str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length);
    }
    let m = re.exec(str || ""), uri = {}, i = 14;
    while (i--) {
      uri[parts[i]] = m[i] || "";
    }
    if (b != -1 && e != -1) {
      uri.source = src;
      uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
      uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
      uri.ipv6uri = true;
    }
    uri.pathNames = pathNames(uri, uri["path"]);
    uri.queryKey = queryKey(uri, uri["query"]);
    return uri;
  }
  function pathNames(obj, path) {
    const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
    if (path.slice(0, 1) == "/" || path.length === 0) {
      names.splice(0, 1);
    }
    if (path.slice(-1) == "/") {
      names.splice(names.length - 1, 1);
    }
    return names;
  }
  function queryKey(uri, query) {
    const data = {};
    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
      if ($1) {
        data[$1] = $2;
      }
    });
    return data;
  }

  // node_modules/engine.io-client/build/esm/socket.js
  var withEventListeners = typeof addEventListener === "function" && typeof removeEventListener === "function";
  var OFFLINE_EVENT_LISTENERS = [];
  if (withEventListeners) {
    addEventListener("offline", () => {
      OFFLINE_EVENT_LISTENERS.forEach((listener) => listener());
    }, false);
  }
  var SocketWithoutUpgrade = class _SocketWithoutUpgrade extends Emitter {
    /**
     * Socket constructor.
     *
     * @param {String|Object} uri - uri or options
     * @param {Object} opts - options
     */
    constructor(uri, opts) {
      super();
      this.binaryType = defaultBinaryType;
      this.writeBuffer = [];
      this._prevBufferLen = 0;
      this._pingInterval = -1;
      this._pingTimeout = -1;
      this._maxPayload = -1;
      this._pingTimeoutTime = Infinity;
      if (uri && "object" === typeof uri) {
        opts = uri;
        uri = null;
      }
      if (uri) {
        const parsedUri = parse(uri);
        opts.hostname = parsedUri.host;
        opts.secure = parsedUri.protocol === "https" || parsedUri.protocol === "wss";
        opts.port = parsedUri.port;
        if (parsedUri.query)
          opts.query = parsedUri.query;
      } else if (opts.host) {
        opts.hostname = parse(opts.host).host;
      }
      installTimerFunctions(this, opts);
      this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
      if (opts.hostname && !opts.port) {
        opts.port = this.secure ? "443" : "80";
      }
      this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
      this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
      this.transports = [];
      this._transportsByName = {};
      opts.transports.forEach((t) => {
        const transportName = t.prototype.name;
        this.transports.push(transportName);
        this._transportsByName[transportName] = t;
      });
      this.opts = Object.assign({
        path: "/engine.io",
        agent: false,
        withCredentials: false,
        upgrade: true,
        timestampParam: "t",
        rememberUpgrade: false,
        addTrailingSlash: true,
        rejectUnauthorized: true,
        perMessageDeflate: {
          threshold: 1024
        },
        transportOptions: {},
        closeOnBeforeunload: false
      }, opts);
      this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : "");
      if (typeof this.opts.query === "string") {
        this.opts.query = decode2(this.opts.query);
      }
      if (withEventListeners) {
        if (this.opts.closeOnBeforeunload) {
          this._beforeunloadEventListener = () => {
            if (this.transport) {
              this.transport.removeAllListeners();
              this.transport.close();
            }
          };
          addEventListener("beforeunload", this._beforeunloadEventListener, false);
        }
        if (this.hostname !== "localhost") {
          this._offlineEventListener = () => {
            this._onClose("transport close", {
              description: "network connection lost"
            });
          };
          OFFLINE_EVENT_LISTENERS.push(this._offlineEventListener);
        }
      }
      if (this.opts.withCredentials) {
        this._cookieJar = createCookieJar();
      }
      this._open();
    }
    /**
     * Creates transport of the given type.
     *
     * @param {String} name - transport name
     * @return {Transport}
     * @private
     */
    createTransport(name) {
      const query = Object.assign({}, this.opts.query);
      query.EIO = protocol;
      query.transport = name;
      if (this.id)
        query.sid = this.id;
      const opts = Object.assign({}, this.opts, {
        query,
        socket: this,
        hostname: this.hostname,
        secure: this.secure,
        port: this.port
      }, this.opts.transportOptions[name]);
      return new this._transportsByName[name](opts);
    }
    /**
     * Initializes transport to use and starts probe.
     *
     * @private
     */
    _open() {
      if (this.transports.length === 0) {
        this.setTimeoutFn(() => {
          this.emitReserved("error", "No transports available");
        }, 0);
        return;
      }
      const transportName = this.opts.rememberUpgrade && _SocketWithoutUpgrade.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
      this.readyState = "opening";
      const transport = this.createTransport(transportName);
      transport.open();
      this.setTransport(transport);
    }
    /**
     * Sets the current transport. Disables the existing one (if any).
     *
     * @private
     */
    setTransport(transport) {
      if (this.transport) {
        this.transport.removeAllListeners();
      }
      this.transport = transport;
      transport.on("drain", this._onDrain.bind(this)).on("packet", this._onPacket.bind(this)).on("error", this._onError.bind(this)).on("close", (reason) => this._onClose("transport close", reason));
    }
    /**
     * Called when connection is deemed open.
     *
     * @private
     */
    onOpen() {
      this.readyState = "open";
      _SocketWithoutUpgrade.priorWebsocketSuccess = "websocket" === this.transport.name;
      this.emitReserved("open");
      this.flush();
    }
    /**
     * Handles a packet.
     *
     * @private
     */
    _onPacket(packet) {
      if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
        this.emitReserved("packet", packet);
        this.emitReserved("heartbeat");
        switch (packet.type) {
          case "open":
            this.onHandshake(JSON.parse(packet.data));
            break;
          case "ping":
            this._sendPacket("pong");
            this.emitReserved("ping");
            this.emitReserved("pong");
            this._resetPingTimeout();
            break;
          case "error":
            const err = new Error("server error");
            err.code = packet.data;
            this._onError(err);
            break;
          case "message":
            this.emitReserved("data", packet.data);
            this.emitReserved("message", packet.data);
            break;
        }
      } else {
      }
    }
    /**
     * Called upon handshake completion.
     *
     * @param {Object} data - handshake obj
     * @private
     */
    onHandshake(data) {
      this.emitReserved("handshake", data);
      this.id = data.sid;
      this.transport.query.sid = data.sid;
      this._pingInterval = data.pingInterval;
      this._pingTimeout = data.pingTimeout;
      this._maxPayload = data.maxPayload;
      this.onOpen();
      if ("closed" === this.readyState)
        return;
      this._resetPingTimeout();
    }
    /**
     * Sets and resets ping timeout timer based on server pings.
     *
     * @private
     */
    _resetPingTimeout() {
      this.clearTimeoutFn(this._pingTimeoutTimer);
      const delay = this._pingInterval + this._pingTimeout;
      this._pingTimeoutTime = Date.now() + delay;
      this._pingTimeoutTimer = this.setTimeoutFn(() => {
        this._onClose("ping timeout");
      }, delay);
      if (this.opts.autoUnref) {
        this._pingTimeoutTimer.unref();
      }
    }
    /**
     * Called on `drain` event
     *
     * @private
     */
    _onDrain() {
      this.writeBuffer.splice(0, this._prevBufferLen);
      this._prevBufferLen = 0;
      if (0 === this.writeBuffer.length) {
        this.emitReserved("drain");
      } else {
        this.flush();
      }
    }
    /**
     * Flush write buffers.
     *
     * @private
     */
    flush() {
      if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
        const packets = this._getWritablePackets();
        this.transport.send(packets);
        this._prevBufferLen = packets.length;
        this.emitReserved("flush");
      }
    }
    /**
     * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
     * long-polling)
     *
     * @private
     */
    _getWritablePackets() {
      const shouldCheckPayloadSize = this._maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1;
      if (!shouldCheckPayloadSize) {
        return this.writeBuffer;
      }
      let payloadSize = 1;
      for (let i = 0; i < this.writeBuffer.length; i++) {
        const data = this.writeBuffer[i].data;
        if (data) {
          payloadSize += byteLength(data);
        }
        if (i > 0 && payloadSize > this._maxPayload) {
          return this.writeBuffer.slice(0, i);
        }
        payloadSize += 2;
      }
      return this.writeBuffer;
    }
    /**
     * Checks whether the heartbeat timer has expired but the socket has not yet been notified.
     *
     * Note: this method is private for now because it does not really fit the WebSocket API, but if we put it in the
     * `write()` method then the message would not be buffered by the Socket.IO client.
     *
     * @return {boolean}
     * @private
     */
    /* private */
    _hasPingExpired() {
      if (!this._pingTimeoutTime)
        return true;
      const hasExpired = Date.now() > this._pingTimeoutTime;
      if (hasExpired) {
        this._pingTimeoutTime = 0;
        nextTick(() => {
          this._onClose("ping timeout");
        }, this.setTimeoutFn);
      }
      return hasExpired;
    }
    /**
     * Sends a message.
     *
     * @param {String} msg - message.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @return {Socket} for chaining.
     */
    write(msg, options, fn) {
      this._sendPacket("message", msg, options, fn);
      return this;
    }
    /**
     * Sends a message. Alias of {@link Socket#write}.
     *
     * @param {String} msg - message.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @return {Socket} for chaining.
     */
    send(msg, options, fn) {
      this._sendPacket("message", msg, options, fn);
      return this;
    }
    /**
     * Sends a packet.
     *
     * @param {String} type: packet type.
     * @param {String} data.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @private
     */
    _sendPacket(type, data, options, fn) {
      if ("function" === typeof data) {
        fn = data;
        data = void 0;
      }
      if ("function" === typeof options) {
        fn = options;
        options = null;
      }
      if ("closing" === this.readyState || "closed" === this.readyState) {
        return;
      }
      options = options || {};
      options.compress = false !== options.compress;
      const packet = {
        type,
        data,
        options
      };
      this.emitReserved("packetCreate", packet);
      this.writeBuffer.push(packet);
      if (fn)
        this.once("flush", fn);
      this.flush();
    }
    /**
     * Closes the connection.
     */
    close() {
      const close = () => {
        this._onClose("forced close");
        this.transport.close();
      };
      const cleanupAndClose = () => {
        this.off("upgrade", cleanupAndClose);
        this.off("upgradeError", cleanupAndClose);
        close();
      };
      const waitForUpgrade = () => {
        this.once("upgrade", cleanupAndClose);
        this.once("upgradeError", cleanupAndClose);
      };
      if ("opening" === this.readyState || "open" === this.readyState) {
        this.readyState = "closing";
        if (this.writeBuffer.length) {
          this.once("drain", () => {
            if (this.upgrading) {
              waitForUpgrade();
            } else {
              close();
            }
          });
        } else if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      }
      return this;
    }
    /**
     * Called upon transport error
     *
     * @private
     */
    _onError(err) {
      _SocketWithoutUpgrade.priorWebsocketSuccess = false;
      if (this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening") {
        this.transports.shift();
        return this._open();
      }
      this.emitReserved("error", err);
      this._onClose("transport error", err);
    }
    /**
     * Called upon transport close.
     *
     * @private
     */
    _onClose(reason, description) {
      if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
        this.clearTimeoutFn(this._pingTimeoutTimer);
        this.transport.removeAllListeners("close");
        this.transport.close();
        this.transport.removeAllListeners();
        if (withEventListeners) {
          if (this._beforeunloadEventListener) {
            removeEventListener("beforeunload", this._beforeunloadEventListener, false);
          }
          if (this._offlineEventListener) {
            const i = OFFLINE_EVENT_LISTENERS.indexOf(this._offlineEventListener);
            if (i !== -1) {
              OFFLINE_EVENT_LISTENERS.splice(i, 1);
            }
          }
        }
        this.readyState = "closed";
        this.id = null;
        this.emitReserved("close", reason, description);
        this.writeBuffer = [];
        this._prevBufferLen = 0;
      }
    }
  };
  SocketWithoutUpgrade.protocol = protocol;
  var SocketWithUpgrade = class extends SocketWithoutUpgrade {
    constructor() {
      super(...arguments);
      this._upgrades = [];
    }
    onOpen() {
      super.onOpen();
      if ("open" === this.readyState && this.opts.upgrade) {
        for (let i = 0; i < this._upgrades.length; i++) {
          this._probe(this._upgrades[i]);
        }
      }
    }
    /**
     * Probes a transport.
     *
     * @param {String} name - transport name
     * @private
     */
    _probe(name) {
      let transport = this.createTransport(name);
      let failed = false;
      SocketWithoutUpgrade.priorWebsocketSuccess = false;
      const onTransportOpen = () => {
        if (failed)
          return;
        transport.send([{ type: "ping", data: "probe" }]);
        transport.once("packet", (msg) => {
          if (failed)
            return;
          if ("pong" === msg.type && "probe" === msg.data) {
            this.upgrading = true;
            this.emitReserved("upgrading", transport);
            if (!transport)
              return;
            SocketWithoutUpgrade.priorWebsocketSuccess = "websocket" === transport.name;
            this.transport.pause(() => {
              if (failed)
                return;
              if ("closed" === this.readyState)
                return;
              cleanup();
              this.setTransport(transport);
              transport.send([{ type: "upgrade" }]);
              this.emitReserved("upgrade", transport);
              transport = null;
              this.upgrading = false;
              this.flush();
            });
          } else {
            const err = new Error("probe error");
            err.transport = transport.name;
            this.emitReserved("upgradeError", err);
          }
        });
      };
      function freezeTransport() {
        if (failed)
          return;
        failed = true;
        cleanup();
        transport.close();
        transport = null;
      }
      const onerror = (err) => {
        const error = new Error("probe error: " + err);
        error.transport = transport.name;
        freezeTransport();
        this.emitReserved("upgradeError", error);
      };
      function onTransportClose() {
        onerror("transport closed");
      }
      function onclose() {
        onerror("socket closed");
      }
      function onupgrade(to) {
        if (transport && to.name !== transport.name) {
          freezeTransport();
        }
      }
      const cleanup = () => {
        transport.removeListener("open", onTransportOpen);
        transport.removeListener("error", onerror);
        transport.removeListener("close", onTransportClose);
        this.off("close", onclose);
        this.off("upgrading", onupgrade);
      };
      transport.once("open", onTransportOpen);
      transport.once("error", onerror);
      transport.once("close", onTransportClose);
      this.once("close", onclose);
      this.once("upgrading", onupgrade);
      if (this._upgrades.indexOf("webtransport") !== -1 && name !== "webtransport") {
        this.setTimeoutFn(() => {
          if (!failed) {
            transport.open();
          }
        }, 200);
      } else {
        transport.open();
      }
    }
    onHandshake(data) {
      this._upgrades = this._filterUpgrades(data.upgrades);
      super.onHandshake(data);
    }
    /**
     * Filters upgrades, returning only those matching client transports.
     *
     * @param {Array} upgrades - server upgrades
     * @private
     */
    _filterUpgrades(upgrades) {
      const filteredUpgrades = [];
      for (let i = 0; i < upgrades.length; i++) {
        if (~this.transports.indexOf(upgrades[i]))
          filteredUpgrades.push(upgrades[i]);
      }
      return filteredUpgrades;
    }
  };
  var Socket = class extends SocketWithUpgrade {
    constructor(uri, opts = {}) {
      const o = typeof uri === "object" ? uri : opts;
      if (!o.transports || o.transports && typeof o.transports[0] === "string") {
        o.transports = (o.transports || ["polling", "websocket", "webtransport"]).map((transportName) => transports[transportName]).filter((t) => !!t);
      }
      super(uri, o);
    }
  };

  // node_modules/engine.io-client/build/esm/index.js
  var protocol2 = Socket.protocol;

  // node_modules/socket.io-client/build/esm/url.js
  function url(uri, path = "", loc) {
    let obj = uri;
    loc = loc || typeof location !== "undefined" && location;
    if (null == uri)
      uri = loc.protocol + "//" + loc.host;
    if (typeof uri === "string") {
      if ("/" === uri.charAt(0)) {
        if ("/" === uri.charAt(1)) {
          uri = loc.protocol + uri;
        } else {
          uri = loc.host + uri;
        }
      }
      if (!/^(https?|wss?):\/\//.test(uri)) {
        if ("undefined" !== typeof loc) {
          uri = loc.protocol + "//" + uri;
        } else {
          uri = "https://" + uri;
        }
      }
      obj = parse(uri);
    }
    if (!obj.port) {
      if (/^(http|ws)$/.test(obj.protocol)) {
        obj.port = "80";
      } else if (/^(http|ws)s$/.test(obj.protocol)) {
        obj.port = "443";
      }
    }
    obj.path = obj.path || "/";
    const ipv6 = obj.host.indexOf(":") !== -1;
    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
  }

  // node_modules/socket.io-parser/build/esm/index.js
  var esm_exports = {};
  __export(esm_exports, {
    Decoder: () => Decoder,
    Encoder: () => Encoder,
    PacketType: () => PacketType,
    protocol: () => protocol3
  });

  // node_modules/socket.io-parser/build/esm/is-binary.js
  var withNativeArrayBuffer3 = typeof ArrayBuffer === "function";
  var isView2 = (obj) => {
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
  };
  var toString = Object.prototype.toString;
  var withNativeBlob2 = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
  var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
  function isBinary(obj) {
    return withNativeArrayBuffer3 && (obj instanceof ArrayBuffer || isView2(obj)) || withNativeBlob2 && obj instanceof Blob || withNativeFile && obj instanceof File;
  }
  function hasBinary(obj, toJSON) {
    if (!obj || typeof obj !== "object") {
      return false;
    }
    if (Array.isArray(obj)) {
      for (let i = 0, l = obj.length; i < l; i++) {
        if (hasBinary(obj[i])) {
          return true;
        }
      }
      return false;
    }
    if (isBinary(obj)) {
      return true;
    }
    if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
      return hasBinary(obj.toJSON(), true);
    }
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
        return true;
      }
    }
    return false;
  }

  // node_modules/socket.io-parser/build/esm/binary.js
  function deconstructPacket(packet) {
    const buffers = [];
    const packetData = packet.data;
    const pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length;
    return { packet: pack, buffers };
  }
  function _deconstructPacket(data, buffers) {
    if (!data)
      return data;
    if (isBinary(data)) {
      const placeholder = { _placeholder: true, num: buffers.length };
      buffers.push(data);
      return placeholder;
    } else if (Array.isArray(data)) {
      const newData = new Array(data.length);
      for (let i = 0; i < data.length; i++) {
        newData[i] = _deconstructPacket(data[i], buffers);
      }
      return newData;
    } else if (typeof data === "object" && !(data instanceof Date)) {
      const newData = {};
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          newData[key] = _deconstructPacket(data[key], buffers);
        }
      }
      return newData;
    }
    return data;
  }
  function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    delete packet.attachments;
    return packet;
  }
  function _reconstructPacket(data, buffers) {
    if (!data)
      return data;
    if (data && data._placeholder === true) {
      const isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
      if (isIndexValid) {
        return buffers[data.num];
      } else {
        throw new Error("illegal attachments");
      }
    } else if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        data[i] = _reconstructPacket(data[i], buffers);
      }
    } else if (typeof data === "object") {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          data[key] = _reconstructPacket(data[key], buffers);
        }
      }
    }
    return data;
  }

  // node_modules/socket.io-parser/build/esm/index.js
  var RESERVED_EVENTS = [
    "connect",
    "connect_error",
    "disconnect",
    "disconnecting",
    "newListener",
    "removeListener"
    // used by the Node.js EventEmitter
  ];
  var protocol3 = 5;
  var PacketType;
  (function(PacketType2) {
    PacketType2[PacketType2["CONNECT"] = 0] = "CONNECT";
    PacketType2[PacketType2["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType2[PacketType2["EVENT"] = 2] = "EVENT";
    PacketType2[PacketType2["ACK"] = 3] = "ACK";
    PacketType2[PacketType2["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType2[PacketType2["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType2[PacketType2["BINARY_ACK"] = 6] = "BINARY_ACK";
  })(PacketType || (PacketType = {}));
  var Encoder = class {
    /**
     * Encoder constructor
     *
     * @param {function} replacer - custom replacer to pass down to JSON.parse
     */
    constructor(replacer) {
      this.replacer = replacer;
    }
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */
    encode(obj) {
      if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
        if (hasBinary(obj)) {
          return this.encodeAsBinary({
            type: obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
            nsp: obj.nsp,
            data: obj.data,
            id: obj.id
          });
        }
      }
      return [this.encodeAsString(obj)];
    }
    /**
     * Encode packet as string.
     */
    encodeAsString(obj) {
      let str = "" + obj.type;
      if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
        str += obj.attachments + "-";
      }
      if (obj.nsp && "/" !== obj.nsp) {
        str += obj.nsp + ",";
      }
      if (null != obj.id) {
        str += obj.id;
      }
      if (null != obj.data) {
        str += JSON.stringify(obj.data, this.replacer);
      }
      return str;
    }
    /**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     */
    encodeAsBinary(obj) {
      const deconstruction = deconstructPacket(obj);
      const pack = this.encodeAsString(deconstruction.packet);
      const buffers = deconstruction.buffers;
      buffers.unshift(pack);
      return buffers;
    }
  };
  function isObject(value2) {
    return Object.prototype.toString.call(value2) === "[object Object]";
  }
  var Decoder = class _Decoder extends Emitter {
    /**
     * Decoder constructor
     *
     * @param {function} reviver - custom reviver to pass down to JSON.stringify
     */
    constructor(reviver) {
      super();
      this.reviver = reviver;
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */
    add(obj) {
      let packet;
      if (typeof obj === "string") {
        if (this.reconstructor) {
          throw new Error("got plaintext data when reconstructing a packet");
        }
        packet = this.decodeString(obj);
        const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
        if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
          packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
          this.reconstructor = new BinaryReconstructor(packet);
          if (packet.attachments === 0) {
            super.emitReserved("decoded", packet);
          }
        } else {
          super.emitReserved("decoded", packet);
        }
      } else if (isBinary(obj) || obj.base64) {
        if (!this.reconstructor) {
          throw new Error("got binary data when not reconstructing a packet");
        } else {
          packet = this.reconstructor.takeBinaryData(obj);
          if (packet) {
            this.reconstructor = null;
            super.emitReserved("decoded", packet);
          }
        }
      } else {
        throw new Error("Unknown type: " + obj);
      }
    }
    /**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     */
    decodeString(str) {
      let i = 0;
      const p = {
        type: Number(str.charAt(0))
      };
      if (PacketType[p.type] === void 0) {
        throw new Error("unknown packet type " + p.type);
      }
      if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
        const start = i + 1;
        while (str.charAt(++i) !== "-" && i != str.length) {
        }
        const buf = str.substring(start, i);
        if (buf != Number(buf) || str.charAt(i) !== "-") {
          throw new Error("Illegal attachments");
        }
        p.attachments = Number(buf);
      }
      if ("/" === str.charAt(i + 1)) {
        const start = i + 1;
        while (++i) {
          const c = str.charAt(i);
          if ("," === c)
            break;
          if (i === str.length)
            break;
        }
        p.nsp = str.substring(start, i);
      } else {
        p.nsp = "/";
      }
      const next = str.charAt(i + 1);
      if ("" !== next && Number(next) == next) {
        const start = i + 1;
        while (++i) {
          const c = str.charAt(i);
          if (null == c || Number(c) != c) {
            --i;
            break;
          }
          if (i === str.length)
            break;
        }
        p.id = Number(str.substring(start, i + 1));
      }
      if (str.charAt(++i)) {
        const payload = this.tryParse(str.substr(i));
        if (_Decoder.isPayloadValid(p.type, payload)) {
          p.data = payload;
        } else {
          throw new Error("invalid payload");
        }
      }
      return p;
    }
    tryParse(str) {
      try {
        return JSON.parse(str, this.reviver);
      } catch (e) {
        return false;
      }
    }
    static isPayloadValid(type, payload) {
      switch (type) {
        case PacketType.CONNECT:
          return isObject(payload);
        case PacketType.DISCONNECT:
          return payload === void 0;
        case PacketType.CONNECT_ERROR:
          return typeof payload === "string" || isObject(payload);
        case PacketType.EVENT:
        case PacketType.BINARY_EVENT:
          return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS.indexOf(payload[0]) === -1);
        case PacketType.ACK:
        case PacketType.BINARY_ACK:
          return Array.isArray(payload);
      }
    }
    /**
     * Deallocates a parser's resources
     */
    destroy() {
      if (this.reconstructor) {
        this.reconstructor.finishedReconstruction();
        this.reconstructor = null;
      }
    }
  };
  var BinaryReconstructor = class {
    constructor(packet) {
      this.packet = packet;
      this.buffers = [];
      this.reconPack = packet;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */
    takeBinaryData(binData) {
      this.buffers.push(binData);
      if (this.buffers.length === this.reconPack.attachments) {
        const packet = reconstructPacket(this.reconPack, this.buffers);
        this.finishedReconstruction();
        return packet;
      }
      return null;
    }
    /**
     * Cleans up binary packet reconstruction variables.
     */
    finishedReconstruction() {
      this.reconPack = null;
      this.buffers = [];
    }
  };

  // node_modules/socket.io-client/build/esm/on.js
  function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
      obj.off(ev, fn);
    };
  }

  // node_modules/socket.io-client/build/esm/socket.js
  var RESERVED_EVENTS2 = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1
  });
  var Socket2 = class extends Emitter {
    /**
     * `Socket` constructor.
     */
    constructor(io, nsp, opts) {
      super();
      this.connected = false;
      this.recovered = false;
      this.receiveBuffer = [];
      this.sendBuffer = [];
      this._queue = [];
      this._queueSeq = 0;
      this.ids = 0;
      this.acks = {};
      this.flags = {};
      this.io = io;
      this.nsp = nsp;
      if (opts && opts.auth) {
        this.auth = opts.auth;
      }
      this._opts = Object.assign({}, opts);
      if (this.io._autoConnect)
        this.open();
    }
    /**
     * Whether the socket is currently disconnected
     *
     * @example
     * const socket = io();
     *
     * socket.on("connect", () => {
     *   console.log(socket.disconnected); // false
     * });
     *
     * socket.on("disconnect", () => {
     *   console.log(socket.disconnected); // true
     * });
     */
    get disconnected() {
      return !this.connected;
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */
    subEvents() {
      if (this.subs)
        return;
      const io = this.io;
      this.subs = [
        on(io, "open", this.onopen.bind(this)),
        on(io, "packet", this.onpacket.bind(this)),
        on(io, "error", this.onerror.bind(this)),
        on(io, "close", this.onclose.bind(this))
      ];
    }
    /**
     * Whether the Socket will try to reconnect when its Manager connects or reconnects.
     *
     * @example
     * const socket = io();
     *
     * console.log(socket.active); // true
     *
     * socket.on("disconnect", (reason) => {
     *   if (reason === "io server disconnect") {
     *     // the disconnection was initiated by the server, you need to manually reconnect
     *     console.log(socket.active); // false
     *   }
     *   // else the socket will automatically try to reconnect
     *   console.log(socket.active); // true
     * });
     */
    get active() {
      return !!this.subs;
    }
    /**
     * "Opens" the socket.
     *
     * @example
     * const socket = io({
     *   autoConnect: false
     * });
     *
     * socket.connect();
     */
    connect() {
      if (this.connected)
        return this;
      this.subEvents();
      if (!this.io["_reconnecting"])
        this.io.open();
      if ("open" === this.io._readyState)
        this.onopen();
      return this;
    }
    /**
     * Alias for {@link connect()}.
     */
    open() {
      return this.connect();
    }
    /**
     * Sends a `message` event.
     *
     * This method mimics the WebSocket.send() method.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
     *
     * @example
     * socket.send("hello");
     *
     * // this is equivalent to
     * socket.emit("message", "hello");
     *
     * @return self
     */
    send(...args) {
      args.unshift("message");
      this.emit.apply(this, args);
      return this;
    }
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @example
     * socket.emit("hello", "world");
     *
     * // all serializable datastructures are supported (no need to call JSON.stringify)
     * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
     *
     * // with an acknowledgement from the server
     * socket.emit("hello", "world", (val) => {
     *   // ...
     * });
     *
     * @return self
     */
    emit(ev, ...args) {
      var _a, _b, _c;
      if (RESERVED_EVENTS2.hasOwnProperty(ev)) {
        throw new Error('"' + ev.toString() + '" is a reserved event name');
      }
      args.unshift(ev);
      if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
        this._addToQueue(args);
        return this;
      }
      const packet = {
        type: PacketType.EVENT,
        data: args
      };
      packet.options = {};
      packet.options.compress = this.flags.compress !== false;
      if ("function" === typeof args[args.length - 1]) {
        const id = this.ids++;
        const ack = args.pop();
        this._registerAckCallback(id, ack);
        packet.id = id;
      }
      const isTransportWritable = (_b = (_a = this.io.engine) === null || _a === void 0 ? void 0 : _a.transport) === null || _b === void 0 ? void 0 : _b.writable;
      const isConnected = this.connected && !((_c = this.io.engine) === null || _c === void 0 ? void 0 : _c._hasPingExpired());
      const discardPacket = this.flags.volatile && !isTransportWritable;
      if (discardPacket) {
      } else if (isConnected) {
        this.notifyOutgoingListeners(packet);
        this.packet(packet);
      } else {
        this.sendBuffer.push(packet);
      }
      this.flags = {};
      return this;
    }
    /**
     * @private
     */
    _registerAckCallback(id, ack) {
      var _a;
      const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
      if (timeout === void 0) {
        this.acks[id] = ack;
        return;
      }
      const timer = this.io.setTimeoutFn(() => {
        delete this.acks[id];
        for (let i = 0; i < this.sendBuffer.length; i++) {
          if (this.sendBuffer[i].id === id) {
            this.sendBuffer.splice(i, 1);
          }
        }
        ack.call(this, new Error("operation has timed out"));
      }, timeout);
      const fn = (...args) => {
        this.io.clearTimeoutFn(timer);
        ack.apply(this, args);
      };
      fn.withError = true;
      this.acks[id] = fn;
    }
    /**
     * Emits an event and waits for an acknowledgement
     *
     * @example
     * // without timeout
     * const response = await socket.emitWithAck("hello", "world");
     *
     * // with a specific timeout
     * try {
     *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
     * } catch (err) {
     *   // the server did not acknowledge the event in the given delay
     * }
     *
     * @return a Promise that will be fulfilled when the server acknowledges the event
     */
    emitWithAck(ev, ...args) {
      return new Promise((resolve, reject) => {
        const fn = (arg1, arg2) => {
          return arg1 ? reject(arg1) : resolve(arg2);
        };
        fn.withError = true;
        args.push(fn);
        this.emit(ev, ...args);
      });
    }
    /**
     * Add the packet to the queue.
     * @param args
     * @private
     */
    _addToQueue(args) {
      let ack;
      if (typeof args[args.length - 1] === "function") {
        ack = args.pop();
      }
      const packet = {
        id: this._queueSeq++,
        tryCount: 0,
        pending: false,
        args,
        flags: Object.assign({ fromQueue: true }, this.flags)
      };
      args.push((err, ...responseArgs) => {
        if (packet !== this._queue[0]) {
          return;
        }
        const hasError = err !== null;
        if (hasError) {
          if (packet.tryCount > this._opts.retries) {
            this._queue.shift();
            if (ack) {
              ack(err);
            }
          }
        } else {
          this._queue.shift();
          if (ack) {
            ack(null, ...responseArgs);
          }
        }
        packet.pending = false;
        return this._drainQueue();
      });
      this._queue.push(packet);
      this._drainQueue();
    }
    /**
     * Send the first packet of the queue, and wait for an acknowledgement from the server.
     * @param force - whether to resend a packet that has not been acknowledged yet
     *
     * @private
     */
    _drainQueue(force = false) {
      if (!this.connected || this._queue.length === 0) {
        return;
      }
      const packet = this._queue[0];
      if (packet.pending && !force) {
        return;
      }
      packet.pending = true;
      packet.tryCount++;
      this.flags = packet.flags;
      this.emit.apply(this, packet.args);
    }
    /**
     * Sends a packet.
     *
     * @param packet
     * @private
     */
    packet(packet) {
      packet.nsp = this.nsp;
      this.io._packet(packet);
    }
    /**
     * Called upon engine `open`.
     *
     * @private
     */
    onopen() {
      if (typeof this.auth == "function") {
        this.auth((data) => {
          this._sendConnectPacket(data);
        });
      } else {
        this._sendConnectPacket(this.auth);
      }
    }
    /**
     * Sends a CONNECT packet to initiate the Socket.IO session.
     *
     * @param data
     * @private
     */
    _sendConnectPacket(data) {
      this.packet({
        type: PacketType.CONNECT,
        data: this._pid ? Object.assign({ pid: this._pid, offset: this._lastOffset }, data) : data
      });
    }
    /**
     * Called upon engine or manager `error`.
     *
     * @param err
     * @private
     */
    onerror(err) {
      if (!this.connected) {
        this.emitReserved("connect_error", err);
      }
    }
    /**
     * Called upon engine `close`.
     *
     * @param reason
     * @param description
     * @private
     */
    onclose(reason, description) {
      this.connected = false;
      delete this.id;
      this.emitReserved("disconnect", reason, description);
      this._clearAcks();
    }
    /**
     * Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
     * the server.
     *
     * @private
     */
    _clearAcks() {
      Object.keys(this.acks).forEach((id) => {
        const isBuffered = this.sendBuffer.some((packet) => String(packet.id) === id);
        if (!isBuffered) {
          const ack = this.acks[id];
          delete this.acks[id];
          if (ack.withError) {
            ack.call(this, new Error("socket has been disconnected"));
          }
        }
      });
    }
    /**
     * Called with socket packet.
     *
     * @param packet
     * @private
     */
    onpacket(packet) {
      const sameNamespace = packet.nsp === this.nsp;
      if (!sameNamespace)
        return;
      switch (packet.type) {
        case PacketType.CONNECT:
          if (packet.data && packet.data.sid) {
            this.onconnect(packet.data.sid, packet.data.pid);
          } else {
            this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
          }
          break;
        case PacketType.EVENT:
        case PacketType.BINARY_EVENT:
          this.onevent(packet);
          break;
        case PacketType.ACK:
        case PacketType.BINARY_ACK:
          this.onack(packet);
          break;
        case PacketType.DISCONNECT:
          this.ondisconnect();
          break;
        case PacketType.CONNECT_ERROR:
          this.destroy();
          const err = new Error(packet.data.message);
          err.data = packet.data.data;
          this.emitReserved("connect_error", err);
          break;
      }
    }
    /**
     * Called upon a server event.
     *
     * @param packet
     * @private
     */
    onevent(packet) {
      const args = packet.data || [];
      if (null != packet.id) {
        args.push(this.ack(packet.id));
      }
      if (this.connected) {
        this.emitEvent(args);
      } else {
        this.receiveBuffer.push(Object.freeze(args));
      }
    }
    emitEvent(args) {
      if (this._anyListeners && this._anyListeners.length) {
        const listeners = this._anyListeners.slice();
        for (const listener of listeners) {
          listener.apply(this, args);
        }
      }
      super.emit.apply(this, args);
      if (this._pid && args.length && typeof args[args.length - 1] === "string") {
        this._lastOffset = args[args.length - 1];
      }
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @private
     */
    ack(id) {
      const self2 = this;
      let sent = false;
      return function(...args) {
        if (sent)
          return;
        sent = true;
        self2.packet({
          type: PacketType.ACK,
          id,
          data: args
        });
      };
    }
    /**
     * Called upon a server acknowledgement.
     *
     * @param packet
     * @private
     */
    onack(packet) {
      const ack = this.acks[packet.id];
      if (typeof ack !== "function") {
        return;
      }
      delete this.acks[packet.id];
      if (ack.withError) {
        packet.data.unshift(null);
      }
      ack.apply(this, packet.data);
    }
    /**
     * Called upon server connect.
     *
     * @private
     */
    onconnect(id, pid) {
      this.id = id;
      this.recovered = pid && this._pid === pid;
      this._pid = pid;
      this.connected = true;
      this.emitBuffered();
      this.emitReserved("connect");
      this._drainQueue(true);
    }
    /**
     * Emit buffered events (received and emitted).
     *
     * @private
     */
    emitBuffered() {
      this.receiveBuffer.forEach((args) => this.emitEvent(args));
      this.receiveBuffer = [];
      this.sendBuffer.forEach((packet) => {
        this.notifyOutgoingListeners(packet);
        this.packet(packet);
      });
      this.sendBuffer = [];
    }
    /**
     * Called upon server disconnect.
     *
     * @private
     */
    ondisconnect() {
      this.destroy();
      this.onclose("io server disconnect");
    }
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @private
     */
    destroy() {
      if (this.subs) {
        this.subs.forEach((subDestroy) => subDestroy());
        this.subs = void 0;
      }
      this.io["_destroy"](this);
    }
    /**
     * Disconnects the socket manually. In that case, the socket will not try to reconnect.
     *
     * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
     *
     * @example
     * const socket = io();
     *
     * socket.on("disconnect", (reason) => {
     *   // console.log(reason); prints "io client disconnect"
     * });
     *
     * socket.disconnect();
     *
     * @return self
     */
    disconnect() {
      if (this.connected) {
        this.packet({ type: PacketType.DISCONNECT });
      }
      this.destroy();
      if (this.connected) {
        this.onclose("io client disconnect");
      }
      return this;
    }
    /**
     * Alias for {@link disconnect()}.
     *
     * @return self
     */
    close() {
      return this.disconnect();
    }
    /**
     * Sets the compress flag.
     *
     * @example
     * socket.compress(false).emit("hello");
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     */
    compress(compress) {
      this.flags.compress = compress;
      return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
     * ready to send messages.
     *
     * @example
     * socket.volatile.emit("hello"); // the server may or may not receive it
     *
     * @returns self
     */
    get volatile() {
      this.flags.volatile = true;
      return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
     * given number of milliseconds have elapsed without an acknowledgement from the server:
     *
     * @example
     * socket.timeout(5000).emit("my-event", (err) => {
     *   if (err) {
     *     // the server did not acknowledge the event in the given delay
     *   }
     * });
     *
     * @returns self
     */
    timeout(timeout) {
      this.flags.timeout = timeout;
      return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @example
     * socket.onAny((event, ...args) => {
     *   console.log(`got ${event}`);
     * });
     *
     * @param listener
     */
    onAny(listener) {
      this._anyListeners = this._anyListeners || [];
      this._anyListeners.push(listener);
      return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @example
     * socket.prependAny((event, ...args) => {
     *   console.log(`got event ${event}`);
     * });
     *
     * @param listener
     */
    prependAny(listener) {
      this._anyListeners = this._anyListeners || [];
      this._anyListeners.unshift(listener);
      return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`got event ${event}`);
     * }
     *
     * socket.onAny(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAny(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAny();
     *
     * @param listener
     */
    offAny(listener) {
      if (!this._anyListeners) {
        return this;
      }
      if (listener) {
        const listeners = this._anyListeners;
        for (let i = 0; i < listeners.length; i++) {
          if (listener === listeners[i]) {
            listeners.splice(i, 1);
            return this;
          }
        }
      } else {
        this._anyListeners = [];
      }
      return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */
    listenersAny() {
      return this._anyListeners || [];
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.onAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */
    onAnyOutgoing(listener) {
      this._anyOutgoingListeners = this._anyOutgoingListeners || [];
      this._anyOutgoingListeners.push(listener);
      return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.prependAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */
    prependAnyOutgoing(listener) {
      this._anyOutgoingListeners = this._anyOutgoingListeners || [];
      this._anyOutgoingListeners.unshift(listener);
      return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`sent event ${event}`);
     * }
     *
     * socket.onAnyOutgoing(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAnyOutgoing(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAnyOutgoing();
     *
     * @param [listener] - the catch-all listener (optional)
     */
    offAnyOutgoing(listener) {
      if (!this._anyOutgoingListeners) {
        return this;
      }
      if (listener) {
        const listeners = this._anyOutgoingListeners;
        for (let i = 0; i < listeners.length; i++) {
          if (listener === listeners[i]) {
            listeners.splice(i, 1);
            return this;
          }
        }
      } else {
        this._anyOutgoingListeners = [];
      }
      return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */
    listenersAnyOutgoing() {
      return this._anyOutgoingListeners || [];
    }
    /**
     * Notify the listeners for each packet sent
     *
     * @param packet
     *
     * @private
     */
    notifyOutgoingListeners(packet) {
      if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
        const listeners = this._anyOutgoingListeners.slice();
        for (const listener of listeners) {
          listener.apply(this, packet.data);
        }
      }
    }
  };

  // node_modules/socket.io-client/build/esm/contrib/backo2.js
  function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 1e4;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
  }
  Backoff.prototype.duration = function() {
    var ms = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
      var rand = Math.random();
      var deviation = Math.floor(rand * this.jitter * ms);
      ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
    }
    return Math.min(ms, this.max) | 0;
  };
  Backoff.prototype.reset = function() {
    this.attempts = 0;
  };
  Backoff.prototype.setMin = function(min) {
    this.ms = min;
  };
  Backoff.prototype.setMax = function(max) {
    this.max = max;
  };
  Backoff.prototype.setJitter = function(jitter) {
    this.jitter = jitter;
  };

  // node_modules/socket.io-client/build/esm/manager.js
  var Manager = class extends Emitter {
    constructor(uri, opts) {
      var _a;
      super();
      this.nsps = {};
      this.subs = [];
      if (uri && "object" === typeof uri) {
        opts = uri;
        uri = void 0;
      }
      opts = opts || {};
      opts.path = opts.path || "/socket.io";
      this.opts = opts;
      installTimerFunctions(this, opts);
      this.reconnection(opts.reconnection !== false);
      this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
      this.reconnectionDelay(opts.reconnectionDelay || 1e3);
      this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
      this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
      this.backoff = new Backoff({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor()
      });
      this.timeout(null == opts.timeout ? 2e4 : opts.timeout);
      this._readyState = "closed";
      this.uri = uri;
      const _parser = opts.parser || esm_exports;
      this.encoder = new _parser.Encoder();
      this.decoder = new _parser.Decoder();
      this._autoConnect = opts.autoConnect !== false;
      if (this._autoConnect)
        this.open();
    }
    reconnection(v) {
      if (!arguments.length)
        return this._reconnection;
      this._reconnection = !!v;
      if (!v) {
        this.skipReconnect = true;
      }
      return this;
    }
    reconnectionAttempts(v) {
      if (v === void 0)
        return this._reconnectionAttempts;
      this._reconnectionAttempts = v;
      return this;
    }
    reconnectionDelay(v) {
      var _a;
      if (v === void 0)
        return this._reconnectionDelay;
      this._reconnectionDelay = v;
      (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
      return this;
    }
    randomizationFactor(v) {
      var _a;
      if (v === void 0)
        return this._randomizationFactor;
      this._randomizationFactor = v;
      (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
      return this;
    }
    reconnectionDelayMax(v) {
      var _a;
      if (v === void 0)
        return this._reconnectionDelayMax;
      this._reconnectionDelayMax = v;
      (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
      return this;
    }
    timeout(v) {
      if (!arguments.length)
        return this._timeout;
      this._timeout = v;
      return this;
    }
    /**
     * Starts trying to reconnect if reconnection is enabled and we have not
     * started reconnecting yet
     *
     * @private
     */
    maybeReconnectOnOpen() {
      if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
        this.reconnect();
      }
    }
    /**
     * Sets the current transport `socket`.
     *
     * @param {Function} fn - optional, callback
     * @return self
     * @public
     */
    open(fn) {
      if (~this._readyState.indexOf("open"))
        return this;
      this.engine = new Socket(this.uri, this.opts);
      const socket2 = this.engine;
      const self2 = this;
      this._readyState = "opening";
      this.skipReconnect = false;
      const openSubDestroy = on(socket2, "open", function() {
        self2.onopen();
        fn && fn();
      });
      const onError = (err) => {
        this.cleanup();
        this._readyState = "closed";
        this.emitReserved("error", err);
        if (fn) {
          fn(err);
        } else {
          this.maybeReconnectOnOpen();
        }
      };
      const errorSub = on(socket2, "error", onError);
      if (false !== this._timeout) {
        const timeout = this._timeout;
        const timer = this.setTimeoutFn(() => {
          openSubDestroy();
          onError(new Error("timeout"));
          socket2.close();
        }, timeout);
        if (this.opts.autoUnref) {
          timer.unref();
        }
        this.subs.push(() => {
          this.clearTimeoutFn(timer);
        });
      }
      this.subs.push(openSubDestroy);
      this.subs.push(errorSub);
      return this;
    }
    /**
     * Alias for open()
     *
     * @return self
     * @public
     */
    connect(fn) {
      return this.open(fn);
    }
    /**
     * Called upon transport open.
     *
     * @private
     */
    onopen() {
      this.cleanup();
      this._readyState = "open";
      this.emitReserved("open");
      const socket2 = this.engine;
      this.subs.push(
        on(socket2, "ping", this.onping.bind(this)),
        on(socket2, "data", this.ondata.bind(this)),
        on(socket2, "error", this.onerror.bind(this)),
        on(socket2, "close", this.onclose.bind(this)),
        // @ts-ignore
        on(this.decoder, "decoded", this.ondecoded.bind(this))
      );
    }
    /**
     * Called upon a ping.
     *
     * @private
     */
    onping() {
      this.emitReserved("ping");
    }
    /**
     * Called with data.
     *
     * @private
     */
    ondata(data) {
      try {
        this.decoder.add(data);
      } catch (e) {
        this.onclose("parse error", e);
      }
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */
    ondecoded(packet) {
      nextTick(() => {
        this.emitReserved("packet", packet);
      }, this.setTimeoutFn);
    }
    /**
     * Called upon socket error.
     *
     * @private
     */
    onerror(err) {
      this.emitReserved("error", err);
    }
    /**
     * Creates a new socket for the given `nsp`.
     *
     * @return {Socket}
     * @public
     */
    socket(nsp, opts) {
      let socket2 = this.nsps[nsp];
      if (!socket2) {
        socket2 = new Socket2(this, nsp, opts);
        this.nsps[nsp] = socket2;
      } else if (this._autoConnect && !socket2.active) {
        socket2.connect();
      }
      return socket2;
    }
    /**
     * Called upon a socket close.
     *
     * @param socket
     * @private
     */
    _destroy(socket2) {
      const nsps = Object.keys(this.nsps);
      for (const nsp of nsps) {
        const socket3 = this.nsps[nsp];
        if (socket3.active) {
          return;
        }
      }
      this._close();
    }
    /**
     * Writes a packet.
     *
     * @param packet
     * @private
     */
    _packet(packet) {
      const encodedPackets = this.encoder.encode(packet);
      for (let i = 0; i < encodedPackets.length; i++) {
        this.engine.write(encodedPackets[i], packet.options);
      }
    }
    /**
     * Clean up transport subscriptions and packet buffer.
     *
     * @private
     */
    cleanup() {
      this.subs.forEach((subDestroy) => subDestroy());
      this.subs.length = 0;
      this.decoder.destroy();
    }
    /**
     * Close the current socket.
     *
     * @private
     */
    _close() {
      this.skipReconnect = true;
      this._reconnecting = false;
      this.onclose("forced close");
    }
    /**
     * Alias for close()
     *
     * @private
     */
    disconnect() {
      return this._close();
    }
    /**
     * Called when:
     *
     * - the low-level engine is closed
     * - the parser encountered a badly formatted packet
     * - all sockets are disconnected
     *
     * @private
     */
    onclose(reason, description) {
      var _a;
      this.cleanup();
      (_a = this.engine) === null || _a === void 0 ? void 0 : _a.close();
      this.backoff.reset();
      this._readyState = "closed";
      this.emitReserved("close", reason, description);
      if (this._reconnection && !this.skipReconnect) {
        this.reconnect();
      }
    }
    /**
     * Attempt a reconnection.
     *
     * @private
     */
    reconnect() {
      if (this._reconnecting || this.skipReconnect)
        return this;
      const self2 = this;
      if (this.backoff.attempts >= this._reconnectionAttempts) {
        this.backoff.reset();
        this.emitReserved("reconnect_failed");
        this._reconnecting = false;
      } else {
        const delay = this.backoff.duration();
        this._reconnecting = true;
        const timer = this.setTimeoutFn(() => {
          if (self2.skipReconnect)
            return;
          this.emitReserved("reconnect_attempt", self2.backoff.attempts);
          if (self2.skipReconnect)
            return;
          self2.open((err) => {
            if (err) {
              self2._reconnecting = false;
              self2.reconnect();
              this.emitReserved("reconnect_error", err);
            } else {
              self2.onreconnect();
            }
          });
        }, delay);
        if (this.opts.autoUnref) {
          timer.unref();
        }
        this.subs.push(() => {
          this.clearTimeoutFn(timer);
        });
      }
    }
    /**
     * Called upon successful reconnect.
     *
     * @private
     */
    onreconnect() {
      const attempt = this.backoff.attempts;
      this._reconnecting = false;
      this.backoff.reset();
      this.emitReserved("reconnect", attempt);
    }
  };

  // node_modules/socket.io-client/build/esm/index.js
  var cache = {};
  function lookup2(uri, opts) {
    if (typeof uri === "object") {
      opts = uri;
      uri = void 0;
    }
    opts = opts || {};
    const parsed = url(uri, opts.path || "/socket.io");
    const source = parsed.source;
    const id = parsed.id;
    const path = parsed.path;
    const sameNamespace = cache[id] && path in cache[id]["nsps"];
    const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
    let io;
    if (newConnection) {
      io = new Manager(source, opts);
    } else {
      if (!cache[id]) {
        cache[id] = new Manager(source, opts);
      }
      io = cache[id];
    }
    if (parsed.query && !opts.query) {
      opts.query = parsed.queryKey;
    }
    return io.socket(parsed.path, opts);
  }
  Object.assign(lookup2, {
    Manager,
    Socket: Socket2,
    io: lookup2,
    connect: lookup2
  });

  // public/index.ts
  var mediasoupClient = __toESM(require_lib5());
  console.log("mediasoupClient:::::", mediasoupClient);
  var roomName = window.location.pathname.split("/")[2];
  var socket = lookup2("/");
  socket.on("connection-success", ({ socketId }) => {
    console.log(socketId);
    getLocalStream();
  });
  var device;
  var rtpCapabilities;
  var producerTransport;
  var consumerTransports = [];
  var audioProducer;
  var videoProducer;
  var params = {
    // mediasoup params
    encodings: [
      {
        rid: "r0",
        maxBitrate: 1e5,
        scalabilityMode: "S1T3"
      },
      {
        rid: "r1",
        maxBitrate: 3e5,
        scalabilityMode: "S1T3"
      },
      {
        rid: "r2",
        maxBitrate: 9e5,
        scalabilityMode: "S1T3"
      }
    ],
    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#ProducerCodecOptions
    codecOptions: {
      videoGoogleStartBitrate: 1e3
    }
  };
  var audioParams;
  var videoParams = { params };
  var consumingTransports = [];
  var localVideo;
  var videoContainer;
  var streamSuccess = (stream) => {
    localVideo = document.getElementById("localVideo");
    localVideo.srcObject = stream;
    audioParams = { track: stream.getAudioTracks()[0], ...audioParams };
    videoParams = { track: stream.getVideoTracks()[0], ...videoParams };
    joinRoom();
  };
  var joinRoom = () => {
    socket.emit("joinRoom", { roomName }, (data) => {
      console.log(`Router RTP Capabilities... ${data.rtpCapabilities}`, data);
      rtpCapabilities = data.rtpCapabilities;
      console.log(
        !data?.roomProducers,
        !Object.values(data?.roomProducers).length
      );
      createDevice(data);
    });
  };
  var getLocalStream = () => {
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: {
          min: 640,
          max: 1920
        },
        height: {
          min: 400,
          max: 1080
        }
      }
    }).then(streamSuccess).catch((error) => {
      console.log(error.message);
    });
  };
  var createDevice = async (data) => {
    try {
      console.log("mediasoupClient::::", mediasoupClient);
      device = new mediasoupClient.Device();
      await device.load({
        // see getRtpCapabilities() below
        routerRtpCapabilities: rtpCapabilities
      });
      console.log("Device RTP Capabilities", device.rtpCapabilities);
      if (!Object.values(data?.roomProducers).length) {
        createSendTransport();
      } else {
        console.log("mai consumer hu");
        signalNewConsumerTransport(data?.roomProducers?.videoProducer);
        signalNewConsumerTransport(data?.roomProducers?.audioProducer);
      }
    } catch (error) {
      console.log(error);
      if (error.name === "UnsupportedError")
        console.warn("browser not supported");
    }
  };
  var createSendTransport = () => {
    console.log("Enter in the create send tranport function");
    socket.emit("createWebRtcTransport", { consumer: false }, ({ params: params2 }) => {
      if (params2.error) {
        console.log(params2.error);
        return;
      }
      console.log(params2);
      producerTransport = device.createSendTransport(params2);
      producerTransport.on(
        "connect",
        async ({ dtlsParameters }, callback, errback) => {
          try {
            await socket.emit("transport-connect", {
              dtlsParameters
            });
            callback();
          } catch (error) {
            errback(error);
          }
        }
      );
      producerTransport.on("produce", async (parameters, callback, errback) => {
        console.log(parameters);
        try {
          await socket.emit(
            "transport-produce",
            {
              kind: parameters.kind,
              rtpParameters: parameters.rtpParameters
              // appData: parameters.appData,
            },
            ({ id, producersExist }) => {
              console.log("Aagya yaha pai");
              callback({ id });
              if (producersExist) getProducers();
            }
          );
        } catch (error) {
          errback(error);
        }
      });
      connectSendTransport();
    });
  };
  var connectSendTransport = async () => {
    audioProducer = await producerTransport.produce(audioParams);
    videoProducer = await producerTransport.produce(videoParams);
    audioProducer.on("trackended", () => {
      console.log("audio track ended");
    });
    audioProducer.on("transportclose", () => {
      console.log("audio transport ended");
    });
    videoProducer.on("trackended", () => {
      console.log("video track ended");
    });
    videoProducer.on("transportclose", () => {
      console.log("video transport ended");
    });
  };
  var signalNewConsumerTransport = async (remoteProducerId) => {
    if (consumingTransports.includes(remoteProducerId)) return;
    consumingTransports.push(remoteProducerId);
    await socket.emit(
      "createWebRtcTransport",
      { consumer: true },
      ({ params: params2 }) => {
        if (params2.error) {
          console.log(params2.error);
          return;
        }
        console.log(`PARAMS...`, params2);
        let consumerTransport;
        try {
          consumerTransport = device.createRecvTransport(params2);
        } catch (error) {
          console.log(error);
          return;
        }
        consumerTransport.on(
          "connect",
          async ({ dtlsParameters }, callback, errback) => {
            try {
              await socket.emit("transport-recv-connect", {
                dtlsParameters,
                serverConsumerTransportId: params2.id
              });
              callback();
            } catch (error) {
              errback(error);
            }
          }
        );
        connectRecvTransport(consumerTransport, remoteProducerId, params2.id);
      }
    );
  };
  socket.on(
    "new-producer",
    ({ producerId }) => signalNewConsumerTransport(producerId)
  );
  var getProducers = () => {
    socket.emit("getProducers", (producerIds) => {
      console.log(producerIds);
      producerIds.forEach(signalNewConsumerTransport);
    });
  };
  var connectRecvTransport = async (consumerTransport, remoteProducerId, serverConsumerTransportId) => {
    await socket.emit(
      "consume",
      {
        rtpCapabilities: device.rtpCapabilities,
        remoteProducerId,
        serverConsumerTransportId
      },
      async ({ params: params2 }) => {
        if (params2.error) {
          console.log("Cannot Consume");
          return;
        }
        console.log(`Consumer Params ${params2}`);
        const consumer = await consumerTransport.consume({
          id: params2.id,
          producerId: params2.producerId,
          kind: params2.kind,
          rtpParameters: params2.rtpParameters
        });
        consumerTransports = [
          ...consumerTransports,
          {
            consumerTransport,
            serverConsumerTransportId: params2.id,
            producerId: remoteProducerId,
            consumer
          }
        ];
        const newElem = document.createElement("div");
        newElem.setAttribute("id", `td-${remoteProducerId}`);
        if (params2.kind == "audio") {
          newElem.innerHTML = '<audio id="' + remoteProducerId + '" autoplay></audio>';
        } else {
          newElem.setAttribute("class", "remoteVideo");
          newElem.innerHTML = '<video id="' + remoteProducerId + '" autoplay class="video" ></video>';
        }
        videoContainer = document.getElementById("videoContainer");
        videoContainer.appendChild(newElem);
        const { track } = consumer;
        console.log("remoteProducerId::::", remoteProducerId);
        let obj = document.getElementById(remoteProducerId);
        obj.srcObject = new MediaStream([track]);
        socket.emit("consumer-resume", {
          serverConsumerId: params2.serverConsumerId
        });
      }
    );
  };
  socket.on("producer-closed", ({ remoteProducerId }) => {
    const producerToClose = consumerTransports.find(
      (transportData) => transportData.producerId === remoteProducerId
    );
    producerToClose.consumerTransport.close();
    producerToClose.consumer.close();
    consumerTransports = consumerTransports.filter(
      (transportData) => transportData.producerId !== remoteProducerId
    );
    videoContainer.removeChild(document.getElementById(`td-${remoteProducerId}`));
  });
})();

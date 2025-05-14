import { NextFunction, Request, Response } from "express";
import { SUCCESS, TryCatch, getFiles } from "../utils/helper";
import Events from "../model/events.model";
import moment from "moment";
import {
  CreateEventRequest,
  GetEventsRequest,
} from "../../types/API/Event/types";

const createEvent = TryCatch(
  async (
    req: Request<{}, {}, CreateEventRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req;
    const { title, topic, description, scheduledDate, type } = req.body;
    const files = getFiles(req, ["file"]);

    await Events.create({
      userId,
      title,
      topic,
      description,
      scheduledDate: moment.utc(scheduledDate).toDate(),
      type,
      file: files?.file[0],
    });

    return SUCCESS(res, 201, "Event created successfully");
  }
);

const getEvents = TryCatch(
  async (
    req: Request<{}, {}, {}, GetEventsRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req;
    let { page = 1, limit = process.env.LIMIT } = req.query;
    page = Number(page);
    limit = Number(limit);
    const skip = (page - 1) * limit;

    const total = await Events.countDocuments({ userId });
    const events = await Events.find({ userId, isDeleted: false })
      .select("-__v -updatedAt -isDeleted")
      .skip(skip)
      .limit(limit);

    return SUCCESS(res, 200, "Events fetched successfully", {
      data: { events, pagination: { total, page, limit } },
    });
  }
);

export default {
  createEvent,
  getEvents,
};

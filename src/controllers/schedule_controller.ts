import { PrismaClient } from "@prisma/client";
import { Express, RequestHandler } from "express";
import { RequestWithJWTBody } from "../dto/jwt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { controller } from "../lib/controller";

type CreateScheduleBody = {
  reptileId: number,
  userId: number,
  type: string,
  description: string,
  monday: boolean,
  tuesday: boolean,
  wednesday: boolean,
  thursday: boolean,
  friday: boolean,
  saturday: boolean,
  sunday: boolean

}

const createSchedule = (client: PrismaClient): RequestHandler =>
  async (req, res) => {
    const {reptileId, userId, type, description, monday, tuesday, wednesday, thursday, friday, saturday, sunday} = req.body as CreateScheduleBody;
    const schedule = await client.schedule.create({
      data: {
        reptileId,
        userId,
        type,
        description,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
      },
    });

    // find user & reptile?
  }


export const scheduleController = controller(
  "schedule",
  [
    { path: "/", method: "post", endpointBuilder: createSchedule, skipAuth: true }
  ]
)
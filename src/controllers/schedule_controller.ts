import { PrismaClient } from "@prisma/client";
import { Express, RequestHandler } from "express";
import { RequestWithJWTBody } from "../dto/jwt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { controller } from "../lib/controller";

type CreateScheduleBody = {
  reptileId: number,
  userId: number,
  type: "feed" | "record" | "clean",
  description: string,
  monday: boolean,
  tuesday: boolean,
  wednesday: boolean,
  thursday: boolean,
  friday: boolean,
  saturday: boolean,
  sunday: boolean
}

//TODO: 1) create a schedule 2) list all schedules for reptiles 3) list all schedules for users

const createSchedule = (client: PrismaClient): RequestHandler =>
  async (req, res) => {

    const {reptileId, userId, type, description, monday, tuesday, wednesday, thursday, friday, saturday, sunday} = req.body as CreateScheduleBody;
    if (type === "feed" || type === "record" || type === "clean") {

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
      res.json({schedule});
    } else {
      return res.status(400).json({message: "Invalid schedule type"})
    }
  }

const getAllReptileSchedules = (client: PrismaClient): RequestHandler =>
   async (req, res) => {
    const reptileId = req.params.reptileId;
     const data = await client.schedule.findMany({
      where: {
        reptileId: parseInt(reptileId)
      }
     });
     res.json({data});
   }

const getAllUserSchedules = (client: PrismaClient): RequestHandler =>
   async (req, res) => {
    const userId = req.params.userId;
    console.log("userID: " + userId)
     const data = await client.schedule.findMany({
      where: {
        userId: parseInt(userId)
      }
     });
     res.json({data});
   }

export const scheduleController = controller(
  "schedule",
  [
    { path: "/", method: "post", endpointBuilder: createSchedule, skipAuth: true },
    { path: "/user/:userId", method: "get", endpointBuilder: getAllUserSchedules, skipAuth: true },
    { path: "/reptile/:reptileId", method: "get", endpointBuilder: getAllReptileSchedules, skipAuth: true }
  ]
)
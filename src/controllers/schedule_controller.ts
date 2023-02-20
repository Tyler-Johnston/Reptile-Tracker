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
    res.json(schedule)
  }

  const getAllSchedules = (client: PrismaClient): RequestHandler =>
   async (req, res) => {
     const data = await client.schedule.findMany();
   
     res.json({data});
   }


export const scheduleController = controller(
  "schedule",
  [
    { path: "/", method: "post", endpointBuilder: createSchedule, skipAuth: true },
    { path: "/", method: "get", endpointBuilder: getAllSchedules, skipAuth: true }
  ]
)
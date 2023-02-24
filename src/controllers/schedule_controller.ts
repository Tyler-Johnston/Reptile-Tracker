import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { RequestWithSession } from "../dto/jwt";
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

const createSchedule = (client: PrismaClient): RequestHandler =>
  async (req: RequestWithSession, res) => {
    const {reptileId} = req.params;
    const {type, description, monday, tuesday, wednesday, thursday, friday, saturday, sunday} = req.body as CreateScheduleBody;

    if (!type || !description || monday === undefined || tuesday === undefined || wednesday === undefined || thursday === undefined || friday === undefined || saturday === undefined || sunday === undefined) {
      return res.status(400).json({message: "A type, description, and each day of the week is required"})
    }

    if (req.session) {
      if (type === "feed" || type === "record" || type === "clean") {

        const reptile = await client.reptile.findUnique({
          where: {
            id: parseInt(reptileId),
          },
          include: {
            schedules: true
          }
        });
  
        if (!reptile) {
          return res.status(404).json({ message: "Reptile not found" });
        }
  
        const schedule = await client.schedule.create({
          data: {
            reptileId: parseInt(reptileId),
            userId: req.user.id,
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
        reptile.schedules.push(schedule);
        res.json({schedule});
  
      } else {
        return res.status(400).json({message: "Invalid schedule type"})
      }

    } else {
      return res.status(400).json({message: "you are not signed in"});
    }
  }

const getAllReptileSchedules = (client: PrismaClient): RequestHandler =>
   async (req: RequestWithSession, res) => {
    const {reptileId} = req.params;

    if (req.session) {

      const reptile = await client.reptile.findFirst({
        where: {
          id: parseInt(reptileId),
          userId: req.user.id
        }
      })

      if (!reptile) {
        return res.status(404).json({message: "you are not authorized"})
      }

      const schedules = await client.schedule.findMany({
        where: {
          reptileId: parseInt(reptileId)
        }
        });
         res.json({schedules});
    } else {
      return res.status(400).json({message: "you are not signed in"});
    }
   }

const getAllUserSchedules = (client: PrismaClient): RequestHandler =>
   async (req: RequestWithSession, res) => {

    if (req.session) {
      const schedules = await client.schedule.findMany({
        where: {
          userId: req.user.id
        }
        });
         res.json({schedules});

    } else {
      return res.status(400).json({message: "you are not signed in"});
    }

   }

export const scheduleController = controller(
  "schedule",
  [
    { path: "/:reptileId", method: "post", endpointBuilder: createSchedule, skipAuth: false },
    { path: "/", method: "get", endpointBuilder: getAllUserSchedules, skipAuth: false },
    { path: "/:reptileId", method: "get", endpointBuilder: getAllReptileSchedules, skipAuth: false }
  ]
)
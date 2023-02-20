import { PrismaClient } from "@prisma/client";
import { Express, RequestHandler } from "express";
import { RequestWithJWTBody } from "../dto/jwt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { controller } from "../lib/controller";


type CreateFeedingBody = {
  reptileId: number,
  foodItem: string
}

// TODO: 1) create a feeding for a reptile 2) list all feedings for reptilesxxxx

const createFeeding = (client: PrismaClient): RequestHandler =>
  async (req, res) => {
    const {foodItem} = req.body as CreateFeedingBody;
    const {reptileId} = req.params;
    const feeding = await client.feeding.create({
      data: {
        reptileId:parseInt(reptileId),
        foodItem
      },
    });
    res.json({feeding});
  }
const getFeeding = (client: PrismaClient): RequestHandler =>
  async (req, res) => {
    const {reptileId} = req.params;

    const data = await client.feeding.findMany({
      where:{
        reptileId: parseInt(reptileId),
      }
    });

    res.json({data});
  }

export const feedingController = controller(
  "feeding",
  [
    { path: "/:reptileId", method: "post", endpointBuilder: createFeeding, skipAuth: true },
    { path: "/:reptileId", method: "get", endpointBuilder: getFeeding, skipAuth: true }
  ]
)
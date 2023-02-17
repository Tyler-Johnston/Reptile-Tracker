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

// TODO: 1) create a feeding for a reptile 2) list all feedings for reptiles

const createFeeding = (client: PrismaClient): RequestHandler =>
  async (req, res) => {
    const {reptileId, foodItem} = req.body as CreateFeedingBody;
    const feeding = await client.feeding.create({
      data: {
        reptileId,
        foodItem
      },
    });
  }


export const feedingController = controller(
  "feeding",
  [
    { path: "/", method: "post", endpointBuilder: createFeeding, skipAuth: true }
  ]
)
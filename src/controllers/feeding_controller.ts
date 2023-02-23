import { PrismaClient } from "@prisma/client";
import { Express, RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { controller } from "../lib/controller";
import { RequestWithJWTBody, RequestWithSession } from "../dto/jwt";


type CreateFeedingBody = {
  reptileId: number,
  foodItem: string
}

const createFeeding = (client: PrismaClient): RequestHandler =>
  async (req: RequestWithSession, res) => {

    const {foodItem} = req.body as CreateFeedingBody;
    const {reptileId} = req.params;

    if (req.session) {
      const user = await client.user.findUnique({
        where: { 
         id: req.user.id 
       },
         include: {
           reptiles: true,
         }
    });
    
      if (user) {
        
      } 
      else {
        res.status(404).json({message: "invalid user"});
      }
    }
    else {
      res.status(401).json({message: "you are not unauthorized"});
    }
  }

const getFeeding = (client: PrismaClient): RequestHandler =>
  async (req, res) => {
    //TODO Do we need to use the param or send a body
    //TODO USER SPECIFIC
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
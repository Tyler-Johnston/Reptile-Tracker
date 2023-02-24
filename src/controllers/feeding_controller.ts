import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
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

      if (!foodItem) {
       return res.status(400).json({message: "a food item is required"});
      }

      const reptile = await client.reptile.findUnique({
        where: {
          id: parseInt(reptileId),
        }
      });

      if (!reptile) {
        return res.status(404).json({ message: "Reptile not found" });
      }

      const feeding = await client.feeding.create({
        data: {
          foodItem,
          reptileId: parseInt(reptileId)
        }
      })

      res.json({ feeding })

    }
    else {
      res.status(401).json({message: "you are not authorized"});
    }
  }

const getFeeding = (client: PrismaClient): RequestHandler =>
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

      const feedings = await client.feeding.findMany({
        where: {
          reptileId: parseInt(reptileId)
        }
      })

      if (!feedings) {
        return res.status(404).json({ message: "Feedings not found" });
      }

      res.status(200).json({feedings});
    } else {
      res.status(401).json({message: "you are not signed in"});
    }
  }

export const feedingController = controller(
  "feeding",
  [
    { path: "/:reptileId", method: "post", endpointBuilder: createFeeding, skipAuth: false },
    { path: "/:reptileId", method: "get", endpointBuilder: getFeeding, skipAuth: false }
  ]
)
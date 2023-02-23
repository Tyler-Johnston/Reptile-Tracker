import { RequestHandler } from "express";
import { RequestWithJWTBody, JWTBody, RequestWithSession } from "../dto/jwt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const client = new PrismaClient();

export const authenticationMiddleware: RequestHandler = async (req: RequestWithSession, res, next) => {

  const sessionToken = req.cookies["session-token"];
  if (sessionToken) {
    const session = await client.session.findFirst({
      where: {
        token: sessionToken
      },
      include: {
        user: true
      }
    });
    if (session) {
      req.session = session;
      req.user = session.user;
    }
  }
  next();
}
import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { controller } from "../lib/controller";
import { RequestWithSession } from "../dto/jwt";

const createPlayLog = (client: PrismaClient): RequestHandler =>
  async (req: RequestWithSession, res) => {
    const { recordId } = req.params;
    const { notes, playedAt } = req.body as { notes?: string; playedAt?: string };

    const record = await client.vinylRecord.findFirst({
      where: { id: parseInt(recordId), userId: req.user.id },
    });

    if (!record) return res.status(404).json({ message: "Record not found or not authorized" });

    const playLog = await client.playLog.create({
      data: {
        vinylRecordId: parseInt(recordId),
        notes,
        ...(playedAt ? { playedAt: new Date(playedAt) } : {}),
      },
    });

    res.json({ playLog });
  };

const getPlayLogs = (client: PrismaClient): RequestHandler =>
  async (req: RequestWithSession, res) => {
    const { recordId } = req.params;

    const record = await client.vinylRecord.findFirst({
      where: { id: parseInt(recordId), userId: req.user.id },
    });

    if (!record) return res.status(404).json({ message: "Record not found or not authorized" });

    const playLogs = await client.playLog.findMany({
      where: { vinylRecordId: parseInt(recordId) },
      orderBy: { playedAt: "desc" },
    });

    res.json({ playLogs });
  };

export const playLogController = controller("play-log", [
  { path: "/:recordId", method: "post", endpointBuilder: createPlayLog, skipAuth: false },
  { path: "/:recordId", method: "get", endpointBuilder: getPlayLogs, skipAuth: false },
]);

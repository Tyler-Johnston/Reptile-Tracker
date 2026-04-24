import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { RequestWithSession } from "../dto/jwt";
import { controller } from "../lib/controller";

const GOLDMINE_GRADES = ["MINT", "NEAR_MINT", "VERY_GOOD_PLUS", "VERY_GOOD", "GOOD_PLUS", "GOOD", "FAIR", "POOR"];
const RECORD_STATUSES = ["OWNED", "WANTED"];

type RecordBody = {
  artist: string;
  title: string;
  year?: number;
  label?: string;
  genre?: string;
  pressingCountry?: string;
  coverArtUrl?: string;
  mediaGrade: string;
  sleeveGrade: string;
  status?: string;
  isCleaned?: boolean;
  hasAntiStaticSleeve?: boolean;
};

const createRecord = (client: PrismaClient): RequestHandler =>
  async (req: RequestWithSession, res) => {
    const {
      artist, title, year, label, genre, pressingCountry,
      coverArtUrl, mediaGrade, sleeveGrade, status = "OWNED",
      isCleaned = false, hasAntiStaticSleeve = false,
    } = req.body as RecordBody;

    if (!artist || !title || !mediaGrade || !sleeveGrade) {
      return res.status(400).json({ message: "artist, title, mediaGrade, and sleeveGrade are required" });
    }
    if (!GOLDMINE_GRADES.includes(mediaGrade) || !GOLDMINE_GRADES.includes(sleeveGrade)) {
      return res.status(400).json({ message: `mediaGrade and sleeveGrade must be one of: ${GOLDMINE_GRADES.join(", ")}` });
    }
    if (!RECORD_STATUSES.includes(status)) {
      return res.status(400).json({ message: "status must be OWNED or WANTED" });
    }

    const record = await client.vinylRecord.create({
      data: {
        userId: req.user.id,
        artist, title, year, label, genre, pressingCountry,
        coverArtUrl, mediaGrade, sleeveGrade, status,
        isCleaned, hasAntiStaticSleeve,
      },
    });

    res.json({ record });
  };

const getAllRecords = (client: PrismaClient): RequestHandler =>
  async (req: RequestWithSession, res) => {
    const records = await client.vinylRecord.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });
    res.json({ records });
  };

const getRecord = (client: PrismaClient): RequestHandler =>
  async (req: RequestWithSession, res) => {
    const { recordId } = req.params;
    const record = await client.vinylRecord.findFirst({
      where: { id: parseInt(recordId), userId: req.user.id },
    });
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json({ record });
  };

const updateRecord = (client: PrismaClient): RequestHandler =>
  async (req: RequestWithSession, res) => {
    const { recordId } = req.params;
    const body = req.body as Partial<RecordBody>;

    if (body.mediaGrade && !GOLDMINE_GRADES.includes(body.mediaGrade)) {
      return res.status(400).json({ message: `mediaGrade must be one of: ${GOLDMINE_GRADES.join(", ")}` });
    }
    if (body.sleeveGrade && !GOLDMINE_GRADES.includes(body.sleeveGrade)) {
      return res.status(400).json({ message: `sleeveGrade must be one of: ${GOLDMINE_GRADES.join(", ")}` });
    }
    if (body.status && !RECORD_STATUSES.includes(body.status)) {
      return res.status(400).json({ message: "status must be OWNED or WANTED" });
    }

    const existing = await client.vinylRecord.findUnique({ where: { id: parseInt(recordId) } });
    if (!existing) return res.status(404).json({ message: "Record not found" });
    if (existing.userId !== req.user.id) return res.status(401).json({ message: "Not authorized" });

    const record = await client.vinylRecord.update({
      where: { id: parseInt(recordId) },
      data: body,
    });

    res.json({ record });
  };

const deleteRecord = (client: PrismaClient): RequestHandler =>
  async (req: RequestWithSession, res) => {
    const { recordId } = req.params;

    const existing = await client.vinylRecord.findUnique({ where: { id: parseInt(recordId) } });
    if (!existing) return res.status(404).json({ message: "Record not found" });
    if (existing.userId !== req.user.id) return res.status(401).json({ message: "Not authorized" });

    const record = await client.vinylRecord.delete({ where: { id: parseInt(recordId) } });
    res.json({ record });
  };

export const recordsController = controller("records", [
  { path: "/", method: "post", endpointBuilder: createRecord, skipAuth: false },
  { path: "/", method: "get", endpointBuilder: getAllRecords, skipAuth: false },
  { path: "/:recordId", method: "get", endpointBuilder: getRecord, skipAuth: false },
  { path: "/:recordId", method: "put", endpointBuilder: updateRecord, skipAuth: false },
  { path: "/:recordId", method: "delete", endpointBuilder: deleteRecord, skipAuth: false },
]);

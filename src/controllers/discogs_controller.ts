import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { controller } from "../lib/controller";

const searchDiscogs = (_client: PrismaClient): RequestHandler =>
  async (req, res) => {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
      return res.status(400).json({ message: "q query parameter is required" });
    }

    const token = process.env.DISCOGS_TOKEN;
    if (!token) {
      return res.status(500).json({ message: "Discogs API not configured" });
    }

    const url = `https://api.discogs.com/database/search?q=${encodeURIComponent(q)}&type=release&token=${token}`;

    const response = await fetch(url, {
      headers: { "User-Agent": "VinylTracker/1.0" },
    });

    if (!response.ok) {
      return res.status(response.status).json({ message: "Discogs API error" });
    }

    const data = await response.json() as any;

    const results = (data.results ?? []).slice(0, 20).map((item: any) => ({
      discogsId: item.id,
      title: item.title,
      year: item.year ?? null,
      label: item.label?.[0] ?? null,
      genre: item.genre?.[0] ?? null,
      country: item.country ?? null,
      coverImage: item.cover_image ?? null,
      thumb: item.thumb ?? null,
      format: item.format?.[0] ?? null,
    }));

    res.json({ results });
  };

export const discogsController = controller("discogs", [
  { path: "/search", method: "get", endpointBuilder: searchDiscogs, skipAuth: false },
]);

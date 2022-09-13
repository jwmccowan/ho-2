import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (typeof id !== "string") {
    res.status(500).json("id is wonky");
    return;
  }
  if (req.method === "DELETE") {
    try {
      await prisma.user.delete({ where: { id } });
      res.status(204).json({});
    } catch (error) {
      res.status(400).json("Could not delete");
    }
  }
}

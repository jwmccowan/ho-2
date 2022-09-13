import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email } = JSON.parse(req.body);
      const newUser = await prisma.user.create({
        data: { email },
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

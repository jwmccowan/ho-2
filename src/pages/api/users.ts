import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, name } = JSON.parse(req.body);
      const newUser = await prisma.user.create({
        data: { email, name },
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json(error);
    }
  } else if (req.method === "GET") {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const trainers = await prisma.user.findMany();
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

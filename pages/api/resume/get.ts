// pages/api/resume/get.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { userId } = req.query;

        try {
            const resume = await prisma.resume.findUnique({
                where: { userId: String(userId) },
            });
            res.status(200).json(resume);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to retrieve resume data' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

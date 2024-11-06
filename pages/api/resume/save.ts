// pages/api/resume/save.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { userId, templateType, colorTheme, sections } = req.body;

        try {
            const resume = await prisma.resume.upsert({
                where: { userId },
                update: { templateType, colorTheme, sections },
                create: { userId, templateType, colorTheme, sections },
            });
            res.status(200).json(resume);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to save resume data' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

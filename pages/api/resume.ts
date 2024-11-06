// pages/api/resume.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { userId, templateType, sections } = req.body;
        const resume = await prisma.resume.create({
            data: { userId, templateType, sections },
        });
        res.status(200).json(resume);
    } else if (req.method === 'GET') {
        const resumes = await prisma.resume.findMany();
        res.status(200).json(resumes);
    }
}

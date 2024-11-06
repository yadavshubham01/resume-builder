
import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { resumeId } = req.query;

    // Retrieve resume data from database
    const resumeData = await prisma.resume.findUnique({ where: { id: Number(resumeId) } });
    if (!resumeData) {
        return res.status(404).json({ error: 'Resume not found' });
    }

    // Generate PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent('<html>Render your resume here</html>'); // Customize the HTML based on resumeData
    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
}

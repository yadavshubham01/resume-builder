// pages/api/resume/pdf.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { templateType, colorTheme, sections } = req.body;

        try {
            // Launch Puppeteer browser
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            // Set the HTML content to render the resume (create a function to generate HTML)
            await page.setContent(generateResumeHTML({ templateType, colorTheme, sections }));

            // Generate the PDF
            const pdfBuffer = await page.pdf({ format: 'A4' });

            // Close the browser
            await browser.close();

            // Set response headers for file download
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
            res.send(pdfBuffer);
        } catch (error) {
            console.error('PDF generation error:', error);
            res.status(500).json({ error: 'Failed to generate PDF' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

// Helper function to generate HTML content for resume
function generateResumeHTML({ templateType, colorTheme, sections }: any) {
    // Create HTML with inline styles based on the resume data
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body { font-family: Arial, sans-serif; color: ${colorTheme}; }
                h1 { font-size: 24px; }
                .section { margin: 20px 0; }
            </style>
            <title>Resume</title>
        </head>
        <body>
            <h1>${templateType} Resume</h1>
            ${sections.map((section: any) => `
                <div class="section">
                    <h2>${section.title}</h2>
                    <p>${section.content}</p>
                </div>
            `).join('')}
        </body>
        </html>
    `;
}

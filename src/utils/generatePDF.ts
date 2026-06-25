import puppeteer from "puppeteer";
import path from "path";
import ejs from "ejs";
import fs from "fs";

interface IPDFData {
  customerName: string;
  phoneNo: string;
  soldPrice: number;
  soldAt: string;
  paymentType: string | undefined;
  notes: string;
  invoiceNo: string;
  remainingAmount?: number;
  receivedAmount?: number;
  paymentStatus: string;
  brand?: string;
  model?: string;
  imei1?: string;
  imei2?: string;
  variant?: string;
  color?: string;
}

export const generatePDF = async (
  templateName: string,
  data: IPDFData,
  fileName: string,
): Promise<string | null> => {
  let browser = null;
  try {
    // Ensure PDF directory exists
    const pdfDir = path.join(process.cwd(), "src/public/uploads/pdfs");
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }

    const templatePath = path.join(
      process.cwd(),
      "src/templates",
      `${templateName}.ejs`,
    );

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template not found at ${templatePath}`);
    }

    // Render EJS template with data
    const html = await ejs.renderFile(templatePath, data);

    // Launch Puppeteer browser with optimized settings
    browser = await puppeteer.launch({
      headless: true,
      executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    console.log("Launching Chrome at system path...");
    const page = await browser.newPage();

    // Set content with shorter timeout and fallback
    try {
      await page.setContent(html, {
        waitUntil: "domcontentloaded",
        timeout: 15000,
      });
    } catch (contentError) {
      console.warn(
        "Content load timeout, proceeding with partial render:",
        contentError.message,
      );
      // Continue anyway - some content may have loaded
    }

    const pdfPath = path.join(pdfDir, `${fileName}.pdf`);

    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
      timeout: 30000,
    });

    await page.close();
    console.log(`PDF generated successfully at ${pdfPath}`);
    return `${fileName}.pdf`;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return null; // Return null instead of throwing
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error("Error closing browser:", closeError);
      }
    }
  }
};

// services/pdf.service.ts
import path from "path";
import fs from "fs";

export const getPdfPathService = async (fileName: string) => {
  const cleanName = fileName.replace(".pdf", "");

  const filePath = path.join(
    process.cwd(),
    "src/public/uploads/pdfs",
    `${cleanName}.pdf`
  );

  if (!fs.existsSync(filePath)) {
    throw new Error("PDF file not found");
  }

  return filePath;
};
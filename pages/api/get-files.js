import { extractInvoiceInfo } from "@/utils/apiHelper";
import PDFParser from "pdf2json";
import axios from "axios";

let details = {
  invoiceNumber: "",
  subTotal: "",
  total: "",
  ipt: "",
  vat: "",
  totalPaid: "",
  totalDue: "",
  freight: "",
  otherCharges: "",
  reference: "",
  vatTotal: "",
  deliveryCharge: "",
  net: ""
};

function readPDF(pdfPath, templateType) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser(null, 1);
    let pageCount = 0;

    pdfParser.on("pdfParser_dataError", errData => {
      reject(errData.parserError);
    });

    pdfParser.on("pdfParser_dataReady", pdfData => {
      const numberOfPages = pdfData.Pages.length;

      if (numberOfPages === pageCount) {
        resolve(details);
      }
    });

    pdfParser.on("data", page => {
      if (page) {
        pageCount++;
      }

      const texts = page.Texts;
      let finalText = "";

      for (let text of texts) {
        finalText += `${text.R[0].T} `;
      }

      try {
        // finalText = decodeURIComponent(
        //   finalText.replace(/%([0-9A-F]{2})/g, (_, p1) =>
        //     String.fromCharCode(parseInt(p1, 16))
        //   )
        // );
        finalText = decodeURIComponent(
          finalText.replace(/%([0-9A-F]{2})/g, (_, p1) =>
            String.fromCharCode(parseInt(p1, 16))
          )
        );
      } catch (err) {
        try {
          finalText = decodeURIComponent(finalText);
        } catch (err) {
          console.error(
            "Error decoding URI component in another try:",
            err.message
          );
          return;
        }
      }

      details = extractInvoiceInfo(finalText, templateType, details);
    });

    pdfParser.parseBuffer(pdfPath);
  });
}

async function getPdfFromUrl(url) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching PDF from URL: ${error.message}`);
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let uploadedFile = req.body.filePath;
      let templateType = req.body.templateType;

      if (!uploadedFile) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const pdfBuffer = await getPdfFromUrl(uploadedFile);

      const responseData = await readPDF(pdfBuffer, templateType);

      res.status(200).json({
        message: "PDF read was successful",
        success: true,
        code: 200,
        data: responseData
      });
      res.end();
    } catch (err) {
      if (err.response) {
        res.status(err.response.status).json({
          message: "Error reading PDF file",
          success: false,
          code: 500,
          data: err.response
        });

        res.end();
      }
    }
  } else {
    res.status(405);
    res.end();
  }
}

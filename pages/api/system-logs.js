import fs from "fs";
import path from "path";

// Make sure you are resolving the log path relative to the root of the project
const logFilePath = path.resolve(
  process.cwd(),
  "logs/middleware-errors-log.txt"
);

// Ensure the logs directory exists, if not create it
if (!fs.existsSync(path.dirname(logFilePath))) {
  fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

function appendToLogFile(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage, "utf8");
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      appendToLogFile(`Received request body: ${JSON.stringify(req.body)}`);

      // Your business logic

      res.status(200).json({ success: true });
    } catch (err) {
      // Log the error with details
      appendToLogFile(
        `Error processing request: ${err.message}. Stack: ${err.stack}`
      );

      // Respond with the error
      res.status(err.response?.status || 500).json({
        error: "An error occurred",
        details: err.message
      });
    }
  } else {
    const errorMessage = `Unsupported method: ${req.method}`;
    appendToLogFile(errorMessage);

    res.status(405).json({ error: errorMessage });
  }
}

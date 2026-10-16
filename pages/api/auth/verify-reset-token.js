import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await axios.post(
        `${process.env.API_URL}/verify-reset-token`,
        req.body
      );
      return res.status(response.status).json(response.data);
    } catch (e) {
      return res.status(500).json({
        status: false,
        message:
          e?.response?.data?.message || e.message || "Something went wrong"
      });
    }
  } else {
    return res.status(405).json({
      status: false,
      message: "Method not allowed"
    });
  }
}

import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions);
      const {
        user: { token }
      } = session;

      const response = await axios.post(
        `${process.env.API_URL}/auth/change-password`,
        req.body,
        {
          headers: {
            Authorization: token
          }
        }
      );

      res.status(response.status).json(response.data);
    } catch (err) {
      if (err.response) {
        res.status(err.response.status).json({
          status: false,
          message: err.response.data?.message || "Password change failed",
          data: err.response.data?.data || {}
        });
      } else {
        console.error("Unexpected Error in change-password:", err);
        res.status(500).json({
          status: false,
          message: "Internal Server Error"
        });
      }
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

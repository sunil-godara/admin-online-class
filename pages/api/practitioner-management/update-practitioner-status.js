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
        `${process.env.API_URL}/practitioners/status`,
        req.body,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          }
        }
      );

      res.status(response.status).json(response.data);
    } catch (err) {
      if (err.response) {
        res.status(err.response.status).json(err.response.data);
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

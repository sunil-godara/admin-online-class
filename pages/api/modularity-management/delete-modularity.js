import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user || !session.user.token) {
      console.error("[delete-user] No valid session/token");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { token } = session.user;

    const response = await axios.post(
      `${process.env.API_URL}/modality/delete`,
      req.body,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      }
    );

    return res.status(200).json(response.data);
  } catch (err) {
    console.error("[delete] Error:", err);

    if (err.response) {
      return res.status(err.response.status).json({
        message: err.response.data?.message || "Delete failed",
        error: err.response.data || null
      });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
}

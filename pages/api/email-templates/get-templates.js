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
        `${process.env.API_URL}/get-all-email-template`,
        req.body,
        {
          headers: {
            Authorization: token
          }
        }
      );
      res.status(response.status).json(response.data);
      res.end();
    } catch (err) {
      console.log("err", err);
      if (err.response) {
        res.status(err.response.status).json(err.response);
        res.end();
      }
    }
  } else {
    res.status(405);
    res.end();
  }
}

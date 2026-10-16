import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import axios from "axios";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "40mb" // Set desired value here
    }
  }
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions);
      const {
        user: { token }
      } = session;

      const response = await axios.post(
        `${process.env.API_URL}/user-sample-csv`,
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
      if (err.response) {
        res.status(err.response.status).json(err.response);
        res.end();
      }

      res.status(200).json({
        status: false,
        code: 200,
        message: "something went wrong",
        data: {}
      });
    }
  } else {
    res.status(405);
    res.end();
  }
}

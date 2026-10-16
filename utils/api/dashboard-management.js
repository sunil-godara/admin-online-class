import axios from "axios";

export const getOperationalList = async body => {
  try {
    const response = await axios.post(
      "/api/dashboard/get-operational-list",
      body
    );
    return response.data;
  } catch (e) {
    return {
      status: false,
      code: 200,
      data: {},
      message: e.message
    };
  }
};

export const getSupportCount = async body => {
  try {
    const response = await axios.post("/api/dashboard/get-support-count", body);
    return response.data;
  } catch (e) {
    return {
      status: false,
      code: 200,
      data: {},
      message: e.message
    };
  }
};

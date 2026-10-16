import axios from "axios";

export const forgotPassword = async body => {
  try {
    const response = await axios.post("/api/auth/forgot-password", body);
    return response.data;
  } catch (e) {
    return {
      status: false,
      message: e?.response?.data?.message || e.message || "Something went wrong"
    };
  }
};

export const resetPassword = async body => {
  try {
    const response = await axios.post("/api/auth/reset-password", body);
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

export const verifyResetToken = async body => {
  try {
    const response = await axios.post("/api/auth/verify-reset-token", body);
    return response.data;
  } catch (e) {
    return {
      status: false,
      message: e?.response?.data?.message || e.message || "Something went wrong"
    };
  }
};

import axios from "axios";

export const verifyUser = async params => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/check-token-validity`,
      {
        token: params.token
      }
    );

    return response.data;
  } catch (e) {
    if (e.response) {
      return e.response.data;
    }

    return {
      status: false,
      code: 200,
      data: {},
      message: e.message
    };
  }
};

export const logoutUser = async params => {
  try {
    const response = await axios.post(`/api/auth/logout`, params);

    return response.data;
  } catch (e) {
    if (e.response) {
      return e.response.data;
    }

    return {
      status: false,
      code: 200,
      data: {},
      message: e.message
    };
  }
};

export const changePassword = async body => {
  try {
    const response = await axios.post("/api/auth/change-password", body);
    return response.data;
  } catch (e) {
    return {
      status: false,
      code: e.response?.status || 500,
      data: e.response?.data?.data || {},
      message: e.response?.data?.message || "Something went wrong"
    };
  }
};

export const updateProfile = async body => {
  try {
    const response = await axios.post("/api/auth/update-profile", body);
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

export const getSiteSettings = async token => {
  try {
    const response = await axios.get(`${process.env.API_URL}/setting/list`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      }
    });

    return response.data;
  } catch (e) {
    if (e.response) {
      return e.response.data;
    }

    return {
      status: false,
      code: 200,
      data: {},
      message: e.message
    };
  }
};

export const getAuthData = async token => {
  try {
    const response = await axios.get(`${process.env.API_URL}/auth/me`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      }
    });

    return response.data;
  } catch (e) {
    if (e.response) {
      return e.response.data;
    }

    return {
      status: false,
      code: 200,
      data: {},
      message: e.message
    };
  }
};

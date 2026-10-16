import axios from "axios";

export const getAllSettings = async token => {
  try {
    const response = await axios.get(`${process.env.API_URL}/setting/list`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      }
    });

    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (e) {
    return [];
  }
};

export const editSetting = async body => {
  try {
    const response = await axios.post("/api/site-setting/edit-setting", body);
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

export const getSettingDetail = async (id, token) => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/setting/detail`,
      {
        id: id
      },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      return {};
    }
  } catch (e) {
    return {
      status: false,
      code: e?.response?.status || 500,
      data: e?.response?.data || {},
      message: e?.response?.data?.message || e.message || "Request failed"
    };
  }
};

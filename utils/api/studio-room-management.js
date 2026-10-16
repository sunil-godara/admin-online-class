import axios from "axios";

export const getStudioRoomDetail = async (id, token) => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/studio-room/detail`,
      {
        roomId: id
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
      code: 200,
      data: {},
      message: e.message
    };
  }
};

export const getStudioRoomList = async token => {
  try {
    const response = await axios.get(`${process.env.API_URL}/studio-room`, {
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

export const deleteStudioRoom = async body => {
  try {
    const response = await axios.post(
      "/api/practitioner-management/delete-studio-room",
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

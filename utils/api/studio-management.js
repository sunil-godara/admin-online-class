import axios from "axios";

export const getPractitionerStudioDetail = async (id, token) => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/studio/detail`,
      {
        studioId: id
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

export const getPractitionerStudioList = async token => {
  try {
    const response = await axios.get(`${process.env.API_URL}/studio`, {
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

export const deletePractitionerStudio = async body => {
  try {
    const response = await axios.post(
      "/api/practitioner-management/delete-practitioner-studio",
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

export const updateStudioApprovalStatus = async body => {
  try {
    const response = await axios.post(
      "/api/practitioner-management/update-studio-approval-status",
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

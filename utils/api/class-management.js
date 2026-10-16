import axios from "axios";

export const getClassesDetail = async (id, token) => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/class/detail`,
      {
        classId: id
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

export const getPractitionerClassesList = async token => {
  try {
    const response = await axios.get(`${process.env.API_URL}/class`, {
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

export const deletePractitionerClass = async body => {
  try {
    const response = await axios.post(
      "/api/practitioner-management/delete-practitioner-class",
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

export const updateClassApprovalStatus = async body => {
  try {
    const response = await axios.post(
      "/api/practitioner-management/update-class-approval-status",
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

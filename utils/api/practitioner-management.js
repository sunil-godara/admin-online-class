import axios from "axios";

export const updatePractitionerStatus = async body => {
  try {
    const response = await axios.post(
      "/api/practitioner-management/update-practitioner-status",
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

export const deletePractitioner = async body => {
  try {
    const response = await axios.post(
      "/api/practitioner-management/delete-practitioner",
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

export const getPractitionerDetail = async (id, token) => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/practitioners/detail`,
      {
        userId: id
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

export const getPractitionerList = async token => {
  try {
    const response = await axios.get(`${process.env.API_URL}/practitioners`, {
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

export const updatePractitionerApprovalStatus = async body => {
  try {
    const response = await axios.post(
      "/api/practitioner-management/update-practitioner-approval-status",
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

export const updatePractitionerCommission = async body => {
  try {
    const response = await axios.post(
      "/api/practitioner-management/update-practitioner-commission",
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

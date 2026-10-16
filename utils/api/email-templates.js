import axios from "axios";

export const getAllTemplates = async body => {
  try {
    const response = await axios.post(
      "/api/email-templates/get-templates",
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

export const addTemplates = async body => {
  try {
    const response = await axios.post(
      "/api/email-templates/add-templates",
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

export const editTemplates = async body => {
  try {
    const response = await axios.post(
      "/api/email-templates/edit-templates",
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

export const getEmailTemplateDetail = async (id, token) => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/get-email-template`,
      {
        id
      },
      {
        headers: {
          Authorization: token
        }
      }
    );

    if (response.status === 200) {
      return response.data.data;
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

export const updateTemplateStatus = async body => {
  try {
    const response = await axios.post(
      "/api/email-templates/update-template-status",
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

import axios from "axios";

export const getAllContents = async token => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/legal-content/list`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      }
    );
    return response.data;
  } catch (e) {
    console.log("error inside", e);

    return {
      status: false,
      code: 200,
      data: [],
      message: e.message
    };
  }
};

export const addContent = async body => {
  try {
    const response = await axios.post(
      "/api/content-management/add-content",
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

export const editContent = async body => {
  try {
    const response = await axios.post(
      "/api/content-management/edit-content",
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

export const getContentDetail = async (id, token) => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/legal-content/detail`,
      {
        id: id
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

export const updateContentStatus = async body => {
  try {
    const response = await axios.post(
      "/api/content-management/update-content-status",
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

export const deleteContent = async body => {
  try {
    const response = await axios.post(
      "/api/content-management/delete-content",
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

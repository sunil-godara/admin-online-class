import axios from "axios";

export const updateModularityStatus = async body => {
  try {
    const response = await axios.post(
      "/api/modularity-management/update-modularity-status",
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

export const addModality = async body => {
  try {
    const response = await axios.post(
      "/api/modularity-management/add-modality",
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

export const editModality = async body => {
  try {
    const response = await axios.post(
      "/api/modularity-management/edit-modality",
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

export const deleteModularity = async body => {
  try {
    const response = await axios.post(
      "/api/modularity-management/delete-modularity",
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

export const getModularityDetail = async (id, token) => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/modality/detail`,
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
      code: 200,
      data: {},
      message: e.message
    };
  }
};

export const getModularityList = async token => {
  try {
    const response = await axios.get(`${process.env.API_URL}/modality`, {
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

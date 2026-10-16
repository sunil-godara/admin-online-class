import axios from "axios";

export const getModuleList = async token => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/get-all-modules`,
      {},
      {
        headers: {
          Authorization: token
        }
      }
    );

    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (e) {
    return [];
  }
};

export const getAllUsers = async body => {
  try {
    const response = await axios.post("/api/user-management/get-users", body);
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

export const addUsers = async body => {
  try {
    const response = await axios.post("/api/user-management/add-user", body);
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

export const editUsers = async body => {
  try {
    const response = await axios.post("/api/user-management/edit-user", body);
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

export const getUsersDetail = async (id, token) => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/users/detail`,
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

export const updateUserStatus = async body => {
  try {
    const response = await axios.post(
      "/api/user-management/update-user-status",
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

export const deleteUser = async body => {
  try {
    const response = await axios.post("/api/user-management/delete-user", body);
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

export const getUserList = async token => {
  try {
    const response = await axios.get(`${process.env.API_URL}/users`, {
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

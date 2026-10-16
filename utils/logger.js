export const logger = async body => {
  try {
    const response = await fetch(`${process.env.APP_URL}/api/system-logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Logger error:", error.message);
    return {
      status: false,
      code: error.response?.status || 500,
      data: {},
      message: error.message
    };
  }
};

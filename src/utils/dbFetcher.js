var apiUri = process.env.REACT_APP_API_URI;

const getAuthData = (type) => {
    const requestData = {
      method: type,
      headers: { Authorization: `No Auth` },
    };
    return requestData;
};

const contentAuthData = (type, body) => {
  const requestData = {
    method: type,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (body) requestData["body"] = JSON.stringify(body);
  return requestData;
};

async function getResponseData(response, data) {
    const { status } = response;
    if (status >= 200 && status < 300) {
      return data;
    }
    return Promise.reject(data);
};

export async function dbGet(category) {
    const requestData = getAuthData("GET");
    const response = await fetch(`${apiUri}/${category}`, requestData);
    const data = await response.json();
  
    return await getResponseData(response, data);
};

export async function dbPut(category, putData) {
  const requestData = contentAuthData("PUT", putData);
  const response = await fetch(`${apiUri}/${category}`, requestData);
  const data = await response.json();

  return await getResponseData(response, data);
}

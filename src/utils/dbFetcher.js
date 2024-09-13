var backendUrl = process.env.REACT_APP_BACKEND_URL;

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

function getResponseData(response, data) {
    const { status } = response;
    if (status >= 200 && status < 300) {
      return data;
    }
    return Promise.reject(data);
};

export async function dbGet(category) {
    const requestData = getAuthData("GET");
    const fullUrl = `${backendUrl}/${category}`;
    console.log(fullUrl);
    const response = await fetch(fullUrl, requestData);
    const data = await response.json();
  
    return await getResponseData(response, data);
};

export async function dbPost(category, postData) {
  const requestData = contentAuthData("POST", postData);
  const response = await fetch(`${backendUrl}/${category}`, requestData);
  const data = await response.json();

  return await getResponseData(response, data);
}

const sendRequest = async (configRequest) => {
  try {
    const response = await fetch(configRequest.url, {
      method: configRequest.method ? configRequest.method : 'GET',
      headers: configRequest.headers ? configRequest.headers : {},
      body: configRequest.body ? JSON.stringify(configRequest.body) : null,
    });

    const data = await response.json();

    return data;
  } catch (err) {
    return err;
  }
};

export default sendRequest;

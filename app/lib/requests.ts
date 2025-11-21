const request = async (endpoint: string, body: Object, method: string) => {
  const res = await fetch(endpoint, {
    method,
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const post = async (endpoint: string, body: Object) => {
  return request(endpoint, body, "POST");
}

export const patch = async (endpoint: string, body: Object) => {
  return request(endpoint, body, "PATCH");
}

export const deleteReq = async (endpoint: string, body: Object) => {
  return request(endpoint, body, "DELETE");
}

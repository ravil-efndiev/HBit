import {
  DailyHabitCreateRequestBody,
  WeeklyHabitCreateRequestBody,
  DailyHabitUpdateRequestBody,
  WeeklyHabitUpdateRequestBody,
  chooseHabitEndpoint,
} from "./requestBody";

export const request = async (
  endpoint: string,
  method: string,
  headers: Object = {},
  body?: Object
) => {
  const fetchData: { [key: string]: any } = {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    credentials: "include",
  };
  if (body) fetchData.body = JSON.stringify(body);

  const res = await fetch(endpoint, fetchData);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const publicServiceRequest = async (
  endpoint: string,
  method: string,
  body?: Object
) => {
  if (process.env.PUBLIC_SERVICE_ONLINE === "true") {
    return request(
      `${process.env.PUBLIC_SERVICE_URL}${endpoint}`,
      method,
      { "x-api-key": process.env.PUBLIC_SERVICE_API_KEY || "" },
      body
    );
  }
  return null;
};

export const reqPost = async (endpoint: string, body: Object) => {
  return request(endpoint, "POST", {}, body);
};

export const reqPatch = async (endpoint: string, body: Object) => {
  return request(endpoint, "PATCH", {}, body);
};

export const reqDelete = async (endpoint: string, body: Object) => {
  return request(endpoint, "DELETE", {}, body);
};

export const habitCreate = async (
  body: DailyHabitCreateRequestBody | WeeklyHabitCreateRequestBody
) => {
  try {
    const resData = await reqPost(chooseHabitEndpoint(body), body);
    console.log(resData.newHabit);
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
};

export const habitUpdate = async (
  body: DailyHabitUpdateRequestBody | WeeklyHabitUpdateRequestBody,
  reloadPage: boolean = true
) => {
  try {
    const resData = await reqPatch(chooseHabitEndpoint(body), body);
    console.log(resData.patchedHabit);

    if (reloadPage) {
      window.location.reload();
    }
  } catch (err) {
    console.error(err);
  }
};

export const habitDelete = async (
  habitId: number,
  type: "daily" | "weekly"
) => {
  try {
    const data = await reqDelete(`/api/habits/${type}`, { habitId });
    console.log(data);
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
};

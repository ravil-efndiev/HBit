import {
  DailyHabitCreateRequestBody,
  WeeklyHabitCreateRequestBody,
  DailyHabitUpdateRequestBody,
  WeeklyHabitUpdateRequestBody,
  chooseHabitEndpoint,
} from "./requestBody";

interface RequestArgs {
  endpoint: string;
  method: string;
  headers?: Object;
  body?: Object;
  params?: { [key: string]: string };
  stringifyBody?: boolean;
}

export interface RequestError {
  error: Error;
  status: number;
}

export const request = async ({
  endpoint,
  method,
  headers = {},
  body,
  params,
  stringifyBody = true,
}: RequestArgs) => {
  const fetchData: { [key: string]: any } = {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    credentials: "include",
  };
  if (body) fetchData.body = stringifyBody ? JSON.stringify(body) : body;

  const paramsStr = params && new URLSearchParams(params).toString();
  const endpointWithParams = paramsStr ? `${endpoint}?${paramsStr}` : endpoint;

  const res = await fetch(endpointWithParams, fetchData);
  const data = res.status !== 304 ? await res.json() : null;

  if (!res.ok && res.status !== 304) {
    throw {
      error: new Error(data.message ? data.message : data.error),
      status: res.status,
    };
  }

  return data;
};

interface PublicServiceRequestArgs {
  endpoint: string;
  method: string;
  body?: Object;
  params?: { [key: string]: string };
}

export const publicServiceRequest = async ({
  endpoint,
  method,
  body,
  params,
}: PublicServiceRequestArgs) => {
  return request({
    endpoint: `${process.env.PUBLIC_SERVICE_URL}${endpoint}`,
    headers: { "x-api-key": process.env.PUBLIC_SERVICE_API_KEY || "" },
    method,
    body,
    params,
  });
};

export const reqGet = async (endpoint: string) =>
  request({ endpoint, method: "GET" });

const genericReq =
  (method: string) =>
  async (
    endpoint: string,
    body: Object,
    headers?: Object,
    stringifyBody?: boolean
  ) => {
    return request({ endpoint, method, body, headers, stringifyBody });
  };

export const reqPost = genericReq("POST");
export const reqPut = genericReq("PUT");
export const reqPatch = genericReq("PATCH");
export const reqDelete = genericReq("DELETE");

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
    const data = await reqDelete(`/api/habits/${type}`, { id: habitId });
    console.log(data);
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
};

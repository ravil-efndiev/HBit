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

export const reqPost = async (endpoint: string, body: Object) => {
  return request(endpoint, body, "POST");
};

export const reqPatch = async (endpoint: string, body: Object) => {
  return request(endpoint, body, "PATCH");
};

export const reqDelete = async (endpoint: string, body: Object) => {
  return request(endpoint, body, "DELETE");
};

export interface DailyHabitCreateRequestBody {
  name: string;
  details: string;
  iconPath: string;
  timeGoal: number;
}

export interface DailyHabitUpdateRequestBody {
  name?: string;
  details?: string;
  iconPath?: string;
  timeGoal?: number;
  timeSpent?: number;
  habitId?: number;
}

export interface WeeklyHabitCreateRequestBody {
  name: string;
  details: string;
  iconPath: string;
  days: string[];
}

export interface WeeklyHabitUpdateRequestBody {
  name?: string;
  details?: string;
  iconPath?: string;
  days?: string[];
  habitId?: number;
}

export const habitCreate = async (
  body: DailyHabitCreateRequestBody | WeeklyHabitCreateRequestBody
) => {
  try {
    const resData = await reqPost("/api/habits/daily", body);
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
    const resData = await reqPatch("/api/habits/daily", body);
    console.log(resData.patchedHabit);
    
    if (reloadPage) {
      window.location.reload();
    }
  } catch (err) {
    console.error(err);
  }
};

export const habitDelete = async (habitId: number) => {
  try {
    const data = await reqDelete("/api/habits/daily", { habitId });
    console.log(data);
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
};

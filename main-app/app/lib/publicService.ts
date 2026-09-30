import { publicServiceRequest } from "./requests";
import { PublicUser } from "./types";

export const publicServiceUrl = () => {
  if (process.env.USE_V0 === "true") {
    return process.env.PUBLIC_SERVICE_V0_URL;
  }
  if (process.env.NODE_ENV === "development") {
    return process.env.PUBLIC_SERVICE_DEV_URL;
  }
  return process.env.PUBLIC_SERVICE_PROD_URL;
}

export const isPublicServiceOnline = async () => {
  try {
    const { online } = await publicServiceRequest({
      endpoint: "/",
      method: "GET",
    });
    return online as boolean;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const createPublicUser = async (
  id: string,
  username: string,
  name: string,
  pfpUrl: string | null
): Promise<PublicUser> => {
  const { publicUser } = await publicServiceRequest({
    endpoint: "/users",
    method: "POST",
    body: {
      privateId: id,
      username: username,
      name: name,
      pfpUrl,
    },
  });

  return publicUser;
};

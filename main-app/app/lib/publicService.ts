import { publicServiceRequest } from "./requests";
import { PublicUserResponseType } from "./types";

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
): Promise<PublicUserResponseType> => {
  const { publicUser } = await publicServiceRequest({
    endpoint: "/users",
    method: "POST",
    body: {
      privateId: id,
      username: username,
      name: name,
      ...(pfpUrl && { pfpUrl }),
    },
  });

  return publicUser;
};

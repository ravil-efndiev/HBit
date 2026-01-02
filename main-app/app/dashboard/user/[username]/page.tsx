import { requestErrorWrapper } from "@/lib/misc";
import { publicServiceRequest, RequestError } from "@/lib/requests";
import { PublicUser } from "@/lib/types";
import React from "react";

interface Props {
  params: Promise<{ username: string }>;
}

const UserPage = async ({ params }: Props) => {
  const { username } = await params;

  return requestErrorWrapper(
    [404],
    async () => {
      const { publicUser } = await publicServiceRequest({
        endpoint: "/users",
        method: "GET",
        params: { username },
      });

      return (
        <main className="content">
          <section className="panel">{publicUser.name}</section>
        </main>
      );
    },

    <main className="content">
      <h1 className="text-3xl text-center mt-20 w-full">Oops, user not found</h1>
    </main>
  );
};

export default UserPage;

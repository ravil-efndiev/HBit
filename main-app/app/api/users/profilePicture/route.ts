import { routeError } from "@/api/routeError";
import { prisma } from "@/lib/prisma";
import { createPublicUser } from "@/lib/publicService";
import { publicServiceRequest, RequestError } from "@/lib/requests";
import { requireSessionUser } from "@/lib/session";
import { supabase } from "@/lib/storage";
import { NextResponse } from "next/server";
import sharp from "sharp";

const compressImage = async (blob: Blob) =>
  await sharp(Buffer.from(await blob.arrayBuffer()))
    .webp({ quality: 70 })
    .resize(400, 400, { fit: "cover" })
    .toBuffer();

const uploadPfp = async (publicUserId: string, imgBuffer: Buffer) => {
  await supabase.storage
    .from("profile-pictures")
    .upload(`${publicUserId}.webp`, imgBuffer, {
      upsert: true,
      contentType: "image/webp",
      cacheControl: "no-store",
    });

  const { data } = supabase.storage
    .from("profile-pictures")
    .getPublicUrl(`${publicUserId}.webp`);

  return `${data.publicUrl}?v=${Date.now()}`;
};

const updateUserAndPublicIdentity = async (
  privateId: string,
  pfpUrl: string
) => {
  await prisma.user.update({ where: { id: privateId }, data: { pfpUrl } });
  await publicServiceRequest({
    endpoint: "/users",
    method: "PATCH",
    body: { privateId, pfpUrl },
  });
};

export const POST = async (req: Request) => {
  try {
    const image = await req.blob();

    const user = await requireSessionUser();
    const compressedImage = await compressImage(image);
    let url = "";

    try {
      const { publicUser } = await publicServiceRequest({
        endpoint: "/users",
        method: "GET",
        params: { privateId: user.id },
      });

      url = await uploadPfp(publicUser.id, compressedImage);
      await updateUserAndPublicIdentity(user.id, url);
    } catch (err) {
      const error = err as RequestError;
      if (error.status === 404) {
        const newPublicIdentity = await createPublicUser(
          user.id,
          user.username,
          user.name,
          user.pfpUrl
        );

        url = await uploadPfp(newPublicIdentity.id, compressedImage);
        await updateUserAndPublicIdentity(user.id, url);
      } else {
        return routeError(err);
      }
    }

    return NextResponse.json({ pfpUrl: url });
  } catch (err) {
    return routeError(err);
  }
};

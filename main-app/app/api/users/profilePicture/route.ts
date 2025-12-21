import { routeError } from "@/api/routeError";
import { prisma } from "@/lib/prisma";
import { publicServiceRequest } from "@/lib/requests";
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
  pfpUrl: string | null,
  prevPfpUrl: string | null
) => {
  await prisma.user.update({ where: { id: privateId }, data: { pfpUrl } });
  try {
    await publicServiceRequest({
      endpoint: "/users",
      method: "PATCH",
      body: { privateId, pfpUrl },
    });
  } catch (err) {
    await prisma.user.update({
      where: { id: privateId },
      data: { pfpUrl: prevPfpUrl },
    });
  }
};

export const PUT = async (req: Request) => {
  try {
    const image = await req.blob();

    const user = await requireSessionUser();
    const compressedImage = await compressImage(image);
    const url = await uploadPfp(user.publicId, compressedImage);
    await updateUserAndPublicIdentity(user.id, url, user.pfpUrl);

    return NextResponse.json({ pfpUrl: url }, { status: 200 });
  } catch (err) {
    return routeError(err);
  }
};

export const DELETE = async (req: Request) => {
  try {
    const user = await requireSessionUser();
    if (!user.pfpUrl) {
      return new Response(null, { status: 304 });
    }

    await supabase.storage
      .from("profile-pictures")
      .remove([`${user.publicId}.webp`]);

    await updateUserAndPublicIdentity(user.id, null, user.pfpUrl);
    return NextResponse.json(
      { message: "Profile picture deleted sucessfully" },
      { status: 200 }
    );
  } catch (err) {
    return routeError(err);
  }
};

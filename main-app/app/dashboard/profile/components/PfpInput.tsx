"use client";

import { reqPost } from "@/lib/requests";
import React from "react";

const PfpInput = () => {
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files[0]) {
      try {
        const resData = await reqPost(
          "/api/users/profilePicture",
          files[0],
          {
            "Content-Type": files[0].type,
          },
          false
        );
        console.log(resData);
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }

    event.target.value = "";
  };

  return (
    <input
      type="file"
      className="file-input file-input-primary"
      accept="image/png, image/jpeg"
      onChange={handleFileChange}
    />
  );
};

export default PfpInput;

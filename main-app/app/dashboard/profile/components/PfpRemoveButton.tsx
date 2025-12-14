"use client";

import { reqDelete } from "@/lib/requests";

const PfpRemoveButton = () => {
  const handleButtonClick = async () => {
    try {
      const resData = await reqDelete("/api/users/profilePicture", {});
      if (resData !== null) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={handleButtonClick} className="btn btn-error">
      Remove profile picture
    </button>
  );
};

export default PfpRemoveButton;

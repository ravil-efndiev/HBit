import React from "react";

interface Props {
  url: string | null;
  size: number;
}

const ProfilePicture = ({ size, url }: Props) => {
  return (
    <div className="avatar">
      <div className=" rounded-full">
        {url ? (
          <img
            src={url}
            alt="avatar"
            width="10px"
            style={{ width: size * (5 / 3), height: size * (5 / 3) }} // was to lazy to make this pretty, makes size of image consistent with placeholder
          />
        ) : (
          <div className="bg-gray-200 p-2 flex justify-center items-center">
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill="#404040"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePicture;

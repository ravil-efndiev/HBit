"use client";

import { useRef, useState } from "react";
import { useIconPaths } from "./context/IconPathsContext";
import Image from "next/image";
import ModalWrapper from "./ModalWrapper";

interface Props {
  onSelect: (iconPath: string) => void;
}

const IconSelect = ({ onSelect }: Props) => {
  const iconPaths = useIconPaths();
  const iconSelectRef = useRef<HTMLDialogElement>(null);
  const [selectedPath, setSelectedPath] = useState(iconPaths[0]);

  const handleIconSelect = (path: string) => {
    setSelectedPath(path);
    onSelect(path);
    iconSelectRef.current?.close();
  };

  return (
    <>
      <ModalWrapper dialogRef={iconSelectRef} top="50vh" width={450}>
        <h5 className="text-xl mb-3">Pick an icon</h5>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(35px,1fr))] max-w-[90%] gap-3">
          {iconPaths.map((path, index) => (
            <li
              key={index}
              className="cursor-pointer"
              onClick={() => handleIconSelect(path)}
            >
              <Image src={path} alt="icon" width={35} height={35} />
            </li>
          ))}
        </ul>
      </ModalWrapper>
      <div
        className="select w-20 cursor-pointer mb-3 shadow-sm"
        onClick={() => iconSelectRef.current?.showModal()}
      >
        <Image src={selectedPath} alt="icon" width={35} height={35} />
      </div>
      <br />
    </>
  );
};

export default IconSelect;

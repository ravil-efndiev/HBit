import IconSelect from "@/dashboard/components/IconSelect";
import TextInput from "@/dashboard/components/TextInput";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  name: string;
  details: string;
  iconPath: string;
  color: string;
  isPublic: boolean;
  setName: Dispatch<SetStateAction<string>>;
  setDetails: Dispatch<SetStateAction<string>>;
  setIconPath: Dispatch<SetStateAction<string>>;
  setColor: Dispatch<SetStateAction<string>>;
  setIsPublic: Dispatch<SetStateAction<boolean>>;
  iconSelectLeft?: string;
  iconSelectTop?: string;
  iconSelectClasses?: string;
}

const ActivityTypeFormInputs = ({
  name,
  details,
  iconPath,
  color,
  isPublic,
  setName,
  setDetails,
  setIconPath,
  setColor,
  setIsPublic,
  iconSelectClasses,
  iconSelectLeft,
  iconSelectTop,
}: Props) => {
  return (
    <>
      <TextInput
        value={name}
        onChange={(newName) => setName(newName)}
        placeholder="Activity name *"
      />
      <TextInput
        value={details}
        onChange={(newDetes) => setDetails(newDetes)}
        placeholder="Activity details"
      />
      <div className="flex items-center">
        <IconSelect
          initialIconPath={iconPath}
          onSelect={(path) => setIconPath(path)}
          left={iconSelectLeft}
          top={iconSelectTop}
          selectClasses={iconSelectClasses}
        />
        <input
          type="color"
          onChange={(e) => setColor(e.target.value)}
          value={color}
          className="rounded-full w-10 border border-(--col-text-secondary) h-10 cursor-pointer"
        />
      </div>
      <div className="flex items-center gap-2 my-2">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          onChange={(e) => setIsPublic(e.target.checked)}
          checked={isPublic}
        />
        <p className="font-light">make public</p>
      </div>
    </>
  );
};

export default ActivityTypeFormInputs;

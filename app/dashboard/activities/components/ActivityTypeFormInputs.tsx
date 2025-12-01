import IconSelect from "@/dashboard/components/IconSelect";
import TextInput from "@/dashboard/components/TextInput";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  name: string;
  details: string;
  iconPath: string;
  color: string;
  setName: Dispatch<SetStateAction<string>>;
  setDetails: Dispatch<SetStateAction<string>>;
  setIconPath: Dispatch<SetStateAction<string>>;
  setColor: Dispatch<SetStateAction<string>>;
  iconSelectLeft?: string;
  iconSelectTop?: string;
  iconSelectClasses?: string;
}

const ActivityTypeFormInputs = ({
  name,
  details,
  iconPath,
  color,
  setName,
  setDetails,
  setIconPath,
  setColor,
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
    </>
  );
};

export default ActivityTypeFormInputs;

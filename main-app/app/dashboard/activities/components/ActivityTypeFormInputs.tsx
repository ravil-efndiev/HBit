import { ActivityVisibility } from "@prisma/client";
import IconSelect from "@/dashboard/components/IconSelect";
import TextInput from "@/dashboard/components/TextInput";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  name: string;
  details: string;
  iconPath: string;
  color: string;
  visibility?: ActivityVisibility;
  isPublic?: boolean;
  setName: Dispatch<SetStateAction<string>>;
  setDetails: Dispatch<SetStateAction<string>>;
  setIconPath: Dispatch<SetStateAction<string>>;
  setColor: Dispatch<SetStateAction<string>>;
  setVisibility?: Dispatch<SetStateAction<ActivityVisibility>>;
  setIsPublic?: Dispatch<SetStateAction<boolean>>;
  iconSelectLeft?: string;
  iconSelectTop?: string;
  iconSelectClasses?: string;
}

const ActivityTypeFormInputs = ({
  name,
  details,
  iconPath,
  color,
  visibility,
  isPublic,
  setName,
  setDetails,
  setIconPath,
  setColor,
  setVisibility,
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
      {visibility !== undefined && setVisibility ? (
        <div className="my-2">
          <label className="label mb-1 p-0 text-sm font-medium">
            Visibility
          </label>
          <select
            value={visibility}
            onChange={(e) =>
              setVisibility(e.target.value as ActivityVisibility)
            }
            className="select select-bordered w-full"
          >
            <option value={ActivityVisibility.PRIVATE}>Private</option>
            <option value={ActivityVisibility.PUBLIC}>Public</option>
            <option value={ActivityVisibility.FRIENDS_ONLY}>Friends only</option>
          </select>
        </div>
      ) : (
        <div className="my-2 flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            onChange={(e) => setIsPublic?.(e.target.checked)}
            checked={isPublic}
          />
          <p className="font-light">make public</p>
        </div>
      )}
    </>
  );
};

export default ActivityTypeFormInputs;

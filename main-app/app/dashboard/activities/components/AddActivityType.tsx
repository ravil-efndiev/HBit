"use client";

import { useIconPaths } from "@/dashboard/components/context/IconPathsContext";
import { reqPost } from "@/lib/requests";
import { useState } from "react";
import ActivityTypeFormInputs from "./ActivityTypeFormInputs";

const AddActivityType = () => {
  const defaultIconPath = useIconPaths()[0];
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [iconPath, setIconPath] = useState(defaultIconPath);
  const [color, setColor] = useState("#7ab5fc");
  const [error, setError] = useState<string | null>(null);

  const handleAddBtnClick = async () => {
    if (!name) return setError("Please enter an activity name");
    if (name.length > 20) return setError("Name is too long");
    if (details.length > 80) return setError("Details are too long");

    try {
      await reqPost("/api/activities/type/", {
        name,
        details,
        iconPath,
        color,
      });

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="panel max-w-1/5 max-h-[35vh] sticky top-5">
      <p className="mb-3">Add a new activity</p>
      <ActivityTypeFormInputs
        name={name}
        details={details}
        iconPath={iconPath}
        color={color}
        setName={setName}
        setDetails={setDetails}
        setIconPath={setIconPath}
        setColor={setColor}
        iconSelectClasses="mb-0! mr-2"
        iconSelectLeft="2%"
        iconSelectTop="32%"
      />
      <button
        className="btn btn-outline btn-primary mt-3"
        onClick={handleAddBtnClick}
      >
        Add
      </button>
      {error && <p className="text-(--col-peach) mt-1">{error}</p>}
    </div>
  );
};

export default AddActivityType;

"use client";

import IconSelect from "@/dashboard/components/IconSelect";
import TextInput from "@/dashboard/components/TextInput";
import { reqPost } from "@/lib/requests";
import { useState } from "react";

const AddActivityType = () => {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [iconPath, setIconPath] = useState("");
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
          left="2%"
          top="32%"
          selectClasses="mb-0! mr-2"
        />
        <input
          type="color"
          onChange={(e) => setColor(e.target.value)}
          value={color}
          className="rounded-full w-10 border border-(--col-text-secondary) h-10 cursor-pointer"
        />
      </div>
      <br />
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

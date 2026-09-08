"use client";

import { useIconPaths } from "@/dashboard/components/context/IconPathsContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ActivityTypeFormInputs from "./ActivityTypeFormInputs";
import { createActivityType } from "@/actions/activityType.action";

const AddActivityType = () => {
  const defaultIconPath = useIconPaths()[0];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [iconPath, setIconPath] = useState(defaultIconPath);
  const [color, setColor] = useState("#7ab5fc");
  const [error, setError] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => setError(null);
    dialog.addEventListener("close", handleClose);

    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = () => dialogRef.current?.close();

  const handleAddBtnClick = async () => {
    if (!name) return setError("Please enter an activity name");
    if (name.length > 20) return setError("Name is too long");
    if (details.length > 80) return setError("Details are too long");

    const res = await createActivityType({
      name,
      details,
      iconPath,
      color,
      isPublic,
    });

    if (!res.ok) {
      return setError(res.error);
    }

    window.location.reload();
  };

  const renderForm = () => (
    <>
      <ActivityTypeFormInputs
        name={name}
        details={details}
        iconPath={iconPath}
        color={color}
        isPublic={isPublic}
        setName={setName}
        setDetails={setDetails}
        setIconPath={setIconPath}
        setColor={setColor}
        setIsPublic={setIsPublic}
        iconSelectClasses="mb-0! mr-2"
      />
      <button
        className="btn btn-outline btn-primary mt-3"
        onClick={handleAddBtnClick}
      >
        Add
      </button>
      {error && <p className="text-(--col-peach) mt-1">{error}</p>}
    </>
  );

  return (
    <>
      <section className="panel m-0! hidden h-fit w-full lg:sticky lg:top-20 lg:block">
        <h2 className="mb-3 text-lg font-medium">Add a new activity</h2>
        {renderForm()}
      </section>

      <button
        type="button"
        className="btn btn-primary fixed bottom-5 right-5 z-30 h-15 w-15 px-2 py-2 shadow-lg lg:hidden"
        onClick={openDialog}
        aria-label="Add a new activity"
      >
        <Image src="/plus.svg" alt="" width={40} height={40} />
      </button>

      <dialog
        ref={dialogRef}
        className="modal px-4"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        <div className="modal-box max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-y-auto">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg"
            onClick={closeDialog}
            aria-label="Close add activity dialog"
          >
            x
          </button>
          <h2 className="mb-3 pr-8 text-xl font-medium">Add a new activity</h2>
          {renderForm()}
        </div>
      </dialog>
    </>
  );
};

export default AddActivityType;

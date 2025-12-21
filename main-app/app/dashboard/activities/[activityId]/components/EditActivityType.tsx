"use client";

import ModalWrapper from "@/dashboard/components/ModalWrapper";
import { ActivityType } from "@prisma/client";
import { useRef, useState } from "react";
import ActivityTypeFormInputs from "../../components/ActivityTypeFormInputs";
import Image from "next/image";
import {
  deleteActivityType,
  updateActivityType,
} from "@/actions/activityType.action";

interface Props {
  initialActivityType: ActivityType;
}

const EditActivityType = ({ initialActivityType }: Props) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState(initialActivityType.name);
  const [details, setDetails] = useState(initialActivityType.details);
  const [iconPath, setIconPath] = useState(initialActivityType.iconPath);
  const [color, setColor] = useState(initialActivityType.color);
  const [error, setError] = useState<string | null>(null);

  const handleEditBtnClick = async () => {
    if (!name) return setError("Please enter an activity name");
    if (name.length > 20) return setError("Name is too long");
    if (details.length > 80) return setError("Details are too long");

    const fields = { name, details, iconPath, color };
    const toUpdate = Object.fromEntries(
      Object.entries(fields).filter(
        ([key, value]) =>
          initialActivityType[key as keyof ActivityType] !== value
      )
    );

    const res = await updateActivityType({
      typeId: initialActivityType.id,
      ...toUpdate,
    });

    if (!res.ok) {
      return console.error(res.error);
    }
    modalRef.current?.close();
    window.location.reload();
  };

  const handleDeleteBtnClick = async () => {
    const res = await deleteActivityType(initialActivityType.id);
    if (!res.ok) {
      return console.error(res.error);
    }
    modalRef.current?.close();
    window.location.reload();
  };

  return (
    <>
      <ModalWrapper dialogRef={modalRef}>
        <h4 className="mb-3 text-2xl text-left">Edit activity information</h4>
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
        />
        <div className="w-full flex justify-start mt-5">
          <button className="btn btn-primary" onClick={handleEditBtnClick}>
            Edit
          </button>
          <button
            className="btn btn-warning ml-3"
            onClick={handleDeleteBtnClick}
          >
            Delete
          </button>
        </div>
        {error && <p className="text-(--col-peach) mt-1">{error}</p>}
      </ModalWrapper>
      <button
        onClick={() => modalRef.current?.showModal()}
        className="
              btn btn-circle btn-ghost btn-secondary-light hover:bg-(--col-accent-mint)
              absolute left-full -translate-x-[120%] top-1/2 -translate-y-1/2"
      >
        <Image src="/three-dots.svg" alt="edit" width={40} height={40} />
      </button>
    </>
  );
};

export default EditActivityType;

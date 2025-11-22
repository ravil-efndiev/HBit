import { useState } from "react";
import Image from "next/image";
import { DailyHabit } from "@prisma/client";
import AddOrEditModal from "../AddOrEditModal";

interface Props {
  onHabitAdd: (habit: DailyHabit) => void;
}

const AddDailyHabitModal = ({ onHabitAdd }: Props) => {
  const [openTrigger, setOpenTrigger] = useState(0);

  return (
    <>
      <AddOrEditModal onAddOrEdit={onHabitAdd} openTrigger={openTrigger} />
      <button
        className="btn btn-primary px-2 py-2 w-15 h-15"
        onClick={() => setOpenTrigger((prev) => prev + 1)}
      >
        <Image src="/plus.svg" alt="Plus" width={40} height={40} />
      </button>
    </>
  );
};

export default AddDailyHabitModal;

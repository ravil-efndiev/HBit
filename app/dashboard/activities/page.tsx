import Link from "next/link";
import React, { act } from "react";
import ActivitiesHistory from "./components/ActivitiesHistory";
import AddActivityType from "./components/AddActivityType";
import IconPathsProvider from "../components/context/IconPathsContext";
import { getHabitIconPaths } from "@/lib/iconPaths";
import Breadcrumbs from "../components/Breadcrumbs";

interface Props {
  searchParams: Promise<{
    activityId?: number;
  }>;
}

const ActivitiesPage = async ({ searchParams }: Props) => {
  const { activityId } = await searchParams;
  const habitIconPaths = getHabitIconPaths();
  console.log(habitIconPaths);

  return (
    <>
      <Breadcrumbs
        subpage="activities"
        extra={activityId ? `Some activity` : undefined}
      />
      <main>
        <div className="max-w-[96%] flex mx-auto">
          <IconPathsProvider iconPaths={habitIconPaths}>
            <AddActivityType />
            <ActivitiesHistory />
          </IconPathsProvider>
        </div>
      </main>
    </>
  );
};

export default ActivitiesPage;

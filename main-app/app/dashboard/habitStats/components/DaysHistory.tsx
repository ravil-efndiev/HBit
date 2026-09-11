import { HabitStatWithHabit } from "@/lib/types";
import Collapse from "../../components/Collapse";
import Image from "next/image";

interface Props {
  statsByDate: HabitStatWithHabit[][];
}

const DaysHistory = ({ statsByDate }: Props) => {
  return (
    <section className="panel">
      {statsByDate.map((stats, index) => (
        <Collapse
          key={index}
          className="border-base-300"
          title={
            <>
              <p>{stats[0].date.toLocaleDateString("cs-CZ")}</p>
              <p className="font-light">
                {stats.filter((stat) => stat.completed).length}/{stats.length}{" "}
                completed
              </p>
            </>
          }
        >
          {stats.map((stat) => (
            <div className="display flex gap-6" key={stat.id}>
              <p className="flex-1">{stat.habit.name}</p>
              {stat.completed ? (
                <p className="text-(--col-primary-dark) flex-4">Completed</p>
              ) : (
                <p className="text-(--col-peach) flex-4">Not completed</p>
              )}
              <div>
                <p>Current Streak: {stat.streakC}</p>
              </div>
              <div>
                <p>Longest Streak: {stat.streakL}</p>
              </div>
              <div className="flex-1">
                {stat.streakC === stat.streakL && stat.streakL > 0 && (
                  <Image
                    src="/fire.svg"
                    width={30}
                    height={30}
                    alt="fire"
                    title="You are on your best streak yet!"
                    className="cursor-help"
                  />
                )}
              </div>
            </div>
          ))}
        </Collapse>
      ))}
    </section>
  );
};

export default DaysHistory;

import SidebarHabits from "./SidebarHabits";
import SidebarLayoutControls from "./SidebarLayoutControls";
import Collapse from "./Collapse";

const Sidebar = async () => {
  return (
    <div className="flex min-h-0 h-full flex-col overflow-y-auto">
      <Collapse title={<p>Habits</p>}>
        <SidebarHabits />
      </Collapse>
      <Collapse title={<p>Layout</p>}>
        <SidebarLayoutControls />
      </Collapse>
    </div>
  );
};

export default Sidebar;

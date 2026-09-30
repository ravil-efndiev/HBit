import { PropsWithChildren, ReactNode } from "react";

interface CollapseProps extends PropsWithChildren {
  title: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

const Collapse = ({ title, defaultOpen, className = "", children }: CollapseProps) => {
  return (
    <div className={`collapse collapse-arrow ${className}`}>
      <input type="radio" name="collapse-group" defaultChecked={defaultOpen} />
      <div className="collapse-title flex gap-5">{title}</div>
      <div className="collapse-content max-h-[calc(100dvh-8rem)] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Collapse;

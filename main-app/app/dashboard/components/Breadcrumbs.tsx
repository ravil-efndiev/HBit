import Link from "next/link";
import React from "react";

interface Props {
  subpage: string;
  extra?: string;
}

const Breadcrumbs = ({ subpage, extra }: Props) => {
  return (
    <div className="breadcrumbs text-lg max-w-[96%] mx-auto">
      <ul>
        <li>
          <Link href="/dashboard">Home</Link>
        </li>
        <li>
          <Link href={`/dashboard/${subpage}`}>
            {subpage[0].toUpperCase() + subpage.slice(1)}
          </Link>
        </li>
        {extra && (
          <li>
            <Link href="#">{extra}</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Breadcrumbs;

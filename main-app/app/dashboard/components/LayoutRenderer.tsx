"use client";

import { ReactNode } from 'react';
import { useLayout } from './context/LayoutContext';
import Loading from "@/components/Loading";

interface Props {
  layoutElements: {
    [key: string]: ReactNode,
  };
}

function LayoutRenderer({ layoutElements }: Props) {
  const { layout } = useLayout();

  return (
    <>
      {layout ? layout
        .map((el) => ({layoutEl: el, node: layoutElements[el.id]}))
        .filter(({layoutEl}) => layoutEl.visible)
        .sort(({layoutEl: a}, {layoutEl: b}) => a.order - b.order)
        .map(({node}) => node)
      : (
        <Loading
          label="Loading dashboard layout"
          className="min-h-32"
        />
      )}
    </>
  )
}

export default LayoutRenderer

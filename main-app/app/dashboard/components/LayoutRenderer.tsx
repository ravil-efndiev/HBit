"use client";

import { ReactNode } from 'react';
import { useLayout } from './context/LayoutContext';

interface Props {
  layoutElements: {
    [key: string]: ReactNode,
  };
}

function LayoutRenderer({ layoutElements }: Props) {
  const { layout } = useLayout();

  return (
    <>
      {layout
        .map((el) => ({layoutEl: el, node: layoutElements[el.id]}))
        .filter(({layoutEl}) => layoutEl.visible)
        .sort(({layoutEl: a}, {layoutEl: b}) => a.order - b.order)
        .map(({node}) => node)
      }
    </>
  )
}

export default LayoutRenderer

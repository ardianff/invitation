"use client";

import ReactDOM from "react-dom";
import { ReactNode, useEffect, useState } from "react";

const Portal = ({ children }: { children: ReactNode }) => {
  const [container, setContainer] = useState<Element | null>(null);

  useEffect(() => {
    setContainer(document.querySelector("#portal"));
  }, []);

  return container && children ? ReactDOM.createPortal(children, container) : null;
};

export default Portal;


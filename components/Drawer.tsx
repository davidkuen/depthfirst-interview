"use client";

import React from "react";

const Drawer = ({
  children,
  onClose,
}: {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}) => {
  React.useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);
  return (
    <div
      className="fixed top-0 right-0 left-0 bottom-0 bg-background/50 z-20"
      onClick={onClose}
    >
      <div
        className="flex flex-col gap-4 bg-background w-full max-w-2xl h-full absolute right-0 top-0 bottom-0 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Drawer;

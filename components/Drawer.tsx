"use client";

const Drawer = ({
  open,
  children,
  onClose,
}: {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}) => {
  return open ? (
    <div
      className="fixed top-0 right-0 left-0 bottom-0 bg-background/50 z-20"
      onClick={onClose}
    >
      <div
        className="flex flex-col gap-4 bg-background w-1/2 h-full absolute right-0 top-0 bottom-0 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  ) : null;
};

export default Drawer;

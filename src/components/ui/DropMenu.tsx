import React, { forwardRef } from "react";

interface IProps {
  position: {
    x: number;
    y: number;
  };
  visible: boolean;
  onClose: () => void;
  onCloseAll: () => void;
}

const DropMenu = forwardRef<HTMLDivElement, IProps>(
  ({ position: { x, y }, visible, onClose, onCloseAll }, ref) => {
    if (!visible) return null;

    return (
      <div
        ref={ref}
        style={{ position: "absolute", top: `${y}px`, left: `${x}px` }}
      >
        <ul className="text-sm px-7 py-2 bg-[rgb(24,24,24)] rounded-md w-fit">
          <li
            className="px-4 py-2 rounded-md hover:bg-blue-500 cursor-pointer"
            onClick={onClose}
          >
            Close
          </li>
          <li
            className="px-4 py-2 rounded-md hover:bg-blue-500 cursor-pointer"
            onClick={onCloseAll}
          >
            Close all
          </li>
        </ul>
      </div>
    );
  }
);

export default DropMenu;

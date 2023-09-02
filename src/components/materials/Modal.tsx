import type { ReactNode, FC } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoMdClose, IoMdArrowBack } from "react-icons/io";
import { cn } from "utils/cn";

const modalSize = {
  lg: "w-[720px]",
  md: "w-[400px]",
};

interface ModalProps {
  onBack?: () => void; // if truthy, BackIcon rendered
  closeModal: () => void;
  children: ReactNode;
  title?: string;
  closable?: boolean;
  size?: keyof typeof modalSize;
}

const Modal: FC<ModalProps> = ({
  title,
  children,
  closable = true,
  onBack,
  closeModal,
  size = "md",
}) => {
  const portalRef = useRef<HTMLElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    portalRef.current = document.getElementById("modal");
    setIsMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  if (!isMounted) return null;
  return createPortal(
    <div className="z-[200] fixed inset-0 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-neutral-900/40 overflow-y-hidden"
        onClick={closable ? closeModal : undefined}
      />

      <div
        className={cn(
          "shadow-bold z-50 overflow-hidden rounded-10 bg-white mx-4 pt-4",
          modalSize[size]
        )}
      >
        <header className="mx-4 mt-2 flex items-center justify-between">
          {onBack ? (
            <div onClick={onBack} className="cursor-pointer">
              <IoMdArrowBack size={22} />
            </div>
          ): <div className="w-[22px]"/>}
          <p className="text-h-sm">{title}</p>
          {closable && (
            <div onClick={closeModal} className="cursor-pointer">
              <IoMdClose size={22} />
            </div>
          )}
        </header>
        {children}
      </div>
    </div>,
    portalRef.current!
  );
};

export default Modal;

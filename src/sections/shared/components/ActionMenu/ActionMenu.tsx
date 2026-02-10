import { useState, useEffect, useMemo } from "react";
import { useMediaQuery } from "@mui/material";
import ActionMenuStyled from "./ActionMenuStyled";

const MOBILE_BREAKPOINT = 768;

export interface ActionMenuAction {
  label: string;
  icon: React.ReactElement;
  onClick: () => void;
  destructive?: boolean;
  disabled?: boolean;
  key?: string;
}

export interface ActionMenuProps {
  actions: ActionMenuAction[];
  variant?: "mobile" | "auto";
  align?: "left" | "right";
}

const ActionMenu = ({
  actions,
  variant = "auto",
  align = "right",
}: ActionMenuProps): React.ReactElement | null => {
  const [open, setOpen] = useState(false);
  const isMobileViewport = useMediaQuery(`(max-width:${MOBILE_BREAKPOINT}px)`);
  const useBottomSheet =
    variant === "mobile" || (variant === "auto" && isMobileViewport);
  const useDropdown = variant === "auto" && !isMobileViewport;

  const sortedActions = useMemo(() => {
    const normal: ActionMenuAction[] = [];
    const destructive: ActionMenuAction[] = [];
    actions.forEach((a) =>
      a.destructive ? destructive.push(a) : normal.push(a),
    );
    return [...normal, ...destructive];
  }, [actions]);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  if (sortedActions.length === 0) return null;

  const runAndClose = (onClick: () => void) => {
    onClick();
    setOpen(false);
  };

  const menuContent = (
    <>
      {sortedActions.map((action, index) => (
        <button
          key={action.key ?? index}
          type="button"
          className={`action-menu__item ${
            action.destructive ? "action-menu__item--destructive" : ""
          }`}
          onClick={() => !action.disabled && runAndClose(action.onClick)}
          disabled={action.disabled}
        >
          {action.icon}
          {action.label}
        </button>
      ))}
    </>
  );

  return (
    <ActionMenuStyled className="action-menu" $align={align}>
      <button
        type="button"
        className="action-menu__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-label="Actions"
        aria-expanded={open}
        aria-haspopup="true"
      >
        ⋮
      </button>

      {open && useBottomSheet && (
        <>
          <div
            className="action-menu__backdrop"
            role="button"
            tabIndex={-1}
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          />
          <div className="action-menu__bottom-sheet">{menuContent}</div>
        </>
      )}

      {open && useDropdown && (
        <>
          <div
            className="action-menu__overlay-desktop"
            role="button"
            tabIndex={-1}
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          />
          <div className="action-menu__dropdown">{menuContent}</div>
        </>
      )}
    </ActionMenuStyled>
  );
};

export default ActionMenu;

import ActionButtonStyled from "./ActionButtonStyled";

interface Props {
  onClick: () => void;
  text: string;
  icon: React.ReactElement;
  color: string;
}

const ActionButton = ({
  onClick,
  text,
  icon,
  color,
}: Props): React.ReactElement => {
  return (
    <ActionButtonStyled
      className="delete-button"
      onClick={onClick}
      $color={color}
      type="button"
    >
      {icon}
      {text}
    </ActionButtonStyled>
  );
};

export default ActionButton;

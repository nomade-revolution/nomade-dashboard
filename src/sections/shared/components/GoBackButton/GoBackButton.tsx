import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import GoBackButtonStyled from "./GoBackButtonStyled";

const GoBackButton = (): React.ReactElement => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <GoBackButtonStyled className="goback-button">
      <MdArrowBackIosNew className="goback-button__icon" />
      <button onClick={handleGoBack} className="goback-button__button">
        Volver
      </button>
    </GoBackButtonStyled>
  );
};

export default GoBackButton;

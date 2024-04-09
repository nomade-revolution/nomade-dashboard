import { Link } from "react-router-dom";
import { HiOutlineFaceFrown } from "react-icons/hi2";
import NotFoundStyled from "./NotFoundStyled";

const NotFound = (): React.ReactElement => {
  return (
    <NotFoundStyled className="not-found">
      <HiOutlineFaceFrown className="not-found__icon" />
      <span className="not-found__error">404</span>
      <span className="not-found__message">
        {" "}
        Upsss. No hemos podido encontrar la pagina que estás buscando.
      </span>
      <Link to={"/usuarios"} className="not-found__link">
        Volver atrás
      </Link>
    </NotFoundStyled>
  );
};

export default NotFound;

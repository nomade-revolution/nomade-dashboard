import ImageCustom from "../ImageCustom/ImageCustom";
import NomadeLogoSectionStyled from "./NomadeLogoSectionStyled";

const NomadeLogoSection = (): React.ReactElement => {
  return (
    <NomadeLogoSectionStyled className="nomade-section">
      <ImageCustom
        alt="Fresatitan logo"
        className="side-bar__image"
        height={70}
        width={250}
        image="/main_logo.png"
      />
      <span className="nomade-section__slogan">
        Area de Clientes y Gestión de collabs
      </span>
      <div className="nomade-section__circles-container">
        <div className="nomade-section__big-circle"></div>
        <div className="nomade-section__small-circle"></div>
      </div>
    </NomadeLogoSectionStyled>
  );
};

export default NomadeLogoSection;

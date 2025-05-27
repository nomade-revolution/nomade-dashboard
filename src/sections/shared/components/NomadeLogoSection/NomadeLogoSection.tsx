import ImageCustom from "../ImageCustom/ImageCustom";
import NomadeLogoSectionStyled from "./NomadeLogoSectionStyled";

const NomadeLogoSection = (): React.ReactElement => {
  return (
    <NomadeLogoSectionStyled className="nomade-section">
      <ImageCustom
        alt="Nomade logo"
        className="side-bar__image"
        image="/main_logo.png"
        width={200}
        height={74}
      />
      <span className="nomade-section__slogan">
        Area de Clientes y Gestión de collabs
      </span>
    </NomadeLogoSectionStyled>
  );
};

export default NomadeLogoSection;

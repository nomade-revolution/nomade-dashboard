import { useEffect, useState } from "react";

interface ImageCustomProps {
  image: string;
  alt: string;
  className: string;
  width: number;
  height: number;
  onMouseOut?: () => void;
  onMouseOver?: () => void;
}

const ImageCustom = ({
  image,
  className,
  width,
  height,
  alt,
  onMouseOut,
  onMouseOver,
}: ImageCustomProps): React.ReactElement => {
  const [imageLoaded, setImageLoaded] = useState<string>(image);
  const [errorLoadingImage, setErrorLoadingImage] = useState<boolean>(false);

  useEffect(() => {
    if (image) {
      const newImage = new Image();
      newImage.src = image;

      newImage.onload = () => {
        setImageLoaded(image);
        setErrorLoadingImage(false);
      };

      newImage.onerror = () => {
        setImageLoaded("/image-placeholder.svg");
        setErrorLoadingImage(true);
      };
    } else {
      setImageLoaded("/image-placeholder.svg");
      setErrorLoadingImage(true);
    }
  }, [image]);

  return (
    <img
      src={
        errorLoadingImage
          ? "/image-placeholder.svg"
          : imageLoaded || "/image-placeholder.svg"
      }
      alt={alt || "Image placeholder"}
      className={className}
      width={width}
      height={height}
      onMouseOut={onMouseOut}
      onMouseOver={onMouseOver}
    />
  );
};

export default ImageCustom;

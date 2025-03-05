import React, { useEffect, useRef, useState } from "react";
import ImageCustom from "../ImageCustom/ImageCustom";
import FileInputWrapper from "./CustomFileInputStyled";

interface Props {
  setFile: (value: File[]) => void;
  file: File[];
  text?: string;
  images?: string[];
  multiple?: boolean;
  onDeleteImage?: (status?: false) => void;
}

const CustomFileInput = ({
  setFile,
  file,
  images,
  multiple = false,
  text,
  onDeleteImage,
}: Props): React.ReactElement => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [objectUrls, setObjectUrls] = useState<string[]>([]);

  useEffect(() => {
    if (file && file.length > 0) {
      const newObjectUrls = file.map((f) => URL.createObjectURL(f));
      setObjectUrls(newObjectUrls);
      return () => {
        newObjectUrls.forEach((url) => URL.revokeObjectURL(url));
      };
    } else {
      setObjectUrls([]);
      setFileNames([]);
    }
  }, [file]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setFileNames(filesArray.map((f) => f.name));
      setFile(filesArray);
    }
  };

  const handleClick = () => {
    if (onDeleteImage) onDeleteImage(false);
    fileInputRef.current?.click();
  };

  const showDeleteButton =
    onDeleteImage && (file?.length > 0 || (images && images?.length > 0));

  return (
    <FileInputWrapper className="file">
      <section className="file-section">
        <div className="file-images">
          {objectUrls.length > 0 ? (
            objectUrls.map((url, index) => (
              <ImageCustom
                key={index}
                alt={`Image preview ${index + 1}`}
                className="create-fourth__image-preview"
                height={80}
                width={100}
                image={url}
              />
            ))
          ) : images ? (
            images.map((image, index) => (
              <ImageCustom
                alt="Image preview"
                className="create-fourth__image-preview"
                height={80}
                width={120}
                image={image}
                key={index}
              />
            ))
          ) : (
            <ImageCustom
              alt="Placeholder"
              className=""
              height={60}
              width={60}
              image="/icons/imagen.svg"
            />
          )}
        </div>

        <span className="file-text">
          {text ? text : "Sube al menos una foto para que destaque la oferta"}
        </span>
        <label className="file-input-label" onClick={handleClick}>
          {file?.length > 0 || (images && images!.length > 0)
            ? "Modificar"
            : "Subir"}
        </label>
        {showDeleteButton ? (
          <label
            className="file-input-label-delete"
            onClick={() => (onDeleteImage ? onDeleteImage(undefined) : null)}
          >
            Eliminar
          </label>
        ) : null}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          multiple={multiple}
        />
        <div>
          {fileNames.length > 0 &&
            fileNames.map((name, index) => (
              <span key={index} className="file-name">
                {name}
              </span>
            ))}
        </div>
      </section>
    </FileInputWrapper>
  );
};

export default CustomFileInput;

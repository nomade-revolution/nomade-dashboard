import React, { useEffect, useRef, useState } from "react";
import ImageCustom from "../ImageCustom/ImageCustom";
import FileInputWrapper from "./CustomFileInputStyled";

interface Props {
  setFile: (value: File[]) => void;
  file: File[];
  image?: string;
  multiple?: boolean;
}

const CustomFileInput = ({
  setFile,
  file,
  image,
  multiple = false,
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
    fileInputRef.current?.click();
  };

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
          ) : image ? (
            <ImageCustom
              alt="Image preview"
              className="create-fourth__image-preview"
              height={80}
              width={180}
              image={image}
            />
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
          Sube al menos una foto para que destaque la oferta
        </span>
        <label className="file-input-label" onClick={handleClick}>
          {file?.length > 0 || image ? "Modificar" : "Subir"}
        </label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          multiple={multiple}
        />
        {fileNames.length > 0 &&
          fileNames.map((name, index) => (
            <span key={index} className="file-name">
              {name}
            </span>
          ))}
      </section>
    </FileInputWrapper>
  );
};

export default CustomFileInput;

import React, { useEffect, useRef, useState } from "react";
import ImageCustom from "../ImageCustom/ImageCustom";
import FileInputWrapper from "./CustomFileInputStyled";
import { OfferImageItem } from "modules/offers/domain/OfferImage";

interface Props {
  setFile: (value: File[]) => void;
  file: File[];
  text?: string;
  images?: string[];
  multiple?: boolean;
  onDeleteImage?: (status?: false) => void;
  imageItems?: OfferImageItem[];
  onImageItemsChange?: (value: OfferImageItem[]) => void;
}

const ArrowIcon = ({
  direction = "right",
}: {
  direction?: "left" | "right";
}): React.ReactElement => (
  <svg
    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiPaginationItem-icon css-n8417t-MuiSvgIcon-root-MuiPaginationItem-icon"
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    data-testid="NavigateNextIcon"
    style={direction === "left" ? { transform: "rotate(180deg)" } : undefined}
  >
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
  </svg>
);

const TrashIcon = (): React.ReactElement => (
  <svg
    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium file-icon-svg"
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    data-testid="DeleteIcon"
  >
    <path
      fill="currentColor"
      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zm3.46-7.12 1.41-1.41L12 11.59l1.12-1.12 1.41 1.41L13.41 13l1.12 1.12-1.41 1.41L12 14.41l-1.12 1.12-1.41-1.41L10.59 13zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"
    ></path>
  </svg>
);

const CustomFileInput = ({
  setFile,
  file,
  images,
  multiple = false,
  text,
  onDeleteImage,
  imageItems,
  onImageItemsChange,
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

      if (imageItems && onImageItemsChange) {
        const nextItems = filesArray.map((newFile) => ({
          clientId: `new_${Date.now()}_${Math.random()
            .toString(36)
            .slice(2, 10)}`,
          file: newFile,
          preview: URL.createObjectURL(newFile),
          isNew: true,
        }));
        const merged = [...imageItems, ...nextItems];
        onImageItemsChange(merged);
        setFile(
          merged
            .filter((item) => item.isNew && item.file)
            .map((item) => item.file as File),
        );
      } else {
        setFile(filesArray);
      }
    }
  };

  const handleClick = () => {
    if (onDeleteImage) onDeleteImage(false);
    fileInputRef.current?.click();
  };

  const showDeleteButton =
    onDeleteImage && (file?.length > 0 || (images && images?.length > 0));

  const currentImageItems: OfferImageItem[] = imageItems
    ? imageItems
    : objectUrls.map((url, index) => ({
        clientId: `legacy_file_${index}`,
        preview: url,
        isNew: true,
      }));

  const removeImageItem = (clientId: string) => {
    if (!imageItems || !onImageItemsChange) {
      return;
    }

    const nextItems = imageItems.filter((item) => item.clientId !== clientId);
    onImageItemsChange(nextItems);
    setFile(
      nextItems
        .filter((item) => item.isNew && item.file)
        .map((item) => item.file as File),
    );
  };

  const moveImageItem = (index: number, direction: -1 | 1) => {
    if (!imageItems || !onImageItemsChange) {
      return;
    }

    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= imageItems.length) {
      return;
    }

    const nextItems = [...imageItems];
    const [moved] = nextItems.splice(index, 1);
    nextItems.splice(newIndex, 0, moved);
    onImageItemsChange(nextItems);
    setFile(
      nextItems
        .filter((item) => item.isNew && item.file)
        .map((item) => item.file as File),
    );
  };

  return (
    <FileInputWrapper className="file">
      <section className="file-section">
        <div className="file-images">
          {imageItems ? (
            currentImageItems.map((item, index) => (
              <div key={item.clientId} className="file-image-item">
                <ImageCustom
                  alt={`Image preview ${index + 1}`}
                  className="create-fourth__image-preview"
                  height={80}
                  width={100}
                  image={item.preview || item.url || "/icons/imagen.svg"}
                />
                <div className="file-image-actions">
                  <button
                    className="file-order-btn"
                    type="button"
                    onClick={() => moveImageItem(index, -1)}
                    disabled={index === 0}
                    aria-label="Mover imagen a la izquierda"
                  >
                    <ArrowIcon direction="left" />
                  </button>
                  <button
                    className="file-order-btn"
                    type="button"
                    onClick={() => moveImageItem(index, 1)}
                    disabled={index === currentImageItems.length - 1}
                    aria-label="Mover imagen a la derecha"
                  >
                    <ArrowIcon direction="right" />
                  </button>
                  <button
                    className="file-delete-btn"
                    type="button"
                    onClick={() => removeImageItem(item.clientId)}
                    aria-label="Eliminar imagen"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))
          ) : objectUrls.length > 0 ? (
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
          {file?.length > 0 ||
          (images && images!.length > 0) ||
          (imageItems && imageItems.length > 0)
            ? "Subir imagen"
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

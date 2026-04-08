import { styled } from "styled-components";

const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;

  .file-input-label {
    padding: 0;
    background-color: ${(props) => props.theme.colors.mainColor};
    color: ${(props) => props.theme.colors.light};
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.3s;
    width: fit-content;
    min-width: 120px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;

    &:hover {
      background-color: transparent;
      color: ${(props) => props.theme.colors.mainColor};
      border: 2px solid ${(props) => props.theme.colors.mainColor};
    }
  }

  .file-input-label-delete {
    padding: 10px 20px;
    background-color: ${(props) => props.theme.colors.darkRed};
    color: ${(props) => props.theme.colors.light};
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.3s;
    width: 150px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;

    &:hover {
      background-color: transparent;
      color: ${(props) => props.theme.colors.darkRed};
      border: 2px solid ${(props) => props.theme.colors.darkRed};
    }
  }

  .file-name {
    margin-left: 15px;
    font-size: ${(props) => props.theme.fontsSize.__SSM};
    color: ${(props) => props.theme.colors.dark};
    font-weight: 700;
  }

  input[type="file"] {
    display: none;
  }

  .file-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    border: 2px;
    border-style: dashed;
    border-color: ${(props) => props.theme.colors.mainColor};
    border-radius: 20px;
    padding: 30px;
    width: 100%;
    height: auto;
    background: ${(props) => props.theme.colors.darkGrey};
  }

  .file-text {
    text-align: center;
    font-size: ${(props) => props.theme.fontsSize.__SSM};
  }

  .file-images {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    max-width: 100%;
  }

  .file-image-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }

  .file-image-actions {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .file-order-btn,
  .file-delete-btn {
    border: 1px solid ${(props) => props.theme.colors.mainColor};
    background: transparent;
    color: ${(props) => props.theme.colors.mainColor};
    border-radius: 8px;
    padding: 4px 8px;
    cursor: pointer;
    font-size: ${(props) => props.theme.fontsSize.__S};
  }

  .file-icon-svg {
    width: 18px;
    height: 18px;
    display: block;
  }

  .file-delete-btn {
    border-color: ${(props) => props.theme.colors.darkRed};
    color: ${(props) => props.theme.colors.darkRed};
  }
`;

export default FileInputWrapper;

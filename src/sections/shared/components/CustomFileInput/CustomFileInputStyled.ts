import { styled } from "styled-components";

const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;

  .file-input-label {
    padding: 10px 20px;
    background-color: ${(props) => props.theme.colors.mainColor};
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
      color: ${(props) => props.theme.colors.mainColor};
      border: 2px solid ${(props) => props.theme.colors.mainColor};
    }
  }

  .file-name {
    margin-left: 15px;
    font-size: ${(props) => props.theme.fontsSize.__SSM};
    color: ${(props) => props.theme.colors.light};
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
    height: 250px;
    background: ${(props) => props.theme.colors.darkGrey};
  }

  .file-text {
    text-align: center;
    font-size: ${(props) => props.theme.fontsSize.__SSM};
  }

  .file-images {
    display: flex;
    gap: 10px;
  }
`;

export default FileInputWrapper;

import styled from "styled-components";

const StForm = styled.form`
  max-width: 1200px;
  min-width: 500px;
  margin: 20px auto;
  padding: 20px;
  padding-bottom: 0px;
  background-color: white;
  display: flex;
  flex-direction: ${(props) => (props.$targetItem ? "column" : "row")};
  gap: 20px;
  border: 1px solid #5b5bf5;
  border-radius: 10px;
`;

const StDiv = styled.div`
  width: ${(props) => (props.$targetItem ? "80%" : "23%")};
  margin: ${(props) => (props.$targetItem ? "0 auto" : "0")};
`;
const StInput = styled.input`
  width: 100%;
  height: 20px;
  border: 1px solid ${(props) => (props.$valid ? "gray" : "red")};
  border-radius: 3px;
`;
const StValidDiv = styled.div`
  display: ${(props) => (props.$valid ? "none" : "")};
  color: ${(props) => (props.$valid ? "transparent" : "red")};
  font-size: small;
  width: 100%;
  height: 20px;
  content: attr(valid-text);
`;
const StButton = styled.button`
  width: 100px;
  min-width: 100px;
  height: 26px;
  margin-top: 25px;
  color: white;
  background-color: #5b5bf5;
  border: 1px solid white;
  border-radius: 5px;
  &:hover {
    background-color: #373797;
  }
  &:active {
    background-color: #5b5bf5;
  }
`;
const StBtnDiv = styled.div`
  width: 100%;
  max-width: ${(props) => (props.$targetItem ? "300px" : "100px")};
  min-width: 100px;
  margin-left: auto;
  margin-bottom: 10px;
  display: flex;
  justify-content: end;
  gap: 20px;
`;

export { StForm, StDiv, StInput, StValidDiv, StButton, StBtnDiv };

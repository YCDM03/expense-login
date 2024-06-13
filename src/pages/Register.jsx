import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { registUser } from "../axios/userApi";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nickname = formData.get("nickname");
    const id = formData.get("id");
    const password = formData.get("password");

    try {
      const { data } = await registUser(id, password, nickname);

      if (data.success) {
        alert("success");
        navigate("/");
      }
    } catch (error) {
      console.error("Register Error:", error);
      alert("Resister Error!");
    }
  };
  return (
    <StForm onSubmit={handleSubmit}>
      <StH2>가입하세요!</StH2>
      <StBox>
        <StLabel htmlFor="nickname">닉네임</StLabel>
        <StInput
          id="nickname"
          type="text"
          placeholder="nickname"
          name="nickname"
        />
      </StBox>
      <StBox>
        <StLabel htmlFor="id">아이디</StLabel>
        <StInput id="id" type="text" placeholder="id" name="id" />
      </StBox>
      <StBox>
        <StLabel htmlFor="password">비밀번호</StLabel>
        <StInput
          id="password"
          type="password"
          placeholder="password"
          name="password"
        />
      </StBox>
      <StBtn>가입하기</StBtn>
    </StForm>
  );
};
const StForm = styled.form`
  width: 400px;
  height: 40vh;
  margin: 30vh auto;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  border: 2px solid #5b5bf5;
  border-radius: 10px;
`;
const StH2 = styled.h2`
  text-align: center;
  font-size: 30px;
  font-weight: 700;
`;

const StBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const StLabel = styled.label``;

const StInput = styled.input`
  padding: 0 10px;
  height: 20px;
  border-radius: 5px;
  border: 1px solid gray;
`;
const StBtn = styled.button`
  height: 10%;
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

export default Register;

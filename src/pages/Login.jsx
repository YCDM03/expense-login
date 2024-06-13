// import { useMutation } from "@tanstack/react-query";
import { authApi } from "../axios/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { userLogin } from "../redux/slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const id = formData.get("id");
    const password = formData.get("password");

    try {
      const response = await authApi.post("/login", { id, password });
      const { accessToken, success } = response.data;

      if (success) {
        alert("Login Success!");
        dispatch(userLogin(accessToken));
      }
    } catch (error) {
      console.error(error.message);
      alert("Login Error");
    }
  };

  return (
    <StForm onSubmit={handleSubmit}>
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
      <StBtnBox>
        <StBtn>로그인</StBtn>
        <StBtn
          type="button"
          onClick={() => {
            navigate("/register");
          }}
        >
          회원가입
        </StBtn>
      </StBtnBox>
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
  border: 1px solid #5b5bf5;
  border-radius: 10px;
`;
const StBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const StBtnBox = styled.div`
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
  height: 40px;
  margin-top: 5%;
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

export default Login;

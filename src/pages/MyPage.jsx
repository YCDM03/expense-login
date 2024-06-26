import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { updateUser, userReset } from "../redux/slices/userSlice";
import { getUserData, updateUserProfile } from "../axios/userApi";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem("accessToken");
  const [nickname, setNickname] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newNickname = formData.get("nickname");
    const newAvatar = formData.get("avatar");

    if (nickname === newNickname && newAvatar.name === "") {
      return;
    }

    const updateProfile = async (formData, token) => {
      const { data } = await updateUserProfile(formData, token);
      const { avatar, nickname, success } = data;
      if (success) {
        dispatch(updateUser({ avatar: avatar ?? user.avatar, nickname }));
        alert("프로필이 업데이트 되었습니다!");
      }
    };
    updateProfile(formData, token);
  };

  useEffect(() => {
    const handleUser = async (token) => {
      try {
        const response = await getUserData(token);

        if (response.data.success) {
          setNickname(response.data.nickname);
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleUser(token);
  }, []);
  return (
    <StForm onSubmit={handleSubmit}>
      <StH2>프로필 수정</StH2>
      <StBox>
        <StLabel htmlFor="nickname">닉네임</StLabel>
        <StInput
          id="nickname"
          type="text"
          placeholder="nickname"
          name="nickname"
          defaultValue={nickname}
        />
      </StBox>
      <StBox>
        <StLabel htmlFor="avatar">프로필 사진</StLabel>
        <input
          id="avatar"
          type="file"
          name="avatar"
          accept="image/png, image/jpeg"
        />
      </StBox>
      <StBtn>프로필 업데이트</StBtn>
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

const StH2 = styled.h2`
  text-align: center;
  font-size: 28px;
  font-weight: 600;
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

export default MyPage;

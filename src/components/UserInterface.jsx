import { useDispatch, useSelector } from "react-redux";
import { loadUser, userReset } from "../redux/slices/userSlice";
import { useEffect } from "react";
import styled from "styled-components";
import { getUserData } from "../axios/userApi";
import { useNavigate } from "react-router-dom";

const UserInterface = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const nickname = user.nickname;
  const avatar = user.avatar;

  useEffect(() => {
    const handleOnload = async () => {
      const token = user.accessToken;
      try {
        const { data } = await getUserData(token);
        const { id: userId, nickname, avatar, success } = data;

        if (success) {
          dispatch(loadUser({ userId, nickname, avatar }));
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (user.loginStatus) {
      handleOnload();
    }
  }, []);

  return (
    <StUserBox>
      <StNickname>{nickname}</StNickname>
      <StAvatar src={avatar}></StAvatar>
    </StUserBox>
  );
};

const StUserBox = styled.div`
  display: flex;
  margin-left: auto;
  align-self: center;
`;
const StNickname = styled.div`
  color: white;
`;
const StAvatar = styled.img`
  box-sizing: border-box;
  margin: 0 5px;
  width: 30px;
  height: 30px;
  border: 2px solid white;
  border-radius: 15px;
  object-fit: scale-down;
`;
export default UserInterface;

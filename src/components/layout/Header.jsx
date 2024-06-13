import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../redux/slices/loginSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.login);

  return (
    <StHeader>
      <StBox>
        <StBtn
          onClick={() => {
            navigate("/");
          }}
          $category={true}
        >
          HOME
        </StBtn>
        {loginStatus ? (
          <StBtn
            onClick={() => {
              navigate("/mypage");
            }}
            $category={true}
          >
            MyPage
          </StBtn>
        ) : (
          ""
        )}
      </StBox>

      {loginStatus ? (
        <StBtn
          onClick={() => {
            if (confirm("로그아웃 하시겠습니까?")) {
              alert("you are now logged out!");
              dispatch(logout());
            }
          }}
        >
          Logout
        </StBtn>
      ) : (
        <StBtn
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </StBtn>
      )}
    </StHeader>
  );
};
const StHeader = styled.header`
  width: 100%;
  height: 60px;
  background-color: #5b5bf5;
  display: flex;
  justify-content: space-between;
`;
const StBox = styled.div`
  display: flex;
`;
const StBtn = styled.button`
  width: 100px;
  min-width: 100px;
  height: ${(props) => (props.$category ? "100%" : "30px")};
  margin: ${(props) => (props.$category ? "0" : "auto 10px")};
  color: white;
  background-color: #5b5bf5;
  border: ${(props) => (props.$category ? "0" : "1px")} solid white;
  border-radius: ${(props) => (props.$category ? "0" : "5px")};
  &:hover {
    background-color: #373797;
  }
  &:active {
    background-color: #5b5bf5;
  }
`;
export default Header;

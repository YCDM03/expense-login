import { authApi } from "./api";

// post요청으로 바디에 유저정보를 보내서 가입하는 코드(서버를 통해 db에 등록) , 토큰을 인자로 전달하기
const registUser = async (id, password, nickname) => {
  return await authApi.post("/register", {
    id,
    password,
    nickname,
  });
};

// get요청으로 헤더에 토큰 보내서 유저 id, nickname, avatar 정보를 가져오는 코드
const getUserData = async () => {
  return await authApi.get("/user");
};

// post요청으로 id,pw를 보내서 로그인해서 토큰을 발급받는 코드
const getUserToken = async (id, password) => {
  return await authApi.post("/login?expiresIn=60m", { id, password });
};

// patch요청으로 헤더에 토큰, 바디에 formData보내서 아바타, 닉네임을 업데이트하는 코드
const updateUserProfile = async (formData) => {
  return await authApi.patch("/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { registUser, getUserData, getUserToken, updateUserProfile };

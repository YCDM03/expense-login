import axios from "axios";

const jsonApi = axios.create({
  baseURL: "https://selective-creative-plot.glitch.me/",
});

const authApi = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
});
authApi.interceptors.request.use(
  (config) => {
    // 헤더에 토큰 넣기
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
authApi.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const {
      response: { status },
    } = err;
    if (status === 401) {
      alert("토큰이 만료 되었습니다. 다시 로그인 해주세요!");
      localStorage.removeItem("accessToken");
      window.location.replace("/");
    }
  }
);

export { jsonApi, authApi };

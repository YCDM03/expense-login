import axios from "axios";

const jsonApi = axios.create({
  baseURL: "http://localhost:4000",
});
const authApi = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
});

export { jsonApi, authApi };

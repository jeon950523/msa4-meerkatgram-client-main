import axios from "axios";
import { useAuthStore } from "../store/auth/useAuthStore";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const myAxios = axios.create({
  // Axios 호출 시, url 가장 앞에 자동으로 연결해서 동작
  baseURL: import.meta.env.VITE_API_BASE_URL,
  
  headers:{
    'Content-Type': 'application/json',
  },
  // 크로스 도메인(서로 다른 도메인)에 요청을 보낼때, credential 정보를 담아서 보낼지 여부를 결정
  // credential 정보: cookies, header Authorization 항목 등
  withCredentials:true,
  
});

myAxios.interceptors.request.use(async (config)=>{
  const authstore = useAuthStore();
  let accessToken = authstore.accessToken;
  const denyUrl = /^\/api\/reissue-token$/; // 리트라이 제외 URL 설정

  if(!denyUrl.test(config.url) && authstore.isLoggedIn){
    // 엑세스 토큰 만료 확인
    const claims = jwtDecode(accessToken);
    const now = dayjs().unix();
    const expiredTime = dayjs.unix(claims.exp).add(-5, "minute").unix();
    if(now >= expiredTime){
      try {
        await authstore.reissue();
        accessToken = authstore.accessToken
      } catch (error) {
        console.error(error?.response);
      }
    }
  }
  if(accessToken){
  config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;


});

export default myAxios;

import { defineStore } from "pinia";
import { ref } from "vue";
import myAxios from "../../api/myAxios";
import { useMyErrorStore } from "../error/useMyErrorStore";
import { email } from "../../api/util/validator/rule/userRule";



export const useAuthStore = defineStore('authStore',()=>{
  // 1. State
  const isLoggedIn = ref(false);
  const accessToken=  ref('');
  const userInfo = ref(null);

  // 2.Getters

  // 3.Actions
  const clearAuthStore = ()=>{
    isLoggedIn.value = false;
    accessToken.value = '';
    userInfo.value = null;
  }

  const login = async(loginForm)=>{
    try{
      const url = '/api/login';

      const res = await myAxios.post(url, loginForm);
       console.log('로그인 응답:', res.data);
      const data = res.data.data;
      accessToken.value = data.accessToken;
      userInfo.value = data.user;
      isLoggedIn.value = true;
      console.log('로그인 상태:', isLoggedIn.value);
    }catch(error){
      console.log(error);
      
      throw error;

    }
  }

  const reissue = async ()=>{
    try {
      const url = '/api/reissue-token';
      const res = await myAxios.post(url);
      // const res = await myAxios.post('/api/reissue-token');
      const data = res.data.data;
      accessToken.value = data.accessToken;
      userInfo.value = data.user;
      isLoggedIn.value = true;
    
    } catch (error) {
      clearAuthStore();
      // useMyErrorStore().setErrorInfo(error);
    }
  }

  const logout = async ()=>{
    try {
      const url ='/api/logout';
      await myAxios.post(url);

    } catch (error) {
      console.error(error);
    }
    finally{
      clearAuthStore();
    }
  }

  const registration = async (data)=>{
    try {
      const url = '/api/registration';
      
      await myAxios.post(url, data);
      return;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  const changeUserEmail = async (email)=>{
    try {
      const url = '/api/users/email'
      const res = await myAxios.patch(url,{email});
      const changedEmail = res.data.data;
      userInfo.value.email = changedEmail;
      return changedEmail;
    } catch (error) {
      throw error;
      
    }
  }
const increasePostCount = ()=>{
  if(!userInfo.value){
    return;
  }
  userInfo.value.countPosts +=1;
}
const decreasePostCount = ()=>{
  if(!userInfo.value){
    return;
  }
  if(userInfo.value.countPosts > 0){
    userInfo.value.countPosts -=1;}
}
  return{
    // State
    isLoggedIn,
    accessToken,
    userInfo,
    
    //Getters

    //Actions
    login,
    reissue,
    logout,
    registration,
    changeUserEmail,
    increasePostCount,
    decreasePostCount,
  }

});

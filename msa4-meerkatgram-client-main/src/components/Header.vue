<script setup>
import { ref } from 'vue';
import MyButton from './buttons/MyButton.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth/useAuthStore.js';

const authStore = useAuthStore();

const router = useRouter();

const redirectMain = ()=>{
  router.push('/');
}

const redirectLogin = ()=>{
  router.push('/login');
}
const redirectRegistration=()=>{
  router.push('/registration');
}

const logout = async ()=>{
  await authStore.logout() ;
  router.replace('/');
}

</script>

<template>
  <div class="header">
    <div class="title-box">
      <h1 class="title" @click="redirectMain()">Meerkatgram</h1>
    </div>  
    <div class="btn-box">
      <MyButton 
        @click="redirectLogin()"
        v-if="!authStore.isLoggedIn"
        :content="'Sign In'"
        :color="'gray'"
        :size="'small'"
        />
      <MyButton 
        v-if="!authStore.isLoggedIn"
        :content="'Sign Up'"
        :color="'white'"
        :size="'small'"
        @click="redirectRegistration()"/>
      <MyButton 
        v-if="authStore.isLoggedIn"
        :content="'Log Out'"
        :color="'black'"
        :size="'small'"
        @click="logout()"/>
    </div>
  </div>
  <hr>
</template>

<style scoped>
.title{
  font-size: 20px;
  cursor: pointer;
}
.header{
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.title-box{
  display: flex;
  align-items: center;
}
.btn-box{
  display: flex;
  gap: 10px;

}
</style>


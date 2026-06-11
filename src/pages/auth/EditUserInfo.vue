<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { useRouter } from 'vue-router';
import { useMyErrorStore } from '../../store/error/useMyErrorStore';
import MyButton from '../../components/buttons/MyButton.vue';

const authStore = useAuthStore();
const router = useRouter();
const myErrorStore = useMyErrorStore();
const email =ref(authStore.userInfo.email||'');


const changeEmail = async ()=>{
  if(!email.value.trim()){
    alert('이메일을 입력해 주세요.');
    return;
  }
  try {
    await authStore.changeUserEmail(email.value);
    alert('이메일이 변경되었습니다.');
    router.replace('/posts');
  } catch (error) {
    const data = error.response?.data;
    if (data?.code === 'E11') {
      alert(data.data||'이미 사용중인 이메일 입니다.')
      return
    }
    if (data?.code ==='E21') {
      alert('이메일 형식이 올바르지 않습니다.')
      return;
    }
    myErrorStore.setErrorInfo(error);
    router.replace('/error');
  } 
}

</script>

<template>
 <form class="container" @submit.prevent="changeEmail">
    <h2>내 정보 수정</h2>

    <div class="current-email">
      현재 이메일: {{ authStore.userInfo?.email }}
    </div>

    <input
      v-model="email"
      type="email"
      placeholder="변경할 이메일을 입력하세요"
      class="email-input"
    >

    <MyButton
      :content="'이메일 변경'"
      :color="'black'"
      :size="'big'"
      :btnType="'submit'"
      
    />

    <MyButton
      :content="'돌아가기'"
      :color="'gray'"
      :size="'big'"
      @click.prevent="router.back()"
    />
 </form>
</template>

<style scoped>
.container {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.current-email {
  font-size: 14px;
}

.email-input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth/useAuthStore';

const authStore = useAuthStore();
const router = useRouter();
const redirectPostCreate = () => {
  router.push('/posts/create');
}
const redirectMyPost = ()=>{
  router.push('/posts/my');
}
const redirectUserinfo = ()=>{
  router.push('/users/edit')
}
</script>

<template>
<div class="container"
      v-if="authStore.isLoggedIn && authStore.userInfo">
  <div class="profile-box">
    <div class=" bg-image-circle profile" :style="{backgroundImage:`url(${authStore.userInfo.profile})`}">
    </div>
  </div>
  <div class="info-box">
    <div class="nick">{{ authStore.userInfo.nick }}</div>
    <div class="write-count">posts {{ authStore.userInfo.countPosts }}</div>
    <div class="redirect-box">
      <div class="redirect-icon-posts-index bg-image-square" 
           style="background-image: url('/icons/free-icon-gallery.png');"
           @click="redirectMyPost"
           title="내 게시글 보기"
           >
      </div>
      <div class="redirect-icon-posts-create bg-image-square" 
           style="background-image: url('/icons/free-icon-plus-sign.png');"
           @click="redirectPostCreate"
           title="게시글 작성하기">
      </div>
      <div class="redirect-icon-user-info bg-image-square" 
           style="background-image: url('/icons/free-icon-person.png');"
           @click="redirectUserinfo"
           title="이메일 바꾸기">
      </div>
    </div>
  </div>
  <hr>
</div>
</template>

<style scoped>
.container{
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}
.redirect-box{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.info-box{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.container > hr {
  grid-column: 1/-1;
  width: 100%;
}
.redirect-icon-posts-create{
  cursor: pointer;
}
.redirect-icon-posts-index{
  cursor: pointer;
}
.redirect-icon-user-info{
  cursor: pointer;
}
</style>

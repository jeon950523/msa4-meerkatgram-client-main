<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth/useAuthStore';

const authStore = useAuthStore();
const router = useRouter();
const redirectPostCreate = () => {
  router.push('/posts/create');
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
           >
      </div>
      <div class="redirect-icon-posts-create bg-image-square" 
           style="background-image: url('/icons/free-icon-plus-sign.png');"
           @click="redirectPostCreate">
      </div>
      <div class="redirect-icon-user-info bg-image-square" 
           style="background-image: url('/icons/free-icon-person.png');">
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
</style>

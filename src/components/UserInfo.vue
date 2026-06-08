<script setup>
import { useAuthStore } from '../store/auth/useAuthStore';

const authStore = useAuthStore();

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
           style="background-image: url('/public/icons/free-icon-gallery.png');"
           >
      </div>
      <div class="redirect-icon-posts-create bg-image-square" 
           style="background-image: url('/public/icons/free-icon-plus-sign.png');">
      </div>
      <div class="redirect-icon-user-info bg-image-square" 
           style="background-image: url('/public/icons/free-icon-person.png');">
      </div>
    </div>
  </div>
</div>
<hr>
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

</style>

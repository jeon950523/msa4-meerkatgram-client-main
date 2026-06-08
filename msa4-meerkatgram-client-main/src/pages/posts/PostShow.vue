<script setup>
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePostShowStore } from '../../store/post/usePostShowStore';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { useMyErrorStore } from '../../store/error/useMyErrorStore';

const route = useRoute();
const router = useRouter();
const postShowStore=usePostShowStore();
const authStore = useAuthStore();
const myErrorStore = useMyErrorStore();

onBeforeMount(async()=>{
  try {
    await postShowStore.getPost(route.params.id);
  } catch (error) {
    myErrorStore.setErrorInfo(error);
    router.replace('/error')
    
  }
})
onBeforeUnmount(postShowStore.clearPostShow);
</script>

<template>
<div class="container" v-if="postShowStore.post">
  <div class="image" :style="{backgroundImage:`url(${postShowStore.post.image})`}"></div>
  <div class="option-box">
    <div class="delete-box">
      <div class="delete-icon" v-if="postShowStore.post.userId === authStore.userInfo.id"></div>
    </div>
    <!-- <div v-else></div> v-else 또는 delete-icon을 div로 한번감싸서 아이콘이 사라져도 자식요소는 그대로 남기기 -->
    <div class="like-box">
      <span>1919</span>
      <div class="like-icon"></div>
    </div>
  </div>
  <p class="content"> {{postShowStore.post.content}}</p>

</div>
</template>

<style scoped>
.container{
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.image{
  padding-top: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
}
.delete-icon{
  width: 40px;
  height: 50px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url('/icons/free-icon-trash-can-bin.png');
}
.like-icon{
  width: 40px;
  height: 40px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url('/icons/heart-fill.png');
}
.option-box{
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
}
.like-box{
  display: flex;
  gap: 10px;
}

.content{
  white-space: pre-wrap;
}

</style>

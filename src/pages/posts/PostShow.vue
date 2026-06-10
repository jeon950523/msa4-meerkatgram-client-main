<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePostShowStore } from '../../store/post/usePostShowStore';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { useMyErrorStore } from '../../store/error/useMyErrorStore';

const route = useRoute();
const router = useRouter();
const postShowStore=usePostShowStore();
const authStore = useAuthStore();
const myErrorStore = useMyErrorStore();

const isDeleteModal = ref(false);
const openDeleteModal = ()=>{
  isDeleteModal.value = true;
}
const closeDeleteModal=()=>{
  isDeleteModal.value = false;
}

onBeforeMount(async()=>{
  try {
    await postShowStore.getPost(route.params.id);
  } catch (error) {
    myErrorStore.setErrorInfo(error);
    router.replace('/error')
    
  }
})
onBeforeUnmount(postShowStore.clearPostShow);

const handleDelete = async ()=>{
  try {
    await postShowStore.deletePost(route.params.id);
    authStore.decreasePostCount();
    alert('게시글이 삭제 되었습니다.');
    router.replace('/posts');
  } catch (error) {
    const data = error.response?.data;

    if(data?.code === 'E03'){
      alert(data.data||'삭제 권한이 없습니다.');
      closeDeleteModal();
      return;
    }
    if(data?.code === 'E10'){
      alert(data.data||'이미 삭제된 게시글입니다.');
      router.replace('/posts');
      return;
    }
    myErrorStore.setErrorInfo(error);
      router.replace('/error');
  }
}

</script>

<template>
<div class="container" v-if="postShowStore.post">
  <div class="image" :style="{backgroundImage:`url(${postShowStore.post.image})`}"></div>
  <div class="option-box">
    <div class="delete-box">
      <div class="delete-icon" v-if="postShowStore.post.userId === authStore.userInfo.id" @click="openDeleteModal"></div>
    </div>
    <!-- <div v-else></div> v-else 또는 delete-icon을 div로 한번감싸서 아이콘이 사라져도 자식요소는 그대로 남기기 -->
    <div class="like-box">
      <span>1919</span>
      <div class="like-icon"></div>
    </div>
  </div>
  <p class="content"> {{postShowStore.post.content}}</p>

  <div v-if="isDeleteModal" class="modal-open">
    <div class="modal-box">
      <h3>게시글 삭제</h3>
      <p>정말 삭제 하시겠습니까?</p>
      <div class="modal-btn-box">
        <button type="button" class="cancel-btn" @click="closeDeleteModal">취소</button>
        <button type="button" class="delete-btn" @click="handleDelete">삭제</button>
      </div>
    </div>
  </div>

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
  background-size: contain;
  border-radius: 10px;
}
.delete-icon{
  width: 40px;
  height: 50px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url('/icons/free-icon-trash-can-bin.png');
  cursor: pointer;
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
.modal-open{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.modal-box{
  width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  text-align: center;
}

.modal-btn-box{
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn,
.delete-btn{
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.cancel-btn{
  background-color: #ddd;
}

.delete-btn{
  background-color: black;
  color: white;
}

</style>

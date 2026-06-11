<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import MyButton from '../../components/buttons/MyButton.vue';
import myAxios from '../../api/myAxios.js';
import { usePostIndexStore } from '../../store/post/usePostIndexStore.js';
import { useRouter } from 'vue-router';
import { useMyErrorStore } from '../../store/error/useMyErrorStore.js';

const myErrorStore=useMyErrorStore();
const router = useRouter();
const postIndexStore = usePostIndexStore();

const getPagination = async (page = 1) =>{
  try {
    await postIndexStore.getPostPagenation(page);
  } catch (error) {
    myErrorStore.setErrorInfo(error);
    router.replace('/error');
  }
}
const getNextPage = async () => {
    await getPagination(postIndexStore.getNextPageNumber);
  }
const redirectShow = (id)=>{
  router.push(`/posts/${id}`)
}

// 라이프 사이클
onBeforeMount(getPagination);
onBeforeUnmount(postIndexStore.clearPostIndex);

</script>

<template>
<div class="card-container">
  <div class="card" 
       v-for="item in postIndexStore.items"
       @click="redirectShow(item.id)" 
       :key="item.id" 
       :style="{backgroundImage: `url(${item.image})`}"></div>
</div>
<MyButton v-if="!postIndexStore.isLastPage" :color="'gray'" :size="'big'" :content="'show more posts from Kanna_Kamui'" @click="getNextPage()"/>
</template>

<style scoped>
.card-container{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  padding: 10px;
  gap: 10px;
}
.card{
  border-radius: 10px;
  padding-top: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>

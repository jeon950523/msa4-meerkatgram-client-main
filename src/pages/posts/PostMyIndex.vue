<script setup>
import { useRouter } from 'vue-router';
import { useMyErrorStore } from '../../store/error/useMyErrorStore';
import { usePostMyIndexStore } from '../../store/post/usePostMyIndexStore';
import MyButton from '../../components/buttons/MyButton.vue';
import { onBeforeMount, onBeforeUnmount } from 'vue';

const myErrorStore=useMyErrorStore();
const router = useRouter();
const postMyIndexStore = usePostMyIndexStore();

const redirectShow = (id)=>{
  router.push(`/posts/${id}`)
}
const previous = ()=>{
  router.push('/posts')
}

// 라이프 사이클
onBeforeMount(async()=>{ 
try {
  await postMyIndexStore.getMyPosts();

} catch (error) {
  myErrorStore.setErrorInfo(error)  ;
  router.replace('/error');
}
});
onBeforeUnmount(()=>{
  postMyIndexStore.clearMyPosts();
})
</script>

<template>
<div class="card-container" v-if="postMyIndexStore.items.length > 0">
  <div class="card" 
       v-for="item in postMyIndexStore.items"
       @click="redirectShow(item.id)" 
       :key="item.id" 
       :style="{backgroundImage: `url(${item.image})`}"></div>
</div>
<p v-else class="empty-message">작성한 게시글이 없습니다.</p>
<MyButton :color="'gray'" :size="'big'" :content="'돌아가기'" @click="previous"/>
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
.empty-message{
 font-size: 30px;
}
</style>

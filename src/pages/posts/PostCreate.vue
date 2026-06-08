<script setup>
import { useRouter } from 'vue-router';
import MyButton from '../../components/buttons/MyButton.vue';
import { usePostCreateStore } from '../../store/post/usePostCreateStore.js';
import { useFileStore } from '../../store/file/useFileStore.js';
import { useMyErrorStore } from '../../store/error/useMyErrorStore.js';
import { reactive, ref } from 'vue';


const postCreateStore = usePostCreateStore();
const router = useRouter();
const fileStore = useFileStore();
const myErrorStore = useMyErrorStore();
const preview = ref('');
const postData = reactive({
  content:'',
  image:''
})

const handleChangePostImage = async(e)=>{
  const file = e.target.files[0];

  if(!file){
    return;
  }
  const fileUri = await fileStore.uploadPostImage(file);
  if(!fileUri){
    alert('이미지 업로드에 실패했습니다.')
    return;
  }
  postData.image = fileUri;
  preview.value = URL.createObjectURL(file);
}
const handleSubmit = async ()=>{
  if(!postData.content.trim()){
    alert('게시글은 필수입니다.');
    return;
  }
  if(!postData.image){
    alert('이미지는 필수입니다.')
    return;
  }
  try {
    await postCreateStore.createPost(postData);
    alert('게시글이 작성되었습니다.');
    router.replace('/posts');
  } catch (error) {
    if(data?.code==='E21'){
      const data = error.response?.data;
      alert(JSON.stringify(data.data, null, 2));
      return;
    }
    myErrorStore.setErrorInfo(error);
    router.replace('/error');
  }
}

</script>

<template>
  <form class="container" @submit.prevent="handleSubmit">
    <label for="post-image" class="image-box">
      <input type="file" accept="image/*" @change="handleChangePostImage" class="file-input" id="post-image">
      <div class="preview" v-if="preview" :style="{backgroundImage:`url(${preview})`}"></div>
      <div class="empty-preview" v-else>이미지를 선택해 주세요.</div>
    </label>
    <textarea class="content-input" v-model="postData.content" placeholder="내용을 입력해 주세요."></textarea>

<MyButton
:btn-type="'submit'"
:color="'black'"
:content="'게시글 작성'"
:size="'big'"/>
</form>
</template>

<style scoped>
.container {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.image-box {
  cursor: pointer;
  display: block;
}

.preview,
.empty-preview {
  width: 100%;
  padding-top: 100%;
  border-radius: 10px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.empty-preview {
  padding-top: 0;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #999;
}

.content-input {
  min-height: 150px;
  resize: none;
  padding: 10px;
  border-radius: 10px;
}
.file-input{
  display: none;
}
</style>

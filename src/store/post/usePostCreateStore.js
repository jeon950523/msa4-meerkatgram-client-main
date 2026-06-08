import { defineStore } from "pinia";
import myAxios from "../../api/myAxios";

export const usePostCreateStore = defineStore('postCreate',()=>{
  const createPost = async(data)=>{
    try {
      const url = '/api/posts'
      await myAxios.post(url,data);
    } catch (error) {
      throw error;
    }
  }
  return {
    createPost,

  }
});

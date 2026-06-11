import { defineStore } from "pinia";
import myAxios from "../../api/myAxios";
import { ref } from "vue";

export const usePostMyIndexStore = defineStore('postMyIndexStore',()=>{
// 1.State (ref)
  const items = ref([]);
  
  // 2. Getters (computed)

  // 3. Actions (function)
  const clearMyPosts= ()=>{
    items.value=[];
  }
  const getMyPosts = async () => {
      try {
        const url = '/api/posts/my';
        const res = await myAxios.get(url);
        const data = res.data.data;
        
        items.value = data;
      } catch(error) {
        console.error(error)
        throw error;

      }
  }
  return {
    // state
    items,
   
    // getters

    // actions
    getMyPosts,
    clearMyPosts,

  }
});

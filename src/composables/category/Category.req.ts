import { ref } from 'vue';
import { getAllCategories } from 'src/composables/category/Category.api';

export const fetchCategories = () => {
  const category = ref()
  const loading = ref(true)
  getAllCategories().then((response)=>{
    category.value = response
  }).catch((err)=> console.log(err)).finally(()=>loading.value = false)
  return {category,loading};
};

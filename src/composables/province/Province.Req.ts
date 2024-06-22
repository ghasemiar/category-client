import { ref } from 'vue';
import { getAllProvinces } from 'src/composables/province/Province.api';

export const fetchProvinces = () => {
  const province = ref()
  const loading = ref(true)
  getAllProvinces().then((response)=>{
    province.value = response
  }).catch((err)=> console.log(err)).finally(()=>loading.value = false)
  return {province,loading};
};

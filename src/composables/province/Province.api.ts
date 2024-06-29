import { fetchAllData } from 'src/helper/AxiosHelper';
import { reactive,toRefs } from 'vue';
import { data } from 'autoprefixer';

export const getAllProvince = ()=>{
  const state = reactive({data:{},loading:true});
  fetchAllData("province",).then((response)=>{
    if (response != undefined){
      state.data = response.data
    }
  }).catch((err)=> console.log(err)).finally(()=>state.loading = false)
  return toRefs(state)
}

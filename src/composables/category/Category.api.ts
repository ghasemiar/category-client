import { fetchAllData } from 'src/helper/AxiosHelper';
import { reactive,toRefs } from 'vue';
import { data } from 'autoprefixer';

export const getAllCategories = (provinceId:number)=>{
  const state = reactive({data:{},loading:true});
  fetchAllData("category",{provinceId:provinceId}).then((response)=>{
    if (response != undefined){
      state.data = response.data.data
    }
  }).catch((err)=> console.log(err)).finally(()=>state.loading = false)
  return toRefs(state)
}

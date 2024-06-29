import { fetchAllData } from 'src/helper/AxiosHelper';
import { reactive, toRefs } from 'vue';

export const getAllCities = async (provinceId:number)=>{
  const state = reactive({data:[],loading:true});
  await fetchAllData("city",{provinceId:provinceId}).then((response)=>{
    if (response != undefined){
      state.data = response.data
    }
  }).catch((err)=> console.log(err)).finally(()=>state.loading = false)

  return toRefs(state)
}

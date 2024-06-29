import { fetchAllData } from 'src/helper/AxiosHelper';
import { reactive,toRefs } from 'vue';

export const getAllJobs = ()=>{
  const state = reactive({data:{},loading:true});
  fetchAllData("job",).then((response)=>{
    if (response != undefined){
      state.data = response.data
    }
  }).catch((err)=> console.log(err)).finally(()=>state.loading = false)
  return toRefs(state)
}

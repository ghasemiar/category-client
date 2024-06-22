import { getAllJobs, } from 'src/composables/job/Job.api';
import { ref } from 'vue';

export const fetchJobs = () => {
  const job = ref()
  const loading = ref(true)
  getAllJobs().then((response)=>{
    job.value = response
  }).catch((err)=> console.log(err)).finally(()=>loading.value = false)
  return {job,loading};
};

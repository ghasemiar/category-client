import { ref } from 'vue';
import { getAllCountries } from 'src/composables/country/Country.api';

export const fetchCountries = () => {
  const country = ref()
  const loading = ref(true)
  getAllCountries().then((response)=>{
    country.value = response
  }).catch((err)=> console.log(err)).finally(()=>loading.value = false)
  return {country,loading};
};

import { onMounted, reactive, ref, toRefs } from 'vue';
import { getAllCitiesService } from 'src/composables/city/City.api';
export interface CityResponseI {
  id:number,
  name:string,
  lat:number,
  lng:number
}
export const fetchCities = async (provinceId: number) => {
  // const city = ref();
  // const loading = ref(true);
  // getAllCities(provinceId)
  //   .then((response) => {
  //     city.value = response;
  //   })
  //   .catch((err) => console.log(err))
  //   .finally(() => (loading.value = false));
  // return { city, loading };
  const {fetchData} = getAllCitiesService()
  const state = reactive<{loading:boolean,data:any}>({
    loading : false,
    data : undefined
  })

    state.loading = true
    await fetchData('city',{provinceId},).then((response)=>{
      state.data = response
    }).catch((err)=>{alert(err)}).finally(()=>{state.loading = false})

  return {...toRefs(state)}
};

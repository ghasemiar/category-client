import { ref } from 'vue';
import { getAllCities } from 'src/composables/city/City.api';

export const fetchCities = (provinceId: number) => {
  const city = ref();
  const loading = ref(true);
  getAllCities(provinceId)
    .then((response) => {
      city.value = response;
    })
    .catch((err) => console.log(err))
    .finally(() => (loading.value = false));
  return { city, loading };
};

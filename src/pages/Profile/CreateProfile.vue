<template>
  <div class="tw-container tw-mx-auto">
    <q-form @submit="onSubmit">
      <q-select
        v-model="sex"
        :options="sexOption"
        option-label="value"
        option-value="key"
        label="sex"
        v-bind="sexAttr"
      />
      <div>{{ errors.sex }}</div>

      <q-btn type="submit" label="Login" />
    </q-form>
    <RouterLink to="login">you already have an account</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from 'stores/auth.store';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { useRouter } from 'vue-router';
import { fetchCities } from 'src/composables/city/City.Req';
import { fetchJobs } from 'src/composables/job/Job.Req';
import { fetchProvinces } from 'src/composables/province/Province.Req';
import { fetchCountries } from 'src/composables/country/Country.Req';
import { ref } from 'vue';
import { sexOption } from 'src/composables/options';

const router = useRouter();
const authStore = useAuthStore();
const cityOption = ref();
const citiesLoading = ref(false);
const { province: provinceOption, loading: provinceLoading } = fetchProvinces();
const { job: jobOption, loading: jobLoading } = fetchJobs();
const { country: countryOption, loading: countryLoading } = fetchCountries();
const getCitybyProvince = async (provinceId: number) => {
  const { city, loading: cityLoading } = await fetchCities(provinceId);
  cityOption.value = city.value;
  citiesLoading.value = cityLoading.value;
};
const schema = toTypedSchema(
  yup.object({
    sex: yup.object().required('sex is required'),
    birthday: yup.date().min(new Date(1300, 1, 1)).max(new Date()),
    image: yup.mixed().nullable(),
    country: yup.object().required('country is required'),
    province: yup.object().required('province is required'),
    city: yup.object().required('city is required'),
    job: yup.object().required('job is required'),
  })
);

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: schema,
});

const [sex, sexAttr] = defineField('sex');
const [birthday, birthdayAttr] = defineField('birthday');
const [image, imageAttr] = defineField('image');
const [country, countryAttr] = defineField('country');
const [province, provinceAttrs] = defineField('province');
const [city, cityAttrs] = defineField('city');
const [job, jobAttrs] = defineField('job');

const onSubmit = handleSubmit(async (values) => {
  try {
    // Form submission logic here
    // const formData = new FormData();
    // formData.append('sex', values.sex);
    // formData.append('description', values.birthday);
    // formData.append('year', values.country);
    // formData.append('price', values.province);
    // formData.append('category', values.city.id);
    // formData.append('brand', values.job.id);
    // formData.append('image', values.image[0]);

    alert('Product created successfully');
  } catch (error) {
    console.error('Failed to create product:', error);
  }
});
</script>

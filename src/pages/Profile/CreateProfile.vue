<template>
  <div class="tw-mx-[100px] tw-mt-10">
    <q-form @submit="onSubmit">
      <div class="tw-grid tw-grid-cols-2 tw-gap-5"><div><q-select
        v-model="sex"
        class="tw-mt-4"
        :options="sexOption"
        option-label="value"
        option-value="key"
        label="sex"
        v-bind="sexAttr"
      /><div class="tw-text-red-600">{{ errors.sex }}</div></div>
        <div><q-select
          v-model="job"
          :options="jobOption"
          option-label="name"
          option-value="id" class="tw-mt-4"
          label="job"
          v-bind="jobAttrs"
        /><div class="tw-text-red-600">{{ errors.job }}</div></div>
        <div><q-select
          v-model="country"
          :options="countryOption"
          option-label="name"
          option-value="id" class="tw-mt-4"
          label="Country"
          v-bind="countryAttr"
        /><div class="tw-text-red-600">{{ errors.country }}</div></div>
        <div><q-select
          v-model="province"
          :options="provinceOption"
          option-label="name"
          option-value="id" class="tw-mt-4"
          label="province"
          v-bind="provinceAttrs"
        />
          <div class="tw-text-red-600">{{ errors.province }}</div></div>
        <div><q-select
          v-model="city"
          :options="cityOption"
          option-label="name"
          option-value="id" class="tw-mt-4"
          label="city"
          v-bind="cityAttrs"
        />
          <div class="tw-text-red-600">{{ errors.city }}</div></div>
        <div><q-input class="tw-mt-4" label="birthday" filled v-model="birthday" mask="date" v-bind="birthdayAttr" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="birthday">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input><div class="tw-text-red-600">{{ errors.birthday }}</div></div>
        <div><q-file filled bottom-slots :multiple="false" v-model="image" max-file-size="1024" accept="image/*" label="Image" counter v-bind="imageAttr">
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click.stop.prevent="image = null" class="cursor-pointer" />
          </template>
        </q-file></div>
        </div>
      <div class="tw-bg-red-400 tw-w-full tw-h-[600px] tw-mt-10"><Map/></div>
      <q-btn type="submit" label="Login" />
    </q-form>
    <RouterLink to="login">you already have an account</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { fetchCities } from 'src/composables/city/City.Req';
import { fetchJobs } from 'src/composables/job/Job.Req';
import { fetchProvinces } from 'src/composables/province/Province.Req';
import { fetchCountries } from 'src/composables/country/Country.Req';
import { ref, watch } from 'vue';
import { sexOption } from 'src/composables/options';
import Map from 'components/Map.vue';
const cityOption = ref();
const citiesLoading = ref(false);
const { province: provinceOption, loading: provinceLoading } = fetchProvinces();
const { job: jobOption, loading: jobLoading } = fetchJobs();
const { country: countryOption, loading: countryLoading } = fetchCountries();

const getCities = async (id:number)=>{
  const { data,loading } = await fetchCities(id);
  cityOption.value = data.value;
  citiesLoading.value = loading.value;
}
const schema = toTypedSchema(
  yup.object({
    sex: yup.object().required('sex is required'),
    birthday: yup.string().required(),
    image:yup.mixed(),
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
watch(province, () => {
  if(province){
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    getCities(province.value.id)
  }
})
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

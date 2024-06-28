<template>
  <q-form @submit="onSubmit">
    <p>Latitude: {{ coordinates.lat }}</p>
    <p>Longitude: {{ coordinates.lng }}</p>
    <div class="tw-grid tw-grid-cols-2 tw-gap-5">
      <div>
        <q-select
          v-model="sex"
          class="tw-mt-4"
          :options="sexOption"
          option-label="value"
          option-value="key"
          label="sex"
          v-bind="sexAttr"
        />
        <div class="tw-text-red-600">{{ errors.sex }}</div>
      </div>
      <div>
        <q-select
          v-model="job"
          :options="jobOption"
          option-label="name"
          option-value="id"
          class="tw-mt-4"
          label="job"
          v-bind="jobAttrs"
        />
        <div class="tw-text-red-600">{{ errors.job }}</div>
      </div>
      <div>
        <q-select
          v-model="country"
          :options="countryOption"
          option-label="name"
          option-value="id"
          class="tw-mt-4"
          label="Country"
          v-bind="countryAttr"
        />
        <div class="tw-text-red-600">{{ errors.country }}</div>
      </div>
      <div>
        <q-select
          v-model="province"
          :options="provinceOption"
          option-label="name"
          option-value="id"
          class="tw-mt-4"
          label="province"
          v-bind="provinceAttrs"
        />
        <div class="tw-text-red-600">{{ errors.province }}</div>
      </div>
      <div>
        <q-select
          v-model="city"
          :options="cityOption"
          option-label="name"
          option-value="id"
          class="tw-mt-4"
          label="city"
          v-bind="cityAttrs"
        />

        <div class="tw-text-red-600">{{ errors.city }}</div>
      </div>
      <div>
        <q-input
          class="tw-mt-4"
          label="birthday"
          filled
          v-model="birthday"
          mask="date"
          v-bind="birthdayAttr"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="birthday">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <div class="tw-text-red-600">{{ errors.birthday }}</div>
      </div>
      <q-input v-model="image" label="image" type="file" />
      <div class="tw-text-red-600">{{ errors.image }}</div>
    </div>
    <div v-if="city" class="tw-bg-red-400 tw-w-full tw-h-[600px] tw-mt-10">
      <Map
        :lat-props="city?.lat"
        :lng-props="city?.lng"
        @updateCoordinates="updateCoordinates"
      />
    </div>
    <q-btn type="submit" label="Login" />
  </q-form>
  <RouterLink to="login">you already have an account</RouterLink>
</template>

<script setup lang="js">
import { useForm } from 'vee-validate';
import { fetchCities } from 'src/composables/city/City.Req';
import { fetchJobs } from 'src/composables/job/Job.Req';
import { fetchProvinces } from 'src/composables/province/Province.Req';
import { fetchCountries } from 'src/composables/country/Country.Req';
import { ref, watch } from 'vue';
import { sexOption } from 'src/composables/options';
import Map from 'components/Map.vue';
import { CreateProfileSchema } from 'src/composables/profile/ProfileValidation';
import { createProfile } from 'src/composables/profile/Job.Req';
import axios from 'axios';

const coordinates = ref({ lat: null, lng: null });

function updateCoordinates(newCoordinates) {
  coordinates.value = newCoordinates;
}

const cityOption = ref();
const citiesLoading = ref(false);
const { province: provinceOption, loading: provinceLoading } = fetchProvinces();
const { job: jobOption, loading: jobLoading } = fetchJobs();
const { country: countryOption, loading: countryLoading } = fetchCountries();

const getCities = async (id) => {
  const { data, loading } = await fetchCities(id);
  console.log(data.value);
  cityOption.value = data.value;
  citiesLoading.value = loading.value;
};

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: CreateProfileSchema,
});

const [sex, sexAttr] = defineField('sex');
const [birthday, birthdayAttr] = defineField('birthday');
const [image, imageAttr] = defineField('image');
const [country, countryAttr] = defineField('country');
const [province, provinceAttrs] = defineField('province');
const [city, cityAttrs] = defineField('city');
const [job, jobAttrs] = defineField('job');
watch(province, () => {
  if (province) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    getCities(province.value.id);
  }
});
const onSubmit = handleSubmit(async (values) => {
  try {
    const formData = new FormData();
    formData.append('sex', values.sex.key);
    formData.append('job', values.job.id);
    formData.append('country', values.country.id);
    formData.append('province', values.province.id);
    formData.append('city', values.city.id);
    formData.append('birthday', values.birthday);
    formData.append('image', values.image[0]);
    formData.append('lat', coordinates.value.lat);
    formData.append('lng', coordinates.value.lng);
    console.log(formData)
    await axios.post('http://localhost:3001/api/profile',formData,{
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJSb2xlIjoiZ2hvc3QiLCJpYXQiOjE3MTk2MDI2NDksImV4cCI6MTcxOTYxNzA0OX0.pUTahiA0TgWWazVfwbuNOWq6fwenRLDR41UQJLoNBvY`,
      },
    })
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  } catch (error) {
    console.error('Failed to create product:', error);
  }
});
</script>

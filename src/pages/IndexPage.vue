<template>
  <div class="tw-bg-red-600 tw-w-[800px] tw-h-[500px]">
    <MapComponent class="tw-w-full tw-h-full" :options="{mapKey:'web.a0be47102c054a1887734fb0b75dc0af',mapType:MapTypes.neshanVectorNight}"/>
  </div>
  <div v-if="!loading">sdfsdf{{job}}</div>
</template>
<script setup>

import {MapComponent, MapTypes} from '@neshan-maps-platform/mapbox-gl-vue';
import '@neshan-maps-platform/mapbox-gl-vue/dist/style.css';
import { fetchJobs } from 'src/composables/job/Job.Req';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {job,loading} = fetchJobs();
</script>
<style lang="scss" scoped>
</style>


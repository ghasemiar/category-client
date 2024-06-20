<template>
  <div>
    <MapComponent class="test" :options="{mapKey:'web.a0be47102c054a1887734fb0b75dc0af',mapType:MapTypes.neshanVectorNight}"/>
  </div>
</template>
<script setup>

import {MapComponent, MapTypes} from '@neshan-maps-platform/mapbox-gl-vue';
import '@neshan-maps-platform/mapbox-gl-vue/dist/style.css';

</script>
<style lang="css" scoped>
.test{
  height: 400px;
  width: 600px;
}
</style>

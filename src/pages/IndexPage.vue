<template>
  <p>Latitude: {{ coordinates.lat }}</p>
  <p>Longitude: {{ coordinates.lng }}</p>
  <Map @updateCoordinates="updateCoordinates" />
</template>
<script setup lang="ts">
import Map from 'components/Map.vue';
import { ref } from 'vue';
const coordinates = ref({ lat: null, lng: null });

function updateCoordinates(newCoordinates: any) {
  coordinates.value = newCoordinates;
}
</script>

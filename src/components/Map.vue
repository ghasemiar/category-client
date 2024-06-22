<template>
  <div id="map"></div>
  <pre id="coordinates" class="coordinates"></pre>
</template>

<script setup >
import '@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css';
import nmp_mapboxgl from '@neshan-maps-platform/mapbox-gl';
import { onMounted, ref } from 'vue';

// Define the emit function
const emit = defineEmits(['updateCoordinates']);

const lng = ref();
const lat = ref();

onMounted(() => {
  const map = new nmp_mapboxgl.Map({
    mapType: nmp_mapboxgl.Map.mapTypes.neshanVector,
    container: 'map',
    zoom: 11,
    pitch: 0,
    center: [51.389, 35.6892],
    minZoom: 2,
    maxZoom: 21,
    trackResize: true,
    mapKey: 'web.a0be47102c054a1887734fb0b75dc0af',
    poi: false,
    traffic: false,
  });

  const marker = new nmp_mapboxgl.Marker({ draggable: true })
    .setLngLat([51.389, 35.6892])
    .addTo(map);

  function onDragEnd() {
    const lngLat = marker.getLngLat();
    coordinates.style.display = 'block';
    lat.value = lngLat.lat;
    lng.value = lngLat.lng;

    // Emit the coordinates to the parent component
    emit('updateCoordinates', { lat: lat.value, lng: lng.value });
  }

  marker.on('dragend', onDragEnd);
});
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}

.coordinates {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  position: absolute;
  bottom: 40px;
  left: 10px;
  padding: 5px 10px;
  margin: 0;
  font-size: 11px;
  line-height: 18px;
  border-radius: 3px;
  display: none;
}
</style>

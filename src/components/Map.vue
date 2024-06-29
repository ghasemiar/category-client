<template>
  <div id="map"></div>
  <pre id="coordinates" class="coordinates"></pre>
</template>

<script setup>
import '@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css';
import { ref, watch, onMounted } from 'vue';
import nmp_mapboxgl from '@neshan-maps-platform/mapbox-gl';

// Define props
const props = defineProps({
  latProps: { type: Number, required: false },
  lngProps: { type: Number, required: false },
});

// Define emits
const emit = defineEmits(['updateCoordinates']);
const marker = ref()
const map = ref(null);
const lat = ref(props.latProps || 35.6892);
const lng = ref(props.lngProps || 51.389);

onMounted(() => {
  map.value = new nmp_mapboxgl.Map({
    mapType: nmp_mapboxgl.Map.mapTypes.neshanVector,
    container: 'map',
    zoom: 15,
    pitch: 0,
    center: [lng.value, lat.value],
    minZoom: 2,
    maxZoom: 21,
    trackResize: true,
    mapKey: 'web.a0be47102c054a1887734fb0b75dc0af',
    poi: false,
    traffic: false,
  });

  marker.value = new nmp_mapboxgl.Marker({ draggable: true })
    .setLngLat([lng.value, lat.value])
    .addTo(map.value);

  function onDragEnd() {
    const lngLat = marker.value.getLngLat();
    coordinates.style.display = 'block';
    lat.value = lngLat.lat;
    lng.value = lngLat.lng;

    // Emit the coordinates to the parent component
    emit('updateCoordinates', { lat: lat.value, lng: lng.value });
  }

  marker.value.on('dragend', onDragEnd);
});

watch(() => props.latProps, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    map.value.setCenter([props.lngProps || lng.value, props.latProps || lat.value]);
    // Update marker position if needed
    const markerLngLat = new nmp_mapboxgl.LngLat(props.lngProps || lng.value, props.latProps || lat.value);
    marker.value.setLngLat(markerLngLat);
  }
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

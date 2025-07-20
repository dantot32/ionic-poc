<template>
  <ion-page>

    <!-- header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>Mappa</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- content -->
    <ion-content>
      <div id="map"></div>
    </ion-content>

    <!-- modal -->
    <ion-modal :is-open="showModal" @didDismiss="onModalClose">
      <ion-header>
        <ion-toolbar>
          <ion-title>Nuovo Punto</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-label position="stacked">Etichetta</ion-label>
          <ion-input v-model="label"></ion-input>
        </ion-item>
        <ion-button expand="block" @click="addMarker">Aggiungi</ion-button>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
// yarn add leaflet 
// yarn add -D @types/leaflet
// https://leafletjs.com/examples/quick-start/

import { ref, onMounted, nextTick  } from 'vue'
import L from 'leaflet'

// Importa manualmente lo stile CSS di Leaflet
import 'leaflet/dist/leaflet.css'

// Marker icon fix
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
})

onMounted(async () => {
    await nextTick()

    map = L.map('map').setView([41.9, 12.5], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    // Forza ridimensionamento dopo 300ms per evitare rendering parziale
    setTimeout(() => map.invalidateSize(), 300)

    // long press on map
    map.on('mousedown', (e: L.LeafletMouseEvent) => {
        longPressTimeout = setTimeout(() => {
            selectedLatLng.value = e.latlng
            showModal.value = true
        }, 600)
    })

    map.on('mouseup', () => clearTimeout(longPressTimeout))
    map.on('mousemove', () => clearTimeout(longPressTimeout))
})

// modal
const showModal = ref(false)
const label = ref('')
const selectedLatLng = ref<L.LatLng | null>(null)

let map: L.Map
let longPressTimeout: NodeJS.Timeout

// when user confirm label
function addMarker() {
  if (selectedLatLng.value && label.value.trim()) {
    const marker = L.marker(selectedLatLng.value).addTo(map)
    marker.bindPopup(label.value).openPopup()

    console.log('✅ Marker aggiunto in', selectedLatLng.value, 'con label:', label.value)
  } else {
    console.warn('⚠️ Coordinate o label mancanti')
  }

  // Reset
  label.value = ''
  showModal.value = false
}

// when modal is closed manually
function onModalClose() {
  label.value = ''
  showModal.value = false
}
</script>

<style scoped>
#map {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

/* Fix per Ionic che imposta overflow e padding */
/* ion-content {
  --overflow: hidden;
} */
</style>

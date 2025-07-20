<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mappa</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div id="map"></div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// yarn add leaflet 
// yarn add -D @types/leaflet
// https://leafletjs.com/examples/quick-start/

import { onMounted, nextTick  } from 'vue'
import L from 'leaflet'

// Importa manualmente lo stile CSS di Leaflet
import 'leaflet/dist/leaflet.css'

onMounted(async () => {
    await nextTick()

    const map = L.map('map').setView([41.9, 12.5], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    // Forza ridimensionamento dopo 300ms per evitare rendering parziale
    setTimeout(() => {
        map.invalidateSize()
    }, 300)
})
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

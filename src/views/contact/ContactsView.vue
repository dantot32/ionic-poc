<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Users</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <!-- <ion-item v-for="contact in contacts" :key="contact.id" :router-link="`/users/${contact.id}`">
          {{ contact.name }}
        </ion-item> -->
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Contact } from '../../domain/contact/Contact';
import { TempContactRepository } from '../../infrastructure/contact/TempContactRepository';

// const repo = new TempContactRepository();
// const contacts = ref(Contact[] | any);

// onMounted(async () => {
//   contacts.value = await repo.getAll();
// });
</script>
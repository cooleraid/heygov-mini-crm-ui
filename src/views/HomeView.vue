<template>
  <main class="p-8 dark:bg-slate-900 flex justify-center items-center">
    <div class="w-[80%] mx-auto">
      <div class="w-full">
        <AddAIContact />
        <AddManualContact />
        <ContactList />
      </div>
    </div>
  </main>
</template>
<script setup>
import ContactList from '../components/ContactList.vue';
import AddAIContact from '../components/AddAIContact.vue';
import AddManualContact from '../components/AddManualContact.vue';
</script>
<template>
  <main class="p-8 dark:bg-slate-900 flex justify-center items-center">
    <div class="w-[80%] mx-auto">
      <div class="w-full">
        <AddAIContact @newContact="handleNewContact" />
        <AddManualContact @newContact="handleNewContact" />
        <ContactList :newContactEvent="newContactEvent" />
      </div>
    </div>
  </main>
</template>
<script>
import ContactList from '../components/ContactList.vue';
import AddAIContact from '../components/AddAIContact.vue';
import AddManualContact from '../components/AddManualContact.vue';
import { v4 as uuidv4 } from 'uuid';

export default {
  components: {
    ContactList,
    AddAIContact,
    AddManualContact
  },
  data() {
    return {
      newContactEvent: '',
    };
  },
  methods: {
    handleNewContact() {
      this.newContactEvent = uuidv4()
    }
  }
}
</script>
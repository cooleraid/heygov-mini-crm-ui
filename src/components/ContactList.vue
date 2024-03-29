<template>
  <p class="block text-sm font-medium dark:text-white">Contacts List</p>
  <div class="flex justify-between my-4">
    <!-- Search bar -->
    <input v-model="search" @keyup.enter="handleSearch()" type="text"
      class="px-4 w-1/2 border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
      placeholder="Search contacts" />
    <!-- Filter -->
    <div class="relative">
      <div class="hs-dropdown relative inline-flex">
        <button id="hs-dropdown-basic" type="button"
          class="hs-dropdown-toggle w-36 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
          <svg class="flex-shrink-0 xtsb0 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <line x1="21" x2="14" y1="4" y2="4"></line>
            <line x1="10" x2="3" y1="4" y2="4"></line>
            <line x1="21" x2="12" y1="12" y2="12"></line>
            <line x1="8" x2="3" y1="12" y2="12"></line>
            <line x1="21" x2="16" y1="20" y2="20"></line>
            <line x1="12" x2="3" y1="20" y2="20"></line>
            <line x1="14" x2="14" y1="2" y2="6"></line>
            <line x1="8" x2="8" y1="10" y2="14"></line>
            <line x1="16" x2="16" y1="18" y2="22"></line>
          </svg>
          {{ filter_selected ? filter_selected : 'Filter' }}
          <svg class="hs-dropdown-open:rotate-180 size-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24"
            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <div
          class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 w-36 hidden z-10 mt-2 bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700"
          aria-labelledby="hs-dropdown-basic">
          <a v-for="(filter, fIndex) in filters" :key="fIndex" @click="setFilter(filter)"
            class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
            href="#">
            {{ filter.name }}
          </a>
        </div>
      </div>
    </div>
  </div>
  <div class="rounded-lg p-3 border text-center dark:text-white">
    <!-- Headings -->
    <div class="grid grid-cols-6 gap-2 p-4 border-b font-medium">
      <p>Name</p>
      <p>Email</p>
      <p>Company</p>
      <p>Phone</p>
      <p>Address</p>
    </div>
    <!-- Contacts -->
    <div v-for="(contact, index) in contacts" :key="index" class="grid grid-cols-6 gap-2 p-4 items-center">
      <p class="break-words">{{ contact.name || '-' }}</p>
      <p class="break-words">{{ contact.email || '-' }}</p>
      <p class="break-words">{{ contact.company || '-' }}</p>
      <p class="break-words">{{ contact.phone || '-' }}</p>
      <p class="break-words">{{ contact.address || '-' }}</p>
      <button @click="removeContact(contact.id)" class="p-3 bg-red-800 text-white rounded-lg">Delete</button>
    </div>
  </div>
</template>

<script>
import { fetchContacts, deleteContact } from '@/actions/contact';


export default {
  data() {
    return {
      contacts: [],
      search: '',
      search_fields: 'name,email,company,phone,address',
      filter_selected: null,
      filters: [{ field: 'name', name: 'Name' }, { field: 'email', name: 'Email' }, { field: 'company', name: 'Company' }, { field: 'phone', name: 'Phone' }, { field: 'address', name: 'Address' }]
    };
  },
  mounted() {
    this.getContacts()
  },
  methods: {
    getContacts(query = {}) {
      let loader = this.$loading.show();
      fetchContacts(query)
        .then((res) => {
          this.contacts = res.data?.data || [];
          loader.hide()
          this.$toast.success(res?.data?.message || 'Contact fetched successfully');
        })
        .catch((err) => {
          loader.hide()
          this.$toast.error(err.response?.data?.message || 'Contact could not be fetched');
        });
    },
    removeContact(id) {
      let loader = this.$loading.show();
      deleteContact(id)
        .then((res) => {
          this.contacts = this.contacts.filter(obj => `${obj.id}` !== `${id}`);
          loader.hide()
          this.$toast.success(res?.data?.message || 'Contact deleted successfully');
        })
        .catch((err) => {
          loader.hide()
          this.$toast.error(err.response?.data?.message || 'Contact could not be fetched');
        });
    },
    setFilter(filter) {
      this.search_fields = filter.field;
      this.filter_selected = filter.name
    },
    handleSearch() {
      this.getContacts({ search: this.search, search_fields: this.search_fields })
    }
  }
};
</script>
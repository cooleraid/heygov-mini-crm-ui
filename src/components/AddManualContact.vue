<template>
  <label for="" class="block text-sm font-medium mb-2 dark:text-white">Add contacts manually</label>
  <div class="flex gap-3 justify-between mb-4">
    <div class="flex gap-2 w-full">
      <input type="text" v-model="formData.name"
        class="h-16 py-3 px-4 block w-full border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        placeholder="Name" />
      <input type="text" v-model="formData.email"
        class="h-16 py-3 px-4 block w-full border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        placeholder="Email" />
      <input type="text" v-model="formData.company"
        class="h-16 py-3 px-4 block w-full border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        placeholder="Company" />
      <input type="text" v-model="formData.phone"
        class="h-16 py-3 px-4 block w-full border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        placeholder="Phone" />
      <input type="text" v-model="formData.address"
        class="h-16 py-3 px-4 block w-full border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        placeholder="Address" />
    </div>
    <button @click="newContact" :disabled="!formData.name && !formData.email"
      class="p-4 border rounded-lg flex-shrink-0 h-16 w-16 flex items-center justify-center dark:text-white">
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15 11.125H5C4.65833 11.125 4.375 10.8417 4.375 10.5C4.375 10.1583 4.65833 9.875 5 9.875H15C15.3417 9.875 15.625 10.1583 15.625 10.5C15.625 10.8417 15.3417 11.125 15 11.125Z"
          fill="currentColor" />
        <path
          d="M10 16.125C9.65833 16.125 9.375 15.8417 9.375 15.5V5.5C9.375 5.15833 9.65833 4.875 10 4.875C10.3417 4.875 10.625 5.15833 10.625 5.5V15.5C10.625 15.8417 10.3417 16.125 10 16.125Z"
          fill="currentColor" />
      </svg>
    </button>
  </div>
</template>

<script>
import { createContact } from '@/actions/contact';


export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        company: '',
        phone: '',
        address: ''
      },
    };
  },
  methods: {
    newContact() {
      let loader = this.$loading.show();
      createContact({ data: this.formData, type: 'Manual' })
        .then((res) => {
          this.formData = {
            name: '',
            email: '',
            company: '',
            phone: '',
            address: ''
          };
          loader.hide()
          this.$emit('newContact', '');
          this.$toast.success(res?.data?.message || 'Contact created successfully');
        })
        .catch((err) => {
          loader.hide()
          this.$toast.error(err.response?.data?.message || 'Contact could not be created');
        });
    }
  },
};
</script>
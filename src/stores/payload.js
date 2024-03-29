import { defineStore } from 'pinia';

export const usePayloadStore = defineStore({
  id: 'payload',
  state: () => ({
    payload: JSON.parse(localStorage.getItem('payload')) || {}
  }),
  actions: {
    async change(payload) {
      try {
        localStorage.setItem('payload', JSON.stringify({ ...this.payload, ...payload }));
        this.payload = JSON.parse(localStorage.getItem('payload')) || {};
      } catch (e) {
        console.log(e);
      }
    },
    async clear() {
      try {
        localStorage.removeItem('payload');
        this.payload = JSON.parse(localStorage.getItem('payload')) || {};
      } catch (e) {
        console.log(e);
      }
    }
  }
});

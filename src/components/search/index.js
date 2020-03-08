export default {
  data() {
    return {
      q: ''
    };
  },
  methods: {
    async fetch() {
      try {
        const payload = this.q;
        const result = await this.$store.dispatch('search/getAddress', payload);
        this.$emit('list', result.documents);
      } catch (e) {}
    }
  }
};

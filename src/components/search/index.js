export default {
  data() {
    return {
      q: '',
      lists: ''
    };
  },
  methods: {
    // 검색
    async fetch() {
      try {
        this.page = {
          total: 0,
          per: 0,
          show: 8
        };
        const payload = this.q;
        const result = await this.$store.dispatch('search/getAddress', payload);
        this.lists = result.documents;
      } catch (e) {}
    },
    changeCenter(lng, lat) {
      const payload = {
        lng: lng,
        lat: lat
      };
      this.$emit('list', payload);
      this.q = '';
      this.lists = '';
    }
  }
};

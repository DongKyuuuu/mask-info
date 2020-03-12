export default {
  data() {
    return {
      q: '',
      lists: '',
      page: {
        total: 0,
        per: 0,
        show: 8
      }
    };
  },
  methods: {
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
        if (this.lists.length % this.page.show === 0)
          this.page.total = this.lists.length / this.page.show;
        else
          this.page.total = 1 + Math.floor(this.lists.length / this.page.show);
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
      this.page = {
        total: 0,
        per: 0,
        show: 8
      };
    }
  },
  computed: {
    showList() {
      const start = this.page.per * this.page.show;
      const end = (this.page.per + 1) * this.page.show;
      return this.lists.slice(start, end);
    }
  },
  watch: {
    'page.per'(newVal, oldVal) {
      if (newVal + 1 > this.page.total) this.page.per = 0;
      if (newVal < 0 || oldVal === 0) this.page.per = this.page.total - 1;
    }
  }
};

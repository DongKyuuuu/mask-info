export default {
  data() {
    return {
      geo: {
        lat: '',
        lng: ''
      },
      page: {
        total: 0,
        per: 0,
        show: 3
      },
      lists: []
    };
  },
  methods: {
    async getList() {
      const payload = {
        lat: Number(this.geo.lat),
        lng: Number(this.geo.lng),
        m: 1000
      };

      const result = await this.$store.dispatch('search/getMaskInfo', payload);
      const ins = result.stores;
      try {
        for (let i = 0; i < result.stores.length; i++) {
          if (ins[i].remain_stat === 'few') {
            ins[i].state_text = '30개 미만';
            this.lists.push(ins[i]);
          }
          if (ins[i].remain_stat === 'some') {
            ins[i].state_text = '30개 이상';
            this.lists.push(ins[i]);
          }
          if (ins[i].remain_stat === 'plenty') {
            ins[i].state_text = '100개 이상';
            this.lists.push(ins[i]);
          }
        }
      } catch (e) {
        console.error(e);
      }
      if (this.lists.length % this.page.show === 0)
        this.page.total = this.lists.length / this.page.show;
      else this.page.total = 1 + Math.floor(this.lists.length / this.page.show);
    },
    clickAction(lat, lng) {
      const payload = {
        lat: lat,
        lng: lng
      };
      this.$emit('geo', payload);
    }
  },
  computed: {
    showList() {
      const start = this.page.per * this.page.show;
      const end = (this.page.per + 1) * this.page.show;
      return this.lists.slice(start, end);
    }
  },
  mounted() {
    this.geo.lat = this.location.lat;
    this.geo.lng = this.location.lng;
    this.getList();
  },
  watch: {
    refreshList() {
      this.geo.lat = this.location.lat;
      this.geo.lng = this.location.lng;
      this.lists = [];
      this.getList();
    },
    'page.per'(newVal, oldVal) {
      if (newVal + 1 > this.page.total) this.page.per = 0;
      if (newVal < 0 || oldVal === 0) this.page.per = this.page.total - 1;
    }
  },
  props: ['location', 'refreshList']
};

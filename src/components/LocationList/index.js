export default {
  data() {
    return {
      geo: {
        lat: '',
        lng: ''
      },
      lists: [],
      subShow: false
    };
  },
  methods: {
    async getList() {
      const payload = {
        lat: Number(this.geo.lat),
        lng: Number(this.geo.lng),
        m: 3000
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
    },
    clickAction(lat, lng) {
      const payload = {
        lat: lat,
        lng: lng
      };
      this.$emit('geo', payload);
    }
  },
  mounted() {
    this.geo.lat = this.location.lat;
    this.geo.lng = this.location.lng;
    this.subShow = this.info;
    this.getList();
  },
  watch: {
    refreshList() {
      this.geo.lat = this.location.lat;
      this.geo.lng = this.location.lng;
      this.subShow = this.info;
      this.lists = [];
      this.getList();
    }
  },
  props: ['location', 'refreshList', 'info']
};

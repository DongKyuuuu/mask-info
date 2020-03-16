export default {
  data() {
    return {
      geo: {
        lat: '',
        lng: ''
      },
      lists: [],
      subShow: false //false === '현재 위치', true === '지도 위치'
    };
  },
  methods: {
    // 모아 보기 결과 가져오기
    async getList() {
      const payload = {
        lat: Number(this.geo.lat),
        lng: Number(this.geo.lng),
        m: 3000
      };

      // 검색 결과 reqeust
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

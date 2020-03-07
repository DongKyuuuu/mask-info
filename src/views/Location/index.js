export default {
  data() {
    return {
      map: '',
      test: ''
    };
  },
  methods: {
    maskInfo(lat, lng, levelData) {
      const payload = {
        lat: Number(lat),
        lng: Number(lng),
        m: levelData
      };
      this.$store
        .dispatch('search/getMaskInfo', payload)
        .then(result => {
          this.mapMarker(result.stores);
        })
        .catch(e => {});
    },
    mapMarker(result) {
      for (let i = 0; i < result.length; i++) {
        let marker = new kakao.maps.Marker({
          map: this.map,
          position: new kakao.maps.LatLng(result[i].lat, result[i].lng)
        });
        let info = new kakao.maps.InfoWindow({
          map: this.map,
          //   position: new kakao.maps.LatLng(result[i].lat, result[i].lng),
          disableAutoPan: true,
          content: 'hi'
        });
        info.open(this.map, marker);
      }
    }
  },
  computed: {},
  mounted() {
    const vm = this;
    let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    let options = {
      center: new kakao.maps.LatLng(37.497856, 127.027589), //지도의 중심좌표.
      level: 1
    };
    this.map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    this.map.setMaxLevel(3); // 최대 축소영역 설정
    this.map.setMinLevel(1); // 최소 축소영역 설정
    kakao.maps.event.addListener(this.map, 'dragend', function() {
      // ea: lon1, ja: lon2, la: lat1, ka: let2
      let data = vm.map.getCenter();
      let level = vm.map.getLevel();
      let levelData;
      if (level === 1) levelData = 300;
      if (level === 2) levelData = 500;
      if (level === 3) levelData = 600;
      //   if (level === 4) levelData = 1000;
      vm.maskInfo(data.Ha, data.Ga, levelData);
    });
  }
};

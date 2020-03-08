import SearchForm from '@/components/search/index.vue';
import OutputForm from '@/components/output/index.vue';

export default {
  components: {
    SearchForm,
    OutputForm
  },
  data() {
    return {
      map: ''
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
        let content = `
        <div id="mask-no">
          <div class="info">
            재고 없음
            <div class="detail">
            <div class="detail-item">상호 : ${result[i].name}</div>
            <div class="detail-item">입고 시간 : ${result[i].stock_t}</div>
            <div class="detail-item">입고 수량 : ${result[i].stock_cnt}</div>
            <div class="detail-item">판매 수량 : ${result[i].sold_cnt}</div>
            <div class="detail-item">재고 수량 : ${result[i].remain_cnt}</div>
            </div>
          </div>
        </div>
        `;
        if (!result[i].sold_out) {
          content = `
          <div id="mask-ok">
          <div class="info">
            재고 있음
            <div class="detail">
            <div class="detail-item">상호 : ${result[i].name}</div>
            <div class="detail-item">입고 시간 : ${result[i].stock_t}</div>
            <div class="detail-item">입고 수량 : ${result[i].stock_cnt}</div>
            <div class="detail-item">판매 수량 : ${result[i].sold_cnt}</div>
            <div class="detail-item">재고 수량 : ${result[i].remain_cnt}</div>
            </div>
          </div>
        </div>
          `;
        }
        const customOverlay = new kakao.maps.CustomOverlay({
          map: this.map,
          position: new kakao.maps.LatLng(result[i].lat, result[i].lng),
          content: content
        });
      }
    },
    async geoInfo() {
      const vm = this;
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          const moveLatLon = new kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          vm.map.setCenter(moveLatLon);
        });
      } else {
        alert('위치정보를 불러올 수 없습니다.');
      }
    }
  },
  computed: {},
  async mounted() {
    const vm = this;
    let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    let options = {
      //37.484647, 126.895023
      center: new kakao.maps.LatLng(37.498151, 127.027575), //지도의 중심좌표.
      level: 1
    };
    this.map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    this.map.setMaxLevel(3); // 최대 축소영역 설정
    this.map.setMinLevel(1); // 최소 축소영역 설정

    this.geoInfo();

    kakao.maps.event.addListener(this.map, 'dragend', function() {
      let data = vm.map.getCenter();
      let level = vm.map.getLevel();
      let levelData;
      if (level === 1) levelData = 300;
      if (level === 2) levelData = 500;
      if (level === 3) levelData = 700;
      vm.maskInfo(data.Ha, data.Ga, levelData);
    });
  }
};

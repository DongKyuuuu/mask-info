import SearchForm from '@/components/search/index.vue';
import OutputForm from '@/components/output/index.vue';
import NotiModal from '@/components/modal/notice/index.vue';
import LocationList from '@/components/LocationList/index.vue';

export default {
  components: {
    SearchForm,
    OutputForm,
    NotiModal,
    LocationList
  },
  data() {
    return {
      map: '',
      modal: {
        show: true
      },
      load: false,
      showSidebar: true,
      showGeo: true,
      showList: false,
      showNews: false,
      nowCenter: {
        lat: 37.498151,
        lng: 127.027575
      },
      refreshList: 0,
      noShow: false,
      markerLocate: []
    };
  },
  methods: {
    showControl() {
      this.noShow = !this.noShow;
      for (let i = 0; i < this.markerLocate.length; i++) {
        this.markerLocate[i].setMap(null);
      }
    },
    changeMenu(select) {
      this.showGeo = false;
      this.showList = false;
      this.showNews = false;
      select === 'showGeo' ? (this.showGeo = true) : 0;
      select === 'showList' ? (this.showList = true) : 0;
      select === 'showNews' ? (this.showNews = true) : 0;
    },
    getMapLevel() {
      const level = this.map.getLevel();
      let levelData;
      if (level === 1) levelData = 300;
      if (level === 2) levelData = 500;
      if (level === 3) levelData = 700;
      if (level === 4) levelData = 1500;
      if (level === 5) levelData = 3000;
      if (level === 6) levelData = 5000;
      return levelData;
    },
    changeGeo(val) {
      this.load = true;
      const moveLatLon = new kakao.maps.LatLng(val.lat, val.lng);
      this.maskInfo(val.lat, val.lng, this.getMapLevel());
      this.map.panTo(moveLatLon);
      if (document.body.offsetWidth <= 414) this.showSidebar = false;
    },
    maskInfo(lat, lng, levelData) {
      this.load = true;
      const payload = {
        lat: Number(lat),
        lng: Number(lng),
        m: levelData
      };
      this.$store
        .dispatch('search/getMaskInfo', payload)
        .then(result => {
          this.mapMarker(result.stores, result.count);
        })
        .catch(e => {});
    },
    mapMarker(result, count) {
      for (let i = 0; i < count; i++) {
        let check = false;
        let empty = false;
        if (this.noShow) {
          if (result[i].remain_stat === null) check = true;
          if (result[i].remain_stat === undefined) check = true;
          if (result[i].remain_stat === 'empty') check = true;
        } else {
          if (result[i].remain_stat === null) empty = true;
          if (result[i].remain_stat === undefined) empty = true;
          if (result[i].remain_stat === 'empty') empty = true;
        }
        let type;
        let maskText;
        if (result[i].type === '01') type = '약국';
        if (result[i].type === '02') type = '우체국';
        if (result[i].type === '03') type = '농협';

        if (result[i].remain_stat === 'plenty') maskText = '100개 이상';
        if (result[i].remain_stat === 'some') maskText = '30개 이상';
        if (result[i].remain_stat === 'few') maskText = '30개 미만';
        if (result[i].remain_stat === 'empty') maskText = '재고 없음';
        if (result[i].remain_stat === null) maskText = '미확인';
        if (result[i].remain_stat === undefined) maskText = '미확인';
        if (result[i].remain_stat === 'break') maskText = '판매중지';

        console.log(result[i]);
        const content = `
      <div id="${result[i].remain_stat}">
        <div class="info">
          ${maskText}
          <div class="detail">
          <div class="detail-item">상호 : ${result[i].name}</div>
          <div class="detail-item">판매처 : ${type}</div>
          <div class="detail-item">입고 시간 : ${result[i].stock_at}</div>
          <div class="detail-item">재고 상태 : ${maskText}</div>
          </div>
        </div>
      </div>`;
        if (check) {
        } else {
          let overLay = new kakao.maps.CustomOverlay({
            map: this.map,
            position: new kakao.maps.LatLng(result[i].lat, result[i].lng),
            content: content
          });
          if (empty) this.markerLocate.push(overLay);
        }
      }
      this.load = false;
    },
    async geoInfo() {
      const vm = this;
      this.load = true;
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          const moveLatLon = new kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          vm.nowCenter.lat = position.coords.latitude;
          vm.nowCenter.lng = position.coords.longitude;
          vm.map.setCenter(moveLatLon);
          vm.maskInfo(
            position.coords.latitude,
            position.coords.longitude,
            vm.getMapLevel()
          );
        });
        this.load = false;
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
      level: 3
    };
    this.maskInfo(37.498151, 127.027575, 700);
    this.map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    this.map.setMaxLevel(6); // 최대 축소영역 설정
    this.map.setMinLevel(1); // 최소 축소영역 설정

    this.geoInfo();
    kakao.maps.event.addListener(this.map, 'dragend', function() {
      let data = vm.map.getCenter();
      let level = vm.map.getLevel();
      let levelData;
      if (level === 1) levelData = 300;
      if (level === 2) levelData = 500;
      if (level === 3) levelData = 700;
      if (level === 4) levelData = 1500;
      if (level === 5) levelData = 3000;
      if (level === 6) levelData = 5000;

      vm.nowCenter.lat = data.Ha;
      vm.nowCenter.lng = data.Ga;
      vm.refreshList += 1;

      vm.maskInfo(data.Ha, data.Ga, levelData);
    });
  }
};

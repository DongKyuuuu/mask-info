import moment from 'moment';

export default {
  methods: {
    changeSet() {
      // 현재 시간 저장(1일동안 공지 표시안됨)
      this.$store.dispatch(
        'check/changeDate',
        moment(new Date()).format('YYYY-MM-DD')
      );
      this.$store.dispatch('check/changeShow', false);
    }
  }
};

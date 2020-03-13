import moment from 'moment';

export default {
  methods: {
    changeSet() {
      this.$store.dispatch(
        'check/changeDate',
        moment(new Date()).format('YYYY-MM-DD')
      );
      this.$store.dispatch('check/changeShow', false);
    }
  }
};

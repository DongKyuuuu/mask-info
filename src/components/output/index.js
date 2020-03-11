export default {
  data() {
    return {
      listData: {},
      perPage: 1
    };
  },
  computed: {
    countPage() {}
  },
  watch: {
    list() {
      this.listData = this.list;
    }
  },
  props: ['list']
};

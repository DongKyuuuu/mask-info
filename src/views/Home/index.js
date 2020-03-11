import SearchForm from '@/components/search/index.vue';
import OutputForm from '@/components/output/index.vue';

export default {
  data() {
    return {
      maskList: ''
    };
  },
  methods: {
    saveMaskList(val) {
      this.maskList = val;
      console.log(this.maskList);
    }
  },
  components: {
    SearchForm,
    OutputForm
  }
};

export default {
  data() {
    return {
      boColorTheme: [
        'rgba(234, 196, 53, 1)',
        'rgba(52, 89, 149, 1)',
        'rgba(228, 0, 102, 1)',
        'rgba(251, 77, 61, 1)',
        'rgba(76, 91, 92, 1)',
      ],

      bgColorTheme: [
        'rgba(234, 196, 53, 0.2)',
        'rgba(52, 89, 149, 0.2)',
        'rgba(228, 0, 102, 0.2)',
        'rgba(251, 77, 61, 0.2)',
        'rgba(76, 91, 92, 0.2)',
      ],
    };
  },
  computed: {
    bgColors() {
      const bg = [];
      for (let i = 0; i < this.data.length; i++) {
        bg.push(this.bgColorTheme[i % this.bgColorTheme.length]);
      }
      return bg;
    },
    boColors() {
      const bo = [];
      for (let i = 0; i < this.data.length; i++) {
        bo.push(this.boColorTheme[i % this.boColorTheme.length]);
      }
      return bo;
    },
  },
};

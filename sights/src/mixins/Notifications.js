export default {
  methods: {
    success(text, title) {
      this.$notify({
        title, text, type: 'success',
      });
    },
    danger(text, title) {
      this.$notify({
        title, text, type: 'danger',
      });
    },
    warning(text, title) {
      this.$notify({
        title, text, type: 'warning',
      });
    },
  },
}
;

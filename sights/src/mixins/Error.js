export default {
  methods: {
    hasError(name) {
      return this.errors.has(name);
    },
    firstError(name) {
      return this.errors.first(name);
    },
  },
}
;

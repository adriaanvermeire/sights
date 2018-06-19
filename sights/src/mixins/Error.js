export default {
  data() {
    return {
      backendErrors: [],
    };
  },
  methods: {
    hasError(name) {
      return this.errors.has(name);
    },
    firstError(name) {
      return this.errors.first(name);
    },
    showError(error) {
      this.errors.push(error);
    },
    parseErrorResponse(response) {
      const { errors } = response.data.err;
      for (let i = 0; i < errors.length; i += 1) {
        const error = errors[i];
        this.backendErrors.push(error.messages.join(', '));
      }
    },
  },
}
;

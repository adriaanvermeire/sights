<template lang="html">
<b-container>
  <b-row align-h="center">
    <b-col cols="6">
      <b-card
        title='Login'
        >
        <b-form @submit.prevent="login({email, password})">
          <b-form-input
          id='email'
          v-model.trim="email"
          type='text'
          placeholder='Email'
          class='mb-2'
          ></b-form-input>
          <b-form-input
          id='password'
          v-model.trim="password"
          placeholder="Password"
          class='mb-2'
          ></b-form-input>
          <b-button :to="{ name: 'Register' }" variant='outline-primary'>Register</b-button>
          <b-button type="submit" variant="primary">Login</b-button>
        </b-form>

      </b-card>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      }).then(() => {
        this.$router.push('/');
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>

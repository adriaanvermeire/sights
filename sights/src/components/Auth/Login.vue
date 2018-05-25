<template lang="html">
<b-container>
  <b-row align-h="center">
    <b-col cols="6">
      <b-card
        title='Login'
        >
        <b-form @submit.prevent="login">
          <b-form-row class='mb-2'>
            <b-col cols="4" class='justify-content-end d-flex'>
              <label for="email">Email</label>
            </b-col>
            <b-col cols="8">
              <input
              id='email' type='email' class='mb-2 form-control' name='email'
              v-model.trim="email"
              v-validate="'required|email'"
              />
              <b-form-invalid-feedback v-if="errors.has('email')"
              class='text-right' :class='{ "d-block": errors.has("email")}'
              >{{errors.first('email')}}</b-form-invalid-feedback>
            </b-col>
          </b-form-row>
          <b-form-row class='mb-2'>
            <b-col cols="4" class='justify-content-end d-flex'>
              <label for="password">Password</label>
            </b-col>
            <b-col cols="8">
              <input
              id='password' class='mb-2 form-control' type='password' name='password'
              v-model.trim="password"
              v-validate="'required'"
              />
              <b-form-invalid-feedback v-if="errors.has('password')"
              class='text-right' :class='{ "d-block": errors.has("password")}'
              >{{errors.first('password')}}</b-form-invalid-feedback>
            </b-col>
          </b-form-row>
          <span class='d-flex justify-content-end'>
            <b-button :to="{ name: 'Register' }" variant='outline-primary'>Register</b-button>
            <b-button type="submit" variant="primary" class='ml-2'>Login</b-button>
          </span>
        </b-form>

      </b-card>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import { AUTH_REQUEST } from '@/store/actions/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      const { email, password } = this;
      this.errors.clear();
      this.$store.dispatch(AUTH_REQUEST, { email, password }).then(() => {
        this.$router.push('/');
      })
        .catch((err) => {
          this.errors.add('password', err.data.msg, 'server');
        });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>

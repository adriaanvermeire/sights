<template lang="html">
<b-container>
  <b-row align-h="center">
    <b-col cols="6">
      <b-card
        title='Registration'
        >
        <b-form @submit.prevent="register">
          <b-form-input
          id='name'
          v-model.trim="details.name"
          type='text'
          placeholder='Name'
          class='mb-2'
          ></b-form-input>
          <b-form-input
          id='username'
          v-model.trim="details.username"
          type='text'
          placeholder='Username'
          class='mb-2'
          ></b-form-input>
          <b-form-input
          id='email'
          v-model.trim="details.email"
          type='email'
          placeholder='Email'
          class='mb-2'
          ></b-form-input>
          <b-form-input
          id='password'
          v-model.trim="details.password"
          placeholder="Password"
          class='mb-2'
          type='password'
          ></b-form-input>
          <b-form-input
          id='passwordVerification'
          v-model.trim="details.passwordVerification"
          placeholder="Password verification"
          class='mb-2'
          type='password'
          ></b-form-input>
          <b-button type="submit" variant="primary">Register</b-button>
        </b-form>

      </b-card>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import { AUTH_REQUEST } from '@/store/actions/auth';
import AuthenticationService from '@/services/AuthenticationService';

export default {
  data() {
    return {
      details: {
        username: '',
        email: '',
        password: '',
        passwordVerification: '',
        name: '',
      },
    };
  },
  methods: {
    async register() {
      const resp = (await AuthenticationService.register(this.details)).data;
      if (resp.success) {
        const { email, password } = this.details;
        this.$store.dispatch(AUTH_REQUEST, { email, password }).then(() => {
          this.$router.push('/');
        });
      } else {
        // TODO: Send notification to user that registration failed
        console.log('Something went wrong!');
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>

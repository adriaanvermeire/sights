<template lang="html">
<b-container>
  <b-row align-h="center">
    <b-col cols="6">
      <b-card title='Registration'>
        <b-form @submit.prevent="register">
          <b-form-row class='mb-2'>
            <b-col cols="4" class='justify-content-end d-flex'>
              <label for="username">Username</label>
            </b-col>
            <b-col cols="8">
              <input
              id='username' type='text' class='mb-2 form-control' name='username'
              v-model.trim="details.username"
              v-validate="'required|alpha_num|min:3|max:30'"
              />
              <b-form-invalid-feedback v-if="errors.has('username')"
               class='text-right' :class='{ "d-block": errors.has("username")}'
              >{{errors.first('username')}}</b-form-invalid-feedback>
            </b-col>
          </b-form-row>
          <b-form-row class='mb-2'>
            <b-col cols="4" class='justify-content-end d-flex'>
              <label for="email">Email</label>
            </b-col>
            <b-col cols="8">
              <input
              id='email' type='email' class='mb-2 form-control' name='email'
              v-model.trim="details.email"
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
              v-model.trim="details.password"
              v-validate="'required|min:6'"
              />
              <b-form-invalid-feedback v-if="errors.has('password')"
              class='text-right' :class='{ "d-block": errors.has("password")}'
              >{{errors.first('password')}}</b-form-invalid-feedback>
            </b-col>
          </b-form-row>
          <b-form-row class='mb-2'>
            <b-col cols="4" class='justify-content-end d-flex'>
              <label for="passwordVerification">Confirm password</label>
            </b-col>
            <b-col cols="8">
              <input
              id='passwordVerification' class='mb-2 form-control'
              type='password' name='passwordVerification'
              v-model.trim="details.passwordVerification"
              v-validate="'required|min:6|confirmed:password'"
              />
              <b-form-invalid-feedback v-if="errors.has('passwordVerification')"
              class='text-right' :class='{ "d-block": errors.has("passwordVerification")}'
              >{{errors.first('passwordVerification')}}</b-form-invalid-feedback>
            </b-col>
          </b-form-row>
          <span class="d-flex justify-content-end">
            <b-button type="submit" variant="primary">Register</b-button>
          </span>
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
      },
    };
  },
  methods: {
    async register() {
      const res = await this.$validator.validateAll();
      if (res) {
        const resp = (await AuthenticationService.register(this.details)).data;
        if (resp.success) {
          const { email, password } = this.details;
          this.$store.dispatch(AUTH_REQUEST, { email, password }).then(() => {
            this.$router.push('/');
          });
        } else if (resp.msg) {
          this.errors.clear();
          this.errors.add(resp.type, resp.msg, 'server');
        } else {
          this.errors.add('passwordVerification', 'Something went wrong. Try again', 'client');
        }
      } else {
        alert('Fill in all the fields correctly, please.');
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>

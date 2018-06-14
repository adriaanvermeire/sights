<template>
<form @submit.prevent="register">
    <div class='form-row mb-2'>
    <div class='col-4 justify-content-end d-flex'>
        <label for="username">Username</label>
    </div>
    <div class='col-8'>
        <text-input
        id='username' type='text' class='mb-2' name='username'
        v-model.trim="details.username"
        v-validate="'required|alpha_num|min:3|max:30'"
        />
      </div>
      <div v-if="hasError('username')" class='error col-12'>
          {{ firstError('username') }}
      </div>
    </div>
    <div class='form-row mb-2'>
    <div class='col-4 justify-content-end d-flex'>
        <label for="email">Email</label>
    </div>
    <div class='col-8'>
        <text-input
        id='email' type='email' class='mb-2' name='email'
        v-model.trim="details.email"
        v-validate="'required|email'"
        />
    </div>
    <div v-if="hasError('email')" class='error col-12'>
        {{ firstError('email') }}
    </div>
    </div>
    <div class='form-row mb-2'>
    <div class='col-4 justify-content-end d-flex'>
        <label for="password">Password</label>
    </div>
    <div class='col-8'>
        <text-input
        id='password' class='mb-2' type='password' name='password'
        v-model.trim="details.password"
        v-validate="'required|min:6'"
        />
      </div>
      <div v-if="hasError('password')" class='error col-12'>
          {{ firstError('password') }}
      </div>
    </div>
    <div class='form-row mb-2'>
    <div class='col-4 justify-content-end d-flex'>
        <label for="passwordVerification">Confirm password</label>
    </div>
    <div class='col-8'>
        <text-input
        id='passwordVerification' class='mb-2'
        type='password' name='passwordVerification'
        v-model.trim="details.passwordVerification"
        v-validate="'required|min:6|confirmed:password'"
        data-vv-as="password confirmation"
        />
    </div>
    <div v-if="hasError('passwordVerification')" class='error col-12'>
        {{ firstError('passwordVerification') }}
    </div>
    </div>
    <span class="d-flex justify-content-end">
    <a-button type="submit" variant='success'>Register</a-button>
    </span>
</form>
</template>

<script>
import Notify from '@/mixins/Notifications';
import ErrorMixin from '@/mixins/Error';
import { AUTH_REQUEST } from '@/store/actions/auth';
import AuthenticationService from '@/services/AuthenticationService';
import TextInput from '@/components/Inputs/TextInput';

export default {
  mixins: [Notify, ErrorMixin],
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
            this.success('You were registered successfully!');
            this.$router.push('/');
          });
        } else if (resp.msg) {
          this.errors.clear();
          this.errors.add(resp.type, resp.msg, 'server');
        } else {
          this.errors.add('passwordVerification', 'Something went wrong. Try again', 'client');
        }
      }
    },
  },
  components: { TextInput, Error },
};
</script>

<style scoped lang='scss'>
@import '@/assets/scss/vars.scss';
.error {
    text-align: right;
    color: $red;
}
</style>

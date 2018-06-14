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
        <span v-if="errors.has('username')"
        class='text-right' :class='{ "d-block": errors.has("username")}'
        >{{errors.first('username')}}</span>
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
        <span v-if="errors.has('email')"
        class='text-right' :class='{ "d-block": errors.has("email")}'
        >{{errors.first('email')}}</span>
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
        <span v-if="errors.has('password')"
        class='text-right' :class='{ "d-block": errors.has("password")}'
        >{{errors.first('password')}}</span>
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
        />
        <span v-if="errors.has('passwordVerification')"
        class='text-right' :class='{ "d-block": errors.has("passwordVerification")}'
        >{{errors.first('passwordVerification')}}</span>
    </div>
    </div>
    <span class="d-flex justify-content-end">
    <a-button type="submit" variant='success'>Register</a-button>
    </span>
</form>
</template>

<script>
import Notify from '@/mixins/Notifications';
import { AUTH_REQUEST } from '@/store/actions/auth';
import AuthenticationService from '@/services/AuthenticationService';
import TextInput from '@/components/Inputs/TextInput';

export default {
  mixins: [Notify],
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
      } else {
        // alert('Fill in all the fields correctly, please.');
      }
    },
  },
  components: { TextInput },
};
</script>

<style scoped>

</style>

<template>
<form @submit.prevent="login">
    <div class='form-row mb-2'>
    <div class='col-4 justify-content-end d-flex'>
        <label for="login-email">Email</label>
    </div>
    <div class='col-8'>
        <text-input
        id='login-email' type='email' class='mb-2' name='email'
        v-model.trim="email"
        v-validate="'required|email'"
        />
        <span v-if="errors.has('email')"
        class='text-right' :class='{ "d-block": errors.has("email")}'
        >{{errors.first('email')}}</span>
    </div>
    </div>
    <div class='form-row mb-2'>
    <div class='col-4 justify-content-end d-flex'>
        <label for="login-password">Password</label>
    </div>
    <div class='col-8'>
        <text-input
        id='login-password' class='mb-2' type='password' name='password'
        v-model.trim="password"
        v-validate="'required'"
        />
        <span v-if="errors.has('password')"
        class='text-right' :class='{ "d-block": errors.has("password")}'
        >{{errors.first('password')}}</span>
    </div>
    </div>
    <span class='d-flex justify-content-end'>
    <a-button v-if="register-link" variant='success-outline'>
      <router-link :to="{ name: 'Register' }"  >
        Register
      </router-link>
    </a-button>
    <a-button type="submit" variant='success'>Login</a-button>
    </span>
</form>
</template>

<script>
import Notify from '@/mixins/Notifications';
import { AUTH_REQUEST } from '@/store/actions/auth';
import TextInput from '@/components/Inputs/TextInput';

export default {
  mixins: [Notify],
  data() {
    return {
      email: '',
      password: '',
    };
  },
  props: {
    'register-link': { default: true },
  },
  methods: {
    login() {
      const { email, password } = this;
      this.errors.clear();
      this.$store.dispatch(AUTH_REQUEST, { email, password })
        .then(() => {
          this.success('You were logged in successfully!');
          this.$router.push('/');
        })
        .catch((err) => {
          this.errors.add('password', err.data.msg, 'server');
        });
    },
  },
  components: {
    TextInput,
  },
};
</script>

<style scoped>

</style>

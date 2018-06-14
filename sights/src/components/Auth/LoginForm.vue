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
    </div>
    <div v-if="hasError('email')" class='error col-12'>
    {{ firstError('email') }}
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
    </div>
    <div v-if="hasError('password')" class='error col-12'>
    {{ firstError('password') }}
    </div>
    </div>
    <span class='d-flex justify-content-end'>
    <a-button v-if="registerLink" variant='success-outline' class='mr-1'>
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
import ErrorMixin from '@/mixins/Error';
import { AUTH_REQUEST } from '@/store/actions/auth';
import TextInput from '@/components/Inputs/TextInput';

export default {
  mixins: [Notify, ErrorMixin],
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
    async login() {
      const res = await this.$validator.validateAll();
      if (res) {
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
      }
    },
  },
  components: {
    TextInput,
  },
};
</script>

<style scoped lang='scss'>
@import '@/assets/scss/vars.scss';
.error {
    text-align: right;
    color: $red;
}
</style>

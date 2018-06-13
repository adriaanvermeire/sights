<template lang="html">
<div class='container'>
  <div class='row justify-content-center d-flex'>
    <div class='col-6'>
      <div class='card' title='Login'>
        <div class="card-body">
          <div class="card-title">Login</div>
          <div class="card-text">
            <form @submit.prevent="login">
              <div class='form-row mb-2'>
                <div class='col-4 justify-content-end d-flex'>
                  <label for="email">Email</label>
                </div>
                <div class='col-8'>
                  <input
                  id='email' type='email' class='mb-2 form-control' name='email'
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
                  <label for="password">Password</label>
                </div>
                <div class='col-8'>
                  <input
                  id='password' class='mb-2 form-control' type='password' name='password'
                  v-model.trim="password"
                  v-validate="'required'"
                  />
                  <span v-if="errors.has('password')"
                  class='text-right' :class='{ "d-block": errors.has("password")}'
                  >{{errors.first('password')}}</span>
                </div>
              </div>
              <span class='d-flex justify-content-end'>
                <button :to="{ name: 'Register' }" class='btn btn-outline-primary'>Register</button>
                <button type="submit" class='btn btn-primary ml-2'>Login</button>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Notify from '@/mixins/Notifications';
import { AUTH_REQUEST } from '@/store/actions/auth';

export default {
  mixins: [Notify],
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
};
</script>

<style lang="scss" scoped>

</style>

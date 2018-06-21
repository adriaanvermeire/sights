<template lang="html">
<div class='container'>
  <div class='row justify-content-center d-flex'>
    <div class='col-lg-6 col-md-8 col-12'>
      <div class='card' title='Login'>
        <div class="card-body">
          <div class="card-title"><h3>Login</h3></div>
          <div class="card-text">
            <p>Log in to your account to see your Sights, your favorites and more</p>
            <login-form/>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import LoginForm from './LoginForm';

export default {
  components: { LoginForm },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';
.card {
  box-shadow: 0 0 2px 0 rgba(43,49,63,.14), 0 3px 5px 0 rgba(43,49,63,.06);
  background-color: $light;
  border: none;
  border-radius: 0;

  .card-body{
    margin: 1em 1.5em;
  }

  .card-footer {
    border-top: none;
  }
}
</style>

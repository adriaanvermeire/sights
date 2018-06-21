<template lang="html">
<div class='container'>
  <div class='row d-flex justify-content-center'>
    <div class='col-lg-6 col-md-8 col-12'>
      <div class='card' title='Registration'>
        <div class="card-body">
          <div class="card-title"><h3>Sign Up</h3></div>
          <div class="card-text">
            <p>
                Making an account at Sights enables you to share your own Sights and like others'
              </p>
            <register-form />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import RegisterForm from './RegisterForm';

export default {
  components: { RegisterForm },
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

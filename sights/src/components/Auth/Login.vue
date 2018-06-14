<template lang="html">
<div class='container'>
  <div class='row justify-content-center d-flex'>
    <div class='col-6'>
      <div class='card' title='Login'>
        <div class="card-body">
          <div class="card-title">Login</div>
          <div class="card-text">
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

</style>

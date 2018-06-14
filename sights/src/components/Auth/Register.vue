<template lang="html">
<div class='container'>
  <div class='row d-flex justify-content-center'>
    <div class='col-6'>
      <div class='card' title='Registration'>
        <div class="card-body">
          <div class="card-title">Registration</div>
          <div class="card-text">
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

</style>

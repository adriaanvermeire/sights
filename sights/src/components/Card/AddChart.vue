<template>
<div @click='addChart'
    class='col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4 card-wrap'>
    <div class="card w-100">
        <div class="card-body d-flex align-items-center justify-content-center flex-column">
                <icon name="plus" scale='4'></icon>
                <h5>Add Chart</h5>
        </div>
    </div>
</div>

</template>

<script>
import { DETAIL_SIDEBARTYPE } from '@/store/actions/detail';

export default {
  methods: {
    addChart() {
      this.$store.commit(DETAIL_SIDEBARTYPE, 'addChart');
    },
  },
};
</script>

<style scoped lang='scss'>
@import '@/assets/scss/vars.scss';
.card-wrap {
    display: flex;
    overflow-x: hidden;
    padding-bottom: 0.2rem;
    justify-content: center;
}

.card {
    box-shadow: 0 0 2px 0 rgba(43,49,63,.14), 0 3px 5px 0 rgba(43,49,63,.06);
    background-color: $light;
    border: none;
    border-radius: 0;
    transition: all 0.3s;
    color: lighten($black, 50%);
    cursor: pointer;
    &:hover {
        color:$black;
    }
}
</style>

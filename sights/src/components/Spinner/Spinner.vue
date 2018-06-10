<template>
<div id="spinner" class='d-flex align-items-center flex-column mt-5'>
    <spinner color='#09eba7' size='150' :depth='10'/>
    <h5 class='mt-2'>{{text}}</h5>
</div>
</template>

<script>
import Spinner from 'vue-spinner-component/src/Spinner';

export default {
  props: ['text'],
  components: {
    Spinner,
  },
};
</script>

<style scoped>
#spinner h5:after {
    position: absolute;
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    -webkit-animation: ellipsis steps(4,end) 900ms infinite;
    animation: ellipsis steps(4,end) 900ms infinite;
    content: "\2026"; /* ascii code for the ellipsis character */
    width: 0px;
}

@keyframes ellipsis {
    to {
        width: 1.25em;
    }
}

@-webkit-keyframes ellipsis {
    to {
        width: 1.25em;
    }
}
</style>

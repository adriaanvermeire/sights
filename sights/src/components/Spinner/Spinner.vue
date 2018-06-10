<template>
<div id="spinner" class='d-flex align-items-center flex-column mt-5'>
    <spinner color='#09eba7' :size='150' :depth='10'/>
    <svg
        v-if='finishing'
        version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <polyline
                @animationend='finished'
                class="path check" fill="none" stroke="#09eba7"
                stroke-width="10" stroke-linecap="round" stroke-miterlimit="10"
                points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
    </svg>
    <h5 v-if='!finishing' class='mt-2 loading'>{{ text }}</h5>
    <h5 v-else class='mt-2'>{{ finishText }}</h5>
</div>
</template>

<script>
import Spinner from 'vue-spinner-component/src/Spinner';

export default {
  data() {
    return {
      finishing: false,
    };
  },
  props: {
    text: {
      default: 'Loading',
    },
    'finish-text': {
      default: 'Finished loading!',
    },
  },
  methods: {
    finish() {
      this.finishing = true;
    },
    finished() {
      this.$emit('animation-end');
    },
  },
  components: {
    Spinner,
  },
};
</script>

<style scoped lang='scss'>
#spinner .loading:after {
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

svg {
    position: absolute;
    width: 130.2px;
    margin: 10px auto 0;
}

.path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 0;
  &.check {
    stroke-dashoffset: -100;
    -webkit-animation: dash-check 0.9s .35s ease-in-out forwards;
    animation: dash-check 0.9s .35s ease-in-out forwards;
  }
}

@keyframes dash-check {
  0% {
    stroke-dashoffset: -100;
  }
  100% {
    stroke-dashoffset: 900;
  }
}
</style>

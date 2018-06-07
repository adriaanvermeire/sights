<template>
<div id="sidebar-overlay" @click='sideBarToggle'>
    <div id="sidebar">
        {{ content }}
    </div>
</div>
</template>

<script>
import { SIDEBAR_SHOW, SIDEBAR_HIDE } from '@/store/actions/sidebar';

export default {
  computed: {
    content() {
      return this.$store.state.sidebar.content;
    },
    sidebarOpen() {
      return this.$store.state.sidebar.open;
    },
  },
  methods: {
    sideBarToggle() {
      if (!this.sidebarOpen) {
        this.$store.dispatch(SIDEBAR_SHOW, { content: 'Hello this is a test' });
      } else {
        this.$store.dispatch(SIDEBAR_HIDE);
      }
    },
  },
};
</script>

<style lang='scss' scoped>
#sidebar-overlay{
    background-color: rgba(128,128,128,0.5);
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    right: 0;
    #sidebar {
        height: 100vh;
        width: 60vw;
        background-color: grey;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 5;
    }
}
</style>

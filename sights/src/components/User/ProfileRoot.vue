<template lang="html">
<div id="profile-root">
    <profile-sidebar />
    <main>
        <router-view></router-view>
    </main>
</div>
</template>

<script>
import ProfileSidebar from './ProfileSidebar';

export default {
  data() {
    return {};
  },
  components: {
    ProfileSidebar,
  },
};
</script>

<style lang="scss" scoped>
#profile-root {
    margin-top: 0;
    display: flex;
    align-items: stretch;

  main {
        padding: 1em;
        flex: 1 1 auto;
        overflow: auto;
  }
}
</style>

<template>
<div id="profile-meta">
    <avatar :username="profile.username" :size='50' />
    <ul id="details">
        <li><b><icon name="user"></icon> {{ profile.username }}</b></li>
        <li><icon name="envelope"></icon> {{ profile.email }}</li>
    </ul>
</div>
</template>

<script>
import Avatar from 'vue-avatar';

export default {
  computed: {
    profile() { return this.$store.getters.getProfile || ''; },
  },
  components: {
    Avatar,
  },
};
</script>

<style scoped lang='scss'>
#profile-meta {
    display: flex;
    padding: 0.5em;
    align-items: flex-start;
    #details {
        margin-left: 0.5em;
        list-style-type: none;
        padding: 0;
        text-align: left;
    }
}
</style>

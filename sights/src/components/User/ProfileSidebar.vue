<template>
  <aside id="sidebar">
        <profile-meta />
        <ul id='navigation'>
            <router-link v-for='route of profileRoutes' :key='route.name.name' tag='li' :to="route.name">
                <a>{{ route.label }}</a>
            </router-link>
        </ul>
  </aside>
</template>

<script>
import ProfileMeta from './ProfileMeta';

export default {
  data() {
    return {
      profileRoutes: [
        { label: 'Profile', name: { name: 'Profile' } },
        { label: 'My Sights', name: { name: 'MySights' } },
        { label: 'Liked Sights', name: { name: 'LikedSights' } },
        { label: 'Settings', name: { name: 'Settings' } },
      ],
    };
  },
  components: {
    ProfileMeta,
  },
};
</script>

<style lang='scss' scoped>
@import '@/assets/scss/vars.scss';

#sidebar {
    width: 15%;
    background-color: $light;
    box-shadow: 2px 0 2px 0 rgba(43,49,63,.14), 0 3px 5px 0 rgba(43,49,63,.06);
    #navigation {
        list-style-type: none;
        padding: 0;
        text-align: right;
        li {
            padding: 1em;
            font-size: 1.3em;
            font-weight: 500;
            transition: 0.2s all ease-out;
            * {
                color: $black;
            }
            &:hover, &.router-link-exact-active {
                background-color: darken($light, 5%);
            }
        }
    }
}
</style>


<template>
<div id="sidebar">
    <div id="sidebar-content">
        <h4>{{ name }}</h4>
        <p>{{ description }}</p>
    </div>
</div>
</template>

<script>
export default {
  computed: {
    name() { return this.$store.getters.sightName; },
    description() { return this.$store.getters.sightDescription; },
  },
};
</script>

<style scoped lang='scss'>
@import '@/assets/scss/vars.scss';
#sidebar {
    padding: 1em;
    width: 30vw;
    background-color: $light;
    box-shadow: 0 0 2px 0 rgba(43,49,63,.14), 0 3px 5px 0 rgba(43,49,63,.06);
    overflow-x: hidden;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    p, h4{
        text-align: left;
    }
}
</style>

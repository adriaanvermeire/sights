<template>
<div id="sidebar">
    <div id="sidebar-content" v-if='type !== "edit"'>
        <h4>{{ name }}</h4>
        <p>{{ description }}</p>
    </div>
    <edit-sidebar ref='editSidebar' @reload-sight='$emit("reload-sight")' @edited='$emit("edited")' v-else />
</div>
</template>

<script>
import EditSidebar from './EditSidebar';

export default {
  props: {
    type: { type: String, default: 'guest' },
  },
  computed: {
    name() { return this.$store.getters.sightName; },
    description() { return this.$store.getters.sightDescription; },
  },
  components: { EditSidebar },
};
</script>

<style scoped lang='scss'>
@import '@/assets/scss/vars.scss';
#sidebar {
    width: 30vw;
    background-color: $light;
    box-shadow: 0 0 2px 0 rgba(43,49,63,.14), 0 3px 5px 0 rgba(43,49,63,.06);
    overflow-x: hidden;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & > div {
        padding: 1em;
        width: 100%;
    }

    p, h4, h5{
        text-align: left;
    }
}
</style>

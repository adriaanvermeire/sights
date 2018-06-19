<template>
<div id="sidebar">
    <div id="sidebar-content" v-if='type !== "edit"'>
        <div id="top">
            <h4>{{ name }}</h4>
            <p>{{ description }}</p>
        </div>
        <div id="bottom">
            <router-link :to="{ name: 'EditSight', params: { id: sightId }}">
                <a-button v-if='isMine' variant='warning'>
                    Edit Sight
                </a-button>
            </router-link>
        </div>
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
    isMine() {
      return this.$store.getters.sightAuthor === this.$store.getters.getProfile.username;
    },
    sightId() {
      return this.$store.getters.sightId;
    },
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
    #sidebar-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        #bottom {
            button {
                width: 100%;
            }
        }
    }
}
</style>

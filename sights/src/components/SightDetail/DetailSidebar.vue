<template>
<div id="sidebar">
    <div id="sidebar-content" v-if="!sidebarType || sidebarType === 'guest'">
        <div id="top">
            <h4>{{ name }}</h4>
            <p>{{ description }}</p>
        </div>
        <div id="bottom" v-if='isMine'>
            <a-button  variant='warning' @click.native='sidebarType = "edit"'>
                Edit Sight
            </a-button>
            <a-button variant='warning' @click.native='sidebarType = "addChart"'>
                Add chart
            </a-button>
        </div>
    </div>
    <edit-sidebar
        ref='editSidebar'
        @reload-sight='$emit("reload-sight")' @edited='$emit("edited")'
        v-else-if='sidebarType === "edit"' />
    <add-chart-sidebar
        @reload-sight='$emit("reload-sight")'
        v-else-if="sidebarType === 'addChart'"/>
</div>
</template>

<script>
import { DETAIL_SIDEBARTYPE } from '@/store/actions/detail';
import EditSidebar from './EditSidebar';
import AddChartSidebar from './AddChartSidebar';

export default {
  computed: {
    name() { return this.$store.getters.sightName; },
    description() { return this.$store.getters.sightDescription; },
    isMine() {
      return this.$store.getters.sightAuthor === this.$store.getters.getProfile.username;
    },
    sightId() {
      return this.$store.getters.sightId;
    },
    sidebarType: {
      get() { return this.$store.getters.sidebarType; },
      set(value) { this.$store.commit(DETAIL_SIDEBARTYPE, value); },
    },
  },
  components: { EditSidebar, AddChartSidebar },
};
</script>

<style scoped lang='scss'>
@import '@/assets/scss/vars.scss';
#sidebar {
    width: 50%;
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
            display: flex;
            justify-content: space-between;
            button {
                width: 45%;
            }
        }
    }
}
</style>

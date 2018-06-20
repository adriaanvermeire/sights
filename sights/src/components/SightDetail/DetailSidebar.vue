<template>
<div id="sidebar">
    <div id="sidebar-content" v-if="!sidebarType || sidebarType === 'guest'">
        <div id="top">
            <h4>{{ name }}</h4>
            <p>{{ description }}</p>
        </div>

    </div>
    <edit-sidebar
        ref='editSidebar'
        @reload-sight='$emit("reload-sight")' @edited='$emit("edited")'
        v-else-if='sidebarType === "edit"' />
    <add-chart-sidebar
        @reload-sight='$emit("reload-sight")'
        v-else-if="sidebarType === 'addChart'"/>
    <div id="bottom" v-if='isMine' :class='{ delete: showDeleteConfirmation }'>
            <a-button variant='success' @click.native='sidebarType = "addChart"' v-if='sidebarType !== "addChart" && !showDeleteConfirmation'>
                Add chart
            </a-button>
            <a-button variant='warning' @click.native='sidebarType = "edit"' v-if='sidebarType !== "edit" && !showDeleteConfirmation'>
                Edit Sight
            </a-button>
            <a-button :variant='showDeleteConfirmation ? "warning": "danger"' @click.native='deleteConfirmation'>
                <icon v-if='!showDeleteConfirmation' name="trash"></icon>
                <span v-if='showDeleteConfirmation'>Sure?</span>
            </a-button>
            <a-button v-if='showDeleteConfirmation' variant='danger' @click.native='removeSight'>Yes</a-button>
            <a-button v-if='showDeleteConfirmation' variant='success' @click.native='showDeleteConfirmation = false'>Cancel</a-button>
        </div>
</div>
</template>

<script>
import { DETAIL_SIDEBARTYPE } from '@/store/actions/detail';
import SightService from '@/services/SightService';
import EditSidebar from './EditSidebar';
import AddChartSidebar from './AddChartSidebar';

export default {
  data() {
    return {
      showDeleteConfirmation: false,
    };
  },
  methods: {
    deleteConfirmation() {
      if (!this.showDeleteConfirmation) {
        this.showDeleteConfirmation = true;
      }
    },
    async removeSight() {
      await SightService.removeSight(this.sightId);
      this.$router.push({ name: 'MySights' });
    },
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

    }
    #bottom {
        display: flex;
        width: 100%;

        button:not(:last-child) {
            margin-right: 0.5em;
            flex: 1;
        }

        &.delete button {
            flex: 1;
        }
    }
}
</style>

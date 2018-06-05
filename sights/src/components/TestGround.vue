<template>
<div class="row d-flex justify-content-between px-4">
    <div

        v-for='number in [0,1,2,4]' :key="number">
        <card>
            <template slot="title">
                <h2 class="text-left">
                Hello World!
                </h2>
            </template>
            <template slot="actions">
                <div class="action">
                    <button @click='toggleSidebar(number)' class='btn btn-link'>
                        <icon name='info-circle' color='black'/>
                    </button>
                </div>
            </template>
            This is the Card body!
            <template slot="footer">
                <a href="#" class="card-link">Card Link</a>
            </template>
        </card>
    </div>
</div>
</template>

<script>
import Card from '@/components/Partials/Card';

export default {
  props: ['width'],
  data() {
    return {
      sidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar(id) {
      this.sidebarOpen = !this.sidebarOpen;
      console.log(`The sidebar is now ${this.sidebarOpen ? 'open' : 'closed'}! (${id})`);
    },
  },
  components: {
    Card,
  },
};
</script>

<style scoped>

</style>

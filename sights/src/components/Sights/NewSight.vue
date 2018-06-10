<template lang="html">
<div id="newSight" >
  <form-wizard ref='wizard' @on-complete='onComplete'
    title='Adding a new Sight' :hide-buttons='true'
    subtitle="You're not only making a Sight, you're making it easy."
    color='#09eba7'>
    <tab-content title='Creating dataset' icon='ti ti-plus'>
      <new-sight-form @sight-submit='formSubmit' @submit-success='submitSuccess'/>
    </tab-content>
    <tab-content title='Parsing dataset' icon='ti ti-reload'>
      <spinner text='Parsing dataset...'/>
    </tab-content>
    <tab-content title='Verifying types' icon='ti ti-check'>
      <pick-types v-if='parsingComplete' v-bind:data='data' @charts-submit='chartsSubmit' @charts-success='chartsSuccess'/>
    </tab-content>
    <tab-content title='Generating charts' icon='ti ti-bar-chart'>
      <spinner text='Generating Charts...'/>
    </tab-content>
  </form-wizard>
</div>
</template>

<script>
import PickTypes from '@/components/Sights/NewSight/PickTypes';
import Spinner from '@/components/Spinner/Spinner';
import NewSightForm from '@/components/Sights/NewSight/NewSightForm';
import { FormWizard, TabContent, WizardButton } from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import { SIGHT_INACTIVE } from '@/store/actions/sight';

export default {
  data() {
    return {
      loading: false,
      data: [],
      parsingComplete: false,
    };
  },
  methods: {
    formSubmit() {
      this.loading = true;
      this.$refs.wizard.nextTab();
    },
    submitSuccess(data) {
      this.loading = false;
      this.data = data;
      this.parsingComplete = true;
      this.$refs.wizard.nextTab();
    },
    chartsSubmit() {
      this.$refs.wizard.nextTab();
    },
    chartsSuccess() {
      this.$refs.wizard.$emit('on-complete');
    },
    onComplete() {
      this.$router.push({ name: 'Home' });
    },
  },
  components: {
    PickTypes, NewSightForm, FormWizard, TabContent, WizardButton, Spinner,
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch(SIGHT_INACTIVE);
    next();
  },
};
</script>

<style lang="scss" scoped>
</style>

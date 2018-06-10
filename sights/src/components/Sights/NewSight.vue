<template lang="html">
<div id="newSight" >
  <form-wizard ref='wizard' @on-complete='onComplete'
    title='Adding a new Sight' :hide-buttons='true'
    subtitle="You're not only making a Sight, you're making it easy."
    color='#09eba7' error-color='#EF476F'>
    <!-- Custom step to disable links -->
    <wizard-step
      slot-scope="props"
      slot="step"
      :tab="props.tab"
      :transition="props.transition"
      :index="props.index">
    </wizard-step>
    <tab-content ref='tab0' title='Creating dataset' icon='ti ti-plus'>
      <new-sight-form
        ref='form'
        @sight-submit='formSubmit'
        @submit-error='submitError' @submit-success='submitSuccess'/>
    </tab-content>
    <tab-content title='Parsing dataset' icon='ti ti-reload'>
      <spinner
      @animation-end='parsingAnimationEnded'
      ref='parsingSpinner' text='Parsing dataset' finish-text='Finished parsing!' />
    </tab-content>
    <tab-content title='Verifying types' icon='ti ti-check'>
      <pick-types
        v-if='parsingComplete' v-bind:data='data'
        @charts-submit='chartsSubmit' @charts-success='chartsSuccess'/>
    </tab-content>
    <tab-content title='Generating charts' icon='ti ti-bar-chart'>
      <spinner
      @animation-end='generatingAnimationEnded'
      ref='generatingSpinner' text='Generating Charts!' finish-text='Finished this Sight!' />
    </tab-content>
  </form-wizard>
</div>
</template>

<script>
import PickTypes from '@/components/Sights/NewSight/PickTypes';
import Spinner from '@/components/Spinner/Spinner';
import NewSightForm from '@/components/Sights/NewSight/NewSightForm';
import { FormWizard, TabContent, WizardStep } from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import { SIGHT_INACTIVE } from '@/store/actions/sight';

export default {
  data() {
    return {
      parsing: false,
      data: [],
      parsingComplete: false,
      generating: false,
    };
  },
  computed: {
    sight() {
      return this.$store.getters.sightId;
    },
  },
  methods: {
    formSubmit() {
      this.$refs.tab0.validationError = false;
      this.parsing = true;
      this.$refs.wizard.nextTab();
    },
    async submitSuccess(data) {
      this.parsing = false;
      this.data = data;
      this.parsingComplete = true;
      this.$refs.parsingSpinner.finish();
    },
    submitError(error) {
      this.$refs.tab0.validationError = true;
      this.$refs.form.showError(error);
      this.$refs.wizard.prevTab();
    },
    parsingAnimationEnded() {
      this.$refs.wizard.nextTab();
    },
    chartsSubmit() {
      this.generating = true;
      this.$refs.wizard.nextTab();
    },
    chartsSuccess() {
      this.generating = false;
      this.$refs.generatingSpinner.finish();
    },
    generatingAnimationEnded() {
      this.$refs.wizard.$emit('on-complete');
    },
    onComplete() {
      this.$router.push({ name: 'SightDetail', params: { id: this.sight } });
    },
  },
  components: {
    PickTypes, NewSightForm, FormWizard, TabContent, WizardStep, Spinner,
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch(SIGHT_INACTIVE);
    next();
  },
};
</script>

<style lang="scss" scoped>
</style>

<style>
  .vue-form-wizard .wizard-nav-pills>li>a {
    cursor: default !important;
  }
  .vue-form-wizard .wizard-nav-pills>li>a .wizard-icon-circle:focus{
    outline: none;
  }
</style>


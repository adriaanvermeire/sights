<template lang="html">
<div id="newSight" >
  <form-wizard title='Adding a new Sight' subtitle="You're not only making a Sight, you're making it easy." color='#09eba7'>
    <tab-content title='Creating dataset' :beforeChange="formSubmit" icon='ti ti-plus'>
      <new-sight-form v-if='!submitted' />
    </tab-content>
    <tab-content title='Parsing dataset' icon='ti ti-reload'>

    </tab-content>
    <tab-content title='Verifying types' icon='ti ti-check'>
      <pick-types v-if='submitted' v-bind:data='data'/>
    </tab-content>
    <tab-content title='Generating charts' icon='ti ti-bar-chart'>

    </tab-content>
    <template slot="footer" slot-scope="props">
      <div class="wizard-footer-right">
        <wizard-button v-if="!props.isLastStep" @click.native="props.nextTab()" class="wizard-footer-right" :style="props.fillButtonStyle">Next</wizard-button>
        <wizard-button v-else class="wizard-footer-right finish-button" :style="props.fillButtonStyle">{{props.isLastStep ? 'Done' : 'Next'}}</wizard-button>
      </div>
    </template>
  </form-wizard>
</div>
</template>

<script>
import PickTypes from '@/components/Sights/NewSight/PickTypes';
import NewSightForm from '@/components/Sights/NewSight/NewSightForm';
import { FormWizard, TabContent, WizardButton } from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import { SIGHT_INACTIVE } from '@/store/actions/sight';

export default {
  data() {
    return {
      submitted: false,
      data: [],
    };
  },
  methods: {
    formSubmit(data) {
      this.data = data;
      this.submitted = true;
    },
  },
  components: {
    PickTypes, NewSightForm, FormWizard, TabContent, WizardButton,
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch(SIGHT_INACTIVE);
    next();
  },
};
</script>

<style lang="scss" scoped>
</style>

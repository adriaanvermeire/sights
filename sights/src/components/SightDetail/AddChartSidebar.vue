<template>
    <div id="edit-sight">
        <div id="edit-form">
            <h4>Add Chart</h4>
            <hr>
            <form @submit.prevent='submitForm'>
                <div class="row">
                    <div class="col-12">
                        <label for="field">Subject field</label>
                    </div>
                    <div class="col-12">
                        <select
                            v-model='chartField'
                            v-validate="{required: true, in: fields}" required
                            name="field" id="field"
                            data-vv-as='subject field'>
                            <option value="" disabled>Choose the field</option>
                            <option v-for='field of fields' :key='field'>{{ field }}</option>
                        </select>
                    </div>
                    <div v-if="hasError('field')" class='error col-12'>
                        {{ firstError('field') }}
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <label for="type">Type of chart</label>
                    </div>
                    <div class="col-12">
                        <select
                            v-model='chartType'
                            v-validate="{required: true, in: types.map(t=>t.value)}" required
                            name="type" id="type">
                            <option value="" disabled>Choose the type</option>
                            <option v-for='type of types' :value="type.value" :key="type.value">{{ type.label }}</option>
                        </select>
                    </div>
                    <div v-if="hasError('type')" class='error col-12'>
                        {{ firstError('type') }}
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <a-button variant="success">Add chart</a-button>
                    </div>
                </div>
            </form>
        </div>
        <div id="bottom">
            <a-button @click.native='backToEdit' variant="warning">Back to editing</a-button>
        </div>
    </div>
</template>

<script>
import TextInput from '@/components/Inputs/TextInput';
import SightService from '@/services/SightService';
import ErrorMixin from '@/mixins/Error';
import SmallSpinner from '@/components/Spinner/SmallSpinner';
import { DETAIL_SIDEBARTYPE } from '@/store/actions/detail';

export default {
  mixins: [ErrorMixin],
  data() {
    return {
      backendErrors: [],
      resetLoading: false,
      resetDoneMessage: false,
      chartField: '',
      chartType: '',
      types: [
        { label: 'Bar', value: 'bar' },
        { label: 'Column', value: 'column' },
        { label: 'Area', value: 'area' },
        { label: 'Pie', value: 'pie' },
      ],
    };
  },
  methods: {
    async submitForm() {
      const res = await this.$validator.validateAll();
      if (res) {
        const response = await SightService.addChart(this.sightId, { type: this.chartType, field: this.chartField });
        const { data } = response;
        if (data.success) {
          this.backToEdit();
          this.$emit('reload-sight');
        }
      }
    },
    backToEdit() {
      this.$store.commit(DETAIL_SIDEBARTYPE, 'edit');
    },
  },
  watch: {
    edited(newV) {
      if (newV) {
        this.$emit('edited');
      }
    },
  },
  computed: {
    fields() {
      return this.$store.state.sight.fields;
    },
    sightId() {
      return this.$store.getters.sightId;
    },
  },
  components: { TextInput, SmallSpinner },
};
</script>

<style scoped lang='scss'>
@import '@/assets/scss/vars.scss';
#edit-sight {
    padding: 0 !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100%;
    & > * {
        padding: 1em;
    }
}
#edit-form {
    text-align: left;

    .row {
        margin-bottom: 1em;
    }

    select, #description {
        box-shadow: 0 0 2px 0 rgba(43,49,63,.14), 0 3px 5px 0 rgba(43,49,63,.06);
        background-color: #fdfdfd;
        border: 1px solid transparent;
        padding:  0.375rem;
        width: 100%;

        &:focus, &:active {
            outline: none;
        }

        &::placeholder {
            text-transform: lowercase;
            color: lighten(lightgray, 1%);
        }
    }

    #description {
    min-height: 20vh;
    }

    .actions {
        display: flex;
        align-items: center;

        & > * {
            margin-right: 0.5em;
        }
    }
}

.save-warning {
    background-color: $yellow;
    padding: 0.2em;
    color: $black;
    font-size: 0.8em;
}

.save-enter-active, .save-leave-active {
    transition: all 0.3s ease-out;
  }

.save-enter, .save-leave-to {
transform: translateY(-100%);
opacity: 0;
}

.resetDone-enter-active, .resetDone-leave-active {
    transition: all 0.3s ease-out;
  }

.resetDone-enter, .resetDone-leave-to {
    opacity: 0;
}

.error {
    text-align: left;
    color: $red;
}
</style>

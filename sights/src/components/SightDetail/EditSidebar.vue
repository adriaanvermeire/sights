<template>
    <div id="edit-sight">
        <transition name='save'>
            <div class="save-warning" v-if='editMessage'>
                You haven't saved or reset your changes yet.
            </div>
        </transition>
        <div id="edit-form">
            <h4>Editing Sight</h4>
            <router-link :to="{ name: 'SightDetail', params: { id: sightId }}">
              See public version
            </router-link>
            <hr>
            <form @submit.prevent="submitForm">
                <div class="row mb-2">
                    <div class="col">
                        <label for="name">Name</label>
                    </div>
                    <div class="col-12">
                        <text-input v-model.trim="name"
                            id='sightName'
                            placeholder="Name of your Sight"
                            v-validate="'required|min:5'"
                            name='sightName' autocomplete='sightName'
                            data-vv-as="name"
                            required />
                    </div>
                    <div v-if="hasError('sightName')" class='error col-12'>
                        {{ firstError('sightName') }}
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label for="sightCategory">Category</label>
                    </div>
                    <div class="col-12">
                        <select
                        id='sightCategory'
                        v-model="category"
                        class="mb-3" required
                        name='category'
                        v-validate="'required'">
                        <option value="" disabled>Select a category</option>
                        <option
                        v-for='category of categories'
                        :value="category.value" :key='category.text'>{{category.text}}</option>
                        </select>
                    </div>
                    <div v-if="hasError('sightCategory')" class='error col-12'>
                        {{ firstError('sightCategory') }}
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label for="description">Description</label>
                    </div>
                    <div class="col-12">
                        <textarea
                            v-model='description'
                            name="description" id="description" placeholder="What's your Sight about?"></textarea>
                    </div>
                </div>
                <div class="actions">
                    <a-button type="submit" variant='success' :disabled='!edited'>Save</a-button>
                    <a-button type='button' @click.native='resetForm' :disabled='!edited'>Reset</a-button>
                    <small-spinner v-if='resetLoading' />
                    <transition name="resetDone">
                        <span v-if='resetDoneMessage'>Done!</span>
                    </transition>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import TextInput from '@/components/Inputs/TextInput';
import CategoryService from '@/services/CategoryService';
import SightService from '@/services/SightService';
import { SIGHT_UPDATE_CATEGORY, SIGHT_UPDATE_DESCRIPTION, SIGHT_UPDATE_NAME } from '@/store/actions/sight';
import ErrorMixin from '@/mixins/Error';
import SmallSpinner from '@/components/Spinner/SmallSpinner';

export default {
  mixins: [ErrorMixin],
  data() {
    return {
      categories: [],
      edited: false,
      editMessage: false,
      backendErrors: [],
      resetLoading: false,
      resetDoneMessage: false,
    };
  },
  methods: {
    async submitForm() {
      if (this.edited) {
        const res = await this.$validator.validateAll();
        if (res) {
          this.backendErrors = [];
          const body = {
            description: this.description,
            name: this.name,
            category: this.category,
            id: this.$route.params.id,
          };
          try {
            const response = (await SightService.updateSight(body)).data;
            if (response.success) {
              this.resetForm();
            }
          } catch (err) {
            this.parseErrorResponse(err.response);
            this.$emit('submit-error');
          }
        }
      }
    },
    async loadCategories() {
      const rawCategories = (await CategoryService.all()).data.categories;
      rawCategories.forEach((cat) => {
        this.categories.push({ value: cat._id, text: cat.name });
      });
    },
    showEditMessage() {
      this.editMessage = true;
    },
    resetForm() {
      if (this.edited) {
        this.resetLoading = true;
        this.edited = false;
        this.editMessage = false;
        this.$emit('reload-sight');
      }
    },
    resetDone() {
      setTimeout(() => {
        this.resetLoading = false;
        this.resetDoneMessage = true;
      }, 500);

      setTimeout(() => {
        this.resetDoneMessage = false;
      }, 2500);
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
    name: {
      get() { return this.$store.getters.sightName; },
      set(value) {
        this.edited = true;
        this.$store.commit(SIGHT_UPDATE_NAME, value);
      },
    },
    description: {
      get() { return this.$store.getters.sightDescription; },
      set(value) {
        this.edited = true;
        this.$store.commit(SIGHT_UPDATE_DESCRIPTION, value);
      },
    },
    category: {
      get() {
        const categoryObj = this.categories.filter(c => c.text === this.$store.getters.sightCategory);
        if (categoryObj && categoryObj.length) {
          return categoryObj[0].value;
        }
        return '';
      },
      set(value) {
        this.edited = true;
        this.$store.commit(SIGHT_UPDATE_CATEGORY, this.categories.filter(c => c.value === value)[0].text);
      },
    },
    sightId() {
      return this.$store.getters.sightId;
    },
  },
  async mounted() {
    await this.loadCategories();
  },
  components: { TextInput, SmallSpinner },
};
</script>

<style scoped lang='scss'>
@import '@/assets/scss/vars.scss';
#edit-sight {
    padding: 0 !important;
}
#edit-form {
    text-align: left;
    padding: 1em;

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

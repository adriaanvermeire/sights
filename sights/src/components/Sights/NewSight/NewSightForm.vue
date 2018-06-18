<template>
<div class="form-wrapper container">
  <form @submit.prevent="submitForm"
    method="post" enctype="multipart/form-data" class=''>
    <span v-for='error in backendErrors' :key='error' class='text-danger'>{{ error }}</span>
    <div class="row mb-3 w-100">
      <div class="col-12 col-md-2
        d-flex justify-content-md-end justify-content-center align-items-center">
        <label for="sightName"><strong>Name</strong><span class="text-danger"> *</span></label>
      </div>
      <div class="col-md col-12">
        <text-input v-model.trim="sight.name"
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
    <div class="row mb-3 w-100 p-0">
      <div class="col-12 col-md-2
        d-flex justify-content-md-end justify-content-center align-items-center">
        <label for="sightFile"><strong>Dataset</strong><span class="text-danger"> *</span></label>
      </div>
      <div class="col-12 col-md-1 col-lg">
        <input
        class='form-control-file'
        type="file"
        id='sightFile'
        @change="onFileSelected"
        name='dataset'
        v-validate="'required|mimes:text/csv,application/json|size:5000'"
        required>
      </div>
      <div class="col-md col-lg-1 col-12
        d-flex justify-content-md-end justify-content-center align-items-center">
        <label for="sightEntrypoint"><strong>Entrypoint</strong></label>
      </div>
      <div class="col-12 col-md-6">
        <text-input v-model="sight.entrypoint"
                      id='sightEntrypoint'
                      type="text"
                      placeholder="JSON entrypoint: i.e. data"
                      name="entrypoint" autocomplete='entrypoint' />
      </div>
      <div v-if="hasError('dataset')" class='error col-12'>
        {{ firstError('dataset') }}
      </div>
    </div>
    <div class="row mb-3 w-100">
      <div class="col-12 col-md-2
        d-flex justify-content-md-end justify-content-center justify-content-end">
        <label for="sightCategory">
          <strong>Category</strong>
          <span class="text-danger"> *</span>
        </label>
      </div>
      <div class="col-md col-12">
        <select
        id='sightCategory'
        v-model="sight.category"
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
    <div class="row mb-3 w-100">
      <div class="col-12 col-md-2
        d-flex justify-content-md-end justify-content-center justify-content-end">
        <label for="sightCategory">
          <strong>Description</strong>
        </label>
      </div>
      <div class="col-md col-12">
        <textarea name="description" id="description" placeholder="What's your Sight about?"></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col d-flex justify-content-end">
        <a-button type="submit" variant='success' class='align-self-end'>
          Create Sight
        </a-button>
      </div>
    </div>
  </form>
</div>
</template>

<script>
import SightService from '@/services/SightService';
import CategoryService from '@/services/CategoryService';
import { SIGHT_ACTIVE } from '@/store/actions/sight';
import TextInput from '@/components/Inputs/TextInput';
import ErrorMixin from '@/mixins/Error';

export default {
  mixins: [ErrorMixin],
  data() {
    return {
      sight: {
        name: '',
        dataset: null,
        category: '',
        entrypoint: '',
      },
      data: [],
      categories: [],
      backendErrors: [],
    };
  },
  methods: {
    async submitForm() {
      const res = await this.$validator.validateAll();
      if (res) {
        this.backendErrors = [];
        const fd = new FormData();
        fd.append('dataset', this.sight.dataset, this.sight.dataset.name);
        fd.append('name', this.sight.name);
        fd.append('category', this.sight.category);
        fd.append('entrypoint', this.sight.entrypoint);
        this.$emit('sight-submit');
        try {
          const response = (await SightService.addSight(fd)).data;
          if (response.success) {
            this.$store.dispatch(SIGHT_ACTIVE, { sight: response.currentSight });
            this.$emit('submit-success', response.data);
          } else {
            this.$emit('submit-error', response.err);
          }
        } catch (error) {
          this.parseErrorResponse(error.response);
          this.$emit('submit-error');
        }
      }
    },
    onFileSelected(e) {
      this.sight.dataset = e.target.files[0];
    },
    showError(error) {
      this.errors.push(error);
    },
    parseErrorResponse(response) {
      const { errors } = response.data.err;
      for (let i = 0; i < errors.length; i += 1) {
        const error = errors[i];
        this.backendErrors.push(error.messages.join(', '));
      }
    },
  },
  async mounted() {
    const rawCategories = (await CategoryService.all()).data.categories;
    console.log(rawCategories);
    rawCategories.forEach((cat) => {
      this.categories.push({ value: cat._id, text: cat.name });
    });
  },
  components: { TextInput },
};
</script>

<style scoped lang='scss'>
@import '@/assets/scss/vars.scss';
.error {
    text-align: right;
    color: $red;
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

</style>

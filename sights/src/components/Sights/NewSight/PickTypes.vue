<template lang="html">
  <div class="container-fluid">
   <div id="pickTypes" class='d-flex justify-content-center flex-column align-items-center'>
    <p>We recognized the following fields. Please select what their type is.</p>
    <p>The type will specify how each of the fields will be evaluated and
      used to create your graphs.</p>
    <button @click.prevent='submit' class='btn btn-primary mb-2'>Generate Sight</button>
    <div class="form-group m-0">
      <input type="checkbox" id='bivariate' v-model='bivariate' name='bivariate'>
      <label for="bivariate">Also generate bivariate (2 variables) charts <b>(experimental !)</b></label>
    </div>
    <div class="typeChecks d-flex mb-2 justify-content-center row px-2">
      <div v-for="field in fields" :key="field.name" class="field card col-lg-2 col-md-3 col-12 p-2 m-3">
        <h2>{{ field.name }}</h2>
        <select v-model="field.type" class="mb-3 form-control">
          <option v-for="type of datatypes" :value="type" :key='type'>{{ type }}</option>
        </select>
        <div class="examples">
          <b class='mr-1'>Small sample of data:</b>
         <p>{{ field.samples | join }}</p>
        </div>
      </div>
    </div>
    <button @click.prevent='submit' class="btn btn-primary mb-2">Generate Sight</button>
    <div class="form-group">
      <input type="checkbox" id='bivariate' v-model='bivariate' name='bivariate'>
      <label for="bivariate">Also generate bivariate (2 variables) charts <b>(experimental !)</b></label>
    </div>

  </div>
  </div>
</template>

<script>
/* eslint-disable no-restricted-syntax */
import SightService from '@/services/SightService';

export default {
  data() {
    return {
      datatypes: [],
      fields: [],
      bivariate: false,
    };
  },
  props: ['data'],
  methods: {
    submit() {
      const fields = this.fields.map((field) => {
        const f = field;
        delete f.samples;
        return f;
      });
      SightService.submitTypes({
        fields,
        currentSight: this.$store.getters.sightId,
        bivariate: this.bivariate,
      }) // TODO: Add notification for successfully creating sight
        .then(() => { this.$router.push({ name: 'Home' }); })
        .catch(e => console.log(e));
    },
  },
  created() {
    SightService.getDatatypes()
      .then(resp => resp.data)
      .then((data) => { this.datatypes = data.datatypes; })
      .then(() => {
        for (const key of Object.keys(this.data)) {
          this.fields.push({
            name: key,
            type: this.data[key].type,
            samples: this.data[key].samples,
          });
        }
      })
      .catch(e => console.log(e));
  },
};
</script>

<style lang="scss" scoped>
</style>

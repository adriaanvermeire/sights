<template lang="html">
  <div id="pickTypes" clas='d-flex justify-content-center'>
    <p>We recognized the following fields. Please select what their type is.</p>
    <p>The type will specify how each of the fields will be evaluated and
      used to create your graphs.</p>
    <button @click.prevent='submit' class='btn btn-primary'>Next step</button>

    <div class="typeChecks d-flex flex-wrap mb-5">
      <div v-for="field in fields" :key="field.name" class="field card w-25 p-2 m-3">
        <h2>{{ field.name }}</h2>
        <select v-model="field.type" class="mb-3 form-control">
          <option v-for="type of datatypes" :value="type" :key='type'>{{ type }}</option>
        </select>
        <ul>
          <li v-for='(sample, index) in field.samples' :key='sample + index'>{{ sample }}</li>
        </ul>
      </div>
    </div>
    <button @click.prevent='submit' class="btn btn-primary">Next step</button>
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
      }) // TODO: Add notification for successfully creating sight
        .then((response) => { this.$router.push({ name: 'Home' }); })
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

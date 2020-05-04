<template>
  <div class="form-wrapper">
    <h2>Here you can <strong>log in </strong></h2>
    <b-form @submit.prevent="submitForm">
      <b-form-group id="input-group-1" label="Your Name:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          required
          placeholder="Enter password"
          type="password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Log in</b-button>
    </b-form>

    <b-card class="mt-3" header="Form Data Result - will be send to backend">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm() {
      alert(JSON.stringify(this.form));
    }
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
}

h2 strong {
  color: #42b983;
}
.form-wrapper {
  width: 40%;
  margin: 50px auto;
  text-align: left;
}
</style>


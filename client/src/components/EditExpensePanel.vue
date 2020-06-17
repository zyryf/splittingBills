<template>
  <div class="expense">
    <b-card class="mt-3" header="Form Data Result">
      <b-form>
        <b-form-group
          id="input-group-1"
          label="Title"
          label-for="input-1"
          description="We'll never share your email with anyone else."
          >
          <b-form-input id="input-1" type="title" required placeholder="Enter title" value=""></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Food:" label-for="input-3">
          <b-form-select id="input-3" required></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
          <b-form-input id="input-2" required placeholder="Enter name"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4">
          <b-form-checkbox-group id="checkboxes-4">
            <b-form-checkbox value="me">Check me out</b-form-checkbox>
            <b-form-checkbox value="that">Check that out</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ["expense"],
  mounted() {
    console.log(this.expense)
  },
  computed: {
    getTitle(){
      return 
    }
    },
};

</script>


<style scoped>
.expense {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background-color: rgba(98, 98, 98, 0.404);
}
</style>
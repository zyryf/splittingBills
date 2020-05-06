<template>
  <div class="form-wrapper">
    <h2>Here you can <strong>sign up</strong></h2>
    <b-form @submit.prevent="submitForm">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          :class="{
            invalid: $v.email.$error,
            success: !$v.email.$error && $v.email.$dirty
          }"
          id="input-1"
          v-model.lazy="email"
          type="email"
          required
          placeholder="Enter email"
          @blur="$v.email.$touch()"
        ></b-form-input>
        <p v-if="!$v.email.required && $v.email.$dirty" class="error my-1">
          Email required!
        </p>

        <p v-if="!$v.email.email" class="error my-1">
          Provide valid email adress!
        </p>
        <p v-if="!$v.email.unique" class="error my-1">Email already in use!</p>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          :class="{
            invalid: $v.name.$error,
            success: !$v.name.$error && $v.name.$dirty
          }"
          id="input-2"
          v-model="name"
          @blur="$v.name.$touch()"
          required
          placeholder="Enter name"
        ></b-form-input>
        <p v-if="!$v.name.required && $v.name.$dirty" class="error my-1">
          Name required!
        </p>
        <p v-if="!$v.name.minLength" class="error my-1">
          Name must be at least 3 characters length!
        </p>
        <p v-if="!$v.name.unique" class="error my-1">Email already in use!</p>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Password:"
        label-for="input-3"
        description="Your password is enrcypted, hence no one can see it."
      >
        <b-form-input
          id="input-3"
          :class="{
            invalid: $v.password.$error,
            success: !$v.password.$error && $v.password.$dirty
          }"
          v-model="password"
          @blur="$v.password.$touch()"
          required
          placeholder="Enter password"
          type="password"
        ></b-form-input>
        <p v-if="$v.password.$error" class="error my-1">
          Password must be at least 6 characters length!
        </p>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Confirm password:"
        label-for="input-4"
      >
        <b-form-input
          id="input-4"
          :class="{
            invalid: $v.confirmedPassword.$error,
            success: !$v.confirmedPassword.$error && $v.confirmedPassword.$dirty
          }"
          v-model="confirmedPassword"
          required
          @blur="$v.confirmedPassword.$touch()"
          placeholder="Confirm password"
          type="password"
        ></b-form-input>
        <p v-if="$v.confirmedPassword.$error" class="error my-1">
          Passwords are not the same!
        </p>
      </b-form-group>

      <b-button type="submit" :disabled="$v.$invalid" variant="primary"
        >Submit</b-button
      >
    </b-form>
    <b-alert v-if="success" show variant="success" class="my-2"
      >User created! Go to the
      <router-link to="/login">log in</router-link> page.
    </b-alert>
    <b-alert v-if="error" show variant="danger" class="my-2">
      {{ error }}</b-alert
    >
  </div>
</template>

<script>
import axios from "axios";
import { email, required, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: "",
      name: "",
      password: "",
      confirmedPassword: "",
      error: "",
      success: false
    };
  },
  validations: {
    email: {
      required,
      email,
      // WHY DE HELL DOES IT FIRE ON INPUT???
      async unique(val) {
        let matched = false;
        if (val === "") return true;
        try {
          const users = await axios.get("/api/users");
          users.data.forEach(user => {
            if (val === user.email) {
              matched = true;
            }
          });

          return matched ? false : true;
        } catch {
          this.error = "Oooops. Something went wrong :( Server error!";
        }
      }
    },
    name: {
      required,
      minLength: minLength(3),
      unique: async val => {
        let matched = false;
        if (val === "") return true;
        try {
          const users = await axios.get("/api/users");
          users.data.forEach(user => {
            if (val === user.name) {
              matched = true;
            }
          });

          return matched ? false : true;
        } catch {
          this.error = "Oooops. Something went wrong :( Server error!";
        }
      }
    },
    password: {
      required,
      minLength: minLength(6)
    },
    confirmedPassword: {
      sameAs: sameAs("password")
    }
  },
  methods: {
    async submitForm() {
      const user = {
        email: this.email,
        name: this.name,
        password: this.password
      };

      try {
        await axios.post("/api/users", user);
        this.success = true;
        this.email = "";
        this.name = "";
        this.password = "";
        this.confirmedPassword = "";
      } catch (err) {
        if (err.response) {
          this.error = err.response.data.title;
        } else {
          this.error = "Oooops. Something went wrong :( Server error!";
        }
      }
    }
  }
};
</script>

<style scoped>
.form-wrapper {
  width: 40%;
  text-align: left;
  margin: 50px auto;
}

h2 {
  margin: 20px auto;
  text-align: center;
}

h2 strong {
  color: #42b983;
}

.invalid {
  border: 1px solid red;
}

.success {
  border: 1px solid green;
}
.error {
  color: red;
}
</style>

<template>
  <div class="register-form">
    <ValidationObserver tag="div" ref="observer" v-slot="{ passes }">
      <b-form 
        @submit.prevent="passes(onSubmit)" 
        method="POST" 
        data-netlify="true"
        name="weekender-2-registration"
      >
        <ValidationProvider tag="div" name="Name" rules="required" mode="lazy" v-slot="{ valid, errors }">
          <b-form-group id="input-group-1" label="Full name" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="registrationData.name"
              placeholder="Enter your full name"
              aria-describedby="input-1-live-feedback"
              :state="errors[0] ? false : (valid ? true : null)"
            ></b-form-input>
            <b-form-invalid-feedback id="input-1-live-feedback">{{ errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider tag="div" name="Email" rules="required|email" mode="lazy" v-slot="{ valid, errors }">
          <b-form-group id="input-group-2" label="Email address" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="registrationData.email"
              type="email"
              placeholder="Enter your email"
              aria-describedby="input-2-live-feedback"
              :state="errors[0] ? false : (valid ? true : null)"
            ></b-form-input>
            <b-form-invalid-feedback id="input-2-live-feedback">{{ errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <b-form-group id="input-group-3" label="Saturday game system" label-for="input-3">
          <b-form-select
            id="input-3"
            v-model="registrationData.dayOne"
            :options="systems.dayOne"
            required
          ></b-form-select>
        </b-form-group>
        <b-form-group id="input-group-4" label="Sunday game system" label-for="input-4">
          <b-form-select
            id="input-4"
            v-model="registrationData.dayTwo"
            :options="systems.dayTwo"
            required
          ></b-form-select>
        </b-form-group>
        <b-button type="submit" block variant="dark" class="float-right">Register</b-button>
      </b-form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import axios from "axios";

export default {
  name: "RegisterForm",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      systems: {
        dayOne: [
          "None",
          "Drowned Earth",
          "Vanguard",
          "Aristeia!",
          "Middle Earth SBG"
        ],
        dayTwo: [
          "None",
          "Warhammer 40k",
          "The Walking Dead: All Out War",
          "Warcry",
          "Middle Earth SBG: Battle Companies"
        ]
      },
      registrationData: {
        name: null,
        email: null,
        dayOne: "None",
        dayTwo: "None"
      }
    };
  },
  methods: {
    encode (data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },
    onSubmit() {
      const vm = this;
      const axiosConfig = {
        header: { "Content-Type": "application/x-www-form-urlencoded" }
      };
      axios
        .post(
          `/thanks?name=${vm.registrationData.name}`,
          vm.encode({
            "form-name": "weekender-2-registration",
            ...vm.registrationData
          }),
          axiosConfig
        )
        .then(() => {
          console.log(vm.registrationData.name);
          this.$router.push({
            name: "thanks",
            params: {
              name: vm.registrationData.name
            },
            query: { 
              name: vm.registrationData.name 
            }
          });
        })
        .catch(error => {
          console.log(error);
          vm.errored = true;
        });
      // axios
      //   .get("//www.mocky.io/v2/5d81420c30000069006995c6")
      //   .then(response => {
      //     console.log(response.data.name);
      //     this.$router.push({
      //       name: "thanks",
      //       params: {
      //         name: response.data.name
      //       },
      //       query: { 
      //         name: response.data.name 
      //       }
      //     });
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     this.errored = true;
      //   });
    }
  }
};
</script>

<style>
.register-form {
  width: 100%;
  float: left;
}
.register-form .btn-primary {
  background: #e53e3e;
  border-color: #e53e3e;
  color: #fff;
}
</style>

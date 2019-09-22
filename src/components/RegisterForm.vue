<template>
  <div class="register-form" :class="{ 'register-form--submitting' : submitting }">
    <ValidationObserver tag="div" ref="observer" v-slot="{ passes }">
      <b-form 
        @submit.prevent="passes(onSubmit)" 
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
        <b-button type="submit" block variant="dark" class="float-right" ref="submitBtn">Register</b-button>
      </b-form>
    </ValidationObserver>
    <div class="loading" v-if="submitting">
      <div class="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
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
      submitting: false,
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
      this.submitting = true;
      this.$refs.submitBtn.blur();
      axios
        .post("https://script.google.com/a/toptablegaming.com/macros/s/AKfycbxgCtXkk3kUij8bb20ortATSeeLJ2whkY9dmNEV/exec", this.encode(this.registrationData))
        .then(response => {
          console.log(response.data);
          this.$router.push({
            name: "thanks",
            params: {
              name: this.registrationData.name
            },
            query: { 
              name: this.registrationData.name 
            }
          });
          this.submitting = false;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
    }
  }
};
</script>

<style>
.register-form {
  width: 100%;
  float: left;
  position: relative;
}
.register-form form {
  position: relative;
  z-index: 1;
}
.register-form .btn-primary {
  background: #e53e3e;
  border-color: #e53e3e;
  color: #fff;
}
.loading {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255,255,255,0.9);
}
.loader {
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  top: 50%;
  left: 50%;
  margin: -32px 0 0 -32px;
}
.loader div {
  position: absolute;
  top: 27px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background:#e53e3e;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.loader div:nth-child(1) {
  left: 6px;
  animation: loading1 0.6s infinite;
}
.loader div:nth-child(2) {
  left: 6px;
  animation: loading2 0.6s infinite;
}
.loader div:nth-child(3) {
  left: 26px;
  animation: loading2 0.6s infinite;
}
.loader div:nth-child(4) {
  left: 45px;
  animation: loading3 0.6s infinite;
}
@keyframes loading1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes loading3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes loading2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
}
</style>

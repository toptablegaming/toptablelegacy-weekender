<template>
  <div class="home">
    <RegisterForm />
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterForm from '@/components/RegisterForm.vue'

export default {
  name: 'home',
  components: {
    RegisterForm
  },
  metaInfo: {
    title: 'Top Table Legacy Weekender 2 - Registration',
    htmlAttrs: {
      lang: 'en',
      amp: true
    }
  }
}
</script>

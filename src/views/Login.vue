<template>
  <div class="login">
    <b-jumbotron
      heade="Vue.js Chat"
      lead="Powereed by Chatkit SDK and Bootstrap-View"
      bg-variant="info"
      text-variant="white"
    >
      <p>for more information visit website</p>
      <p-btn target="_blank" href="https://pusher.com/chatkit">More Info</p-btn>
    </b-jumbotron>
    <b-container>
      <b-row>
        <b-col lg="4" md="3"></b-col>
        <b-col lg="4" md="6">
          <LoginForm />
        </b-col>
        <b-col lg="4" md="3"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'

export default({
    name: 'login',
    components: {
        LoginForm
    }
})


</script>
<template>
  <div class="login">
    <b-jumbotron
      header="Vue.js Chat"
      lead="Powereed by Chatkit SDK and Bootstrap-View"
      bg-variant="info"
      text-variant="white"
    >
      <p>for more information visit website</p>
      <BButton target="_blank" href="https://pusher.com/chatkit">More Info</BButton>
    </b-jumbotron>
    <BContainer>
      <BRow>
        <BCol lg="4" md="3"></BCol>
        <BCol lg="4" md="6">
          <LoginForm />
        </BCol>
        <BCol lg="4" md="3"></BCol>
      </BRow>
    </BContainer>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "login",
  components: {
    LoginForm
  },
  
};
</script>

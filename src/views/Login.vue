<template>
  <div class="login">
    <div class="bg-light p-5 rounded-lg m-3 bg-success text-white" header="Vue.js Chat"
      lead="Powereed by Chatkit SDK and Bootstrap-View">
      <p class="lead">for more information visit website</p>
      <BButton target="_blank" href="https://pusher.com/chatkit">More Info</BButton>
    </div>
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

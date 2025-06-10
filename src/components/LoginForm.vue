<template>
  <div class="login-form">
    <h5 class="text-center">Chat Login</h5>
    <hr />
    <BForm @submit.prevent="onSubmit">
      <BAlert variant="danger" :show="hasError">{{ error }}</BAlert>

      <BFormGroup class="mb-2" id="userInputGroup" label="User Name" label-for="userInput">
        <BFormInput id="userInput" type="text" placeholder="Enter User Name" v-model="userId" autocomplete="off"
          :disabled="loading" required></BFormInput>
      </BFormGroup>

      <BButton type="submit" variant="primary" class="ld-ext-right" v-bind:class="{ running: loading }"
        :disabled="isValid">
        Login
        <div class="ld ld-ring ld-spin"></div>
      </BButton>
    </BForm>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "login-form",
  data() {
    return {
      userId: ""
    };
  },
  computed: {
    isValid: function () {
      const result = this.userId.length < 3;
      return result ? result : this.loading;
    },
    ...mapState(["loading", "error"]),
    ...mapGetters(["hasError"])
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    async onSubmit() {
      const result = await this.login(this.userId);
      if (result) {
        this.$router.push('chat');
      }
    }
  }
};
</script>

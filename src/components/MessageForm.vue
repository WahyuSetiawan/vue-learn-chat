<template>
  <div class="message-form ld-over">
    <small class="text-muted">@{{ user.username }}</small>

    <BForm @submit.prevent="onSubmit" class="ld-over" v-bind:class="{ running: sending }">
      <div class="ld ld-ring ld-spin"></div>
      <BAlert variant="danger" :show="hasError">{{ error }}</BAlert>
      <BFormGroup class="mb-2">
        <BFormInput id="message-input" type="text" v-model="message" @input="isTyping" placeholder="Enter Message"
          autocomplete="off" required />
      </BFormGroup>

      <div class="clearfix">
        <BButton type="submit" variant="primary" class="float-right">Send</BButton>
      </div>
    </BForm>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import useStreamChat from '../composables/useStreamChat.js';

export default {
  name: "message-form",
  data() {
    return {
      message: "",
      typingTimeout: null,
    };
  },
  computed: {
    ...mapState(["user", "sending", "error", "activeRoom"]),
    ...mapGetters(["hasError"])
  },
  methods: {
    ...mapActions([
      'sendMessage',
    ]),
    async onSubmit() {
      const result = await this.sendMessage(this.message);
      if (result) {
        this.messagee = '';
      }
    },
    async isTyping() {
      await useStreamChat().startTyping();

      if (this.typingTimeout) {
        clearTimeout(this.typingTimeout);
      }

      this.typingTimeout = setTimeout(async () => {
        await useStreamChat().stopTyping();
      }, 2000);
    }
  },
};
</script>

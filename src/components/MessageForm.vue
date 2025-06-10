<template>
  <div class="message-form ld-over">
    <small class="text-muted">@{{ user.username }}</small>

    <BForm @submit.prevent="onSubmit" class="ld-over" v-bind:class="{ running: sending}">
      <div class="ld ld-ring ld-spin"></div>
      <BAlert variant="danger" :show="hasError">{{ error }}</BAlert>
      <BFormGroup>
        <BFormInput
          id="message-input"
          type="text"
          v-model="message"
          placeholder="Enter Message"
          autocomplete="off"
          required
        />
      </BFormGroup>

      <div class="clearfix">
        <b-button type="submit" variant="primary" class="float-right">Send</b-button>
      </div>
    </BForm>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "message-form",
  data() {
    return {
      message: ""
    };
  },
  computed: {
    ...mapState(["user", "sending", "error", "activeRoom"]),
    ...mapGetters(["hasError"])
  },
  methods: {
    async onSubmit(){

    } 
  },
};
</script>

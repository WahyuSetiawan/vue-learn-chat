<template>
  <div class="chat-dashboard">
    <ChatNavBar />
    <BContainer fluid class="ld-over" v-bind:class="{ class: loading }">
      <div class="ld ld-ring ld-spin"></div>

      <BRow>
        <BCol cols="2">
          <RoomList />
        </BCol>

        <BCol cols="8">
          <BRow>
            <BCol id="chat-content">
              <MessageList />
            </BCol>
          </BRow>

          <BRow>
            <BCol>
              <MessageForm />
            </BCol>
          </BRow>
        </BCol>

        <BCol cols="2">
          <UserList />
        </BCol>
      </BRow>
    </BContainer>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

const ChatNavBar = defineAsyncComponent(() =>
  import("@/components/ChatNavBar.vue"),
);
const RoomList = defineAsyncComponent(() =>
  import("@/components/RoomList.vue")
);
const MessageList = defineAsyncComponent(() =>
  import("@/components/MessageList.vue"));
const MessageForm = defineAsyncComponent(() =>
  import("@/components/MessageForm.vue"));
const UserList = defineAsyncComponent(() =>
  import("@/components/UserList.vue"));

import { mapState } from "vuex";
import useStreamChat from "@/composables/useStreamChat.js";

export default {
  name: "Chat",
  components: {
    ChatNavBar,
    RoomList,
    UserList,
    MessageList,
    MessageForm
  },
  computed: {
    ...mapState(["loading"])
  },
  beforeDestroy() {
    useStreamChat().leaveRoom();
  },
};
</script>

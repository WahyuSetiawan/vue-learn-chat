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
import ChatNavBar from "@/components/ChatNavBar.vue";
import RoomList from "@/components/RoomList.vue";
import MessageList from "@/components/MessageList.vue";
import MessageForm from "@/components/MessageForm.vue";
import UserList from "@/components/UserList.vue";
import { mapState } from "vuex";
import chatkit from "../chatkit.js";

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
    chatkit.leaveRoom();
  },
};
</script>

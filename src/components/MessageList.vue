<template>
  <div class="message-list">
    <h4>Messages</h4>
    <hr />

    <div id="chat-message" class="message-group" v-chat-scroll="{smooth:true}">
      <div class="message" v-for="(message, index) in messages" :key="index">
        <div class="clearfix">
          <h4 class="message-title">{{ message.name }}</h4>
          <small class="text-muted float-right">@{{ message.username }}</small>
        </div>

        <p class="message-text">{{message.text}}</p>

        <div class="clearfix">
          <small class="text-muted float-right">{{message-date}}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "message-list",
  computed: {
    ...mapState(["messages"])
  }
};
</script>

<style>
.message-text {
  margin-bottom: 15px;
  margin-right: 15px;
}

.message-group {
  height: 65vh !important;
  overflow-y: scroll;
}

.message {
  border: 1px solid lightblue;
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 15px;
}

.message-title {
  font-size: 1rem;
  display: inline;
}

.message-text {
  color: gray;
  margin-bottom: 9;
}

.user-typing {
  height: 1rem;
}
</style>
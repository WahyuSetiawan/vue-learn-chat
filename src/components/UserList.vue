<template>
  <div class="user-list">
    <h4>Members</h4>

    <hr />

    <BListGroup>
      <BListGroupItem v-for="user in users" :key="user.username">
        {{ user.name }} <br>
        <BBadge :variant="statusColor(user.online)" pill>{{ statusTitle(user.online) }}</BBadge>
      </BListGroupItem>
    </BListGroup>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "user-list",
  computed: {
    ...mapState(["loading", "users"])
  },
  methods: {
    statusColor(status) {
      return status ? "success" : "warning";
    },
    statusTitle(status) {
      return status ? "Online" : "Offline";
    }
  }
};
</script>

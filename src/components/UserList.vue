<template>
  <div class="user-list">
    <h4>Members</h4>

    <hr />

    <BListGroup>
      <BListGroupItem v-for="user in users" :key="user.username">
        {{user.name}}
        <BBadge v-if="user.presence" :variant="statusColor(user.presence)" pill>{{ user.presence }}</BBadge>
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
      return status === "online" ? "success" : "warning";
    }
  }
};
</script>

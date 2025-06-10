<template>
  <BNavbar id="chat-navbar" toggleable="md" type="dark" variant="info">
    <BNavbarBrand href="#">Vue Chat</BNavbarBrand>

    <BNavbarBrand></BNavbarBrand>

    <BNavbarNav class="ml-auto">
      <BNavText>{{ user.name }} | </BNavText>
      <BNavItem href="#" @click="onLogout" active>
        Logout
      </BNavItem>
    </BNavbarNav>
  </BNavbar>
</template>

<script>
import ILucideLogOut from "~icons/lucide/log-out"
import { mapState, mapActions } from "vuex";

export default {
  name: "ChatNavBar",
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapActions(['logout']),
    async onLogout() {
      this.logout();
      this.$router.push('/');
    },
  },
};
</script>

<style>
#chat-navbar {
  margin-bottom: 15px;
}
</style>

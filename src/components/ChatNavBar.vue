<template>
  <BNavbar id="chat-navbar" toggleable="md" type="dark" variant="info">
    <BNarbarBrand href="#">Vue Chat</BNarbarBrand>

    <BNarbarBrand></BNarbarBrand>

    <BNavbarNav class="ml-auto">
      <BNavText>{{user.name}}</BNavText>
      <BNavItem href="#" active>Logout</BNavItem>
    </BNavbarNav>
  </BNavbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ChatNavBar",
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style>
#chat-navbar {
  margin-bottom: 15px;
}
</style>

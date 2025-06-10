<template>
  <div class="user-list">
    <h4>Members</h4>

    <BButton @click="nestedModal1 = !nestedModal1" variant="success" v-if="isAdmin()">
      <ILucidePlus /> Member
    </BButton>
    <hr />

    <BModal v-model="nestedModal1" size="md" title="Tambahkan Member Baru" v-if="isAdmin()" ok-only centered
      @ok="onAddMember">
      <BFormGroup class="mb-2" id="userInputGroup" label="User Name" label-for="userInput">
        <BFormInput id="userInput" type="text" placeholder="Enter User Name" v-model="newUserId" autocomplete="off"
          :disabled="isLoadingAddMember" required></BFormInput>
      </BFormGroup>
    </BModal>

    <BListGroup>
      <BListGroupItem v-for="user in users" :key="user.username">
        <div class="d-flex justify-content-between align-items-center">
          {{ user.name }}
          <ILucideTrash v-if="isAdmin()" @click="removeMember(user.username)" />
        </div>
        <div class="mt-1">
          <BBadge :variant="statusColor(user.online)" pill>{{ statusTitle(user.online) }}</BBadge>
        </div>
      </BListGroupItem>
    </BListGroup>
  </div>
</template>

<script>
import { ref } from 'vue';
import { mapState, mapActions } from "vuex";

import ILucidePlus from '~icons/lucide/plus';
import ILucideTrash from '~icons/lucide/trash';

export default {
  name: "user-list",
  data() {
    return {
      newUserId: ""
    };
  },
  setup() {
    const nestedModal1 = ref(false);

    return {
      nestedModal1
    }
  },
  computed: {
    ...mapState(["loading", "users", "isLoadingAddMember", "user"]),
  },
  methods: {
    ...mapActions(["addMember", "removeMember"]),
    statusColor(status) {
      return status ? "success" : "warning";
    },
    statusTitle(status) {
      return status ? "Online" : "Offline";
    },
    onAddMember() {
      alert("tambahkan user dengan " + this.newUserId);
      this.addMember(this.newUserId);
    },
    isAdmin() {
      return this.user.isAdmin || false;
    },
    onRemoveMember(userId) {
      this.removeMember(userId);
    }
  }
};
</script>

<style>
/* just a little example of the variables and classes for stack */
.modal {
  --bs-modal-zindex: 1900;
  transform: translate(calc((var(--b-count, 0) - var(--b-position, 0)) * 20px),
      calc((var(--b-count, 0) - var(--b-position, 0)) * 20px));
  transition:
    transform 0.5s,
    opacity 0.15s linear !important;
}

.modal:not(.stack-inverse-position-0) {
  opacity: calc(1 - ((var(--b-count, 0) - var(--b-position, 0)) * 0.1));
}

.modal-backdrop:not(.stack-inverse-position-0) {
  opacity: 0 !important;
}
</style>

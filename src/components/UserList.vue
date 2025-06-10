<template>
  <div class="user-list">
    <h4>Members</h4>

    <BButton @click="nestedModal1 = !nestedModal1">Tambah Member</BButton>
    <hr />

    <BModal v-model="nestedModal1" size="md" title="Tambahkan Member Baru" ok-only centered @ok="onAddMember">
      <BFormGroup class="mb-2" id="userInputGroup" label="User Name" label-for="userInput">
        <BFormInput id="userInput" type="text" placeholder="Enter User Name" v-model="newUserId" autocomplete="off"
          :disabled="isLoadingAddMember" required></BFormInput>
      </BFormGroup>
    </BModal>

    <BListGroup>
      <BListGroupItem v-for="user in users" :key="user.username">
        {{ user.name }} <br>
        <BBadge :variant="statusColor(user.online)" pill>{{ statusTitle(user.online) }}</BBadge>
      </BListGroupItem>
    </BListGroup>
  </div>
</template>

<script>
import { ref } from 'vue';
import { mapState, mapActions } from "vuex";

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
    ...mapState(["loading", "users", "isLoadingAddMember"]),
  },
  methods: {
    ...mapActions(["addMember"]),
    statusColor(status) {
      return status ? "success" : "warning";
    },
    statusTitle(status) {
      return status ? "Online" : "Offline";
    },
    onAddMember() {
      alert("tambahkan user dengan " + this.newUserId);
      this.addMember(this.newUserId);
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

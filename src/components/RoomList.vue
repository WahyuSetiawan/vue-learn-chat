<template>
  <div class="room-list" w>
    <h4>Channels</h4>
    <hr />

    <BListGroup v-if="activeRoom">
      <BListGroupItem v-for="room in rooms" :key="room.name" :active="activeRoom.id === room.id" href="#"
        style="text-overflow: ellipsis;width: 100%; white-space: nowrap; overflow: hidden;" @click="onChange(room)">
        # {{ simpleName(room.name) }}
      </BListGroupItem>
    </BListGroup>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "RoomList",
  computed: {
    ...mapState(["rooms", "activeRoom"])
  },
  methods: {
    ...mapActions([
      'changeRoom'
    ]),
    onChange(room) {
      this.changeRoom(room);
    },
    simpleName(name) {
      return name;
    }
  },
};
</script>

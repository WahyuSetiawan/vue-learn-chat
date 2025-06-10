<template>
  <div class="room-list">
    <h4>Channels</h4>
    <hr />

    <BListGroup v-if="activeRoom">
      <BListGroupItem
        v-for="room in rooms"
        :key="room.name"
        :active="activeRoom.id === room.id"
        href="#"
        @click="onChange(room)"
      ># {{room.name}}</BListGroupItem>
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
    onChange(room){
      this.changeRoom(room);
    }
  },
};
</script>

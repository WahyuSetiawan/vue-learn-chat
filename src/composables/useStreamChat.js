import dayjs from 'dayjs';
import { StreamChat } from 'stream-chat';
import { ref } from 'vue';
import store from '../store';

const KEY_STREAM = import.meta.env.VITE_KEY_STREAM;

export default function useStreamChat() {
  const client = StreamChat.getInstance(KEY_STREAM);
  const currentUser = ref(null);
  const activeChannel = ref(null);

  // --- Core Functions ---
  const connectUser = async (userId) => {
    const userToken = client.devToken(userId);

    await client.connectUser(
      {
        id: userId,
        name: userId,
      },
      userToken,
      { presence: true }
    );

    currentUser.value = client.user;
    currentUser.value.rooms = await getAllChannels();

    return currentUser.value;
  };

  const getAllChannels = async () => {
    try {
      const filter = { members: { $in: [currentUser.value.id] } };
      const sort = { created_at: -1 };
      const options = { limit: 20, presence: true };

      return await client.queryChannels(filter, sort, options);
    } catch (error) {
      console.error("Error fetching channels:", error);
      return [];
    }
  };

  const setMembers = async () => {
    if (!activeChannel.value) return;

    const response = await activeChannel.value.queryMembers({});
    const members = response.members.map((user) => ({
      username: user.user?.id,
      name: user.user?.name || user.user?.id,
      online: user.user?.online || false,
    }));

    store.commit("setUsers", members);
  };

  // --- Room Management ---
  const subscribeToRoom = async (roomId, roomType) => {
    store.commit('clearChatRoom');
    activeChannel.value = client.channel(roomType, roomId);

    await activeChannel.value.watch({ presence: true });
    const state = await activeChannel.value.query({ messages: { limit: 20 } });

    if (state.messages) {
      state.messages.forEach((message) => {
        store.commit('addMessage', {
          name: message.user?.name || message.user?.id || 'Unknown',
          username: message.user?.id || 'Unknown',
          text: message.text || '',
          date: dayjs(message.created_at).format("h:mm:ss"),
          messageId: message.id,
        });
      });
    }

    setupChannelEventListeners();
    await setMembers();
    return activeChannel.value;
  };

  const setupChannelEventListeners = () => {
    if (!activeChannel.value) return;

    activeChannel.value.on("message.new", (event) => {
      const message = event.message;
      store.commit('addMessage', {
        name: message.user?.name || message.user?.id || 'Unknown',
        username: message.user?.id || 'Unknown',
        text: message.text || '',
        date: dayjs(message.created_at).format("h:mm:ss"),
        messageId: message.id,
      });
    });

    activeChannel.value.on("member.added", setMembers);
    activeChannel.value.on("member.removed", setMembers);
    client.on('user.presence.changed', setMembers);

    activeChannel.value.on("typing.start", (event) => {
      if (event.user?.id !== client.userID) {
        store.commit("setUserTyping", event.user?.id);
      }
    });

    activeChannel.value.on("typing.stop", () => {
      store.commit("setUserTyping", null);
    });
  };

  // --- Message Actions ---
  const sendMessage = async (text) => {
    if (!activeChannel.value || !text.trim()) return;
    await activeChannel.value.sendMessage({ text: text.trim() });
  };

  const startTyping = async () => {
    if (!activeChannel.value) return;
    await activeChannel.value.keystroke();
  };

  const stopTyping = async () => {
    if (!activeChannel.value) return;
    await activeChannel.value.stopTyping();
  };

  // --- Cleanup ---
  const leaveRoom = async () => {
    if (!activeChannel.value) return;

    activeChannel.value.off();
    await activeChannel.value.stopWatching();
    activeChannel.value = null;
    store.commit('clearChatRoom');
  };

  const disconnectUser = async () => {
    await client.disconnectUser();
  };

  // --- Admin Functions ---
  const isUserAdmin = () => currentUser.value?.role === "admin";

  const addMemberIntoChannel = async (memberId) => {
    if (!activeChannel.value || !isUserAdmin()) return;
    await activeChannel.value.addMembers([memberId]);
    await setMembers();
  };

  const removeMemberFromChannel = async (memberId) => {
    if (!activeChannel.value || !isUserAdmin()) return;
    await activeChannel.value.removeMembers([memberId]);
    await setMembers();
  };

  return {
    // State
    currentUser,
    activeChannel,

    // Methods
    connectUser,
    subscribeToRoom,
    sendMessage,
    startTyping,
    stopTyping,
    leaveRoom,
    disconnectUser,
    addMemberIntoChannel,
    removeMemberFromChannel,
  };
}

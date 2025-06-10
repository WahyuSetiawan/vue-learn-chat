import { StreamChat } from 'stream-chat';
import moment from 'moment';
import store from './store';
import { convertCompilerOptionsFromJson } from 'typescript';

const KEY_STREAM = import.meta.env.VITE_KEY_STREAM;

let currentUser = null;
let activeChannel = null;

let client = StreamChat.getInstance(KEY_STREAM);

async function connectUser(userId) {
  let userToken = client.devToken(userId);

  await client.connectUser({
    id: userId,
    name: userId,
  }, userToken);

  currentUser = client.user;
  currentUser.rooms = await getAllChannels();
  return currentUser;
}

async function getAllChannels() {
  try {
    const filter = {
      members: {
        $in: [
          currentUser.id
        ]
      }
    };
    const sort = { craeted_at: -1 };
    const options = { limit: 20 };

    const channels = await client.queryChannels(filter, sort, options);
    console.log("Semua Channel", channels);
    return channels;
  } catch (error) {
    console.log("Error : ", error);
  }
}

async function setMembers() {
  if (!activeChannel) return;

  const response = await activeChannel.queryMembers({});
  console.log(response);
  const members = response.members.map(user => ({
    username: user.user?.id,
    name: user.user?.name || user.user?.id,
    online: user.user?.online || false
  }));

  store.commit("setUsers", members);
}

async function subscribeToRoom(roomId, roomType, userId = null) {
  store.commit('clearChatRoom');
  activeChannel = client.channel(roomType, roomId);

  await activeChannel.watch();

  console.log(activeChannel.state.members);

  const state = await activeChannel.query({
    message: { limit: 20 }
  });

  if (state.messages) {
    state.messages.forEach(message => {
      store.commit('addMessage', {
        name: message.user?.name || message.user?.id || 'Unknown',
        username: message.user?.id || 'Unknown',
        text: message.text || '',
        date: moment(message.created_at).format("h:mm:ss"),
        messageId: message.id,
      });
    });
  }

  setupChannelEventListeners();

  await setMembers();
  return activeChannel;
}

function setupChannelEventListeners() {
  if (!activeChannel) return;

  activeChannel.on("message.new", (event) => {
    const message = event.message;

    // if (message.user?.id != client.userID) {
      store.commit('addMessage', {
        name: message.user?.name || message.user?.id || 'Unknown',
        username: message.user?.id || 'Unknown',
        text: message.text || '',
        date: moment(message.created_at).format("h:mm:ss"),
        messageId: message.id,
      });
    // }
  });

  activeChannel.on("member.added", () => {
    setMembers();
  });

  activeChannel.on("member.removed", () => {
    setMembers();
  });

  activeChannel.on("typing.start", (event) => {
    if (event.user?.id !== client.userID) {
      store.commit("setUserTyping", event.user?.id);
    }
  })

  activeChannel.on("typing.stop", (event) => {
    if (event.user?.id !== client.userID) {
      store.commit("setUserTyping", null);
    }
  })
}

async function sendMessage(text) {
  if (!activeChannel || !text.trim()) return;

  await activeChannel.sendMessage({
    text: text.trim(),
  });
}

async function startTyping() {
  if (!activeChannel) return;

  await activeChannel.keystroke();
}

async function stopTyping() {
  if (!activeChannel) return;

  await activeChannel.stopTyping();
}

async function leaveRoom() {
  if (!activeChannel) return;

  activeChannel.off();
  await activeChannel.stopWathing();

  activeChannel = null;
  store.commit('clearChatRoom');
}

async function disconnectUser() {
  await client.disconnectUser();
}

export default {
  connectUser,
  subscribeToRoom,
  sendMessage,
  startTyping,
  stopTyping,
  leaveRoom,
  disconnectUser,
}

import { localMessageToNewMessagePayload, StreamChat } from 'stream-chat';
import moment from 'moment';
import store from './store';

const KEY_STREAM = import.meta.env.VITE_KEY_STREAM;

let currentUser = null;
let activeRoom = null;
let activeChannel = null;

let client = StreamChat.getInstance(KEY_STREAM);

async function connectUser(userId) {
  let userToken = client.devToken(userId);

  await client.connectUser({
    id: userId,
    name: userId,
  }, userToken);

  currentUser = client.user;
  await getAllChannels();
  return currentUser;
}

async function getAllChannels() {
  try {
    const filter = {};
    const sort = { craeted_at: -1 };
    const options = { limit: 20 };

    const channels = await client.queryChannels(filter, sort, options);
    console.log("Semua Channel", channels);
    return channels;
  } catch (error) {
    console.log("Error : ", error);
  }
}

function setMembers() {
  const members = activeRoom.users.map(user => ({
    username: user.id,
    name: user.name,
    presence: user.presence.state,
  }));

  store.commit("setUsers", members);
}

async function subscribeToRoom(roomId, userId = null) {
  store.commit('clearChatRoom');
  activeChannel = client.channel('messaging', roomId);

  await activeChannel.watch();

  const state = await activeChannel.query({
    message: { limit: 20 }
  });

  if (state.message) {
    state.message.forEach(message => {
      store.commit('addMessage', {
        name: message.user?.name || message.user?.id || 'Unknown',
        username: message.user?.id || 'Unknown',
        text: message.text || '',
        date: moment(message.created_at).format("h:mm:ss"),
        messageId: message.id,
      });
    });
  }

  setMembers();
  return activeRoom;
}

export default {
  connectUser,
  subscribeToRoom
}

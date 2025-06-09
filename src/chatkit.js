import { StreamChat } from 'stream-chat';

const KEY_STREAM = import.meta.env.VITE_KEY_STREAM;

let currentUser = null;
let client = null;

async function connectUser(userId) {
  client = StreamChat.getInstance(KEY_STREAM);
  let userToken = client.devToken(userId);

  await client.connectUser({
    id: userId,
    name: userId,
  }, userToken);

  currentUser = client.user;
  return currentUser;
}

export default {
  connectUser
}

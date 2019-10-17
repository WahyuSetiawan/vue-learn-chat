import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

const INSTANCE_LOCATOR = process.env.VUE_APP_INSTANCE_LOCATOR;
const TOKEN_URL = process.env.VUE_APP_TOKEN_URL;
// eslint-disable-next-line
const MESSAGE_LIMIT = Number(process.env.VUE_APP_MESSAGE_LIMIT) || 10;

let currentUser = null;
// eslint-disable-next-line
let activeRoom = null;

async function connectUser(userId) {
    // eslint-disable-next-line
    // console.log(TOkEN_URL);

    const chatManager = new ChatManager({
        instanceLocator: INSTANCE_LOCATOR,
        tokenProvider: new TokenProvider({ url: TOKEN_URL }),
        userId
    });

    currentUser = await chatManager.connect();

    // eslint-disable-next-line
    console.log(currentUser);

    return currentUser;
}

export default {
    connectUser
}
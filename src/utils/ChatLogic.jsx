export const getSender = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[1]?.name : users[0]?.name;
};
export const getSenderFull = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[1] : users[0];
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages?.length - 1 &&
    (messages[i + 1].sender?._id !== m?.sender?._id ||
      messages[i + 1].sender?._id === undefined) &&
    messages[i].sender?._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages?.length - 1]?.sender?._id !== userId &&
    messages[messages?.length - 1]?.sender?._id
  );
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages?.length - 1 &&
    (messages[i + 1]?.sender?._id === m?.sender?._id ||
      messages[i]?.sender?._id !== userId)
  ) {
    return "start";
  } else if (
    (i < messages?.length - 1 &&
      messages[i + 1]?.sender?._id !== m?.sender?._id &&
      messages[i]?.sender?._id !== userId) ||
    (i === messages?.length - 1 && messages?.sender?._id !== userId)
  ) {
    return "end";
  } else {
    return "end";
  }
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1]?.sender?._id === m?.sender?._id;
};
// {"description": "This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.",
// "main": "postcss.config.js",
// "repository": {
//   "type": "git",
//   "url": "git+https://github.com/talhaghouridev/Mern-Chat-App-Client.git"
// },
// "author": "",
// "license": "ISC",
// "bugs": {
//   "url": "https://github.com/talhaghouridev/Mern-Chat-App-Client/issues"
// },
// "homepage": "https://github.com/talhaghouridev/Mern-Chat-App-Client#readme"}
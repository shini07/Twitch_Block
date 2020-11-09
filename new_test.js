/// twitch-videoad.js
const origFetch = window.fetch;
window.fetch = (url, init, ...args) => {
  if (typeof url === "string") {
    if (url.includes("/access_token")) {
      url = url.replace("player_type=site", "player_type=mobile");
      url = url.replace("platform=web", "platform=android");
    }
  }
  return origFetch(url, init, ...args);
};

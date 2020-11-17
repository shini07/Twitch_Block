/// twitch-videoad.js
const origFetch = window.fetch;
window.fetch = (url, init, ...args) => {
	if (typeof url === "string") {
		if (url.includes("/access_token")) {
 		        url = url.replace("player_type=site", "player_type=mobile");
                        url = url.replace("platform=web", "platform=android");
		} else if (
			url.includes("/gql") &&
			init &&
			typeof init.body === "string" &&
			init.body.includes("PlaybackAccessToken")
		) {
			const newBody = JSON.parse(init.body);
			newBody.variables.playerType = "mobile";
			init.body = JSON.stringify(newBody);
			const newBody = JSON.parse(init.body);
			newBody.variables.platform = "android";
			init.body = JSON.stringify(newBody);
		}
	}
	return origFetch(url, init, ...args);
};
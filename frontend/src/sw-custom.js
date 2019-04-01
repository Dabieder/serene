(function() {})();
("use strict");

const TYPE_CLOSE = "notification:close";
const TYPE_CLICK_ACTION = "notification:action:click";

function sendNotificationInteractionsToBackend(event, type) {
  fetch("http://localhost:8080/lad-backend/logs/sw", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      time: new Date(Date.now()).toUTCString(),
      data: event,
      type: type
    })
  })
    .then(resp => {
      console.log("Fetch post sw logs");
    })
    .catch(err => {
      console.log("Error submitting logs to backend: ", err);
    });
}

function registerEventListeners() {
  self.addEventListener("notificationclick", event => {
    console.log("Custom SW Notification click");
    // event.notification.close();
    console.log("notification details: ", event.notification);
    if (event.notification.data.url) {
      const urls = event.notification.data.urls;
      console.log("Notification Has a data URL", event);
      // window.open(event.notification.data.url);
      event.waitUntil(
        self.clients
          .claim()
          .then(() => {
            // See https://developer.mozilla.org/en-US/docs/Web/API/Clients/matchAll
            return self.clients.matchAll({ type: "window" });
          })
          .then(clients => {
            return clients.map(client => {
              // Check to make sure WindowClient.navigate() is supported.
              if ("navigate" in client) {
                return client.navigate(urls.monitor);
              }
            });
          })
      );
    }

    sendNotificationInteractionsToBackend(event, TYPE_CLICK_ACTION);
  });

  self.addEventListener("notificationclose", event => {
    console.log("Custom SW Notification close", event);
    sendNotificationInteractionsToBackend(event, TYPE_CLOSE);
  });

  // https://developers.google.com/web/fundamentals/codelabs/push-notifications/
  self.addEventListener("push", function(event) {
    console.log("[Service Worker] Push Received.", event);
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    // const title = "Push Codelab";
    // const options = {
    //   body: "Yay it works.",
    //   icon: "images/icon.png",
    //   badge: "images/badge.png"
    // };
    console.log("Custom SW Notification close", options);
    event.waitUntil(self.registration.showNotification(title, options));
  });
}
console.log("Befor register Event Listeners");

registerEventListeners();

console.log("Using custom SW");

// (function() {
//   console.log("Using custom SW stuff ready");
//   // Your page initialization code here  - WRONG
//   // The DOM will be available here   - WRONG
// })();

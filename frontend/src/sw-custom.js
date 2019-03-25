(function() {
  "use strict";

  console.log("Using custom SW");

  self.addEventListener("notificationclick", event => {
    console.log("Notificaiton click");
    event.notification.close();
    console.log("notification details: ", event.notification);
  });

  self.addEventListener("notificationclose", event => {
    console.log("Notification close");
  });
})();

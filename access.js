// access.js — site access expires after 8 hours
(function () {
  const KEY = "sanctuaryAccessUntil";
  const until = Number(localStorage.getItem(KEY) || "0");

  if (!until || Date.now() > until) {
    localStorage.removeItem(KEY);
    location.replace("index.html");
  }
})();

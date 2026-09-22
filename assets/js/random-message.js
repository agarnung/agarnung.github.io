(function () {
  var container = document.getElementById("scroll-text");
  var message = document.getElementById("scroll-message");
  var data = document.getElementById("scroll-messages");
  if (!container || !message || !data) return;

  var all;
  try {
    all = JSON.parse(data.textContent);
  } catch (e) {
    return;
  }
  if (!all) return;

  var track = container.parentElement; // #scroll-container

  // Reference speed: the default phrase travelled 3x its width in 10s.
  var speed = (3 * container.offsetWidth) / 10; // px/s
  if (!isFinite(speed) || speed <= 0) speed = 140;

  // Take over from the CSS animation and drive it with the Web Animations API.
  container.style.animation = "none";

  var last = -1;
  var animation = null;

  function currentLang() {
    if (window.i18n && typeof window.i18n.getLang === "function") {
      return window.i18n.getLang();
    }
    return document.documentElement.getAttribute("lang") || "en";
  }

  function currentMessages() {
    var lang = currentLang();
    return (all && all[lang]) || all.en || [];
  }

  function show() {
    var messages = currentMessages();
    if (!messages.length) return;

    var index = 0;
    if (messages.length > 1) {
      do {
        index = Math.floor(Math.random() * messages.length);
      } while (index === last);
    }
    last = index;

    message.textContent = "<div> 🚀 " + messages[index] + " 🚀 </div>";

    // Start just off the right edge, end fully off the left. Both are absolute
    // distances, so every phrase enters at the same time regardless of length.
    var start = track.clientWidth;
    var end = -container.offsetWidth;
    var duration = (start - end) / speed;

    if (animation) animation.cancel();
    animation = container.animate(
      [
        { transform: "translateX(" + start + "px)" },
        { transform: "translateX(" + end + "px)" }
      ],
      { duration: duration * 1000, iterations: 1, fill: "forwards" }
    );
    animation.onfinish = show;
  }

  function init() {
    show();
    document.addEventListener("i18n:changed", show);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

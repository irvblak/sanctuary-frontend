(function () {
  "use strict";
  function start() {
    const pages = document.getElementById("creativePages");
    const stage = pages?.closest(".canvas-stage");
    const orientation = document.getElementById("orientationSelect");
    const controls = document.getElementById("landscapeViewControls");
    const slider = document.getElementById("landscapeViewSize");
    const output = document.getElementById("landscapeViewValue");
    const fit = document.getElementById("fitLandscapeViewBtn");
    if (!pages || !stage || !orientation || !controls || !slider || !output || !fit) return;
    const width = 860, height = width * 210 / 297;
    let scheduled = false;
    function layout() {
      scheduled = false;
      const landscape = orientation.value === "landscape";
      controls.hidden = !landscape;
      if (!landscape) return;
      const percentage = Math.max(40, Math.min(100, Number(slider.value) || 100));
      slider.value = String(percentage);
      output.textContent = percentage + "%";
      const css = getComputedStyle(stage);
      const availableWidth = stage.clientWidth - parseFloat(css.paddingLeft || 0) - parseFloat(css.paddingRight || 0);
      const availableHeight = stage.clientHeight - parseFloat(css.paddingTop || 0) - parseFloat(css.paddingBottom || 0);
      if (availableWidth <= 0 || availableHeight <= 0) return;
      const scale = Math.min(availableWidth / width, availableHeight / height) * percentage / 100;
      // View settings belong to the surround, never the saved page or artwork.
      pages.style.setProperty("--landscape-view-width", width + "px");
      pages.style.setProperty("--landscape-view-height", height + "px");
      pages.style.setProperty("--landscape-view-scale", String(scale));
    }
    function schedule() {
      if (!scheduled) { scheduled = true; requestAnimationFrame(layout); }
    }
    slider.addEventListener("input", schedule);
    fit.addEventListener("click", () => { slider.value = "100"; schedule(); });
    orientation.addEventListener("change", schedule);
    window.addEventListener("resize", schedule);
    // Includes switching/restoring pages and moving the tools to another window.
    new ResizeObserver(schedule).observe(stage);
    new MutationObserver(schedule).observe(pages, {childList: true, subtree: true, attributes: true, attributeFilter: ["class", "hidden"]});
    schedule();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, {once: true});
  else start();
})();

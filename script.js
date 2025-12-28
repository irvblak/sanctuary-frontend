document.addEventListener("DOMContentLoaded", function () {
  const gate = document.getElementById("access-gate");
  if (gate) {
    gate.style.display = "block";
    gate.style.border = "3px solid red";
  }
});

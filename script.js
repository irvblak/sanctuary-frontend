// IMPORTANT: when we wire this to your real backend, put your backend URL here:
const API_BASE_URL = "https://YOUR-BACKEND-URL.onrender.com"; 
// For now, we only use this as a reminder.

// Set current year in footer
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// Handle event signup form (currently just a friendly message)
const eventForm = document.getElementById("event-signup-form");
const eventMessage = document.getElementById("event-signup-message");

if (eventForm) {
  eventForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(eventForm);
    const name = formData.get("name");
    const eventName = formData.get("event");

    eventMessage.textContent = `Thank you, ${name || "member"} – your interest in "${eventName}" has been noted. (In future, this will be stored by the backend.)`;
    eventMessage.style.color = "#1f6feb";

    eventForm.reset();
  });
}

// Handle the demo "Pay" button
const payButton = document.getElementById("pay-button");
const paymentMessage = document.getElementById("payment-message");

if (payButton) {
  payButton.addEventListener("click", () => {
    paymentMessage.textContent =
      "This is a demo. Later, this button will open a secure Stripe payment screen linked to your Sanctuary Club account.";
    paymentMessage.style.color = "#1f6feb";
  });
}

// Simple local chat demo (not connected to backend yet)
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

let messages = [
  "Welcome to the Sanctuary Club chat!",
  "Be kind and keep things friendly.",
];

function renderMessages() {
  if (!chatMessages) return;
  chatMessages.innerHTML = "";
  messages.forEach((msg) => {
    const div = document.createElement("div");
    div.className = "chat-message";
    div.textContent = msg;
    chatMessages.appendChild(div);
  });
}

if (chatForm && chatInput && chatMessages) {
  renderMessages();

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    messages.push(text);
    renderMessages();
    chatInput.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
}
Later, when we’re ready, we’ll change:
const API_BASE_URL = "https://YOUR-BACKEND-URL.onrender.com";
to your actual Render backend URL (the one that showed {"message":"Sanctuary Club backend is running!"}).


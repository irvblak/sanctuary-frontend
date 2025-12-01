
// Fetch events from backend
fetch("https://YOUR-RENDER-URL.onrender.com/events")
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("events-list");
        data.forEach(event => {
            const div = document.createElement("div");
            div.className = "event-card";
            div.innerHTML = `<h3>${event.title}</h3><p>${event.date}</p>`;
            container.appendChild(div);
        });
    })
    .catch(err => console.error("Error fetching events:", err));   

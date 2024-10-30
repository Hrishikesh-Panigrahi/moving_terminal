document.addEventListener("DOMContentLoaded", function () {
  const footer = document.getElementById("last-login-time");
  const now = new Date();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayName = days[now.getDay()];
  const monthName = months[now.getMonth()];
  const day = now.getDate();
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const formattedDate = `${dayName}, ${monthName} ${day}, ${year} @ ${hours}:${minutes}:${seconds}`;

  footer.textContent = formattedDate;
});

document.addEventListener("DOMContentLoaded", function () {
  // Fetch the IP address from the API
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      // Display the IP address on the screen
      document.getElementById("login-IP").textContent = data.ip;
      // console.log("IP Address:", data.ip);
    })
    .catch((error) => {
      console.error("Error fetching IP address:", error);
    });
});

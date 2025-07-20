document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const bookingType = document.getElementById("bookingType").value;
  const message = document.getElementById("message").value;

  const emailBody = `
    Booking Request from: ${name}
    Email: ${email}
    Type: ${bookingType}
    Message: ${message}
  `;

  // Simulate sending via mailto:
  window.location.href = `mailto:gcode@atlquez.com?subject=Booking Request for RocBoi Quez&body=${encodeURIComponent(emailBody)}`;
});

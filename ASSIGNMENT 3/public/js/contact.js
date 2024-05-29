
// Form validation using JavaScript
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let message = document.getElementById('message').value;

  // Basic validation
  if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
    alert('Please fill in all fields.');
    return;
  }

  // Additional validation for email format
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // If all validations pass, you can proceed with form submission
  // For demonstration, let's just log the data
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Message:', message);

  // Here you can add AJAX request to send form data to server
  // Example: $.post('submit.php', {name: name, email: email, message: message}, function(response) {...});

  // Reset form fields after submission
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('message').value = '';

  alert('Form submitted successfully!');
});

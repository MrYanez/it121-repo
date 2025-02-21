
document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');
  
    togglePassword.addEventListener('click', function() {
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
    });
  });
  
  const validatePassword = (form) => {
    const password = form.password.value;
    const firstName = form.firstname.value.trim();
    const lastName = form.lastname.value.trim();
    let hasErrors = false;
    
    // Reset previous validation messages
    $('.validation-feedback').text('');
    $('#message').removeClass('success error').text('');
  
    // Validate first name
    if (!firstName) {
      form.firstname.nextElementSibling.textContent = 'First name is required';
      hasErrors = true;
    }
  
    // Validate last name
    if (!lastName) {
      form.lastname.nextElementSibling.textContent = 'Last name is required';
      hasErrors = true;
    }
  
    // Validate password
    if (password !== 'NocNah86') {
      form.password.nextElementSibling.textContent = 'Incorrect password';
      hasErrors = true;
    }
  
    if (hasErrors) {
      $('#message').addClass('error').text('Validation failed. Try again.');
      return false;
    }
  
    // Success
    $('#message').addClass('success').text('Login successful!');
    return false;
  }
  

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form fields
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      // Reset previous errors
      resetErrors();
      
      // Validate form
      let isValid = validateForm(nameInput, emailInput, messageInput);
      
      if (isValid) {
        // In a real application, this would send data to a server
        console.log('Form submitted:', {
          name: nameInput.value,
          email: emailInput.value,
          message: messageInput.value
        });
        
        // Show success toast
        showToast();
        
        // Reset form
        contactForm.reset();
      }
    });
  }
});

function validateForm(nameInput, emailInput, messageInput) {
  let isValid = true;
  
  // Validate name
  if (!nameInput.value.trim()) {
    showError(nameInput, 'Name is required');
    isValid = false;
  }
  
  // Validate email
  if (!emailInput.value.trim()) {
    showError(emailInput, 'Email is required');
    isValid = false;
  } else if (!isValidEmail(emailInput.value)) {
    showError(emailInput, 'Please enter a valid email address');
    isValid = false;
  }
  
  // Validate message
  if (!messageInput.value.trim()) {
    showError(messageInput, 'Message is required');
    isValid = false;
  }
  
  return isValid;
}

function showError(input, message) {
  const errorElement = document.getElementById(`${input.id}-error`);
  if (errorElement) {
    errorElement.textContent = message;
  }
  input.classList.add('error');
}

function resetErrors() {
  const errorMessages = document.querySelectorAll('.error-message');
  const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
  
  errorMessages.forEach(error => error.textContent = '');
  inputs.forEach(input => input.classList.remove('error'));
}

function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function showToast() {
  const toast = document.getElementById('toast');
  
  if (toast) {
    toast.classList.add('show');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
    }, 5000);
  }
}

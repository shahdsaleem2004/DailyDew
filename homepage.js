document.getElementById("newsletter-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents page reload

    let emailInput = document.getElementById("email");
    let successMessage = document.getElementById("success-message");
    let warningMessage = document.getElementById("warning-message");

    // Simple email validation
    if (emailInput.value.trim() === "" || !emailInput.value.includes("@")) {
        warningMessage.classList.remove("d-none"); // Show warning
        successMessage.classList.add("d-none");   // Hide success message
        return;
    }

    // Hide warning, show success message
    warningMessage.classList.add("d-none");
    successMessage.classList.remove("d-none");

    // Clear input field
    emailInput.value = "";
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(event) {
    const href = this.getAttribute('href');

    // Only handle links that are anchor links (start with #)
    if (href.startsWith('#')) {
      event.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    }
  });
});


//scroll to top js
const mybutton = document.getElementById("myBtn");

window.addEventListener("scroll", function(event) {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
});

mybutton.addEventListener("click", function(event) {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

//typewrting effect for landing page
const line1Text = "Welcome to";
  const line2Text = "Daily Dew ˚⋆𐙚｡♡";

  const line1El = document.getElementById("line1");
  const line2El = document.getElementById("line2");

  let i = 0;
  function typeLine1() {
    if (i < line1Text.length) {
      line1El.textContent += line1Text[i];
      i++;
      setTimeout(typeLine1, 100);
    } else {
      line1El.style.borderRight = "none";
      setTimeout(typeLine2, 400); 
    }
  }

  let j = 0;
  function typeLine2() {
    if (j < line2Text.length) {
      line2El.textContent += line2Text[j];
      j++;
      setTimeout(typeLine2, 100);
    }
  }

  document.addEventListener("DOMContentLoaded", typeLine1);

//dashboard javascript
document.addEventListener('DOMContentLoaded', function () {
  const changeUsernameForm = document.getElementById('changeUsernameForm');

  if (changeUsernameForm) {
      changeUsernameForm.addEventListener('submit', async function (event) {
          event.preventDefault();
          const newUsername = document.getElementById('newUsername').value.trim();
          const submitButton = event.target.querySelector('button[type="submit"]');

          try {
              submitButton.disabled = true;
              submitButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Updating...';

              // Try multiple URL patterns
              const basePath = window.location.pathname.replace(/[^/]*$/, '');
              const urlsToTry = [
                  `${basePath}changeUsername`,  // Most likely correct
                  '/changeUsername',
                  './changeUsername'
              ];

              let lastError;
              for (const url of urlsToTry) {
                  try {
                      const response = await fetch(url, {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/x-www-form-urlencoded',
                          },
                          body: `newUsername=${encodeURIComponent(newUsername)}`
                      });

                      if (!response.ok) {
                          lastError = `HTTP error! status: ${response.status}`;
                          continue;
                      }

                      const data = await response.json();

                      if (data.success) {
                          // Update UI
                          document.querySelectorAll('[data-username]').forEach(el => {
                              el.textContent = newUsername;
                          });
                          sessionStorage.setItem('skincareHubUsername', newUsername);

                          // Show success and close modal
                          showBootstrapAlert('Username updated successfully!', 'success');
                          bootstrap.Modal.getInstance(document.getElementById('changeUsernameModal')).hide();
                          return;
                      } else {
                          lastError = data.message || 'Update failed';
                      }
                  } catch (error) {
                      lastError = error.message;
                  }
              }

              throw new Error(lastError || 'All URL attempts failed');
          } catch (error) {
              console.error('Update error:', error);
              showBootstrapAlert(error.message, 'danger');
          } finally {
              submitButton.disabled = false;
              submitButton.innerHTML = 'Update Username';
          }
      });
  }

  const changePasswordForm = document.getElementById('changePasswordForm');
  if (changePasswordForm) {
      changePasswordForm.addEventListener('submit', async function (event) {
          event.preventDefault();
          const currentPassword = document.getElementById('currentPassword').value;
          const newPassword = document.getElementById('newPassword').value;
          const confirmNewPassword = document.getElementById('confirmNewPassword').value;
          const submitButton = event.target.querySelector('button[type="submit"]');

          if (newPassword !== confirmNewPassword) {
              showBootstrapAlert("New passwords do not match.", 'danger');
              return;
          }

          try {
              submitButton.disabled = true;
              submitButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Updating...';

              const basePath = window.location.pathname.replace(/[^/]*$/, '');
              const urlsToTry = [
                  `${basePath}changePassword`, // Most likely correct
                  '/changePassword',
                  './changePassword'
              ];

              let lastError;
              for (const url of urlsToTry) {
                  try {
                      const response = await fetch(url, {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/x-www-form-urlencoded',
                          },
                          body: `currentPassword=${encodeURIComponent(currentPassword)}&newPassword=${encodeURIComponent(newPassword)}`
                      });

                      if (!response.ok) {
                          lastError = `HTTP error! status: ${response.status}`;
                          continue;
                      }

                      const data = await response.json();

                      if (data.success) {
                          showBootstrapAlert('Password updated successfully!', 'success');
                          bootstrap.Modal.getInstance(document.getElementById('changePasswordModal')).hide();
                          return;
                      } else {
                          lastError = data.message || 'Password update failed';
                      }
                  } catch (error) {
                      lastError = error.message;
                  }
              }
              throw new Error(lastError || 'All URL attempts failed');

          } catch (error) {
              console.error('Password update error:', error);
              showBootstrapAlert(error.message, 'danger');
          } finally {
              submitButton.disabled = false;
              submitButton.innerHTML = 'Change Password';
          }
      });
  }

  function showBootstrapAlert(message, type) {
      const alertDiv = document.createElement('div');
      alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
      alertDiv.innerHTML = `${message}<button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;
      document.querySelector('.modal-body').prepend(alertDiv);
      setTimeout(() => bootstrap.Alert.getInstance(alertDiv)?.close(), 5000);
  }
});



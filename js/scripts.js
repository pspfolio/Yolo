(function() {
  const apiUrl =
    "http://signupapi20180809063828.azurewebsites.net/api/signup/users";
  const headerBtn = document.getElementById("button-header");
  const headerInput = document.getElementById("header-input");
  const footerBtn = document.getElementById("button-footer");
  const footerInput = document.getElementById("footer-input");

  headerInput.addEventListener("keydown", () => {
    const valid = headerInput.validity.valid;
    if (headerInput.value.length > 2 && valid && headerBtn.disabled) {
      headerBtn.disabled = false;
    } else if (
      (headerInput.value.length < 2 || !valid) &&
      !headerBtn.disabled
    ) {
      headerBtn.disabled = true;
    }
  });

  footerInput.addEventListener("keydown", () => {
    const valid = footerInput.validity.valid;
    if (footerInput.value.length > 2 && valid && footerBtn.disabled) {
      footerBtn.disabled = false;
    } else if (
      (footerInput.value.length < 2 || !valid) &&
      !footerBtn.disabled
    ) {
      footerBtn.disabled = true;
    }
  });

  footerBtn.addEventListener("click", function(event) {
    event.preventDefault();
    const value = footerInput.value;
    if (footerInput.validity.valid) {
      postEmailData(value, footerInput, footerBtn);
      footerInput.classList.remove("not-valid");
    } else {
      footerInput.classList.add("not-valid");
    }
  });

  headerBtn.addEventListener("click", function(event) {
    event.preventDefault();
    const value = headerInput.value;
    if (headerInput.validity.valid) {
      postEmailData(value, headerInput, headerBtn);
      headerInput.classList.remove("not-valid");
    } else {
      headerInput.classList.add("not-valid");
    }
  });

  function postEmailData(email, inputElement, button) {
    button.disabled = true;
    fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        applicationName: "idea"
      })
    })
      .then(function(data) {
        inputElement.value = "";
        Toastify({
          text: "Email added to waiting list",
          duration: 3000,
          gravity: "bottom",
          backgroundColor: "#028e21"
        }).showToast();
      })
      .catch(function(error) {
        console.log("error", error);
      });
  }
})();

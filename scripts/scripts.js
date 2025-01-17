function toggleModal() {
  document.querySelector(".modal").classList.toggle("modal_visible");
}

document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll(".request_form");

  forms.forEach((form) => {
    const phoneInput = form.querySelector(".phone_number");
    const phoneError = form.querySelector(".phone-error");
    const agreementCheckbox = form.querySelector(".agreement_checkbox");
    const agreementError = form.querySelector(".agreement-error");
    const successMessage = form.querySelector(".success-message");
    const photoInput = form.querySelector(".photo");
    const photoUploadButton = form.querySelector(".photo_upload");
    const submitButton = form.querySelector(".calc_btn");

    const phoneRegex = /^\+7\s?\d{3}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;


    photoUploadButton.addEventListener("click", function (e) {
      e.preventDefault();
      photoInput.click();
    });

    submitButton.addEventListener("click", function (e) {
      e.preventDefault();

      let isValid = true;

      if (!phoneRegex.test(phoneInput.value.trim())) {
        phoneInput.classList.add("error");
        phoneError.style.display = "block";
        isValid = false;
      } else {
        phoneInput.classList.remove("error");
        phoneError.style.display = "none";
      }

      if (!agreementCheckbox.checked) {
        agreementError.style.display = "block";
        isValid = false;
      } else {
        agreementError.style.display = "none";
      }

      if (isValid) {
        const formData = new FormData();
        formData.append("phone", phoneInput.value.trim());
        formData.append("agreement", agreementCheckbox.checked);

        if (photoInput.files.length > 0) {
          formData.append("photo", photoInput.files[0]);
        }

        fetch("your-server-endpoint", {
          method: "POST",
          body: formData,
        }).then((response) => {
          if (response.ok) {
            successMessage.style.display = "block";
            setTimeout(() => (successMessage.style.display = "none"), 5000);
          }
        });
      }
    });
  });
});

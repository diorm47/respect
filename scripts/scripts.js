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

    const phoneRegex = /^\+7\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/;

    phoneInput.addEventListener("input", function () {
      let value = phoneInput.value.replace(/\D/g, "");

      if (!value.startsWith("+")) {
        value = "+" + value;
      }

      const maxDigits = 12;
      if (value.length > maxDigits) {
        value = value.slice(0, maxDigits);
      }

      phoneInput.value = value.replace(
        /^(\+)(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/,
        (_, p1, p2, p3, p4, p5, p6) =>
          [p1 + p2, p3, p4, p5, p6].filter(Boolean).join(" ")
      );
    });

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
        fetch("http://localhost:3000/send-email", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              alert("Email успешно отправлен!");
            } else {
              alert("Ошибка при отправке email.");
            }
          })
          .catch((error) => {
            console.error("Ошибка:", error);
            alert("Произошла ошибка при отправке.");
          });
      }
    });
  });
});

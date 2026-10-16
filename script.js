function setupValidation(form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const inputs = form.querySelectorAll(
            "input:not([type='radio']):not([type='checkbox']), textarea, select"
        );

        inputs.forEach(function (input) {
            input.classList.remove("is-valid", "is-invalid");
        });

        if (form.id === "registrationForm") {
            const password = document.getElementById("password");
            const confirmPassword = document.getElementById("confirmPassword");

            confirmPassword.setCustomValidity("");

            if (confirmPassword.value !== password.value) {
                confirmPassword.setCustomValidity("Passwords do not match");
            }
        }

        inputs.forEach(function (input) {
            if (input.checkValidity()) {
                input.classList.add("is-valid");
                input.classList.remove("is-invalid");
            } else {
                input.classList.add("is-invalid");
                input.classList.remove("is-valid");
            }
        });

        if (form.id === "registrationForm") {
            const radios = form.querySelectorAll(
                "input[name='gender']"
            );
            const genderFeedback = document.getElementById("genderFeedback");
            const genderSelected = Array.from(radios).some(
                function (radio) {
                    return radio.checked;
                }
            );

            radios.forEach(function (radio) {
                radio.classList.remove("is-invalid", "is-valid");
                if (!genderSelected) {
                    radio.classList.add("is-invalid");
                }
            });

            genderFeedback.style.display = genderSelected ? "none" : "block";

            if (!genderSelected) {
                radios[0].setCustomValidity("Please select your gender");
            } else {
                radios[0].setCustomValidity("");
            }
        }

        if (!form.checkValidity()) {
            event.stopPropagation();
        }

        form.classList.add("was-validated");

        const successMessage = document.getElementById(
            "registrationSuccess"
        );

        if (successMessage && form.id === "registrationForm") {
            successMessage.hidden = !form.checkValidity();
        }
    });

    form.addEventListener("input", function (event) {
        const input = event.target;

        if (form.id === "registrationForm" &&
            (input.id === "password" ||
             input.id === "confirmPassword")) {

            const password = document.getElementById("password");
            const confirmPassword = document.getElementById("confirmPassword");

            confirmPassword.setCustomValidity("");

            if (confirmPassword.value !== password.value) {
                confirmPassword.setCustomValidity("Passwords do not match");
            }
        }

        if (input.matches("input, textarea, select") &&
            input.type !== "radio" &&
            input.type !== "checkbox" &&
            form.classList.contains("was-validated")) {

            if (input.checkValidity()) {
                input.classList.add("is-valid");
                input.classList.remove("is-invalid");
            } else {
                input.classList.add("is-invalid");
                input.classList.remove("is-valid");
            }
        }
    });

    form.addEventListener("reset", function () {
        setTimeout(function () {
            form.classList.remove("was-validated");

            form.querySelectorAll(".is-valid, .is-invalid").forEach(
                function (input) {
                    input.classList.remove("is-valid", "is-invalid");
                }
            );

            const genderFeedback = document.getElementById("genderFeedback");
            if (genderFeedback) {
                genderFeedback.style.display = "none";
            }

            const successMessage = document.getElementById(
                "registrationSuccess"
            );

            if (successMessage) {
                successMessage.hidden = true;
            }
        }, 0);
    });
}

document.querySelectorAll(".needs-validation").forEach(function (form) {
    setupValidation(form);
});
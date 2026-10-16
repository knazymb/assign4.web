document.querySelectorAll(".needs-validation").forEach(function (form) {
    const password = form.querySelector("#password");
    const confirmPassword = form.querySelector("#confirmPassword");
    const successMessage = form.querySelector("#successMessage") ||
        form.querySelector("#registrationSuccess");
    const genderError = form.querySelector("#genderError");
    const genderRadios = form.querySelectorAll('input[name="gender"]');

    function checkPasswords() {
        if (password && confirmPassword) {
            confirmPassword.setCustomValidity("");

            if (confirmPassword.value !== password.value) {
                confirmPassword.setCustomValidity("Passwords do not match.");
            }
        }
    }

    function updateField(input) {
        if (input.type === "radio" || input.type === "checkbox") {
            return;
        }

        if (input.checkValidity()) {
            input.classList.add("is-valid");
            input.classList.remove("is-invalid");
        } else {
            input.classList.add("is-invalid");
            input.classList.remove("is-valid");
        }
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        checkPasswords();

        form.querySelectorAll(
            "input:not([type='radio']):not([type='checkbox']), textarea, select"
        ).forEach(function (input) {
            updateField(input);
        });

        if (genderRadios.length > 0) {
            const genderSelected = Array.from(genderRadios).some(
                function (radio) {
                    return radio.checked;
                }
            );

            genderRadios.forEach(function (radio) {
                radio.classList.toggle("is-invalid", !genderSelected);
                radio.classList.toggle("is-valid", genderSelected);
            });

            if (genderError) {
                genderError.style.display = genderSelected ? "none" : "block";
            }
        }

        form.classList.add("was-validated");

        if (successMessage) {
            successMessage.hidden = !form.checkValidity();
        }
    });

    form.addEventListener("input", function (event) {
        const input = event.target;

        checkPasswords();

        if (form.classList.contains("was-validated")) {
            updateField(input);

            if (confirmPassword) {
                updateField(confirmPassword);
            }

            if (successMessage) {
                successMessage.hidden = !form.checkValidity();
            }
        }
    });

    form.addEventListener("change", function () {
        if (form.classList.contains("was-validated")) {
            if (genderRadios.length > 0) {
                const genderSelected = Array.from(genderRadios).some(
                    function (radio) {
                        return radio.checked;
                    }
                );

                genderRadios.forEach(function (radio) {
                    radio.classList.toggle("is-invalid", !genderSelected);
                    radio.classList.toggle("is-valid", genderSelected);
                });

                if (genderError) {
                    genderError.style.display = genderSelected ? "none" : "block";
                }
            }

            if (successMessage) {
                successMessage.hidden = !form.checkValidity();
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

            if (confirmPassword) {
                confirmPassword.setCustomValidity("");
            }

            if (genderError) {
                genderError.style.display = "none";
            }

            if (successMessage) {
                successMessage.hidden = true;
            }
        }, 0);
    });
});
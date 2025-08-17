"use strict";

document.addEventListener("DOMContentLoaded", function () {
    $("#register").on("click", function (e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append("name", $("#name").val());
        formData.append("email", $("#email").val());
        formData.append("password", $("#password").val());
        formData.append("phone", $("#phone").val());
        formData.append("gender", $("#gender").val());
        formData.append("image", $("#image")[0].files[0]);

        $.ajax({
            url: "/store",
            type: "post",
            data: formData,
            contentType: false,
            processData: false,
            headers: {
                "X-CSRF-Token": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (response) {
                if (response.status == 200) {
                    $("#error_email").html("");
                    $("#error_password").html("");
                    Swal.fire({
                        text: `${response.message}!`,
                        icon: "success",
                    }).then((result) => {
                        location.href = "/login";
                    });
                } else if (response.status == 401) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `${response.message}!`,
                    });
                }
            },
            error: function (xhr) {
                if (xhr.status == 422) {
                    $("#error_email").html("");
                    $("#error_password").html("");

                    let errors = xhr.responseJSON.errors;

                    if (errors.name) {
                        $("#error_name").html(errors.name[0]);
                    } else {
                        $("#error_name").html("");
                    }

                    if (errors.email) {
                        $("#error_email").html(errors.email[0]);
                    } else {
                        $("#error_email").html("");
                    }

                    if (errors.password) {
                        $("#error_password").html(errors.password[0]);
                    } else {
                        $("#error_password").html("");
                    }

                    if (errors.phone) {
                        $("#error_phone").html(errors.phone[0]);
                    } else {
                        $("#error_phone").html("");
                    }

                    if (errors.gender) {
                        $("#error_gender").html(errors.gender[0]);
                    } else {
                        $("#error_gender").html("");
                    }
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong. Please try again!",
                    });
                }
            },
        });
    });
});

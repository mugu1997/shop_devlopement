"use strict";

document.addEventListener("DOMContentLoaded", function () {
    $("#add_user_form").on("click", function (e) {
        e.preventDefault();

        var formData = new FormData();

        var name = document.querySelector("#name").value;
        var email = document.querySelector("#email").value;
        var userType = document.querySelector("#user_type").value;
        var password = document.querySelector("#password").value;
        var phone = document.querySelector("#phone").value;

        formData.append("name", name);
        formData.append("email", email);
        formData.append("user_type", userType);
        formData.append("password", password);
        formData.append("phone", phone);

        $.ajax({
            url: "/user/store",
            type: "post",
            data: formData,
            contentType: false,
            processData: false,
            headers: {
                "X-CSRF-Token": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (response) {
                if (response.status == 200) {
                    $("#error_name").html("");
                    $("#error_user_type").html("");
                    $("#error_email").html("");
                    $("#error_password").html("");

                    Swal.fire({
                        text: `${response.message}`,
                        icon: "success",
                    }).then((result) => {
                        location.href = "/user";
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

                    if (errors.user_type) {
                        $("#error_user_type").html(errors.user_type[0]);
                    } else {
                        $("#error_user_type").html("");
                    }

                    if (errors.phone) {
                        $("#error_phone").html(errors.phone[0]);
                    } else {
                        $("#error_phone").html("");
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

    $("#update_user_form").on("click", function (e) {
        e.preventDefault();

        var formData = new FormData();

        var names = document.querySelector("#name").value;
        var emails = document.querySelector("#email").value;
        var password = document.querySelector("#password").value;
        var user_types = document.querySelector("#user_type").value;
        var id = document.querySelector("#user_id").value;
        var phone = document.querySelector("#phone").value;

        formData.append("name", names);
        formData.append("email", emails);
        formData.append("password", password);
        formData.append("user_type", user_types);
        formData.append("phone", phone);

        $.ajax({
            type: "post",
            url: "/user/update/" + id,
            data: formData,
            contentType: false,
            processData: false,
            headers: {
                "X-CSRF-Token": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (response) {
                if (response.status == 200) {
                    $("#error_name").html("");
                    $("#error_user_type").html("");
                    $("#error_email").html("");
                    $("#error_password").html("");

                    Swal.fire({
                        text: `${response.message}`,
                        icon: "success",
                    }).then((result) => {
                        location.href = "/user";
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

                    if (errors.user_type) {
                        $("#error_user_type").html(errors.user_type[0]);
                    } else {
                        $("#error_user_type").html("");
                    }

                    if (errors.phone) {
                        $("#error_phone").html(errors.phone[0]);
                    } else {
                        $("#error_phone").html("");
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

    $(document).on("click", "#user_delete", function (e) {
        e.preventDefault();
        let id = $(this).data("id");
        console.log(id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/user/delete/" + id,
                    type: "DELETE",
                    headers: {
                        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                            "content"
                        ),
                    },
                    success: function (response) {
                        Swal.fire(
                            "Deleted!",
                            "User has been deleted.",
                            "success"
                        );
                        // Optionally remove the deleted row from table
                        $(`a[data-id="${id}"]`).closest("tr").remove();
                    },
                    error: function () {
                        Swal.fire("Error!", "Something went wrong.", "error");
                    },
                });
            }
        });
    });
});

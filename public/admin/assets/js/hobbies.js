"use strict";

document.addEventListener("DOMContentLoaded", function () {
    $("#hobbies_form").on("click", function (e) {
        e.preventDefault();

        var formData = new FormData();

        formData.append("hobbies_name", $("#hobbies_name").val());
        formData.append("user_name", $("#user_name").val());

        $.ajax({
            url: "/hobbies/store",
            type: "post",
            data: formData,
            contentType: false,
            processData: false,
            headers: {
                "X-CSRF-Token": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (response) {
                if (response.status == 200) {
                    $("#error_hobbies_name").html("");
                    Swal.fire({
                        text: `${response.message}!`,
                        icon: "success",
                    }).then((result) => {
                        location.href = "/hobbies";
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
                    $("#error_hobbies_name").html("");

                    let errors = xhr.responseJSON.errors;

                    if (errors.hobbies_name) {
                        $("#error_hobbies_name").html(errors.hobbies_name[0]);
                    } else {
                        $("#error_hobbies_name").html("");
                    }

                    if (errors.user_name) {
                        $("#error_user_name").html(errors.user_name[0]);
                    } else {
                        $("#error_user_name").html("");
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

    $("#hobbies_update_form").on("click", function (e) {
        e.preventDefault();

        var formData = new FormData();
        var id = document.querySelector("#hobbies_id").value;

        formData.append("hobbies_name", $("#hobbies_name").val());
        formData.append("user_name", $("#user_name").val());

        $.ajax({
            url: `/hobbies/update/${id}`,
            type: "post",
            data: formData,
            contentType: false,
            processData: false,
            headers: {
                "X-CSRF-Token": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (response) {
                if (response.status == 200) {
                    $("#error_hobbies_name").html("");
                    Swal.fire({
                        text: `${response.message}!`,
                        icon: "success",
                    }).then((result) => {
                        location.href = "/hobbies";
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
                    $("#error_hobbies_name").html("");

                    let errors = xhr.responseJSON.errors;

                    if (errors.hobbies_name) {
                        $("#error_hobbies_name").html(errors.hobbies_name[0]);
                    } else {
                        $("#error_hobbies_name").html("");
                    }

                    if (errors.user_name) {
                        $("#error_user_name").html(errors.user_name[0]);
                    } else {
                        $("#error_user_name").html("");
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

    $(".hobbies_id").on("click", function (e) {
        e.preventDefault();

        var id = $(this).data("id");


        $.ajax({
            type: "delete",
            url: `/hobbies/delete/${id}`,
            contentType: false,
            processData: false,
            headers: {
                "X-CSRF-Token": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (response) {
                if (response.success == 200) {
                    Swal.fire({
                        text: `${response.message}`,
                        icon: "success",
                    }).then((result) => {
                        location.href = "/hobbies";
                    });
                } else if (response.status == 401) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `${response.message}!`,
                    });
                }
            },
        });
    });
});

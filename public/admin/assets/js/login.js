'use strict';

$('#login').on('click',function(e){
    e.preventDefault();

    let fromData = new FormData();
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    fromData.append('email',email);
    fromData.append('password',password);

    $.ajax({
        type : 'post',
        url  : 'authentication',
        data: fromData,
        contentType: false,
        processData: false,
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){

            if(response.status == 200){
                $('#error_email').html('');
                $('#error_password').html('');
                Swal.fire({
                    text: `${response.message}!`,
                    icon: "success"
                }).then((result)=>{
                    location.href="/dashboard";
                });

            }else if(response.status == 401){

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${response.message}!`,
                });

            }
        },
        error:function(xhr){

            if(xhr.status == 422){
                $('#error_email').html('');
                $('#error_password').html('');

                let errors = xhr.responseJSON.errors;

                if(errors.email){
                   $('#error_email').html(errors.email[0]);
                }else{
                     $('#error_email').html('');
                }

                if(errors.password){
                    $('#error_password').html(errors.password[0]);
                }else{
                      $('#error_password').html('');
                }
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong. Please try again!",
                });
            }

        }
    });
});

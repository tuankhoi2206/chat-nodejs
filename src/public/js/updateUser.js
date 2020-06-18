let userAvatar = null;
let userInfor = {};
let originAvatarSrc = null;

function updateUserInfor() {
    $('#input-change-avatar').bind('change', function () {
        let fileData = $(this).prop('files')[0];
        let math = ['image/png', 'image/jpg', 'image/jpeg'];
        const LIMIT_DATA = 1048576; // =1 MB
        if ($.inArray(fileData.type, math) === -1) {
            alertify.notify('File nhập phải có định dang [\'image/png\', \'image/jpg\', \'image/jpeg\']', 'error', 7);
            $(this).val(null);
            return false;
        }

        if (fileData.size > LIMIT_DATA) {
            alertify.notify('File nhập vào giới hạn 1MB', 'error', 7);
            $(this).val(null);
            return false;
        }

        if (typeof (FileReader) != 'undefined') {
            let imageReivew = $('#image-edit-profile');
            imageReivew.empty();

            let fileReader = new FileReader();
            fileReader.onload = function (element) {
                $('<img>', {
                    'src': element.target.result,
                    'class': 'avatar img-circle',
                    'id': 'user-modal-avatar',
                    'alt': 'avatar'
                }).appendTo(imageReivew);
            };
            imageReivew.show();
            fileReader.readAsDataURL(fileData);
        } else {
            alertify.notify('Trình duyệt của bạn không hỗ trợ FileReader', 'error', 7);
        }

        let formData = new FormData();
        formData.append('avatar', fileData);
        userAvatar = formData;
    });
    $('#username').bind('change', function () {
        userInfor.username = $(this).val();
    });
    $('#username').bind('change', function () {
        userInfor.username = $(this).val();
    });

    $('#gender-male').bind('click', function () {
        userInfor.gender = $(this).val();
    });

    $('#gender-female').bind('click', function () {
        userInfor.gender = $(this).val();
    });
    $('#address').bind('change', function () {
        userInfor.address = $(this).val();
    });
    $('#phone').bind('change', function () {
        userInfor.phone = $(this).val();
    });
}

$(document).ready(function () {
    updateUserInfor();
    originAvatarSrc = $('#user-modal-avatar').attr('src');
    $('#input-btn-update-user').bind('click', function () {
        console.log(userAvatar);
        console.log(userInfor);

        if ($.isEmptyObject(userInfor) || !userAvatar) {
            alertify.notify('Vui lòng nhập đầy đủ thông tin', 'error', 7);
            return;
        }
        $.ajax({
            url: '/user/update-avatar',
            type: 'put',
            cache: false,
            contentType: false,
            processData: false,
            data: userAvatar,
            success: function (result) {
                $('.user-modal-alert-success').find('span').text(result.message);
                $('.user-modal-alert-success').css('display', 'block');

                $('#navbar-avatar').attr('src', result.imageSrc);
                originAvatarSrc = result.imageSrc;
                $('#input-btn-cancel-update-user').click();
            },
            error: function (error) {
                $('.user-modal-alert-error').find('span').text(error.responseText);
                $('.user-modal-alert-error').css('display', 'block');
                $('#input-btn-cancel-update-user').click();
            }
        })
    });
    console.log(userInfor);
    $('#input-btn-cancel-update-user').bind('click', function () {
        userInfor = {};
        userAvatar = null;
        $('#user-modal-avatar').attr('src', originAvatarSrc);
        $('#input-change-avatar').val(null);

    });
});

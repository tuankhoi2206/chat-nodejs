function findUsersContact() {
    let keyword = $('#input-find-users-contact').val();
    if (!keyword.length) {
        alertify.notify('Chưa nhập nội dung tìm kiếm', 'error', 7);
        return;
    }

    let regexKeyword = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/);
    if (!regexKeyword.test(keyword)) {
        alertify.notify('Username tìm kìm không hợp lệ', 'error', 7);
        return;
    }

    $.get(`/contact/find-users/${keyword}`, function (data) {
        $('#find-user ul').html(data);
    });
}

$(document).ready(function () {
    $('#input-find-users-contact').bind('keypress', function (element) {
        if (element.which === 13) {
            findUsersContact();
        }
    });

    $('#btn-find-users-contact').bind('click', function (element) {
        findUsersContact();
    });
});


function removeRequestContact() {
    $('.user-remove-request-contact').bind('click', function () {

        let tagGetId = $(this).data('uid');
        $.ajax({
            url: "/contact/user-remove-request-contact",
            type: "delete",
            data: {uid: tagGetId},
            success: function (data) {
                if (data.success) {
                    $('#find-user').find(`div.user-add-new-contact[data-uid=${tagGetId}]`).css('display', 'inline-block');
                    $('#find-user').find(`div.user-remove-request-contact[data-uid=${tagGetId}]`).hide();
                    deIncreaseNumberNotifContact('count-request-contact-sent');
                }
            },
        })
    });
}

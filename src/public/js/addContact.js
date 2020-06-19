
function addContact() {
    $('.user-add-new-contact').bind('click', function () {
        let tagGetId = $(this).data('uid');
        console.log('tagGetId' + tagGetId);
        $.post('/contact/add-new', {uid: tagGetId}, function (data) {
            console.log(data);
            if (data.success) {
                $('#find-user').find(`div.user-add-new-contact[data-uid=${tagGetId}]`).hide();
                $('#find-user').find(`div.user-remove-request-contact[data-uid=${tagGetId}]`).css('display', 'inline-block');
                increaseNumberNotifContact('count-request-contact-sent');
            }
        });
    });
}
function addContact() {
    $('.user-add-new-contact').bind('click', function () {
        let tagGetId = $(this).data('uid');
        $.post('/contact/add-new', {uid: tagGetId}, function (data) {

            if (data.success) {
                $('#find-user').find(`div.user-add-new-contact[data-uid=${tagGetId}]`).hide();
                $('#find-user').find(`div.user-remove-request-contact[data-uid=${tagGetId}]`).css('display', 'inline-block');
                increaseNumberNotification('count-request-contact-sent');
                socket.emit('add-new-contact', {
                    contactId: tagGetId
                });
            }
        });
    });
}

socket.on('response-add-new-contact', function (user) {

    console.log('user');
    console.log(user);

    let notif = `<span data-uid="${user.id}">
                       <img class="avatar-small" src="images/users/${user.avatar}" alt="">
                       <strong>${user.username}</strong> đã gửi cho bạn một lời mời kết bạn!
                </span><br><br><br>`;
    $('.noti_content').prepend(notif);
    /**
     * Xóa yêu cầu kết bạn
     */
    increaseNumberNotifContact('count-request-contact-received');
    increaseNumberNotification('noti_contact_counter');
    increaseNumberNotification('noti_counter');
});

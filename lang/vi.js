export const transValidation = {
    email_incorrect: 'Email không hợp lệ.',
    gender_incorrect: 'Giới tính có giá trị Male hoặc Female',
    password_incorrect: 'Password không hợp lệ.',
    password_confirmation_incorrect: 'Password Confirmation không hợp lệ.',
    keyword_find_user: "Chỉ cho phép ký tự chữ cái và số",
}

export const transErrors = {
    account_in_use: "Email đã được sử dụng",
    account_remove: "Email deleted",
    account_not_active: "User not activated",
    token_undefined: "Token không tồn tại",
    login_failed: "Tài khoản hoặc mật khẩu không đúng",
    server_error: "Lỗi server",
    avatar_type: "Image không hợp lệ",
    avatar_size: "Image upload vượt quá giới hạn cho phép( 1MB).",
}

export const transSuccess = {
    userCreated: (email) => {
        return `Tài khoản <strong>${email}</strong> đã được tạo. Vui lòng kiểm tra email để kích hoạt tài khoản.`;
    },
    account_actived: "Kích hoạt tài khoản thành công.",
    loginSuccess: (username) => {
        return `Tài khoản ${username} đăng nhập thành công.`;
    },
    logout_sucess: "Đăng xuất tài khoản thành công.",
    avatar_updated: 'Cập nhật ảnh đại diện thành công'
}

export const transMail = {
    subject: "Xác nhận kích hoạt tài khoản.",
    template: (linkVerify) => {
        return `
                <h2>Gần đây, bạn đã đăng ký tài khoản trên Node-Chat. Để hoàn thành quy trình đăng ký, vui lòng xác nhận tài khoản của bạn.</h2>
                <h3>Vui lòng kích vào link liên kết bên dưới để xác nhận kích hoạt tài khoản</h3>
                <h3><a href="${linkVerify}" target="_blank">${linkVerify}</a></h3>
                <h4></h4>
                `;
    },
    send_failed: "Có lỗi trong quá trình gửi email."
}

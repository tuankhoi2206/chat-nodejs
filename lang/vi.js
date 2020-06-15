export const transValidation = {
    email_incorrect: 'Email không hợp lệ.',
    gender_incorrect: 'Giới tính có giá trị Male hoặc Female',
    password_incorrect: 'Password không hợp lệ.',
    password_confirmation_incorrect: 'Password Confirmation không hợp lệ.',
}

export const transErrors = {
    account_in_use: "Email đã được sử dụng",
    account_remove: "Email deleted",
    account_not_active: "User not activated"
}

export const transSuccess = {
    userCreated: (email) => {
        return `Tài khoản <strong>${email}</strong> đã được tạo. Vui lòng kiểm tra email để kích hoạt tài khoản.`;
    }
}

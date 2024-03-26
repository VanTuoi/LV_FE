
//  third-party
import { useRouter } from 'next/navigation'
import { useState } from "react";
import axios from '@/utils/axios';
// In the Project

const useChangePassword = () => {

    const router = useRouter()
    const [oldPassowrd, setOldPassword] = useState('')
    const [errOldPassowrd, setErrOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [errorPassWord, setErrorPassWord] = useState(null);
    const [errorRePassWord, setErrorRePassWord] = useState(null);

    const [errorChangePassword, setErrorChangePassWord] = useState(null);

    const [Jwt, setJwt] = useState('');

    const isValidPassword = (password) => {
        // Mật khẩu từ 8-20 kí tự, ít nhất 1 kí tự viết hoa hoặc viết thường, 1 kí tự đặc biệt, và 1 chữ số
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`[\]{}|\\:;<>?,./-]).{8,20}$/;
        // const regex = /^.*/;
        return regex.test(password);
    };
    const checkCurrentPassword = (oldPassowrd) => {
        setOldPassword(oldPassowrd)
        if (oldPassowrd === '') {
            setErrOldPassword('Mật khẩu không được trống')
            return false
        } else {
            setErrOldPassword(null)
            return true
        }
    }
    const checkPassword = (password) => {
        setPassword(password)
        if (password !== rePassword) {
            checkRePassword()
        } else {
            setErrorRePassWord(null)
        }
        if (!password || isValidPassword(password) === false) {
            setErrorPassWord('Mật khẩu phải từ 8 kí tự bao gồm 1 chữ cái, chữ số và kí tự đặc biệt')
            return false;
        } else {
            setErrorPassWord(null)
            return true
        }
    };
    // còn lỗi về so 2 mật khẩu, của front-end để sử lý sau
    const checkRePassword = (rePassword) => {
        setRePassword(rePassword)
        if (password !== rePassword) {
            setErrorRePassWord('Mật khẩu không khớp')
            return false;
        } else {
            setErrorRePassWord(null)
            return true
        }
    };

    const changePassword = async () => {

        if (checkPassword(password) && checkRePassword(rePassword)) {
            try {
                const response = await axios.post('/api/v1/auth/change-password', {
                    Jwt: Jwt,
                    U_Password: password
                });
                console.log('response', response, Jwt, password);
                if (response) {
                    if (response.status === 0) {
                        console.log('Đổi mật khẩu thành công');
                        setErrorChangePassWord('success')
                        router.replace('/authentication/login', undefined, { shallow: true });
                    } else {
                        setErrorChangePassWord('Đổi mật khẩu không thành công')
                        console.log('Đổi mật khẩu không thành công');
                    }
                } else {
                    setErrorChangePassWord('Lỗi lấy dữ liệu từ API')
                    console.log('Lỗi lấy dữ liệu từ API', response);
                }
            } catch (error) {
                console.log('Lỗi lấy trong quá trình lấy lại mật khẩu');
            }
        }
    }

    const changePasswordHaveLogin = async () => {
        if (checkCurrentPassword(oldPassowrd) && checkPassword(password) && checkRePassword(rePassword)) {
            try {
                const response = await axios.post('/api/v1/user/change-password', {
                    U_Current_Password: oldPassowrd,
                    U_New_Password: password,
                });
                console.log('response', response);
                if (response) {
                    if (response.status === 0) {
                        console.log('Đổi mật khẩu thành công');
                        setErrorChangePassWord('success')
                        router.replace('/user', undefined, { shallow: true });
                    } else if (response.status === 1) {
                        console.log('Mật khẩu hiện tại của bạn không chính xác');
                        setErrOldPassword('Mật khẩu hiện tại của bạn không chính xác')
                    } else {
                        setErrorChangePassWord(response.messager)
                        console.log('Đổi mật khẩu không thành công');
                    }
                } else {
                    setErrorChangePassWord('Lỗi lấy dữ liệu từ API')
                    console.log('Lỗi lấy dữ liệu từ API', response);
                }
            } catch (error) {
                console.log('Lỗi lấy trong quá trình lấy lại mật khẩu');
            }
        }
    }
    return {
        errorChangePassword, errorPassWord, errorRePassWord, errOldPassowrd, setErrorChangePassWord, checkCurrentPassword, checkPassword, checkRePassword, changePassword, setJwt, changePasswordHaveLogin
    }
}

export default useChangePassword

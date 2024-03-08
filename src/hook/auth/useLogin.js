import { useState } from "react";
import { useRouter } from 'next/navigation'

import axios from '@/utils/axios';

const useAuth = () => {

    const [userName, setUserName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const [errorLogin, setErrorLogin] = useState(false);
    const [errorUserName, setErrorUserName] = useState(null);
    const [errPhone, setErrorPhone] = useState('')
    const [errorPassWord, setErrorPassWord] = useState(null);

    const router = useRouter()
    // const checklogin = (email, password) => {
    //     if (jwt) {
    //         setIsAuthenticated(true)
    //     }
    //     else {
    //         dispatch(login({ email, password }))
    //         if (jwt) {
    //             setIsAuthenticated(true)
    //         }
    //         else {
    //             setIsAuthenticated(false)
    //             setMesseger(EM)
    //         }
    //     }
    //     return { isAuthenticated, messeger };
    // }


    const isValidUsername = (username) => {         // Tên đăng nhập từ 3-20 kí tự
        const regex = /^\S{3,20}$/;
        return regex.test(username);
    }

    const isValidPhone = (phone) => {
        // Đảm bảo số điện thoại là 10 số và bắt đầu bằng 0
        const regex = /^0\d{9}$/;
        // const regex = /^.*/;
        return regex.test(phone);
    };

    const isValidPassword = (password) => {            // Mật khẩu từ 8-20 kí tự, ít nhất 1 đặc biệt, 1 viết hoa, 1 viết thường
        // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`[\]{}|\\:;<>?,./-]).{8,50}$/;
        const regex = /^.*/;
        return regex.test(password);
    }


    const checkUserName = (userName) => {
        if (isValidUsername(userName) === false || !userName) {
            setErrorUserName('Tên đăng nhập phải từ 3-20 kí tự')
            setErrorLogin(true)
            return false;
        } else {
            setUserName(userName)
            setErrorUserName(null)
            return true
        }
    }

    const checkPhone = (phone) => {
        if (isValidPhone(phone) === false || !phone) {
            setErrorPhone('Số điện thọa phải đủ 10 chữ số bắt đầu từ 0')
            return false;
        } else {
            setPhone(phone)
            setErrorPhone(null)
            return true
        }
    }

    const checkPassWord = (password) => {
        if (!password || isValidPassword(password) === false) {
            setErrorPassWord('Mật khẩu phải có ít nhất 8 kí tự')
            setErrorLogin(true)
            return false;
        } else {
            setPassword(password)
            setErrorPassWord(null)
            return true
        }
    }

    const login = async () => {
        if (checkPhone(phone) && checkPassWord(password)) {
            setErrorLogin(true)

            const response = await axios.post('/api/v1/auth/login', {
                U_PhoneNumber: phone,
                U_Password: password,
            });

            if (response) {
                if (response.status == 0) {    // thành công
                    console.log('Data', response.data);
                    
                    router.push('http://localhost:3000/')
                }
                if (response.status == 1) {
                    setErrorPhone('Không tìm thấy số điện thoại trên hệ thống')
                }
                if (response.status == 2) {
                    setErrorPassWord('Mật khẩu không đúng')
                    console.log('Mật khẩu không đúng');
                }
            } else {
                console.log('Lỗi lấy dữ liệu', response);
                setErrorLogin('Đăng nhập thất bại! vui lòng thử lại sau ít phút nữa')
            }
        } else {
            setErrorLogin(false)
        }
    }

    const logout = () => {
        try {
            dispatch(logout())
        } catch (error) {
            console.log(error);
        } finally {
            router.push('/')
        }
    }
    return { errorLogin, errorUserName, errPhone, errorPassWord, checkUserName, checkPhone, checkPassWord, login, logout }
}

export default useAuth

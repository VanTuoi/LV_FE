import { useState } from "react";

import { userServices } from '@/services/index'
import { useRouter } from 'next/navigation'
const useAuth = () => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [errorLogin, setErrorLogin] = useState(false);
    const [errorUserName, setErrorUserName] = useState(null);
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

    const checkLogin = async () => {
        if (checkUserName(userName) && checkPassWord(password)) {
            const data = await userServices.login(userName, password)
            if (data) {
                setErrorLogin(null)
                // console.log('data', data);
                if (data.EC === 0) {
                    router.push('/')
                }
                if (data.EC === 1) {
                    setErrorUserName('Không tìm thấy tài khoản')
                }
                if (data.EC === 2) {
                    setErrorPassWord('Mật khẩu không đúng')
                }
            } else {
                setErrorLogin('Đăng nhập thất bại! vui lòng thử lại sau ít phút nữa')
            }
            return true
        } else
            setErrorLogin(false)
    }

    const isValidUsername = (username) => {         // Tên đăng nhập từ 3-20 kí tự
        const regex = /^\S{3,20}$/;
        return regex.test(username);
    }
    const isValidPassword = (password) => {            // Mật khẩu từ 8-20 kí tự, ít nhất 1 đặc biệt, 1 viết hoa, 1 viết thường
        // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`[\]{}|\\:;<>?,./-]).{8,50}$/;
        const regex = /^.*/;
        return regex.test(password);
    }

    const checkUserName = (userName) => {
        console.log('jhhe', userName);
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
    const logout = () => {
        try {
            dispatch(logout())
        } catch (error) {
            console.log(error);
        } finally {
            router.push('/')
        }
    }
    return { errorLogin, errorUserName, errorPassWord, checkUserName, checkPassWord, checkLogin, logout }
}

export default useAuth

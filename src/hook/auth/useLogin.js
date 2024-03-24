// Third-party
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { useSession, signOut, signIn, mutate } from 'next-auth/react';
import axios from '@/utils/axios';
// In the Project
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import userSlice from '@/lib/features/userSlice'
import managerSlice from '@/lib/features/managerSlice'

const useLogin = () => {

    const dispatch = useAppDispatch();
    let infoToRedux = useAppSelector((state) => state.reducer.user.info)

    const [userName, setUserName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const [errorLogin, setErrorLogin] = useState(false);
    const [errorUserName, setErrorUserName] = useState(null);
    const [errPhone, setErrorPhone] = useState('')
    const [errorPassWord, setErrorPassWord] = useState(null);

    const router = useRouter()

    useEffect(() => {
        // if (infoToRedux && infoToRedux.U_Id !== null && infoToRedux.U_Id !== '') router.push('/')
    }, [])

    useEffect(() => {
        // Prefetch the dashboard page
        router.prefetch('/')
    }, [router])

    const isValidUsername = (username) => {         // Tên đăng nhập từ 3-20 kí tự
        const regex = /^\S{3,20}$/;
        return regex.test(username);
    };
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
    };
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
    };
    const checkPhone = (phone) => {
        if (isValidPhone(phone) === false || !phone) {
            setErrorPhone('Số điện thoại phải đủ 10 chữ số bắt đầu từ 0')
            return false;
        } else {
            setPhone(phone)
            setErrorPhone(null)
            return true
        }
    };
    const checkPassword = (password) => {
        if (!password || isValidPassword(password) === false) {
            setErrorPassWord('Mật khẩu phải có ít nhất 8 kí tự')
            setErrorLogin(true)
            return false;
        } else {
            setPassword(password)
            setErrorPassWord(null)
            return true
        }
    };
    const loginUser = async () => {

        try {
            if (checkPhone(phone) && checkPassword(password)) {

                setErrorLogin(true)

                const response = await axios.post('/api/v1/auth/login-u', {
                    U_PhoneNumber: phone,
                    U_Password: password,
                });

                if (response) {
                    if (response.status == 0) {    // thành công
                        console.log('Data', response);
                        sessionStorage.setItem('U_name', response.data.U_Name);
                        sessionStorage.setItem('U_PrestigeScore', response.data.U_PrestigeScore);
                        router.back();
                    }
                    if (response.status == 1) {
                        setErrorPhone('Không tìm thấy số điện thoại trên hệ thống')
                    }
                    if (response.status == 4) {
                        setErrorPhone('Tài khoản của bạn đang bị tạm khóa')
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
        } catch (error) {
            setErrorLogin('Đăng nhập thất bại! vui lòng thử lại sau ít phút nữa')
        }
    };
    const loginManager = async () => {
        try {
            if (checkPhone(phone) && checkPassword(password)) {

                setErrorLogin(true)

                const response = await axios.post('/api/v1/auth/login-m', {
                    M_PhoneNumber: phone,
                    M_Password: password,
                });
                console.log('response', response);
                if (response) {
                    if (response.status === 0) {    // thành công
                        console.log('Data', response);
                        dispatch(managerSlice.actions.login(response.data));
                        router.push('/manager')
                    }
                    if (response.status === 1) {
                        setErrorPhone('Không tìm thấy số điện thoại trên hệ thống')
                    }
                    if (response.status === 4) {
                        setErrorPhone('Tài khoản của bạn đang bị tạm khóa')
                    }
                    if (response.status === 2) {
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
        } catch (error) {
            setErrorLogin('Đăng nhập thất bại! vui lòng thử lại sau ít phút nữa')
        }
    };
    const handleClickLoginWithGoogle = async () => {
        signIn('google')
    };
    const logout = () => {
        try {
            dispatch(logout())
        } catch (error) {
            console.log(error);
        } finally {
            router.push('/')
        }
    };
    return {
        errorLogin, errorUserName, errPhone, errorPassWord,
        checkUserName, checkPhone, checkPassword, loginUser, loginManager, handleClickLoginWithGoogle, logout
    };
}

export default useLogin

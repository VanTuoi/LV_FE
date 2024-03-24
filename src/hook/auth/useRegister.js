
//  third-party
import { useRouter } from 'next/navigation'
import { useState } from "react";
import axios from '@/utils/axios';

// project import


const useRegister = () => {

    const router = useRouter();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const [errName, setErrorName] = useState('')
    const [errEmail, setErrorEmail] = useState('')
    const [errPhone, setErrorPhone] = useState('')
    const [errPassword, setErrorPassword] = useState('')

    const [isErrorRegister, setIErrorRegister] = useState('')

    const isValidName = (name) => {
        // Chấp nhận chữ cái (cả hoa và thường), kí tự có dấu, khoảng trắng, từ 1 đến 50 kí tự
        const regex = /^[A-Za-zÀ-Ỹà-ỹ\s]{1,50}$/;
        return regex.test(name);
    };
    const isValidEmail = (email) => {
        // Một regex cơ bản cho email hợp lệ
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // const regex = /^.*/;
        return regex.test(email);
    };
    const isValidPhone = (phone) => {
        // Đảm bảo số điện thoại là 10 số và bắt đầu bằng 0
        const regex = /^0\d{9}$/;
        // const regex = /^.*/;
        return regex.test(phone);
    };
    const isValidPassword = (password) => {
        // Mật khẩu từ 8-20 kí tự, ít nhất 1 kí tự viết hoa hoặc viết thường, 1 kí tự đặc biệt, và 1 chữ số
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`[\]{}|\\:;<>?,./-]).{8,20}$/;
        // const regex = /^.*/;
        return regex.test(password);
    };
    const checkName = (name) => {
        if (isValidName(name) === false || !name) {
            setErrorName('Tên phải từ 1-50 kí tự không bao gồm số và kí tự đặc biệt')
            return false;
        } else {
            setName(name)
            setErrorName(null)
            return true
        }
    }
    const checkEmail = (email) => {
        if (isValidEmail(email) === false || !email) {
            setErrorEmail('Email không hợp lệ')
            return false;
        } else {
            setEmail(email)
            setErrorEmail(null)
            return true
        }
    }
    const checkPhone = (phone) => {
        if (isValidPhone(phone) === false || !phone) {
            setErrorPhone('Số điện thoại phải đủ 10 chữ số bắt đầu từ 0')
            return false;
        } else {
            setPhone(phone)
            setErrorPhone(null)
            return true
        }
    }
    const checkPassword = (password) => {
        if (!password || isValidPassword(password) === false) {
            setErrorPassword('Mật khẩu phải từ 8 kí tự bao gồm 1 chữ cái, chữ số và kí tự đặc biệt')
            return false;
        } else {
            setPassword(password)
            setErrorPassword(null)
            return true
        }
    }

    const registerUser = async () => {
        try {
            if (checkName(name) && checkEmail(email) && checkPhone(phone) && checkPassword(password)) {
                setIErrorRegister('')
                const response = await axios.post('/api/v1/auth/register-u', {
                    U_Name: name,
                    U_Email: email,
                    U_PhoneNumber: phone,
                    U_Password: password,
                });
                console.log('response', response);
                if (response) {
                    if (response.status === 0) {    // thành công
                        console.log('Data', response.data);
                        router.push('http://localhost:3000/authentication/login')
                    }
                    if (response.status === 2) {
                        setErrorPhone('Số điện thoại đăng kí đã tồn tại')
                    }
                    if (response.status === 1) {
                        setIErrorRegister('Có lỗi trong quá trình đăng ký vui lòng thử lại sau ít phút nữa')
                    }
                }
            }
        } catch (error) {
            console.error(error);
            setIErrorRegister('Có lỗi trong quá trình đăng ký vui lòng thử lại sau ít phút nữa')
        }
    }
    const registerManager = async () => {
        try {
            if (checkName(name) && checkEmail(email) && checkPhone(phone) && checkPassword(password)) {
                setIErrorRegister('')
                const response = await axios.post('/api/v1/auth/register-m', {
                    M_Name: name,
                    M_Email: email,
                    M_PhoneNumber: phone,
                    M_Password: password,
                });
                console.log('response', response);
                if (response) {
                    if (response.status === 0) {    // thành công
                        console.log('Data', response.data);
                        router.push('http://localhost:3000/authentication/login')
                    }
                    if (response.status === 2) {
                        setErrorPhone('Số điện thoại đăng kí đã tồn tại')
                    }
                    if (response.status === 1) {
                        setIErrorRegister('Có lỗi trong quá trình đăng ký vui lòng thử lại sau ít phút nữa')
                    }
                }
            }
        } catch (error) {
            console.error(error);
            setIErrorRegister('Có lỗi trong quá trình đăng ký vui lòng thử lại sau ít phút nữa')
        }
    }

    return {
        registerUser, registerManager, checkName, checkEmail, checkPhone, checkPassword,
        errName, errEmail, errPhone, errPassword, isErrorRegister
    }
}


export default useRegister

import { useState } from "react";

const useManagerProfile = () => {

    const [name, setName] = useState()
    const [errName, setErrName] = useState()
    const [email, setEmail] = useState()
    const [errEmail, setErrEmail] = useState()
    const [phone, setPhone] = useState()
    const [errPhone, setErrPhone] = useState()
    const [birthday, setBirthday] = useState()
    const [errBirthday, setErrBirthday] = useState()

    const [errorChangeInfo, setErrorChangeInfo] = useState()

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
    const isValidBirthday = (birthday) => {
        // Một regex cơ bản cho sinh nha hợp lệ
        const regex = /^.*/;
        return regex.test(birthday);
    };
    const checkName = (name) => {
        if (isValidName(name) === false || !name) {
            setErrName('Tên phải từ 1-50 kí tự không bao gồm số và kí tự đặc biệt')
            return false;
        } else {
            setName(name)
            setErrName(null)
            return true
        }
    }
    const checkEmail = (email) => {
        if (isValidEmail(email) === false || !email) {
            setErrEmail('Email không hợp lệ')
            return false;
        } else {
            setEmail(email)
            setErrEmail(null)
            return true
        }
    }
    const checkPhone = (phone) => {
        if (isValidPhone(phone) === false || !phone) {
            setErrPhone('Số điện thọa phải đủ 10 chữ số bắt đầu từ 0')
            return false;
        } else {
            setPhone(phone)
            setErrPhone(null)
            return true
        }
    }

    const changeInfo = async () => {
        try {
            if (checkName(name) && checkEmail(email) && checkPhone(phone)) {
                setErrorChangeInfo('')
                // 
                // const response = await axios.post('/api/v1/auth/register-u', {
                //     U_Name: name,
                //     U_Email: email,
                //     U_PhoneNumber: phone,
                //     U_Password: password,
                // });
                // console.log('response', response);
                // if (response) {
                //     if (response.status === 0) {    // thành công
                //         console.log('Data', response.data);
                //         router.push('http://localhost:3000/authentication/login')
                //     }
                //     if (response.status === 2) {
                //         setErrorChangeInfo('Số điện thoại đăng kí đã tồn tại')
                //     }
                //     if (response.status === 1) {
                //         setErrorChangeInfo('Có lỗi trong quá trình đăng ký vui lòng thử lại sau ít phút nữa')
                //     }
                // }
            }
        } catch (error) {
            console.error(error);
            setErrorChangeInfo('Có lỗi trong quá trình đăng ký vui lòng thử lại sau ít phút nữa')
        }
    }
    return { changeInfo, errName, errEmail, errPhone, errBirthday, checkName, checkEmail, checkPhone }
}

export default useManagerProfile

import { useState } from "react";
import axios from "@/utils/axios";
import dayjs from "dayjs";
import useSessionStorage from "../useSessionStorage/useSessionStorage";

const useSaveStores = () => {


    const [name, setName] = useState('')
    const [errName, setErrName] = useState('')
    const [email, setEmail] = useState('')
    const [errEmail, setErrEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [errPhone, setErrPhone] = useState('')
    const [gender, setGender] = useState('M')
    const [birthday, setBirthday] = useState(dayjs())
    const [errBirthday, setErrBirthday] = useState('')

    const [specialRequirements, setSpecialRequirements] = useState('')

    const [errorChangeInfo, setErrorChangeInfo] = useState(null)

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
        const birthdayDate = dayjs(birthday);
        const currentDate = dayjs();
        const age = currentDate.diff(birthdayDate, 'year');
        return age >= 6;
    };
    const checkName = (name) => {
        setName(name)
        if (isValidName(name) === false || !name) {
            setErrName('Tên phải từ 1-50 kí tự không bao gồm số và kí tự đặc biệt')
            return false;
        } else {
            setErrName(null)
            return true
        }
    }
    const checkEmail = (email) => {
        setEmail(email)
        if (isValidEmail(email) === false || !email) {
            setErrEmail('Email không hợp lệ')
            return false;
        } else {
            setErrEmail(null)
            return true
        }
    }
    const checkPhone = (phone) => {
        setPhone(phone)
        if (isValidPhone(phone) === false || !phone) {
            setErrPhone('Số điện thoại phải đủ 10 chữ số bắt đầu từ 0')
            return false;
        } else {
            setErrPhone(null)
            return true
        }
    }
    const checkGenger = (gender) => {
        setGender(gender)
    }
    const checkBirthday = (birthday) => {
        setBirthday(birthday)
        if (isValidBirthday(birthday) === false || !birthday) {
            setErrBirthday('Bạn không đủ 6 tuổi vui lòng cung cấp thông tin người đại diện')
            return false;
        } else {
            setErrBirthday(null)
            return true
        }
    }

    const getInfo = async () => {
        try {
            const response = await axios.post('/api/v1/user/info');
            console.log('response', response);
            if (response) {
                if (response.status === 0) {    // thành công
                    setName(response.data.U_Name)
                    setEmail(response.data.U_Email)
                    setPhone(response.data.U_PhoneNumber)
                    setGender(response.data.U_Gender)
                    setBirthday(dayjs(response.data.U_Birthday))
                }
                if (response.status === 1) {
                    setErrorChangeInfo('...')
                }
            }
        } catch (error) {
            console.error(error);
            setErrorChangeInfo('Có lỗi trong quá trình truy cập thông tin lòng thử lại sau ít phút nữa')
        }
    }

    const changeInfo = async () => {
        try {
            if (checkName(name) && checkEmail(email) && checkPhone(phone)) {
                const response = await axios.post('/api/v1/user/update-info', {
                    U_Name: name,
                    U_Email: email,
                    U_PhoneNumber: phone,
                    U_Birthday: birthday,
                    U_Gender: gender
                });
                console.log('response', response);
                if (response) {
                    if (response.status === 0) {    // thành công
                        setErrorChangeInfo('success')
                    }
                    if (response.status === 1) {
                        setErrorChangeInfo(response.message)
                    }
                }
            }
        } catch (error) {
            console.error(error);
            setErrorChangeInfo('Có lỗi trong quá trình thay đổi thông tin lòng thử lại sau ít phút nữa')
        }
    }
    return {
        errorChangeInfo,
        name, email, phone, birthday, gender,
        changeInfo, errName, errEmail, errPhone, errBirthday, getInfo, checkName, checkEmail, checkPhone, checkGenger, checkBirthday,
        specialRequirements, setSpecialRequirements, setErrorChangeInfo
    }
}

export default useSaveStores


//  third-party
import { useRouter } from 'next/navigation'
import { useState } from "react";
import axios from '@/utils/axios';
// In the Project

const useForgotPassword = () => {

    const [email, setEmail] = useState('')
    const [errEmail, setErrorEmail] = useState('')

    const [status, setStatus] = useState(false)

    const isValidEmail = (email) => {
        // Một regex cơ bản cho email hợp lệ
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // const regex = /^.*/;
        return regex.test(email);
    };
    const checkEmail = (email) => {
        setEmail(email)
        if (isValidEmail(email) === false || !email) {
            setErrorEmail('Email không hợp lệ')
            return false;
        } else {
            setErrorEmail(null)
            return true
        }
    }
    const forgotPassword = async () => {
        setStatus(false)
        if (checkEmail(email))
            try {
                const response = await axios.post('/api/v1/auth/forgot-password', {
                    U_Email: email
                });

                console.log('response', response);
                if (response) {
                    if (response.status === 0) {
                        setStatus(true)
                        setErrorEmail(null)
                    }
                    if (response.status === 1) {
                        setErrorEmail('Không tìm thấy email của bạn trong hệ thống')
                    }

                } else {
                    console.log('Lỗi lấy dữ liệu từ API', response);
                }
            } catch (error) {
                console.log('Lỗi lấy trong quá trình lấy lại mật khẩu');
            }
    }
    return {
        errEmail, status, setStatus, checkEmail, forgotPassword
    }
}

export default useForgotPassword

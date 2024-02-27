
//  third-party
import { useRouter } from 'next/navigation'
import { useState } from "react";

// project import
import { userServices } from '@/services/index'
import { esES } from '@mui/x-date-pickers';

const useRegister = () => {

    const router = useRouter();
    const [status, setStatus] = useState(false);
    const [message, setMessage] = useState('');

    const register = async (name, email, password, gender, dateOfBirth) => {
        try {
            const data = await userServices.register(name, email, password, gender, dateOfBirth)
            if (data) {
                if (data.EC === '0') {
                    setStatus(true)
                    setMessage(data.EM)
                }
                setStatus(false)
                setMessage(data.EM)
            }
        } catch (error) {
            setStatus(false)
            setMessage('error')
            console.log(error);
        } finally {
            return { status, message }
        }
    }
    return { register, status, message }
}

export default useRegister

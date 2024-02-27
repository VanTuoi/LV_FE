
//  third-party
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// project import
import { getStatusAccount } from "@/redux/features/auth/selectors";
import auth, { login } from "@/redux/features/auth/auth-slice";

const useAuth = () => {

    const router = useRouter();
    const dispatch = useDispatch()
    const { status, EM, EC, jwt } = useSelector(getStatusAccount);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [messeger, setMesseger] = useState('');

    const checklogin = (email, password) => {
        if (jwt) {
            setIsAuthenticated(true)
        }
        else {
            dispatch(login({ email, password }))
            if (jwt) {
                setIsAuthenticated(true)
            }
            else {
                setIsAuthenticated(false)
                setMesseger(EM)
            }
        }
        return { isAuthenticated, messeger };
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
    return { checklogin, logout }
}

export default useAuth

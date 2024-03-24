
//  third-party
import { useRouter } from 'next/navigation'
import axios from '@/utils/axios';
// In the Project
import useSessionStorage from '@/hook/useSessionStorage/useSessionStorage';


const useLogOut = () => {

    const router = useRouter()

    const { RemoveAllItemSessionStorage } = useSessionStorage()

    const logOut = async () => {

        RemoveAllItemSessionStorage()       // Xoa data tạm

        try {

            const response = await axios.get('/api/v1/auth/logout');

            if (response) {
                if (response.status === 0) {    // thành công
                    console.log('Đăng xuất thành công');
                    router.push('/authentication/login', undefined, { shallow: true });
                }
                console.log('Đăng xuất không thành công');
            } else {
                console.log('Lỗi lấy dữ liệu từ API', response);
            }
        } catch (error) {
            console.log('Lỗi lấy trong quá trình đăng xuất');
        }
    }

    return {
        logOut
    }
}


export default useLogOut

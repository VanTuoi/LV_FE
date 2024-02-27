
import axios from 'axios';

const register = async (name, email, password, gender, dateOfBirth) => {
    // console.log(name, email, password, gender, dateOfBirth);
    try {
        const response = await axios.post('/api/v1/register', {
            username: name,
            email: email,
            password: password,
            gender: gender,
            dateOfBirth: dateOfBirth
        })
        console.log(response);
        return response;
    } catch (error) {
        console.log('Resgister error', error);
        throw error;
    }

};
const login = async (email, password) => {
    console.log('ehee', email, password);
    try {
        const response = await axios.post('http://localhost:8080/api/v1/login', {
            email: email,
            password: password,
        })
        console.log(response);
        return response;
    } catch (error) {
        console.log('login error', error);
        return null;
    }
};

export { register, login }
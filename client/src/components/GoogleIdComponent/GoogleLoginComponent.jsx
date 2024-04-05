import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function GoogleLoginComponent(props) {

    return (
        <GoogleLogin
            onSuccess={async credentialResponse => {
                try {
                    const tokenId = credentialResponse.credential;
                    const res = await axios.post('/api/auth/google/login', { tokenId });
                    props.updateLocalStorage(res.data);
                } catch (error) {
                    console.error('Error logging in:', error);
                }
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    );
}

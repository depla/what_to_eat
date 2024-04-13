import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function GoogleLoginComponent(props) {

    return (
        <GoogleLogin
            onSuccess={async credentialResponse => {
                try {
                    const tokenId = credentialResponse.credential;
                    const res = await axios.post('/api/auth/google/login', { tokenId });
                    if (res.status === 200) {
                        props.updateLocalStorage(true);
                    }
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

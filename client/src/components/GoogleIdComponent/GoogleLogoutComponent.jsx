import { Button } from '@mantine/core';
import axios from 'axios';

export default function GoogleLogoutComponent(props) {
    const logout = async () => {
        props.updateLocalStorage(null)
        const res = await axios.post('/api/auth/google/logout');
    }
    return <Button onClick={logout} variant="filled">Logout</Button>
}

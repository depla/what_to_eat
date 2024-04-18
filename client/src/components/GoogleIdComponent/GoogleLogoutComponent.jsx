import { Button } from '@mantine/core';
import Environment from '../../utils/Environment';
import axios from 'axios';

export default function GoogleLogoutComponent(props) {
    const logout = async () => {
        props.updateLocalStorage(null)
        const res = await axios.post(Environment.getServerBaseUrl() + '/api/auth/google/logout', null, { withCredentials: true });
    }
    return <Button onClick={logout} variant="filled">Logout</Button>
}

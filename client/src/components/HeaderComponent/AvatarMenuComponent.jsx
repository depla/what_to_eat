import { Menu, Text, rem, Avatar } from '@mantine/core';
import {
    IconLogout,
    IconBookmark,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AvatarMenuComponent(props) {

    const logout = async () => {
        // props.updateLocalStorage(null)
        props.updateLocalStorage(false)
        const res = await axios.post('/api/auth/google/logout');
    }

    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <Avatar src={props.avatarUrl}></Avatar>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Logged in as {props.username}</Menu.Label>
                <Menu.Item
                    leftSection={<IconBookmark style={{ width: rem(14), height: rem(14) }} />}
                    component={Link}
                    to={'/saved-businesses'}>
                    View Saved
                </Menu.Item>

                <Menu.Divider />

                <Menu.Item
                    leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                    onClick={logout}
                >
                    Logout
                </Menu.Item>

            </Menu.Dropdown>
        </Menu>
    );
}
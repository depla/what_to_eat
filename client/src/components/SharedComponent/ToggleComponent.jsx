import { useState } from 'react';
import { Switch, useMantineTheme, rem } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

export default function ToggleComponent(props) {
    const theme = useMantineTheme();
    const [checked, setChecked] = useState(props.defaultVal);

    const handleChange = (e) => {
        setChecked(e);
        props.onClick(e);
    }
    return (
        <Switch
            checked={checked}
            onChange={(event) => handleChange(event.currentTarget.checked)}
            color="teal"
            size="md"
            label={props.label}
            thumbIcon={
                checked ? (
                    <IconCheck
                        style={{ width: rem(12), height: rem(12) }}
                        color={theme.colors.teal[6]}
                        stroke={3}
                    />
                ) : (
                    <IconX
                        style={{ width: rem(12), height: rem(12) }}
                        color={theme.colors.red[6]}
                        stroke={3}
                    />
                )
            }
        />
    );
}
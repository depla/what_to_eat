import { createTheme, Button, ActionIcon } from '@mantine/core';

const theme = createTheme({
    components: {
        Button: Button.extend({
            defaultProps: {
                color: "#F5F5DC",
                autoContrast: true
            },
        }),
        ActionIcon: ActionIcon.extend({
            defaultProps: {
                color: "#F5F5DC",
                autoContrast: true
            },
        }),
    },
});

export default theme;
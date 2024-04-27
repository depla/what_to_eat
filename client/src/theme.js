import { createTheme, Button } from '@mantine/core';

const theme = createTheme({
    components: {
        Button: Button.extend({
            defaultProps: {
                color: "#F5F5DC",
                autoContrast: true
            },
        }),
    },
});

export default theme;
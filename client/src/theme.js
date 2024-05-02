import { createTheme, Button, ActionIcon, Card, TextInput } from '@mantine/core';

const theme = createTheme({
    components: {
        Button: Button.extend({
            defaultProps: {
                color: "#F5F5DC",
                autoContrast: true,
                radius: "xl"
            },
        }),
        ActionIcon: ActionIcon.extend({
            defaultProps: {
                color: "#F5F5DC",
                autoContrast: true,
                radius: "xl"
            },
        }),
        Card: Card.extend({
            defaultProps: {
                radius: "lg"
            },
        }),
        TextInput: TextInput.extend({
            defaultProps: {
                radius: "xl"
            },
        }),
    },
});

export default theme;
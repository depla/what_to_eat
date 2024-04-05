import { Chip, rem } from '@mantine/core';
import { IconBookmark } from '@tabler/icons-react';

export default function SaveFoodButtonComponent() {
    return (
        <Chip
            icon={<IconBookmark style={{ width: rem(12), height: rem(12) }} />}
            color="green"
            variant="filled"
            size="xs"
        >
            Save
        </Chip>
    )
}
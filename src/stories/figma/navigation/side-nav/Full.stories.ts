import type { Meta, StoryObj } from "@storybook/svelte";

import { workspace } from "$lib/storybook";

import Full from "$lib/figma/navigation/side-nav/Full.svelte";

const meta: Meta<Full> = {
    component: Full,
    args: {
        workspace,
        workspaces: [workspace],
    },
};
export default meta;

type Story = StoryObj<Full>;

export const Default: Story = {};

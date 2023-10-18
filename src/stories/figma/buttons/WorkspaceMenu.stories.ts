import type { Meta, StoryObj } from "@storybook/svelte";

import { workspace, mobileParameters } from "$lib/storybook";

import WorkspaceMenu from "$lib/figma/buttons/WorkspaceMenu.svelte";

const meta: Meta<WorkspaceMenu> = {
    component: WorkspaceMenu,
    args: {
        workspace,
        workspaces: [workspace],
        open: true,
    },
    parameters: mobileParameters,
};
export default meta;

type Story = StoryObj<WorkspaceMenu>;

export const Open: Story = {};

export const Closed: Story = { args: { open: false } };

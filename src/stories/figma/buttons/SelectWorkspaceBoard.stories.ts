import type { Meta, StoryObj } from "@storybook/svelte";

import SelectWorkspaceBoard from "$lib/figma/buttons/SelectWorkspaceBoard.svelte";
import { workspaceBoard } from "$lib/storybook";

const meta: Meta<SelectWorkspaceBoard> = {
    component: SelectWorkspaceBoard,
    argTypes: {},
    args: {
        workspaceBoard,
    },
};
export default meta;

type Story = StoryObj<SelectWorkspaceBoard>;

export const Default: Story = {};

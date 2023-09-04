import { redirect } from "@sveltejs/kit";

import { getDashboardWorkspaceBoardUrl } from "$lib/urls";

import type { PageLoadEvent } from "./$types";

import { getNewWorkspaceBoardUrl } from "$lib/urls/onboarding";

export async function load({ parent }: PageLoadEvent): Promise<void> {
    const { workspace } = await parent();

    const { uuid, workspace_boards } = workspace;

    if (!workspace_boards) {
        throw new Error("Expected workspace_boards");
    }
    const first_workspace_board = workspace_boards.at(0);
    if (first_workspace_board) {
        const { uuid } = first_workspace_board;
        throw redirect(302, getDashboardWorkspaceBoardUrl(uuid));
    }
    // TODO maybe throw in a nice notification to the user here that we have
    // not found any workspace board for this workspace
    throw redirect(302, getNewWorkspaceBoardUrl(uuid));
}

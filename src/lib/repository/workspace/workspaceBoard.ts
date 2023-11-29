import { client } from "$lib/graphql/client";
import {
    Mutation_ArchiveWorkspaceBoard,
    Mutation_DeleteWorkspaceBoard,
    Mutation_UpdateWorkspaceBoard,
} from "$lib/graphql/operations";
import {
    getWithCredentialsJson,
    handle404,
    postWithCredentialsJson,
} from "$lib/repository/util";
import type { RepositoryContext } from "$lib/types/repository";
import type {
    ArchivedWorkspaceBoard,
    Workspace,
    WorkspaceBoard,
    WorkspaceBoardDetail,
} from "$lib/types/workspace";

// WorkspaceBoard CRUD
// Create
export async function createWorkspaceBoard(
    workspace: Workspace,
    workspaceBoard: { title: string; description: string; deadline?: string },
    repositoryContext: RepositoryContext
): Promise<WorkspaceBoard> {
    const { title, description, deadline } = workspaceBoard;
    const { uuid: workspace_uuid } = workspace;
    const response = await postWithCredentialsJson<Workspace>(
        `/workspace/workspace-board/`,
        { workspace_uuid, title, description, deadline },
        repositoryContext
    );
    if (response.kind !== "ok") {
        console.error("TODO handle", response);
        throw new Error("Error while creating workspace  board");
    }
    return response.data;
}

// Read
export async function getWorkspaceBoard(
    uuid: string,
    repositoryContext: RepositoryContext
): Promise<WorkspaceBoardDetail | undefined> {
    return handle404(
        await getWithCredentialsJson<WorkspaceBoardDetail>(
            `/workspace/workspace-board/${uuid}`,
            repositoryContext
        )
    );
}

export async function getArchivedWorkspaceBoards(
    workspace_uuid: string,
    repositoryContext: RepositoryContext
): Promise<undefined | ArchivedWorkspaceBoard[]> {
    return handle404(
        await getWithCredentialsJson<ArchivedWorkspaceBoard[]>(
            `/workspace/workspace/${workspace_uuid}/workspace-boards-archived/`,
            repositoryContext
        )
    );
}

// Update
export async function updateWorkspaceBoard(workspaceBoard: WorkspaceBoard) {
    await client.mutate({
        mutation: Mutation_UpdateWorkspaceBoard,
        variables: {
            input: {
                uuid: workspaceBoard.uuid,
                title: workspaceBoard.title,
                deadline: workspaceBoard.deadline,
                description: "",
            },
        },
    });
}
// Delete
export async function deleteWorkspaceBoard(workspaceBoard: WorkspaceBoard) {
    const { uuid } = workspaceBoard;
    await client.mutate({
        mutation: Mutation_DeleteWorkspaceBoard,
        variables: {
            input: {
                uuid,
            },
        },
    });
}

export async function archiveWorkspaceBoard(
    workspaceBoard: WorkspaceBoard,
    archived = true
) {
    const { uuid } = workspaceBoard;
    await client.mutate({
        mutation: Mutation_ArchiveWorkspaceBoard,
        variables: { input: { uuid, archived } },
    });
}

import { writable } from "svelte/store";
import type { Readable } from "svelte/store";

import { getWorkspace, getWorkspaces } from "$lib/repository/workspace";
import { createWsStore } from "$lib/stores/wsSubscription";
import type { RepositoryContext } from "$lib/types/repository";
import type { Workspace } from "$lib/types/workspace";

export const currentWorkspace = createWsStore<Workspace>(
    "workspace",
    getWorkspace
);

// TODO This could be RepoGetter, except that RepoGetter takes a uuid
type HttpStore<T> = Readable<T | undefined> & {
    load: (context: RepositoryContext) => Promise<T | undefined>;
};

function createHttpStore<T>(
    getter: (context: RepositoryContext) => Promise<T | undefined>
): HttpStore<T> {
    const { set, subscribe } = writable<T | undefined>(undefined);
    const load = async (
        context: RepositoryContext
    ): Promise<T | undefined> => {
        const result = await getter(context);
        set(result);
        return result;
    };
    return {
        subscribe,
        load,
    };
}

export const currentWorkspaces = createHttpStore<Workspace[]>(getWorkspaces);

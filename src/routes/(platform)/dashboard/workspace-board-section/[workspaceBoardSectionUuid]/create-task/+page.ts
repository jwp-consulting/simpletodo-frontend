import type { PageLoadEvent } from "./$types";

import { getWorkspaceBoardSection } from "$lib/repository/workspace";
import type { WorkspaceBoardSection } from "$lib/types/workspace";

interface Data {
    workspaceBoardSection: WorkspaceBoardSection;
}

export async function load({
    params: { workspaceBoardSectionUuid },
    fetch,
}: PageLoadEvent): Promise<Data> {
    // If thing is fetched, use the fetch argument above
    const workspaceBoardSection = await getWorkspaceBoardSection(
        workspaceBoardSectionUuid,
        { fetch }
    );
    return { workspaceBoardSection };
}

export const prerender = false;
export const ssr = false;

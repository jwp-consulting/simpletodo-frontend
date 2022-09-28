import type { User } from "$lib/types";
import { getWithCredentialsJson } from "$lib/repository/util";

export async function getUser(): Promise<User | null> {
    try {
        return await getWithCredentialsJson<User>(`/user/user`);
    } catch {
        return null;
    }
}

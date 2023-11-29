import vars from "$lib/env";
import {
    failOrOk,
    getWithCredentialsJson,
    postWithCredentialsJson,
    putWithCredentialsJson,
} from "$lib/repository/util";
import type { RepositoryContext } from "$lib/types/repository";
import type { User } from "$lib/types/user";
import { uploadImage } from "$lib/utils/file";

// Create
// Read
export async function getUser(
    repositoryContext: RepositoryContext
): Promise<User | undefined> {
    const response = await getWithCredentialsJson<User>(
        `/user/user/current-user`,
        repositoryContext
    );
    if (response.ok) {
        return response.data;
    } else if (response.kind === "forbidden") {
        return undefined;
    }
    console.error(response);
    throw new Error("There was a problem retrieving the user");
}
// Update
export async function updateUser(
    user: Pick<User, "full_name">,
    repositoryContext: RepositoryContext
): Promise<void> {
    const response = await putWithCredentialsJson<User>(
        `/user/user/current-user`,
        user,
        repositoryContext
    );
    if (!response.ok) {
        console.error("Response was", response);
        throw new Error("Could not update user");
    }
}
export async function updateProfilePicture(imageFile: File): Promise<void> {
    await uploadImage(
        imageFile,
        vars.API_ENDPOINT + "/user/user/profile-picture/upload"
    );
}

// Delete
// RPC
export async function signUp(
    email: string,
    password: string,
    repositoryContext: RepositoryContext
): Promise<void> {
    failOrOk(
        await postWithCredentialsJson(
            "/user/user/sign-up",
            { email, password },
            repositoryContext
        )
    );
}

export async function confirmEmail(
    email: string,
    token: string,
    repositoryContext: RepositoryContext
): Promise<void> {
    failOrOk(
        await postWithCredentialsJson(
            "/user/user/confirm-email",
            { email, token },
            repositoryContext
        )
    );
}

export async function logIn(
    email: string,
    password: string,
    repositoryContext: RepositoryContext
): Promise<User> {
    return failOrOk(
        await postWithCredentialsJson<User>(
            "/user/user/log-in",
            { email, password },
            repositoryContext
        )
    );
}

export async function logOut(
    repositoryContext: RepositoryContext
): Promise<void> {
    failOrOk(
        await postWithCredentialsJson(
            "/user/user/log-out",
            undefined,
            repositoryContext
        )
    );
}

export async function requestPasswordReset(
    email: string,
    repositoryContext: RepositoryContext
): Promise<void> {
    failOrOk(
        await postWithCredentialsJson(
            "/user/user/request-password-reset",
            { email },
            repositoryContext
        )
    );
}

export async function confirmPasswordReset(
    email: string,
    token: string,
    newPassword: string,
    repositoryContext: RepositoryContext
): Promise<void> {
    failOrOk(
        await postWithCredentialsJson(
            "/user/user/confirm-password-reset",
            { email, token, new_password: newPassword },
            repositoryContext
        )
    );
}

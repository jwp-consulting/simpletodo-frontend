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
    repositoryContext: RepositoryContext,
): Promise<User | undefined> {
    type CurrentUser = User | { unauthenticated: true };
    const user = failOrOk(
        await getWithCredentialsJson<CurrentUser>(
            `/user/user/current-user`,
            repositoryContext,
        ),
    );
    // Perhaps we could include "unauthenticated": false
    // for a logged in user as well
    if ("unauthenticated" in user) {
        return undefined;
    }
    return user;
}
// Update
export async function updateUser(
    user: Pick<User, "full_name">,
    repositoryContext: RepositoryContext,
): Promise<void> {
    const response = await putWithCredentialsJson<User>(
        `/user/user/current-user`,
        user,
        repositoryContext,
    );
    if (!response.ok) {
        console.error("Response was", response);
        throw new Error("Could not update user");
    }
}
export async function updateProfilePicture(imageFile: File): Promise<void> {
    await uploadImage(
        imageFile,
        vars.API_ENDPOINT + "/user/user/profile-picture/upload",
    );
}

// Delete
// RPC
export async function signUp(
    email: string,
    password: string,
    tosAgreed: boolean,
    privacyPolicyAgreed: boolean,
    repositoryContext: RepositoryContext,
): Promise<void> {
    failOrOk(
        await postWithCredentialsJson(
            "/user/user/sign-up",
            {
                email,
                password,
                tos_agreed: tosAgreed,
                privacy_policy_agreed: privacyPolicyAgreed,
            },
            repositoryContext,
        ),
    );
}

export async function confirmEmail(
    email: string,
    token: string,
    repositoryContext: RepositoryContext,
): Promise<void> {
    failOrOk(
        await postWithCredentialsJson(
            "/user/user/confirm-email",
            { email, token },
            repositoryContext,
        ),
    );
}

export async function logIn(
    email: string,
    password: string,
    repositoryContext: RepositoryContext,
): Promise<User> {
    return failOrOk(
        await postWithCredentialsJson<User>(
            "/user/user/log-in",
            { email, password },
            repositoryContext,
        ),
    );
}

export async function logOut(
    repositoryContext: RepositoryContext,
): Promise<void> {
    failOrOk(
        await postWithCredentialsJson(
            "/user/user/log-out",
            undefined,
            repositoryContext,
        ),
    );
}

export async function requestPasswordReset(
    email: string,
    repositoryContext: RepositoryContext,
): Promise<void> {
    failOrOk(
        await postWithCredentialsJson(
            "/user/user/request-password-reset",
            { email },
            repositoryContext,
        ),
    );
}

export async function confirmPasswordReset(
    email: string,
    token: string,
    newPassword: string,
    repositoryContext: RepositoryContext,
): Promise<void> {
    failOrOk(
        await postWithCredentialsJson(
            "/user/user/confirm-password-reset",
            { email, token, new_password: newPassword },
            repositoryContext,
        ),
    );
}

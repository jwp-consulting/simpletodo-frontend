import { writable } from "svelte/store";
import { client } from "$lib/graphql/client";
import type { RepositoryContext } from "$lib/types/repository";

import {
    Mutation_ConfirmPasswordReset,
    Mutation_EmailConfirmation,
    Mutation_Login,
    Mutation_Logout,
    Mutation_RequesetPasswordReset,
    Mutation_Signup,
} from "$lib/graphql/operations";
import { getUser } from "$lib/repository/user";
import { goto } from "$lib/navigation";
import type { User } from "$lib/types/user";

export const user = writable<User | null>(null);
export const userIsLoading = writable(true);

export const signUp = async (
    email: string,
    password: string
): Promise<void> => {
    const res = await client.mutate({
        mutation: Mutation_Signup,
        variables: { input: { email, password } },
    });
    const { signup: userData } = res.data as { signup: User | null };
    if (userData === null) {
        throw new Error("Did not receive userData");
    }
};

export const emailConfirmation = async (email: string, token: string) => {
    try {
        const res = await client.mutate({
            mutation: Mutation_EmailConfirmation,
            variables: { input: { email, token } },
        });
        const { emailConfirmation: userData } = res.data as {
            emailConfirmation: User | null;
        };
        if (userData !== null) {
            return userData;
        }
    } catch (error) {
        console.error(error);
    }
    return null;
};

export const login = async (
    email: string,
    password: string,
    redirectTo?: string
): Promise<void> => {
    const res = await client.mutate({
        mutation: Mutation_Login,
        variables: { input: { email, password } },
    });

    const { login: userData } = res.data as { login: User | null };
    if (userData === null) {
        throw new Error("No userData");
    }

    user.set(userData);

    if (redirectTo) {
        await goto(redirectTo);
    }
};

export const logout = async () => {
    await client.mutate({
        mutation: Mutation_Logout,
    });
    await client.resetStore();
    user.set(null);
    userIsLoading.set(false);
};

export const fetchUser = async (repositoryContext?: RepositoryContext) => {
    userIsLoading.set(true);
    const userData = await getUser(repositoryContext);
    if (!userData) {
        userIsLoading.set(false);
        return null;
    }
    user.set(userData);
    return userData;
};

export const requestPasswordReset = async (email: string): Promise<void> => {
    await client.mutate({
        mutation: Mutation_RequesetPasswordReset,
        variables: { input: { email } },
    });
};

export const confirmPasswordReset = async (
    email: string,
    token: string,
    newPassword: string
): Promise<void> => {
    await client.mutate({
        mutation: Mutation_ConfirmPasswordReset,
        variables: { input: { email, token, newPassword } },
    });
};

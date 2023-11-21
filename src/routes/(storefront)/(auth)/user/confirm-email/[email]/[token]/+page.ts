import { redirect } from "@sveltejs/kit";

import { emailConfirmation } from "$lib/stores/user";
import { logInUrl } from "$lib/urls/user";

import type { PageLoadEvent } from "./$types";

export async function load({ params: { email, token } }: PageLoadEvent) {
    await emailConfirmation(email, token);

    throw redirect(302, logInUrl);
}

type routeItem = {
    label: string;
    to?: string;
    authRequired?: boolean;
    forceNavigation?: boolean;
    fetchUser?: boolean;
    action?: (any) => void;
};

export default [
    { label: "Home", to: "/" },
    { label: "Signup", to: "/signup", authRequired: false },
    { label: "Signin", to: "/signin", authRequired: false },
    {
        label: "Dashboard",
        to: "/dashboard",
        authRequired: true, // When is true user is fetched
        forceNavigation: true, // Force visibility in the nav bar even if auth is required
    },
] as routeItem[];

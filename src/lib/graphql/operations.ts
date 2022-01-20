import { gql } from "@apollo/client/core";

export const Query_User = gql`
    query User {
        user {
            email
        }
    }
`;

export const Mutation_Singup = gql`
    mutation Signup($email: String!, $password: String!) {
        signup(email: $email, password: $password) {
            user {
                email
            }
        }
    }
`;

export const Mutation_EmailConfirmation = gql`
    mutation EmailConfirmation($email: String!, $token: String!) {
        emailConfirmation(email: $email, token: $token) {
            user {
                email
            }
        }
    }
`;

export const Mutation_Login = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            user {
                email
            }
        }
    }
`;

export const Mutation_Logout = gql`
    mutation Logout {
        logout {
            user {
                email
            }
        }
    }
`;

export const Query_Dashboard = gql`
    query Query_Dashboard {
        workspaces {
            uuid
            title
            boards {
                uuid
                title
                sections {
                    uuid
                    title
                    tasks {
                        uuid
                        title
                        description
                        subTasks {
                            title
                            description
                        }
                    }
                }
            }
        }
    }
`;

export const Query_DashboardWorkspacesSideNav = gql`
    query DashboardWorkspacesSideNav {
        workspaces {
            uuid
            title
            description
        }
    }
`;

export const Query_DashboardBoardsSideNav = gql`
    query DashboardBoardsSideNav($uuid: ID!) {
        workspace(uuid: $uuid) {
            uuid
            boards {
                uuid
                title
            }
        }
    }
`;

export const Query_DashboardBoard = gql`
    query DashboardBoard($uuid: ID!) {
        workspaceBoard(uuid: $uuid) {
            uuid
            title
            description
            sections {
                uuid
                title
                description
                tasks {
                    uuid
                    title
                    description
                }
            }
        }
    }
`;

export const Query_DashboardTaskDetais = gql`
    query DashboardTaskDetais($uuid: ID!) {
        task(uuid: $uuid) {
            uuid
            title
            description
            subTasks {
                uuid
                title
                description
            }
        }
    }
`;

export const Mutation_AddTask = gql`
    mutation AddTask($input: AddTaskMutationInput!) {
        addTask(input: $input) {
            task {
                created
            }
        }
    }
`;

export const Mutation_AddWorkspaceBoardSection = gql`
    mutation AddWorkspaceBoardSection($input: AddWorkspaceBoardSectionInput!) {
        addWorkspaceBoardSection(input: $input) {
            workspaceBoardSection {
                created
            }
        }
    }
`;

export const Mutation_AddWorkspaceBoard = gql`
    mutation AddWorkspaceBoard($input: AddWorkspaceBoardInput!) {
        addWorkspaceBoard(input: $input) {
            workspaceBoard {
                created
            }
        }
    }
`;

/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */
export interface Locals {
    userid: string;
}

export type Input = {
    name?: string;
    label?: string;
    type?: string;
    value?: any;
    error?: string;
    placeholder?: string;
    readonly?: boolean;
    selectOptions?: { label: string; value: any }[];
    validation?: {
        required?: boolean;
        validator?: (
            value: any,
            data: any
        ) => {
            error?: boolean;
            message?: string;
        };
        // Todo:
        // min?: number;
        // max?: number;
        // minLength?: number;
        // maxLength?: number;
        // pattern?: string;
    };
};

export type TimestampedType = {
    created: string;
    modified: string;
};

export type TitleDescriptionType = {
    title: string;
    description?: string;
};

export type User = {
    email: string;
    profile_picture?: string;
    full_name?: string;
};

export type WorkspaceUser = {
    user: User;
    uuid: string;
    job_title?: string;
    role: string;
} & TimestampedType;

export type Label = {
    name: string;
    color: number;
    uuid: string;
};

export type SubTask = {
    uuid: string;
    done: boolean;
    order: number;
} & TimestampedType &
    TitleDescriptionType;

export type ChatMessage = {
    author: WorkspaceUser;
    uuid: string;
    text: string;
} & TimestampedType;

export type Task = {
    _order: number;
    uuid: string;
    deadline?: string;
    number: number;
    labels: Label[];
    assignee?: WorkspaceUser;
    workspace_board_section?: WorkspaceBoardSection;
    sub_tasks?: SubTask[];
    chat_messages?: ChatMessage[];
} & TimestampedType &
    TitleDescriptionType;

export type WorkspaceBoardSection = {
    _order: number;
    uuid: string;
    tasks?: Task[];
    workspace_board?: WorkspaceBoard;
} & TimestampedType &
    TitleDescriptionType;

export type WorkspaceBoard = {
    deadline?: string;
    uuid: string;
    workspace_board_sections?: WorkspaceBoardSection[];
    archived?: string;
    workspace?: Workspace;
} & TimestampedType &
    TitleDescriptionType;

export type Workspace = {
    picture?: string;
    workspace_users?: WorkspaceUser[];
    workspace_boards?: WorkspaceBoard[];
    labels?: Label[];
    uuid: string;
} & TimestampedType &
    TitleDescriptionType;

export type Customer = {
    seats_remaining: number;
    seats: number;
    uuid: string;
    subscription_status: string;
};

export type ThemeColors = {
    "primary": string;
    "primary-focus": string;
    "primary-content": string;
    "secondary": string;
    "secondary-focus": string;
    "secondary-content": string;
    "accent": string;
    "accent-focus": string;
    "accent-content": string;
    "neutral": string;
    "neutral-focus": string;
    "neutral-content": string;
    "base-100": string;
    "base-200": string;
    "base-300": string;
    "base-content": string;
    "info": string;
    "success": string;
    "warning": string;
    "error": string;
};

export type Color = {
    h: number;
    s: number;
    l: number;
    br: boolean;
    style: string;
};

export type LabelSelectionInput =
    | { kind: "noLabel" }
    | { kind: "allLabels" }
    | { kind: "label"; labelUuid: string };

export type LabelSelection =
    | { kind: "noLabel" }
    | { kind: "allLabels" }
    | { kind: "labels"; labelUuids: Set<string> };

export type WorkspaceUserSelectionInput =
    | { kind: "workspaceUser"; workspaceUser: WorkspaceUser }
    | { kind: "allWorkspaceUsers" }
    | { kind: "unassigned" };
export type WorkspaceUserSelection =
    | { kind: "workspaceUser"; workspaceUserUuid: string }
    | { kind: "allWorkspaceUsers" }
    | { kind: "unassigned" };

import type { BaseAnnotations } from "@storybook/addons";
import type { SvelteComponent } from "svelte";

type DecoratorReturnType =
    | SvelteComponent
    | {
          Component: unknown;
          props?: unknown;
      };

declare module "@storybook/addon-svelte-csf" {
    interface StoryProps
        extends BaseAnnotations<unknown, DecoratorReturnType> {
        id?: string;
        name: string;
        template?: string;
        source?: boolean | string;

        args?: unknown;
    }
}

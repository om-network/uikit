import * as React from "react";
interface ToolbarButtonProps {
    index?: number;
    first?: boolean;
    last?: boolean;
    active?: boolean;
    label: string;
    title?: string;
    icon: (props: React.ComponentProps<"svg">) => JSX.Element;
}
interface ToolbarButtonDispatch {
    onTabClick?: (item: number) => void;
}
interface ToolbarDividerProps {
    menu: Array<ToolbarButtonProps>;
    defaultTab?: number;
    toolBarClasses?: string;
    children: React.ReactNode;
}
export declare const ToolbarButton: React.FunctionComponent<ToolbarButtonProps & ToolbarButtonDispatch>;
export declare const ToolbarDivider: React.FunctionComponent<ToolbarDividerProps>;
export {};

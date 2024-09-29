import { ReactNode } from "react";

export type QuickAccessLinkProps = {
    key: string;
    label: string
    route: string
    icon: ReactNode
}

export type HeaderProps = {
    showNav?: boolean;
};
  
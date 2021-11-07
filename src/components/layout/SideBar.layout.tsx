import * as React from "react";

export interface SideBarLayoutProps {
    title: string;
    subtitle?: string;
    top?: React.ReactNode;
    left?: React.ReactNode;
    footer?: React.ReactNode;
    children?: React.ReactNode;
}

export const SideBarLayout: React.FunctionComponent<SideBarLayoutProps> = ({ title, subtitle, top, left, footer, children }) => {
    return (
        <div>
            <div className="fixed top-0 left-0 w-1/2 h-full bg-white" />
            <div className="fixed top-0 right-0 w-1/2 h-full bg-gray-50" />
            <div className="relative min-h-screen flex flex-col">
                {top}
                <div className="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex">
                    <div className="flex-1 min-w-0 bg-white xl:flex">
                        {left}
                        <div className="bg-gray-50 lg:min-w-0 lg:flex lg:flex-grow lg:flex-col lg:justify-start">
                            <div>
                                <div className="pl-4 pr-6 pt-4 pb-4 bg-white border-b border-t border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-6 xl:border-t-0">
                                    <div className="flex items-center">
                                        <h1 className="flex-1 text-lg leading-7 font-medium">{title}</h1>
                                        {subtitle && <p className="mt-2 text-sm text-gray-500">{subtitle}</p>}
                                    </div>
                                </div>
                                {children}
                            </div>
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBarLayout;

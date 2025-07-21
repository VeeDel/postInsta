"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Toaster, resolveValue } from "react-hot-toast";
import { useMediaQuery } from "usehooks-ts";
import useEventsStore from "@/store/useEventsStore";

export function Providers({ children }: { children: React.ReactNode }) {
    const { resetSidebar, resetMobileNavigation } = useEventsStore();
    const pathname = usePathname();
    const desktop = useMediaQuery("(min-width: 1260px)");

    useEffect(() => {
        resetSidebar();
    }, [pathname, resetSidebar, desktop]);

    useEffect(() => {
        resetMobileNavigation();
    }, [pathname, resetMobileNavigation]);

    return (
        <>
            {children}
            <Toaster
                containerStyle={{
                    bottom: 12,
                    left: 12,
                    right: 12,
                }}
                position="bottom-center"
                gutter={10}
                toastOptions={{
                    duration: 3000,
                }}
            >
                {(t) => (
                    <div
                        style={{
                            opacity: t.visible ? 1 : 0,
                            transform: t.visible
                                ? "translateY(0px)"
                                : "translateY(12px)",
                            transition: "all .2s",
                        }}
                    >
                        {resolveValue(t.message, t)}
                    </div>
                )}
            </Toaster>
        </>
    );
}

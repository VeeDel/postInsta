import { Suspense } from "react";
import type { NextPage } from "next";
import SettingsScreen from "@/screens/SettingsScreen";

const Settings: NextPage = () => {
    return (
        <Suspense>
            <SettingsScreen />
        </Suspense>
    );
};

export default Settings;

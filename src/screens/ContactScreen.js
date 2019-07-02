import React from "react";
import AppLayout from "../components/layouts/AppLayout";

const ContactScreen = () => (
    <AppLayout
        defaultOpenKeys={['about']}
        defaultSelectedKeys={['contact']}
    >
        <p>Vous pouvez me contacter sur ce Repository GitHub : <a href="https://github.com/kevinhuang78/ratp-api-interface" rel="noreferrer noopener" target="_blank">Le Repository GitHub</a></p>
    </AppLayout>
);

export default ContactScreen;
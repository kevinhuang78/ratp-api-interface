import React from "react";
import AppLayout from "../components/layouts/AppLayout";

const ContactScreen = () => (
    <AppLayout
        defaultSelectedKeys={['about', 'contact']}
    >
        <p>You can send me a Pull Request in this Github Repository : <a href="https://github.com/kevinhuang78/ratp-api-interface" rel="noreferrer noopener" target="_blank">here</a></p>
    </AppLayout>
);

export default ContactScreen;
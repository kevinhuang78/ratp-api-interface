import React, { Component } from "react";
import AppLayout from "../components/layouts/AppLayout";

class HomeScreen extends Component {
    constructor(props) {
        super(props);

        document.title = "RATP API Interface - Page d'accueil";
    }

    render() {
        return (
            <AppLayout
                defaultSelectedKeys={['home']}
            >
                <h1>This is the home page</h1>
            </AppLayout>
        );
    }
}
export default HomeScreen;
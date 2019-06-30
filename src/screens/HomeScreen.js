import React, { Component } from "react";
import AppLayout from "../components/layouts/AppLayout";
import Divider from "antd/lib/divider";

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
                <Divider>Qu'est-ce que ce site web ?</Divider>
                <p>Il s'agit d'une web app développé dans le cadre d'un cours à l'Institut de l'Internet et du Multimédia</p>
                <Divider>Est-ce que ce sont les données de la RATP ?</Divider>
                <p>J'utilise <a href="https://github.com/pgrimaud/ratp-api-rest" rel="noreferrer noopener" target="_blank">cette API</a>, je n'en détiens pas les droits.</p>
            </AppLayout>
        );
    }
}
export default HomeScreen;
import React, { Component } from "react";
import AppLayout from "../components/layouts/AppLayout";
import Divider from "antd/lib/divider";
import Map from "../static/img/metro-map.png";


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
                <h1 className="title title--1">RATP API Interface</h1>
                <div className="home__map-container">
                    <img className="home__map" src={Map} />
                </div>
                <Divider>Qu'est-ce que ce site web ?</Divider>
                <p>Il s'agit d'une web app développé dans le cadre d'un cours à l'Institut de l'Internet et du Multimédia</p>
                <Divider>D'où viennent les données ?</Divider>
                <p>J'utilise <a href="https://github.com/pgrimaud/ratp-api-rest" rel="noreferrer noopener" target="_blank">cette API</a>, je n'en détiens pas les droits.</p>
            </AppLayout>
        );
    }
}
export default HomeScreen;

import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { getTraffic } from "../actions/traffics";
import AppLayout from "../components/layouts/AppLayout";

class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };

        document.title = "RATP API Interface - Page d'accueil";
    }

    componentDidMount() {
        this.props.getTraffic()
            .then(() => this.setState({
                loading: false
            }));
    }

    render() {
        return (
            <AppLayout
                defaultSelectedKeys={['home']}
            >
                {
                    this.state.loading
                        ? <p>Loading screen....</p>
                        : <div>
                            <div>
                                <h2>Métros</h2>
                                {
                                    this.props.traffics.traffic.metros.map(metro =>
                                        <div key={"metro-" + metro.line}>
                                            <h3>{metro.line}</h3>
                                            <p>{metro.title}</p>
                                            <p>{metro.message}</p>
                                        </div>
                                    )
                                }
                            </div>
                            <div>
                                <h2>RERs</h2>
                                {
                                    this.props.traffics.traffic.rers.map(rer =>
                                        <div key={"rer-" + rer.line}>
                                            <h3>{rer.line}</h3>
                                            <p>{rer.title}</p>
                                            <p>{rer.message}</p>
                                        </div>
                                    )
                                }
                            </div>
                            <div>
                                <h2>Tramways</h2>
                                {
                                    this.props.traffics.traffic.tramways.map(tramway =>
                                        <div key={"tramway-" + tramway.line}>
                                            <h3>{tramway.line}</h3>
                                            <p>{tramway.title}</p>
                                            <p>{tramway.message}</p>
                                        </div>
                                    )
                                }
                            </div>
                          </div>
                }
            </AppLayout>
        );
    }
}

const mapStateToProps = (state) => ({
    traffics: state.traffics
});

const mapDispatchToProps = {
    getTraffic
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeScreen));
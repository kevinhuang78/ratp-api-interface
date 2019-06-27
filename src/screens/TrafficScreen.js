import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { getTraffic } from "../actions/traffics";
import AppLayout from "../components/layouts/AppLayout";
import LoadingScreen from "../components/LoadingScreen";
import Tabs from "antd/lib/tabs";
import Icon from "antd/lib/icon";
import TrafficTab from "../components/traffic/TrafficTab";

class TrafficScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };

        document.title = "RATP API Interface - Trafic";

        this.loadTraffic = this.loadTraffic.bind(this);
    }

    componentDidMount() {
        this.loadTraffic();
    }

    loadTraffic() {
        this.props.getTraffic()
            .then(() => this.setState({loading: false}));
    }

    render() {
        return (
            <AppLayout
                defaultSelectedKeys={['traffic']}
            >
                {
                    this.state.loading
                        ? <LoadingScreen />
                        : <div>
                            <Tabs
                                defaultActiveKey="metros"
                                tabBarExtraContent={
                                    <Icon
                                        type="reload"
                                        onClick={() => {
                                            this.setState({loading: true});
                                            this.loadTraffic();
                                        }}
                                    />
                                }
                            >
                                <Tabs.TabPane tab="Métros" key="metros">
                                    <TrafficTab
                                        traffic={this.props.traffics.traffic.metros}
                                        type="Métro"
                                    />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="RERs" key="rers">
                                    <TrafficTab
                                        traffic={this.props.traffics.traffic.rers}
                                        type="RER"
                                    />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Tramways" key="tramways">
                                    <TrafficTab
                                        traffic={this.props.traffics.traffic.tramways}
                                        type="Tramway"
                                    />
                                </Tabs.TabPane>
                            </Tabs>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrafficScreen));
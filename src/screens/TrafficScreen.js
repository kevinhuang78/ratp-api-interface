import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { getTraffic } from "../actions/traffics";
import AppLayout from "../components/layouts/AppLayout";
import LoadingScreen from "../components/LoadingScreen";
import Tabs from "antd/lib/tabs";
import Icon from "antd/lib/icon";
import TrafficTab from "../components/traffic/TrafficTab";
import notification from "antd/lib/notification";

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
            .then(() => this.setState({loading: false}))
            .catch(() => notification.error({
                message: this.props.traffics.trafficError.code,
                description: this.props.traffics.trafficError.message,
                icon: <Icon type="frown" />,
                duration: 10
            }));
    }

    render() {
        const trafficList = this.props.traffics.trafficList;

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
                                        traffic={trafficList.metros}
                                        type="Métro"
                                    />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="RERs" key="rers">
                                    <TrafficTab
                                        traffic={trafficList.rers}
                                        type="RER"
                                    />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Tramways" key="tramways">
                                    <TrafficTab
                                        traffic={trafficList.tramways}
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
import React, { Component } from "react";
import { connect } from 'react-redux';
import { getTraffic } from "../actions/traffics";
import AppLayout from "../components/layouts/AppLayout";
import LoadingScreen from "../components/LoadingScreen";
import Tabs from "antd/lib/tabs";
import Icon from "antd/lib/icon";
import TrafficTab from "../components/traffic/TrafficTab";
import { notificationError } from "../utils/helper";

class TrafficScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: Object.keys(this.props.traffics.trafficList).length === 0
        };

        document.title = "RATP API Interface - Trafic";

        this.loadTraffic = this.loadTraffic.bind(this);
    }

    componentDidMount() {
        Object.keys(this.props.traffics.trafficList).length === 0 && this.loadTraffic();
    }

    loadTraffic() {
        this.props.getTraffic()
            .then(() => this.setState({loading: false}))
            .catch(() => notificationError(this.props.traffics.trafficError.code, this.props.traffics.trafficError.message));
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

export default connect(mapStateToProps, mapDispatchToProps)(TrafficScreen);

import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { getTraffic } from "../actions/traffics";
import AppLayout from "../components/layouts/AppLayout";
import LoadingScreen from "../components/LoadingScreen";
import Tabs from "antd/lib/tabs";
import Select from "antd/lib/select";
import Icon from "antd/lib/icon";
import TrafficCard from "../components/TrafficCard";

class TrafficScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            metros: [],
            rers: [],
            tramways: []
        };

        document.title = "RATP API Interface - Trafic";

        this.loadTraffic = this.loadTraffic.bind(this);
        this.handleSearchMetro = this.handleSearchMetro.bind(this);
        this.handleSearchRer = this.handleSearchRer.bind(this);
        this.handleSearchTramway = this.handleSearchTramway.bind(this);
    }

    componentDidMount() {
        this.loadTraffic();
    }

    loadTraffic() {
        this.props.getTraffic()
            .then(() => this.setState({
                loading: false,
                metros: this.props.traffics.traffic.metros,
                rers: this.props.traffics.traffic.rers,
                tramways: this.props.traffics.traffic.tramways
            }));
    }

    handleSearchMetro(value) {
        this.setState({
            metros: value.length > 0
                ? [...this.props.traffics.traffic.metros].filter(m => value.some(v => m.line === v))
                : this.props.traffics.traffic.metros
        });
    }

    handleSearchRer(value) {
        this.setState({
            rers: value.length > 0
                ? [...this.props.traffics.traffic.rers].filter(r => value.some(v => r.line === v))
                : this.props.traffics.traffic.rers
        });
    }

    handleSearchTramway(value) {
        this.setState({
            tramways: value.length > 0
                ? [...this.props.traffics.traffic.tramways].filter(t => value.some(v => t.line === v))
                : this.props.traffics.traffic.tramways
        });
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
                                    <Select
                                        mode="multiple"
                                        showSearch
                                        allowClear
                                        placeholder="Sélectionnez une ligne de métro"
                                        onChange={value => this.handleSearchMetro(value)}
                                    >
                                        {
                                            this.props.traffics.traffic.metros.map(m =>
                                                <Select.Option key={m.line} value={m.line}>Métro {m.line}</Select.Option>
                                            )
                                        }
                                    </Select>
                                    {
                                        this.state.metros.map(metro =>
                                            <TrafficCard
                                                key={"metro-" + metro.line}
                                                type="metro"
                                                trafficItem={metro}
                                            />
                                        )
                                    }
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="RERs" key="rers">
                                    <Select
                                        mode="multiple"
                                        showSearch
                                        allowClear
                                        placeholder="Sélectionnez une ligne de RER"
                                        onChange={value => this.handleSearchRer(value)}
                                    >
                                        {
                                            this.props.traffics.traffic.rers.map(r =>
                                                <Select.Option key={r.line} value={r.line}>RER {r.line}</Select.Option>
                                            )
                                        }
                                    </Select>
                                    {
                                        this.state.rers.map(rer =>
                                            <TrafficCard
                                                key={"rer-" + rer.line}
                                                type="rer"
                                                trafficItem={rer}
                                            />
                                        )
                                    }
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Tramways" key="tramways">
                                    <Select
                                        mode="multiple"
                                        showSearch
                                        allowClear
                                        placeholder="Sélectionnez une ligne de tramway"
                                        onChange={value => this.handleSearchTramway(value)}
                                    >
                                        {
                                            this.props.traffics.traffic.tramways.map(t =>
                                                <Select.Option key={t.line} value={t.line}>Tramway {t.line}</Select.Option>
                                            )
                                        }
                                    </Select>
                                    {
                                        this.state.tramways.map(tramway =>
                                            <TrafficCard
                                                key={"tramway-" + tramway.line}
                                                type="tramway"
                                                trafficItem={tramway}
                                            />
                                        )
                                    }
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
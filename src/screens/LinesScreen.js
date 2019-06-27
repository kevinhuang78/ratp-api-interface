import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { getLines } from "../actions/lines";
import AppLayout from "../components/layouts/AppLayout";
import LoadingScreen from "../components/LoadingScreen";
import Tabs from "antd/lib/tabs";
import Icon from "antd/lib/icon";
import LineTab from "../components/line/LineTab";

class LinesScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };

        document.title = "RATP API Interface - Lignes de transports";

        this.loadLines = this.loadLines.bind(this);
    }

    componentDidMount() {
        this.loadLines();
    }

    loadLines() {
        this.props.getLines()
            .then(() => this.setState({loading: false}));
    }

    render() {
        return (
            <AppLayout
                defaultSelectedKeys={['line']}
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
                                            this.loadLines();
                                        }}
                                    />
                                }
                            >
                                <Tabs.TabPane tab="Métros" key="metros">
                                    <LineTab
                                        line={this.props.lines.line.metros}
                                        type="Métro"
                                    />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="RERs" key="rers">
                                    <LineTab
                                        line={this.props.lines.line.rers}
                                        type="RER"
                                    />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Tramways" key="tramways">
                                    <LineTab
                                        line={this.props.lines.line.tramways}
                                        type="Tramway"
                                    />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Bus" key="buses">
                                    <LineTab
                                        line={this.props.lines.line.buses}
                                        type="Bus"
                                    />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Noctiliens" key="noctiliens">
                                    <LineTab
                                        line={this.props.lines.line.noctiliens}
                                        type="Noctilien"
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
    lines: state.lines
});

const mapDispatchToProps = {
    getLines
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LinesScreen));
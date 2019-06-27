import React, { Component, Fragment } from "react";
import Select from "antd/lib/select";
import TrafficCard from "./TrafficCard";

class TrafficTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            traffic: this.props.traffic
        };

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(value) {
        this.setState({
            traffic: value.length > 0
                ? [...this.props.traffic].filter(t => value.some(v => t.line === v))
                : this.props.traffic
        });
    }

    render() {
        return (
            <Fragment>
                <Select
                    mode="multiple"
                    showSearch
                    allowClear
                    placeholder={"Sélectionnez une ou plusieurs ligne(s) de " + this.props.type + "(s)"}
                    onChange={value => this.handleSearch(value)}
                >
                    {
                        this.props.traffic.map(t =>
                            <Select.Option key={t.line} value={t.line}>{this.props.type} {t.line}</Select.Option>
                        )
                    }
                </Select>
                {
                    this.state.traffic.map(t =>
                        <TrafficCard
                            key={this.props.type + "-" + t.line}
                            type={this.props.type}
                            trafficItem={t}
                        />
                    )
                }
            </Fragment>
        );
    }
}

export default TrafficTab;
import React, { Component, Fragment } from "react";
import Select from "antd/lib/select";
import TrafficCard from "./TrafficCard";
import PropTypes from "prop-types";
import Pagination from "antd/lib/pagination";

class TrafficTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            traffic: this.props.traffic,
            page: 1
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
                    this.state.traffic
                        .slice((this.state.page - 1) * 10, this.state.page * 10)
                        .map(t =>
                            <TrafficCard
                                key={this.props.type + "-" + t.line}
                                type={this.props.type}
                                trafficItem={t}
                            />
                        )
                }
                {
                    this.state.traffic.length > 10 &&
                        <Pagination onChange={page => this.setState({page})} total={this.state.traffic.length} />
                }
            </Fragment>
        );
    }
}

TrafficTab.propTypes = {
    /** The array of traffics */
    traffic: PropTypes.array.isRequired,
    /** The type of traffic */
    type: PropTypes.oneOf(['Métro', 'Tramway', 'RER']).isRequired
};

export default TrafficTab;
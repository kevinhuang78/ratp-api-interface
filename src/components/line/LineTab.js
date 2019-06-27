import React, { Component, Fragment } from "react";
import Select from "antd/lib/select";
import PropTypes from "prop-types";
import Pagination from "antd/lib/pagination";
import LineCard from "./LineCard";

class LineTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            line: this.props.line,
            page: 1
        };

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(value) {
        this.setState({
            line: value.length > 0
                ? [...this.props.line].filter(l => value.some(v => l.name.includes(v)))
                : this.props.line
        });
    }

    // Return Options with distinct code
    renderOptions(data) {
        let result = [];
        const map = new Map();
        for (const item of [...data]) {
            if (!map.has(item.code)) {
                map.set(item.code, true);    // set any value to Map
                result.push(item);
            }
        }

        return result;
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
                        this.renderOptions(this.props.line)
                            .map(l =>
                                <Select.Option key={l.id} value={l.name}>{l.name}</Select.Option>
                            )
                    }
                </Select>
                {
                    this.state.line
                        .slice((this.state.page - 1) * 10, this.state.page * 10)
                        .map(l =>
                            <LineCard
                                key={this.props.type + "-" + l.id}
                                type={this.props.type}
                                lineItem={l}
                            />
                        )
                }
                {
                    this.state.line.length > 10 &&
                        <Pagination simple onChange={page => this.setState({page})} total={this.state.line.length} />
                }
            </Fragment>
        );
    }
}

LineTab.propTypes = {
    /** The array of lines */
    line: PropTypes.array.isRequired,
    /** The type of line */
    type: PropTypes.oneOf(['Métro', 'Tramway', 'RER', 'Noctilien', 'Bus']).isRequired
};

export default LineTab;
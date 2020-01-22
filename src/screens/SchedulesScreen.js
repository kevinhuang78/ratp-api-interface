import React, { Component } from "react";
import { getLines } from "../actions/lines";
import connect from "react-redux/es/connect/connect";
import AppLayout from "../components/layouts/AppLayout";
import LoadingScreen from "../components/LoadingScreen";
import { notificationError, removeDuplicates } from "../utils/helper";
import Cascader from "antd/lib/cascader";
import { getSchedules, getDestinations, getStations } from "../actions/schedules";
import Select from "antd/lib/select";
import Spin from "antd/lib/spin";
import Timeline from "antd/lib/timeline/Timeline";

class SchedulesScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            stationsLoading: false,
            destinationsLoading: false,
            schedulesLoading: false,
            stations: [],
            destinations: [],
            schedules: [],
            request: {
                type: "",
                code: "",
                station: "",
                way: ""
            },
            values: {
                typeCode: null,
                station: null,
                way: null
            }
        };

        document.title = "RATP API Interface - Horaires";

        this.loadStations = this.loadStations.bind(this);
        this.loadDestinations = this.loadDestinations.bind(this);
        this.loadSchedules = this.loadSchedules.bind(this);
    }

    componentDidMount() {
        this.props.getLines()
            .then(() => this.setState({loading: false}))
            .catch(() => notificationError(this.props.lines.linesError.code, this.props.lines.linesError.message));
    }

    renderOptionsSchedules(lines) {
        const copyObject = {...lines};
        const metros = removeDuplicates(copyObject.metros, 'code');
        const rers = removeDuplicates(copyObject.rers, 'code');
        const tramways = removeDuplicates(copyObject.tramways, 'code');
        const buses = removeDuplicates(copyObject.buses, 'code');
        const noctiliens = removeDuplicates(copyObject.noctiliens, 'code');
        return [
            {
                value: 'metros',
                label: 'Métros',
                children: metros.map(m => ({
                    value: m.code,
                    label: m.name
                })),
            },
            {
                value: 'rers',
                label: 'RERs',
                children: rers.map(r => ({
                    value: r.code,
                    label: r.name
                })),
            },
            {
                value: 'tramways',
                label: 'Tramways',
                children: tramways.map(t => ({
                    value: t.code,
                    label: t.name
                })),
            },
            {
                value: 'buses',
                label: 'Bus',
                children: buses.map(b => ({
                    value: b.code,
                    label: b.name
                })),
            },
            {
                value: 'noctiliens',
                label: 'Noctiliens',
                children: noctiliens.map(n => ({
                    value: n.code,
                    label: n.name
                })),
            }
        ];
    }

    loadStations(value) {
        const type = value.length === 2 ? value[0] : "";
        const code = value.length === 2 ? value[1] : "";
        this.setState({
            stationsLoading: true,
            request: {
                type,
                code
            },
            values: {
                typeCode: value
            },
            stations: [],
            destinations: [],
            schedules: []
        });
        value.length === 2
            ? this.props.getStations(type, code)
                .then(() => this.setState({
                    stationsLoading: false,
                    stations: this.props.schedules.stationsList
                }))
                .catch(() => notificationError(this.props.schedules.stationsError.code, this.props.schedules.stationsError.message))
            : this.setState({stationsLoading: false})
    }

    loadDestinations(station) {
        this.setState({
            destinationsLoading: true,
            request: {
                ...this.state.request,
                station,
                way: ""
            },
            values: {
                ...this.state.values,
                station,
                way: null
            },
            destinations: [],
            schedules: []
        });
        this.props.getDestinations(this.state.request.type, this.state.request.code)
            .then(() => this.setState({
                destinationsLoading: false,
                destinations: this.props.schedules.destinationsList
            }))
            .catch(() => notificationError(this.props.schedules.destinationsError.code, this.props.schedules.destinationsError.message));
    }

    loadSchedules(way) {
        this.setState({
            request: {
                ...this.state.request,
                way
            },
            values: {
                ...this.state.values,
                way
            },
            schedules: []
        }, () => {
            if (way) {
                this.setState({schedulesLoading: true});
                this.props.getSchedules(this.state.request.type, this.state.request.code, this.state.request.station, this.state.request.way)
                    .then(() => {
                        if (this.props.schedules.schedulesError) {
                            notificationError(this.props.schedules.schedulesError.code, this.props.schedules.schedulesError.message);
                        } else {
                            this.setState({
                                schedulesLoading: false,
                                schedules: this.props.schedules.schedulesList
                            });
                        }
                    });
            }
        });
    }

    render() {
        return (
            <AppLayout
                defaultSelectedKeys={['schedule']}
            >
                {
                    this.state.loading
                        ? <LoadingScreen />
                        : <div>
                            <div className="schedules">
                                <div className="schedules__search">
                                    <p className="schedules__searchLabel">Sélectionnez la ligne souhaitée</p>
                                    <Cascader
                                        options={this.renderOptionsSchedules(this.props.lines.linesList)}
                                        expandTrigger="hover"
                                        placeholder="Sélectionnez la ligne souhaitée"
                                        showSearch
                                        value={this.state.values.typeCode}
                                        onChange={value => this.loadStations(value)}
                                    />
                                </div>
                                {
                                    this.state.stationsLoading
                                        ? <Spin tip="Chargement..." />
                                        : (this.state.stations.length > 0 && !this.state.stationsLoading) &&
                                            <div className="schedules__search">
                                                <p className="schedules__searchLabel">Sélectionnez la station</p>
                                                <Select
                                                    showSearch
                                                    allowClear
                                                    placeholder="Sélectionnez la station"
                                                    value={this.state.values.station}
                                                    onChange={value => this.loadDestinations(value)}
                                                >
                                                    {
                                                        this.state.stations.map(s =>
                                                            <Select.Option key={s.slug} value={s.slug}>{s.name}</Select.Option>
                                                        )
                                                    }
                                                </Select>
                                            </div>
                                }
                                {
                                    this.state.destinationsLoading
                                        ? <Spin tip="Chargement..." />
                                        : (this.state.destinations.length > 0 && !this.state.destinationsLoading) &&
                                        <div className="schedules__search">
                                            <p className="schedules__searchLabel">Sélectionnez la destination</p>
                                            <Select
                                                showSearch
                                                allowClear
                                                placeholder="Sélectionnez la destination"
                                                value={this.state.values.way}
                                                onChange={value => this.loadSchedules(value)}
                                            >
                                                <Select.Option key="A+R" value="A+R">Les 2 destinations</Select.Option>
                                                {
                                                    this.state.destinations.map(d =>
                                                        <Select.Option key={d.way} value={d.way}>{d.name}</Select.Option>
                                                    )
                                                }
                                            </Select>
                                        </div>
                                }
                            </div>
                            {
                                this.state.schedulesLoading
                                    ? <LoadingScreen />
                                    : (this.state.schedules.length > 0 && !this.state.schedulesLoading) &&
                                        <Timeline mode="alternate">
                                            {
                                                this.state.schedules
                                                    .map(s =>
                                                        <Timeline.Item
                                                            key={s.message + s.destination}
                                                            position={
                                                                s.destination === this.state.destinations[0].name
                                                                    ? 'right'
                                                                    : 'left'
                                                            }
                                                        >
                                                            {s.message} en direction de {s.destination}
                                                        </Timeline.Item>
                                                    )
                                            }
                                        </Timeline>
                            }
                          </div>
                }
            </AppLayout>
        );
    }
}

const mapStateToProps = (state) => ({
    lines: state.lines,
    schedules: state.schedules
});

const mapDispatchToProps = {
    getLines,
    getDestinations,
    getStations,
    getSchedules
};

export default connect(mapStateToProps, mapDispatchToProps)(SchedulesScreen);

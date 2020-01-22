import React, { Component } from "react";
import PropTypes from "prop-types";
import Layout from "antd/lib/layout";
import Menu from "antd/lib/menu";
import Icon from "antd/lib/icon";
import BackTop from "antd/lib/back-top";
import Logo from "../../static/img/logo/ratp.png";
import Logosm from "../../static/img/logo/ratp-sm.png";
import { Link } from "react-router-dom";

class AppLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsedMenu: false
        };

        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse() {
        this.setState({ collapsedMenu: !this.state.collapsedMenu });
    }

    render() {
        return (
            <Layout>
                <BackTop />
                <Layout.Sider
                    collapsible
                    breakpoint="lg"
                    collapsed={this.state.collapsedMenu}
                    onCollapse={this.toggleCollapse}
                    width={250}
                >
                    <img src={Logo} alt="Logo de RATP" className="logo" />
                    <img src={Logosm} alt="Logo de RATP" className="logo-sm" />
                    <Menu
                        theme="dark"
                        defaultOpenKeys={this.props.defaultOpenKeys}
                        defaultSelectedKeys={this.props.defaultSelectedKeys}
                        mode="inline"
                    >
                        <Menu.Item key="home">
                            <Link to="/">
                                <Icon type="home" />
                                <span>Page d'accueil</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="traffic">
                            <Link to="/traffics">
                                <Icon type="stock" />
                                <span>Trafic</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="line">
                            <Link to="/lines">
                                <Icon type="line" />
                                <span>Lignes de transports</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="schedule">
                            <Link to="/schedules">
                                <Icon type="clock-circle" />
                                <span>Horaires</span>
                            </Link>
                        </Menu.Item>
                        <Menu.SubMenu
                            key="about"
                            title={
                                <span>
                                  <Icon type="setting" />
                                  <span>À propos</span>
                                </span>
                            }
                        >
                            <Menu.Item key="team">
                                <Link to="/team">
                                    <Icon type="team" />
                                    <span>L'équipe</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="contact">
                                <Link to="/contacts">
                                    <Icon type="contacts" />
                                    <span>Contact</span>
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Layout.Sider>
                <Layout>
                    <Layout.Content className={`${this.state.collapsedMenu ? "" : "ant-layout-content--collapsed"}`}>
                        {this.props.children}
                    </Layout.Content>
                    <Layout.Footer className={`${this.state.collapsedMenu ? "" : "ant-layout-footer--collapsed"}`}>
                        RATP API Interface ©2019 Created by <a href="https://github.com/kevinhuang78/" rel="noreferrer noopener" target="_blank">Kévin Huang</a>
                    </Layout.Footer>
                </Layout>
            </Layout>
        );
    }
}

AppLayout.propTypes = {
    /** Default selected keys for menu on the left */
    defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string)
};

export default AppLayout;
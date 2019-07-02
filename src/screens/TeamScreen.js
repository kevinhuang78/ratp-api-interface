import React from "react";
import AppLayout from "../components/layouts/AppLayout";
import Divider from "antd/lib/divider";
import Card from "antd/lib/card";
import KevinHuang from "../static/img/team/kevinhuang78.jpg";
import PierreGrimaud from "../static/img/team/pgrimaud.jpg";

const TeamScreen = () => (
    <AppLayout
        defaultOpenKeys={['about']}
        defaultSelectedKeys={['team']}
    >
        <Divider>Team Front-End (React)</Divider>
        <div className="team__item">
            <a href="https://github.com/kevinhuang78" rel="noreferrer noopener" target="_blank">
                <Card
                    hoverable
                    cover={<img alt="Kévin Huang" src={KevinHuang} />}
                >
                    <Card.Meta title="Kévin Huang" description="https://github.com/kevinhuang78" />
                </Card>
            </a>
        </div>
        <Divider>Team Back-End (API)</Divider>
        <div className="team__item">
            <a href="https://github.com/pgrimaud" rel="noreferrer noopener" target="_blank">
                <Card
                    hoverable
                    cover={<img alt="Pierre Grimaud" src={PierreGrimaud} />}
                >
                    <Card.Meta title="Pierre Grimaud" description="https://github.com/pgrimaud" />
                </Card>
            </a>
        </div>
    </AppLayout>
);

export default TeamScreen;
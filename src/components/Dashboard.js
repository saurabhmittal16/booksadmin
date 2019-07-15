import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <Link to="/home/rents">
                    <Card>
                        Rents
                    </Card>
                </Link>

                <Link to="/home/rents">
                    <Card>
                        Rents
                    </Card>
                </Link>
            </div>
        );
    }
}

export default Dashboard;
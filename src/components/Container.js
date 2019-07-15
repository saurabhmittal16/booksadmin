import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Router from './Router';

const { Header, Content } = Layout;

const sider = [
	['/home/rents', 'Rents'],
	['/home/add', 'Add Listing'],
];

const getCurrentMenu = currPath => {
	let res = -1;
	for (let i = 0; i < sider.length; i++)
		if (sider[i][0] === currPath) res = i;

	return String(res);
};

class Container extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
		};
	}

	onCollapse = collapsed => {
		this.setState({ collapsed });
	};

	render() {
		return (
			<div>
				<Layout className="layout">
					<Header>
						<Menu
							theme="dark"
							mode="horizontal"
							defaultSelectedKeys={
								[getCurrentMenu(this.props.history.location.pathname, 'sider')]
							}
						>
						{
							sider.map(
								(item, index) => (
									<Menu.Item 
										key={index}
										title={item[1]}
									>
										<Link to={item[0]}>
											{item[1]}
										</Link>
									</Menu.Item> 
								)
							)
						}
						</Menu>
					</Header>
					<Content style={{ padding: '10px 20px' }}>
						<Router />
					</Content>
				</Layout>
			</div>
		);
	}
}

export default Container;

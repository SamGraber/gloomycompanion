import * as React from 'react';

export class TabHeader extends React.PureComponent<any, any> {
	onClick = () => {
		this.props.setActiveTab(this.props.tab);
	}
	
	render() {
		const { tab, className } = this.props;
		return <li className={className} onClick={this.onClick}>{tab.header}</li>
	}
}

import * as React from 'react';
import { TabHeader } from './Tabheader';

export class Tabset extends React.Component {
	state = {
		activeTab: null,
	};

	componentDidMount() {
		this.setState({ activeTab: (this.props.children as any)[0] });
	}

	setActiveTab = (tab) => {
		this.setState({ activeTab: tab });
	}

	isActive = (tab) => {
		return tab === this.state.activeTab;
	}

	getActiveClass = (tab) => {
		return this.isActive(tab) ? '' : 'inactive';
	}
	
	render() {
		const children: any[] = this.props.children as any;
		return <div id="settingspane" className="pane expanded">
			<ul className="tabcontainer">
				{children.map((x, index) => (
					<TabHeader key={index} tab={x} className={this.getActiveClass(x)} setActiveTab={this.setActiveTab} />
				))}
				<li hidden={true} id="scenariotab">Scenario</li>
				<li hidden={true} id="deckstab">Decks</li>
			</ul>
			{children.map((x, index) => (
				<div key={index} className={'tabbody ' + this.getActiveClass(x)}>{x.body}</div>
			))}
		</div>
	}
}
import * as React from 'react';
import './App.css';
import './migration/style.css';
import './migration/cards.css';
import './migration/util';
import './migration/cards';
import './migration/scenarios';
import './migration/macros';
import './migration/modifiers';
import './migration/monster_stats';
import './migration/app/card-logic';
import './migration/app/level-selector';
import './migration/app/deck-list';
import './migration/app/scenario-list';
import './migration/app/init';
import './migration/logic';
import './migration/ui';
import { Migration } from './Migration';

class App extends React.Component {
	componentDidMount() {
		(window as any).init();
		(window as any).init_ui();
	}

	public render() {
		return (
			<div className="App">
				<Migration />
			</div>
		);
	}
}

export default App;

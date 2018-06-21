import * as React from 'react';
import { Tabset } from './components/Tabset';
import { DeckList } from './components/DeckList';

export const Migration = () => (
	<div>
		<div className="panecontainer">
			<Tabset>
				{[
					{
						header: 'Decks',
						body: <div id="deckspage">
							<DeckList/>
						</div>,
					},
					{
						header: 'Scenario',
						body: <div id="scenariospage">
							<div className="switch">
								<label htmlFor="showmodifierdeck">
									<input id="showmodifierdeck" type="checkbox" checked={true} />
									<span className="lever" />
									Show Monster Modifier Deck
								</label>
							</div>
							<br />
							<input id="applyscenario" className="waves-effect waves-light btn" type="button" value="Apply" />
							<br />
							<input id="applyload" className="waves-effect waves-light btn" type="button" value="Load Previous Scenario" />
							<br />
						</div>,
					},
				]}
			</Tabset>
			<div id="cancelarea" />
		</div>
		<div>
			<input alt="Configure" id="settingsbtn" type="image" src="images/settings.svg" />
			<div id="currentdecks">
				<ul id="currentdeckslist" className="currentdeckslist" />
			</div>
		</div>
		<div id="tableau" style={{ fontSize: '26.6px' }} />
	</div>
)
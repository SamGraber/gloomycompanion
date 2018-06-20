import * as React from 'react';

export const Migration = () => (
	<div>
		<div className="panecontainer">
            <div id="settingspane" className="pane expanded">
                <ul className="tabcontainer">
                    <li id="scenariotab">Scenario</li>
                    <li id="deckstab">Decks</li>
                </ul>
                <div id="scenariospage" className="tabbody">
                    <div className="switch">
                        <label htmlFor="showmodifierdeck">
                            <input id="showmodifierdeck" type="checkbox" checked={true} />
                            <span className="lever"/>
                            Show Monster Modifier Deck
                        </label>
                    </div>
                    <br/>
                    <input id="applyscenario" className="waves-effect waves-light btn" type="button" value="Apply" />
                    <br/>
                    <input id="applyload" className="waves-effect waves-light btn" type="button" value="Load Previous Scenario" />
                    <br/>
                </div>
                <div id="deckspage" className="tabbody">
                    <div className="switch">
                        <label htmlFor="showmodifierdeck-deckspage">
                            <input id="showmodifierdeck-deckspage" type="checkbox" checked={true} />
                            <span className="lever"/>
                            Show Monster Modifier Deck
                        </label>
                    </div>
                    <br/>
                    <input id="applydecks" className="waves-effect waves-light btn" type="button" value="Apply" />
                </div>
            </div>
            <div id="cancelarea"/>
        </div>
        <div>
            <input alt="Configure" id="settingsbtn" type="image" src="images/settings.svg" />
            <div id="currentdecks">
                <ul id="currentdeckslist" className="currentdeckslist"/>
            </div>
        </div>
        <div id="tableau" style={{fontSize: '26.6px'}}/>
	</div>
)
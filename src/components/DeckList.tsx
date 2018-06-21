import * as React from 'react';
import { LevelSelector } from './LevelSelector';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CardService from '../cards/cards.service';
import './DeckList.css';
import { DeckSelection } from './DeckSelection';

export class DeckList extends React.Component<any, any> {
	state = {
		unselectedDecks: Object.keys(CardService.decks).map(key => CardService.decks[key]),
		selectedDecks: [] as { name: string }[],
	};
	
	setGlobalLevel = (level) => {
		// for (const key in this.levelSelectors) {
		// 	this.levelSelectors[key].set_value(this.globalLevelSelector.get_selection());
		// }
	}

	selectDeck = (event) => {
		const selectedDecks = [...this.state.selectedDecks, this.state.unselectedDecks[event.target.value]];
		const unselectedDecks = [...this.state.unselectedDecks];
		unselectedDecks.splice(event.target.value, 1);
		this.setState({
			selectedDecks,
			unselectedDecks,
		});
	}

	deleteDeck = (deckIndex) => {
		const unselectedDecks = [...this.state.unselectedDecks, this.state.selectedDecks[deckIndex]];
		unselectedDecks.sort((x, y) => x.name.localeCompare(y.name));
		const selectedDecks = [...this.state.selectedDecks];
		selectedDecks.splice(deckIndex, 1);
		this.setState({
			selectedDecks,
			unselectedDecks,
		});
	}

     // const domDict = (window as any).create_button('button', 'applylevel', 'Apply All');
        // domDict.onclick = () => {
        //     for (const key in this.levelSelectors) {
        //         this.levelSelectors[key].set_value(this.globalLevelSelector.get_selection());
        //     }
        // };
        // listitem.appendChild(domDict);

        // for (const key in (window as any).DECKS) {
        //     const realName = (window as any).DECKS[key].name;
        //     const newListItem = document.createElement('li');
        //     const newDomDict = (window as any).create_input('checkbox', 'deck', realName, realName);
        //     newListItem.appendChild(newDomDict.root);

        //     const levelSelector = new LevelSelector(' with level ', true);
        //     newListItem.appendChild(levelSelector.html);

        //     this.ul.appendChild(newListItem);
        //     this.checkboxes[realName] = newDomDict.input;
        //     this.levelSelectors[realName] = levelSelector;

        // }

    // get_selection() {
    //     return (window as any).dict_values(this.checkboxes).filter((window as any).is_checked).map((window as any).input_value);
    // }

    // get_selected_decks() {
    //     const selectedCheckbox = this.get_selection();
    //     const selectedDecks = (window as any).concat_arrays(selectedCheckbox.map((name: string) => {
    //         const deck = ((name in (window as any).DECKS) ? (window as any).DECKS[name] : []);
    //         deck.level = this.levelSelectors[name].get_selection();
    //         return deck;
    //     }));
    //     return selectedDecks;
    // }

    // set_selection(selectedDeckNames: any) {
    //     (window as any).dict_values(this.checkboxes).forEach((checkbox) => {
    //         checkbox.checked = false;
    //     });

    //     selectedDeckNames.forEach((deckNames: any) => {
    //         const checkbox = this.checkboxes[deckNames.name];
    //         if (checkbox) {
    //             checkbox.checked = true;
    //             this.levelSelectors[deckNames.name].set_value(deckNames.level);
    //         }
    //     });
	// }
	
	render() {
		return <div className="deck-list">
			<div><LevelSelector label="Select global level" /></div>
			<div><Button variant="raised">Apply all</Button></div>
			<div>
				<FormControl className="deck-selector">
					<InputLabel htmlFor="deck-selector">Decks</InputLabel>
					<Select
						value=""
						onChange={this.selectDeck}
						inputProps={{
							id: 'deck-selector',
						}}
					>
						<MenuItem value=""><em>None</em></MenuItem>
						{this.state.unselectedDecks.map((deck, index) => (
							<MenuItem key={index} value={index}>{deck.name}</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
			<ul className="selectionlist">
				{this.state.selectedDecks.map((deck, index) => (
					<DeckSelection key={index} deckIndex={index} deckName={deck.name} deleteDeck={this.deleteDeck}/>
				))}
			</ul>
		</div>
	}
}

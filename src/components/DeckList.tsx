import * as React from 'react';
import { LevelSelector } from './LevelSelector';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CardService from '../cards/cards.service';
import './DeckList.css';
import { DeckSelection } from './DeckSelection';
import { IDeck } from '../cards/deck.model';

export class DeckList extends React.Component<any, any> {
	state = {
		level: 1,
		unselectedDecks: Object.keys(CardService.decks).map(key => CardService.decks[key]),
		selectedDecks: [] as IDeck[],
		showModifierDeck: true,
	};

	setGlobalLevel = (level) => {
		this.setState({ level });
	}

	selectDeck = (event) => {
		const deck = this.state.unselectedDecks[event.target.value];
		if (!deck.groupHeader) {
			const selectedDecks = [...this.state.selectedDecks, deck];
			const unselectedDecks = [...this.state.unselectedDecks];
			unselectedDecks.splice(event.target.value, 1);
			this.setState({
				selectedDecks,
				unselectedDecks,
			});
		}
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

	toggleModifierDeck = (event) => {
		this.setState({ showModifierDeck: event.target.checked });
	}

	applySelections = () => {
		const selectedDecks = this.state.selectedDecks.map((deck: IDeck) => ({
			...deck,
			level: this.state.level,
		}));
		(window as any).applyDeckSelections(selectedDecks, this.state.showModifierDeck);
	}

	render() {
		return <div className="deck-list">
			<div><LevelSelector label="Select global level" setLevel={this.setGlobalLevel} /></div>
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
							<MenuItem key={index} value={index}>
								{deck.groupHeader
								? <b>{deck.name}</b>
								: deck.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
			<ul className="selectionlist">
				{this.state.selectedDecks.map((deck, index) => (
					<DeckSelection key={index} deckIndex={index} deckName={deck.name} deleteDeck={this.deleteDeck} />
				))}
			</ul>
			<div>
				<FormControlLabel
					control={
						<Switch
							checked={this.state.showModifierDeck}
							onChange={this.toggleModifierDeck}
							value="showModifierDeck"
						/>
					}
					label="Show monster modifier deck"
				/>
			</div>
			<div><Button variant="raised" onClick={this.applySelections}>Apply</Button></div>
		</div>
	}
}

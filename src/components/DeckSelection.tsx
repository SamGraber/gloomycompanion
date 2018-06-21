import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export class DeckSelection extends React.Component<any> {
	deleteDeck = () => {
		this.props.deleteDeck(this.props.deckIndex);
	}
	
	render() {
		return <li>
			<span>{this.props.deckName}</span>
			<IconButton aria-label="Delete" onClick={this.deleteDeck}><DeleteIcon /></IconButton>
		</li>;
	}
}
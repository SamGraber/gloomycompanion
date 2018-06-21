import './cards.css';
import { DECK_DEFINITONS, DECKS } from './data/gloomhaven-cards.data';
import { XCOMDecks } from './data/xcom-cards.data';
import { IDeckDefinition } from './deck.model';

class CardsService {
	deckDefinitions: { [key: string]: IDeckDefinition } = {};
	decks = {...DECKS, ...XCOMDecks};
	
	constructor() {
		DECK_DEFINITONS.forEach(definition => {
			this.deckDefinitions[definition.class] = definition;
		});
	}
}

export default new CardsService();
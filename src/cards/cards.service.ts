import './cards.css';
import { DECK_DEFINITONS, DECKS } from '../data/gloomhaven/gloomhaven-cards.data';
import { XCOMClasses, XCOMDecks } from '../data/xcom';
import { IDeckDefinition } from './deck.model';

class CardsService {
	deckDefinitions: { [key: string]: IDeckDefinition } = {};
	decks = {...DECKS, ...XCOMDecks};
	
	constructor() {
		DECK_DEFINITONS.forEach(definition => {
			this.deckDefinitions[definition.class] = definition;
		});
		XCOMClasses.forEach(definition => {
			this.deckDefinitions[definition.class] = definition;
		});
	}
}

export default new CardsService();
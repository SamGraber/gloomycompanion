import { DECK_DEFINITONS, DECKS } from './cards.data';
import { IDeckDefinition } from './deck.model';

class CardsService {
	deckDefinitions: { [key: string]: IDeckDefinition } = {};
	decks = DECKS;
	
	constructor() {
		DECK_DEFINITONS.forEach(definition => {
			this.deckDefinitions[definition.class] = definition;
		});
	}
}

export default new CardsService();
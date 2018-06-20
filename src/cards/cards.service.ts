import { DECK_DEFINITONS } from './cards.data';
import { IDeck } from './deck.model';

class CardsService {
	decks: { [key: string]: IDeck } = {};
	
	constructor() {
		DECK_DEFINITONS.forEach(definition => {
			this.decks[definition.class] = definition;
		});
	}
}

export default new CardsService();
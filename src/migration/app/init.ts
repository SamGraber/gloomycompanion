import { DeckList } from './deck-list';
import { ScenarioList } from './scenario-list';
import CardService from '../../cards/cards.service';

(window as any).deck_definitions = CardService.deckDefinitions;

(window as any).init = () => {
	const scenariospage = document.getElementById('scenariospage') as HTMLElement;
	const applyscenariobtn = document.getElementById('applyscenario') as HTMLButtonElement;
	const applyloadbtn = document.getElementById('applyload') as HTMLButtonElement;
	const showmodifierdeck = document.getElementById('showmodifierdeck') as HTMLInputElement;

	const decklist = new (DeckList as any)();
	const scenariolist = new (ScenarioList as any)((window as any).SCENARIO_DEFINITIONS);

	scenariospage.insertAdjacentElement('afterbegin', scenariolist.ul);

	(window as any).applyDeckSelections = (selectedDeckNames, showModifierDeck) => {
		localStorage.clear();
		(window as any).write_to_storage('selected_deck_names', JSON.stringify(selectedDeckNames));
		const selected_decks = selectedDeckNames.map((deck_names: any) => {
			return (window as any).load_ability_deck(deck_names.class, deck_names.name, deck_names.level);
		});
		(window as any).apply_deck_selection(selected_decks, true);
		const modifierDeckSelection = document.getElementById('modifier-container') as HTMLElement;
		if (!showModifierDeck) {
			modifierDeckSelection.style.display = 'none';
		}
		else {
			modifierDeckSelection.style.display = 'block';
		}
	};

	applyscenariobtn.onclick = () => {
		localStorage.clear();
		const selected_deck_names = scenariolist.get_scenario_decks();
		(window as any).write_to_storage('selected_deck_names', JSON.stringify(selected_deck_names));
		decklist.set_selection(selected_deck_names);
		const selected_decks = selected_deck_names.map((deck_names: any) => {
			return (window as any).load_ability_deck(deck_names.class, deck_names.name, deck_names.level);
		});
		(window as any).apply_deck_selection(selected_decks, false);
		const modifier_deck_section = document.getElementById('modifier-container') as HTMLElement;
		if (!showmodifierdeck.checked) {
			modifier_deck_section.style.display = 'none';
		}
		else {
			modifier_deck_section.style.display = 'block';
		}
	};

	applyloadbtn.onclick = () => {
		const selected_deck_names = JSON.parse((window as any).get_from_storage('selected_deck_names') as string);
		decklist.set_selection(selected_deck_names);
		const selected_decks = selected_deck_names.map((deck_names: any) => {
			return (window as any).load_ability_deck(deck_names.class, deck_names.name, deck_names.level);
		});
		(window as any).apply_deck_selection(selected_decks, true);
		const modifier_deck_section = document.getElementById('modifier-container') as HTMLElement;
		if (!showmodifierdeck.checked) {
			modifier_deck_section.style.display = 'none';
		}
		else {
			modifier_deck_section.style.display = 'block';
		}
	}

	window.onresize = (window as any).refresh_ui.bind(null, (window as any).visible_ability_decks);
}

declare var create_input;
declare var SPECIAL_RULES;
declare var DECKS;

class ScenarioList {
    ul: HTMLUListElement;
    spinner: HTMLInputElement;
    decks = {} as any;
    special_rules = {} as any;
    level_selector: LevelSelector;

    constructor(private scenarios) {
        this.ul = document.createElement('ul');
        this.ul.className = 'selectionlist';
    
        this.level_selector = new LevelSelector('Select level', false);
    
        this.ul.appendChild(this.level_selector.html);
    
        for (var i = 0; i < scenarios.length; i++) {
            var scenario = scenarios[i];
            this.decks[i] = scenario.decks;
            this.special_rules[i] = scenario.special_rules ? scenario.special_rules : '';
        }
    
        var listitem = document.createElement('li');
        listitem.innerText = 'Select scenario number';
        this.ul.appendChild(listitem);
    
        var scenario_spinner = create_input('number', 'scenario_number', '1', '');
        scenario_spinner.input.min = 1;
        scenario_spinner.input.max = scenarios.length;
        this.ul.appendChild(scenario_spinner.input);
        this.spinner = scenario_spinner.input;
    }

    get_selection() {
        // We're using the scenario index that is zero-based, but the scenario list is 1-based
        var current_value = +this.spinner.value - 1;
        return Math.min(current_value, this.scenarios.length + 1);
    }

    get_level(deck_name, special_rules) {

        var base_level = this.level_selector.get_selection();

        if ((special_rules.indexOf(SPECIAL_RULES.living_corpse_two_levels_extra) >= 0) && (deck_name == SPECIAL_RULES.living_corpse_two_levels_extra.affected_deck)) {
            return Math.min(7, (parseInt(base_level) + parseInt(SPECIAL_RULES.living_corpse_two_levels_extra.extra_levels)));
        } else {
            return base_level;
        }
    }

    get_scenario_decks() {
        return (this.decks[this.get_selection()].map(function (deck) {
            if (DECKS[deck.name]) {
                deck.class = DECKS[deck.name].class;
            } else if (deck.name.indexOf('Boss') != -1) {
                deck.class = DECKS['Boss'].class;
            }
            deck.level = this.get_level(deck.name, this.get_special_rules());
            return deck;
        }));
    }

    get_special_rules() {
        return this.special_rules[this.get_selection()];
    }
}

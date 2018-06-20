declare var create_input;
declare var SPECIAL_RULES;
declare var DECKS;

function ScenarioList(scenarios) {
    var scenariolist = {} as any;
    scenariolist.ul = document.createElement('ul');
    scenariolist.ul.className = 'selectionlist';
    scenariolist.spinner = null;
    scenariolist.decks = {};
    scenariolist.special_rules = {};
    scenariolist.level_selector = null;

    scenariolist.level_selector = new LevelSelector('Select level', false);

    scenariolist.ul.appendChild(scenariolist.level_selector.html);

    for (var i = 0; i < scenarios.length; i++) {
        var scenario = scenarios[i];
        scenariolist.decks[i] = scenario.decks;
        scenariolist.special_rules[i] = scenario.special_rules ? scenario.special_rules : '';
    }

    var listitem = document.createElement('li');
    listitem.innerText = 'Select scenario number';
    scenariolist.ul.appendChild(listitem);

    var scenario_spinner = create_input('number', 'scenario_number', '1', '');
    scenario_spinner.input.min = 1;
    scenario_spinner.input.max = scenarios.length;
    scenariolist.ul.appendChild(scenario_spinner.input);
    scenariolist.spinner = scenario_spinner.input;

    scenariolist.get_selection = function () {
        // We're using the scenario index that is zero-based, but the scenario list is 1-based
        var current_value = scenariolist.spinner.value - 1;
        return Math.min(current_value, scenarios.length + 1);
    }

    scenariolist.get_level = function (deck_name, special_rules) {

        var base_level = scenariolist.level_selector.get_selection();

        if ((special_rules.indexOf(SPECIAL_RULES.living_corpse_two_levels_extra) >= 0) && (deck_name == SPECIAL_RULES.living_corpse_two_levels_extra.affected_deck)) {
            return Math.min(7, (parseInt(base_level) + parseInt(SPECIAL_RULES.living_corpse_two_levels_extra.extra_levels)));
        } else {
            return base_level;
        }
    }

    scenariolist.get_scenario_decks = function () {
        return (this.decks[this.get_selection()].map(function (deck) {
            if (DECKS[deck.name]) {
                deck.class = DECKS[deck.name].class;
            } else if (deck.name.indexOf('Boss') != -1) {
                deck.class = DECKS['Boss'].class;
            }
            deck.level = scenariolist.get_level(deck.name, scenariolist.get_special_rules());
            return deck;
        }));
    }

    scenariolist.get_special_rules = function () {
        return this.special_rules[this.get_selection()];
    }

    return scenariolist;
}

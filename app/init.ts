declare var SCENARIO_DEFINITIONS;
declare var write_to_storage;
declare var apply_deck_selection;
declare var get_from_storage;
declare var visible_ability_decks;

(window as any).init = function init() {
    var deckspage = document.getElementById("deckspage");
    var scenariospage = document.getElementById("scenariospage");
    var applydeckbtn = document.getElementById("applydecks");
    var applyscenariobtn = document.getElementById("applyscenario");
    var applyloadbtn = document.getElementById("applyload");
    var showmodifierdeck = document.getElementById("showmodifierdeck") as HTMLInputElement;

    var decklist = new (DeckList as any)();
    var scenariolist = new (ScenarioList as any)(SCENARIO_DEFINITIONS);

    deckspage.insertAdjacentElement("afterbegin", decklist.ul);
    scenariospage.insertAdjacentElement("afterbegin", scenariolist.ul);

    applydeckbtn.onclick = function () {
        localStorage.clear();
        var selected_deck_names = decklist.get_selected_decks();
        write_to_storage("selected_deck_names", JSON.stringify(selected_deck_names));
        var selected_decks = selected_deck_names.map(function (deck_names) {
            return load_ability_deck(deck_names.class, deck_names.name, deck_names.level);
        });
        apply_deck_selection(selected_decks, true);
        var showmodifierdeck_deckspage = document.getElementById("showmodifierdeck-deckspage") as HTMLInputElement;
        var modifier_deck_section = document.getElementById("modifier-container");
        if(!showmodifierdeck_deckspage.checked){
            modifier_deck_section.style.display = "none";
        }
        else{
            modifier_deck_section.style.display = "block";
        }
    };

    applyscenariobtn.onclick = function () {
        localStorage.clear();
        var selected_deck_names = scenariolist.get_scenario_decks();
        write_to_storage("selected_deck_names", JSON.stringify(selected_deck_names));
        decklist.set_selection(selected_deck_names);
        var selected_decks = selected_deck_names.map(function (deck_names) {
            return load_ability_deck(deck_names.class, deck_names.name, deck_names.level);
        });
        apply_deck_selection(selected_decks, false);
        var modifier_deck_section = document.getElementById("modifier-container");
        if(!showmodifierdeck.checked){
            modifier_deck_section.style.display = "none";
        }
        else{
            modifier_deck_section.style.display = "block";
        }
    };

    applyloadbtn.onclick = function () {
        var selected_deck_names = JSON.parse(get_from_storage("selected_deck_names"));
        decklist.set_selection(selected_deck_names);
        var selected_decks = selected_deck_names.map(function (deck_names) {
            return load_ability_deck(deck_names.class, deck_names.name, deck_names.level);
        });
        apply_deck_selection(selected_decks, true);
        var modifier_deck_section = document.getElementById("modifier-container");
        if(!showmodifierdeck.checked){
            modifier_deck_section.style.display = "none";
        }
        else{
            modifier_deck_section.style.display = "block";
        }
    }

    window.onresize = refresh_ui.bind(null, visible_ability_decks);
}

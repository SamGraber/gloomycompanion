declare const SCENARIO_DEFINITIONS: any;

(window as any).init = () => {
    const deckspage = document.getElementById("deckspage") as HTMLElement;
    const scenariospage = document.getElementById("scenariospage") as HTMLElement;
    const applydeckbtn = document.getElementById("applydecks") as HTMLButtonElement;
    const applyscenariobtn = document.getElementById("applyscenario") as HTMLButtonElement;
    const applyloadbtn = document.getElementById("applyload") as HTMLButtonElement;
    const showmodifierdeck = document.getElementById("showmodifierdeck") as HTMLInputElement;

    const decklist = new (DeckList as any)();
    const scenariolist = new (ScenarioList as any)(SCENARIO_DEFINITIONS);

    deckspage.insertAdjacentElement("afterbegin", decklist.ul);
    scenariospage.insertAdjacentElement("afterbegin", scenariolist.ul);

    applydeckbtn.onclick = () => {
        localStorage.clear();
        const selectedDeckNames = decklist.get_selected_decks();
        write_to_storage("selected_deck_names", JSON.stringify(selectedDeckNames));
        const selected_decks = selectedDeckNames.map((deck_names: any) => {
            return load_ability_deck(deck_names.class, deck_names.name, deck_names.level);
        });
        apply_deck_selection(selected_decks, true);
        const showmodifierdeck_deckspage = document.getElementById("showmodifierdeck-deckspage") as HTMLInputElement;
        const modifierDeckSelection = document.getElementById("modifier-container") as HTMLElement;
        if(!showmodifierdeck_deckspage.checked){
            modifierDeckSelection.style.display = "none";
        }
        else{
            modifierDeckSelection.style.display = "block";
        }
    };

    applyscenariobtn.onclick = () => {
        localStorage.clear();
        const selected_deck_names = scenariolist.get_scenario_decks();
        write_to_storage("selected_deck_names", JSON.stringify(selected_deck_names));
        decklist.set_selection(selected_deck_names);
        const selected_decks = selected_deck_names.map((deck_names: any) => {
            return load_ability_deck(deck_names.class, deck_names.name, deck_names.level);
        });
        apply_deck_selection(selected_decks, false);
        const modifier_deck_section = document.getElementById("modifier-container") as HTMLElement;
        if(!showmodifierdeck.checked){
            modifier_deck_section.style.display = "none";
        }
        else{
            modifier_deck_section.style.display = "block";
        }
    };

    applyloadbtn.onclick = () => {
        const selected_deck_names = JSON.parse(get_from_storage("selected_deck_names") as string);
        decklist.set_selection(selected_deck_names);
        const selected_decks = selected_deck_names.map((deck_names: any) => {
            return load_ability_deck(deck_names.class, deck_names.name, deck_names.level);
        });
        apply_deck_selection(selected_decks, true);
        const modifier_deck_section = document.getElementById("modifier-container") as HTMLElement;
        if(!showmodifierdeck.checked){
            modifier_deck_section.style.display = "none";
        }
        else{
            modifier_deck_section.style.display = "block";
        }
    }

    window.onresize = refresh_ui.bind(null, visible_ability_decks);
}
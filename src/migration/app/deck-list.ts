declare let DECKS: any;

class DeckList {
    ul: HTMLUListElement;
    checkboxes = {} as any;
    levelSelectors = {} as any;
    globalLevelSelector = null as any;

    constructor() {
        this.ul = document.createElement('ul');
        this.ul.className = 'selectionlist';
        this.checkboxes = {};
        this.levelSelectors = {};
        this.globalLevelSelector = null;


        const listitem = document.createElement('li');
        const globalLevelSelector = new LevelSelector('Select global level ', true);
        listitem.appendChild(globalLevelSelector.html);
        this.globalLevelSelector = globalLevelSelector;

        const domDict = create_button('button', 'applylevel', 'Apply All');
        domDict.onclick = () => {
            for (const key in this.levelSelectors) {
                this.levelSelectors[key].set_value(this.globalLevelSelector.get_selection());
            }
        };
        listitem.appendChild(domDict);

        this.ul.appendChild(listitem);

        for (const key in DECKS) {
            const realName = DECKS[key].name;
            const newListItem = document.createElement('li');
            const newDomDict = create_input('checkbox', 'deck', realName, realName);
            newListItem.appendChild(newDomDict.root);

            const levelSelector = new LevelSelector(' with level ', true);
            newListItem.appendChild(levelSelector.html);

            this.ul.appendChild(newListItem);
            this.checkboxes[realName] = newDomDict.input;
            this.levelSelectors[realName] = levelSelector;

        }
    }

    get_selection() {
        return dict_values(this.checkboxes).filter(is_checked).map(input_value);
    }

    get_selected_decks() {
        const selectedCheckbox = this.get_selection();
        const selectedDecks = concat_arrays(selectedCheckbox.map((name: string) => {
            const deck = ((name in DECKS) ? DECKS[name] : []);
            deck.level = this.levelSelectors[name].get_selection();
            return deck;
        }));
        return selectedDecks;
    }

    set_selection(selectedDeckNames: any) {
        dict_values(this.checkboxes).forEach((checkbox) => {
            checkbox.checked = false;
        });

        selectedDeckNames.forEach((deckNames: any) => {
            const checkbox = this.checkboxes[deckNames.name];
            if (checkbox) {
                checkbox.checked = true;
                this.levelSelectors[deckNames.name].set_value(deckNames.level);
            }
        });
    }
}

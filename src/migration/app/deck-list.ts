declare var create_button;
declare var create_input;
declare var DECKS;
declare var dict_values;
declare var is_checked;
declare var input_value;
declare var concat_arrays;

class DeckList {
    ul: HTMLUListElement;
    checkboxes = {} as any;
    level_selectors = {} as any;
    global_level_selector = null as any;

    constructor() {
        this.ul = document.createElement('ul');
        this.ul.className = 'selectionlist';
        this.checkboxes = {};
        this.level_selectors = {};
        this.global_level_selector = null;


        var listitem = document.createElement('li');
        var global_level_selector = new LevelSelector('Select global level ', true);
        listitem.appendChild(global_level_selector.html);
        this.global_level_selector = global_level_selector;

        var dom_dict = create_button('button', 'applylevel', 'Apply All');
        dom_dict.onclick = () => {
            for (const key in this.level_selectors) {
                this.level_selectors[key].set_value(this.global_level_selector.get_selection());
            }
        };
        listitem.appendChild(dom_dict);

        this.ul.appendChild(listitem);

        for (const key in DECKS) {
            var real_name = DECKS[key].name;
            var listitem = document.createElement('li');
            var dom_dict = create_input('checkbox', 'deck', real_name, real_name);
            listitem.appendChild(dom_dict.root);

            var level_selector = new LevelSelector(' with level ', true);
            listitem.appendChild(level_selector.html);

            this.ul.appendChild(listitem);
            this.checkboxes[real_name] = dom_dict.input;
            this.level_selectors[real_name] = level_selector;

        }
    }

    get_selection() {
        return dict_values(this.checkboxes).filter(is_checked).map(input_value);
    }

    get_selected_decks() {
        var selected_checkbox = this.get_selection();
        var selected_decks = concat_arrays(selected_checkbox.map(function (name) {
            var deck = ((name in DECKS) ? DECKS[name] : []);
            deck.level = this.level_selectors[name].get_selection();
            return deck;
        }.bind(this)));
        return selected_decks;
    }

    set_selection(selected_deck_names) {
        dict_values(this.checkboxes).forEach(function (checkbox) {
            checkbox.checked = false;
        });

        selected_deck_names.forEach(function (deck_names) {
            var checkbox = this.checkboxes[deck_names.name];
            if (checkbox) {
                checkbox.checked = true;
                this.level_selectors[deck_names.name].set_value(deck_names.level);
            }
        }.bind(this));
    }
}

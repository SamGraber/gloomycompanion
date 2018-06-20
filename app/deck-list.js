
function DeckList() {
    var decklist = {};
    decklist.ul = document.createElement("ul");
    decklist.ul.className = "selectionlist";
    decklist.checkboxes = {};
    decklist.level_selectors = {};
    decklist.global_level_selector = null;


    var listitem = document.createElement("li");
    var global_level_selector = new LevelSelector("Select global level ", true);
    listitem.appendChild(global_level_selector.html);
    decklist.global_level_selector = global_level_selector;

    var dom_dict = create_button("button", "applylevel", "Apply All");
    dom_dict.onclick = function () {
        for (key in decklist.level_selectors) {
            decklist.level_selectors[key].set_value(decklist.global_level_selector.get_selection());
        }
    };
    listitem.appendChild(dom_dict);

    decklist.ul.appendChild(listitem);

    for (key in DECKS) {
        var real_name = DECKS[key].name;
        var listitem = document.createElement("li");
        var dom_dict = create_input("checkbox", "deck", real_name, real_name);
        listitem.appendChild(dom_dict.root);

        var level_selector = new LevelSelector(" with level ", true);
        listitem.appendChild(level_selector.html);

        decklist.ul.appendChild(listitem);
        decklist.checkboxes[real_name] = dom_dict.input;
        decklist.level_selectors[real_name] = level_selector;

    }
    ;

    decklist.get_selection = function () {
        return dict_values(this.checkboxes).filter(is_checked).map(input_value);
    }

    decklist.get_selected_decks = function () {
        var selected_checkbox = this.get_selection();
        var selected_decks = concat_arrays(selected_checkbox.map(function (name) {
            var deck = ((name in DECKS) ? DECKS[name] : []);
            deck.level = decklist.level_selectors[name].get_selection();
            return deck;
        }.bind(this)));
        return selected_decks;
    }

    decklist.set_selection = function (selected_deck_names) {
        dict_values(this.checkboxes).forEach(function (checkbox) {
            checkbox.checked = false;
        });

        selected_deck_names.forEach(function (deck_names) {
            var checkbox = this.checkboxes[deck_names.name];
            if (checkbox) {
                checkbox.checked = true;
                decklist.level_selectors[deck_names.name].set_value(deck_names.level);
            }
        }.bind(this));
    }

    return decklist;
}

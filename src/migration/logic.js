//TODO Adding an extra Guard deck will reshuffle the first one, End of round with multiple Archers, resize text, worth to show common and elite_only attributes?, shield and retaliate only when shown (apparently, attribtues are active at the beginning of the turn, and active after initiative)
window.do_shuffles = true;
window.visible_ability_decks = [];
window.modifier_deck = null;
window.deck_definitions = window.load_definition(DECK_DEFINITONS);

window.DECK_TYPES =
{
    MODIFIER: "modifier",
    ABILITY: "ability",
    BOSS: "boss"
};

window.EVENT_NAMES = {
    MODIFIER_CARD_DRAWN: "modifierCardDrawn",
    MODIFIER_DECK_SHUFFLE_REQUIRED: "modfierDeckShuffleRequired"
};

window.get_monster_stats = function(name, level) {
    var attack = [MONSTER_STATS["monsters"][name]["level"][level]["normal"]["attack"],
    MONSTER_STATS["monsters"][name]["level"][level]["elite"]["attack"]
    ];
    var move = [MONSTER_STATS["monsters"][name]["level"][level]["normal"]["move"],
    MONSTER_STATS["monsters"][name]["level"][level]["elite"]["move"]
    ];
    var range = [MONSTER_STATS["monsters"][name]["level"][level]["normal"]["range"],
    MONSTER_STATS["monsters"][name]["level"][level]["elite"]["range"]
    ];
    var attributes = [MONSTER_STATS["monsters"][name]["level"][level]["normal"]["attributes"],
    MONSTER_STATS["monsters"][name]["level"][level]["elite"]["attributes"]
    ];

    var health = [MONSTER_STATS["monsters"][name]["level"][level]["normal"]["health"],
    MONSTER_STATS["monsters"][name]["level"][level]["elite"]["health"]
    ];

    return { "attack": attack, "move": move, "range": range, "attributes": attributes, "health": health };
}

window.get_boss_stats = function(name, level) {
    name = name.replace("Boss: ", "");
    var attack = [MONSTER_STATS["bosses"][name]["level"][level]["attack"]];
    var move = [MONSTER_STATS["bosses"][name]["level"][level]["move"]];
    var range = [MONSTER_STATS["bosses"][name]["level"][level]["range"]];
    var special1 = MONSTER_STATS["bosses"][name]["level"][level]["special1"];
    var special2 = MONSTER_STATS["bosses"][name]["level"][level]["special2"];
    var immunities = MONSTER_STATS["bosses"][name]["level"][level]["immunities"];
    var notes = MONSTER_STATS["bosses"][name]["level"][level]["notes"];
    var health = [MONSTER_STATS["bosses"][name]["level"][level]["health"]];

    return {
        "attack": attack,
        "move": move,
        "range": range,
        "special1": special1,
        "special2": special2,
        "immunities": immunities,
        "notes": notes,
        "health": health
    }
}

window.apply_deck_selection = function(decks, preserve_existing_deck_state) {
    var container = document.getElementById("tableau");
    document.getElementById("currentdeckslist").innerHTML = "";
    var decks_to_remove = visible_ability_decks.filter(function (visible_deck) {
        return !preserve_existing_deck_state || (decks.filter(function (deck) {
            return ((deck.name == visible_deck.name) && (deck.level == visible_deck.level))
        }).length == 0);
    });

    var decks_to_add = decks.filter(function (deck) {
        return !preserve_existing_deck_state || (visible_ability_decks.filter(function (visible_deck) {
            return ((deck.name == visible_deck.name) && (deck.level == visible_deck.level))
        }).length == 0);
    });

    if (!modifier_deck) {
        init_modifier_deck();
        add_modifier_deck(container, modifier_deck, preserve_existing_deck_state);
        if (preserve_existing_deck_state) {
            var loaded_modifier_deck = JSON.parse(get_from_storage("modifier_deck"));
            var curses = count_type("curse", loaded_modifier_deck);
            var blessings = count_type("bless", loaded_modifier_deck);
            for (var i = 0; i < blessings; i++) {
                modifier_deck.add_card("bless");
            }
            for (var i = 0; i < curses; i++) {
                modifier_deck.add_card("curse");
            }
            modifier_deck.draw_top_discard();

            document.body.dispatchEvent(new CustomEvent(EVENT_NAMES.MODIFIER_DECK_SHUFFLE_REQUIRED, { detail: { shuffle: modifier_deck.shuffle_end_of_round() } }));
        }
    }
    else if (!preserve_existing_deck_state) {
        container.removeChild(document.getElementById("modifier-container"));
        init_modifier_deck();
        add_modifier_deck(container, modifier_deck, preserve_existing_deck_state);
    }
    write_to_storage("modifier_deck", JSON.stringify(modifier_deck));

    decks_to_remove.forEach(function (deck) {
        deck.discard_deck();
    });

    decks_to_add.forEach(function (deck) {
        var deckid = deck.get_real_name().replace(/\s+/g, '');
        var deck_space = document.createElement("div");
        deck_space.id = deckid;
        deck_space.addEventListener('contextmenu', function (e) {
            this.className = "hiddendeck";
            e.preventDefault();
        }, false);
        deck_space.className = "card-container";
        deck_space.title = "Click to draw enemy ability";

        container.appendChild(deck_space);

        place_deck(deck, deck_space);
        reshuffle(deck, !preserve_existing_deck_state);
        if (preserve_existing_deck_state) {

        }
        deck_space.onclick = draw_ability_card.bind(null, deck);

        deck.discard_deck = function () {
            var index = visible_ability_decks.indexOf(this);

            if (index > -1) {
                visible_ability_decks.splice(index, 1);
            }

            container.removeChild(deck_space);
        };

        if (deck.is_boss()) {
            // We don't want stats if someone selects Boss on the deck tab
            if (deck.get_real_name() != "Boss") {
                deck.set_stats_boss(get_boss_stats(deck.get_real_name(), deck.level));
            }
        } else {
            deck.set_stats_monster(get_monster_stats(deck.get_real_name(), deck.level));

        }
        reshuffle(deck);
        if (preserve_existing_deck_state) {
            deck.draw_top_discard();
        } else {
            window.force_repaint_deck(deck);
        }
        visible_ability_decks.push(deck);

        var currentdeckslist = document.getElementById("currentdeckslist");
        var list_item = document.createElement("li");
        list_item.className = "currentdeck";
        currentdeckslist.appendChild(list_item);
        var label = document.createElement("a");
        label.id = "switch-" + deckid;
        label.href = "#switch-" + deckid
        label.innerText = deck.get_real_name();
        label.title = "Click to show/hide deck";
        label.addEventListener("click", function (e) {
            var d = document.getElementById(this.id.replace("switch-", ""));
            d.className = (d.className == "hiddendeck") ? "card-container" : "hiddendeck";
        }, false)
        list_item.appendChild(label);
    });

    // Rescale card text if necessary
    refresh_ui();
}

window.init_modifier_deck = function() {
    modifier_deck = load_modifier_deck();
}

window.count_type = function(type, deck) {
    var count = 0;
    if (deck) {
        for (var i = 0; i < deck.draw_pile.length; i++) {
            if (deck.draw_pile[i].card_type === type) {
                count++;
            }
        }
    }
    return count;
}

window.add_modifier_deck = function(container, deck, preserve_discards) {
    function create_counter (card_type, increment_func, decrement_func, title) {
        function create_button(class_name, text, func, text_element) {
            var button = document.createElement("div");
            button.className = class_name + " button";
            button.innerText = text;

            button.onclick = function () {
                text_element.innerText = func(card_type);
            };

            return button;
        }

        var widget_container = document.createElement("div");
        widget_container.className = "counter-icon";
        widget_container.title = title;

        var background = document.createElement("div");
        background.className = "background " + card_type;
        widget_container.appendChild(background);

        var text_element = document.createElement("div");
        text_element.className = "icon-text";
        text_element.innerText = "0";

        widget_container.appendChild(create_button("decrement", "-", decrement_func, text_element));
        widget_container.appendChild(text_element);
        widget_container.appendChild(create_button("increment", "+", increment_func, text_element));

        document.body.addEventListener(EVENT_NAMES.MODIFIER_CARD_DRAWN, function (e) {
            if (e.detail.card_type === card_type) {
                text_element.innerText = e.detail.count;
            }
        });

        return widget_container;
    }

    function indicate_shuffle_required (e) {
        if (e.detail.shuffle) {
            window.setTimeout(function () { end_round_div.className = "counter-icon shuffle"; }, 400);
        }
        else {
            end_round_div.className = "counter-icon shuffle not-required";
        }
    }

    var modifier_container = document.createElement("div");
    modifier_container.className = "card-container";
    modifier_container.id = "modifier-container";

    var button_div = document.createElement("div");
    button_div.className = "modifier-deck-column-1";

    button_div.appendChild(create_counter("bless", deck.add_card, deck.remove_card, "Bless cards"));
    button_div.appendChild(create_counter("curse", deck.add_card, deck.remove_card, "Curse cards"));

    var end_round_div = document.createElement("div");
    end_round_div.className = "counter-icon shuffle not-required";
    end_round_div.onclick = end_round;
    end_round_div.title = "Click to end round and shuffle";

    document.body.addEventListener(EVENT_NAMES.MODIFIER_DECK_SHUFFLE_REQUIRED, indicate_shuffle_required);

    button_div.appendChild(end_round_div);

    var deck_column = document.createElement("div");
    deck_column.className = "modifier-deck-column-2";

    var deck_space = document.createElement("div");
    deck_space.className = "card-container modifier";
    deck_space.title = "Click to draw one card";

    var draw_two_button = document.createElement("div");
    draw_two_button.className = "button draw-two";
    draw_two_button.onclick = double_draw.bind(null, modifier_deck);
    draw_two_button.title = "Click to draw two cards";

    deck_column.appendChild(deck_space);
    deck_column.appendChild(draw_two_button);

    modifier_container.appendChild(deck_column);
    modifier_container.appendChild(button_div);

    container.appendChild(modifier_container);

    place_deck(deck, deck_space);
    reshuffle(deck, !preserve_discards);
    deck_space.onclick = draw_modifier_card.bind(null, deck);
}

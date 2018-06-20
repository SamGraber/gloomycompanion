
function UICard(frontElement, backElement) {
    let card = {};

    card.back = backElement;
    card.front = frontElement;

    card.flip_up = function (faceup) {
        toggle_class(this.back, "up", !faceup);
        toggle_class(this.back, "down", faceup);

        toggle_class(this.front, "up", faceup);
        toggle_class(this.front, "down", !faceup);
    };

    card.set_depth = function (z) {
        this.back.style.zIndex = z;
        this.front.style.zIndex = z;
    }

    card.push_down = function () {
        this.back.style.zIndex -= 1;
        this.front.style.zIndex -= 1;
    }

    card.addClass = function (className) {
        this.front.classList.add(className);
        this.back.classList.add(className);
    }

    card.removeClass = function (className) {
        this.front.classList.remove(className);
        this.back.classList.remove(className);
    }

    card.attach = function (parent) {
        parent.appendChild(this.back);
        parent.appendChild(this.front);
    }

    card.flip_up(false);

    return card;
}

function create_ability_card_back(name, level) {
    let card = document.createElement("div");
    card.className = "gl-card ability back down";

    let nameSpan = document.createElement("span");
    nameSpan.className = "name";
    nameSpan.innerText = name + "-" + level;
    card.appendChild(nameSpan);

    return card;
}

function create_ability_card_front(initiative, name, shuffle, lines, attack, move, range, level, health) {
    let card = document.createElement("div");
    card.className = "gl-card ability front down";

    let nameSpan = document.createElement("span");
    nameSpan.className = "name";
    nameSpan.innerText = name + "-" + level;
    card.appendChild(nameSpan);

	
	let healthNormalSpan = document.createElement("span");
    healthNormalSpan.className = "healthNormal";
    healthNormalSpan.innerText = "HP " + health[0];
    card.appendChild(healthNormalSpan);
	
	if ( health[1] > 0 ) {
		let healthEliteSpan = document.createElement("span");
		healthEliteSpan.className = "healthElite";
		healthEliteSpan.innerText = "HP " + health[1];
		card.appendChild(healthEliteSpan);
	}
	
	
    let initiativeSpan = document.createElement("span");
    initiativeSpan.className = "initiative";
    initiativeSpan.innerText = initiative;
    card.appendChild(initiativeSpan);

    if (shuffle) {
        let shuffleImg = document.createElement("img");
        shuffleImg.src = "images/shuffle.svg";
        card.appendChild(shuffleImg);
    }

    let currentDepth = 0;
    let currentParent = card;

    lines = remove_empty_strings(lines);
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        let newDepth = 0;
        while (line.indexOf("*") >= 0) {
            newDepth += 1;
            line = line.substr(1);
        }
        let diff = newDepth - currentDepth;

        while (currentDepth !== newDepth) {
            if (diff > 0) {
                // Need one level lower, create <ul>
                let list = document.createElement("ul");
                // Dynamically adapt the size to the line length. I found this the sweet spot to read all the cards
                if (lines.length > 5) {
                    list.style.fontSize = (100 - (lines.length * 2.5)) + "%";
                }
                currentParent.appendChild(list);
                currentParent = list;

                // Create <li>
                const newListItem = document.createElement("li");
                currentParent.appendChild(newListItem);
                currentParent = newListItem;

                currentDepth += 1;
            }
            else {
                // Need to go up in the list, pop <li>
                currentParent = currentParent.parentElement;

                // pop <ul>
                currentParent = currentParent.parentElement;

                currentDepth -= 1;
            }
        }

        if ((currentDepth > 0) && (diff <= 0)) {
            // Same level, pop the previous <li>
            currentParent = currentParent.parentElement;

            // create sibling <li>
            const newListItem = document.createElement("li");
            currentParent.appendChild(newListItem);
            currentParent = newListItem;
        }

        text = expand_string(line.trim(), attack, move, range);
        currentParent.insertAdjacentHTML("beforeend", text);
    }

    return card;
}

function load_ability_deck(deckClass, deckName, level) {
    let deckDefinition = deck_definitions[deckClass];
    deckDefinition.name = deckName;
    deckDefinition.level = level;

    let loadedDeck = JSON.parse(get_from_storage(deckName));


    let deck = {
        class: deckDefinition.class,
        name: deckDefinition.name,
        type: DECK_TYPES.ABILITY,
        draw_pile: [],
        discard: [],
        move: [0, 0],
        attack: [0, 0],
        range: [0, 0],
        level: deckDefinition.level,
		health: [0,0]
    }

    for (let i = 0; i < deckDefinition.cards.length; i++) {
        let definition = deckDefinition.cards[i];
        let shuffle = definition[0];
        let initiative = definition[1];
        let lines = definition.slice(2);

        let empty_front = document.createElement("div");
        empty_front.className = "gl-card ability front down";
        let card_front = empty_front;
        let card_back = create_ability_card_back(deck.name, deck.level);

        let card = {
            id: deck.name + '_' + i,
            ui: new UICard(card_front, card_back),
            shuffle_next: shuffle,
            initiative: initiative,
            starting_lines: lines,
        };

        card.paint_front_card = function (name, cardLines, attack, move, range, cardLevel, health) {
            this.ui.front = create_ability_card_front(this.initiative, name, this.shuffle_next, cardLines, attack, move, range, cardLevel, health);
        }
        if (loadedDeck && find_in_discard(loadedDeck.discard, card.id)) {
            deck.discard.push(card);
        } else {
            deck.draw_pile.push(card);
        }
    }
    deck.draw_top_discard = function() {
        if (this.discard.length > 0) {
            let cardToDiscard = this.discard[this.discard.length-1];
            let cards_lines = cardToDiscard.starting_lines;
            let extra_lines = [];
            if (this.is_boss()) {
                let new_lines = [];
                cards_lines.forEach(function (line) {
                    new_lines = new_lines.concat(special_to_lines(line, deck.special1, deck.special2));
                });
                cards_lines = new_lines;
                if (this.immunities) {
                    extra_lines = extra_lines.concat(immunities_to_lines(this.immunities));
                }
                if (this.notes) {
                    extra_lines = extra_lines.concat(notes_to_lines(this.notes));
                }
            }
            else {
                if (this.attributes) {
                    extra_lines = extra_lines.concat(attributes_to_lines(this.attributes));
                }

            }

            cardToDiscard.paint_front_card(this.get_real_name(), cards_lines.concat(extra_lines), this.attack, this.move, this.range, this.level, this.health);

            cardToDiscard.ui.set_depth(-3);
            cardToDiscard.ui.addClass("pull");
            cardToDiscard.ui.flip_up(true);
            cardToDiscard.ui.removeClass("draw");
            cardToDiscard.ui.addClass("discard");
        }
        force_repaint_deck(this);
    }

    deck.draw_top_card = function () {

        let cards_lines = this.draw_pile[0].starting_lines;
        let extra_lines = [];
        if (this.is_boss()) {
            let new_lines = [];
            cards_lines.forEach(function (line) {
                new_lines = new_lines.concat(special_to_lines(line, deck.special1, deck.special2));
            });
            cards_lines = new_lines;
            if (this.immunities) {
                extra_lines = extra_lines.concat(immunities_to_lines(this.immunities));
            }
            if (this.notes) {
                extra_lines = extra_lines.concat(notes_to_lines(this.notes));
            }
        }
        else {
            if (this.attributes) {
                extra_lines = extra_lines.concat(attributes_to_lines(this.attributes));
            }

        }

        this.draw_pile[0].paint_front_card(this.get_real_name(), cards_lines.concat(extra_lines), this.attack, this.move, this.range, this.level, this.health);
        force_repaint_deck(this);
    }

    deck.must_reshuffle = function () {
        if (!this.draw_pile.length) {
            return true;
        } else {
            if (do_shuffles && this.discard.length) {
                return this.discard[0].shuffle_next;
            }
        }
    }

    deck.set_stats_monster = function (stats) {
        this.attack = stats.attack;
        this.move = stats.move;
        this.range = stats.range;
        this.attributes = stats.attributes;
		this.health = stats.health;
    }

    deck.set_stats_boss = function (stats) {
        this.attack = stats.attack;
        this.move = stats.move;
        this.range = stats.range;
        this.special1 = stats.special1;
        this.special2 = stats.special2;
        this.immunities = stats.immunities;
        this.notes = stats.notes;
		this.health = stats.health;
    }

    deck.get_real_name = function () {
        return (this.name) ? this.name : this.class;
    }

    deck.is_boss = function () {
        return this.class === DECKS.Boss.class;
    }

    deck.set_card_piles = function (draw_pile, discard_pile) {
        for (let i = 0; i < draw_pile.length; i++) {
            this.draw_pile[i].shuffle_next = draw_pile[i].shuffle_next;
            this.draw_pile[i].initiative = draw_pile[i].initiative;
            this.draw_pile[i].starting_lines = draw_pile[i].starting_lines;
        }
        for (let i = 0; i < discard_pile.length; i++) {
            this.discard[i].shuffle_next = discard_pile[i].shuffle_next;
            this.discard[i].initiative = discard_pile[i].initiative;
            this.discard[i].starting_lines = discard_pile[i].starting_lines;
        }
    }

    write_to_storage(deck.name, JSON.stringify(deck));
    return deck;

}

function place_deck(deck, container) {
    for (let i = 0; i < deck.draw_pile.length; i++) {
        let card = deck.draw_pile[i];
        card.ui.attach(container);
    }
    for (let i = 0; i < deck.discard.length; i++) {
        let card = deck.discard[i];
        card.ui.attach(container);
    }
    deck.deck_space = container;
}

function force_repaint_deck(deck) {
    prevent_pull_animation(deck);
    let space = deck.deck_space;
    remove_child(space);
    place_deck(deck, space);
}

// This should be dynamic dependant on lines per card
function refresh_ui() {
    let actual_card_height = 296;
    let base_font_size = 26.6;

    let tableau = document.getElementById("tableau");
    let cards = tableau.getElementsByClassName("gl-card");
    for (let i = 1; i < cards.length; i++) {
        if (cards[i].className.indexOf("ability") !== -1) {
            let scale = cards[i].getBoundingClientRect().height / actual_card_height;
            let scaled_font_size = base_font_size * scale;

            let font_pixel_size = Math.min(scaled_font_size, base_font_size);
            tableau.style.fontSize = font_pixel_size + "px";
            break;
        }
    }
}

function reshuffle(deck, include_discards) {
    shuffle_deck(deck, include_discards);

    // This way we keep sync several decks from the same class
    visible_ability_decks.forEach(function (visible_deck) {
        if ((visible_deck !== deck) && (visible_deck.class === deck.class)) {
            let real_name = visible_deck.get_real_name();
            shuffle_deck(visible_deck, include_discards);
            visible_deck.set_card_piles(deck.draw_pile, deck.discard);
        }
    });
}

function shuffle_deck(deck, include_discards) {
    if (include_discards) {
        deck.draw_pile = deck.draw_pile.concat(deck.discard);
        deck.discard = [];
    }

    shuffle_list(deck.draw_pile);

    for (let i = 0; i < deck.draw_pile.length; i++) {
        let card = deck.draw_pile[i];

        card.ui.removeClass("lift");
        card.ui.removeClass("pull");

        card.ui.flip_up(false);

        card.ui.removeClass("discard");
        card.ui.addClass("draw");

        card.ui.set_depth(-i - 6);
    }
}

function flip_up_top_card(deck) {
    for (let i = 0; i < deck.discard.length; i++) {
        let cardToFlip = deck.discard[i];
        cardToFlip.ui.removeClass("lift");
        cardToFlip.ui.removeClass("pull");
        cardToFlip.ui.push_down();
    }

    if (deck.discard.length > 0) {
        deck.discard[0].ui.addClass("lift");
    }

    let card = deck.draw_pile.shift(card);
    send_to_discard(card, pull_animation = true);
    deck.discard.unshift(card);
}

function send_to_discard(card, pull_animation) {
    card.ui.set_depth(-3);

    if (pull_animation) {
        card.ui.addClass("pull");
    }

    card.ui.flip_up(true);

    card.ui.removeClass("draw");
    card.ui.addClass("discard");
}

function draw_ability_card(deck) {

    if (deck.must_reshuffle()) {
        reshuffle(deck, true);
    }
    else {
        visible_ability_decks.forEach(function (visible_deck) {
            if (visible_deck.class === deck.class) {
                visible_deck.draw_top_card();
                flip_up_top_card(visible_deck);
            }
        });
    }
    write_to_storage(deck.name, JSON.stringify(deck));
}

function prevent_pull_animation(deck) {
    if (deck.discard.length) {
        if (deck.discard[1]) {
            deck.discard[1].ui.removeClass("lift");
            deck.discard[0].ui.addClass("lift");
        }

        deck.discard[0].ui.removeClass("pull");
    }
}

function reshuffle_modifier_deck(deck) {
    deck.clean_discard_pile();
    reshuffle(deck, true);
    document.body.dispatchEvent(new CustomEvent(EVENT_NAMES.MODIFIER_DECK_SHUFFLE_REQUIRED, { detail: { shuffle: false } }));
}

function draw_modifier_card(deck) {
    deck.clean_advantage_deck();

    if (deck.must_reshuffle()) {
        reshuffle_modifier_deck(deck);
    }
    else {
        flip_up_top_card(deck);

        document.body.dispatchEvent(new CustomEvent(
            EVENT_NAMES.MODIFIER_CARD_DRAWN,
            {
                detail: {
                    card_type: deck.discard[0].card_type,
                    count: deck.count(deck.discard[0].card_type)
                }
            }));
        
        if (deck.shuffle_end_of_round())
        {
            document.body.dispatchEvent(new CustomEvent(EVENT_NAMES.MODIFIER_DECK_SHUFFLE_REQUIRED, { detail: { shuffle: true } }));
        }
    }
    write_to_storage("modifier_deck", JSON.stringify(deck));
}

function double_draw(deck) {
    let advantage_card;
    // Case there was 1 card in draw_pile when we clicked "draw 2".
    //    now we should draw, save that card, reshuffle, and
    //    draw the next
    if (deck.draw_pile.length === 1) {
        draw_modifier_card(deck);
        advantage_card = deck.discard[0];
        reshuffle_modifier_deck(deck);
        advantage_card = deck.draw_pile.shift(advantage_card);
        send_to_discard(advantage_card, pull_animation = false);
        deck.discard.unshift(advantage_card);
        draw_modifier_card(deck);
    }
    // Case there were 0 cards in draw_pile when we clicked "draw 2".
    //    we should reshuffle, draw 1 and send it to advantage_place,
    //    draw the next
    else if (deck.draw_pile.length === 0) {
        // This is in case the previous draw was double as well
        deck.clean_advantage_deck();
        reshuffle_modifier_deck(deck);
        draw_modifier_card(deck);
        advantage_card = deck.discard[0];
        draw_modifier_card(deck);
    }
    // Every other simple case
    else {
        draw_modifier_card(deck);
        advantage_card = deck.discard[0];
        draw_modifier_card(deck);
    }
    deck.discard[0].ui.addClass("right");
    advantage_card.ui.addClass("left");
    deck.advantage_to_clean = true;
}

function load_modifier_deck() {
    let deck =
        {
            name: "Monster modifier deck",
            type: DECK_TYPES.MODIFIER,
            draw_pile: [],
            discard: [],
            advantage_to_clean: false
        }

    deck.draw_top_discard = function() {
        if (this.discard.length > 0) {
            let card = this.discard[this.discard.length-1];
            card.ui.set_depth(-3);
            card.ui.addClass("pull");
            card.ui.flip_up(true);
            card.ui.removeClass("draw");
            card.ui.addClass("discard");
        }
        force_repaint_deck(this);
    }

    deck.count = function (card_type) {
        return (this.draw_pile.filter(function (card) {
            return card.card_type === card_type;
        }).length);
    }.bind(deck);

    deck.remove_card = function (card_type) {
        for (let i = 0; i < deck.draw_pile.length; i++) {
            if (deck.draw_pile[i].card_type === card_type) {
                deck.draw_pile.splice(i, 1);
                reshuffle(deck, false);

                force_repaint_deck(deck);
                break;
            }
        }
        write_to_storage("modifier_deck", JSON.stringify(modifier_deck));

        return this.count(card_type);
    }.bind(deck);

    deck.add_card = function (card_type) {
        // Rulebook p. 23: "a maximum of only 10 curse [and 10 bless] cards can be placed into any one deck"
        if (this.count(card_type) < 10) {
            // TOOD: Brittle
            deck.draw_pile.push(define_modifier_card(MODIFIER_CARDS[card_type.toUpperCase()]));

            force_repaint_deck(deck);
            reshuffle(deck, false);
        }
        write_to_storage("modifier_deck", JSON.stringify(modifier_deck));

        return this.count(card_type);
    }.bind(deck);

    deck.shuffle_end_of_round = function () {
        return this.discard.filter(function (card) {
                return card.shuffle_next_round;
            }).length > 0;
    }.bind(deck);

    deck.must_reshuffle = function () {
        return !this.draw_pile.length;
    }.bind(deck);

    deck.clean_discard_pile = function () {
        for (let i = 0; i < deck.discard.length; i++) {
            if (this.discard[i].card_type === CARD_TYPES_MODIFIER.BLESS
                || this.discard[i].card_type === CARD_TYPES_MODIFIER.CURSE) {
                //Delete this curse/bless that has been used
                this.discard.splice(i, 1);
                i--;
            }
        }

        // This is needed every time we update
        force_repaint_deck(this);
    }.bind(deck);

    deck.clean_advantage_deck = function () {
        if ((deck.advantage_to_clean) && deck.discard[1]) {
            deck.advantage_to_clean = false;
            deck.discard[0].ui.removeClass("right");
            deck.discard[0].ui.removeClass("left");
            deck.discard[1].ui.removeClass("left");
            deck.discard[1].ui.removeClass("left");
        }
    }.bind(deck);
    let loaded_deck = JSON.parse(get_from_storage("modifier_deck"));

    MODIFIER_DECK.forEach(function (card_definition) {
        let card = define_modifier_card(card_definition);
        if (loaded_deck && find_in_discard_and_remove(loaded_deck.discard,card.card_type)) {
            deck.discard.push(card);
        } else {
            deck.draw_pile.push(card);
        }
    });

    return deck;
}

function find_in_discard_and_remove(discard, card_type) {
    for (let i=0; i < discard.length; i++) {
        if (discard[i].card_type === card_type) {
            return discard.splice(i,1);
        }
    }
    return null;
}

function create_modifier_card_back() {
    let card = document.createElement("div");
    card.className = "gl-card modifier back";

    return card;
}

function create_modifier_card_front(card_url) {
    let img = document.createElement("img");
    img.className = "cover";
    img.src = card_url;

    let card = document.createElement("div");
    card.className = "gl-card modifier front";
    card.appendChild(img);

    return card;
}

function define_modifier_card(card_definition) {
    let card_front = create_modifier_card_front(card_definition.image);
    let card_back = create_modifier_card_back();

    let card = {
        ui: new UICard(card_front, card_back),
        card_type: card_definition.type,
        shuffle_next_round: card_definition.shuffle
    };

    return card;
}

function end_round() {
    if (modifier_deck.shuffle_end_of_round()) {
        modifier_deck.clean_advantage_deck();
        reshuffle_modifier_deck(modifier_deck);
    }
    write_to_storage("modifier_deck", JSON.stringify(modifier_deck));
}

function load_definition(card_database) {
    let decks = {};
    for (let i = 0; i < card_database.length; i++) {
        let definition = card_database[i];
        decks[definition.class] = definition;
    }

    return decks;
}


function LevelSelector(text, inline) {
    var max_level = 7;
    var level = {};
    level.html = inline ? document.createElement("span") : document.createElement("ul");
    level.html.className = "selectionlist";

    var listitem = inline ? document.createElement("label") : document.createElement("li");
    listitem.innerText = text;
    level.html.appendChild(listitem);

    var level_spinner = create_input("number", "scenario_number", "1", "");
    level_spinner.input.min = 0;
    level_spinner.input.max = max_level;
    level.html.appendChild(level_spinner.input);
    level.spinner = level_spinner.input;

    level.get_selection = function () {
        return (this.spinner.value > max_level) ? max_level : this.spinner.value;
    }

    level.set_value = function (value) {
        this.spinner.value = (value > max_level) ? max_level : value;
    }

    return level;
}

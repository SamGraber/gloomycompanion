declare var create_input;

class LevelSelector {
    html;
    spinner;
    private max_level = 7;
    
    constructor(text, inline) {
        this.html = inline ? document.createElement("span") : document.createElement("ul");
        this.html.className = "selectionlist";
    
        var listitem = inline ? document.createElement("label") : document.createElement("li");
        listitem.innerText = text;
        this.html.appendChild(listitem);
    
        var level_spinner = create_input("number", "scenario_number", "1", "");
        level_spinner.input.min = 0;
        level_spinner.input.max = this.max_level;
        this.html.appendChild(level_spinner.input);
        this.spinner = level_spinner.input;
    }
    
    get_selection() {
        return (this.spinner.value > this.max_level) ? this.max_level : this.spinner.value;
    }

    set_value(value) {
        this.spinner.value = (value > this.max_level) ? this.max_level : value;
    }
}

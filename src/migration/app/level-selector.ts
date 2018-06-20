class LevelSelector {
    html: HTMLElement;
    spinner: HTMLInputElement;
    private max_level = 7;
    
    constructor(text: string, inline: boolean) {
        this.html = inline ? document.createElement("span") : document.createElement("ul");
        this.html.className = "selectionlist";
    
        const listitem = inline ? document.createElement("label") : document.createElement("li");
        listitem.innerText = text;
        this.html.appendChild(listitem);
    
        const level_spinner = create_input("number", "scenario_number", "1", "") as any;
        level_spinner.input.min = 0;
        level_spinner.input.max = this.max_level;
        this.html.appendChild(level_spinner.input);
        this.spinner = level_spinner.input;
    }
    
    get_selection() {
        return (+this.spinner.value > this.max_level) ? this.max_level : this.spinner.value;
    }

    set_value(value: number) {
        this.spinner.value = ((value > this.max_level) ? this.max_level : value).toString();
    }
}

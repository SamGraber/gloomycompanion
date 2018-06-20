

window.activate_tab = function(tabs, pages, activetab)
{
    for (key in tabs)
    {
        tabs[key].className = (key == activetab) ? "" : "inactive";
    }
    for (key in pages)
    {
        pages[key].className = (key == activetab) ? "tabbody" : "inactive tabbody";
    }
}

window.show_settingspane = function(pane, cancelarea, show)
{
    pane.className = show ? "pane" : "pane inactive";
    cancelarea.style.display = show ? "initial" : "none";
}

window.init_ui = function()
{
    var tabs =
    {
        scenarios:      document.getElementById("scenariotab"),
        decks:          document.getElementById("deckstab")
    };
    var pages =
    {
        scenarios:      document.getElementById("scenariospage"),
        decks:          document.getElementById("deckspage")
    };

    settingspane =      document.getElementById("settingspane");
    settingsbtn =       document.getElementById("settingsbtn");
    cancelarea =        document.getElementById("cancelarea");

    scenariotab.onclick = function(e)
    {
        activate_tab(tabs, pages, "scenarios");
    }

    deckstab.onclick = function(e)
    {
        activate_tab(tabs, pages, "decks");
    }

    settingsbtn.onclick = function(e)
    {
        show_settingspane(settingspane, cancelarea, true);
    }

    cancelarea.onclick = function(e)
    {
        show_settingspane(settingspane, cancelarea, false);
    }

    activate_tab(tabs, pages, "scenarios");
	
}


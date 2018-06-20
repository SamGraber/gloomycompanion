
window.show_settingspane = function(pane, cancelarea, show)
{
    pane.className = show ? "pane" : "pane inactive";
    cancelarea.style.display = show ? "initial" : "none";
}

window.init_ui = function()
{
    settingspane =      document.getElementById("settingspane");
    settingsbtn =       document.getElementById("settingsbtn");
    cancelarea =        document.getElementById("cancelarea");

    settingsbtn.onclick = function(e)
    {
        show_settingspane(settingspane, cancelarea, true);
    }

    cancelarea.onclick = function(e)
    {
        show_settingspane(settingspane, cancelarea, false);
    }

}


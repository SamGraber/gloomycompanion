
window.shuffle_list = function(l)
{
    for (var i = 0; i < l.length-1; i++)
    {
        // Based on https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Implementation_errors
        var switch_index = i + Math.floor(Math.random() * (l.length - i));
        var tmp = l[switch_index];
        l[switch_index] = l[i];
        l[i] = tmp;
    }
}

window.toggle_class = function(element, class_name, enable_class)
{
    if (enable_class)
    {
        element.classList.add(class_name);
    }
    else
    {
        element.classList.remove(class_name);
    }
}

window.remove_child = function(myNode)
{
    while (myNode.firstChild)
    {
        myNode.removeChild(myNode.firstChild);
    }
}

window.create_input = function(type, name, value, text)
{
    var input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.value = value;
    
    var textnode = document.createElement("span");
    textnode.innerHTML = text;

    var label = document.createElement("label");
    label.appendChild(input);
    label.appendChild(textnode);

    return {'root': label, 'input': input};
}

window.create_button = function(type, id, value)
{
    var button = document.createElement("button");
    button.type = type;
    button.className = "waves-effect waves-light btn";
    button.id = id;
    button.innerHTML = value;

    return button;
}

window.dict_values = function(dict)
{
    var values = [];
    for (key in dict) {
        values.push(dict[key]);
    }
    
    return values;
}

window.concat_arrays = function(arrays)
{
    return Array.prototype.concat.apply([], arrays);
}

window.is_checked = function(input)
{
    return (('checked' in input) ? input.checked : false);
}

window.input_value = function(input)
{
    return (('value' in input) ? input.value : '');
}

window.remove_empty_strings = function(array)
{
    return array.filter(Boolean);
}

window.write_to_storage = function(name, value) {
    localStorage.setItem(name, value);
    console.log("Wrote " + name + " to local storage, with value: " + value);
}

window.get_from_storage = function(name) {
    return localStorage.getItem(name);
}

window.find_in_discard = function(discard, id) {
    for (var i=0; i < discard.length; i++) {
        if (discard[i].id === id) {
            return discard[i];
        }
    }
    return null;
}

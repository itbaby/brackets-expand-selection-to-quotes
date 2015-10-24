define(function(require,exports,module){
   var AppInit = brackets.gtModule('utils/AppInit'),
       KeyBindingManager = brackets.getModule('command/KeyBindingManager'),
       CommandManager = brackets.getModule('command/CommandManager'),
       EditorManager = brackets.getModule('editor/EditorManager');
    var EXPAND_SELECTION_TO_QUOTES = 'Expand selection to quotes',
        CMD_SELECT_TO_QUOTES = 'quotes.select';
    function selectBetweenQutoes(){
        var editor = EditorManager.getFocusedEditor();
        var pos    = editor.getCursorPos(),
            document = editor.document,
            line     = document.getLine(pos.line);
        var begin = line.substring(0,pos.ch),
            end   = line.substr(pos.ch),
            s     = begin.lastIndexOf("'"),
            d     = end.indexOf('"');
        begin = s > d ? s : d;
        end   = s > d ? end.indexOf("'"): end.indexOf('"');
        editor.setSelection({
            line:pos.line,
            ch: begin+1

        },{
            line:pos.line,
            ch: end + pos.ch
        });


    }
    CommandManager.register(
        EXPAND_SELECTION_TO_QUOTES,
        CMD_SELECT_TO_QUOTES,
        selectBetweenQutoes
    );
    KeyBindingManager.addBinding(CMD_SELECT_TO_QUOTES,"Ctrl-'",'mac');
});

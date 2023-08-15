const vscode = require('vscode');
const getDataFromOPENAI = require("./getDataFromOPENAI");


function activate(context) {
    let disposable = vscode.commands.registerCommand('codewithai.getAIresponse',async function () {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const selection = editor.selection;
            let selectedText = editor.document.getText(selection);

            if (!selectedText) {
                selectedText="";
            }

            const inputText = await vscode.window.showInputBox({
                prompt: 'Enter some text',
                placeHolder: 'Type here...'
              });

          let prompt= selectedText +"\n\n"+ inputText;
          let newText=selectedText;
        const response = await getDataFromOPENAI(prompt);
        newText=response.text;

        editor.edit(editBuilder => {
                    editBuilder.replace(selection, newText);
                });




        }else{
            vscode.window.showErrorMessage('There is no active editor');
        }
    });

    context.subscriptions.push(disposable);
}
function deactivate() { }

module.exports = {
    activate,
    deactivate
};

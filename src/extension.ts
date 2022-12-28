import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let readWarnings = vscode.commands.registerCommand('warningsreader.readWarnings', async () => {
		const translate = require("translate");
		const say = require("say");
		translate.engine = "google";
		translate.key = process.env.GOOGLE_KEY;
		let diagnostics = vscode.languages.getDiagnostics();
		let warnings = diagnostics[0][1];
		if (warnings.length!=0) {
			let infos_string = "";
			warnings.forEach(function (value) {
				let info = value.message.replace(/["]/g,'');
				infos_string = infos_string + "   " + info; 
			}); 
			let trans_text = await translate(infos_string, "pt");
			say.speak(trans_text);
		}
		else{
			say.speak("Não há avisos ou erros")
		}
	});

	context.subscriptions.push(readWarnings);
}

// This method is called when your extension is deactivated
export function deactivate() {}

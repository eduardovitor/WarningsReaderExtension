import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let readWarnings = vscode.commands.registerCommand('warningsreader.readWarnings', () => {
		// const translate = require("translate");
		// let trans_text = await translate(infos_string, "pt");
		const say = require("say");
		// translate.engine = "google";
		// translate.key = process.env.GOOGLE_KEY;
		let diagnostics = vscode.languages.getDiagnostics();
		let warnings = diagnostics[0][1];
		if (warnings.length!=0){
			let infos_string = "";
			warnings.forEach(function (value) {
				let info=value.message.replace(/["]/g,'');
				infos_string = infos_string + "   " + info; 
			}); 
			say.speak(infos_string);
		}
		else{
			say.speak("There are no warnings");
		}
	});

	context.subscriptions.push(readWarnings);
}

// This method is called when your extension is deactivated
export function deactivate() {}

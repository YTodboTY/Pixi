//Pixi is a web based Desktop Environment that works with plain HTML/CSS and Vanilla JavaScript
var blur = document.querySelector(".blurOver"); //On start pixi Logo
var fs = new window.FileSystem('root');
fs.mkdir('apps');fs.mkdir('documents');

function main() {
    //Prevents default option when right click, shows or hides toolbar instead
    if (document.addEventListener) {
        document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
      }, false);
    } else {
        document.attachEvent('oncontextmenu', function() {
        window.event.returnValue = false;
      });
    }
    //Fade-Blur the onStart pixi logo
    setTimeout(function (){ blur.parentNode.removeChild(blur); }, 4000);
}

/*Test app installation
var app = {
    name : 'generic',
    desc : 'generic app',
    code : "<script>alert('Hello world')</script>"
}; installApp(app.name, app.desc, app.code);
*/

//terminal app installation
function insertTerminal(){
    var terminal = new Terminal(); //Virtual terminal
    var currentDir = "$";
    var terminalSymbol = "# ";

    function stringFormatting(inputToProcess){
        const splittedString = inputToProcess.split(" ");
        return splittedString
    }

    
    function terminalRecursion () { //Terminal loop with some custom commands
        terminal.input('', function (input) {

            var formatedInput = stringFormatting(input);

            if (formatedInput[0] === 'print' || formatedInput[0] === 'sudo'){
                terminal.print('> A hacker huh? I love Linux too!!');
                terminal.beep();
                terminalRecursion();
            } else if (formatedInput[0] === 'run') {
                terminal.input(terminalSymbol+'Which app would you like to open?', function(app){
                    try {
                        if (app.toString() === 'terminal') {
                            terminal.print(currentDir+terminalSymbol+'Cannnot run more than one terminal instance');
                        } else {
                            launchApp(app.toString());
                            terminal.print(currentDir+terminalSymbol+app.toString()+' is running...');
                        }
                    } catch {
                        terminal.print(currentDir+terminalSymbol+'No such app in disk!');
                    }
                    terminalRecursion();
                })
            } else if (formatedInput[0] === 'cd') {
                if (formatedInput[1] === "..") {
                        fs.cd("/");
                        currentDir = "$";
                        terminal.print(currentDir+terminalSymbol);
                        terminalRecursion();
                } else {
                        fs.cd(formatedInput[1]);
                        currentDir = formatedInput[1];
                        terminal.print(currentDir+terminalSymbol);
                        terminalRecursion();
                }
            } else if (input === 'rm') {
                terminal.input(terminalSymbol+'type a directory or file to remove it', function(dir){
                    if (dir.toString() === "apps" || dir.toString() === "/") {
                        terminal.print(currentDir+terminalSymbol+"Cannot remove system directory");
                    } else {
                        if (fs.rm(dir.toString()) === true) {
                            terminal.print(currentDir+terminalSymbol+"Done!");
                        } else {
                            terminal.print(currentDir+terminalSymbol+"Not such file or name in disk!");
                        }
                    }
                    terminalRecursion();
                })
            } else if (input === 'applist') {
                fs.cd('apps');
                terminal.print(fs.ls());
                fs.cd('/');
                terminalRecursion();
            } else if (input === 'reset') {
                terminal.confirm(terminalSymbol+'Will erase ALL of your data. Are you sure you want to continue? ', function(bool){
                    if (bool === true) {
                        history.go(0);
                    } else {
                        terminal.print(currentDir+terminalSymbol+"Aborted!");
                        terminalRecursion();
                    }
                })
            } else if (input === 'ls') {
                terminal.print(fs.ls());
                terminalRecursion();
            } else if (input === 'help') {
                terminal.print(terminalSymbol+"Commands: 'cd' 'ls' 'rm' 'run' 'clear' 'applist' 'removeapp' 'exit' ")
                terminalRecursion();
            } else if (input === 'clear') {
                terminal.clear();
                terminalRecursion();
            } else if (input === 'exit') {
                var currentTerminal = document.getElementById('terminalthis');
                removeActiveApp(currentTerminal.id);
                currentTerminal.removeAttribute('id');
                currentTerminal.parentNode.removeChild(currentTerminal);
            } else if (input === 'removeapp') {
                terminal.input(terminalSymbol+'Which app do you want to uninstall?', function(app){
                    uninstallApp(app.toString());
                    terminal.print(terminalSymbol);
                    terminalRecursion();
                })
            } else if (input === '') {
                terminal.print('');
                terminalRecursion();
            } else {
                terminal.print(currentDir+terminalSymbol+'Not a command :(');
                terminalRecursion();
            };
        });
    };

    var t1 = document.getElementById('terminalthis'); //Terminal element instance in the DOM
    terminal.setHeight('256px');
    terminal.setTextSize('16px');
    terminal.setTextColor('white');
    terminal.setBackgroundColor('black');
    terminalRecursion();

    t1.appendChild(terminal.html);
    t1.style.textAlign = 'left';
    t1.style.paddingTop = '0px';
}

var terminalApp = {
    name : 'terminal',
    desc : 'official pixi terminal',
    code : "<html><head></head><body><div id ='myTerminal'></div><script>parent.insertTerminal();</script></body></html>"
};installApp('terminal', terminalApp.desc, terminalApp.code);

//text editor app installation
var texteditorApp = {
    name : 'texteditor',
    desc : 'official pixi text editor',
    code : "<html><head><link type='text/css' rel='Stylesheet' href='app.css' /> <style> #app{  user-select: none; font-family: Monserrat !important; background-color: white; } #header{ margin: 48px; height: 16px; font-size: 2rem;} #content{padding: 1.3rem; padding-right:16px; margin-top:32px; height:100% !important; outline: 0; font-size: 1.1rem;} </style> </head><body><div id='app'></div><div id ='content'></div><script> var content = document.getElementById('content'); content.setAttribute('contenteditable', 'true'); content.focus();</script></body></html>"
};installApp('texteditor', texteditorApp.desc, texteditorApp.code);

//files app installation
var filesApp = {
    name : 'files',
    desc : 'official pixi file manager',
    code : "<html> <head> <link type='text/css' rel='Stylesheet' href='app.css' /> <style> #app{  user-select: none; font-family: Monserrat !important; background-color: white !important; } #header{margin: 40px; height: 16px; font-size: 2rem;} .filesappcontent{background-color: white !important;} .filesIcon{float: left !important; margin: 38px; width: 64px; height: 64px; border-radius: 12px; background-color: #fc2; text-align: center; font-weight: bold; color: black !important;} </style></head> <body><div id='app'> <div id='header'><strong>Files</strong></div><div id='filesappcontent'></div></div><script> var files=['apps', 'docs', 'images', 'videos']; function loadIcons(){ var arr=files; var content=document.getElementById('filesappcontent'); for (i=0; i < arr.length; i +=1){var icon=document.createElement('div'); icon.classList.add('filesIcon'); var label=document.createElement('p'); label.style.paddingTop='62px'; label.textContent=arr[i]; icon.appendChild(label); content.appendChild(icon);} } loadIcons(); if (document.addEventListener){document.addEventListener('contextmenu', function(e){e.preventDefault();}, false);}else{document.attachEvent('oncontextmenu', function(){window.event.returnValue=false;});};</script></body></html>"
};installApp('files', filesApp.desc, filesApp.code);
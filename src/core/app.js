//Managing active window apps
var activeApps = []
  
function iterateArray(arr) {
  for (i = 0; i < arr.length; i += 1) {
    console.log(arr[i]);
  }
}
 
function iterateArrayForValidation(arr, app) { //Iterates apps to see which is running currently
  for (i = 0; i < arr.length; i += 1) {
    if (arr[i] === app+"this") {
      return true
    }
  }
}

function saveActiveApp(app) { //Push app to the active apps
  activeApps.push(app);
}

function removeActiveApp(app) { //Removes app from active apps
  activeApps = activeApps.filter((e) => e !== app);
}

//Managing apps
  function installApp(name, details, html) {
    var currentPath = name+".json";
    var app = {
      title: name,
      description: details,
      code : html
    }
    fs.write("apps/"+currentPath, app);
  }
  
  function uninstallApp(name){
    fs.rm("../apps/"+name+".json");
  }
  
function launchApp(name){
    if (iterateArrayForValidation(activeApps, name) === undefined) { //Iterates an array to know if a window is already active
      saveActiveApp(name+"this") //Added 'this' at the end to avoid naming conflicts with some icon name ids
      const app = fs.read("../apps/"+name+".json");
      const myWindow = document.createElement("div");
      var content = document.createElement("iframe")

      //Code that depends on app
      if (name === "terminal") { //If app is terminal, set it to black. Themes are a work in progress...
        myWindow.style.backgroundColor = "black";
        setTimeout(function(){ content.style.marginTop = "-264px"; content.style.paddingTop = "-128px"; }, 10);
      } else if (name === "texteditor") {
        myWindow.style.backgroundColor = "white";
      }

      myWindow.setAttribute("id", name+"this");
      myWindow.setAttribute("class", "windowGUI");
      content.srcdoc = app.code;
      
      content.style.width = "100%";
      content.style.height = "100%";
      content.style.borderWidth = "0px";
      myWindow.append(content);
      document.body.appendChild(myWindow);
      myWindow.style.opacity = "0";
      setTimeout(function(){ myWindow.style.opacity = "1"; myWindow.style.transform = "translateY(20px)"; }, 1)
      setTimeout(function(){ myWindow.style.opacity = "1"; myWindow.style.transform = "translateY(0px)"; }, 100)
      core.util.DRS.makeDRS(myWindow, 'top');
  } else {
      console.log("There is an active window already")
  }
}

  function appDetails(name) {
    var path = "apps/"+name+".json";
    const app = fs.read(path);
    console.log("app: "+name+"\ndetails: "+app.description+"\nsize: "+fs.size(path)+" bytes");
  }
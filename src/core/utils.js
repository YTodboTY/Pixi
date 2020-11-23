var diskSpace = localStorage.getItem('size') +"Kb" || 0;
//Append objects to array
function appendObjTo(thatArray, newObj) {
    const frozenObj = Object.freeze(newObj);
    return Object.freeze(thatArray.concat(frozenObj));
}
    //this script is to find the size of localStorage 
    function func1(num)  
    { 
        return new Array((num * 1024) + 1).join('a') 
    } 
    // Determine the size of localStorage if it's not set 
    if (!localStorage.getItem('size')) { 
    var i = 0; 
    try { 
        // Test up to 10 MB 
        for (i = 0; i <= 10000; i += 250) { 
            localStorage.setItem('test', func1(i)); 
        } 
        } catch (e) { 
        localStorage.removeItem('test'); 
        localStorage.setItem('size', i ? i - 250 : 0); 
        } 
    }
// when window is loaded this function is 
// called and the size of localStorage is calculated     
function availableDiskSpace(){  
    console.log(diskSpace); 
} 

function spaceUsed() {
    var iterationsData;
    var result;
    var _lsTotal = 0,
        _xLen, _x;
    for (_x in localStorage) {
        if (!localStorage.hasOwnProperty(_x)) {
            continue;
        }
        _xLen = ((localStorage[_x].length + _x.length) * 2);
        _lsTotal += _xLen;
        console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
    };
    console.log("Total used = " + (_lsTotal / 1024).toFixed(2) + " KB");
}
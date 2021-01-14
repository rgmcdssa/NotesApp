var databaseMap = []; 
var entityMaster = [];
function setUpMap() {
  var d=Object.getOwnPropertyNames(database); 
  for (var i=1; i<d.length; i++) {
    databaseMap[d[i]]=(new Map());
  }
  var counter = 0; 
  for (var i=1; i<d.length; i++) {
    for (counter=0; counter<database[d[i]].length; counter++) {
      databaseMap[d[i]].set('' + database[d[i]][counter][0],{id: counter});
      entityMaster.push(database[d[i]][counter][0]);
    }
  }
}

function setUpDatabase() {
  var d=Object.getOwnPropertyNames(database); 
  for (var i=1; i<d.length; i++) {
   database[d[i]] = database[d[i]].split(';');
    for (var j=0; j<database[d[i]].length; j++) {
      database[d[i]][j] = database[d[i]][j].split('^');
    }
  }
}

function pageLoad() {
  setUpDatabase();
  setUpMap(); 
}

function updateSearchbox() {
  //value to find
  var s = document.getElementById("searchBox").value; 
  if (s == "" || s.length < 4) {
    return false; 
  }
  console.log(s);
  var holder = [];
  for (var i=0; i<entityMaster.length; i++) {
    if (entityMaster[i].includes(s)) {
      holder.push(entityMaster[i]);
    }
  }
  //First clear clickables. 
  var k = document.getElementById('resultArea'); 
  document.getElementById('activeEntityLabel').textContent = "";
  k.innerHTML = "";
  
  //Now update values. 
  for (var i = 0; i < holder.length; i++){
    var element = document.createElement("a");
    element.id = holder[i];
    element.setAttribute('onclick',"setActiveEntity('"+holder[i] +"')");
    element.textContent = holder[i];
    k.append(element);
  }
  
  return true; 
}

var activeEntity = "";
function setActiveEntity(arg)  {
  console.log(arg);
  activeEntity = arg;  
  document.getElementById('activeEntityLabel').textContent = "searching: " + activeEntity;
}

function showContent(field) {
  if (databaseMap[field].has(activeEntity) && activeEntity != "") {
  var id = databaseMap[field].get(activeEntity).id;
  for (var j=1; j<database[field][id].length; j++) {
    document.getElementById("infoArea").innerHTML += (database[field][id][j] + "<br/><br/>");
  }
  }
  else if (activeEntity == "") {
    alert('Please enter a name into the search bar.');
  }
  else {
    alert('No entity by that name!');
  }
}


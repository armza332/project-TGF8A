function getDataSheet() {
var ss = SpreadsheetApp.openById('1gQqUnLaUSxrPd-NFsHEX-RK2z0FG4yYVYmzYa3S78Ck').getActiveSheet()
var data= ss.getDataRange().getDisplayValues()
data.shift()
return data   
}

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}

function doGet(e) {
    if(!e.parameter.page){
      var htmlOutput =HtmlService.createTemplateFromFile('INDEX')
   return htmlOutput.evaluate()
}

 return HtmlService.createTemplateFromFile(e.parameter['page']).evaluate()
 }

function getUrl(){
  var url = ScriptApp.getService().getUrl()
  return url
}


function getSheetData()  { 
  var ss= SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = ss.getSheetByName('Floor1'); 
  var dataRange = dataSheet.getDataRange();
  var dataValues = dataRange.getValues();
   console.log(dataValues)  
  return dataValues;

}
var SCRIPT_PROP = PropertiesService.getScriptProperties();
var sheetID= '1gQqUnLaUSxrPd-NFsHEX-RK2z0FG4yYVYmzYa3S78Ck'
function setup() {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    SCRIPT_PROP.setProperty(sheetID, doc.getId());
}

function uploadFile(data, file,id,stdCode,firstname,lastname,address,tel,email) {
try {
    var folder=DriveApp.getFolderById('1LD4cSie98O06DHNmKvZYRpbWz-9z-52W');
    var contentType = data.substring(5,data.indexOf(';')),
        bytes = Utilities.base64Decode(data.substr(data.indexOf('base64,')+7)),
        blob = Utilities.newBlob(bytes, contentType, file),
      file = folder.createFolder([firstname+lastname+new Date()]).createFile(blob),
        filelid =file.getId() ;
        image = 'https://drive.google.com/uc?id='+filelid
    var lock = LockService.getPublicLock();
        lock.waitLock(30000);    
    var doc = SpreadsheetApp.openById(sheetID);
    var sheet = doc.getSheetByName("DataCheckFE");
    var row = [new Date,id,stdCode,firstname,lastname,address,"'"+tel,email,image];

  sheet.appendRow(row)
    return "OK";
   } catch (f) {
    return f.toString();
  } finally {
    lock.releaseLock();
  }
}

//search

function processForm(formObject){  
  var result = "";
  if(formObject.searchtext){
      result = search(formObject.searchtext);
  }
  return result;
}

function search(searchtext){
  var spreadsheetId = '1gQqUnLaUSxrPd-NFsHEX-RK2z0FG4yYVYmzYa3S78Ck';
  var dataRage  = 'DataCheckFE!A2:O';
  var data = Sheets.Spreadsheets.Values.get(spreadsheetId, dataRage).values;
  var ar = [];
  
  data.forEach(function(f) {
    if (~f.indexOf(searchtext)) {
      ar.push(f);
    }
  });
  return ar;
}




var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1gQqUnLaUSxrPd-NFsHEX-RK2z0FG4yYVYmzYa3S78Ck/edit#gid=920005111");
var sheet = ss.getSheetByName("Web");

function searchWeb(feId){
 var id = feId;
  
  var values = sheet.getRange(2, 1, sheet.getLastRow(),sheet.getLastColumn()).getValues();
  
  for(var i = 0;i<values.length; i++){
    
    if(values[i][0] == id ){
      i=i+2;
      
      var name = sheet.getRange(i,2).getValue();
      return ContentService.createTextOutput(name).setMimeType(ContentService.MimeType.TEXT);
    }
  }
  return ContentService.createTextOutput("Id not found").setMimeType(ContentService.MimeType.TEXT);
  
}














function dataImage(user){
  var datasheetrow = (user)
  var sheetnamerow= ['PIC','FE']
  for(var i in sheetnamerow){
var ss = SpreadsheetApp.openById('1gQqUnLaUSxrPd-NFsHEX-RK2z0FG4yYVYmzYa3S78Ck').getSheetByName(sheetnamerow[i])
var datarow = ss.getDataRange().getDisplayValues().filter(row=> {
  return row[0] == datasheetrow

})
  var image = datarow[0][3]
  return image
  
}
}

function dataName(){
  var datasheetrow = "FE-A-24"
  var sheetnamerow= ['PIC','FE']
  for(var i in sheetnamerow){
var ss = SpreadsheetApp.openById('1gQqUnLaUSxrPd-NFsHEX-RK2z0FG4yYVYmzYa3S78Ck').getSheetByName(sheetnamerow[i])
var datarow = ss.getDataRange().getDisplayValues().filter(row=> {
  return row[0] == datasheetrow

})
  var name = datarow[0][2]
  return name
  
}
}

function dataBadge(){
  var datasheetrow = "FE-A-24"
  var sheetnamerow= ['PIC','FE']
  for(var i in sheetnamerow){
var ss = SpreadsheetApp.openById('1gQqUnLaUSxrPd-NFsHEX-RK2z0FG4yYVYmzYa3S78Ck').getSheetByName(sheetnamerow[i])
var datarow = ss.getDataRange().getDisplayValues().filter(row=> {
  return row[0] == datasheetrow

})
  var badgeNo = datarow[0][4]
  return badgeNo
  
}
}

function dataTel(){
  var datasheetrow = "FE-A-24"
  var sheetnamerow= ['PIC','Floor1']
  for(var i in sheetnamerow){
var ss = SpreadsheetApp.openById('1gQqUnLaUSxrPd-NFsHEX-RK2z0FG4yYVYmzYa3S78Ck').getSheetByName(sheetnamerow[i])
var datarow = ss.getDataRange().getDisplayValues().filter(row=> {
  return row[0] == datasheetrow

})
  var tel = datarow[0][5]
  return tel
  
}
}

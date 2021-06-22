function doGet(request){
  var hs =HtmlService.createTemplateFromFile('PIC');
  hs.data = getRow(request.parameter.row);
  return hs.evaluate();
}

function getRow(r){
  var numColumns = 7;
  return SpreadsheetApp.openById('1gQqUnLaUSxrPd-NFsHEX-RK2z0FG4yYVYmzYa3S78Ck').getSheets()[1].getRange(r,1,1,numColumns).getValues()[0];
}

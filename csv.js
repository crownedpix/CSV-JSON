// Compiled in Quantelas
function CSVToArray(strData, strDelimiter) {
    strDelimiter = (strDelimiter || ",");
    var objPattern = new RegExp((
        "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
        "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
    var arrData = [
        []
    ];
    var arrMatches = null;
    while (arrMatches = objPattern.exec(strData)) {
        var strMatchedDelimiter = arrMatches[1];
        if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
            arrData.push([]);
        }
        if (arrMatches[2]) {
            var strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"), "\"");
        } else {
            var strMatchedValue = arrMatches[3];
        }
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    return (arrData);
}

remainingKeys = {};
var s1 = document.getElementById('jsonSrc');
var s2 = document.getElementById('jsonMix');

function select_scroll_1(e) { s2.scrollTop = s1.scrollTop; }

function select_scroll_2(e) { s1.scrollTop = s2.scrollTop; }

s1.addEventListener('scroll', select_scroll_1, false);
s2.addEventListener('scroll', select_scroll_2, false);

function CSV2JSON(csv) {
    var array = CSVToArray(csv);
    ExtData = $("#jsonEng").val();
    var existingJson = JSON.parse(ExtData);
    console.log(ExtData);
    var newCsvArray = {};
    var finalArray = {};

    reexistingJson = {};
    Object.keys(existingJson).sort().forEach(function(key) {
        reexistingJson[key] = existingJson[key];
    });
    $("#jsonSrc").val(JSON.stringify(reexistingJson, undefined, 4));

    var remainingArray = {};
    for (var i = 0; i < array.length; i++) {
        newCsvArray[[array[i][0]]] = array[i][1] + '';
    }

    var notfound = true;
    for (name in existingJson) {
        for (nameComp in newCsvArray) {
            if (existingJson[name] == nameComp) {
                finalArray[name] = newCsvArray[nameComp];
            }
        }

    }

    for (name in existingJson) {
        if (!finalArray.hasOwnProperty(name)) {
            remainingArray[name] = existingJson[name]
        }
    }

    $("#jsonRem").val(JSON.stringify(remainingArray, undefined, 4));

    var output = $.extend(finalArray, remainingArray);

    finalout = {};
    Object.keys(output).sort().forEach(function(key) {
        finalout[key] = output[key];
    });
    // $("#").val(JSON.stringify(output));
    $("#json").val(JSON.stringify(finalArray, undefined, 4))
    var json = JSON.stringify(finalout, undefined, 4);
    return json;
}
$("#convert").click(function() {
    var csv = $("#csv").val();
    var json = CSV2JSON(csv);
    $("#jsonMix").val(json);

});

$("#download").click(function() {
    var csv = $("#csv").val();
    var json = CSV2JSON(csv);
    // window.open("data:text/json;charset=utf-8," + escape(json))
    var fileName = 'final.json';

    // Create a blob of the data
    var fileToSave = new Blob([json], {
        type: 'application/json',
        name: fileName
    });

    // Save the file
    saveAs(fileToSave, fileName);
});
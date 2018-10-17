function deleteNote(){

}

function saveNote(){
    document.getElementsByTagName('textarea')[0].value ='not yet';
}

//temporario
function clearCanvas(){
    document.getElementsByTagName('textarea')[0].value = '';
}


//their stuff
function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS DEMO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data, extra)');
    tx.executeSql('INSERT INTO DEMO (id, data, extra) VALUES (1, "First row", 12)');
    tx.executeSql('INSERT INTO DEMO (id, data, extra) VALUES (2, "second row", 23)');
    tx.executeSql('INSERT INTO DEMO (id, data, extra) VALUES (3, "third row", 34)');
    tx.executeSql('INSERT INTO DEMO (id, data, extra) VALUES (4, "fourth row", 45)');
    tx.executeSql('SELECT * FROM DEMO', [], querySuccess2, errorCB2);

}

function errorCB(err) {
   alert("Error processing SQL: "+err);
}

function errorCB2(err) {
    alert("Erro no select: "+err);
 }

function successCB() {
   alert("successoooo!");
}

function querySuccess2(tx, results){
    //console.log("Insert ID = " + results.rows);

    for(var i = 0; i < results.rows.length; i++){
        console.log("extra: "+ results.rows.item(i).extra+ " data: " + results.rows.item(i).data);

    }
}

var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
db.transaction(populateDB, errorCB, successCB);


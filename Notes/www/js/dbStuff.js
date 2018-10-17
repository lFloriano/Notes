var db;

function initializeDb(){
    db = window.openDatabase('dbNotes', '1.0', 'dbNotesDisplayName', 204800); //todo: change dbSize
    db.transaction(populateDB, loadErrorCb, loadSuccessCb);
}

//creates the table if not exists
function populateDB(tx){
    var cmdCreateTable = 'CREATE TABLE IF NOT EXISTS tbl_Notes(Id INTEGER PRIMARY KEY ASC, Content nvarchar(200))';
    var cmdSelectAllNotes = 'SELECT * FROM tbl_Notes';
    
    tx.executeSql(cmdCreateTable);
    
    // tx.executeSql('delete from tbl_notes');
    // tx.executeSql('INSERT INTO tbl_Notes (Content) VALUES ("No rancho fundo")');
    // tx.executeSql('INSERT INTO tbl_Notes (Content) VALUES ("Sandy e Jr")');
    // tx.executeSql('INSERT INTO tbl_Notes (Content) VALUES ("No pain no gain")');


    tx.executeSql(cmdSelectAllNotes, [], selectSuccessCb, selectErrorCb);


}

function selectErrorCb(err){
    console.log("Busca por notas falhou. " + err.message);
}

function selectSuccessCb(tx, result){
    let rows = result.rows;

    for(let i = 0; i < rows.length; i++ ){
        console.log("Id: " + rows.item(i).Id + " Content: " + rows.item(i).Content);
    }
}

function loadErrorCb(err){
    console.log("Erro: " +  err.message);
}

//do nothing
function loadSuccessCb(){
    console.log("table created");
}
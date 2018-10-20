//var db;

function OpenDb(){
    var dbase = window.openDatabase('dbNotes', '1.0', 'dbNotesDisplayName', 204800); //todo: change dbSize;
    return dbase;
}

function initializeDb(){
    var db = OpenDb();
    db.transaction(populateDB, loadErrorCb, loadSuccessCb);
}

//creates the table if not exists
function populateDB(tx){
    var cmdCreateTable = 'CREATE TABLE IF NOT EXISTS tbl_Notes(Id INTEGER PRIMARY KEY ASC, Content nvarchar(200))';
    var cmdSelectAllNotes = 'SELECT * FROM tbl_Notes ORDER BY Id DESC'; //todo: buscar substring do Content
    
    tx.executeSql(cmdCreateTable);
    
    // tx.executeSql('delete from tbl_notes');
    // tx.executeSql('INSERT INTO tbl_Notes (Content) VALUES ("Lorem Ipsum is simply dummy text of the printing and typesetting industry.")');
    // tx.executeSql('INSERT INTO tbl_Notes (Content) VALUES ("Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC")');
    // tx.executeSql('INSERT INTO tbl_Notes (Content) VALUES ("There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words")');
    // tx.executeSql('INSERT INTO tbl_Notes (Content) VALUES ("Do you believe in magic??")');

    tx.executeSql(cmdSelectAllNotes, [], selectSuccessCb, selectErrorCb);
}

function selectSuccessCb(tx, result){
    var rows = result.rows;
    var containerDiv = document.getElementById('noteContainer');

    for(var i = 0; i < rows.length; i++ ){
        var noteContent = rows.item(i).Content;
        var noteId = rows.item(i).Id;

        var noteDiv = document.createElement("div");
        var noteOptionsButton = document.createElement("button");

        noteDiv.appendChild(
            document.createTextNode(noteContent)
        );

        noteOptionsButton.appendChild(
            document.createTextNode("Options")
        );

        noteDiv.appendChild(noteOptionsButton);
        setNoteAttributes(noteDiv, noteId);
        containerDiv.appendChild(noteDiv);
    }
}

function setNoteAttributes(note, id){
    note.setAttribute("class", "note-Main"); 
    note.setAttribute("id", id);
    note.getElementsByTagName("button")[0].setAttribute("class", "button note-options");
}

function selectErrorCb(err){
    console.log("Busca por notas falhou. " + err.message);
}

function loadErrorCb(err){
    console.log("Erro: " +  err.message);
}

//do nothing
function loadSuccessCb(){
    console.log("table created");
}


function SaveNote(tx){
    db = OpenDb();
    db.transaction(Insert);
}

function Insert(tx){
    var content = document.getElementById('noteContent').value;
    var cmdInsert = 'INSERT INTO Tbl_Notes (Content) VALUES (\'#\')';
    cmdInsert = cmdInsert.replace('#', content);
    tx.executeSql(cmdInsert);
    //TODO: Ajustar callbacks p/ erro e sucesso
    window.location = './Index.html'
}

function SaveNoteSuccesCb(){
    console.log('SALVOU LEGAL :D');
}

function SaveNoteErrorCb(err){
    console.log('Erro ao salvar: ' + err.message);
}
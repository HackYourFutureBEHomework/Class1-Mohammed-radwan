// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
const mysql = require('mysql');

class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    // Loads all the TODOs in the database
    load(callback) {
     //   const selectTodoItems='select * from todo_item_tag';
        const selectTodoItems = "SELECT * FROM todo_items ";
        this.dbConnection.query(selectTodoItems, function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }
     create(description,callback) {
            const sql= "INSERT INTO todo_items (text,user_id) VALUES ?";
            this.dbConnection.query(sql,[description], function (err,results,fields){
                if(err) {callback(err); return;}
                callback(null, results);
            });
     }
    update(id, description,callback) {
        const sql =`UPDATE todo_items SET text=? where id=?`;
        this.dbConnection.query(sql,[description,id],(err,results,fields)=>{
            if(err) throw err;
            callback(null,results);
        });
    }
    delete(id,callback) {
        const sql ='DELETE FROM todo_items WHERE id=?';
        this.dbConnection.query(sql,[id],(err,results,fields)=>{
            if(err) throw err;
            callback(null,results);
        });

    }
    tagTodoItem(Ids, callback) {
        const sql="INSERT INTO todo_item_tag (todo_item_id, tag_id) VALUES ?";
        this.dbConnection.query(sql,[Ids],(err,results,fields)=>{
            if (err) throw err;
            callback(null,results);
        });
    }
    untagTodoItem(todoItemId,tagId,callback) {
        const sql ='DELETE FROM todo_item_tag WHERE todo_item_id=? and tag_id=? ';
        this.dbConnection.query(sql,[todoItemId,tagId],(err,results,fields)=>{
            if(err) throw err;
            if (callback)callback(null,results);
        });
    }
     markCompleted(todoItemId, callback) {
        const sql ="Update todo_items Set is_completed=1 where id=?"
        this.dbConnection.query(sql,[todoItemId],(err,results,fields)=>{
            if (err) throw err;
            callback(null,results);
        })
    }
}
const dbConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'todo_app'
});
dbConnection.connect(function(err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);
    todoModel.load(function(err, todoItems) {
        if(err) {
            console.log("error loading TODO items:", err);
        }
        console.log("existing todo items:", todoItems);
    });
//Add more than one Item
    todoModel.create([['Make a coffe ',3],['Visit family',1]],(err,results)=>{
        if(err) {throw err; console.log(err);}
        console.log("new todo item added ");
    });
//Update Todo Item
    todoModel.update(42,'Go on holoday',(err,results)=>{
        if(err) throw err;
        console.log('Todo item Updated.');
    });
//Delete TodoItem
    todoModel.delete(42,(err,todoItems)=>{
        if(err) throw err;
        console.log('Todo Item Deleted ');
    });

// UnTag to item 
    todoModel.untagTodoItem(45,1,(err,todoItem)=>{
        if(err)throw err;
        console.log ('Tag Deleted')
    });
    // Tag to item 
    todoModel.tagTodoItem([[45,1]],(err,todoItem)=>{
        if(err)throw err;
        console.log ('Tag added to Item');
    });
//Mark Item As Completed
    todoModel.markCompleted(45,(err,todoItem)=>{
        if(err)throw err;
        console.log('Item marked as completed');
    })
});

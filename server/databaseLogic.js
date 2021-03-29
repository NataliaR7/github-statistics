const sqlite3 = require('sqlite3').verbose();

class DatabaseLogic{
  constructor(databasePath){
    this.db = new sqlite3.Database(databasePath, (err) => {
      if (err) {
        console.log('Could not connect to database', err)
      } else {
        console.log('Connected to database')
      }
    })
  }

  getUser(username){
    return new Promise( async (resolve, reject)=> {
      const sql = `SELECT * FROM gitstat where username=?`;
      this.db.get(sql, username, function (err, result) {
        resolve( result )
      });   
    })  
  }

  insertUserRepositories(username, repositories){
    this.db.run("INSERT INTO gitstat(username, repositories, repos_last_update) values(?, ?, ?)",
     [username, JSON.stringify(repositories), Date.now().toString()]);
  }

  updateUserLanguages(username, languages){
    this.db.run(`UPDATE gitstat SET languages=? where username=?`,
     [JSON.stringify(languages), username]);
  }

  updateUserRepositories(username, repositories){
    this.db.run(`UPDATE gitstat SET repositories=?, repos_last_update=? where username=?`,
     [JSON.stringify(repositories), Date.now().toString() , username ]);
  }
}

module.exports = DatabaseLogic





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

  insertUserData(username, data){
    this.db.run("INSERT INTO gitstat(username, user_data, repos_last_update) values(?, ?, ?)",
     [username, JSON.stringify(data), Date.now().toString()]);
  }

  insertUserRepositories(username, repositories){
    this.db.run("INSERT INTO gitstat(username, repositories, repos_last_update) values(?, ?, ?)",
     [username, JSON.stringify(repositories), Date.now().toString()]);
  }

  updateUserData(username, data){
    this.db.run("UPDATE gitstat SET user_data=?, repos_last_update=? where username=?",
    [JSON.stringify(data), Date.now().toString() , username ]);
  }

  updateUserLanguages(username, languages){
    console.log(languages, "database")
    this.db.run(`UPDATE gitstat SET languages=? where username=?`,
     [JSON.stringify(languages), username]);
  }

  updateReposAdditionalInfo(username, info){
    this.db.run(`UPDATE gitstat SET repos_additional_info=? where username=?`,
     [JSON.stringify(info), username]);
  }

  updateUserRepositories(username, repositories){
    this.db.run(`UPDATE gitstat SET repositories=?, repos_last_update=? where username=?`,
     [JSON.stringify(repositories), Date.now().toString() , username ]);
  }

  updateUserActivity(username, activity){
    this.db.run(`UPDATE gitstat SET activity=?, repos_last_update=? where username=?`,
     [JSON.stringify(activity), Date.now().toString() , username ]);
  }
}

module.exports = DatabaseLogic





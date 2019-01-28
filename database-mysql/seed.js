const faker = require('faker');
const db = require('./index.js');


let genre = ['hip-hop', 'rap', 'edm', 'alternative rock', 'jazz', 'rock', 'heavy metal', 'R&B', 'k-pop'];
let artists = ['Black Pink', 'Post Malone', 'Kendrick Lamar', 'Paul Morimoto', 'Drake', 'Illenium', 'Marshmellow', 'Odezsa', 'Martin Garrix', 'Ariana Grande', 'Porter Robinson']

for (let x = 0; x < 1000; x+=1) {
  let artist = artists[faker.random.number({'min': 0, 'max': 10})];
  let name = faker.lorem.words();
  let type = genre[faker.random.number({'min': 0, 'max': 8})];
  
  db.connection.query(`INSERT INTO songs (song_name, artist, genre) VALUES ('${name}', '${artist}', '${type}');`, (err, result) => {
    if (err) {
      console.log('insert songs'); throw err;
    }
  });
}

for (let i = 0; i < 200; i+=1) {
  let user = faker.internet.userName();
  let name = faker.name.firstName();
  let email = faker.internet.email();
  let password = faker.lorem.word();

  db.connection.query(`INSERT INTO users (username, name, password, email) VALUES ('${user}', '${name}', '${password}', '${email}');`, (err, results) => {
    if (err) {
      console.log ('users error'); throw err;
    }
  })
}

for (let j = 0; j< 30; j+=1) {
  let happy = faker.random.number({'min': 1, 'max': 200});
  db.connection.query(`INSERT INTO happy (song_id) VALUES (${happy})`);
}

for (let j = 0; j< 30; j+=1) {
  let sad = faker.random.number({'min': 1, 'max': 200});
  db.connection.query(`INSERT INTO sad (song_id) VALUES (${sad})`);
}

for (let j = 0; j< 30; j+=1) {
  let excited = faker.random.number({'min': 1, 'max': 200});
  db.connection.query(`INSERT INTO excited (song_id) VALUES (${excited})`);
}

for (let j = 0; j< 30; j+=1) {
  let love = faker.random.number({'min': 1, 'max': 200});
  db.connection.query(`INSERT INTO love (song_id) VALUES (${love})`);
}

console.log('seeding over');
const Server = require('./server.js')
const request = require('supertest');


describe('GET /', () => {
        it('should return 200', () => {
            
            return request(Server)
                .get('/')
                .expect(200)
                
        })

        it('recieved data', () => {
            const message =  {message: 'recieved data'};
                return request(Server)
                    .get('/')
                    .then(res => {
                        expect(res.body).toEqual(message);
                    })
        })

        it('should return JSON using done callback', done => {
            // using the done callback
            request(Server)
              .get('/games')
              .then(res => {
                expect(res.type).toBe('text/html'); // Content-Type
                done();
              });
    });

describe('Post', () => {
    it('should return 200', () => {
        const newGame =   {
            title: 'Pacman', // required
            genre: 'Arcade', // required
            releaseYear: 1980 // not required
          };

        return request(Server)
          .post('/games')
          .send(newGame)
          .then(res => {
              expect(res.body).toEqual({message: 'error adding game'})
          })
          .catch(res=>{
                expect(422)
          })
    })

    it('should return 422 when incomplete game data', () => {
        const newGame =   {
            genre: 'Arcade', // required
            releaseYear: 1980 // not required
          };

        return request(Server)
          .post('/games')
          .send(newGame)
          .then(res => {
              expect(res.body).toEqual({message: 'error adding game'})
          })
          .catch(res=>{
                expect(500)
          })
    })

    it('should return 500 when wrong request', () => {
        const newGame =   {
            name: 'pac',
            genre: 'Arcade', // required
            releaseYear: 1980 // not required
          };

        return request(Server)
          .post('/games')
          .send(newGame)
          .then(res => {
              expect(res.body).toEqual({message: 'incomplete information to fulfill request'})
          })
    })
})

})

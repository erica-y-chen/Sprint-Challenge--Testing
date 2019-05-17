const Server = require('./server.js')
const request = require('supertest');


describe('GET /', () => {
        it('should return 200', () => {
            
            return request(Server)
                .get('/')
                .expect(200)
                
        })

        it('{api:"up"', () => {
            const message = {api: 'up'};
                return request(Server)
                    .get('/')
                    .then(res => {
                        expect(res.body).toEqual(message);
                    })
        })
    })

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
                expect(422)
          })
    })
})



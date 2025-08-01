// // import * as chai from 'chai';
// // import { request, default as chaiHttp } from 'chai-http';

// // let chai = require('chai');
// import chai from 'chai';
// let chaiHttp = require('chai-http');

// let should = chai.should();
// chai.use(chaiHttp);
// import sever from '../server';
// describe('Server Tests', () => {

//   beforeEach((done) => {
//     // Before each test, reset the server or perform any setup if needed
//     done();
//   }
//   );
//   describe('GET /', () => {
//     it('should return 200 on GET /', (done) => {
//       chai.request(server)
//         .get('/test')
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           done();
//         });
//     });
//   });
// });
  
// describe('Server', () => {
//   it('should return 200 on GET /', (done) => {
//     chai.request(server)
//       .get('/')
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//   });

//   it('should return 404 on unknown route', (done) => {
//     chai.request(server)
//       .get('/unknown')
//       .end((err, res) => {
//         res.should.have.status(404);
//         done();
//       });
//   });
// });

var assert = require('assert');
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
describe('Server Tests', () => {
    let server = require('../server');

  beforeEach((done) => {
    // Before each test, reset the server or perform any setup if needed
    done();
  });

  it("should return 200 on GET /test", async () => {
        // AAA
        // Arrange: Turn on the TV/ initialize the server
            // No explicit arrange step needed here as the server is initialized in the test setup
        // Act: Press the power button/ Make a GET request to the /test route
        // const response = await init().get("/test");
        // Assert: Verify TV is off/ Check if the response status is 200 and the text is correct
        // expect(response.status).toBe(200);
        // expect(response.text).toBe("Test route is working");
    });
});
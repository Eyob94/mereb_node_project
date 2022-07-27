const app = require('../index');

const assert = require('assert').strict;

let server;

//TODO: ADD ARGS TO THE FUNCTIONS
describe("Test Person CRUD API", function () {
    before(() => {
        server = app.listen(3000);
    })

    after(() => {
        server.close()
    })
    it("Test", async function () {
        let person = app.get('db')
        console.log(person);
    });


});

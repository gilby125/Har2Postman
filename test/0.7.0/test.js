const harToPostman = require('../../lib/har-to-postman.js');
const fs = require('fs');
const harFile = JSON.parse(fs.readFileSync(__dirname + '/input.json', 'utf8'));
const expectedPostmanCollection = JSON.parse(fs.readFileSync(__dirname + '/output.json', 'utf8'));
const postmanContent = harToPostman.createPostmanCollection(JSON.stringify(harFile), true);
const postmanCollection = JSON.parse(postmanContent);

describe('Har2Postman', () => {
  it('Should include a json body in a POST request', () => {
  });

  it('Generates 0.7.0 output json (postman) given the 0.7.0 input json (har)', () => {
    expect(expectedPostmanCollection).toEqual(postmanCollection);
  });
});

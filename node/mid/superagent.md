## intallation

```
$ npm install superagent
```

与 browserify 需要用 webpack

```js
request
    .post('/api/pet')
    .send({ name: 'Manny', species: 'cat' })
    .set('X-API-Key', 'foobar')
    .set('Accept', 'foobar')
    .end(function(err, res) {
      // Calling the end function will send the request 
    })

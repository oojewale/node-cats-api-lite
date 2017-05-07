var _ = require('lodash');
var Cat = require('./cat_model.js');

module.exports = function(app) {

  // create route for cats
  app.post('/cat', function(req, res) {
    var newCat = new Cat(req.body);
    newCat.save(function(err) {
      if (err) {
        res.json({ info: "error during cat create", error: err});
      }
      res.json({ info: 'cat created successfully' });
    })
  })

  // fetch cats
  app.get('/cats', function(req, res) {
    Cat.find(function(err, cats) {
      if(err) {
        res.json({ info: "error during cats fetch", error: err});
        return void 0
      }
      if(cats.length > 0) {
        res.json({ info: 'cat found successfully', data: cats });
      } else {
        res.json({ info: 'No cat found!' });
      }
    })
  });

// fetch single cat
  app.get('/cats/:id', function(req, res) {
    Cat.findById(req.params.id, function(err, cat) {
      if(err) {
        res.json({ info: "error during cat find", error: err});
        return void 0
      }
      if(cat) {
        res.json({ info: 'cat found successfully', data: cat });
      } else {
        res.json({ info: 'No cat found!' });
      }
    });
  });

  // update cat
  app.put('/cats/:id', function(req, res) {
    Cat.findById(req.params.id, function(err, cat) {
      if(err) {
        res.json({ info: "error during cat find", error: err});
        return void 0
      }
      if(cat) {
        _.merge(cat, req.body);
        cat.save(function(err, cat) {
          if(err) {
            res.json({ info: "error during cat update", error: err});
            return void 0
          }
          res.json({ info: 'cat updated successfully', data: cat })
        })
      } else {
        res.json({ info: 'No cat found!' });
      }
    })
  });

  // delete cats
  app.delete('/cats/:id', function(req, res) {
    Cat.findByIdAndRemove(req.params.id, function(err) {
      if(err) {
        res.json({ info: "error during cat remove", error: err});
        return void 0
      }
      res.json({ info: 'cat removed successfully' })
    })
  });
};
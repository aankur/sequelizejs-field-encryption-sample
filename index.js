const models = require('./models');
models.User
  .create({ firstName: 'John Doe', privatedata: 'this is supposed to be encrypted' })
  .then((user) => {
    console.log(user.privatedata);

    user.privatedata = 'this is new data';
    user
      .save()
      .then((user) => {
        console.log(user.privatedata);
      });
  });

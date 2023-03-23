const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const crypto = require('crypto');

const addUser = catchAsync(async (req, res) => {
  const user_id = crypto.randomBytes(16).toString('hex');
  const user = await userService.createUser(req.body, user_id);
  res.status(httpStatus.CREATED).send({ user });
});

const searchEmail = catchAsync(async (req, res) => {
  const { email } = req.params;
  const searchEmail = await userService.searchEmail(email);
  if (searchEmail) {

    /*if key value pair is required then if found then "found" :"true"  else "found":"false"
    res.status(httpStatus.OK).send({
       found: true,  

    });
  } else {
    res.status(httpStatus.NOT_FOUND).send({
      // found: false,
    });*/

    res.status(httpStatus.OK).send(
      true,
    );
  } else {
    res.status(httpStatus.NOT_FOUND).send(
      false,
    );
  }
});

module.exports = {
  addUser,
  searchEmail,
};
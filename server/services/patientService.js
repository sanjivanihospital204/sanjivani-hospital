const schema = require('../database/schema');

const getAllPatients = async () => {
  return await schema.patientSchema
    .find({}, function (err, result) {
      if (err) {
        throw err;
      } else {
        return result;
      }
    })
    .clone()
    .catch(function (err) {
      return err;
    });
};

const createNewPatient = async (data) => {
  try {
    const user = new schema.patientSchema(data);
    const savedUser = await user.save();
    if (savedUser) {
      return {
        message: 'Patient Created successfully',
        status: 'created'
      };
    } else {
      return { message: 'Something went wrong', status: 'unDone' };
    }
  } catch (error) {
    throw new Error('Failed to create a user: ' + error.message);
  }
};


module.exports = {
  createNewPatient,
  getAllPatients
};

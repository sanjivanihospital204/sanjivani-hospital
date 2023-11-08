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
        status: 'done'
      };
    } else {
      return { message: 'Something went wrong', status: 'unDone' };
    }
  } catch (error) {
    throw new Error('Failed to create a user: ' + error.message);
  }
};

const getPatientById = async (patientId) => {
  return await schema.patientSchema
    .findOne({ _id: patientId }, function (err, result) {
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

const updatePatientById = async (data) => {
  return await schema.patientSchema
    .updateOne({ _id: data._id }, { $set: data })
    .then((result) => {
      if (result) {
        return {
          message: 'Patient Updated successfully',
          status: 'done'
        };
      } else {
        return { message: 'Something went wrong', status: 'unDone' };
      }
    })
    .catch((err) => console.warn(err));
};

module.exports = {
  createNewPatient,
  getAllPatients,
  getPatientById,
  updatePatientById
};

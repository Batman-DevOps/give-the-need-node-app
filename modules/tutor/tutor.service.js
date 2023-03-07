const db = require('../../_helpers/db');
const Tutor = db.Tutor;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(filter) {
    return await Tutor.find(filter);
}

async function getById(id) {
    return await Tutor.findById(id);
}

async function create(tutor) {
    return await Tutor.create(tutor);
}

async function update(tutor) {
    return await Tutor.findByIdAndUpdate(tutor._id, tutor);
}

async function _delete(id) {
    await Tutor.findByIdAndRemove(id);
}
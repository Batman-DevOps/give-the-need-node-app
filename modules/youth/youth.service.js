const db = require('../../_helpers/db');
const Youth = db.Youth;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(filter) {
    return await Youth.find(filter);
}

async function getById(id) {
    return await Youth.findById(id);
}

async function create(youth) {
    return await Youth.create(youth);
}

async function update(id, youth) {
    return await Youth.findByIdAndUpdate(id, youth);
}

async function _delete(id) {
    await Youth.findByIdAndRemove(id);
}
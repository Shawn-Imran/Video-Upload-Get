const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        url: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)
module.exports = mongoose.model('Video', schema);

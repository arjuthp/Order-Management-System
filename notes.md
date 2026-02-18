//const User = require('./user.model');

// Built-in Mongoose methods:
User.find()                    // Find all
User.findById(id)              // Find by ID
User.findOne({ email })        // Find one by condition
User.create(data)              // Create new
User.findByIdAndUpdate(id, data)  // Update by ID
User.findByIdAndDelete(id)     // Delete by ID
User.updateOne({ email }, data)   // Update one
User.deleteMany({ status })    // Delete many

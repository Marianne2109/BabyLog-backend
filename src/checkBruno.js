const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path to your User model if needed

const checkBruno = async () => {
  try {
    // Connect to your MongoDB database
    await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.npm_package_name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    //Bruno's actual ID
    const brunoId = '6770f09515d2b52dcfbae7a8';
    const bruno = await User.findById(brunoId);

    if (bruno) {
      console.log('Bruno exists:', bruno);
    } else {
      console.log('Bruno not found');
    }

    // Disconnect from the database
    mongoose.disconnect();
  } catch (error) {
    console.error('Error checking Bruno:', error.message);
    mongoose.disconnect();
  }
};

checkBruno();

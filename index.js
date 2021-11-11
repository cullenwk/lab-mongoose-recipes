const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    let newRecipe = {
      title: 'CW Recipe',
      level: 'Amateur Chef',
      ingredients: ['beef', 'onion', 'shallot', 'curry powder', 'olive oil', 'tomatoes'],
      cuisine: 'Malaysia cuisine',
      dishType:'main_course',
      image: 'https://images.media-allrecipes.com/images/75131.jpg',
      duration: 40,
      creator: 'CWK',
      created: Date('Nov 11, 2021'),
    }
    return Recipe.create(newRecipe)
  })
  .then ((manyRecipes) => {
    console.log(manyRecipes.title)
    return Recipe.insertMany(data)
  })
  .then ((updateRecipe) => {
    return Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
  })
  .then ((deleteRecipe) => {
    return Recipe.deleteOne({title: 'Carrot Cake'})
  })

  .then((closeData) => {
    mongoose.connection.close()
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

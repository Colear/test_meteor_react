import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/api/TasksCollection';

const insertTask = taskText => TasksCollection.insert( { text: taskText });

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup( () => {

  // si au démarrage de l'appli la collection est vide on ajoute quelques tâches bidons
  if (TasksCollection.find().count() === 0) {
    [
      'La première',
      'La deuxième',
      'La quatrième',
      'Ah non je m\'a gourré, ça c\'est la quatrième',
      'La cinquième',
      'La sixième',
      'Tous en coeur : la ...'
    ].forEach( insertTask )
  }

  // création d'un user si aucun présent dans la base
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

});

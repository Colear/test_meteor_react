import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm';


// Update de la tâche quand elle est cochée / décochée
const toggleChecked = ({ _id, isChecked }) => {
  TasksCollection.update( _id, {
    $set: {
      isChecked: !isChecked
    }
  })
};

// Suppression d'un tâche
const deleteTask = ({ _id }) => TasksCollection.remove(_id);

/*
  L'arrow function correspond à function (task) { return '<Task key={ task._id } task={ task }/>' }.
  Avec map elle est appelée pour chaque ligne du tableau tasks.
  Comme il y a un seul paramètre on peut ne pas mettre de parenthèse : task => {...} au lieu de (task) => {...}
*/
export const App = () => {

  // récupération des données dans Mongo
  const tasks = useTracker( () => TasksCollection.find( {}, { sort: { createdAt: -1 }} ).fetch() );

  return (
    <div>
      <h1>Welcome to Meteor!</h1>

      <TaskForm/>

      <ul>
        { tasks.map( task => <Task
          key={ task._id }
          task={ task }
          onCheckboxClick={toggleChecked}
          onDeleteClick={deleteTask}
        />) }
      </ul>

    </div>
  );
}

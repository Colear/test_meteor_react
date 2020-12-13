import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm';


/*
  L'arrow function correspond à function (task) { return '<Task key={ task._id } task={ task }/>' }.
  Avec map elle est appelée pour chaque ligne du tableau tasks.
  Comme il y a un seul paramètre on peut ne pas mettre de parenthèse : task => {...} au lieu de (task) => {...}
*/
export const App = () => {

  // récupération des données dans Mongo
  const tasks = useTracker( () => TasksCollection.find( {} ).fetch() );

  return (
    <div>
      <h1>Welcome to Meteor!</h1>

      <TaskForm/>

      <ul>
        { tasks.map( task => <Task key={ task._id } task={ task }/>) }
      </ul>
    </div>
  );
}

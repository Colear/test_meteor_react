import React, { useState } from 'react';
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

  // état du filtre pour cacher les tâche complétées
  const [hideCompleted, setHideCompleted] = useState(false);

  // récupération des données dans Mongo
  // on prend en compte le filtre pour cacher les tâches terminées
  const hideCompletedFilter = { isChecked: { $ne: true } };

  const tasks = useTracker( () => TasksCollection.find( hideCompleted ? hideCompletedFilter : {}, { sort: { createdAt: -1 }} ).fetch() );

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>📝️ To Do List</h1>
          </div>
        </div>
      </header>

      <div className="main">
        <TaskForm/>
        <div className="filter">
          <button onClick={() => setHideCompleted(!hideCompleted)}>
            {hideCompleted ? 'Show All' : 'Hide Completed'}
          </button>
       </div>

        <ul className="tasks">
          { tasks.map( task => <Task
            key={ task._id }
            task={ task }
            onCheckboxClick={toggleChecked}
            onDeleteClick={deleteTask}
          />) }
        </ul>

      </div>

    </div>
  );
}

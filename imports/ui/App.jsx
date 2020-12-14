import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm';
import { LoginForm } from './LoginForm';


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

  // Récupération du user 
  const user = useTracker(() => Meteor.user());

  // état du filtre pour cacher les tâche complétées
  const [hideCompleted, setHideCompleted] = useState(false);

  // récupération des données dans Mongo
  // on prend en compte le filtre pour cacher les tâches terminées
  const hideCompletedFilter = { isChecked: { $ne: true } };

  // nombre de tâche actives
  const pendingTasksCount = useTracker(() =>
    TasksCollection.find(hideCompletedFilter).count()
  );
  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ''
  }`;

  const tasks = useTracker( () => TasksCollection.find( hideCompleted ? hideCompletedFilter : {}, { sort: { createdAt: -1 }} ).fetch() );

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>📝️ To Do List {pendingTasksTitle}</h1>
          </div>
        </div>
      </header>

      <div className="main">
        {user ? (
          <Fragment>
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
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>

    </div>
  );
}

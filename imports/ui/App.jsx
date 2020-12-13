import React from 'react';
import { Task } from './Task';

const tasks = [
  {_id: 1, text: 'First Task'},
  {_id: 2, text: 'Second Task'},
  {_id: 3, text: 'Third Task'},
];

/*
  L'arrow function correspond à function (task) { return '<Task key={ task._id } task={ task }/>' }.
  Avec map elle est appelée pour chaque ligne du tableau tasks.
  Comme il y a un seul paramètre on peut ne pas mettre de parenthèse : task => {...} au lieu de (task) => {...}
*/
export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>

    <ul>
      { tasks.map( task => <Task key={ task._id } task={ task }/>) }
    </ul>
  </div>
);

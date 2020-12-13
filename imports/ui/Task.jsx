// Composant : affichage d'une ligne de tâche

import React from 'react';
 
export const Task = ({ task, onCheckboxClick }) => {

  return (
    <li>
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      />
      <span>{task.text}</span>
      <button onClick={ () => onDeleteClick(task) }>&times;</button>
    </li>
  );

};

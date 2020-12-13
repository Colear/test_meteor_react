// Composant : affichage d'une ligne de tâche

import React from 'react';
 
export const Task = ({ task }) => {
  return <li>{task.text}</li>
};
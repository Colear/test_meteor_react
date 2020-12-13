import React, { useState } from 'react';

export const TaskForm = () => {

  // pas trop compris. notion d'"array destructuring" où "text" est la valeur stockée et 
  // setText la fonction pour la mettre à jour...
  const [text, setText] = useState("");

  return (
    <form className="task-form">
      <input
        type="text"
        placeholder="Description de la tâche"
      />

      <button type="submit">Ajouter la tâche</button>
    </form>
  );
};

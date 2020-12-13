import React, { useState } from 'react';
import { TasksCollection } from '../api/TasksCollection';

export const TaskForm = () => {

  // permet le stockage de la valeur de l'input : text = valeur, setText = fonction de mise à jour
  const [text, setText] = useState("");

  const handleSubmit = e => {

    // empêcher le traitement par défaut du bouton
    e.preventDefault();

    // si le champs description de tâche est vide on sort
    if ( !text ) return;

    // ajout de la tâche dans la collection
    TasksCollection.insert( {
      text: text.trim(),
      createdAt: new Date()
    });

    // vidage de la zone texte
    setText("");
  };

  // à chaque changement de l'input on met à jour le state
  return (
    <form className="task-form">
      <input
        type="text"
        placeholder="Description de la tâche"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">Ajouter la tâche</button>
    </form>
  );
};


exports.seed = function(knex) {
  return knex('tickets').insert([
    { title: "Getting strange error",
      description: "Couldn't get index file to open",
      tried: "Googling it",
      category: "Web",
      created_by: 1,
      assigned_to: 0
    },
    {
      title: "Cant sign in to github",
      description: "Tried to sign in but it was not working",
      tried: "Googling it and asking a friend",
      category: "Github",
      created_by: 1,
      assigned_to: 2
    },
    {
      title: "Need help writing a for loop",
      description: "It keeps crashing my browser",
      tried: "Nothing",
      category: "Javascript",
      created_by: 3,
      assigned_to: 0
    },
    {
      title: "Dropped my sandwich on the floor",
      description: "Was trying to code an app and I stood up and knocked my plate on the floor",
      tried: "Using the force",
      category: "Food",
      created_by: 3,
      assigned_to: 0
    },
    {
      title: "What is CORS",
      description: "I dont understand what cors is and I need help ASAP",
      tried: "Google",
      category: "CORS",
      created_by: 4,
      assigned_to: 2
    }
  ]);
};

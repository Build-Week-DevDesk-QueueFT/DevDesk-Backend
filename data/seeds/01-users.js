
exports.seed = function(knex) {
  return knex('users').insert([
    { username: "Steve",
      password: "$2a$08$IWkMKT9n1/oBainF6gWH7.nkwe.STComE40nHovPywm.ZgwRqPq3y",
      is_helper: false,
      email: "steve@email.com" },
    { username: "Sara",
      password: "$2a$08$FUhSouIfgLyLcg3wNQzd4.rDY9Z0M6YZY6gbpVIrajgm6xI93R.e2",
      is_helper: true,
      email: "sara@email.com" },
    { username: "Bob",
      password: "$2a$08$.KwTOH08PCjKQNOD22zs.eqG9wnlLEUuD449zcI4VtIWmd0kaHz/W",
      is_helper: false,
      email: "bob@email.com"
    }, 
    { username: "Rachel",
      password: "$2a$08$0nAZ0m/k8WBpzk.HVoG3ROqyB42BBBanX9nwjEtw2pYrHP9hlUBL2",
      is_helper: false,
      email: "rachel@email.com"
    },
  ]);
};

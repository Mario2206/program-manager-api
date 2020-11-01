
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          id: 1, 
          firstname: 'Mario', 
          lastname : "Mars", 
          username : "mario2206", 
          mail : "mario@mail.com",
          password : "password",
          created_at : new Date(), 
        },
        {
          id: 2, 
          firstname: 'Derf', 
          lastname : "Lord", 
          username : "Derf25", 
          mail : "derf@mail.com",
          password : "password",
          created_at : new Date(), 
        },
        {
          id: 3, 
          firstname: 'Lou', 
          lastname : "Anne", 
          username : "yo19", 
          mail : "lou@mail.com",
          password : "password",
          created_at : new Date(), 
        }
      ]);
    });
};

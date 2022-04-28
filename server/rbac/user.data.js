const ROLE = {
  ADMIN: 'admin',
  USER: 'user'
}

module.exports = {
  ROLE: ROLE,
  users: [
      { id: 1, name: 'Osanda', role: ROLE.ADMIN },
      { id: 2, name: 'Billy', role: ROLE.USER },
      { id: 3, name: 'John', role: ROLE.USER }
  ],
  projects: [
      { id: 1, name: "Osanda's Project", userId: 1 },
      { id: 2, name: "Billy's Project", userId: 2 },
      { id: 3, name: "John's Project", userId: 3 }
  ]
}
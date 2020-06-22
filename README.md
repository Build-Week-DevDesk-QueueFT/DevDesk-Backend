# DevDesk-Backend

---

#### Auth

---

| Method | Endpoint                 | Information   |
| ------ | ------------------------ | ------------- |
| POST   | `/api/auth/register`     | Registration  |
| POST   | `/api/auth/login`        | Login         |

---

#### Users

---

| Method | Endpoint                 | Information                                                  |
| ------ | ------------------------ | ------------------------------------------------------------ |
| GET    | `/api/users/:id`         | Returns user by id                                           |
| GET    | `/api/users/:id/tickets` | Returns assigned tickets if helper or created tickets if not |

---

#### Tickets

---

| Method | Endpoint                          | Information                                   |
| ------ | --------------------------------- | --------------------------------------------- |
| GET    | `/api/tickets`                    | Returns all tickets                           |
| GET    | `/api/tickets/:id`                | Returns ticket of id                          |
| POST   | `/api/tickets/`                   | Create a new ticket                           |
| PUT    | `/api/tickets/:id`                | Udates ticket with id                         |
| DELETE | `/api/tickets/:id`                | Deletes ticket with id                        |

---


#### User Object

---

```js
{
  id: INTEGER, // added by database
  username: STRING, // required , unique - 128 max chars
  password: STRING, // required - 128 max chars
  email: STRING, // not required
  is_helper: BOOLEAN // defaults to false if not specified
}
```

#### Ticket Objects

---

```js
{
  id: INTEGER, // added by database
  title: STRING, // required 
  description: TEXT, // required - description of what needs help
  tried: STRING, // required - what the user has tried already
  category: STRING, // not required
  resolved: BOOLEAN, // defaults to false
  assigned_to: INTEGER, // defaults to 0 - id of helper
  created_at: TIMESTAMP, // added by database
  created_by: INTEGER // not required - gets read from the token of the user
}
```
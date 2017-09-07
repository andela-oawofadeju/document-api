[![Build Status](https://travis-ci.org/andela-oawofadeju/document-api.svg?branch=develop)](https://travis-ci.org/andela-oawofadeju/document-api)
[![Coverage Status](https://coveralls.io/repos/github/andela-oawofadeju/document-api/badge.svg?branch=develop)](https://coveralls.io/github/andela-oawofadeju/document-api?branch=develop)

# document-api

The system manages documents, users and user roles. Each document defines access rights; the document defines which roles can access it. Also, each document specifies the date it was published.
This API was built to handle document management. This API would serve as the brains to track, manage and store documents and reduce paper. This API is capable of keeping a record of the documents created and modified by different users. It also allows for the assignment of roles to different users. This API also allows the end user to get the exact number of documents they require and set special queries for more precise matching.

## Technologies used

This application is built using NodeJS, Express and Postgres
This code base contains a REST API written in JavaScript, runs on Node v6.9.4 and utilizes ExpressJS for routing. This API has several endpoints that handle everything from user authentication to document management itself. This API makes use of JSON Web Tokens (JWT) to secure communications between the server and the client. This API makes use of PostgreSQL as the database and Sequelize as the Object Relational Mapper (ORM).


##Features of this application

A created user will have a role, either an admin or a regular user by default.
- A Regular User can: 
    - Create an account
    - Login
    - Create a document
    - Limit access to a document by specifying an access group `i.e. public, private or role`.
    - View public documents created by other users.
    - View documents created by his access group with access level set as `role`.
    - Edit his record.
    - Search a users public documents.
    - View `public` and `role` access level documents of other regular users.
    - Logout.
    - Delete his details.

- In addition to the general user functions, an admin user can:
    - View all users.
    - View all created documents.
    - Delete any user.
    - Update any user's record.
    - Create a new role.
    - View all created roles.
    - Search for any user.


### Endpoints:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/78750173d816f51ab06c)

How to Use

To make use of this API, first create a clone by running the following command

https://github.com/andela-oawofadeju/document-api.git

Next, you will need to create a .env file to store the environment variables in the root directory of the app. Your .env file must conform to the pattern shown below.

database = ***_the name of your database_***  
secret = ***_secret key to use in the app_***  
dbusername = ***_your database username_***   
dbpassword = ***_your database password_***   
PORT = ***_port to start the app. If ommited, default port 3000 will be used_***   


Run *_npm install_* to install app dependencies
Run *_npm start_* to seed the database and start the app

A tool such as Postman can be used to access the end points. JSON data may need to be sent to the server endpoints. The table below shows a comprehensive breakdown of the endpoints that this API exposes.


EndPoint  |  Functionality | Requires Authentication | Access Level
------------  |  ----------------- | -------------------------------- | ------------------
| POST /users/login	| Logs a user in.	| No | All |
| POST /users/ |	Creates a new user. |	No | All|
| GET /users/ |	Find matching instances of user. |	Yes | Admin
| GET /users/username |	Find user. |	Yes | Self
| PUT /users/username	| Update user attributes. |	Yes | Self & Admin
| DELETE /users/username |	Delete user. |	Yes | Self & Admin
| POST /documents/ |	Creates a new document instance. |	Yes | Admin & User
| GET /documents/	| Find matching instances of document. |	Yes | All
| GET /documents/?limit=x	| Find x matching instances of document. |	Yes | All
| GET /documents/?role=user |	Find instances of document with a user role. |	Yes | All
| GET /documents/?date=yyyy-MM-dd	| Find instances of document created on the given date.	| Yes | All
| GET /documents/?offset=y | Find instances of document starting at the yth index. |	Yes | All
| GET /documents/id	| Find document. |	Yes | All
| PUT /documents/id	| Update document attributes. |	Yes | Self & Admin
| DELETE /documents/id	| Delete document.	| Yes | Self & Admin
| GET /users/username/documents	| Find all documents belonging to the user.	| Yes | All
| POST /roles/ |	Creates a new role instance. | No | Admin
| GET /roles/	| Find matching instances of role. |	Yes | Admin
| GET /roles/title	| Find role.	| Yes | Admin
| PUT /roles/title |	Update role attributes.	| Yes | Admin
| DELETE /roles/title	| Delete role.	| Yes | Admin

The following are some sample request and response from the API.

- [Roles](#roles)
  - [Get roles](#get-roles)

- [Users](#users)
  - [Create user](#create-user)
  - [Get user](#get-user)

- [Documents](#documents)
  - [Get All documents](#get-all-documents)
  - [Create document](#create-document)
  - [Get document](#get-document)
  - [Edit document](#edit-document)
  - [Delete document](#delete-document)

- [Search](#search)
  - [Search Documents](#search-documents)
  - [Search Users] (#search-users)

## Roles
Endpoint for Roles API.

### Get Roles

#### Request
- Endpoint: GET: `/api/roles`
- No Authentication

#### Response

- Requires: Authentication
```
[{
  "message": "Access forbidden, you are not an admin!"
}]
```

#### Request
- Endpoint: GET: `/api/roles`
- Authentication

#### Response
- Status: `200: Created`
- Body `(application/json)`
```
[{
    "id": 1,
    "title": "admin",
    "createdAt": "2017-04-08T19:43:29.044Z",
    "updatedAt": "2017-04-08T19:43:29.044Z"
  },
  {
    "id": 2,
    "title": "regular",
    "createdAt": "2017-04-08T19:43:29.044Z",
    "updatedAt": "2017-04-08T19:43:29.045Z"
  },
  {
    "id": 3,
    "title": "fellow",
    "createdAt": "2017-04-08T19:43:29.045Z",
    "updatedAt": "2017-04-08T19:43:29.045Z"
  }]
```

## Users
Endpoint for Users API.

### Create User

#### Request
- Endpoint: POST: `api/users`

#### Response
- Status: `201: Created`
- Body `(application/json)`
```
[{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJ1c2VyTmFtZSI6InJlZ3VzZXIiLCJyb2xlSWQiOjIsImlhdCI6MTQ5MTc3NjYzOSwiZXhwIjoxNDkxODYzMDM5fQ.PgKED0xizaZD6xqpTBEELM8kFTK3XBCv2aUUAHKeLpE",
  "payload": {
    "id": 16,
    "firstname": "regular",
    "lastname": "user",
    "username": "reguser",
    "email": "regularuser@yahoo.com",
    "updatedAt": "2017-04-09T22:23:59.385Z",
    "createdAt": "2017-04-09T22:23:59.385Z"
  }
}]
```
### Get Users

#### Request
- Endpoint: GET: `api/users`
- Requires: Authentication, Admin Role

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[{
  "paginationMeta": {
    "totalCount": 14,
    "pageSize": 8,
    "pageCount": 2,
    "currentPage": 1
  },
  "result": [
    {
      "id": 1,
      "username": "admin",
      "firstname": "administrator",
      "lastname": "admin",
      "email": "admin@someone.com",
      "roleId": 1,
      "createdAt": "2017-04-08T19:43:29.281Z",
      "updatedAt": "2017-04-08T19:43:29.281Z"
    },
    {
      "id": 2,
      "username": "regular",
      "firstname": "someone",
      "lastname": "person",
      "email": "seun@seun.com",
      "roleId": 2,
      "createdAt": "2017-04-08T19:43:29.497Z",
      "updatedAt": "2017-04-08T19:43:29.497Z"
    },
    {
      "id": 3,
      "username": "regular",
      "firstname": "person",
      "lastname": "gender",
      "email": "sola@sola.com",
      "roleId": 3,
      "createdAt": "2017-04-08T19:43:29.702Z",
      "updatedAt": "2017-04-08T19:43:29.702Z"
    },
    {
      "id": 4,
      "username": "toulteeee",
      "firstname": "tolu",
      "lastname": "tolu",
      "email": "tolu@ktolu.com",
      "roleId": 2,
      "createdAt": "2017-04-09T14:01:13.538Z",
      "updatedAt": "2017-04-09T14:01:13.538Z"
    },
    {
      "id": 5,
      "username": "yemkem",
      "firstname": "yem",
      "lastname": "kem",
      "email": "halohalo@yahoo.com",
      "roleId": 2,
      "createdAt": "2017-04-09T14:03:38.054Z",
      "updatedAt": "2017-04-09T14:03:38.054Z"
    },

    {
      "id": 7,
      "username": "tesme",
      "firstname": "test",
      "lastname": "me",
      "email": "ggfgfg@gg.com",
      "roleId": 2,
      "createdAt": "2017-04-09T18:37:45.599Z",
      "updatedAt": "2017-04-09T18:37:45.599Z"
    }
  ]
}]
```
###Search for a User
### Users

#### Request
- Endpoint: GET: `/search/users/?term=searchterm`
- Requires: Authentication, Admin Role

### Response
- Status: '200: OK'
-Body '(application/json)'
```json
[
  {
    "id": 3,
    "username": "regular",
    "firstname": "person",
    "lastname": "gender",
    "email": "sola@sola.com",
    "password": "$2a$10$u3ZKAP9Nh0NLDv3GX8oCR.IVmsWqNduMYGWCkuyeauRsyp4U3IMEW",
    "roleId": 3,
    "createdAt": "2017-04-08T19:43:29.702Z",
    "updatedAt": "2017-04-08T19:43:29.702Z"
  }]
```
## Documents
Endpoint for document API.

### Get All Documents

#### Request
- Endpoint: GET: `/api/documents`
- Requires: Authentication, Admin Role

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[{
  "count": 20,
  "rows": [
    {
      "id": 5,
      "title": "impedit adipisci deserunt harum itaque voluptas",
      "access": "private",
      "content": "ut quas eos et\nex et et ipsum aut earum voluptatem\nquod qui reiciendis aut porro in neque\ndicta delectus eos quia\n \r\tnon exercitationem rerum laborum non dicta iure aliquam alias\nbeatae dicta rerum minima enim ullam\nsint vel labore nisi nostrum nobis libero\n \r\tcorrupti architecto sit impedit\nrepudiandae consequatur vitae earum unde eum\nlabore aut sint rerum aut vel corporis molestias",
      "ownerId": 1,
      "ownerRoleId": 3,
      "shareId": [
        1
      ],
      "createdAt": "2017-04-08T19:43:29.712Z",
      "updatedAt": "2017-04-08T19:43:29.712Z"
    },
    {
      "id": 6,
      "title": "laborum vel et tempore alias",
      "access": "public",
      "content": "quis qui eligendi\nsunt vero neque\nprovident enim qui sit harum et omnis nulla ut\n \r\tsuscipit quia laudantium excepturi aliquam soluta ut sapiente nam\nsit fugiat aut inventore iusto animi\nnon minima rerum sed doloremque inventore itaque odio\naliquam ut fugiat pariatur consectetur excepturi\n \r\tlaboriosam quis quisquam fugit velit\nenim nihil sed corporis id\nlabore error incidunt molestiae nulla velit quia inventore quia\net beatae maiores\nqui minus ipsum nihil dolores",
      "ownerId": 3,
      "ownerRoleId": 1,
      "shareId": [
        1
      ],
      "createdAt": "2017-04-08T19:43:29.712Z",
      "updatedAt": "2017-04-08T19:43:29.712Z"
    },
    {
      "id": 10,
      "title": "sint commodi accusamus in perspiciatis non labore",
      "access": "private",
      "content": "reiciendis eos autem\net corrupti rerum\ndolore autem porro a sed quia nam aut pariatur\nfacere minima id recusandae\nnon quis autem\n \r\tvel delectus veritatis\ndolor delectus sit quo qui\nvoluptatibus alias temporibus eos\nalias dolores illo dolore est\n \r\tqui delectus nisi eos\nest earum est iste qui maiores ad quia molestiae\nenim repudiandae culpa\nvoluptatem corporis molestias totam aut doloremque velit",
      "ownerId": 1,
      "ownerRoleId": 2,
      "shareId": [
        1
      ],
      "createdAt": "2017-04-08T19:43:29.713Z",
      "updatedAt": "2017-04-08T19:43:29.713Z"
    },
    {
      "id": 16,
      "title": "quod officia veniam dolor",
      "access": "public",
      "content": "ab quia culpa non quia repudiandae dolor possimus\nrerum eveniet occaecati qui voluptate aliquid\net est qui sit qui\n \r\tpossimus aspernatur error\ninventore dolore ut quas sunt\neius quae maiores\n \r\tperspiciatis ut consequatur architecto dolores consequuntur ipsum harum\nlibero illum ut animi unde\naspernatur dolor eveniet voluptatibus ipsum minus omnis iste neque",
      "ownerId": 2,
      "ownerRoleId": 1,
      "shareId": [
        1
      ],
      "createdAt": "2017-04-08T19:43:29.717Z",
      "updatedAt": "2017-04-08T19:43:29.717Z"
    },
    {
      "id": 18,
      "title": "doloribus maiores velit dolorem qui",
      "access": "public",
      "content": "minima voluptatibus suscipit sit consequuntur optio at est\ntenetur omnis facere\net mollitia molestiae\n \r\tmagnam illum cumque hic qui\naut ea qui pariatur occaecati minus quidem\nnam id et repellendus dolores exercitationem impedit\nvitae rerum repudiandae\n \r\tet aspernatur aut\ndolor minima sit tempore a\nvel molestiae hic praesentium eos\nquos quibusdam commodi voluptatum maxime",
      "ownerId": 3,
      "ownerRoleId": 3,
      "shareId": [
        1
      ],
      "createdAt": "2017-04-08T19:43:29.717Z",
      "updatedAt": "2017-04-08T19:43:29.717Z"
    },
    {
      "id": 21,
      "title": "voluptatibus ad dolorem",
      "access": "private",
      "content": "rerum ullam quam earum officia odio magni et\neum aperiam voluptatum ea repellat\nquam aut nisi maxime laudantium cupiditate\naliquid et enim error omnis\nsoluta laudantium aspernatur voluptatem quod ullam placeat\n \r\tesse officia quaerat officiis veniam\nullam voluptate aspernatur porro sed ipsam ut dicta\nsequi ea aut blanditiis minima atque architecto\naccusantium excepturi consectetur totam ea molestiae inventore\nconsequuntur nesciunt qui quas distinctio in fuga qui harum\n \r\tnam omnis id et qui rem voluptate\nnatus voluptates quod repudiandae sed\nut occaecati architecto quae fugiat dolorem est sunt",
      "ownerId": 1,
      "ownerRoleId": 1,
      "shareId": [
        1
      ],
      "createdAt": "2017-04-08T19:43:29.718Z",
      "updatedAt": "2017-04-08T19:43:29.718Z"
    },
    {
      "id": 22,
      "title": "sed quam rem aut qui eveniet omnis",
      "access": "private",
      "content": "similique eos omnis et voluptas in ut\nerror cupiditate id sint nulla in et est soluta\nquia sit voluptates illo tempora omnis sed\nnon omnis mollitia voluptas\nasperiores maiores sed odio nisi blanditiis aliquid assumenda\n \r\tet et ipsam exercitationem enim in\naspernatur eveniet ea tempore soluta doloremque et\ndeserunt labore voluptas fugiat quia vero quasi tenetur numquam\n \r\teaque impedit ipsum numquam corrupti ut aliquam\nnihil impedit et expedita deleniti ipsum\ninventore ipsum et aut",
      "ownerId": 1,
      "ownerRoleId": 1,
      "shareId": [
        1
      ],
      "createdAt": "2017-04-08T19:43:29.718Z",
      "updatedAt": "2017-04-08T19:43:29.718Z"
    },
    {
      "id": 24,
      "title": "qui quibusdam vel ab sint id est expedita",
      "access": "private",
      "content": "quia sed odit sint quae molestias id vitae\nsaepe dolore voluptatibus voluptates unde quo pariatur rem quidem\ntempora animi commodi ducimus molestiae quas est\nconsequatur natus itaque consequuntur quod nam sed\n \r\tdebitis perspiciatis sint ducimus quisquam\nconsequatur adipisci doloremque ut placeat autem dolorem cum\net voluptas reprehenderit at culpa\nmaxime recusandae sed autem quia expedita dicta vel\n \r\tanimi saepe veritatis\nid ipsum qui velit architecto\nlibero dolorum in nobis\nex eos consequatur autem aspernatur",
      "ownerId": 1,
      "ownerRoleId": 2,
      "shareId": [
        1
      ],
      "createdAt": "2017-04-08T19:43:29.718Z",
      "updatedAt": "2017-04-08T19:43:29.718Z"
    },
    {
      "id": 25,
      "title": "voluptatem voluptas possimus voluptates placeat quo autem iste",
      "access": "public",
      "content": "quod ut magnam enim debitis dolorem vel id est\nveniam voluptate ut et sint ipsum\net culpa quasi\ntempora quia qui laudantium\nquia debitis adipisci reprehenderit sed et nesciunt soluta asperiores\n \r\tvoluptatem sunt aut iste nesciunt nihil sed qui\nautem nesciunt enim ad unde quod sint sunt deserunt\nlaudantium a doloremque quia quibusdam sint ipsum ratione veniam\n \r\tmaxime qui provident consequuntur magnam quod\nvoluptatem fugit repellat soluta consequuntur aut\ntenetur mollitia ipsam magni aperiam\nea et voluptatum",
      "ownerId": 3,
      "ownerRoleId": 2,
      "shareId": [
        1
      ],
      "createdAt": "2017-04-08T19:43:29.718Z",
      "updatedAt": "2017-04-08T19:43:29.718Z"
    }]
```
### Create Document

#### Request
- Endpoint: POST: `/api/documents`
- Requires: Authentication
- Body `(application/json)`
```json
[{
    "title": "Read me things",
    "content": "testing this for read me sake"
}]

```

#### Response
- Status: `201: Created`
- Body `(application/json)`
```json
[{
  "access": "public",
  "id": 56,
  "title": "Read me things",
  "content": "testing this for read me sake",
  "ownerId": 1,
  "ownerRoleId": 1,
  "updatedAt": "2017-04-09T22:39:50.414Z",
  "createdAt": "2017-04-09T22:39:50.414Z",
}]
```
### Get Document

#### Request
- Endpoint: GET: `/api/documents/:id`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[{
    "id": 18,
  "title": "doloribus maiores velit dolorem qui",
  "access": "public",
  "content": "minima voluptatibus suscipit sit consequuntur optio at est\ntenetur omnis facere\net mollitia molestiae\n \r\tmagnam illum cumque hic qui\naut ea qui pariatur occaecati minus quidem\nnam id et repellendus dolores exercitationem impedit\nvitae rerum repudiandae\n \r\tet aspernatur aut\ndolor minima sit tempore a\nvel molestiae hic praesentium eos\nquos quibusdam commodi voluptatum maxime",
  "ownerId": 3,
  "ownerRoleId": 3,
  "shareId": [
    1
  ],
  "createdAt": "2017-04-08T19:43:29.717Z",
  "updatedAt": "2017-04-08T19:43:29.717Z"  
}]
```

### Search
#### Documents

#### Request
- Endpoint: GET: `/api/users/4/documents`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[{
  "paginationMeta": {
    "totalCount": "7",
    "pageSize": 8,
    "pageCount": 1,
    "currentPage": 1
  },
  "rows": [
    {
      "id": 7,
      "title": "ducimus quia voluptatum",
      "content": "et nesciunt laboriosam\nexercitationem earum alias\naccusantium eligendi consequuntur libero adipisci\nvel ipsam aut blanditiis et\n \r\tvoluptatem quia doloribus ex\net deleniti voluptas pariatur in laudantium voluptatem\naut a vel\n \r\taperiam et a sit\nut cumque perferendis neque\nfugiat qui et dolorem\nomnis et non consectetur dolores consequatur\nquidem libero culpa molestiae quo",
      "ownerId": 1,
      "access": "role"
    },
    {
      "id": 15,
      "title": "iure voluptatum consequatur",
      "content": "non modi voluptatem sed dicta eos ut\nsed sunt quaerat dignissimos neque\nut modi eius aut sit vel distinctio\n \r\tculpa et sunt dignissimos ab sapiente repellendus velit\nmolestiae reprehenderit et excepturi sequi qui qui earum incidunt\nquia et asperiores quibusdam aperiam\nut officiis sint porro tenetur similique unde\nvoluptatum maxime consequatur sit aut et adipisci\n \r\tvel blanditiis illum hic\nveniam et ducimus repellendus commodi\nsunt quis vitae omnis aut voluptatibus illum",
      "ownerId": 1,
      "access": "role"
    },
    {
      "id": 17,
      "title": "eum facere rerum aperiam non a quisquam corrupti",
      "content": "ipsam vero omnis\naut et vel deserunt quos\nmolestias reiciendis voluptatem repellat omnis quia iure quod doloribus\n \r\teveniet consequatur voluptatem hic delectus magnam rem ut quia\nsoluta ea consequatur molestiae\nfugit numquam neque ut illo ea unde aut\nrepellat molestiae voluptatem et recusandae ducimus autem\n \r\teligendi reprehenderit eum quam ipsum\nminus ea et rerum velit\nquis assumenda fugit sed\nrepudiandae dolorem molestias dolor magni blanditiis",
      "ownerId": 1,
      "access": "role"
    },
    {
      "id": 20,
      "title": "eum eos ut fuga et aut reiciendis",
      "content": "vel officiis et eveniet sunt accusamus dolore\ncorporis facere alias tempore expedita omnis blanditiis ut\nmagni reiciendis eum facilis in quasi ipsam\nitaque explicabo beatae\n \r\tcupiditate velit ut dignissimos ut quae distinctio\niusto quis velit dolores ullam\nnostrum laudantium cumque nam repellat sequi\naut sit accusamus voluptatem porro\n \r\tofficia ut suscipit aut beatae\nrem qui cumque ipsum at\nquae et sequi provident\nmolestiae quia atque possimus",
      "ownerId": 1,
      "access": "role"
    },
    {
      "id": 34,
      "title": "accusamus quibusdam ut nostrum iste rem sunt reprehenderit",
      "content": "aliquid dicta incidunt et\nasperiores sit totam aliquam ut molestiae soluta saepe\nid eius et ut accusamus veniam et vitae\nut qui sit\n \r\tnon corporis vel molestiae maiores explicabo quae odit\nillo sed doloremque\nsequi eos enim\nsed ea molestiae iure eum explicabo temporibus eligendi\nvoluptates magnam ducimus corrupti officiis et quas voluptas\n \r\tcumque consequatur officia\nnihil quas praesentium maxime cupiditate commodi cum soluta\nvoluptatem id voluptas\nquia ut id doloribus aliquam cupiditate magnam\neum quaerat molestias aut non culpa accusamus provident magni",
      "ownerId": 1,
      "access": "role"
    },
    {
      "id": 42,
      "title": "et deleniti consequuntur iure nesciunt non in voluptatem",
      "content": "rerum a veniam ex et ab\nea eos ut\ninventore nisi vel nesciunt quis aut\nid doloribus iusto atque optio saepe libero\n \r\taccusamus voluptatibus ratione labore aut non aspernatur\nerror veritatis sunt necessitatibus dolorem quibusdam soluta\nconsequatur aspernatur maxime debitis\na ut ab qui cupiditate exercitationem sunt\n \r\teligendi tempore aliquam illo hic excepturi nobis\nest repellendus ab expedita voluptatem debitis consequuntur qui\nmolestiae culpa officia placeat cupiditate adipisci expedita quis",
      "ownerId": 1,
      "access": "role"
    },
    {
      "id": 48,
      "title": "amet quis sit modi",
      "content": "quae numquam tenetur et quia ipsam quia sunt ut\ncorrupti eum nam et quas\nea minima nulla consequatur voluptatem perspiciatis ratione beatae\nqui quam non ut amet nesciunt\ndoloremque minima quas impedit et iste ut\n \r\tsed libero enim dolor officiis quisquam et nihil possimus\naut quod hic ullam quis magnam consequuntur\nvoluptatem et mollitia sapiente\nrepellendus velit corrupti alias\nnon nisi aperiam quia iusto unde\n \r\tpraesentium et omnis facilis odio\nfugiat et sapiente voluptas\nest consequatur veritatis",
      "ownerId": 1,
      "access": "role"
    }
  ]
}]
```

### Edit Document

#### Request
- Endpoint: PUT: `/api/documents/:id`
- Requires: Authentication
- Body `(application/json)`:
```json
{
  "title": "Updated Title",
}
```

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[{
  "message": "Update successful",
  "updatedDocument": {
    "id": 18,
    "title": "Change this title now",
    "access": "public",
    "content": "minima voluptatibus suscipit sit consequuntur optio at est\ntenetur omnis facere\net mollitia molestiae\n \r\tmagnam illum cumque hic qui\naut ea qui pariatur occaecati minus quidem\nnam id et repellendus dolores exercitationem impedit\nvitae rerum repudiandae\n \r\tet aspernatur aut\ndolor minima sit tempore a\nvel molestiae hic praesentium eos\nquos quibusdam commodi voluptatum maxime",
    "ownerId": 3,
    "ownerRoleId": 3,
    "shareId": [
      1
    ],
    "createdAt": "2017-04-08T19:43:29.717Z",
    "updatedAt": "2017-04-09T22:46:32.051Z"
  }
  }]
```
### Delete Document

#### Request
- Endpoint: DELETE: `/api/documents/:id`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[{
  "message": "Delete successful"
}]
```
### Search
#### Documents

#### Request
- Endpoint: GET: `/users/4/documents`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[{
  "paginationMeta": {
    "totalCount": "7",
    "pageSize": 8,
    "pageCount": 1,
    "currentPage": 1
  },
  "rows": [
    {
      "id": 7,
      "title": "ducimus quia voluptatum",
      "content": "et nesciunt laboriosam\nexercitationem earum alias\naccusantium eligendi consequuntur libero adipisci\nvel ipsam aut blanditiis et\n \r\tvoluptatem quia doloribus ex\net deleniti voluptas pariatur in laudantium voluptatem\naut a vel\n \r\taperiam et a sit\nut cumque perferendis neque\nfugiat qui et dolorem\nomnis et non consectetur dolores consequatur\nquidem libero culpa molestiae quo",
      "ownerId": 1,
      "access": "role"
    },
    {
      "id": 15,
      "title": "iure voluptatum consequatur",
      "content": "non modi voluptatem sed dicta eos ut\nsed sunt quaerat dignissimos neque\nut modi eius aut sit vel distinctio\n \r\tculpa et sunt dignissimos ab sapiente repellendus velit\nmolestiae reprehenderit et excepturi sequi qui qui earum incidunt\nquia et asperiores quibusdam aperiam\nut officiis sint porro tenetur similique unde\nvoluptatum maxime consequatur sit aut et adipisci\n \r\tvel blanditiis illum hic\nveniam et ducimus repellendus commodi\nsunt quis vitae omnis aut voluptatibus illum",
      "ownerId": 1,
      "access": "role"
    },
    {
      "id": 42,
      "title": "et deleniti consequuntur iure nesciunt non in voluptatem",
      "content": "rerum a veniam ex et ab\nea eos ut\ninventore nisi vel nesciunt quis aut\nid doloribus iusto atque optio saepe libero\n \r\taccusamus voluptatibus ratione labore aut non aspernatur\nerror veritatis sunt necessitatibus dolorem quibusdam soluta\nconsequatur aspernatur maxime debitis\na ut ab qui cupiditate exercitationem sunt\n \r\teligendi tempore aliquam illo hic excepturi nobis\nest repellendus ab expedita voluptatem debitis consequuntur qui\nmolestiae culpa officia placeat cupiditate adipisci expedita quis",
      "ownerId": 1,
      "access": "role"
    },]
```


## Contributors
- [Olayemi Awofadeju](github.com/andela-oawofadeju)

Copyright (c) 2017 Awofadeju Olayemi Folakemi

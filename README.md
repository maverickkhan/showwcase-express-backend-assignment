# ShowwCase Backend Test

Welcome to the ShowwCase Backend Test project! This repository contains the backend codebase for the ShowwCase-1 application. Below you will find instructions on how to set up and run the project locally, as well as additional information and notes.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16.17.1)
- Yarn (package manager)
- PostgreSQL (v13 or later)

## Getting Started

1. Install dependencies using Yarn:

```bash
yarn install
```

2. Set up the environment variables:

Update the environment file (.env) with your database connection details:

```plaintext
PORT=3001
DATABASE_URL=postgresql://maverick@localhost:5432/showwcase-1
SECRET_KEY=secretKey
LOG_FORMAT=dev
LOG_DIR=../logs
ORIGIN=*
CREDENTIALS=true
```

3. Run database migrations:

```bash
yarn prisma:migrate
```

4. Generate Prisma client type definition:

```bash
yarn prisma:generate
```

5. Start the development server:

```bash
yarn dev
```

The application should now be running at `http://localhost:3001`.

## Testing

To run the unit tests, use the following command:

```bash
yarn test
```
```
---------------------------|---------|----------|---------|---------|-------------------
File                       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------------------|---------|----------|---------|---------|-------------------
All files                  |   85.58 |    47.82 |   87.17 |   86.47 |                   
 src                       |   88.37 |       50 |   77.77 |   88.37 |                   
  app.ts                   |   88.37 |       50 |   77.77 |   88.37 | 34-38             
 src/config                |     100 |       50 |     100 |     100 |                   
  index.ts                 |     100 |       50 |     100 |     100 | 2                 
 src/controllers           |   86.66 |      100 |     100 |   86.66 |                   
  auth.controller.ts       |   85.71 |      100 |     100 |   85.71 | 17,27,36          
  users.controller.ts      |   88.88 |      100 |     100 |   88.88 | 15                
 src/dtos                  |     100 |      100 |     100 |     100 |                   
  users.dto.ts             |     100 |      100 |     100 |     100 |                   
 src/exceptions            |     100 |      100 |     100 |     100 |                   
  httpException.ts         |     100 |      100 |     100 |     100 |                   
 src/middlewares           |   76.08 |    58.33 |    87.5 |      75 |                   
  auth.middleware.ts       |   58.33 |       40 |      50 |   57.14 | 9-12,21-28        
  error.middleware.ts      |   88.88 |       50 |     100 |    87.5 | 13                
  validation.middleware.ts |     100 |      100 |     100 |     100 |                   
 src/routes                |     100 |      100 |     100 |     100 |                   
  auth.route.ts            |     100 |      100 |     100 |     100 |                   
  users.route.ts           |     100 |      100 |     100 |     100 |                   
 src/services              |   89.47 |        0 |   83.33 |   96.77 |                   
  auth.service.ts          |    86.2 |        0 |      80 |   95.83 | 45                
  users.service.ts         |     100 |      100 |     100 |     100 |                   
 src/utils                 |   73.33 |       50 |      80 |   71.42 |                   
  axios-client.ts          |      50 |      100 |   66.66 |      50 | 18-23,32-33       
  logger.ts                |   93.75 |        0 |     100 |   92.85 | 11                
---------------------------|---------|----------|---------|---------|

- Test Suites: 5 passed, 5 total
- Tests:       12 passed, 12 total
- Snapshots:   0 total
- Time:        5.107 s
- Ran all test suites.
```

## Linting

To lint the source code, use the following command:

```bash
yarn lint
```

To automatically fix linting issues, use:

```bash
yarn lint:fix
```

## API Documentation

The Postman collection (in JSON format) is included in the repository. You can import this collection into Postman and use it to consume the APIs by changing the port number to match the one specified in the `.env` file.

## Additional Information

- This project uses Node.js as the backend runtime environment.
- The database is set up using PostgreSQL with Prisma as the ORM.
- The application uses a secret key for generating and verifying tokens.
- Logs are generated in the `../logs` directory using the specified log format.
- Cross-Origin Resource Sharing (CORS) is enabled with the specified configurations.

## Notes

- Make sure to run the necessary database migrations and keep the database schema up-to-date.

Thank you for checking out our project! If you have any questions or issues, please feel free to reach out to us. Happy coding!
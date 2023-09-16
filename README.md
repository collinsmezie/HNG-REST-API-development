# HNG-REST-API-development

## Link to Database schema [UML Here](https://lucid.app/lucidchart/b7868ea9-a7b3-4cd7-b3b2-c3b98ecc706d/edit?beaconFlowId=2A536D39562C4F79&invitationId=inv_92f5173c-e32c-4a27-af7f-54e028ce5df5&page=0_0#)

## Link to [UML Here](https://lucid.app/lucidchart/ed1e2be9-c5e6-4766-b212-27566feeb9ea/edit?invitationId=inv_3af95dc5-1f2d-4f44-9f80-11e19e18b99b&page=0_0#) for system design 



# API Documentation

This documentation outlines the usage of the HNGx REST API. The API allows you to perform basic CRUD (Create, Read, Update, Delete) operations on a collection of users stored in a MongoDB database.

## API Base URL

The base URL for all API endpoints is https://hngxapi-kggb.onrender.com/api.

## Standard Formats for Requests and Responses

**Request Format:** The API accepts JSON-formatted requests.

**Response Format:** The API responds with JSON-formatted data.

## Endpoints

### 1. Create a New User

- **Endpoint:** `POST /api/add_user`
- **Request Body:**
  - `name` (string): The name of the user to be created.
- **Responses:**
  - `201 Created`: The user was created successfully. The response includes the newly created user's data.

    ```json
    {
      "_id": "5ffdb3b243454f35d8f41e12",
      "name": "John Doe"
    }
    ```

  - `500 Internal Server Error`: An error occurred while creating the user.

### 2. Get User by ID

- **Endpoint:** `GET /api/users/:userId`
- **Responses:**
  - `200 OK`: The user was found successfully. The response includes the user's data.

    ```json
    {
      "_id": "5ffdb3b243454f35d8f41e12",
      "name": "John Doe"
    }
    ```

  - `404 Not Found`: The user with the specified ID does not exist.

    ```json
    {
      "error": "User not found"
    }
    ```

  - `500 Internal Server Error`: An error occurred while fetching the user.

### 3. Get All Users

- **Endpoint:** `GET /api/users`
- **Responses:**
  - `200 OK`: The list of users was fetched successfully.

    ```json
    [
      {
        "_id": "5ffdb3b243454f35d8f41e12",
        "name": "John Doe"
      },
      {
        "_id": "5ffdb3c243454f35d8f41e13",
        "name": "Jane Smith"
      }
    ]
    ```

  - `500 Internal Server Error`: An error occurred while fetching the users.

### 4. Update User by ID

- **Endpoint:** `PUT /api/users/:userId`
- **Request Body:** The updated user data.
- **Responses:**
  - `200 OK`: The user was updated successfully.

    ```json
    {
      "message": "User updated successfully"
    }
    ```

  - `404 Not Found`: The user with the specified ID does not exist.

    ```json
    {
      "error": "User not found"
    }
    ```

  - `500 Internal Server Error`: An error occurred while updating the user.

### 5. Delete User by ID

- **Endpoint:** `DELETE /api/users/:userId`
- **Responses:**
  - `200 OK`: The user was deleted successfully.

    ```json
    {
      "message": "User deleted successfully"
    }
    ```

  - `404 Not Found`: The user with the specified ID does not exist.

    ```json
    {
      "error": "User not found"
    }
    ```

  - `500 Internal Server Error`: An error occurred while deleting the user.

## Sample Usage

1. Create a New User

   ```http
   POST /api/add_user
   Content-Type: application/json

   {
     "name": "John Doe"
   }


2. Get User by ID

   ```http
   GET /api/users/5ffdb3b243454f35d8f41e12

3. Get All Users

    ```http
    GET /api/users


4. Update User by ID

    ```http
    PUT /api/users/5ffdb3b243454f35d8f41e12
    Content-Type: application/json

```json
{
  "name": "Updated Name"
}
```

5. Delete User by ID

```http
DELETE /api/users/5ffdb3b243454f35d8f41e12
```




## Known Limitations and Assumptions

- The API assumes a MongoDB database is set up and running.
- The API does not include authentication or authorization mechanisms.

## Setting Up and Deploying the API

### Locally

1. Clone the repository containing the API code.
2. Install the required dependencies using `npm install`.
3. Set up a MongoDB database and obtain the connection URI.
4. Update the `uri` variable in the code with your MongoDB connection URI.
5. Run the API using `npm start`.
6. The API will be available locally at http://localhost:3000.

### On a Server

1. Follow steps 1 to 4 from the local setup instructions.
2. Choose a server hosting provider (e.g., AWS, Heroku, or Render).
3. Deploy the API code to the server.
4. Update the `uri` variable in the code with your production MongoDB connection URI.
5. Start the API on the server.
6. Your API will be available at the server's URL.

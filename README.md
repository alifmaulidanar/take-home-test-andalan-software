# Simple Fullstack Web App using Reqres Public API

This is a simple fullstack web application that allows users to perform CRUD operations by utilizing the Reqres Public API. The app features a clean, minimalistic design and provides a seamless user experience for interacting with user and resource data. This project is a technical assignment for the [Andalan Software](https://andalansoftware.com/) for the position of **Software Developer**.

Since it uses a public API, the data does not persist in a database and any interaction with the API does not affect the actual data on Reqres. This project is built using modern technologies, including:

- React
- Next.js
- Typescript
- TailwindCSS
- ShadcnUI
- Hosted on Vercel.

## Project Overview

This project is a web app that demonstrates basic CRUD operations (Create, Read, Update, Delete) for users and resources data. The operations are performed using the public API provided by [Reqres](https://reqres.in/), which supplies dummy data for testing purposes.

## Key Features:

- CRUD Operations: You can create, update, and delete users and resources data, with all actions handled via modals to keep the user experience smooth.
- Data Persistence: The data is fetched from the Reqres API, and no data is saved to a database, meaning that each interaction with the API will not affect the actual Reqres data.
- Simple Design: The user interface is designed with simplicity and elegance using TailwindCSS and ShadcnUI components.
- Hosting: The application is deployed and hosted on Vercel.

## Tech Stack

- Frontend: React, Next.js, Typescript
- Styling: TailwindCSS, ShadcnUI
- Hosting: Vercel
- API: [Reqres API Documentation](https://reqres.in/) or on [Swagger](https://reqres.in/api-docs/)
  Since this application uses the Reqres public API, you can view the full documentation for available endpoints and example input at Reqres Documentation.

## Project Structure & Endpoints

Here are the endpoints available in the project:

| **Endpoint**      | **Description**                                                                         |
| ----------------- | --------------------------------------------------------------------------------------- |
| `/`               | Home page – contains a menu to navigate to the four other pages                         |
| `/register`       | Registration page – contains a form for user registration                               |
| `/login`          | Login page – contains a form for user login                                             |
| `/users`          | Users list page – displays a list of users fetched from the Reqres API                  |
| `/users/[id]`     | User detail page – displays detailed information of a user by their ID                  |
| `/resources`      | Resources list page – displays a list of resources (such as colors) from the Reqres API |
| `/resources/[id]` | Resource detail page – displays detailed information of a resource (color) by its ID    |

## CRUD Operations:

For the Create, Update, and Delete operations on the /users page, the app will show a modal dialog containing the form input. No new pages are opened; everything happens within the same view.

- **Create (POST)**: You can create a new user or resource by submitting a form.
- **Update (PUT/PATCH)**: You can update user or resource data through modal dialogs.
- **Delete (DELETE)**: Users and resources can be deleted via modals without navigating away from the page.

## Installation

To run this project locally, follow the steps below:

1. Clone the repository:

```bash
git clone https://github.com/alifmaulidanar/take-home-test-andalan-software.git
```

2. Navigate to the project directory:

```bash
cd take-home-test-andalan-software
```

3. Install the dependencies:

```bash
npm install
```

4. Run the app locally:

```bash
npm run dev
```

5. Visit the app in your browser:

```bash
http://localhost:3000
```

## Deployment

This application is hosted on Vercel. You can access the live version of the app by visiting the following link:

https://take-home-test-andalan-software.vercel.app/

## Conclusion

This project serves as a great starting point for anyone looking to learn about full-stack development with React, Next.js, and working with public APIs like Reqres. It's also a useful tool to demonstrate how to build simple and efficient CRUD interfaces with modern frontend technologies.

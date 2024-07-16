# College Sell 🎓🛍️

A web application where students can buy and sell their belongings to their college mates. This platform includes features such as uploading pictures of items, providing information about the student and the products which they want to sell with asking price. The application is built using the MERN stack and styled with Tailwind CSS.

## Table of Contents 📑

- [Features](#features-✨)
- [Tech Stack](#tech-stack-🛠️)
- [Installation](#installation-💻)
- [Usage](#usage-📲)

## Features ✨

- **User Authentication**: Secure login and registration using Google OAuth 🔒.
- **Product Listings**: Users can upload pictures and information about the items they want to sell 📸.
- **Search and Filter**: Easily search and filter through listed products 🔍.
- **User Profiles**: View and edit your profile, see items you have listed 👤.
- **Responsive Design**: Optimized for both desktop and mobile devices 📱💻.

## Tech Stack 🛠️

- **Frontend**:
  - React.js ⚛️
  - Tailwind CSS 🎨
- **Backend**:
  - Node.js 🟢
  - Express.js 🚀
- **Database**:
  - MongoDB 🍃
- **Authentication**:
  - Google OAuth 🔐
- **Storage**:
  - Firebase ☁️

## Installation 💻

1. **Clone the repository:**

    ```bash
    git clone https://github.com/GautamMPanchaL/collegeSell
    cd collegeSell
    ```

2. **Install dependencies:**

    - For the backend:
      ```bash
      cd server
      npm install
      ```

    - For the frontend:
      ```bash
      cd client
      npm install
      ```

3. **Set up environment variables:**

    Create a `.env` file in the `collegeSell` directory and add the following:

    ```env
    URI= "Your mongoDB uri"
    ROUNDS=10
    JWT_SECRET= " JWT SECRET KEY"
    ```
    Create a `.env` file in the `client` directory and add the following:

    ```env
    VITE_FIREBASE_KEY="Firebase key"
    ```
4. **Run the application:**

    - Start the backend server:
      ```bash
      cd server
      npm start
      ```

    - Start the frontend development server:
      ```bash
      cd client
      npm start
      ```

    The application should now be running on `http://localhost:3000`.

## Usage 📲

1. **Sign in** using your Google account.
2. **Browse** the marketplace to see items listed by other students.
3. **List an item** You can sell your own products , uploading pictures, providing price and providing details about the product.
4. **Contact sellers** directly through the platform to negotiate.



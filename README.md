
# Spiritual Center

## Overview

The **Spiritual Center** project is a web application designed to facilitate interaction and management within a spiritual organization. The application features two types of users: Admins and Devotees, each with specific functionalities tailored to their roles.

- **Admin**: Can manage devotee profiles, send notifications, and communicate with devotees.
- **Devotee**: Can log in, make donations, view their donation history, and chat with other devotees.

The project uses Angular for the frontend, .NET Core Web API for the backend, SignalR for real-time communication, LINQ for querying data, and SQL Server 2019 for database management.

## Features

### Admin Capabilities
- **Devotee Management**: Create, update, and delete devotee profiles.
- **Notifications**: Send notifications to all users.
- **Messaging**: Send messages to any devotee.
- **State Management**: Efficiently manage application state using [State Management Tool/Library].

### Devotee Capabilities
- **Login**: Secure login functionality.
- **Donations**: Make donations and view donation history.
- **Chat**: Real-time chat with other devotees.
- **Dynamic Forms**: Interact with dynamic forms for various purposes.

## Technologies Used

- **Frontend**: Angular
- **Backend**: .NET Core Web API
- **Real-Time Communication**: SignalR
- **Database**: SQL Server 2019
- **Database Querying**: LINQ
- **Dynamic Forms**: [Dynamic Forms Library/Tool]
- **State Management**: [State Management Tool/Library]

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (for Angular development)
- [npm](https://www.npmjs.com/) (Node package manager)
- [.NET SDK](https://dotnet.microsoft.com/download) (for .NET Core development)
- [SQL Server 2019](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (for database management)

### Installation

#### Backend Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/spiritual-center.git
   cd spiritual-center
   ```

2. **Navigate to Backend Directory:**

   ```bash
   cd backend
   ```

3. **Install Dependencies:**

   ```bash
   dotnet restore
   ```

4. **Update Database Configuration:**

   - Open `appsettings.json` and configure your SQL Server connection string:

     ```json
     "ConnectionStrings": {
       "DefaultConnection": "Server=your_server_name;Database=your_database_name;User Id=your_user_id;Password=your_password;"
     }
     ```

5. **Run Database Migrations:**

   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

6. **Run the Application:**

   ```bash
   dotnet run
   ```

#### Frontend Setup

1. **Navigate to Frontend Directory:**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Run the Development Server:**

   ```bash
   ng serve
   ```

   Access the frontend application at [http://localhost:4200](http://localhost:4200).

### Environment Configuration

Create a `.env` file in the root directory of your project and add necessary environment variables. For example:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

### Usage

1. **Admin Login:**

   - Access the admin dashboard at [http://localhost:4200/admin](http://localhost:4200/admin).
   - Log in with your admin credentials.

2. **Devotee Login:**

   - Access the devotee portal at [http://localhost:4200/devotee](http://localhost:4200/devotee).
   - Log in with your devotee credentials.

3. **Donation Process:**

   - Devotees can make donations through their profile page and view their donation history.

4. **Messaging and Chat:**

   - Admins can send messages to any devotee.
   - Devotees can use the chat feature to communicate with other devotees in real-time.

5. **Notifications:**

   - Admins can send notifications to all users from the admin dashboard.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Make your changes and ensure that all tests pass.
4. Submit a pull request with a clear description of your changes.

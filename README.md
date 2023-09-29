<!DOCTYPE html>
<html>

<head>
    <title>CakePals Backend API</title>
</head>

<body>
    <h1>CakePals Backend API</h1>

    <h2>Overview</h2>

    <p>The CakePals backend API is a RESTful web service that powers the CakePals application, where users can buy
        and sell home-baked cakes and pies. This API is built using Node.js, Express.js, and MongoDB.</p>

    <h2>Getting Started</h2>

    <ol>
        <li>Clone the repository:</li>
        <ul>
            <li><code>git clone &lt;repository-url&gt;</code></li>
        </ul>
        <br>
        <li>Navigate to the project directory:</li>
        <ul>
            <li><code>cd cakepals-backend-api</code></li>
        </ul>
        <br>
        <li>Install dependencies:</li>
        <ul>
            <li><code>npm install</code></li>
        </ul>
        <br>
        <li>Set up environment variables:</li>
        <ul>
            <li>Create a <code>.env</code> file in the root directory and add your environment variables, including the
                database connection string and JWT secret key.</li>
        </ul>
        <br>
        <li>Start the server:</li>
        <ul>
            <li><code>npm start</code></li>
        </ul>
        <br>
        <li>The API will be available at <a href="http://localhost:3000">http://localhost:3000</a>.</li>
    </ol>

    <h2>API Endpoints</h2>

    <h3>User Registration</h3>

    <p>Endpoint: <code>/api/register</code></p>
    <p>Method: POST</p>
    <p>Description: Register as a Member or Baker.</p>

    <h3>User Authentication</h3>

    <p>Endpoint: <code>/api/login</code></p>
    <p>Method: POST</p>
    <p>Description: Authenticate as a Member or Baker.</p>

    <!-- Add more API endpoints following the same structure -->

    <h2>Contributing</h2>

    <p>Feel free to contribute to the development of the CakePals backend API. Please follow our <a
            href="CONTRIBUTING.md">contribution guidelines</a>.</p>

    <h2>License</h2>
</body>

</html>

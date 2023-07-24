# Title: Node.js Job Portal with CRUD Operations and Swagger API Documentation

<img width="960" alt="image" src="https://github.com/apurvpatil18/Node.js-Job-Portal/assets/98873382/de0b0211-ea4e-4e39-8b22-84c30f90f55e">

Project Overview for GitHub:
------------------------------

**Description:**
The Node.js Job Portal is a web application built using Node.js, Express, and MongoDB. It serves as a platform for users to register, log in, and manage job listings. The application includes full CRUD (Create, Read, Update, Delete) operations for job listings, allowing users to add, view, update, and delete job postings. Additionally, the API endpoints are thoroughly documented using Swagger, providing developers with clear documentation and a user-friendly interface to interact with the API.

**Key Features:**
1. User Authentication: Users can sign up for an account and log in using their email and password, enabling secure access to the Job Portal.

2. Job Listing Management: Authenticated users can perform CRUD operations on job listings, including creating new job postings, viewing existing job listings, updating job details, and deleting job postings.

3. Express Backend: The application is built on the Express.js framework, providing a robust and scalable backend for handling HTTP requests and responses.

4. MongoDB Database: The project uses MongoDB as the NoSQL database to store and manage job listings and user data, ensuring efficient data storage and retrieval.

5. Swagger API Documentation: The API endpoints are documented using Swagger, offering a comprehensive API reference with interactive documentation through Swagger UI.

6. Rate Limiting: The application implements rate limiting using the `express-rate-limit` middleware, preventing abuse and ensuring the API's stability and security.

**API Endpoints:**
Below is the list of API endpoints available in the application:

**User Endpoints:**
1. **Register**
   - Method: POST
   - URL: http://localhost:8080/api/v1/auth/register
   - Description: Create a new user account.

2. **Login**
   - Method: POST
   - URL: http://localhost:8080/api/v1/auth/login
   - Description: Log in to the Job Portal using email and password.

3. **Update User**
   - Method: PUT
   - URL: http://localhost:8080/api/v1/user/update-user
   - Description: Update user details.

4. **User Details**
   - Method: GET
   - URL: http://localhost:8080/api/v1/user/get-user
   - Description: Get user details.

**Job Endpoints:**
1. **Create Job**
   - Method: POST
   - URL: http://localhost:8080/api/v1/job/create-job
   - Description: Create a new job listing.

2. **Job All**
   - Method: GET
   - URL: http://localhost:8080/api/v1/job/get-job
   - Description: Get all job listings.

3. **Update Job**
   - Method: PATCH
   - URL: http://localhost:8080/api/v1/job/update-job/:id
   - Description: Update a job listing by its ID.

4. **Delete Job**
   - Method: DELETE
   - URL: http://localhost:8080/api/v1/job/delete-job/:id
   - Description: Delete a job listing by its ID.

5. **Job Stats**
   - Method: GET
   - URL: http://localhost:8080/api/v1/job/job-stats
   - Description: Get statistics related to job listings.

**Installation:**
- Clone the repository from GitHub: `git clone <repository-url>`
- Install dependencies: `npm install`

**Usage:**
- Start the development server: `npm start`
- Access the API documentation: `http://localhost:8080/api-doc/`
- Create an account or log in to the Job Portal to manage job listings.

**Contributing:**
If the project is open to contributions, include guidelines on how other developers can contribute to the project. This could involve instructions for submitting pull requests, code formatting guidelines, and other contribution guidelines.

**License:**
Include the project's license information, indicating the terms under which the project is distributed.

**Conclusion:**
The Node.js Job Portal with CRUD Operations and Swagger API Documentation is a feature-rich web application that enables users to manage job listings efficiently. With clear documentation and a user-friendly interface provided by Swagger, the project is well-organized and easily accessible for both developers and end-users. Keep up the excellent work, and consider continuously improving and expanding your project based on user feedback and your own ideas!

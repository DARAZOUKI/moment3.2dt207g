This repository contains a web application that consumes a web service for managing work experiences. 
The web service is responsible for handling CRUD operations (Create, Read, Update, Delete) for work experiences, and the web application interacts with this service to display existing records and add new ones.
# Project Structure

The project structure is organized as follows:

    * index.html: Main page of the web application where existing work experiences are displayed.
    * add.html: Page containing a form to add new work experiences.
    * about.html: Page providing information about the web application and the database server used.
    * styles.css: CSS stylesheet for styling the web pages.
    * server.js: JavaScript file containing client-side code for interacting with the web service and handling user interactions.
    * script.js: JavaScript file containing functions for fetching and displaying work experiences.
    * src/: Directory containing static assets (index.html, add.html, about.html, styles.css, script.js.
    * README.md: This file providing an overview of the project and instructions for running the application.

# Functionalities
## Fetching Work Experiences

The web application utilizes the Fetch API to retrieve existing work experiences from the web service. When the application loads, it sends a GET request to the /workexperiences endpoint to fetch all records, which are then displayed on the index.html page.
## Adding Work Experiences

Users can add new work experiences through the add.html page, which contains a form for inputting details such as company name, job title, location, start date, end date, and description. Upon form submission, the application sends a POST request to the /workexperiences endpoint with the form data, and upon successful addition, the user receives a confirmation message.
## Deleting Work Experiences

Each work experience displayed on the index.html page is accompanied by a delete button. When clicked, this button triggers a DELETE request to the /workexperiences/:id endpoint, where :id represents the unique identifier of the work experience. Upon successful deletion, the respective record is removed from the list.
#Deployment

The web application can be deployed to a publicly accessible web host for demonstration purposes. Alternatively, it can be presented via a video demonstration. The source code is hosted on GitHub for version control and collaboration.
# Conclusion

This project demonstrates the development of a web application that interacts with a web service for managing work experiences. By utilizing modern web technologies such as HTML, CSS, JavaScript, Express.js, and MongoDB, we have created a functional solution for viewing, adding, and deleting work experience records. The application provides a seamless user experience and showcases the integration between client-side and server-side components. Further enhancements could include additional features such as updating records (PUT operation) and improved user interface design.

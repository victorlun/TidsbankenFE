# Tidsbanken case project: Vacation management system
Welcome to the Tidsbanken Frontend project repository. This web-based application aims to efficiently manage employee holiday requests and enhance organizational communication for Tidsbanken.

[Github Repo - Backend](https://github.com/victorlun/TidsbankenBE/)

## Table of Contents
- [User Manual](#User-Manual)
- [Client](#client)
- [How the application works](#How-the-application-works)
- [Features](#Features)
- [How to use](#How-to-use)
- [Log in](#Log-in)
- [Technical Stack](#Technical-Stack)

## User Manuals
[User Manual - Employee Functionality](https://github.com/williamevans98/TidsbankenFE/blob/main/usermanual_employee.md)

[User Manual - Manager Functionality](https://github.com/williamevans98/TidsbankenFE/blob/main/usermanual_manager.md)

## Client
Tidsbanken champions a modern workforce management approach based on efficient resource allocation and harmonious team dynamics. We’re dedicated to enhancing employee experiences and boosting organizational efficiency. 
At Tidsbanken, we aim to create an environment where time is optimally managed, and communication flows seamlessly. Time is a valuable asset, and allocating it effectively drives the success of any project. 
Our mission is to reshape how businesses approach time management. By crafting innovative solutions that merge the latest technology with intuitive design, we help organizations use time wisely and communicate smoothly, enabling teams to collaborate efficiently. 


## How the application works
The frontend code, which is this repository is deployed on vercel: [Tidsbanken](https://tidsbanken-lfvuj1tfm-williamevans98.vercel.app/).  
The backend code can be found in [here](https://tidsbanken-lfvuj1tfm-williamevans98.vercel.app/)

## Features
#### User Authentication
A secure login page with error handling for invalid login attempts by using Keycloak


#### User-Friendly Interface
A consistent application frame for easy navigation.


#### Vacation Requests
Display detailed vacation request information, allowing managers to approve or reject requests.
Enable users to apply for vacation requests, view their vacation request history, including dates and comments.


#### Request Submission
Design an intuitive interface for users to submit vacation requests.
Ensure validation to prevent date conflicts and errors.


#### Vacation Management
A feature for managing ineligible periods when vacation requests are restricted.
Allowing administrators to define specific date ranges or events for restrictions.


*These features collectively enhance the Tidsbanken system for efficient vacation management and user-friendly experience.*

  
## How to use
To run the Tidsbanken application locally on your machine, follow these steps:
1. This repository can be cloned by using:
- *git clone [https://github.com/diantobosman/Tidsbanken_FrontEnd-Case.git](https://github.com/williamevans98/TidsbankenFE.git)*
2. After cloning, type the following command:
- *cd tidsbanken-front-end*
3. Install the following dependencies:
- *npm install*
- *npm install @angular/material*
4. To run the application one can use the command:
- *ng serve*
- once the app is running, open the web browser and go to  http://localhost:4200/ to access Tidsbanken.


## Log in
The user can login as user with:  
Username: employee6  
Password: password

And as admin using:  
Username: manager1  
Password: password


## Technical Stack
### The project has used the following technical stack. This is for both frontend and backend
[IntelliJ IDEA](https://www.jetbrains.com/idea/)  

[Spring Framework](https://spring.io/)

[Hibernate](https://hibernate.org/)

[PostgreSQL](https://www.postgresql.org/)

[Swagger](https://swagger.io/)

[Docker](https://www.docker.com/)

[Angular](https://angular.io/)

[Visual Studio Code](https://code.visualstudio.com/)

[Daypilot](https://doc.daypilot.org/scheduler/angular/)

[Keycloak]([https://doc.daypilot.org/scheduler/angular/](https://www.keycloak.org/))


## Contribution
- William Evans
- Nathalie Levenfalk
- Victor Lundqvist
- Justine Jensen

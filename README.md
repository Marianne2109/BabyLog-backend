# T3A2 - Fullstack MERN application. 
For the final project I've decided to create BabyLog, this is a tracking application created for parents and carers as a simple tool to track Growth metrics and Immunisation status. 

## Links for part B
- [GitHub frontend repo](https://github.com/Marianne2109/babylog-frontend)
- [Github backend repo](https://github.com/Marianne2109/BabyLog-backend)
- [Netlify link](https://babylog-frontend.netlify.app/)
- [Render link](https://babylog-backend.onrender.com/)
- [Trello board](https://trello.com/b/wJwPDaGl/babylog-fullstack-app)
  

## Links
- [GitHub repo](https://github.com/Marianne2109/T3A2)
- [Trello board](https://trello.com/b/wJwPDaGl/babylog-fullstack-app)
- [Figma Wireframes](https://www.figma.com/design/icsxrgbsIblEOglIf1Nhcn/Wireframes---T3A2?node-id=0-1&p=f&t=ZDhaSZG3SpZxlUK4-0)

## Table of content 

## R1. Description of the website
### Purpose
BabyLog is a digital tool for parents and carers to manage, view and track key information about children's growth metrics and immunisation status. The focus is on simplifying the process of recording and tracking growth and immunisation data, providing easy to understand educational resources as well as offering practical tools to promote actions that can improve a child's wellbeing such a create a reminder of upcoming vaccination dates.  BabyLog aims to support those providing caregiving responsibilities, ultimately empowering all user with knowledge and handy tools.

### Features and Functionality
#### Features:
* User account: user can sign up or log in, and log out.
* Child/children profile: user can create and manage multiple children’s profiles under one account. A child profile will include personal information such as name, date of birth, expected due date and the option to add notes and a profile picture.
* Caregiving roles: For those providing care, parents can grant access to the child profile providing that the carer has created an account with BabyLog. The parent will provide access to the data at their discretion (read only or full access).
* Growth tracking: the growth metrics recorded are height, weight and head circumference (head size). The data entered can be visualised as a list or as a graph. Based on the World’s Health Organisation growth standards.
* Immunisation tracking: logging vaccines and notification of upcoming or late vaccines following the Australian National Immunisation Program (NIP) schedule. This includes creation of reminders that will be sent to the users calendar provider (ex. Google Calendar).
* Notes: The child’s profile will include a section for users to enter additional information about the child or notes from a doctor's appointment. 
* Important numbers page: this page will contain emergency numbers and the number of relevant healthcare related organizations such as Nurse on call. This page will have the option to download the list for printing or sharing.
* Educational resources: It will include general information on the importance of immunisation, vaccine benefits and potential side effects as well as information about the importance of Growth metrics. the Content will be sourced from reliable institutions and organisations like the WHO, the Australian Institute of Health and Welfare (AIHW), and the Department of Health and Aged Care.
* Access and Permissions: The main user (the user entering the child’s data) can grant access to carers or others using the app. The other person must have created an account first.
* Secured data storage: the data will be stored in the database ensuring privacy compliance. 

#### Functionalities:
* User authentication and authorisation: Use JWT for tokens to implement secure authentication.
* User role access controlled by the main user. 
* Database operations: Information to be stored in MongoDB database. CRUD operations (Create, Read, Update and Delete) for child profiles, growth data, immunisation records and notes. 
* Generate charts: Use a charting library to visualise the data. 
* Reminder system: Create and schedule reminders for upcoming vaccinations through generating an HTML Link to add to the users calendar (Google calendar, Outlook or Apple mail).
* File download functionality: Allows users to export and download a list of important numbers.
* NIP data integration: Upload the Australian NIP schedule into the database for reference
* WHO standards integration: Use WHO growth standards as a reference for percentile.

### Target Audience
The app features are created to be used primarily by parents who are interested in a simple solution for keeping track of growth metrics (weight, height, head circumference or head size) and monitor immunisation status for one or more children set up under individual profiles. It is also created for parents wanting to have an alternative to just physical records who are interested in keeping a digital record that can be easily accessed, reducing the risk of misplacing or losing hard records. 
By offering clear and simple educational information, the app can become a helpful source of education for individuals. The feature of adding notes to the profile can be used as a tool to communicate between users sharing access to a child's profile. 


### Tech Stack:
* **Frontend**:
  * React
  * Vite
* **Backend**:
  * Express
  * Node.js
* **Database**:
  * MongoDB
* **Deployment**:
  * Frontend: Netlify
  * Backend: Render
* **Packages and dependencies**:
  * Mongoose
  * Dotenv
  * Bcrypt
  * Chart.js
* **Project management**:
  * Trello
* **Other tools**:
  * Canva
  * Figma

## Design choices
As part of the design process, I created a mood board with a collection of designs and colour to reflect the idea I am going for. 

![Mood board screenshot](https://github.com/Marianne2109/T3A2/blob/main/docs/Design/Mood%20board.png)


The focus of the application is to have a simple to use and navigate application, that is minimalist and neurodivergent friendly. For this reason I decided for a colour palette with mutted tones and earthy colours that are less overstimulating. 

![Colour palette](https://github.com/Marianne2109/T3A2/blob/main/docs/Design/Colour%20scheme.png)

## R2. Dataflow Diagram
The dataflow diagram was created using the Gane and Sarson notations.

![Image of the applications Data flow diagram](https://github.com/Marianne2109/T3A2/blob/main/docs/Diagrams/DFD.png)

## R3. Application Architecture Diagram

![image of the application architecture diagram](https://github.com/Marianne2109/T3A2/blob/main/docs/Diagrams/Architecture%20Diagram.png)

The frontend or client side is built using React.js. When the client performs an action and interacts with the browser, the frontend connects with the backend using HTTP requests. React sends an HTTP request to the backend and retrieves data from an API. React processes the response and updates the web browser according to the data returned by Express. 

In the backend or server side, at this level the technologies used are Express.js built on top of Node.js. Express simplifies the process of building the API’s and it’s responsible for URL routing, handling HTTP requests and responses; Node.js provides the runtime

For the Database, MongoDB or MongoDB Atlas is used to store data in a document based structure. The tool required to connect MongoDB to Node.js is Mongoose.

The user interacts with the browser, React creates a JSON document that is sent to the Express.js server as a HTTP request. Express sends the document to MongoDB to store for future retrieval.

## R4. User Stories:
#### First Stage - User Personas
  The First Stage  was to create User Personas to help us understand the target users' needs, goals and expectations.
 1. Laura - The organised twin Mum
 2. Ella - The neurodivergent Mum
 3. Rob - The busy Dad
 4. Isabel - The helpful Nan

![Image of user persona 1 and 2](https://github.com/Marianne2109/T3A2/blob/main/docs/User%20personas/User%20Persona%201-2.png)

![Image of user persona 3 and 4](https://github.com/Marianne2109/T3A2/blob/main/docs/User%20personas/User%20Persona%203-4.png)

#### Second Stage - User Stories
  The second Stage was to create the first iteration of the User Stories for these User Personas

  1. **Laura**
  * As Laura,
    I want to track Ivy’s and Leo growth and immunisation information in separate profiles without mixing up the data.
  * As Laura,
    I want to track growth data (weight, height, head circumference) overtime for each kid so I know what their percentiles are. 
  * As Laura, 
    I want to create reminders for future immunisations so I can plan the appointments around my work commitments. 
  * As Laura,
    I want to download important numbers to share with those looking after the twins.
  * As Laura,
    I want to be in control of who can access the data and the level of access they can get.

  2. **Ella**
  * As Ella,
    I want a minimalist interface that’s straightforward so I don’t get distracted.
  * As Ella,
    I want reminders for upcoming vaccines linked with my Google Calendar so they are up to date with the National Immunisation Program.
  * As Ella,
    I want to track Frankie's growth overtime displayed in a growth chart so I have a visual representation of their growth.
  * As Ella,
    I want to quickly log Frankie's weight, height and head size without navigating multiple screens.
  * As Ella,
    I want my sister to have access to Frankie's information so she feels more informed when caring for them.
    
  3. **Rob**
  * As Rob,
    I want to share the access to our children’s data with my wife, so we can share responsibilities and reduce her mental load.
  * As Rob,
    I want to be able to access my kids information quickly so I can check it at a GP appointment.
  * As Rob,
    I want to have an online record of my kids data that is safely stored. 
  * As Rob,
    I want to have a general understanding of the vaccines adminitered under the National Immunisation Program Schedule.
  * As Rob,
    I want to take notes when we visit a healthcare professional that my wife can also access to.

    
  4. **Isabel**
  * As Isabel,
    I want to access the important numbers I may need when looking after Max so that I can call should I need it 
  * As Isabel,
    I want to read reliable and clear information about growth and vaccines so I can stay informed and prepared when I look after my grandson.
  * As Isabel,
    I want to simply login and access to Max’s data without struggling with technology
  * As Isabel,
    I want the option to download Max’s information so I can take it with me and not worry about the internet connection.
  * As Isabel,
    I want to be able to see when the next vaccination is due so I can offer to help my daughter


## R5. Wireframes for multiple standard screen sizes, created using industry standard software

### Mobile

![Mobile wireframes](https://github.com/Marianne2109/T3A2/blob/main/docs/Wireframes/Mobile%201.png)


![Mobile wireframes](https://github.com/Marianne2109/T3A2/blob/main/docs/Wireframes/Mobile%202.png)


![Mobile wireframes](https://github.com/Marianne2109/T3A2/blob/main/docs/Wireframes/Mobile%203.png)


![Mobile wireframes](https://github.com/Marianne2109/T3A2/blob/main/docs/Wireframes/Mobile%204.png)


![Mobile wireframes](https://github.com/Marianne2109/T3A2/blob/main/docs/Wireframes/Mobile%205.png)


![Mobile wireframes](https://github.com/Marianne2109/T3A2/blob/main/docs/Wireframes/Mobile%206.png)


![Mobile wireframes](https://github.com/Marianne2109/T3A2/blob/main/docs/Wireframes/Mobile%207.png)



### Desktop

![Desktop wireframes](https://github.com/Marianne2109/T3A2/blob/main/docs/Wireframes/Desktop%201.png)


![Desktop wireframes](https://github.com/Marianne2109/T3A2/blob/main/docs/Wireframes/Desktop%202.png)


![Desktop wireframes](https://github.com/Marianne2109/T3A2/blob/main/docs/Wireframes/Desktop%203.png)


![Desktop wireframes](https://github.com/Marianne2109/T3A2/blob/main/docs/Wireframes/Desktop%204.png)


![Desktop wireframes](https://github.com/Marianne2109/T3A2/blob/main/docs/Wireframes/Desktop%205.png)


![Desktop wireframes](https://github.com/Marianne2109/T3A2/blob/main/docs/Wireframes/Desktop%206.png)


![Desktop wireframes](https://github.com/Marianne2109/T3A2/blob/main/docs/Wireframes/Desktop%207.png)


## R6. Screenshot of Trello (or similar kanban system) board throughout the duration of the project
The images below show the progress in the trello board for the project. I decided to keep a simple approach to the trello board, because it's what works best for me personally, it was still the only method I used as a Project management tool. While I decided not to use additional features such as set reminders or labels, I am familiar with the additional enhanced options offered by Trello. Because I'm working solo, I felt like having a more intricated board was more time consuming in this instance. 

![Trello Board screenshots](https://github.com/Marianne2109/T3A2/blob/main/docs/Trello/Trello%201.png)


![Trello Board screenshots](https://github.com/Marianne2109/T3A2/blob/main/docs/Trello/Trello%202.png)


![Trello Board screenshots](https://github.com/Marianne2109/T3A2/blob/main/docs/Trello/Trello%203.png)


![Trello Board screenshots](https://github.com/Marianne2109/T3A2/blob/main/docs/Trello/Trello%204.png)


![Trello Board screenshots](https://github.com/Marianne2109/T3A2/blob/main/docs/Trello/Trello%205.png)


![Trello Board screenshots](https://github.com/Marianne2109/T3A2/blob/main/docs/Trello/Trello%206.png)


![Trello Board screenshots](https://github.com/Marianne2109/T3A2/blob/main/docs/Trello/Trello%207.png)


![Trello Board screenshots](https://github.com/Marianne2109/T3A2/blob/main/docs/Trello/Trello%208.png)


![Trello Board screenshots](https://github.com/Marianne2109/T3A2/blob/main/docs/Trello/Trello%209.png)


![Trello Board screenshots](https://github.com/Marianne2109/T3A2/blob/main/docs/Trello/Trello%2010.png)


![Trello Board screenshots](https://github.com/Marianne2109/T3A2/blob/main/docs/Trello/Trello%2011.png)


![Trello Board screenshots](https://github.com/Marianne2109/T3A2/blob/main/docs/Trello/Trello%2012.png)


![Trello Board screenshots](https://github.com/Marianne2109/T3A2/blob/main/docs/Trello/Trello%2013.png)

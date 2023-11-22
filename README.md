<!-- example readme :
https://github.com/cdraz/animal-connection-client-project/blob/master/README.md
 -->

# IntelliU Web Application

## Table of Contents

- [Description](#description)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Built With](#built-with)

## Description

_Duration: 3 Week Sprint_

IntelliU Web Application is a project developed by the "JadeIntelliu" team over a three-week period. The application aims to address the challenges faced by engineers in the Medical Technology field when dealing with complex medical devices regulations and standards. The project focuses on creating a user-friendly interface to interact with IntelliU's proprietary system, providing functionalities such as file management, document analysis, and result retrieval.

## Gif

![User Results Dashboard](./public/images/IntelliU.gif)

### Prerequisites

- You must have [Node.js](https://nodejs.org/en/) installed on your computer already

## Installation

1. Create a [Postgres](https://www.postgresql.org/download/) database named ``,
2. We recommend using Postico or PgAdmin to run the queries in `database.sql` as that was used to create the database. However, any database that accepts SQL language should do.

3. Create an env. file that looks like this:

```
#server Security
SERVER_SESSION_SECRET=*longpassword*

#intelliU neon DB
PGHOST='ep-word-word-123456-pooler.us-east-2.aws.neon.tech'
PGDATABASE='intelliu_group_project'
PGUSER='jadeintelliu'
PGPASSWORD='password'
ENDPOINT_ID='ep-word-word-123456-pooler'

#Sendgrid
SENDGRID_API_KEY='password'

#Cloudinary
REACT_APP_CLOUD_NAME=*password*
REACT_APP_API_KEY=*numeric code*
REACT_APP_API_SECRET=*secret password*
```

4. Open up your editor of choice and run an `npm install`
5. Run `npm run server` in your terminal
6. Run `npm run client` in your terminal

## Usage

How does someone use this application?:

Admins can:

1. Log in with their username and password
2. Add, delete, and view standards currently in the system.
3. Create new user accounts for clients and admins.

Users can:

1. Log in with your account ID and password.
2. Select an uploaded standard document and upload a documentation for analysis.
3. View results from comparing documents on the dashboard.
   (Currently the project is set to view example data to respect the privacy of IntelliU and their clients.)

## Next Steps of Development

1. Connect to the IntelliU backend api to receive the documents being compared. (A file has been started named document.intelliu.router.js in the modules folder)
2. The download button needs to be completed.
3. Emails to new users has been started but not completed

## Built With

<a href="https://react.dev/"><img width="50" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="React.js" title="React.js"></a>
<a href="https://redux-saga.js.org/"><img width="50" src="https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png" alt="Redux/Sagas" title="Redux/Sagas"></a>
<a href="https://nodejs.org/en"><img width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"></a>
<a href="https://www.npmjs.com/package/express"><img width="50" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express"></a>
<a href="https://axios-http.com/"><img width="50" src="https://cdn.icon-icons.com/icons2/2699/PNG/512/axios_logo_icon_168545.png" alt="Axios" title="Axios"></a>
<a>
<img width="50" src="https://user-images.githubusercontent.com/25181517/117208740-bfb78400-adf5-11eb-97bb-09072b6bedfc.png" alt="PostgreSQL" title="PostgreSQL"/>
</a>
<a href="https://eggerapps.at/postico/v1.php"><img width="50" src="https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/23/ba/bd/23babdc1-32b2-7c71-5445-8b28cb181a3f/AppIcon-0-85-220-4-2x.png/1200x630bb.png" alt="Postico" title="Postico"></a>
<a href="https://tailwindcss.com/"><img width="50" src="https://user-images.githubusercontent.com/25181517/187896150-cc1dcb12-d490-445c-8e4d-1275cd2388d6.png" alt="Tailwind" title="Tailwind"></a>
<a href="https://www.passportjs.org/"><img width="50" src="https://seeklogo.com/images/P/passport-logo-16D89B2F37-seeklogo.com.png" alt="Passport.js" title="Passport.js"></a>
<a href="https://sendgrid.com/en-us"><img width="50" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRttkvgpwbiA_Ij9Mv2s2QBy84BAUt7lxUxa4DThB34vQ&s" alt="Cloudinary" title="Cloudinary"></a>
<a href="https://www.npmjs.com/package/nodemon"><img width="50" src="https://user-images.githubusercontent.com/13700/35731649-652807e8-080e-11e8-88fd-1b2f6d553b2d.png
  " alt="Nodemon" title="Nodemon"></a>

## Acknowledgement

Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality.

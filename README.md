# Production_OCI
# LINUX_DELIVERIES Project Setup Guide

This guide outlines the steps to set up and run the LINUX_DELIVERIES project with a local Oracle database.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

* **Git:** For cloning the repository.
* **Docker Desktop:** For running the local Oracle database.
* **Oracle SQL Developer:** For connecting to and managing the database.
* **Maven:** For building and running the Spring Boot backend.
* **Java Development Kit (JDK):** Required by Maven and Spring Boot.

## Setup Instructions

Follow these steps to get the project running:

### a) Clone the Repository

1.  Open your terminal and navigate to the directory where you want to clone the project.
2.  Run the following command:

    ```bash
    git clone https://github.com/julianesva/LINUX_DELIVERIES.git
    ```

### b) Run a Local Oracle Database using Docker

1.  Ensure Docker Desktop is installed and running on your machine.
2.  Open the Docker Desktop terminal.
3.  Execute the following command to start a local Oracle database container:

    ```bash
    docker run -d -p 1521:1521 -e ORACLE_PASSWORD=SiQueSiDatabase2024 gvenzl/oracle-free:slim-faststart
    ```

    This command will download and run an Oracle Free database instance in a Docker container, mapping the host machine's port 1521 to the container's port 1521. The `ORACLE_PASSWORD` environment variable sets the password for the `SYS` and `SYSTEM` users.

### c) Connect to and Initialize the Database with SQL Developer

1.  **Download and Install Oracle SQL Developer:** If you haven't already, download and install Oracle SQL Developer from the official Oracle website.

2.  **Create a New Connection:**
    * You can see the example image in the next file of our repository: ORACLE_SQL_DEV.png
    * Open Oracle SQL Developer.
    * Go to `File` > `New` > `Database Connection`.
    * Fill in the connection details as follows (refer to the image below for visual guidance):

        * **Name:** `localDB` (or any name you prefer)
        * **Username:** `SYSTEM`
        * **Password:** `SiQueSiDatabase2024`
        * **Database Type:** `Oracle`
        * **Connection Type:** `Basic`
        * **Hostname:** `localhost`
        * **Port:** `1521`
        * **SID:** `free`

3.  **Create an Admin User and Grant Privileges:**
    * Once the connection is established, open a new SQL Worksheet.
    * Execute the following SQL commands to create a new administrative user (replace `admin_user` and `AdminPassword123!` with your desired username and password) and grant necessary privileges:

        ```sql
        CREATE USER admin_user IDENTIFIED BY AdminPassword123!;
        GRANT ALL PRIVILEGES TO admin_user WITH ADMIN OPTION;
        ```

    * Connect to the database using the newly created `admin_user` credentials.

4.  **Create the Database Schema:**
    * Navigate to the root of the cloned repository: `LINUX_DELIVERIES`.
    * Open the `backup.sql` file.
    * In SQL Developer (connected as the admin user), open a new SQL Worksheet and paste the contents of `backup.sql`.
    * Run the script to create the database tables and schema.

5.  **Populate the Database:**
    * Open the `inserts.sql` file from the repository.
    * In SQL Developer, open another SQL Worksheet (still connected as the admin user) and paste the contents of `inserts.sql`.
    * Run the script to insert the initial data into the database tables.

### d) Run the Spring Boot Backend

1.  Open your terminal and navigate to the backend project directory: `LINUX_DELIVERIES/MtdrSpring/backend`.
2.  Build the project using Maven:

    ```bash
    mvn clean install
    ```

    This command will download dependencies and build the Spring Boot application.

3.  Run the Spring Boot application:

    ```bash
    mvn spring:boot:run
    ```

    This command will start the backend server.

### e) Access the Application

1.  Open your web browser and navigate to the following URL:

    ```
    http://localhost:8080
    ```

2.  You should now be able to see the project running and retrieving data from your local Oracle database.

## Congratulations!

You have successfully set up and run the LINUX_DELIVERIES project with a local Oracle database.
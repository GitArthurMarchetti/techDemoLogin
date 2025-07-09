# React Native Login & Events List Demo App

This project is a simple React Native demo application showcasing a basic login flow and a list of events. It was developed as a technical assessment to evaluate understanding of React Native fundamentals, component structure, and state management.

## 🎯 Objective

Build a simple React Native demo app that showcases a basic login flow and displays a list of events. The purpose of this task is to evaluate your understanding of React Native fundamentals, component structure, and state management. Doesn't need to be complex for the login and event list, mainly need to see that your code is clean.

## ✅ Requirements Checklist

Here's a checklist of the requirements, indicating what has been implemented:

### 1. Login Screen

* [x] Display two input fields:

  * **Email**

  * **Password**

* [x] A **Login** button that:

  * [x] Validates the email and password against a static list of user credentials stored in a local JSON file (`users.json`).

  * [x] On successful login, navigates to the **Events List** screen.

  * [x] On failure, displays an error message (both `Alert.alert()` and inline red text).

### 2. Events List Screen

* [x] After login, the app should navigate to a new screen displaying a scrollable list of events.

* [x] The event data should be sourced from a static `events.json` file.

* [x] Each event item should include:

  * [x] **Event Name**

  * [x] **Date**

  * [x] **Location**

## 📁 Project Structure

The project follows the suggested file structure for clarity and modularity:
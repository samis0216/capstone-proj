## User Stories

### Homepage - Logged Out
* When I go to the website, I am greeted with a landing page with graphics and text detailing the functionality of the app. It will also invite me to Download the App; however when I click on this button, I'm alerted that this feature is not available yet.

* At the top I see a nav bar with the site logo on the left and the login/sign-up buttons on the right. Upon clicking either of these buttons, I am redirected to a separate web page with a form to either login in or sign up.

* At the bottom of the page, I see reviews with quotations from popular mainstream media (Financial Times, NY Times, BusinessInsider)and anecdotes from random users and thir platform.

### Log In
* Upon arrival to the log in page, I am prompted to provide credentials (email address and password) and see a Log In button at the bottom that submits my credentials.

* Each input has placeholder textthat rises to the top of the input area once I start typing. Once I submit, if the credentials are incorrect, the  form will not submit and the input boxes will both have red outlines and an error message.

* Upon successful submission, I am navigated to my dashboard.

## Sign Up
* At the sign up page, I am greeted a large text box for name input. There is text above this box that asks me to "Introduce Myself" with a "Hi there! My name is" under it.

* Once I begin typing in my name, two new inputs show up under the name input; one for email address and one for password.

* Button for Sign Up is always at the bottom.

* Underneath the sign up button is a line of clickable text that says "Don't use USD for currency? CLick here.". Upon clicking this, a select field appears with a list of 4 major currencies: USD, Euro, and Chinese Yuan, and Japanese Yen.

* While I input my responses, the input outline is red when input is invalid and green when it is valid for submission.

* Upon submission, I am navigated to my dashboard.

### Homepage - Logged In
My homepage shows me 3 sections:

* At the top of the page is a nav bar with the logo on the right and a profile dropdown menu with my name on it.This menu has buttons for "Your account", "create group", and log out.

* On the left is a navigation bar that has buttons of "Dashboard", "Recent Activity", and "All Expenses". There is then a divider underneath these buttons showing the groups I am a part of and a button to create a group. Another divider under that lists my friends and a button to add friends. Underneath it all will be a link to my Github and LinkedIn.

* In the middle is the main body of the site. Its contents change depending on whether Dashboard or Recent Activity is selected on the left. If Dashboard is selected, I am shown two buttons: Add an Expense and Settle Up. Underneath is 3 values: my total balance, what I owe, and what I am owed. Below these values is a split list showing who I owe money to and who owes me money. If recent activity is selected, I am shown all transactions, both mine and those of the groups I am involved in.

### Create an Expense
* When I click create an expense, a modal opens asking for who is involved, a description of the expense, the dollar amount, and the splitting method.
* There is also an option to add it to a group.
* Once the expense is created, the Dashboard updates the total balance and amounts owed accordingly as well as display the new expense in the dashboard.

### Settle Up
* Upon pressing Settle Up, a modal opens that gives me the option to record a cash payment or use Venmo/Paypal.
* Pressing Record a Cash Payment opens a form to create a payment.
* Pressing Venmo or Paypal will promopt a "Feature coming soon" alert.
* There is a save and cancel button at the bottom of the modal.

 ### Create Payment
* Opens a modal which asks how much you or someone else is paying someone.
* There is a date option for you to choose when you made the cash payment and a group option to specifiy which group it was a part of.
* Once finished, there is a submit and cancel button at the bottom that will submit the payment and update the dashboard and recent activity accordingly.

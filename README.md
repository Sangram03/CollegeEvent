

# Event Registration System

This project implements a simple Event Registration System that allows users to register for events and download their registration details as a PDF. It also provides an admin dashboard where the administrator can view all user registrations and download a PDF containing the details of all registered users.

### Features:
- **User Registration Form:** A simple form for users to submit their details (roll number, name, branch, and event choice).
- **PDF Generation for User:** Once registered, users can download a PDF containing their registration details.
- **Admin Dashboard:** The admin can view all registrations in a table format.
- **Download All Registrations:** The admin can download a PDF containing the details of all registered users.

### Technologies Used:
- **Frontend:** HTML, JavaScript (with jsPDF library for generating PDFs)
- **Backend:** Node.js with Express
- **Database:** In-memory (data is stored during runtime)
  
### How to Use:
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the server with `node server.js`.
4. Open `index.html` for user registration and `admin.html` for the admin dashboard.

### Project Structure:
- `index.html`: User registration form.
- `admin.html`: Admin dashboard to view and download all registrations.
- `script.js`: JavaScript for user-side functionality (form submission and PDF download).
- `admin_script.js`: JavaScript for admin-side functionality (view and download registrations).
- `server.js`: Backend server logic to handle registration submissions, PDF generation, and display of registrations to the admin.

---


## Screenshots

![image](https://github.com/user-attachments/assets/812b3459-6ce4-4cd5-bfa7-a6741c544a4e)

![image](https://github.com/user-attachments/assets/f4d5151b-a069-41ff-b016-86cbd59cd592)




## Authors

- [Sangram Das](https://www.github.com/sangram03)


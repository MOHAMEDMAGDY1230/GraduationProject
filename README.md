# ♻️ Smart Bins Management System API

A RESTful API built with **PHP**, **MySQL**, and **JSON** to manage a Smart Waste Collection System. The API connects IoT devices (Raspberry Pi & Sensors) with a web dashboard and mobile application, enabling real-time monitoring, tracking, and management of smart waste bins.

---

## 🚀 Features

- Secure User Authentication
- Smart Bin Management
- IoT Sensor Integration
- Real-Time Bin Monitoring
- GPS Tracking
- Trip Management
- Alert Management
- Remote Bin Commands
- Historical Sensor Readings
- Dashboard Statistics
- JSON REST API
- Role-Based Access Control (RBAC)

---

## 🛠 Technologies Used

- PHP
- MySQL
- REST API
- JSON
- XAMPP
- Apache
- Raspberry Pi
- IoT Sensors
- Git
- GitHub
- Postman

---

## 📂 Project Structure

```
smart-bins/
│
├── api/
│   ├── API.php
│   ├── auth.php
│   └── Helpers.php
│
├── database/
│
├── dashboard/
│
└── README.md
```

---

## 📡 API Modules

### Authentication
- User Login
- User Logout
- Token Authentication

### Smart Bins
- Update Sensor Data
- Get All Bins
- Get Bin Details
- Get Full Bins
- Update Bin Status

### GPS Tracking
- Add Tracking Points
- Track Collection Trips

### Commands
- Send Commands
- Retrieve Pending Commands
- Confirm Command Execution

### Alerts
- Create Alerts
- Retrieve Alerts
- Filter Active Alerts

### Trips
- Start New Trip
- View Trips
- Track Trip Status

### History
- Retrieve Historical Sensor Readings

### Dashboard
- General Statistics
- Fill Level Statistics
- Battery Statistics

---

## 📊 Database

The system is powered by **MySQL** and includes the following main tables:

- Users
- Bins
- Trips
- Tracking Points
- Alerts
- Bin Commands
- History Readings
- Maintenance Records
- Activity Logs

---

## 🔐 Authentication

The API provides secure authentication using encrypted passwords and token-based sessions.

Features include:

- Login
- Logout
- Password Hashing
- Session Management
- Role-Based Access Control (RBAC)

---

## 🌐 REST API

The API follows REST principles and exchanges data in **JSON** format.

Example Response:

```json
{
  "status": "success",
  "message": "Operation completed successfully",
  "data": {}
}
```

---

## 📍 IoT Integration

The system receives real-time data from Raspberry Pi devices, including:

- Fill Level
- Battery Level
- GPS Coordinates
- Bin Status

This information is stored in the database and displayed instantly on the dashboard.

---

## 📈 Dashboard Features

- Total Smart Bins
- Full Bins
- Active Alerts
- Battery Monitoring
- Average Fill Level
- Live Bin Status
- Collection Trips

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Smart-Bins-Management-System.git
```

### 2. Open the project folder

```bash
cd Smart-Bins-Management-System
```

### 3. Create a MySQL database

```text
smart_bins_system
```

### 4. Import the SQL file into phpMyAdmin.

### 5. Configure your database connection.

### 6. Start Apache and MySQL using XAMPP.

### 7. Access the API locally

```text
http://localhost/smart-bins/api/
```

---

## 📌 Main Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /auth.php?action=login | User Login |
| POST | /auth.php?action=logout | User Logout |
| POST | /API.php?action=update_sensor | Update Sensor Data |
| GET | /API.php?action=list_bins | Get All Bins |
| GET | /API.php?action=full_bins | Get Full Bins |
| GET | /API.php?action=get_bin | Get Bin Details |
| GET | /API.php?action=stats | Dashboard Statistics |
| POST | /API.php?action=add_tracking | Add GPS Tracking |
| POST | /API.php?action=send_command | Send Command |
| GET | /API.php?action=get_command | Retrieve Command |
| POST | /API.php?action=command_done | Complete Command |
| POST | /API.php?action=add_alert | Create Alert |
| GET | /API.php?action=list_alerts | Get Alerts |
| POST | /API.php?action=start_trip | Start Trip |
| GET | /API.php?action=list_trips | Get Trips |
| GET | /API.php?action=history | Sensor History |

---

## 📸 Screenshots

Add screenshots of:

- Login Page
- Dashboard
- Smart Bin Monitoring
- GPS Tracking
- Alerts
- Trips
- Statistics

---

## 🔮 Future Improvements

- AI-Based Waste Level Prediction
- Route Optimization
- Push Notifications
- Email Notifications
- Mobile Application
- QR Code Integration
- Cloud Deployment
- Docker Support

---

## 👨‍💻 Author

**Mohamed Magdy Abdalhamid**

Backend Developer | PHP | Laravel | MySQL

📧 mohamedmahdyelkot@gmail.com

🔗 LinkedIn:
https://linkedin.com/in/mohamed-magdy-b08147251

💻 GitHub:
https://github.com/MOHAMEDMAGDY1230

---

## 📄 License

This project was developed for educational purposes as a Graduation Project.

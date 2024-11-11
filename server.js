const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Path to JSON file for storing registrations
const registrationsFile = path.join(__dirname, 'registrations.json');

// Initialize JSON file if it doesn't exist
if (!fs.existsSync(registrationsFile)) {
    fs.writeFileSync(registrationsFile, JSON.stringify([]));
}

// Route to serve the user registration form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to serve the admin dashboard
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Handle user registration and generate PDF for individual
app.post('/register', (req, res) => {
    const { name, rollNo, branch, event } = req.body;

    const registrations = JSON.parse(fs.readFileSync(registrationsFile, 'utf-8'));
    registrations.push({ name, rollNo, branch, event });
    fs.writeFileSync(registrationsFile, JSON.stringify(registrations, null, 2));

    const doc = new PDFDocument();
    res.setHeader('Content-Disposition', 'attachment; filename=registration.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    
    doc.pipe(res);
    doc.fontSize(18).text('Event Registration', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Name: ${name}`);
    doc.text(`Roll Number: ${rollNo}`);
    doc.text(`Branch: ${branch}`);
    doc.text(`Event: ${event}`);
    doc.end();
});

// Admin route to get all registrations
app.get('/admin/registrations', (req, res) => {
    const registrations = JSON.parse(fs.readFileSync(registrationsFile, 'utf-8'));
    res.json(registrations);
});

// Admin route to download all registrations as a single PDF
app.get('/admin/downloadAllPDF', (req, res) => {
    const registrations = JSON.parse(fs.readFileSync(registrationsFile, 'utf-8'));

    const doc = new PDFDocument();
    res.setHeader('Content-Disposition', 'attachment; filename=all_registrations.pdf');
    res.setHeader('Content-Type', 'application/pdf');

    doc.pipe(res);
    doc.fontSize(18).text('All Event Registrations', { align: 'center' });
    doc.moveDown();

    registrations.forEach((registration, index) => {
        doc.fontSize(14).text(`Registration ${index + 1}`, { underline: true });
        doc.text(`Name: ${registration.name}`);
        doc.text(`Roll Number: ${registration.rollNo}`);
        doc.text(`Branch: ${registration.branch}`);
        doc.text(`Event: ${registration.event}`);
        doc.moveDown();
    });
    doc.end();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

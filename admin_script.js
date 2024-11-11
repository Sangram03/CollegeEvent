// Fetch registrations and display in the table
async function fetchRegistrations() {
    const response = await fetch('/admin/registrations');
    const registrations = await response.json();

    const tableBody = document.getElementById('registrationsTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    registrations.forEach(registration => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${registration.rollNo}</td>
            <td>${registration.name}</td>
            <td>${registration.branch}</td>
            <td>${registration.event}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Fetch and download all registrations as a PDF
document.getElementById('downloadAllPDF').addEventListener('click', async function() {
    const response = await fetch('/admin/downloadAllPDF');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'all_registrations.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
});

// Initial fetch of registrations
fetchRegistrations();

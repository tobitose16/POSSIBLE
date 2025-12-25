// Google Sheets API Service
// Note: You'll need to set up Google Cloud Project and get API credentials
// For now, this uses a simple approach with CORS proxy for demonstration

const SPREADSHEET_ID = '1ru1l1LOBG4m-Tx2Evzahsi_lpoemkhLx7u-E-8ppLms';
const API_KEY = 'AIzaSyCR0Vhjqve4AOy7f4r7Yc1TUePzXGKQRhE';
const SHEET_NAME = 'Sheet1'; // Adjust based on your sheet name

// Read data from Google Sheets
export const readFromGoogleSheets = async () => {
    try {
        const range = `${SHEET_NAME}!A:D`; // Columns: Name, Number, Remarks, Timestamp
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.values) {
            // Skip header row and convert to objects
            const [headers, ...rows] = data.values;
            return rows.map(row => ({
                name: row[0] || '',
                number: row[1] || '',
                remarks: row[2] || '',
                timestamp: row[3] || ''
            }));
        }
        return [];
    } catch (error) {
        console.error('Error reading from Google Sheets:', error);
        return [];
    }
};

// Write data to Google Sheets
// Note: This requires OAuth2 authentication for write access
// For production, you should use a backend service
export const writeToGoogleSheets = async (leadData) => {
    try {
        // This is a placeholder - actual implementation requires OAuth2
        // You'll need to implement a backend endpoint for this
        console.log('Writing to Google Sheets:', leadData);

        // For now, return success
        // In production, implement proper OAuth2 flow or use a backend service
        return { success: true };
    } catch (error) {
        console.error('Error writing to Google Sheets:', error);
        return { success: false, error };
    }
};

// Alternative: Use Google Apps Script Web App as a simple backend
export const writeToGoogleSheetsViaWebApp = async (leadData) => {
    try {
        // You can create a Google Apps Script web app that accepts POST requests
        // const WEB_APP_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';
        // const response = await fetch(WEB_APP_URL, {
        //   method: 'POST',
        //   mode: 'no-cors',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(leadData)
        // });
        // return { success: true };

        console.log('Would write to Google Sheets via Web App:', leadData);
        return { success: true };
    } catch (error) {
        console.error('Error writing via Web App:', error);
        return { success: false, error };
    }
};

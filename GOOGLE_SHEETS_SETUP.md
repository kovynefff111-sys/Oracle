# Google Sheets Integration

To make the form submissions work with your Google Sheet, you need to set up a Google Apps Script as a web app.

### 1. Set up the Google Sheet
1. Open your [Google Sheet](https://docs.google.com/spreadsheets/d/1q4vj9lbPnWAEPf6PDf3ccndinA8boPL93xitqPa97BM/edit).
2. Ensure the first row has these headers: `Date`, `Name`, `Contact`, `Service`.

### 2. Create the Google Apps Script
1. In your Google Sheet, go to **Extensions** > **Apps Script**.
2. Delete any existing code and paste the following:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.name,
    data.contact,
    data.service
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

### 3. Deploy as Web App
1. Click **Deploy** > **New deployment**.
2. Select type: **Web app**.
3. Description: `Form Submission Handler`.
4. Execute as: **Me**.
5. Who has access: **Anyone**.
6. Click **Deploy**.
7. **Copy the Web App URL**.

### 4. Update the App
1. Create a `.env.local` file in this project (if not already there).
2. Add your URL: `VITE_GOOGLE_SHEETS_URL=YOUR_COPIED_URL_HERE`.

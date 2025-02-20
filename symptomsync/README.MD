A Symptom Tracker can help users monitor their health over time and recognize patterns.

📌 Project Plan for the Symptom Tracker App
📍 Features & API Endpoints

Log Symptoms – POST /symptoms (Submit a new symptom entry)
View Symptom History – GET /symptoms (Fetch all logged symptoms)
Get Symptom Details – GET /symptoms/:id (View a single entry)
Update Symptom Entry – PATCH /symptoms/:id (Modify an entry)
Delete Symptom Entry – DELETE /symptoms/:id (Remove an entry)
📍 UI Pages
✅ Home Page – Overview of logged symptoms
✅ Log Symptom Page – Form to submit new symptoms
✅ Symptom History Page – View past entries & details

📍 Tech Stack
Backend: Node.js, Express, MongoDB (Mongoose)
Frontend: React, TailwindCSS (Optional: Next.js)
Deployment: Backend (Render/Heroku), Frontend (Vercel)
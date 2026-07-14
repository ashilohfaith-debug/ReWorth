# 🚀 Quick Start Guide — ReWorth

Get up and running in **5 minutes**.

---

## Step 1: Backend Setup (2 minutes)

```bash
# Navigate to backend
cd "recircle_hub/recircle_hub backend"

# Create virtual environment
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy env.example .env
```

**Edit `.env` file:**
```
DB_NAME=reworth
DB_USER=postgres
DB_PASSWORD=your_postgres_password
JWT_SECRET=any_random_long_string_here
GEMINI_API_KEY=
```

**Create database:**
```bash
# In psql or pgAdmin:
CREATE DATABASE reworth;

# Then run schema:
psql -U postgres -d reworth -f tables.sql
```

**Start server:**
```bash
python app.py
```

✅ Backend running at **http://localhost:5000**

---

## Step 2: Frontend Setup (30 seconds)

```bash
# Navigate to frontend
cd ../../Frontend

# Open in browser (double-click index.html)
# OR use a local server:
npx serve .
```

✅ Frontend running at **http://localhost:3000** or directly from file

---

## Step 3: Test the App (2 minutes)

1. **Open the frontend** in your browser
2. **Sign up** with any username + password (min 6 chars)
3. **AI Detector:**
   - Upload any image
   - See mock AI result (works without Gemini key!)
4. **Community:**
   - Create a post
   - Like posts
5. **Locations:**
   - Report a waste location
6. **Dashboard:**
   - Click your avatar → Dashboard
   - See your stats

---

## Step 4: Add Real AI (Optional)

1. Get a **free Gemini API key**: [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Click the **🤖 button** (bottom-right of frontend)
3. **Paste your key** and click Save
4. **Upload an image** in AI Detector
5. **See real AI results** from Google Gemini!

---

## 🎉 Done!

Your **ReWorth** platform is fully functional.

- ✅ User authentication
- ✅ AI waste detection (mock or real)
- ✅ Community posts with likes
- ✅ Location reports
- ✅ Recycling guide
- ✅ Personal dashboard
- ✅ Beautiful modern UI

---

## 🐛 Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify database `reworth` exists
- Check `.env` file has correct credentials

### Frontend can't connect
- Ensure backend is running on port 5000
- Check browser console for errors
- Try clearing localStorage: `localStorage.clear()`

### AI detector doesn't work
- **Mock mode:** Should always work (returns fake results)
- **Real AI:** Check Gemini API key is set correctly
- **Images:** Max 10 MB, JPEG/PNG/WebP/GIF only

---

## 📚 Next Steps

- Read the full **README.md** for architecture details
- Explore the **API endpoints** in `app.py`
- Customize the **recycling guide** data in `script.js`
- Add your own **waste categories**
- Deploy to **production** (Heroku, Railway, Vercel, etc.)

---

**Happy coding!** ♻

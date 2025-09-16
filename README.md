Project is still in progress : https://mock-mate-iota-taupe.vercel.app/

# MockMate  
**AI-Powered Mock Interview Platform with Instant Feedback**  

MockMate helps candidates prepare for job interviews by simulating AI-driven mock interviews and generating structured feedback. Built with **Next.js**, **Firebase Auth**, and **AI feedback scoring**, it provides an interactive way to practice and improve.  

---

## 🚀 Features  

- 🔐 **Authentication**: Sign up, Sign in, and Sign out with Firebase Auth  
- 🎯 **AI-Powered Mock Interviews**: Take interviews with AI-generated questions  
- 📝 **Structured Feedback**: Receive total score, category-wise scores, strengths, and improvement areas  
- 📊 **Interview History**: Track your past interviews and re-take sessions  
- 🖥️ **Modern UI**: Built with TailwindCSS and shadcn/ui for a smooth experience  

---

## 🛠️ Tech Stack  

- **Frontend**: [Next.js 14](https://nextjs.org/) (App Router)  
- **Backend/Auth**: [Firebase Authentication](https://firebase.google.com/docs/auth) & [Firestore](https://firebase.google.com/docs/firestore)  
- **Database**: Firestore (User & Interview data storage)  
- **UI**: TailwindCSS + shadcn/ui  
- **AI Feedback**: LLM-based scoring (category-based interview feedback)  

---
## 🧪 Usage  

### 1. Sign Up / Sign In  
- Navigate to `/sign-up` to create a new account  
- Or go to `/sign-in` if you already have an account  

### 2. Start an Interview  
- From the homepage, click **"Start an Interview"**  
- The AI interviewer will begin asking specific questions in order to create well-tailored interview

### 3. Receive Feedback  
- At the end of the interview, structured feedback is generated:  
  - **Total Score** (0–100)  
  - **Category Scores** (Communication, Technical Knowledge, Problem-Solving, Cultural Fit, Confidence & Clarity)  
  - **Strengths**  
  - **Areas for Improvement**  
  - **Final Assessment**  

### 4. View Past Generated Interviews  
- Visit **Your Interviews** section on the homepage  
- Review previous interviews, take an interview and get access to feedback reports  

### 5. Sign Out  
- Click the **Sign Out** button in the navbar to end your session  

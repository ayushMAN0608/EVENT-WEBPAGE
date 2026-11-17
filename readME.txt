# IEM Events Portal — Dept. of CSE (AIML)

Official event showcase and student registration web portal for the **Department of Computer Science & Engineering (Artificial Intelligence & Machine Learning)** at the **Institute of Engineering & Management (IEM), Kolkata**.

Built with vanilla HTML5, CSS3, and JavaScript, the portal highlights flagship departmental fests (**IEMPACT** and **INNOVACION**), provides live countdown timers, and features a multi-step student registration flow with Gmail OTP verification.

---

## ✨ Features

* **Adaptive Light & Dark Theme:** Persistent theme switcher (`localStorage`) with smooth CSS variable transitions.
* **Live IST Clock & Event Countdown:** Real-time Indian Standard Time (IST) clock and dynamic countdown timer leading up to **IEMPACT**.
* **Interactive Event Switcher:** Tabbed stage view allowing students to toggle between **IEMPACT** (scheduled details & mini countdown) and **INNOVACION** (upcoming exhibition overview).
* **3-Step Student Registration Flow:**
  1. **Gmail Verification:** Validates `@gmail.com` addresses and generates a 6-digit demo OTP with auto-advancing input boxes.
  2. **Student Details & Validation:** Enforces 10-digit University Roll Number and Phone Number formatting, department selection, and required fields.
  3. **Instant Confirmation Summary:** Displays a formatted summary card upon successful submission.
* **Filterable Event Gallery:** Responsive image grid with category filters (*All*, *Hackathons*, *Workshops*).
* **Responsive Mobile Navigation:** Collapsible hamburger menu and mobile-first grid layouts.

---

## 📁 Project Structure

```text
events/
├── iem-events.html   # Main semantic HTML5 document
├── style.css         # Responsive stylesheet, CSS custom properties & dark mode tokens
├── document.js       # Countdown logic, OTP simulation, form validation & UI interactivity
└── README.md         # Project documentation
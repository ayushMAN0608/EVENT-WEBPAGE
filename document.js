document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeBtn = document.getElementById('theme');
  const body = document.body;
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    themeBtn.textContent = '☀';
  }
  themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    themeBtn.textContent = isDark ? '☀' : '☾';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Mobile Menu Burger
  const burger = document.getElementById('burger');
  const links = document.getElementById('links');
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    burger.textContent = open ? '✕' : '☰';
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.textContent = '☰';
  }));

  // Live Clock & Countdown to IEMPACT (Jan 16, 2027)
  const clockEl = document.getElementById('clock');
  const targetDate = new Date('2027-01-16T09:00:00+05:30');
  const dEl = document.querySelector('[data-u="d"]');
  const hEl = document.querySelector('[data-u="h"]');
  const mEl = document.querySelector('[data-u="m"]');
  const sEl = document.querySelector('[data-u="s"]');

  function updateClockAndTimer() {
    const now = new Date();
    if (clockEl) {
      clockEl.textContent = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
    }
    const diff = targetDate - now;
    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      if (dEl) dEl.textContent = days;
      if (hEl) hEl.textContent = String(hours).padStart(2, '0');
      if (mEl) mEl.textContent = String(mins).padStart(2, '0');
      if (sEl) sEl.textContent = String(secs).padStart(2, '0');
    }
  }
  setInterval(updateClockAndTimer, 1000);
  updateClockAndTimer();

  // Events Selector Tabs
  const panel = document.getElementById('panel');
  const picks = document.querySelectorAll('.pick');
  const eventDetails = {
    iempact: `<h3>IEMPACT</h3><p class="when">16 January · Main Auditorium &amp; Labs</p><div class="mini"><div><b data-cd="d">16</b><span>Days</span></div><div><b data-cd="h">08</b><span>Hours</span></div><div><b data-cd="m">45</b><span>Mins</span></div><div><b data-cd="s">30</b><span>Secs</span></div></div><p>Annual flagship techno-management fest featuring hackathons, AI paper presentations, coding sprints, and expert talks by industry leaders.</p>`,
    innovacion: `<h3>INNOVACION</h3><p class="when">Date to be announced · CSE(AIML) Department</p><div class="tbd"><i></i>TBD</div><p>Our premier technical exhibition showcasing cutting-edge machine learning models, robotics, IoT innovations, and student research projects.</p>`
  };

  picks.forEach(btn => {
    btn.addEventListener('click', () => {
      picks.forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      const ev = btn.dataset.ev;
      if (panel && eventDetails[ev]) panel.innerHTML = eventDetails[ev];
    });
  });
  if (picks.length > 0) picks[0].click();

  // Registration & OTP Flow State
  let currentOtp = '';
  let verifiedEmail = '';
  const s1 = document.getElementById('s1');
  const s2 = document.getElementById('s2');
  const s3 = document.getElementById('s3');
  const steps = document.getElementById('steps').children;
  const gmInput = document.getElementById('gm');
  const sendBtn = document.getElementById('send');
  const otpBox = document.getElementById('otpBox');
  const sentTo = document.getElementById('sentTo');
  const otpContainer = document.getElementById('otp');
  const verifyBtn = document.getElementById('verify');
  const m1 = document.getElementById('m1');

  // Build OTP 6-digit inputs
  for (let i = 0; i < 6; i++) {
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.maxLength = '1';
    inp.inputMode = 'numeric';
    inp.addEventListener('input', (e) => {
      if (e.target.value && e.target.nextElementSibling) {
        e.target.nextElementSibling.focus();
      }
    });
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'BackSpace' && !e.target.value && e.target.previousElementSibling) {
        e.target.previousElementSibling.focus();
      }
    });
    otpContainer.appendChild(inp);
  }

  function showStep(n) {
    s1.hidden = n !== 1;
    s2.hidden = n !== 2;
    s3.hidden = n !== 3;
    steps[0].className = n === 1 ? 'on' : (n > 1 ? 'done' : '');
    steps[1].className = n === 2 ? 'on' : (n > 2 ? 'done' : '');
    steps[2].className = n === 3 ? 'on' : '';
  }

  sendBtn.addEventListener('click', () => {
    const val = gmInput.value.trim();
    if (!val || !val.endsWith('@gmail.com')) {
      document.getElementById('e-gm').textContent = 'Please enter a valid @gmail.com address.';
      gmInput.closest('.f').classList.add('bad');
      return;
    }
    document.getElementById('e-gm').textContent = '';
    gmInput.closest('.f').classList.remove('bad');
    
    verifiedEmail = val;
    currentOtp = Math.floor(100000 + Math.random() * 900000).toString();
    sentTo.textContent = val;
    otpBox.hidden = false;
    m1.textContent = `[Demo OTP sent]: Your code is ${currentOtp}`;
    m1.className = 'msg ok';
  });

  verifyBtn.addEventListener('click', () => {
    const inputs = otpContainer.children;
    let entered = '';
    for (let inp of inputs) entered += inp.value;

    if (entered === currentOtp) {
      document.getElementById('vm').value = verifiedEmail;
      showStep(2);
    } else {
      m1.textContent = 'Invalid verification code. Please try again.';
      m1.className = 'msg err';
    }
  });

  document.getElementById('change').addEventListener('click', () => {
    showStep(1);
    otpBox.hidden = true;
    m1.textContent = '';
    gmInput.value = '';
  });

  // Step 2 Form Submission Validation
  s2.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('nm');
    const roll = document.getElementById('rl');
    const dept = document.getElementById('dp');
    const phone = document.getElementById('ph');
    const eventSel = document.getElementById('ev');

    [name, roll, dept, phone, eventSel].forEach(el => {
      const parent = el.closest('.f') || el.closest('.two') || el;
      if (!el.value.trim()) {
        valid = false;
        parent.classList.add('bad');
        const er = parent.querySelector('.er');
        if (er) er.textContent = 'This field is required.';
      } else {
        parent.classList.remove('bad');
        const er = parent.querySelector('.er');
        if (er) er.textContent = '';
      }
    });

    if (roll.value.trim() && !/^\d{10}$/.test(roll.value.trim())) {
      valid = false;
      roll.closest('.f').classList.add('bad');
      roll.closest('.f').querySelector('.er').textContent = 'Roll number must be 10 digits.';
    }

    if (phone.value.trim() && !/^\d{10}$/.test(phone.value.trim())) {
      valid = false;
      phone.closest('.f').classList.add('bad');
      phone.closest('.f').querySelector('.er').textContent = 'Phone number must be 10 digits.';
    }

    const genderChecked = document.querySelector('input[name="g"]:checked');
    const gdFieldset = document.getElementById('gd');
    if (!genderChecked) {
      valid = false;
      gdFieldset.classList.add('bad');
      gdFieldset.querySelector('.er').textContent = 'Please select a gender option.';
    } else {
      gdFieldset.classList.remove('bad');
      gdFieldset.querySelector('.er').textContent = '';
    }

    if (valid) {
      const sum = document.getElementById('sum');
      sum.innerHTML = `
        <dt>Name</dt><dd>${name.value}</dd>
        <dt>Roll No</dt><dd>${roll.value}</dd>
        <dt>Department</dt><dd>${dept.value}</dd>
        <dt>Gmail</dt><dd>${verifiedEmail}</dd>
        <dt>Phone</dt><dd>${phone.value}</dd>
        <dt>Event</dt><dd>${eventSel.value}</dd>
      `;
      showStep(3);
    }
  });

  document.getElementById('again').addEventListener('click', () => {
    s2.reset();
    showStep(1);
    otpBox.hidden = true;
    m1.textContent = '';
    gmInput.value = '';
  });

  // Gallery Filter
  const filterBtns = document.querySelectorAll('.fc');
  const figures = document.querySelectorAll('.grid figure');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      const cat = btn.dataset.c;
      figures.forEach(fig => {
        if (cat === 'all' || fig.dataset.c === cat) {
          fig.classList.remove('hide');
        } else {
          fig.classList.add('hide');
        }
      });
    });
  });
});
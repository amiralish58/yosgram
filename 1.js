const slides = document.querySelectorAll('.fade-slide');
const nextSlideBtn = document.getElementById('nextSlideBtn');
let currentSlide = 0;

function showNextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

// نمایش خودکار هر 3 ثانیه
setInterval(showNextSlide, 3000);

// نمایش با کلیک روی دکمه
nextSlideBtn.addEventListener('click', showNextSlide);

const isLoggedIn = localStorage.getItem("userToken") !== null;

if (isLoggedIn) {
  document.getElementById("btn-login").style.display = "none";
  document.getElementById("btn-subscribe").innerText = "اشتراک من";
  document.getElementById("btn-panel").style.display = "inline-block";
} else {
  document.getElementById("btn-panel").addEventListener("click", () => {
    window.location.href = "/login.html";
  });
}

if (isLoggedIn) {
  document.getElementById("btn-subscribe").innerText = "اشتراک من";
}

if (isLoggedIn) {
  document.getElementById("btn-login").style.display = "none";
  document.getElementById("monthly-info").style.display = "none";
  document.getElementById("yearly-info").style.display = "none";
}

function submitPageInfo() {
  const instaId = document.getElementById('instaId').value;
  const pageTopic = document.getElementById('pageTopic').value;

  if (!instaId || !pageTopic) {
    alert("لطفاً آیدی و موضوع پیج را وارد کنید.");
    return;
  }

  localStorage.setItem("instaId", instaId);
  localStorage.setItem("pageTopic", pageTopic);

  // نمایش پنل وضعیت
  document.getElementById("statusBox").style.display = "block";

  // تنظیم اولیه
  updateStatus();
}

function updateStatus() {
  const lastIdeaTime = localStorage.getItem("lastIdeaTime");
  const videoCount = parseInt(localStorage.getItem("videoCount") || "0");
  document.getElementById("videoCount").innerText = videoCount;

  const getIdeaBtn = document.getElementById("getIdeaBtn");

  if (lastIdeaTime) {
    const now = Date.now();
    const elapsed = now - parseInt(lastIdeaTime);
    const remaining = 48 * 60 * 60 * 1000 - elapsed; // 48 ساعت

    if (remaining > 0) {
      getIdeaBtn.disabled = true;
      startCountdown(remaining);
    } else {
      getIdeaBtn.disabled = false;
      document.getElementById("nextIdeaTimer").innerText = "الان می‌تونی دریافت کنی 🎉";
    }
  } else {
    getIdeaBtn.disabled = false;
    document.getElementById("nextIdeaTimer").innerText = "الان می‌تونی دریافت کنی 🎉";
  }
}

function startCountdown(ms) {
  const timerElement = document.getElementById("nextIdeaTimer");

  function update() {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    timerElement.innerText = `${hours}س ${minutes}د ${seconds}ث`;

    if (ms <= 0) {
      clearInterval(interval);
      updateStatus();
    }

    ms -= 1000;
  }

  update();
  const interval = setInterval(update, 1000);
}

function getIdea() {
  // کاربر ایده دریافت کرد → زمان ذخیره کن
  localStorage.setItem("lastIdeaTime", Date.now().toString());

  // تعداد ویدیو اضافه کن
  let videoCount = parseInt(localStorage.getItem("videoCount") || "0");
  videoCount++;
  localStorage.setItem("videoCount", videoCount);

  alert("ایده جدیدت آماده‌ست! (محتوای ایده رو باید جدا بسازیم)");
  updateStatus();
}

// اگه اطلاعاتی ذخیره شده بود، بعد از لود صفحه نمایش بده
window.onload = () => {
  if (localStorage.getItem("instaId")) {
    document.getElementById("statusBox").style.display = "block";
    updateStatus();
  }
};



function downloadImage() {
  const canvas = document.getElementById("canvas");
  const link = document.createElement("a");
  link.download = "cover.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

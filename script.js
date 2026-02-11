const printBtn = document.getElementById("printBtn");
const profilePhoto = document.getElementById("profilePhoto");
const photoFallback = document.getElementById("photoFallback");
const rootEl = document.documentElement;
const sheetEl = document.querySelector(".biodata-sheet");

const A4_SAFE_HEIGHT_MM = 300;
const PX_PER_MM = 96 / 25.4;

function setPrintScale() {
  if (!sheetEl) return;

  // Reset to natural size before measuring.
  rootEl.style.setProperty("--print-scale", "1");

  const naturalHeight = sheetEl.scrollHeight;
  const targetHeight = A4_SAFE_HEIGHT_MM * PX_PER_MM;
  const scale = Math.min(1, targetHeight / naturalHeight);

  // Allow tighter scaling to enforce single-page PDF when content is long.
  const safeScale = Math.max(scale, 0.6);
  rootEl.style.setProperty("--print-scale", safeScale.toFixed(4));
}

function resetPrintScale() {
  rootEl.style.setProperty("--print-scale", "1");
}

if (printBtn) {
  printBtn.addEventListener("click", () => {
    setPrintScale();
    window.print();
  });
}

if (profilePhoto && photoFallback) {
  profilePhoto.addEventListener("error", () => {
    profilePhoto.style.display = "none";
    photoFallback.style.display = "grid";
  });

  profilePhoto.addEventListener("load", () => {
    profilePhoto.style.display = "block";
    photoFallback.style.display = "none";
  });
}

window.addEventListener("beforeprint", setPrintScale);
window.addEventListener("afterprint", resetPrintScale);

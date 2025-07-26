export function handleExpiredToken() {
  localStorage.clear();
  window.location.href = "/login"; // 🔁 Redirige al login
}
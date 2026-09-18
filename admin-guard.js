(function () {
  "use strict";

  const BACKEND_URL = "https://sanctuary-backend-8iqc.onrender.com";
  const TOKEN_KEY = "adminToken";
  const LOGIN_URL = "admin-login.html?reason=session-expired";
  const RECHECK_AFTER_MS = 60 * 1000;

  let expiryTimer = null;
  let validationPromise = null;
  let lastValidatedAt = 0;
  let redirecting = false;

  document.documentElement.classList.add("admin-auth-pending");

  const style = document.createElement("style");
  style.textContent =
    "html.admin-auth-pending body{visibility:hidden!important}" +
    "html.admin-auth-denied body{pointer-events:none!important}";
  document.head.appendChild(style);

  function expireAdminSession() {
    if (redirecting) return;
    redirecting = true;

    if (expiryTimer) {
      window.clearTimeout(expiryTimer);
      expiryTimer = null;
    }

    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (_) {}

    document.documentElement.classList.remove("admin-auth-pending");
    document.documentElement.classList.add("admin-auth-denied");
    window.location.replace(LOGIN_URL);
  }

  window.scExpireAdminSession = expireAdminSession;

  function decodePayload(token) {
    try {
      const part = String(token || "").split(".")[0];
      if (!part) return null;

      const base64 = part
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        .padEnd(Math.ceil(part.length / 4) * 4, "=");

      return JSON.parse(atob(base64));
    } catch (_) {
      return null;
    }
  }

  function scheduleExpiry(payload) {
    if (expiryTimer) {
      window.clearTimeout(expiryTimer);
      expiryTimer = null;
    }

    const expiresAt = Number(payload && payload.exp) * 1000;
    if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
      expireAdminSession();
      return false;
    }

    expiryTimer = window.setTimeout(
      expireAdminSession,
      Math.max(0, expiresAt - Date.now())
    );

    return true;
  }

  async function validateAdminSession(force) {
    if (redirecting) return false;

    if (
      !force &&
      lastValidatedAt &&
      Date.now() - lastValidatedAt < RECHECK_AFTER_MS
    ) {
      return true;
    }

    if (validationPromise) return validationPromise;

    validationPromise = (async function () {
      const token = localStorage.getItem(TOKEN_KEY) || "";
      const payload = decodePayload(token);

      if (
        !token ||
        !payload ||
        !Array.isArray(payload.roles) ||
        !payload.roles.includes("admin") ||
        !scheduleExpiry(payload)
      ) {
        expireAdminSession();
        return false;
      }

      try {
        const response = await fetch(BACKEND_URL + "/api/admin/whoami", {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + token
          },
          cache: "no-store"
        });

        const data = await response.json().catch(function () {
          return {};
        });

        if (!response.ok || data.success !== true || data.is_admin !== true) {
          expireAdminSession();
          return false;
        }

        lastValidatedAt = Date.now();
        document.documentElement.classList.remove(
          "admin-auth-pending",
          "admin-auth-denied"
        );
        return true;
      } catch (_) {
        expireAdminSession();
        return false;
      } finally {
        validationPromise = null;
      }
    })();

    return validationPromise;
  }

  window.adminGuardReady = validateAdminSession(true);
  window.scValidateAdminSession = function () {
    return validateAdminSession(true);
  };

  window.addEventListener("focus", function () {
    validateAdminSession(false);
  });

  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) validateAdminSession(false);
  });

  window.addEventListener("pageshow", function (event) {
    if (event.persisted) validateAdminSession(true);
  });
})();

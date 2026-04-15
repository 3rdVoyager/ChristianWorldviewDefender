const ui = {
  fallacyReference: document.getElementById("fallacy-reference"),
  fallacyReferenceToggle: document.getElementById("fallacy-reference-toggle"),
  fallacyReferenceClose: document.getElementById("fallacy-reference-close"),
  themeToggle: document.getElementById("theme-toggle"),
  disciplineSelect: document.getElementById("discipline-select"),
  worldviewSelect: document.getElementById("worldview-select"),
  searchInput: document.getElementById("argument-search"),
  resultCount: document.getElementById("result-count"),
  claimsList: document.getElementById("claims-list"),
  responseCard: document.getElementById("response-card")
};

const THEME_STORAGE_KEY = "worldview-theme";
const disciplines = [
  "Theology",
  "Philosophy",
  "Ethics",
  "Biology",
  "Psychology",
  "Sociology",
  "Law",
  "Politics",
  "Economics",
  "History"
].map((disciplineName) => ({
  id: toDisciplineId(disciplineName),
  name: disciplineName
}));

function setFallacyReferenceOpen(isOpen) {
  if (!ui.fallacyReference || !ui.fallacyReferenceToggle) {
    return;
  }

  ui.fallacyReference.hidden = !isOpen;
  ui.fallacyReference.setAttribute("aria-hidden", String(!isOpen));
  ui.fallacyReferenceToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.style.overflow = isOpen ? "hidden" : "";
}

function setupFallacyReference() {
  if (!ui.fallacyReference || !ui.fallacyReferenceToggle) {
    return;
  }

  ui.fallacyReferenceToggle.onclick = () => {
    const isOpen = ui.fallacyReference.hidden;
    setFallacyReferenceOpen(isOpen);
  };

  if (ui.fallacyReferenceClose) {
    ui.fallacyReferenceClose.onclick = () => {
      setFallacyReferenceOpen(false);
    };
  }

  const backdrop = ui.fallacyReference.querySelector(".modal-backdrop");
  if (backdrop) {
    backdrop.onclick = () => {
      setFallacyReferenceOpen(false);
    };
  }

  ui.fallacyReference.onclick = (event) => {
    if (event.target === ui.fallacyReference) {
      setFallacyReferenceOpen(false);
    }
  };

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && ui.fallacyReference && !ui.fallacyReference.hidden) {
      setFallacyReferenceOpen(false);
    }
  });
}

function applyTheme(theme) {
  const mode = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", mode);

  if (ui.themeToggle) {
    const isDark = mode === "dark";
    ui.themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
    ui.themeToggle.setAttribute("aria-pressed", String(isDark));
  }
}

function getPreferredTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "dark" || saved === "light") {
      return saved;
    }
  } catch {
    // If storage is blocked, fall back to OS preference.
  }

  const prefersDark =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

function setupThemeToggle() {
  applyTheme(getPreferredTheme());

  if (!ui.themeToggle) {
    return;
  }

  ui.themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Ignore storage errors and keep runtime theme change.
    }
  });
}

function toDisciplineId(disciplineName) {
  return disciplineName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function toWorldviewId(worldviewName) {
  return worldviewName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function getWorldviews() {
  const seen = new Set();

  return worldviewData
    .flatMap((claim) => (Array.isArray(claim.worldview) ? claim.worldview : []))
    .filter((worldviewName) => {
      if (!worldviewName || seen.has(worldviewName)) {
        return false;
      }
      seen.add(worldviewName);
      return true;
    })
    .map((worldviewName) => ({ id: toWorldviewId(worldviewName), name: worldviewName }));
}

const worldviews = getWorldviews();

const state = {
  activeDisciplineId: null,
  activeWorldviewId: null,
  searchTerm: "",
  activeClaimId: null
};

function getFilteredClaims() {
  let filtered = worldviewData;

  if (state.activeDisciplineId) {
    filtered = filtered.filter((claim) => {
      if (!Array.isArray(claim.disciplines)) {
        return false;
      }
      return claim.disciplines.some(
        (discipline) => toDisciplineId(discipline) === state.activeDisciplineId
      );
    });
  }

  if (state.activeWorldviewId) {
    filtered = filtered.filter((claim) => {
      if (!Array.isArray(claim.worldview)) {
        return false;
      }
      return claim.worldview.some((item) => toWorldviewId(item) === state.activeWorldviewId);
    });
  }

  if (state.searchTerm) {
    const term = state.searchTerm.toLowerCase();
    filtered = filtered.filter((claim) => {
      const argumentText = (claim.argument || "").toLowerCase();
      const disciplineText = Array.isArray(claim.disciplines)
        ? claim.disciplines.join(" ").toLowerCase()
        : "";
      return argumentText.includes(term) || disciplineText.includes(term);
    });
  }

  return filtered;
}

function renderFilterSummary(resultCount) {
  if (!ui.resultCount) {
    return;
  }

  ui.resultCount.textContent = `${resultCount} argument(s) found`;
}

function renderDisciplineFilters() {
  if (!ui.disciplineSelect) {
    return;
  }

  ui.disciplineSelect.innerHTML = "";

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = "Filter by discipline";
  ui.disciplineSelect.appendChild(placeholderOption);

  disciplines.forEach((discipline) => {
    const option = document.createElement("option");
    option.value = discipline.id;
    option.textContent = discipline.name;
    ui.disciplineSelect.appendChild(option);
  });

  ui.disciplineSelect.value = state.activeDisciplineId || "";
  ui.disciplineSelect.disabled = false;
}

function renderWorldviewFilters() {
  if (!ui.worldviewSelect) {
    return;
  }

  ui.worldviewSelect.innerHTML = "";

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = "Filter by worldview";
  ui.worldviewSelect.appendChild(placeholderOption);

  worldviews.forEach((worldview) => {
    const option = document.createElement("option");
    option.value = worldview.id;
    option.textContent = worldview.name;
    ui.worldviewSelect.appendChild(option);
  });

  ui.worldviewSelect.value = state.activeWorldviewId || "";

  if (worldviews.length === 0) {
    const noOptions = document.createElement("option");
    noOptions.value = "";
    noOptions.textContent = "No worldviews yet";
    ui.worldviewSelect.innerHTML = "";
    ui.worldviewSelect.appendChild(noOptions);
    ui.worldviewSelect.disabled = true;
    ui.worldviewSelect.value = "";
  } else {
    ui.worldviewSelect.disabled = false;
  }
}

function setupFilters() {
  if (ui.disciplineSelect) {
    ui.disciplineSelect.addEventListener("change", (event) => {
      state.activeDisciplineId = event.target.value || null;
      state.activeClaimId = null;
      renderClaims();
      renderResponse();
    });
  }

  if (ui.worldviewSelect) {
    ui.worldviewSelect.addEventListener("change", (event) => {
      state.activeWorldviewId = event.target.value || null;
      state.activeClaimId = null;
      renderClaims();
      renderResponse();
    });
  }

  if (ui.searchInput) {
    ui.searchInput.addEventListener("input", (event) => {
      state.searchTerm = event.target.value.trim();
      state.activeClaimId = null;
      renderClaims();
      renderResponse();
    });
  }
}

function renderClaims() {
  if (!ui.claimsList) {
    return;
  }

  const claims = getFilteredClaims();
  ui.claimsList.innerHTML = "";
  renderFilterSummary(claims.length);

  if (!claims.length) {
    ui.claimsList.innerHTML = "<p class=\"placeholder\">No arguments match this filter yet.</p>";
    return;
  }

  claims.forEach((claim) => {
    const button = document.createElement("button");
    button.className = `claim-btn ${claim.id === state.activeClaimId ? "active" : ""}`;
    button.type = "button";
    button.textContent = claim.argument;

    button.addEventListener("click", () => {
      state.activeClaimId = claim.id;
      renderClaims();
      renderResponse();
    });

    ui.claimsList.appendChild(button);
  });
}

function renderResponse() {
  if (!ui.responseCard) {
    return;
  }

  const claims = getFilteredClaims();
  const claim = claims.find((item) => item.id === state.activeClaimId);

  if (!claim) {
    ui.responseCard.innerHTML = "<p class=\"placeholder\">Select a claim to view details.</p>";
    return;
  }

  const reasoningItems = (claim.supportingReasoning || [])
    .map((point) => `<li>${point}</li>`)
    .join("");

  const disciplineItems = (claim.disciplines || [])
    .map((discipline) => `<span class="chip">${discipline}</span>`)
    .join("");

  const worldviewItems = (claim.worldview || [])
    .map((item) => `<span class="chip">${item}</span>`)
    .join("");

  ui.responseCard.innerHTML = `
    <div class="response-block">
      <h4>Core Issue With The Claim</h4>
      <p>${claim.coreIssue || "Not added yet."}</p>
    </div>
    <div class="response-block">
      <h4>Christian Worldview Response</h4>
      <p>${claim.christianResponse || "Not added yet."}</p>
    </div>
    <div class="response-block">
      <h4>Logical Error / Fallacy</h4>
      <p>${claim.logicalFallacy || "No logical error or fallacy listed for this claim yet."}</p>
    </div>
    <div class="response-block">
      <h4>Supporting Reasoning</h4>
      ${reasoningItems ? `<ul class="reason-list">${reasoningItems}</ul>` : "<p>Not added yet.</p>"}
    </div>
    <div class="response-block meta-block">
      <h4>Disciplines</h4>
      ${
        disciplineItems
          ? `<div class="chip-wrap">${disciplineItems}</div>`
          : "<p>No disciplines listed for this claim yet.</p>"
      }
    </div>
    <div class="response-block meta-block">
      <h4>Worldview(s)</h4>
      ${worldviewItems ? `<div class="chip-wrap">${worldviewItems}</div>` : "<p>No worldview listed for this claim yet.</p>"}
    </div>
  `;
}

function initializeApp() {
  setupFallacyReference();
  setupThemeToggle();
  setupFilters();
  renderDisciplineFilters();
  renderWorldviewFilters();
  renderClaims();
  renderResponse();
}

initializeApp();

const ui = {
  themeToggle: document.getElementById("theme-toggle"),
  tagSelect: document.getElementById("tag-select"),
  worldviewSelect: document.getElementById("worldview-select"),
  searchInput: document.getElementById("argument-search"),
  resultCount: document.getElementById("result-count"),
  claimsList: document.getElementById("claims-list"),
  responseCard: document.getElementById("response-card")
};

const THEME_STORAGE_KEY = "worldview-theme";

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

function toTagId(tagName) {
  return tagName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function getTags() {
  const seen = new Set();

  return worldviewData
    .flatMap((claim) => (Array.isArray(claim.tags) ? claim.tags : []))
    .filter((tagName) => {
      if (!tagName || seen.has(tagName)) {
        return false;
      }
      seen.add(tagName);
      return true;
    })
    .map((tagName) => ({ id: toTagId(tagName), name: tagName }));
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

const tags = getTags();
const worldviews = getWorldviews();

const state = {
  activeCategoryId: null,
  activeWorldviewId: null,
  searchTerm: "",
  activeClaimId: null
};

function getFilteredClaims() {
  let filtered = worldviewData;

  if (state.activeCategoryId) {
    filtered = filtered.filter((claim) => {
      if (!Array.isArray(claim.tags)) {
        return false;
      }
      return claim.tags.some((tag) => toTagId(tag) === state.activeCategoryId);
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
      const tagText = Array.isArray(claim.tags) ? claim.tags.join(" ").toLowerCase() : "";
      return argumentText.includes(term) || tagText.includes(term);
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

function renderTagFilters() {
  if (!ui.tagSelect) {
    return;
  }

  ui.tagSelect.innerHTML = "";

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = "Filter by tag";
  ui.tagSelect.appendChild(placeholderOption);

  tags.forEach((tag) => {
    const option = document.createElement("option");
    option.value = tag.id;
    option.textContent = tag.name;
    ui.tagSelect.appendChild(option);
  });

  ui.tagSelect.value = state.activeCategoryId || "";

  if (tags.length === 0) {
    const noTagsOption = document.createElement("option");
    noTagsOption.value = "";
    noTagsOption.textContent = "No tags yet";
    ui.tagSelect.innerHTML = "";
    ui.tagSelect.appendChild(noTagsOption);
    ui.tagSelect.disabled = true;
    ui.tagSelect.value = "";
  } else {
    ui.tagSelect.disabled = false;
  }
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
  if (ui.tagSelect) {
    ui.tagSelect.addEventListener("change", (event) => {
      state.activeCategoryId = event.target.value || null;
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

  const verseItems = (claim.bibleVerses || [])
    .map((verse) => `<li>${verse}</li>`)
    .join("");

  const tagItems = (claim.tags || [])
    .map((tag) => `<span class="chip">${tag}</span>`)
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
      <h4>Bible Verse(s)</h4>
      ${verseItems ? `<ul class="reason-list">${verseItems}</ul>` : "<p>No Bible verses listed for this claim yet.</p>"}
    </div>
    <div class="response-block">
      <h4>Supporting Reasoning</h4>
      ${reasoningItems ? `<ul class="reason-list">${reasoningItems}</ul>` : "<p>Not added yet.</p>"}
    </div>
    <div class="response-block meta-block">
      <h4>Tags</h4>
      ${tagItems ? `<div class="chip-wrap">${tagItems}</div>` : "<p>No tags listed for this claim yet.</p>"}
    </div>
    <div class="response-block meta-block">
      <h4>Worldview(s)</h4>
      ${worldviewItems ? `<div class="chip-wrap">${worldviewItems}</div>` : "<p>No worldview listed for this claim yet.</p>"}
    </div>
  `;
}

function initializeApp() {
  setupThemeToggle();
  setupFilters();
  renderTagFilters();
  renderWorldviewFilters();
  renderClaims();
  renderResponse();
}

initializeApp();

const ui = {
  homeCards: document.getElementById("home-category-cards"),
  tagSelect: document.getElementById("tag-select"),
  searchInput: document.getElementById("argument-search"),
  filterSummary: document.getElementById("filter-summary"),
  claimsList: document.getElementById("claims-list"),
  responseCard: document.getElementById("response-card"),
  navButtons: document.querySelectorAll(".nav-btn")
};

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

const tags = getTags();

const state = {
  activeCategoryId: null,
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

function getTagNameById(tagId) {
  if (!tagId) {
    return "No tag selected";
  }

  const tag = tags.find((item) => item.id === tagId);
  return tag ? tag.name : "Unknown tag";
}

function renderFilterSummary(resultCount) {
  if (!ui.filterSummary) {
    return;
  }

  const tagName = getTagNameById(state.activeCategoryId);
  const searchPart = state.searchTerm ? ` | Search: "${state.searchTerm}"` : "";
  ui.filterSummary.textContent = `${resultCount} argument(s) found | Tag: ${tagName}${searchPart}`;
}

function renderTagFilters() {
  if (!ui.tagSelect) {
    return;
  }

  ui.tagSelect.innerHTML = "";

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = "Filter by tag (optional)";
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

function setupFilters() {
  if (ui.tagSelect) {
    ui.tagSelect.addEventListener("change", (event) => {
      state.activeCategoryId = event.target.value || null;
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

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function renderHomeCards() {
  if (!ui.homeCards) {
    return;
  }

  ui.homeCards.innerHTML = "";

  if (!tags.length) {
    return;
  }

  const cards = tags.map((tag) => ({ ...tag, shortDescription: "Filter arguments by this tag." }));

  cards.forEach((tag) => {
    const button = document.createElement("button");
    button.className = "card-btn";
    button.type = "button";
    button.innerHTML = `<h3>${tag.name}</h3><p>${tag.shortDescription}</p>`;
    button.addEventListener("click", () => {
      state.activeCategoryId = tag.id;
      state.activeClaimId = null;
      if (ui.tagSelect && !ui.tagSelect.disabled) {
        ui.tagSelect.value = tag.id;
      }
      renderClaims();
      renderResponse();
      scrollToSection("categories");
    });
    ui.homeCards.appendChild(button);
  });
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
    .map((tag) => `<li>${tag}</li>`)
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
      <h4>Tags</h4>
      ${tagItems ? `<ul class="reason-list">${tagItems}</ul>` : "<p>No tags listed for this claim yet.</p>"}
    </div>
    <div class="response-block">
      <h4>Bible Verse(s)</h4>
      ${verseItems ? `<ul class="reason-list">${verseItems}</ul>` : "<p>No Bible verses listed for this claim yet.</p>"}
    </div>
    <div class="response-block">
      <h4>Supporting Reasoning</h4>
      ${reasoningItems ? `<ul class="reason-list">${reasoningItems}</ul>` : "<p>Not added yet.</p>"}
    </div>
  `;
}

function setupNavigation() {
  ui.navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.navTarget;
      if (target) {
        scrollToSection(target);
      }
    });
  });
}

function initializeApp() {
  setupNavigation();
  setupFilters();
  renderTagFilters();
  renderHomeCards();
  renderClaims();
  renderResponse();
}

initializeApp();

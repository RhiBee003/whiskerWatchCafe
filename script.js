(() => {
  const header = document.querySelector("[data-elevate]");
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const form = document.getElementById("reserve-form");
  const status = document.getElementById("form-status");
  const year = document.getElementById("year");

  if (year) year.textContent = String(new Date().getFullYear());

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-solid", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setMenuOpen = (open) => {
    if (!toggle || !mobileNav) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mobileNav.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
  };

  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    setMenuOpen(open);
  });

  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.querySelectorAll(".section, .reserve-panel, .community-panel").forEach((el) => {
    el.classList.add("reveal");
  });

  const showReveal = (el) => el.classList.add("is-visible");

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            showReveal(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: [0, 0.01, 0.08], rootMargin: "120px 0px 120px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // Mobile Safari / overflow quirks: never leave sections invisible
    const revealFallback = () => {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 0;
        if (rect.top < vh * 1.15 && rect.bottom > -80) showReveal(el);
      });
    };
    window.addEventListener("scroll", revealFallback, { passive: true });
    window.addEventListener("resize", revealFallback, { passive: true });
    window.addEventListener("load", revealFallback);
    requestAnimationFrame(revealFallback);
    setTimeout(revealFallback, 400);
    setTimeout(() => {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach(showReveal);
    }, 2500);
  } else {
    document.querySelectorAll(".reveal").forEach(showReveal);
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim().split(/\s+/)[0] || "friend";
    const time = data.get("time");
    const date = data.get("date");
    if (status) {
      status.textContent = `Thanks, ${name} — we received your request for ${date} at ${time}. We’ll email to confirm.`;
    }
    form.reset();
  });

  const trackList = document.getElementById("playlist-tracks");
  const player = document.getElementById("playlist-player");
  const setup = document.getElementById("playlist-setup");
  const embed = document.getElementById("spotify-embed");
  const openBtn = document.getElementById("spotify-open");
  const countEl = document.getElementById("playlist-count");

  const parsePlaylistId = (urlOrId) => {
    if (!urlOrId) return "";
    const trimmed = String(urlOrId).trim();
    if (/^[a-zA-Z0-9]{22}$/.test(trimmed)) return trimmed;
    const match = trimmed.match(/playlist\/([a-zA-Z0-9]+)/);
    return match ? match[1] : "";
  };

  if (trackList) {
    fetch("playlist.json")
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((playlist) => {
        const playlistId = parsePlaylistId(playlist.spotifyPlaylistId || playlist.spotifyUrl);
        const playlistUrl =
          playlist.spotifyUrl ||
          (playlistId ? `https://open.spotify.com/playlist/${playlistId}` : "");

        if (playlistId && player && embed && openBtn) {
          embed.src = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
          openBtn.href = playlistUrl;
          player.hidden = false;
          if (setup) setup.hidden = true;
        }

        if (countEl) {
          const n = playlist.tracks.length;
          countEl.textContent = `${n} track${n === 1 ? "" : "s"}`;
        }

        trackList.replaceChildren();
        playlist.tracks.forEach((track, index) => {
          const li = document.createElement("li");
          const n = String(index + 1).padStart(2, "0");
          const href =
            playlistUrl ||
            `https://open.spotify.com/search/${encodeURIComponent(
              `${track.artist} ${track.title}`
            )}`;
          li.innerHTML = `
            <span class="playlist-num">${n}</span>
            <a class="playlist-song" href="${href}" target="_blank" rel="noopener noreferrer">
              <span class="playlist-title">${track.title}</span>
              <span class="playlist-artist">${track.artist}</span>
            </a>
            <span class="playlist-note">${track.note || ""}</span>
          `;
          trackList.appendChild(li);
        });
      })
      .catch(() => {
        trackList.innerHTML =
          "<li class=\"playlist-fallback\">Playlist file unavailable — open <code>playlist.json</code> in the café folder.</li>";
      });
  }
})();

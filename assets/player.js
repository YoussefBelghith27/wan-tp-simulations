(function () {
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const norm = s => s.toLowerCase().replace(/\s+/g, " ").trim();
  const params = new URLSearchParams(location.search);
  const tp = (window.CATALOG.tps || []).find(t => t.id === params.get("tp"));

  if (!tp) {
    $("loading").innerHTML = `<p>Ce TP est introuvable. <a href="index.html" style="color:#9ad3d8">Revenir à la liste des TP</a></p>`;
    return;
  }
  document.title = `${tp.num} – ${tp.title} | Simulation`;
  $("title").innerHTML = `${esc(tp.num)} <span>${esc(tp.title)}</span>`;
  $("crlink").href = tp.cr;

  const s = document.createElement("script");
  s.src = `sims/${tp.id}.js`;
  s.onload = () => start(window.SIM_DATA);
  s.onerror = () => { $("loading").innerHTML = "<p>Impossible de charger les données de la simulation. Rechargez la page.</p>"; };
  document.body.appendChild(s);

  function start(D) {
    const S = D.slides;
    let i = 0, playing = true, demo = false, hints = true, timer = null, tStart = 0, tDur = 0, raf = 0, demoTimer = null;
    const result = S.map(() => null);       // null | "first" | "retry" | "skipped"
    const tries = S.map(() => 0);

    // chapitres
    const chapters = [];
    S.forEach((sl, k) => { if (!chapters.length || chapters[chapters.length - 1].step !== sl.step) chapters.push({ step: sl.step, at: k }); });
    $("chapters").innerHTML = chapters.map((c, k) => `<li><button data-at="${c.at}">${esc(c.step)}</button></li>`).join("");
    $("chapters").addEventListener("click", e => { const b = e.target.closest("button"); if (b) go(+b.dataset.at); });

    const totalCmd = S.filter(x => x.kind === "type").length;
    $("loading").classList.add("hidden");
    $("tag").classList.toggle("hidden", tp.real);

    function clearTimers() { clearTimeout(timer); clearTimeout(demoTimer); cancelAnimationFrame(raf); $("timer").style.width = "0"; }
    function updateScore() {
      const first = result.filter(r => r === "first").length;
      const done = result.filter(r => r).length;
      $("score").innerHTML = `Commandes réussies du premier coup<br><strong>${first} / ${totalCmd}</strong>` +
        (done ? `<br>${done} commande${done > 1 ? "s" : ""} traitée${done > 1 ? "s" : ""}` : "");
    }
    function setPlayIcon() {
      $("playicon").innerHTML = playing ? '<path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/>' : '<path d="M7 4.5v15l12.5-7.5z" fill="currentColor"/>';
      $("play").setAttribute("aria-label", playing ? "Pause" : "Lecture");
    }
    function tick() {
      const p = Math.min(1, (performance.now() - tStart) / tDur);
      $("timer").style.width = (p * 100) + "%";
      if (p < 1) raf = requestAnimationFrame(tick);
    }

    function render() {
      clearTimers();
      const sl = S[i];
      $("img").src = D.images[sl.img];
      $("sub").innerHTML = `<div><b>${esc(sl.step)}</b>${esc(sl.text)}</div>`;
      $("bar").style.width = ((i + 1) / S.length * 100) + "%";
      $("count").textContent = `${i + 1} / ${S.length}`;
      $("fb").classList.remove("show");
      $("end").classList.add("hidden");
      document.querySelectorAll("#chapters button").forEach(b => {
        const at = +b.dataset.at, nextAt = chapters.find(c => c.at > at)?.at ?? S.length;
        b.classList.toggle("cur", i >= at && i < nextAt);
      });
      const cli = $("cli"), hint = $("hint");
      if (sl.kind === "type") {
        const left = (sl.x / D.w * 100);
        cli.style.left = left + "%"; cli.style.width = ((1166 - sl.x) / D.w * 100) + "%";
        cli.value = ""; cli.className = "cli"; cli.readOnly = demo;
        hint.innerHTML = `Tapez : <code>${esc(sl.answers[0])}</code>&nbsp;puis Entrée`;
        hint.classList.toggle("hidden", !hints);
        $("next").setAttribute("aria-label", "Passer cette commande");
        if (demo) runDemo(); else setTimeout(() => cli.focus({ preventScroll: true }), 30);
      } else {
        cli.className = "cli hidden"; hint.classList.add("hidden");
        $("next").setAttribute("aria-label", "Diapositive suivante");
        if (playing) {
          tDur = Math.max(4500, sl.dur || 6000) * (demo ? .75 : 1); tStart = performance.now();
          raf = requestAnimationFrame(tick);
          timer = setTimeout(next, tDur);
        }
      }
      updateScore();
    }
    function go(k) { i = Math.max(0, Math.min(S.length - 1, k)); render(); }
    function next() {
      if (i >= S.length - 1) return finish();
      if (S[i].kind === "type" && !result[i]) result[i] = "skipped";
      go(i + 1);
    }
    function validate() {
      const sl = S[i], cli = $("cli"), v = norm(cli.value);
      if (!v) return;
      if (sl.answers.some(a => norm(a) === v)) {
        if (!result[i] || result[i] === "skipped") result[i] = tries[i] === 0 ? "first" : "retry";
        cli.className = "cli ok"; cli.readOnly = true; $("fb").classList.remove("show");
        updateScore();
        timer = setTimeout(next, demo ? 700 : 550);
      } else {
        tries[i]++;
        cli.className = "cli"; void cli.offsetWidth; cli.className = "cli bad";
        $("fb").innerHTML = `Commande incorrecte. La commande attendue est <code>${esc(sl.answers[0])}</code>.`;
        $("fb").classList.add("show");
        setTimeout(() => $("fb").classList.remove("show"), 2600);
        cli.select();
      }
    }
    function runDemo() {
      const cli = $("cli"), txt = S[i].answers[0]; let k = 0;
      const step = () => {
        if (!demo || S[i].answers[0] !== txt) return;
        cli.value = txt.slice(0, ++k);
        if (k < txt.length) demoTimer = setTimeout(step, 45);
        else demoTimer = setTimeout(() => { if (!result[i]) result[i] = "demo"; validateDemo(); }, 450);
      };
      demoTimer = setTimeout(step, 700);
    }
    function validateDemo() { $("cli").className = "cli ok"; timer = setTimeout(next, 650); }
    function finish() {
      clearTimers();
      const first = result.filter(r => r === "first").length;
      const skipped = result.filter(r => r === "skipped").length;
      $("end").innerHTML = `
        <h2>Simulation terminée</h2>
        <p>${demo && !first ? "Démonstration terminée. Relancez en mode pratique pour taper les commandes vous-même."
          : `Vous avez réussi <strong>${first} commande${first > 1 ? "s" : ""} sur ${totalCmd}</strong> du premier coup${skipped ? `, ${skipped} passée${skipped > 1 ? "s" : ""}` : ""}.`}</p>
        <div class="row">
          <button class="btn btn-primary" id="restart">Recommencer</button>
          <a class="btn" href="${tp.cr}" target="_blank" rel="noopener">Lire le compte rendu</a>
          <a class="btn" href="index.html">Tous les TP</a>
        </div>`;
      $("end").classList.remove("hidden");
      $("restart").onclick = () => { result.fill(null); tries.fill(0); go(0); };
    }

    $("cli").addEventListener("keydown", e => { if (e.key === "Enter" && !demo) { e.preventDefault(); validate(); } });
    $("next").onclick = next;
    $("prev").onclick = () => go(i - 1);
    $("play").onclick = () => { playing = !playing; setPlayIcon(); render(); };
    $("demo").onclick = () => { demo = !demo; $("demo").setAttribute("aria-pressed", demo); render(); };
    $("hintbtn").onclick = () => { hints = !hints; $("hintbtn").setAttribute("aria-pressed", hints); if (S[i].kind === "type") $("hint").classList.toggle("hidden", !hints); };
    $("progress").onclick = e => { const r = e.currentTarget.getBoundingClientRect(); go(Math.floor((e.clientX - r.left) / r.width * S.length)); };
    document.addEventListener("keydown", e => {
      if (e.target === $("cli")) return;
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") go(i - 1);
      else if (e.key === " " && e.target.tagName !== "BUTTON") { e.preventDefault(); $("play").click(); }
    });
    // pré-chargement des images pour des transitions sans délai
    D.images.forEach(src => { const im = new Image(); im.src = src; });
    setPlayIcon();
    render();
  }
})();

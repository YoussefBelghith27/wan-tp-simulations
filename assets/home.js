(function () {
  const C = window.CATALOG;
  const byId = Object.fromEntries(C.tps.map(t => [t.id, t]));
  const NS = "http://www.w3.org/2000/svg";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const el = (tag, attrs = {}, parent) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  };
  const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- Totaux ---------- */
  const nS = C.tps.reduce((a, t) => a + t.slides, 0), nC = C.tps.reduce((a, t) => a + t.commands, 0);
  document.getElementById("totals").textContent =
    `${C.tps.length} TP, ${nS} diapositives, ${nC} commandes à taper et ${C.tps.reduce((a, t) => a + (t.wireshark || 0), 0)} actions dans Wireshark, sans rien installer.`;

  /* ---------- Topologie animée ---------- */
  const svg = document.getElementById("topo");
  const P = {
    "tp1-mpls-p1": [110, 92], "tp1-mpls-p2": [262, 62], "tp2-vpn-mpls": [414, 104],
    "lab-bgp": [588, 70], "redistribution": [640, 214], "tp3-dhcp-nat": [560, 352],
    "tp5-vpn-ipsec": [380, 262], "tp5bis-gre-ipsec": [196, 246],
    "tp6-frame-relay": [100, 368], "tp6bis-frame-relay-avance": [300, 376],
  };
  const L = [
    ["tp1-mpls-p1", "tp1-mpls-p2"], ["tp1-mpls-p2", "tp2-vpn-mpls"], ["tp2-vpn-mpls", "lab-bgp"],
    ["lab-bgp", "redistribution"], ["redistribution", "tp3-dhcp-nat"], ["tp2-vpn-mpls", "tp5-vpn-ipsec"],
    ["tp5-vpn-ipsec", "tp5bis-gre-ipsec"], ["tp5bis-gre-ipsec", "tp1-mpls-p1"], ["tp5bis-gre-ipsec", "tp6-frame-relay"],
    ["tp6-frame-relay", "tp6bis-frame-relay-avance"], ["tp6bis-frame-relay-avance", "tp3-dhcp-nat"],
    ["tp5-vpn-ipsec", "redistribution"], ["tp6bis-frame-relay-avance", "tp5-vpn-ipsec"],
  ];
  // Nuage Frame Relay (rappel des schémas des TP6)
  el("rect", { x: 30, y: 316, width: 352, height: 116, rx: 4, class: "cloud" }, svg);
  el("text", { x: 40, y: 333, class: "cloud-label" }, svg).textContent = "Nuage Frame Relay";

  const links = el("g", {}, svg), dots = el("g", {}, svg), packets = el("g", {}, svg), nodes = el("g", {}, svg);
  L.forEach(([a, b], i) => {
    const [x1, y1] = P[a], [x2, y2] = P[b];
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len, nx = -uy, ny = ux;
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const pts = [[x1, y1], [mx - ux * 14, my - uy * 14], [mx + nx * 11 - ux * 2, my + ny * 11 - uy * 2],
                 [mx - nx * 11 + ux * 2, my - ny * 11 + uy * 2], [mx + ux * 14, my + uy * 14], [x2, y2]];
    const d = "M" + pts.map(p => p.map(v => v.toFixed(1)).join(",")).join(" L");
    const path = el("path", { d, id: "lk" + i, class: "link" + (reduce ? "" : " draw"), pathLength: 1 }, links);
    path.style.animationDelay = (0.15 + i * 0.09) + "s";
    [[x1 + ux * 30, y1 + uy * 30], [x2 - ux * 30, y2 - uy * 30]].forEach(([cx, cy]) => {
      const c = el("circle", { cx, cy, r: 3.6, class: "portdot" }, dots);
      c.style.animationDelay = (1.3 + i * 0.05) + "s";
      if (reduce) c.style.opacity = 1;
    });
    if (!reduce) {
      [0, 1].forEach(k => {
        const pk = el("circle", { r: 3.2, class: "packet" }, packets);
        const am = el("animateMotion", { dur: (3.4 + (i % 4) * 0.7) + "s", repeatCount: "indefinite",
          begin: (2 + i * 0.37 + k * 1.9) + "s", keyPoints: k ? "1;0" : "0;1", keyTimes: "0;1", calcMode: "linear" }, pk);
        el("mpath", { href: "#lk" + i }, am);
        pk.setAttribute("cx", -20); pk.setAttribute("cy", -20);
      });
    }
  });
  Object.entries(P).forEach(([id, [x, y]], i) => {
    const t = byId[id];
    const a = el("a", { href: "#" + id, class: "node", "aria-label": `${t.num} : ${t.title}` }, nodes);
    a.style.animationDelay = (0.5 + i * 0.08) + "s";
    if (reduce) a.style.opacity = 1;
    const g = el("g", { transform: `translate(${x},${y})` }, a);
    const b = el("g", { class: "body" }, g);
    el("ellipse", { cx: 0, cy: 5, rx: 24, ry: 9.5, fill: "#1f5d63" }, b);
    el("rect", { x: -24, y: -5, width: 48, height: 10, fill: "#2e7f86" }, b);
    el("ellipse", { cx: 0, cy: -5, rx: 24, ry: 9.5, fill: "#4aa7ae" }, b);
    el("path", { d: "M-13,-5 H13 M-13,-5 l4,-2.5 M-13,-5 l4,2.5 M13,-5 l-4,-2.5 M13,-5 l-4,2.5 M0,-11 V1 M0,-11 l-2.5,3 M0,-11 l2.5,3 M0,1 l-2.5,-3 M0,1 l2.5,-3",
                 stroke: "#fff", "stroke-width": 1.6, fill: "none", "stroke-linecap": "round" }, b);
    const [n1, n2] = t.num.split(" · ");
    el("text", { x: 0, y: 30 }, g).textContent = n1 + (n2 ? " " + n2.replace("partie ", "p") : "");
    const SHORT = { "tp1-mpls-p1": "OSPF et EIGRP", "tp1-mpls-p2": "MPLS et LDP", "tp2-vpn-mpls": "VPN MPLS",
      "lab-bgp": "eBGP entre FAI", "redistribution": "OSPF, EIGRP, RIPv2", "tp3-dhcp-nat": "DHCP et NAT",
      "tp5-vpn-ipsec": "VPN IPsec", "tp5bis-gre-ipsec": "GRE over IPsec", "tp6-frame-relay": "Frame Relay",
      "tp6bis-frame-relay-avance": "Frame Relay avancé" };
    el("text", { x: 0, y: 44, class: "sub" }, g).textContent = SHORT[id];
  });

  /* ---------- Liste des TP ---------- */
  const GD = {
    mpls: "Le backbone de l'opérateur, puis le service VPN vendu au client.",
    route: "Échanger des routes entre systèmes autonomes et entre protocoles.",
    svc: "Attribuer les adresses et traduire les adresses privées vers Internet.",
    vpn: "Relier deux sites à travers un réseau public en chiffrant le trafic.",
    fr: "Circuits virtuels permanents, DLCI et topologie en étoile.",
  };
  const ICON = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12.5-7.5z" fill="currentColor"/></svg>',
    doc: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2.8h8l4.2 4.2v14.2H6z M14 2.8V7h4.2 M8.8 12h6.4 M8.8 15.5h6.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    dl: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5v11 M7.5 10.5 12 15l4.5-4.5 M4.5 19.5h15" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };
  const main = document.getElementById("tps");
  Object.entries(C.groups).forEach(([gk, gname]) => {
    const sec = document.createElement("section");
    sec.className = "group";
    sec.innerHTML = `<h2>${esc(gname)}</h2><p class="gdesc">${esc(GD[gk])}</p>`;
    C.tps.filter(t => t.group === gk).forEach(t => {
      const [n1, n2] = t.num.split(" · ");
      const art = document.createElement("article");
      art.className = "tp"; art.id = t.id;
      art.innerHTML = `
        <div class="num${n1.length > 8 ? " long" : ""}">${esc(n1)}<small>${n2 ? esc(n2) + ", " : ""}${esc(t.tool)}</small></div>
        <div>
          <h3>${esc(t.title)}</h3>
          <p>${esc(t.desc)}</p>
          <div class="cmds">${t.cmds.map(c => `<code>${esc(c)}</code>`).join("")}</div>
          <div class="facts"><span>${t.slides} diapositives</span><span>${t.commands} commandes à taper</span>${t.wireshark ? `<span>${t.wireshark} actions dans Wireshark</span>` : ""}
            <span class="badge ${t.real ? "real" : ""}">${t.real ? "Captures réelles GNS3" : "Écrans reconstitués"}</span></div>
        </div>
        <div class="actions">
          <a class="btn btn-primary" href="simulation.html?tp=${t.id}">${ICON.play}Lancer la simulation</a>
          <a class="btn" href="${t.cr}" target="_blank" rel="noopener">${ICON.doc}Compte rendu (PDF)</a>
          <a class="btn btn-quiet" href="${t.approj}" download>${ICON.dl}Projet ActivePresenter</a>
        </div>`;
      sec.appendChild(art);
    });
    main.appendChild(sec);
  });
})();

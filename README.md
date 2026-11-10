# Atelier Technologies WAN – simulations des TP

Site des travaux pratiques du module **Technologies WAN** (RSI3, ISET Nabeul), réalisé par **Youssef Belghith** (RSI31, 2026–2027).

**Site en ligne :** https://youssefbelghith27.github.io/wan-tp-simulations/

Chaque TP propose :

- une **simulation interactive** jouable dans le navigateur : sous-titres explicatifs, commandes IOS à taper dans la console, mode démo et score ;
- son **compte rendu** au format PDF ;
- le **projet ActivePresenter** (.approj) de la simulation, modifiable.

| TP | Sujet | Simulation | Compte rendu |
|---|---|---|---|
| TP1, partie 1 | Backbone MPLS : OSPF et EIGRP | [Lancer](https://youssefbelghith27.github.io/wan-tp-simulations/simulation.html?tp=tp1-mpls-p1) | [PDF](cr/CR_TP1_Partie1_MPLS.pdf) |
| TP1, partie 2 | Activation de MPLS et LDP | [Lancer](https://youssefbelghith27.github.io/wan-tp-simulations/simulation.html?tp=tp1-mpls-p2) | [PDF](cr/CR_TP1_Partie2_MPLS.pdf) |
| TP2 | VPN MPLS | [Lancer](https://youssefbelghith27.github.io/wan-tp-simulations/simulation.html?tp=tp2-vpn-mpls) | [PDF](cr/CR_TP2_VPN_MPLS.pdf) |
| Lab BGP | eBGP entre deux fournisseurs | [Lancer](https://youssefbelghith27.github.io/wan-tp-simulations/simulation.html?tp=lab-bgp) | [PDF](cr/CR_Lab_BGP.pdf) |
| Redistribution | OSPF, EIGRP et RIPv2 | [Lancer](https://youssefbelghith27.github.io/wan-tp-simulations/simulation.html?tp=redistribution) | [PDF](cr/CR_TP_Redistribution.pdf) |
| TP3 | DHCP et NAT | [Lancer](https://youssefbelghith27.github.io/wan-tp-simulations/simulation.html?tp=tp3-dhcp-nat) | [PDF](cr/CR_TP3_DHCP_NAT.pdf) |
| TP5 | VPN IPsec site à site | [Lancer](https://youssefbelghith27.github.io/wan-tp-simulations/simulation.html?tp=tp5-vpn-ipsec) | [PDF](cr/CR_TP5_VPN_IPsec.pdf) |
| TP5 bis | Tunnel GRE over IPsec | [Lancer](https://youssefbelghith27.github.io/wan-tp-simulations/simulation.html?tp=tp5bis-gre-ipsec) | [PDF](cr/CR_TP5bis_GRE_over_IPsec.pdf) |
| TP6 | Frame Relay de base | [Lancer](https://youssefbelghith27.github.io/wan-tp-simulations/simulation.html?tp=tp6-frame-relay) | [PDF](cr/CR_TP6_FrameRelay_de_base.pdf) |
| TP6 bis | Frame Relay avancé | [Lancer](https://youssefbelghith27.github.io/wan-tp-simulations/simulation.html?tp=tp6bis-frame-relay-avance) | [PDF](cr/CR_TP6bis_FrameRelay_avance.pdf) |

## Organisation des fichiers

```
index.html                page d'accueil
simulation.html           lecteur de simulation (simulation.html?tp=<identifiant>)
assets/                   styles, catalogue des TP, scripts
sims/                     données de chaque simulation (écrans + commandes)
cr/                       comptes rendus PDF
activepresenter/          projets ActivePresenter (.approj)
```

## Origine des écrans

Le TP1 partie 1 utilise les captures réelles de la manipulation sous GNS3. Pour les autres TP, les écrans de console sont **reconstitués** à partir des configurations des énoncés : ce sont des résultats attendus, signalés comme tels dans chaque simulation et chaque compte rendu.

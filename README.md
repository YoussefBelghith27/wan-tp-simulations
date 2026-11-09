# Simulations interactives – Atelier Technologies WAN (RSI3)

Simulations **ActivePresenter** des travaux pratiques du module Technologies WAN.
Ce sont des simulations logicielles en mode *Practice* : chaque diapositive porte un sous-titre explicatif, et l'apprenant doit taper lui-même les commandes IOS clés. Une consigne et un message d'erreur l'accompagnent, et les abréviations courantes sont acceptées.

**Auteur :** Youssef Belghith — RSI31, ISET Nabeul — 2026-2027

| TP | Fichier | Diapos | Contenu |
|---|---|---|---|
| TP1 – Backbone MPLS, partie I | [`TP1_Partie1/TP1_Partie1_Simulation_courte.approj`](TP1_Partie1/TP1_Partie1_Simulation_courte.approj) | 29 | Adressage, OSPF zone 0, loopbacks /32 → /25 (`ip ospf network point-to-point`), EIGRP client |
| | [`TP1_Partie1/TP1_Partie1_Simulation.approj`](TP1_Partie1/TP1_Partie1_Simulation.approj) | 65 | Version complète (création de la maquette GNS3 incluse) |
| TP1 – Backbone MPLS, partie II | [`TP1_Partie2/TP1_Partie2_Simulation.approj`](TP1_Partie2/TP1_Partie2_Simulation.approj) | 19 | MPLS/LDP, voisins LDP, LIB/LFIB, labels de 1.1.1.0/25, PHP |
| TP2 – VPN MPLS | [`TP2_VPN_MPLS/TP2_VPN_MPLS_Simulation.approj`](TP2_VPN_MPLS/TP2_VPN_MPLS_Simulation.approj) | 31 | VRF, RD/RT, EIGRP PE-CE, MP-BGP VPNv4, empilement des labels |
| Lab BGP | [`Lab_BGP/Lab_BGP_Simulation.approj`](Lab_BGP/Lab_BGP_Simulation.approj) | 26 | Route par défaut, route statique, eBGP AS 100 ↔ AS 200, tables BGP |
| Redistribution | [`Redistribution/TP_Redistribution_Simulation.approj`](Redistribution/TP_Redistribution_Simulation.approj) | 26 | OSPF ↔ EIGRP ↔ RIPv2, métriques, distance administrative |

## Utilisation

1. Ouvrir le fichier `.approj` avec **ActivePresenter** (version 9 ou plus récente).
2. Onglet **Accueil → Aperçu** pour jouer la simulation.
3. **Exporter → HTML5** pour obtenir une version consultable dans un navigateur.

## Origine des écrans

- **TP1 partie I** : captures réelles, extraites de l'enregistrement de la manipulation sous GNS3 (routeurs Cisco 7200).
- **Autres TP** : écrans de console **reconstitués** à partir des configurations des énoncés, signalés par l'étiquette « résultat attendu ». Les numéros de labels MPLS et les compteurs peuvent différer sur une autre exécution.

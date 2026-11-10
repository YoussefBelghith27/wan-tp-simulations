window.CATALOG = {
 "groups": {
  "mpls": "Cœur de réseau MPLS",
  "route": "Routage entre domaines",
  "svc": "Adressage et services IP",
  "vpn": "VPN chiffrés",
  "fr": "Frame Relay"
 },
 "tps": [
  {
   "id": "tp1-mpls-p1",
   "group": "mpls",
   "num": "TP1 · partie 1",
   "title": "Backbone MPLS : OSPF et EIGRP",
   "desc": "Adressage du backbone SP1–SP2–SP3, OSPF zone 0, loopbacks annoncées en /25 avec ip ospf network point-to-point, EIGRP côté client.",
   "cmds": [
    "ip ospf network point-to-point",
    "show ip route ospf"
   ],
   "cr": "cr/CR_TP1_Partie1_MPLS.pdf",
   "approj": "activepresenter/TP1_Partie1_Simulation.approj",
   "real": true,
   "tool": "GNS3",
   "slides": 29,
   "commands": 12
  },
  {
   "id": "tp1-mpls-p2",
   "group": "mpls",
   "num": "TP1 · partie 2",
   "title": "Activation de MPLS et LDP",
   "desc": "LDP sur les trois routeurs de l'opérateur, lecture de la LIB et de la LFIB, labels du préfixe 1.1.1.0/25 et PHP.",
   "cmds": [
    "mpls ldp router-id loopback0 force",
    "show mpls forwarding-table"
   ],
   "cr": "cr/CR_TP1_Partie2_MPLS.pdf",
   "approj": "activepresenter/TP1_Partie2_Simulation.approj",
   "real": false,
   "tool": "GNS3",
   "slides": 19,
   "commands": 10
  },
  {
   "id": "tp2-vpn-mpls",
   "group": "mpls",
   "num": "TP2",
   "title": "VPN MPLS pour un client",
   "desc": "VRF Client_A avec RD et RT, EIGRP entre PE et CE, MP-BGP VPNv4 entre SP1 et SP3, empilement de deux labels.",
   "cmds": [
    "ip vrf forwarding Client_A",
    "address-family vpnv4"
   ],
   "cr": "cr/CR_TP2_VPN_MPLS.pdf",
   "approj": "activepresenter/TP2_VPN_MPLS_Simulation.approj",
   "real": false,
   "tool": "GNS3",
   "slides": 31,
   "commands": 20
  },
  {
   "id": "lab-bgp",
   "group": "route",
   "num": "Lab BGP",
   "title": "eBGP entre deux fournisseurs",
   "desc": "Route par défaut côté client, route statique de retour chez le FAI, session eBGP entre l'AS 100 et l'AS 200.",
   "cmds": [
    "neighbor 172.16.1.2 remote-as 200",
    "show ip bgp"
   ],
   "cr": "cr/CR_Lab_BGP.pdf",
   "approj": "activepresenter/Lab_BGP_Simulation.approj",
   "real": false,
   "tool": "GNS3",
   "slides": 26,
   "commands": 15
  },
  {
   "id": "redistribution",
   "group": "route",
   "num": "TP Redistribution",
   "title": "OSPF, EIGRP et RIPv2 réunis",
   "desc": "Redistribution mutuelle sur R2, R3 et R5, choix des métriques, routes externes et effet de la distance administrative.",
   "cmds": [
    "redistribute eigrp 1 subnets metric 50",
    "distance eigrp 90 105"
   ],
   "cr": "cr/CR_TP_Redistribution.pdf",
   "approj": "activepresenter/TP_Redistribution_Simulation.approj",
   "real": false,
   "tool": "GNS3",
   "slides": 26,
   "commands": 14
  },
  {
   "id": "tp3-dhcp-nat",
   "group": "svc",
   "num": "TP3",
   "title": "DHCP et NAT",
   "desc": "Serveur DHCP centralisé avec agents relais, NAT statique des serveurs, NAT dynamique avec pool, puis surcharge (PAT).",
   "cmds": [
    "ip helper-address 10.10.10.2",
    "ip nat inside source list NAT interface s0/1/0 overload"
   ],
   "cr": "cr/CR_TP3_DHCP_NAT.pdf",
   "approj": "activepresenter/TP3_DHCP_NAT_Simulation.approj",
   "real": false,
   "tool": "Packet Tracer",
   "slides": 29,
   "commands": 20
  },
  {
   "id": "tp5-vpn-ipsec",
   "group": "vpn",
   "num": "TP5",
   "title": "VPN IPsec site à site",
   "desc": "Politique ISAKMP de phase 1, transform-set et crypto map de phase 2, compteurs des SA avant et après le trafic.",
   "cmds": [
    "crypto isakmp policy 10",
    "show crypto ipsec sa"
   ],
   "cr": "cr/CR_TP5_VPN_IPsec.pdf",
   "approj": "activepresenter/TP5_VPN_IPsec_Simulation.approj",
   "real": false,
   "tool": "GNS3",
   "slides": 27,
   "commands": 19
  },
  {
   "id": "tp5bis-gre-ipsec",
   "group": "vpn",
   "num": "TP5 bis",
   "title": "Tunnel GRE over IPsec",
   "desc": "Tunnel GRE entre deux sites derrière du NAT, routes vers le tunnel, puis chiffrement du flux GRE par IPsec.",
   "cmds": [
    "interface Tunnel 0",
    "access-list 101 permit gre host 201.20.20.1 host 204.20.20.2"
   ],
   "cr": "cr/CR_TP5bis_GRE_over_IPsec.pdf",
   "approj": "activepresenter/TP5bis_GRE_over_IPsec_Simulation.approj",
   "real": false,
   "tool": "GNS3",
   "slides": 33,
   "commands": 24
  },
  {
   "id": "tp6-frame-relay",
   "group": "fr",
   "num": "TP6",
   "title": "Frame Relay de base",
   "desc": "Encapsulation et LMI, ARP inverse, table de mappage dynamique puis statique dans une topologie en étoile.",
   "cmds": [
    "encapsulation frame-relay",
    "frame-relay map ip 192.168.2.2 16 broadcast"
   ],
   "cr": "cr/CR_TP6_FrameRelay_de_base.pdf",
   "approj": "activepresenter/TP6_FrameRelay_de_base_Simulation.approj",
   "real": false,
   "tool": "GNS3",
   "slides": 26,
   "commands": 18
  },
  {
   "id": "tp6bis-frame-relay-avance",
   "group": "fr",
   "num": "TP6 bis",
   "title": "Frame Relay avancé",
   "desc": "Routes statiques flottantes, panne d'un PVC sur interface multipoint, sous-interfaces point à point et RIPv2.",
   "cmds": [
    "int s1/1.16 point-to-point",
    "frame-relay interface-dlci 16"
   ],
   "cr": "cr/CR_TP6bis_FrameRelay_avance.pdf",
   "approj": "activepresenter/TP6bis_FrameRelay_avance_Simulation.approj",
   "real": false,
   "tool": "GNS3",
   "slides": 33,
   "commands": 21
  }
 ]
};

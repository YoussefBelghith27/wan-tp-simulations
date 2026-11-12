import json, sys
W = sys.argv[1]
st = json.load(open(f"{W}/stats.json"))
G = {"mpls": "Cœur de réseau MPLS", "route": "Routage entre domaines", "svc": "Adressage et services IP",
     "vpn": "VPN chiffrés", "fr": "Frame Relay"}
T = [
 ("tp1-mpls-p1", "mpls", "TP1 · partie 1", "Backbone MPLS : OSPF et EIGRP",
  "Adressage du backbone SP1–SP2–SP3, OSPF zone 0, loopbacks annoncées en /25 avec ip ospf network point-to-point, EIGRP côté client.",
  ["ip ospf network point-to-point", "show ip route ospf"], "CR_TP1_Partie1_MPLS.pdf", "TP1_Partie1_Simulation.approj", True, "GNS3"),
 ("tp1-mpls-p2", "mpls", "TP1 · partie 2", "Activation de MPLS et LDP",
  "LDP sur les trois routeurs de l'opérateur, lecture de la LIB et de la LFIB, labels du préfixe 1.1.1.0/25 et PHP.",
  ["mpls ldp router-id loopback0 force", "show mpls forwarding-table"], "CR_TP1_Partie2_MPLS.pdf", "TP1_Partie2_Simulation.approj", False, "GNS3"),
 ("tp2-vpn-mpls", "mpls", "TP2", "VPN MPLS pour un client",
  "VRF Client_A avec RD et RT, EIGRP entre PE et CE, MP-BGP VPNv4 entre SP1 et SP3, puis capture Wireshark des deux labels MPLS empilés.",
  ["ip vrf forwarding Client_A", "address-family vpnv4"], "CR_TP2_VPN_MPLS.pdf", "TP2_VPN_MPLS_Simulation.approj", False, "GNS3 + Wireshark"),
 ("lab-bgp", "route", "Lab BGP", "eBGP entre deux fournisseurs",
  "Route par défaut côté client, route statique de retour chez le FAI, session eBGP entre l'AS 100 et l'AS 200.",
  ["neighbor 172.16.1.2 remote-as 200", "show ip bgp"], "CR_Lab_BGP.pdf", "Lab_BGP_Simulation.approj", False, "GNS3"),
 ("redistribution", "route", "TP Redistribution", "OSPF, EIGRP et RIPv2 réunis",
  "Redistribution mutuelle sur R2, R3 et R5, choix des métriques, routes externes et effet de la distance administrative.",
  ["redistribute eigrp 1 subnets metric 50", "distance eigrp 90 105"], "CR_TP_Redistribution.pdf", "TP_Redistribution_Simulation.approj", False, "GNS3"),
 ("tp3-dhcp-nat", "svc", "TP3", "DHCP et NAT",
  "Serveur DHCP centralisé avec agents relais, NAT statique des serveurs, NAT dynamique avec pool, puis surcharge (PAT).",
  ["ip helper-address 10.10.10.2", "ip nat inside source list NAT interface s0/1/0 overload"], "CR_TP3_DHCP_NAT.pdf", "TP3_DHCP_NAT_Simulation.approj", False, "Packet Tracer"),
 ("tp5-vpn-ipsec", "vpn", "TP5", "VPN IPsec site à site",
  "Politique ISAKMP de phase 1, transform-set et crypto map de phase 2, compteurs des SA, puis analyse Wireshark des échanges ISAKMP et des paquets ESP.",
  ["crypto isakmp policy 10", "show crypto ipsec sa"], "CR_TP5_VPN_IPsec.pdf", "TP5_VPN_IPsec_Simulation.approj", False, "GNS3 + Wireshark"),
 ("tp5bis-gre-ipsec", "vpn", "TP5 bis", "Tunnel GRE over IPsec",
  "Tunnel GRE entre deux sites derrière du NAT, double en-tête IP observé dans Wireshark, puis chiffrement du flux GRE par IPsec.",
  ["interface Tunnel 0", "access-list 101 permit gre host 201.20.20.1 host 204.20.20.2"], "CR_TP5bis_GRE_over_IPsec.pdf", "TP5bis_GRE_over_IPsec_Simulation.approj", False, "GNS3 + Wireshark"),
 ("tp6-frame-relay", "fr", "TP6", "Frame Relay de base",
  "Encapsulation et LMI analysé dans Wireshark (Full Status, DLCI), ARP inverse, table de mappage dynamique puis statique.",
  ["encapsulation frame-relay", "frame-relay map ip 192.168.2.2 16 broadcast"], "CR_TP6_FrameRelay_de_base.pdf", "TP6_FrameRelay_de_base_Simulation.approj", False, "GNS3 + Wireshark"),
 ("tp6bis-frame-relay-avance", "fr", "TP6 bis", "Frame Relay avancé",
  "Routes statiques flottantes, panne d'un PVC sur interface multipoint, sous-interfaces point à point et RIPv2.",
  ["int s1/1.16 point-to-point", "frame-relay interface-dlci 16"], "CR_TP6bis_FrameRelay_avance.pdf", "TP6bis_FrameRelay_avance_Simulation.approj", False, "GNS3"),
]
cat = {"groups": G, "tps": [dict(id=i, group=g, num=n, title=t, desc=d, cmds=c, cr="cr/" + cr, approj="activepresenter/" + ap,
                                 real=r, tool=tool, slides=st[i]["slides"], commands=st[i]["commands"], wireshark=st[i].get("wireshark", 0))
                            for i, g, n, t, d, c, cr, ap, r, tool in T]}
open(f"{W}/assets/catalog.js", "w").write("window.CATALOG = " + json.dumps(cat, ensure_ascii=False, indent=1) + ";\n")
print(sum(x["slides"] for x in cat["tps"]), sum(x["commands"] for x in cat["tps"]))

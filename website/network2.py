import pandas as pd
import netifaces as ni
import winreg as wr
from scapy.all import *
import socket

mac_address_list = []
ip_address_list = []
devices_dictionary = []
ev3dev_devices_info = []

df = pd.read_excel('conversion_table.xlsx')
prefix_length = df['CIDR prefix length'].tolist()
decimal_netmask = df['Dotted Decimal Netmask'].tolist()
conversion_dictionary= dict(zip(decimal_netmask, prefix_length))

def get_connection_name_from_guid(iface_guids):
    iface_names = ['(unknown)' for i in range(len(iface_guids))]
    reg = wr.ConnectRegistry(None, wr.HKEY_LOCAL_MACHINE)
    reg_key = wr.OpenKey(reg, r'SYSTEM\CurrentControlSet\Control\Network\{4d36e972-e325-11ce-bfc1-08002be10318}')
    for i in range(len(iface_guids)):
        try:
            reg_subkey = wr.OpenKey(reg_key, iface_guids[i] + r'\Connection')
            iface_names[i] = wr.QueryValueEx(reg_subkey, 'Name')[0]
        except FileNotFoundError:
            pass
    return iface_names

def get_ip_with_cidr():
    global adapters_name
    network_address = ''
    x = ni.interfaces()
    name_list = get_connection_name_from_guid(x)
    index = name_list.index("Wi-Fi")
    info = ni.ifaddresses(x[index])
    netmask_value = info[ni.AF_INET][0]['netmask']
    ip_address = info[ni.AF_INET][0]['addr']
    _ = ip_address.split(".")
    for i in range(3):
        network_address = network_address + _[i] + "."
    network_address = network_address + '1'
    res = network_address + conversion_dictionary[netmask_value]
    return res


target_ip = get_ip_with_cidr()
arp = ARP(pdst=target_ip)
ether = Ether(dst="ff:ff:ff:ff:ff:ff")
packet = ether/arp
result = srp(packet, timeout=3, verbose=0)[0]
clients = []

for sent, received in result:
    clients.append({'ip': received.psrc, 'mac': received.hwsrc})

print("Available devices in the network:")
print("IP" + " "*18+"MAC")
for client in clients:
    print("{:16}    {}".format(client['ip'], client['mac']))
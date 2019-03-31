import random
from gps3 import gps3


def get_coordinates():
    try:
        return get_gps_data()
    except Exception as e:
        print("Unable to get GPS coordinates, simulating data")
        print(e)
        return simulate_coordinates()

def get_gps_data():
    gps_socket = gps3.GPSDSocket()
    data_stream = gps3.DataStream()
    gps_socket.connect()
    gps_socket.watch()
    for new_data in gps_socket:
        if new_data:
            data_stream.unpack(new_data)
            print('Altitude = ', data_stream.TPV['lgn'])
            print('Latitude = ', data_stream.TPV['lat'])

def simulate_coordinates():
    lat1 = 34.055588 + (random.random() * (34.050521 - 34.055588))
    long1 = -118.418282 + (random.random() * (-118.418282 + 118.423174))
    return {"latitude": lat1, "longitude": long1}
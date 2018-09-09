from sequence_layer import SequenceLayer
from hub import Hub
import json
import math


class Space():
    def __init__(self):
        self.hubs = []

    def init(self, hub_files):
        id = 0
        for f in hub_files:
            with open(f, 'r') as data:
                location = f.replace(".hub", "")
                id += 1
                self.hubs.append(Hub(id, location))

                for l in data:
                    object = json.loads(l)
                    self.hubs[-1].addLayer(SequenceLayer(
                        object["user_id"], object["sound_id"], object["rhythm"]))

        for h in self.hubs:
            print(h.getLocation())
            print(h.getHubObject())

    def getClosestHub(self, location):
        closest = None
        distance = -1
        lat1, lon1 = location.split(";")
        # print(lat1, lon1)
        for hub in self.hubs:
            # print(hub.getHubObject())
            lat2, lon2 = hub.getLocation().split(";")
            # print(lat2, lon2)
            # print("calcul")
            temp_distance = self.distanceLocation(lon1, lat1, lon2, lat2)
            # print(temp_distance)
            if distance == -1:
                closest = hub
                distance = temp_distance
            else:
                if temp_distance < distance:
                    closest = hub
                    distance = temp_distance
            # print(distance)
        # print(closest.getHubObject())
        return closest

    def distanceLocation(self, lon1, lat1, lon2, lat2):
        lon1 = float(lon1)
        lon2 = float(lon2)
        lat1 = float(lat1)
        lat2 = float(lat2)
        R = 6371
        dLat = math.radians(lat2 - lat1)
        dLon = math.radians(lon2 - lon1)
        a = math.sin(dLat / 2) * math.sin(dLat / 2) + math.cos(math.radians(lat1)) * \
            math.cos(math.radians(lat2)) * \
            math.sin(dLon / 2) * math.sin(dLon / 2)
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        d = R * c
        return d

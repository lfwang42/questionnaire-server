from collections import defaultdict
import os
import json
from time import sleep
path = '/mnt/g/Downloads/Combinations3/Combinations3'

dict = {}
for dir in os.listdir(path):
    dict[dir] = {
        "images": [],
        "photo": "",
        "painting": ""
    }
    for file in os.listdir(os.path.join(path, dir)):
        if 'Photo' in file:
            dict[dir]["photo"] = file
        elif 'Painting' in file:
            dict[dir]["painting"] = file
        else:
            dict[dir]["images"].append(file)


def countRes(a: list[any]) -> int:
    count = 0
    for item in a:
        if not 'Painting' in item and not 'Photo' in item:
             count += 1
    return count
            

print(dict)
toremove = []
for k,v in dict.items():
    if len(v["images"]) < 2:
        toremove.append(k)

for k in toremove:
    dict.pop(k)

with open('new_combos.json', 'w') as f:
    json.dump(dict, f, indent=4)

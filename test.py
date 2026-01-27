from collections import defaultdict
import os
import json
from time import sleep
path = '/mnt/g/Downloads/Combinations3/Combinations3'
paintings_path = '/mnt/g/Downloads/paintings1/paintings'
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
            print(item)
            print('\n')
            count += 1
    return count




missing = []



for file in os.listdir(paintings_path):
    if 'Painting' not in file:
        os.rename(os.path.join(paintings_path, file), os.path.join(paintings_path, 'Painting_' + file))


# for k,v in dict.items():
#     if v['photo'] == "" or v['painting'] == "":
#         print(k)
#         print(v)
#         print('\n')
#         missing.append(k)


print(missing)
# print(dict)
toremove = []
for k,v in dict.items():
    if len(v["images"]) < 2:
        toremove.append(k)

for k in toremove:
    dict.pop(k)

with open('new_combos.json', 'w') as f:
    json.dump(dict, f, indent=4)

from collections import defaultdict
import os
import json
from time import sleep
path = '/mnt/g/Downloads/Combinations6'
paintings_path = '/mnt/g/Downloads/paintings1/paintings'
import shutil
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





# for file in os.listdir(paintings_path):
#     if 'Painting' not in file:
#         os.rename(os.path.join(paintings_path, file), os.path.join(paintings_path, 'Painting_' + file))
paintings = {}
for file in os.listdir(paintings_path):
    paintings[file.split('_')[1].split('-')[0] + '-' + file.split('_')[1].split('-')[1]] = file

print(paintings)

# for k,v in dict.items():
#     if v['painting'] == "":
#         key = k.split('-')[0] + '-' + k.split('-')[1]
#         print(os.path.join(paintings_path, paintings[key]))
#         shutil.copyfile(os.path.join(paintings_path, paintings[key]), os.path.join(path, k, paintings[key]))
#         # print(os.path.join(path, k, paintings[key]))
        

print(missing)
# print(dict)
toremove = []
for k,v in dict.items():
    if v['photo'] == "":
        print(k)
    if len(v["images"]) < 2:
        toremove.append(k)

for k in toremove:
    dict.pop(k)

with open('new_combos.json', 'w') as f:
    json.dump(dict, f, indent=4)

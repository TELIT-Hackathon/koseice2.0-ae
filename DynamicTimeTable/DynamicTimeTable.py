import json
import copy
import random
ZastavkyData = {}
zastavkySubor = open("zastavky2.txt")
zastavky = zastavkySubor.readlines()
count =0
for line in zastavky:
    ZastavkyData[line.split(",")[0].strip('"')] = {}
spojeSubor = open("ZASSPOJE.txt")
for line in spojeSubor.readlines():
    linka = line.split(",")[0].strip('"')
    zastavka = line.split(",")[3].strip('"')

    if linka not in ZastavkyData[zastavka]:
        ZastavkyData[zastavka][linka] = []
    #divny format casu
   
    if line.split(",")[11].strip('"').isnumeric() and len(line.split(",")[11].strip('"')) == 4 :
        count += 1
        ZastavkyData[zastavka][linka].append(line.split(",")[11].strip('"'))

with open("zastavky_timetable.json", "w") as f:
    json.dump(ZastavkyData, f)
Cakanie = copy.deepcopy(ZastavkyData)
for zastavka in Cakanie.keys():
    for linka in Cakanie[zastavka].keys():
        Cakanie[zastavka][linka] = []
PocetDat = 1000

for i in range(0,PocetDat):
  
    pocetZastavok = len(ZastavkyData.keys())-1
    RandomZastavka = random.choice(list(ZastavkyData.keys()))
    RandomLinka = random.choice(list(ZastavkyData[RandomZastavka].keys()))
    
    hodina = random.randint(6,22)
    minuta = random.randint(0,60)
    if hodina < 10:
        hodina = "0"+str(hodina)
    if minuta < 10:
        minuta = "0"+str(minuta)
    cas = str(hodina) + str(hodina)
    Cakanie[RandomZastavka][RandomLinka].append(cas)
print(Cakanie)
   

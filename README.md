
# GoldenSpear full-stack developer
Webapp que, per mitjà de una API rest en nodeJS, es comunica amb Python per processar una sèrie de dades. 

#### Eines utilitzades
  - nodeJS
  - express Framework per construir la webapp amb node
  - Base de dades MYSQL 
  - PythonShell framework per executar fitxers python des de node
 
*Remarcar que al principi es va utilitzar Mongodb integrat amb el framework mongoose. Al final es va descartar pels avantatges que presentava sql sobretot alhora de agafar l'ultim valor insertat i també per la senzillesa alhora de fer l'output de les dades.*

<p align="center">
  <img width="150" height="200" src="https://i.ibb.co/6B1nRws/Screenshot-2019-12-04-at-20-43-42.png">
</p>

#### Execució
Per tal d'executar-ho, en primer lloc caldria instal·lar tots els mòduls
```
npm install npm-install-all -g
```
A continuació s'ha utilitzat una base de dades mysql en ***localhost***  amb les característiques següents:

- Nom de la BD: goldenspear
- Nom de la taula: data
- Columnes:
	- id: numeric auto-incrementable
	- input: varchar
	- inputEncrypted: varchar
	- inputCRC: numeric
Per tal de connectar-se tal com es pot veure a **start.js** l'usari és root i la psw és alma1234.

#### Exemple d'utilització
S'utilitza com exemple la taula de prova proporiconada com exemple en la descripció del repte. 
Pantalla inicial:

[http://localhost:3000/](http://localhost:3000/)
<p align="center">
  <img width="500" height="300" src="https://i.ibb.co/Rzbkn0z/Screenshot-2019-12-04-at-21-52-57.png">
</p>

Si observem l'historial (segon button) observem que està buit:
***Remarcar que s'ha protegit l'accés a la pàgina amb usr: golden i psw: spear***
<p align="center">
  <img width="500" height="300" src="https://i.ibb.co/XkPSdsf/Screenshot-2019-12-04-at-21-56-43.png">
</p>

A continuació començarem a encryptar. La primera frase serà "Hi there!", la segona "How are you?" i la tercera "Super secret message".  També es remarca que s'hi no introduïm cap valor (deixem el textInput buit) s'avisa a l'usuari amb un missatge d'error i en cas d'haver-se encriptat bé també ho avisa. 

L'encriptació es realitza en **Python3**. El primer fitxer per comunicar-se amb nodeJS i gestionar el diccionari:
````
import crc8
import sys
import json
from caesar_encryption import encriptar

inputValue = sys.argv[1]
ultimCRC =  int(sys.argv[2])

dic =  "abcdefghijklmnopqrstuvwxyz"
n =  len(dic)
inputValueL = inputValue.lower()

hash  = crc8.crc8()
hash.update(inputValue.encode('utf-8'))
s =  int(hash.hexdigest(),16)

#Funcio encriptar del fitxer caesar_encryption
result =  "".join(encriptar(inputValueL, dic,ultimCRC,n))

objResult = {'valorOriginal': inputValue, 'valorEncriptat':result,'valorCRC': s}
jsonResult = json.dumps(objResult)

print(jsonResult)
sys.stdout.flush()
````

I el segon fitxer realitza l'encriptació amb programació funcional de Python3:
```
def  encriptar(valor,dic, s, n):
	return  list(map(lambda  x: dic[(dic.index(x) + s) % n] if x in dic else x, valor))
```

Finalment podem veure l'historial en format web (usr: golden, psw: spear):
[http://localhost:3000/registrations](http://localhost:3000/registrations?)


<p align="center">
  <img width="600" height="250" src="https://i.ibb.co/BGN5fJc/Screenshot-2019-12-05-at-10-50-16.png">
</p>

I també s'ha creat un endpoint per poder obtenir els resultats en formt JSON:
[http://localhost:3000/registrationsJSON](http://localhost:3000/registrationsJSON)

  <img width="600" height="250" src="https://i.ibb.co/Z6Q9L6r/Screenshot-2019-12-05-at-10-52-20.png">
</p>


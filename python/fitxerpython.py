import crc8
import sys
import json
from caesar_encryption import encriptar

inputValue = sys.argv[1]
ultimCRC = int(sys.argv[2])

dic = "abcdefghijklmnopqrstuvwxyz"
n = len(dic)
inputValueL = inputValue.lower()

hash = crc8.crc8()
hash.update(inputValue.encode('utf-8'))
s = int(hash.hexdigest(),16)

#Funcio encriptar del fitxer caesar_encryption
result = "".join(encriptar(inputValueL, dic,ultimCRC,n))

objResult = {'valorOriginal': inputValue, 'valorEncriptat':result,'valorCRC': s}
jsonResult = json.dumps(objResult)

print(jsonResult)
sys.stdout.flush()



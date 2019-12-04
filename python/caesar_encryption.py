def encriptar(valor,dic, s, n):
    return list(map(lambda x: dic[(dic.index(x) + s) % n] if x in dic else x, valor))
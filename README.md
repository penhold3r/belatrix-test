# BelatrixTest
---------------
Tiene una lista de ubigeos **(Departamento / Provincia / Distrito)** que está en un archivo plano, se necesita que desarrolles el código para convertir esta lista a estructura (por ejemplo, un listas, arreglo, diccionario…).  
Esto puede ser en el lenguaje que prefieras, *Javascript* o algún otro framework de front end.

A continuación, se indica la información que llega en el archivo plano.

```
“01 Lima /  / ”
“01 Lima / 50 Lima / ”
“01 Lima / 51 Barranca / ”
“01 Lima / 50 Lima / 202 La Molina”
“01 Lima / 50 Lima / 203 San Isidro”
“02 Arequipa /  / ”
“02 Arequipa / 63 Arequipa / ”
“02 Arequipa / 64 Caylloma / ”
“02 Arequipa / 63 Arequipa / 267 Cercado”
```

Esta información debe ser leída y por cada línea aplicar la lógica necesaria para agrupar en tres estructuras diferentes el
departamento, provincia y distrito. Por ejemplo:

###DEPARTAMENTO
| Código | Nombre        | Código Padre | Descripción Padre |
|:------:|:-------------:|:------------:|:-----------------:|
| 01     | Lima          | -            | -                 |
| 02     | Arequipa      | -            | -                 | 

###PROVINCIA
| Código | Nombre        | Código Padre | Descripción Padre |
|:------:|:-------------:|:------------:|:-----------------:|
| 50     |  Lima         | 01           | Lima
| 51     |  Barranca     | 01           |  Lima
| 63     |  Arequipa     | 02           |  Arequipa
| 64     |  Caylloma     | 02           |  Arequipa

###DISTRITO
| Código | Nombre        | Código Padre | Descripción Padre |
|:------:|:-------------:|:------------:|:-----------------:|
| 202    | La Molina     | 50           | Lima
| 203    | San Isidro    | 50           | Lima
| 267    | Cercado       | 63           | Arequipa
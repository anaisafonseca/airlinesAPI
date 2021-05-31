Victória Maria Veloso Rodrigues 11811ECP003,
Anaísa Forti da Fonseca 11811ECP012,
Lucas Alesterio Marques Vieira 11621ECP016, 

## Routes

### /user

Metodo: post;
Entradas: email:string, password:string;
Retorno: usuário cadastrado;

#### Exemplo:

Entrada:

```
{
    "email":"lucas@gmail.com",
    "password":"123"
}
```

Saída:

```
{
    "email": "lucas@gmail.com",
    "password": "123",
    "id": "3990327b-dc10-48db-9b47-de36dfcf400d"
}
```

---

### /login

Metodo: post;
Entradas: email:string, password:string;
Retorno: JWT;

#### Exemplo:

Entrada:

```
{
    "email":"lucas@gmail.com",
    "password":"123"
}
```

Saída:

```
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAzOGFmYzdmLTdhNjYtN
DRhYS1hMmVlLWU3NmZmYTEwYWNlMyIsImVtYWlsIjoibHVjYXNAZ21haWwuY29tIiwi
aWF0IjoxNjIwNjkyNTY1fQ.4_Rs9B6_eZQLqwueSdvZGzvbrtG6S8z1E-pRaPpr9Cc"
```

---

### /validation

Metodo: post;
Entradas: token:JWT;
Retorno: id:uuid, email:string;

#### Exemplo:

Entrada:

```
{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAzOGFmY
    zdmLTdhNjYtNDRhYS1hMmVlLWU3NmZmYTEwYWNlMyIsImVtYWlsIjoibHVjYXNA
    Z21haWwuY29tIiwiaWF0IjoxNjIwNjkyMzk0fQ.K1ah7QMXnmJ4C1Q13gRoT1JD
    sBOOpQPGrjoJzCIYqDU"
}
```

Saída:

```
{
    "id": "038afc7f-7a66-44aa-a2ee-e76ffa10ace3",
    "email": "lucas@gmail.com",
    "iat": 1620692394
}
```

---

### /airport

Metodo: post;
Entradas: name:string, location: string;
Retorno: aeroporto cadastrado;

#### Exemplo:

Entrada:

```
{
    "name":"Papagaio",
    "location":"Fortaleza"
}
```

Saída:

```
{
    "name": "Papagaio",
    "location": "Fortaleza",
    "id": "b7e4355f-ddcd-41fe-bea8-95e1e8682e19"
}
```

---

### /airline

Metodo: post;
Entradas: name:string, airportsNames: string[];
Retorno: Companhia aérea;

#### Exemplo:

Entrada:

```
{
    "name":"TiTi",
    "airportsNames": ["Gru"]
}
```

Saída:

```
{
  "name": "TiTi",
  "airports": [
    {
      "id": "7e4a4e94-bc7c-4140-b63d-d45719c92873",
      "name": "Gru",
      "location": "São Paulo"
    }
  ],
  "id": "c1d573d5-4194-4de0-809b-b9d9f7e97958"
}
```

---

### /listByAirline

Metodo: post;
Entradas: airlineName:string;
Retorno: Aeroportos oferecidos pela companhia aérea;

#### Exemplo:

Entrada:

```
{
    "airlineName":"TiTi"
}
```

Saída:

```
[
  {
    "id": "7e4a4e94-bc7c-4140-b63d-d45719c92873",
    "name": "Gru",
    "location": "São Paulo"
  }
]
```

---

### /flight

Metodo: post;
Entradas: date:date, price:float, airlineName:string, passengers:int,
originName:string, destinationName:string;
Retorno: Voo cadastrado;

#### Exemplo:

Entrada:

```
{
    "date": "2000-05-30 23:42:00",
    "price":462.22,
    "airlineName":"TiTi",
    "passengers": 404,
    "originName":"Gru",
    "destinationName":"Papagaio"
}
```

Saída:

```
{
  "date": "2000-05-31T02:42:00.000Z",
  "price": 462.22,
  "passengers": 404,
  "origin": {
    "id": "7e4a4e94-bc7c-4140-b63d-d45719c92873",
    "name": "Gru",
    "location": "São Paulo"
  },
  "destination": {
    "id": "b7e4355f-ddcd-41fe-bea8-95e1e8682e19",
    "name": "Papagaio",
    "location": "Fortaleza"
  },
  "airline": {
    "id": "c1d573d5-4194-4de0-809b-b9d9f7e97958",
    "name": "TiTi"
  },
  "id": "1b58900d-f3ad-4588-b799-8ff215b10497"
}
```

---

### /listByOrigin

Metodo: post;
Entradas: originName:string;
Retorno: Aeroportos de destino baseados no aeroporto de origem;

#### Exemplo:

Entrada:

```
{
    "originName":"Gru"
}
```

Saída:

```
[
  {
    "id": "91f82723-e53f-409b-9b4f-d468737252e3",
    "name": "Cegonha",
    "location": "São Paulo"
  },
  {
    "id": "b7e4355f-ddcd-41fe-bea8-95e1e8682e19",
    "name": "Papagaio",
    "location": "Fortaleza"
  }
]
```

---

### /listByAirlineDate

Metodo: post;
Entradas: airlineName:string,date:date;
Retorno: Voos oferecidos pela companhia aérea na data informada;

#### Exemplo:

Entrada:

```
{
    "airlineName":"TiTi",
    "date":"2000-05-30"
}
```

Saída:

```
[
  {
    "id": "1b58900d-f3ad-4588-b799-8ff215b10497",
    "date": "2000-05-31T02:42:00.000Z",
    "price": "462.22",
    "passengers": 404,
    "origin": {
      "id": "7e4a4e94-bc7c-4140-b63d-d45719c92873",
      "name": "Gru",
      "location": "São Paulo"
    },
    "destination": {
      "id": "b7e4355f-ddcd-41fe-bea8-95e1e8682e19",
      "name": "Papagaio",
      "location": "Fortaleza"
    }
  },
  {
    "id": "df0b6c95-89f9-457c-9127-f31e8bcce1d5",
    "date": "2000-05-31T02:42:00.000Z",
    "price": "462.22",
    "passengers": 404,
    "origin": {
      "id": "7e4a4e94-bc7c-4140-b63d-d45719c92873",
      "name": "Gru",
      "location": "São Paulo"
    },
    "destination": {
      "id": "b7e4355f-ddcd-41fe-bea8-95e1e8682e19",
      "name": "Papagaio",
      "location": "Fortaleza"
    }
  }
]
```

---

### /listByPrice

Metodo: post;
Entradas: passengersNumber:int;
Retorno: Voos com a menor tarifa;

#### Exemplo:

Entrada:

```
{
    "passengersNumber":4
}
```

Saída:

```
{
  "total": 800.88,
  "minPrice": [
    {
      "id": "61b1775a-4cb8-4b04-911d-ad1653c5bca1",
      "date": "2000-05-17T23:30:00.000Z",
      "price": "200.22",
      "passengers": 200
    }
  ]
}
```

---

### /reservation

Metodo: post;
Entradas: passengersNumber:int, flightId:uuid, email:string;
Retorno: Reserva criada;

#### Exemplo:

Entrada:

```
{
    "passengersNumber":2,
    "flightId":"1b58900d-f3ad-4588-b799-8ff215b10497",
    "email":"lucas@gmail.com"
}
```

Saída:

```
{
  "reservation": {
    "date": "Tue May 11 2021 22:18:53 GMT-0300 (Horário Padrão de Brasília)",
    "user": {
      "id": "3990327b-dc10-48db-9b47-de36dfcf400d",
      "email": "lucas@gmail.com",
      "password": "123"
    },
    "tickets": [
      {
        "id": "b377ac2d-6f21-42ed-b1d4-a004779955a9"
      },
      {
        "id": "a56a4ba1-d533-461c-8fe0-caaa753a8370"
      }
    ],
    "flight": {
      "id": "1b58900d-f3ad-4588-b799-8ff215b10497",
      "date": "2000-05-31T02:42:00.000Z",
      "price": "462.22",
      "passengers": 381
    },
    "id": "d240cf7c-aebb-4bec-9935-7ac37129ac6b"
  },
  "origin": {
    "id": "7e4a4e94-bc7c-4140-b63d-d45719c92873",
    "name": "Gru",
    "location": "São Paulo"
  },
  "destination": {
    "id": "b7e4355f-ddcd-41fe-bea8-95e1e8682e19",
    "name": "Papagaio",
    "location": "Fortaleza"
  }
}
```

---

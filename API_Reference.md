# API Reference

## 1. Ratings

Base URL: `localhost:8131/api/v1/ratings`

---

### 1.1 GET ratings

This endpoint is used to get all ratings given by students to other students, tutors, modules and classes.

#### Endpoint URL

```url
http://localhost:8131/api/v1/ratings/:target/:targetId
```

#### Example Request

cURL

```sh
curl GET "localhost:8131/api/v1/ratings/student/T024681012"
```

#### Response

If request was successful, a JSON array of ratings will be returned, and the `studentId` field will be an empty string if anonymous is set to true. If the request was unsuccessful, a corresponding status code and error message will be returned.

**Example**

```JSON
[
    {
        "id": 1,
        "rating": 3,
        "studentId": "S10198765C",
        "target": "student",
        "targetId": "T024681012",
        "dateTime": "2022-1-18 13:52:29",
        "anonymous": false
    },
    {
        "id": 2,
        "rating": 3,
        "studentId": "",
        "target": "student",
        "targetId": "T024681012",
        "dateTime": "2022-1-18 17:52:29",
        "anonymous": true
    }
]
```

---

### 1.2 GET ratings (sent)

This endpoint is used to get all ratings sent by the student to other students, tutors, modules and classes.

#### Endpoint URL

```url
http://localhost:8131/api/v1/ratings/:student/:studentId/sent
```

#### Example Request

cURL

```sh
curl GET "localhost:8131/api/v1/ratings/student/S10198765A/sent"
```

#### Response

If request was successful, a JSON array of ratings sent by the student will be returned. Otherwise, a corresponding status code and error message will be returned.

**Example**

```JSON
[
    {
        "id": 1,
        "rating": 3,
        "studentId": "S10198765A",
        "target": "student",
        "targetId": "S02468101B",
        "dateTime": "2022-1-18 13:52:29",
        "anonymous": false
    },
    {
        "id": 2,
        "rating": 3,
        "studentId": "S10198765A",
        "target": "tutor",
        "targetId": "T024681012",
        "dateTime": "2022-1-18 17:52:29",
        "anonymous": true
    }
]
```

---

### 1.3 POST ratings

This endpoint is used by students to give a new rating.

#### Endpoint URL

```url
http://localhost:8131/api/v1/ratings
```

#### JSON Body Parameters

| Name        | Type    | Required | Description                                                                                                         |
| ----------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `rating`    | number  | Required | An integer between 1 to 5 inclusive representing the rating score                                                   |
| `studentId` | string  | Required | The ID of the student giving the rating                                                                             |
| `target`    | string  | Required | The target of the rating, or who the rating is for. The accepted targets are `student`, `tutor`, `module`, `class`. |
| `targetId`  | string  | Required | The ID of the specified target type                                                                                 |
| `anonymous` | boolean | Optional | Specify whether the rating should be anonymous, where `true` means remain anonymous. Default value is `false`       |

#### Example Request

cURL

```sh
curl --request POST 'localhost:8131/api/v1/ratings/student' \
--header 'Content-Type: application/json' \
--data '{
    "rating": 4,
    "studentId": "S10198765A",
    "target": "tutor",
    "targetId": "T024681012",
    "anonymous": true
}'
```

Windows cURL

```sh
curl --request POST "localhost:8131/api/v1/ratings/student" --header "Content-Type: application/json" --data "{\"rating\": 4,\"studentId\": \"S10198765A\",\"target\": \"tutor\",\"targetId\": \"T024681012\",\"anonymous\": true}"
```

#### Response

The response will be a status code `200` if request was successful, otherwise a corresponding status code and error message.

---

### 1.4 PUT ratings

This endpoint is used by students to update their own ratings.

#### Endpoint URL

```url
http://localhost:8131/api/v1/ratings
```

#### JSON Body Parameters

| Name        | Type    | Required | Description                                                                                                                                                 |
| ----------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`        | number  | Required | The ID of the rating given                                                                                                                                  |
| `rating`    | number  | Required | An integer between 1 to 5 inclusive representing the rating score                                                                                           |
| `studentId` | string  | Required | The ID of the student giving the rating                                                                                                                     |
| `anonymous` | boolean | Optional | Specify whether the rating should be anonymous, where `true` means remain anonymous. Leaving this parameter empty will leave the anonymity status unchanged |

#### Example Request

cURL

```sh
curl --request PUT 'localhost:8131/api/v1/ratings/student' \
--header 'Content-Type: application/json' \
--data '{
    "id": 1,
    "rating": 4,
    "studentId": "S10198765A"
}'
```

Windows cURL

```sh
curl --request PUT "localhost:8131/api/v1/ratings/student" --header "Content-Type: application/json" --data "{\"id\": 1,\"rating\": 4,\"studentId\": \"S10198765A\"}"
```

#### Response

The response will be a status code `200` if request was successful, otherwise a corresponding status code and error message.

---

## 2. Comments

Base URL: `localhost:8131/api/v1/comments`

---

### 2.1 GET comments

This endpoint is used to get all comments given by students to other students, tutors, modules and classes.

#### Endpoint URL

```url
http://localhost:8131/api/v1/comments/:target/:targetId
```

#### Example Request

cURL

```sh
curl GET "localhost:8131/api/v1/comments/module/T024681012"
```

#### Response

If request was successful, a JSON array of comments will be returned, and the `studentId` field will be an empty string if anonymous is set to true. If the request was unsuccessful, a corresponding status code and error message will be returned.

**Example**

```JSON
[
    {
        "id": 1,
        "comment": "cringe",
        "studentId": "S10198765A",
        "target": "module",
        "targetId": "T024681012",
        "dateTime": "2022-1-17 13:28:11",
        "anonymous": false
    },
    {
        "id": 2,
        "comment": "SUS ඞ",
        "studentId": "",
        "target": "module",
        "targetId": "T024681012",
        "dateTime": "2022-1-17 13:39:11",
        "anonymous": true
    }
]
```

---

### 2.2 GET comments (sent)

This endpoint is used to get all comments sent by the student to other students, tutors, modules and classes.

#### Endpoint URL

```url
http://localhost:8131/api/v1/comments/:student/:studentId/sent
```

#### Example Request

cURL

```sh
curl GET "localhost:8131/api/v1/comments/student/S10198765A/sent"
```

#### Response

If request was successful, a JSON array of comments sent by the student will be returned. Otherwise, a corresponding status code and error message will be returned.

**Example**

```JSON
[
    {
        "id": 1,
        "comment": "git gud noob",
        "studentId": "S10198765A",
        "target": "module",
        "targetId": "M09271",
        "dateTime": "2022-1-17 13:56:0",
        "anonymous": true
    },
    {
        "id": 2,
        "comment": "SUS ඞ",
        "studentId": "S10198765A",
        "target": "class",
        "targetId": "C8127S",
        "dateTime": "2022-1-17 14:1:35",
        "anonymous": false
    }
]
```

---

### 2.3 POST comments

This endpoint is used by students to give a new rating.

#### Endpoint URL

```url
http://localhost:8131/api/v1/comments
```

#### JSON Body Parameters

| Name        | Type    | Required | Description                                                                                                               |
| ----------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `comment`   | string  | Required | A message that contains at least 1 character, and consists of only `0-9`, `a-z`, `A-Z` and `,.!?+-*/%=()$@:'\` characters |
| `studentId` | string  | Required | The ID of the student giving the comment                                                                                  |
| `target`    | string  | Required | The target of the comment, or who the comment is for. The accepted targets are `student`, `tutor`, `module`, `class`.     |
| `targetId`  | string  | Required | The ID of the specified target type                                                                                       |
| `anonymous` | boolean | Optional | Specify whether the comment should be anonymous, where `true` means remain anonymous. Default value is `false`            |

#### Example Request

cURL

```sh
curl --request POST 'localhost:8131/api/v1/comments/student' \
--header 'Content-Type: application/json' \
--data '{
    "comment": "git gud noob",
    "studentId": "S10198765A",
    "target": "student",
    "targetId": "T024681012",
    "anonymous": true
}'
```

Windows cURL

```sh
curl --request POST "localhost:8131/api/v1/comments/student" --header "Content-Type: application/json" --data "{\"comment\": \"git gud noob\",\"studentId\": \"S10198765A\",\"target\": \"student\",\"targetId\": \"T024681012\",\"anonymous\": true}"
```

#### Response

The response will be a status code `200` if request was successful, otherwise a corresponding status code and error message.

---

### 2.4 PUT comments

This endpoint is used by students to update their own comments.

#### Endpoint URL

```url
http://localhost:8131/api/v1/comments
```

#### JSON Body Parameters

| Name        | Type    | Required | Description                                                                                                                                                 |
| ----------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`        | number  | Required | The ID of the comment given                                                                                                                                 |
| `comment`   | number  | Required | A message that contains at least 1 character, and consists of only `0-9`, `a-z`, `A-Z` and `,.!?+-*/%=()$@:'\` characters                                   |
| `studentId` | string  | Required | The ID of the student giving the comment                                                                                                                    |
| `anonymous` | boolean | Optional | Specify whether the rating should be anonymous, where `true` means remain anonymous. Leaving this parameter empty will leave the anonymity status unchanged |

#### Example Request

cURL

```sh
curl --request PUT 'localhost:8131/api/v1/comments/student' \
--header 'Content-Type: application/json' \
--data '{
    "id": 4,
    "comment": "SUS",
    "studentId": "S10198765A",
    "anonymous": true
}'
```

Windows cURL

```sh
curl --request PUT "localhost:8131/api/v1/comments/student" --header "Content-Type: application/json" --data "{\"id\": 5,\"comment\": \"SUS\",\"studentId\": \"S10198765A\",\"anonymous\": true}"
```

#### Response

The response will be a status code `200` if request was successful, otherwise a corresponding status code and error message.

---

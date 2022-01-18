# ETI ASSIGNMENT 2

## Description

This assignment splits up a monolith project into several parts, and the section I am working on is **3.9. Rating and Comments Dashboard for Students**.

The task breakdown for this assignment is as follows:

- 3.9.1. Create, view, update ratings and comments to students, tutors, modules, classes

- 3.9.2. View ratings and comments received

- 3.9.3. List ratings and comments received (anonymized)

- 3.9.4. List ratings and comments given

# API Reference

## 1. Student Ratings

Base URL: `localhost:8131/api/v1/ratings/student`

---

### 1.3 POST ratings/student

This endpoint is used by students to give a new rating.

#### Endpoint URL

```url
http://localhost:8131/api/v1/ratings/student
```

#### JSON Body Parameters

| Name        | Type    | Required | Description                                                                                                         |
| ----------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `rating`    | number  | Required | An integer between 0 to 5 inclusive representing the rating score                                                   |
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

### 1.4 PUT ratings/student

This endpoint is used by students to update their own rating.

#### Endpoint URL

```url
http://localhost:8131/api/v1/ratings/student
```

#### JSON Body Parameters

| Name        | Type    | Required | Description                                                                                                                                                 |
| ----------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`        | number  | Required | The ID of the rating given                                                                                                                                  |
| `rating`    | number  | Required | An integer between 0 to 5 inclusive representing the rating score                                                                                           |
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

## 2. Student Comments

Base URL: `localhost:8131/api/v1/comments/student`

---

### 2.3 POST comments/student

This endpoint is used by students to give a new rating.

#### Endpoint URL

```url
http://localhost:8131/api/v1/comments/student
```

#### JSON Body Parameters

| Name        | Type    | Required | Description                                                                                                              |
| ----------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| `comment`   | string  | Required | A message that contains at least 1 character, and consists of only `0-9`, `a-z`, `A-Z` and `,.!?+-*/%=()$@:\` characters |
| `studentId` | string  | Required | The ID of the student giving the comment                                                                                 |
| `target`    | string  | Required | The target of the comment, or who the comment is for. The accepted targets are `student`, `tutor`, `module`, `class`.    |
| `targetId`  | string  | Required | The ID of the specified target type                                                                                      |
| `anonymous` | boolean | Optional | Specify whether the comment should be anonymous, where `true` means remain anonymous. Default value is `false`           |

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

### 2.4 PUT comments/student

This endpoint is used by students to update their own comments.

#### Endpoint URL

```url
http://localhost:8131/api/v1/comments/student
```

#### JSON Body Parameters

| Name        | Type    | Required | Description                                                                                                                                                 |
| ----------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`        | number  | Required | The ID of the comment given                                                                                                                                 |
| `comment`   | number  | Required | A message that contains at least 1 character, and consists of only `0-9`, `a-z`, `A-Z` and `,.!?+-*/%=()$@:\` characters                                    |
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

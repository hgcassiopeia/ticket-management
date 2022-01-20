# ticket-management

### How to run
```bash
$ docker-compose up -d
```

### Database Structure
tickets Table

|Column|Data Type|
|:---:|:----:|  
|ticket_type|text|
|price|int|
|amount_limit|int|
|minimum_buying|int|

sold_tickets Table

|Column|Data Type|
|:---:|:----:|  
|ticket|text|
|ticket_type|text|
|price|int|
|buyer|text|
|date|text|

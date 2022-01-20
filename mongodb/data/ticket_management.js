db.createCollection("tickets");
db.tickets.insert({
    "ticket_type": "A",
    "price": 5000,
    "amount_limit": 10,
    "minimum_buying": 1
});
db.tickets.insert({
    "ticket_type": "B",
    "price": 2500,
    "amount_limit": 20,
    "minimum_buying": 2
});
db.tickets.insert({
    "ticket_type": "C",
    "price": 1000,
    "amount_limit": 30,
    "minimum_buying": 2
});
db.tickets.insert({
    "ticket_type": "D",
    "price": 500,
    "amount_limit": 40,
    "minimum_buying": 3
});

db.createCollection("sold_tickets");
db.sold_tickets.insert({
    "ticket": "A2",
    "ticket_type": "A",
    "price": 5000,
    "buyer": "Dream",
    "date": '2022-01-19'
});
db.sold_tickets.insert({
    "ticket": "B2",
    "ticket_type": "B",
    "price": 2500,
    "buyer": "Dream",
    "date": '2022-01-19'
});
db.sold_tickets.insert({
    "ticket": "B2",
    "ticket_type": "B",
    "price": 2500,
    "buyer": "Dream",
    "date": '2022-01-19'
});
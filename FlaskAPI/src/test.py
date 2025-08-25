import random
from datetime import datetime

brands = ["Rolex", "Omega", "Patek Philippe", "Seiko", "Casio", "Audemars Piguet"]

watches = []
for i in range(1, 31):
    watch = {
        "seller_id": random.randint(1, 10),
        "name": f"Watch {i}",
        "brand": random.choice(brands),
        "price": round(random.uniform(1000, 50000), 2),
    }
    watches.append(watch)

for w in watches:
    print(w)

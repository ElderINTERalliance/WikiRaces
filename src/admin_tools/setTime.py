import dateparser
import datetime
import os
import json

epoch = datetime.datetime.utcfromtimestamp(0)

cursor = "> "

# START TIME


def get_time() -> str:
    time = dateparser.parse(input(cursor))
    while time == None:
        print("Invalid time.")
        time = dateparser.parse(input(cursor))
    return time.isoformat()


print("When should the first level open? (e.g. in _ minutes, 12:00pm)")
start_time = get_time()

# DURATION
duration = 0
while duration <= 0:
    print("How long should each level last? (in minutes)")
    length = input(cursor)
    try:
        duration = int(length)
    except:
        print("please enter a non-zero positive integer")

# DURATION
break_time = 0
while break_time <= 0:
    print("What is the break in between levels? (in minutes)")
    length = input(cursor)
    try:
        break_time = int(length)
    except:
        print("please enter a non-zero positive integer")


# APPROVE
def approved() -> bool:
    print()
    print(f"First level starts: {start_time}")
    print(f"Levels last {duration} minutes")
    print(f"Students get a {break_time} minute break")
    print()
    print("Does this look good? (y/n)")
    choice = input("> ")
    if choice == "y":
        return True
    elif choice == "n":
        return False
    else:
        return approved()


# FILE INTERACTIONS
# Use file to refer to the file object
def get_json():
    with open(os.path.join(os.pardir, "game/game_static/levels.json")) as file:
        return json.loads(file.read())


def generate_times():
    print(get_json())


if approved():
    generate_times()
else:
    print("Exited - Nothing written")

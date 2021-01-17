import dateparser
import datetime
import os
import json
from shutil import copyfile

epoch = datetime.datetime.utcfromtimestamp(0)

cursor = "> "


# CONVERT MINUTES FROM NOW INTO DATE STRING
def minutes_to_date(mins: int) -> str:
    if mins <= 0:
        return datetime.datetime.now()

    start = datetime.datetime.now()
    delta = datetime.timedelta(minutes=mins)
    return (start + delta).replace(microsecond=0).isoformat()


# TAKE INPUT
def get_minutes(prompt: str) -> int:
    duration = 0
    while duration <= 0:
        print(prompt)
        length = input(cursor)
        try:
            duration = int(length)
        except:
            print("please enter a non-zero positive integer")
    return duration


# Set variables
start_time = get_minutes("When should the first level start? (in minutes)")
duration = get_minutes("How long should each level last? (in minutes)")
break_time = get_minutes("What is the break in between levels? (in minutes)")


# APPROVE
def approved() -> bool:
    print()
    print(f"First level starts in {start_time} minutes")
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


def set_json(raw_string: str):
    with open(os.path.join(os.pardir, "game/game_static/levels.json"), 'w') as file:
        return file.write(raw_string)


def backup():
    source = os.path.join(os.pardir, "game/game_static/levels.json")
    destination = os.path.join(os.pardir, "game/game_static/BU_levels.json")
    copyfile(source, destination)


def set_correct_times():
    levels = get_json()

    i = 0
    for level in levels:
        start_minutes = start_time + (i * duration) + (i * break_time)
        levels[level]["startTime"] = minutes_to_date(start_minutes)

        end_minutes = start_time + ((i + 1) * duration) + (i * break_time)
        levels[level]["endTime"] = minutes_to_date(end_minutes)
        i += 1

    return levels


if approved():
    levels = set_correct_times()
    backup()
    set_json(json.dumps(levels, indent=4))
    print("Written to file. Backup made.")
else:
    print("Exited - Nothing written")

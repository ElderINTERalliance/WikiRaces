import dateparser
import datetime
epoch = datetime.datetime.utcfromtimestamp(0)


levels = {}

cursor = "> "


def get_time() -> str:
    time = dateparser.parse(input(cursor))
    while time == None:
        print("Invalid time.")
        time = dateparser.parse(input(cursor))
    return time.isoformat()


def get_name() -> str:
    print("Enter the level name. (e.g. level1, level2, level3...)")
    return input(cursor)


def start_time() -> str:
    print("Enter the time the level should open. (e.g. 'in 3 min', 'Fri, 12 Dec 2021 10:55:50)'")
    return get_time()


def end_time() -> str:
    print("Enter the time the level should close. (e.g. 'in 10 min', 'Fri, 12 Dec 2021 10:59:00')")
    return get_time()


def start_page():
    print("Enter the part of the wikipedia url after 'https://en.wikipedia.org/wiki/' for the starting page.")
    return input(cursor)


def end_page():
    print("Enter the part of the wikipedia url after 'https://en.wikipedia.org/wiki/' for the ending page.")
    return input(cursor)


def generate_level():
    return {
        "name": get_name(),
        "startTime": start_time(),
        "endTime": end_time(),
        "startPage": start_page(),
        "endPage": end_page()
    }


def add_level():
    level = generate_level()
    levels[level["name"]] = level


def add_more():
    print("Would you like to add another level? (y/n)")
    choice = input("> ")
    if choice == "y":
        return True
    elif choice == "n":
        return False
    else:
        return add_more()


while add_more():
    add_level()

print("")
print("Copy and paste the following into the `levels` variable in ../game/game_static/client.js")
print("")
print(levels)

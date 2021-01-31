from pymongo import MongoClient
client = MongoClient("mongodb://127.0.0.1:27017")
db = client.wikiRaces


def list_users():
    print("Listing users. \n")
    for item in db.users.find():
        print(f'name = "{item["name"]}"')


def list_users_with_ids():
    print("Listing users with ids. \n")
    for item in db.users.find():
        print(f'userId = "{item["userId"]}" \t name = "{item["name"]}"')


def get_id_of_username(username=None):
    if not username:
        print("What is the username you want to get the id of?")
        username = input("> ")
    user_ids = []
    for item in db.users.find({"name": username}):
        print("Found the following users:")
        print(f'userId = "{item["userId"]}"\t name = "{item["name"]}"')
        user_ids.push(item["userId"])
    return user_ids


def change_username():
    print("change_username not implemented")


def cancel():
    print("Cancelled - nothing written")


# This is stolen from an old project of mine
def take_input(commands, word="command"):
    if len(commands) == 1:
        print(f"Only one {word} found.")
        return commands[0]

    print(f"Pick a choice from the following {word}s:")

    for i, function in enumerate(commands, 1):
        print(f"\t{i} - {function.__name__}")

    print(f"\nPress ENTER for last {word}, or type an individual number. \n")

    choice = input(" > ")

    # if there is no entry, assume the user wants the last chapter
    if choice == "":
        return commands[len(commands) - 1]
    else:
        try:
            choice.strip()
            choice = int(choice) - 1  # account for one index
            return commands[choice]
        except IndexError:
            print("That index was out of range.\n")
            return take_input(commands, word)
        except:
            print("Enter a number, or hit enter.\n")
            return take_input(commands, word)


list_of_commands = [
    list_users,
    list_users_with_ids,
    get_id_of_username,
    change_username,
    cancel,
]

choice = take_input(list_of_commands)
choice()

print("")
print("exited")
client.close()

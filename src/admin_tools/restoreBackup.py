from shutil import copyfile
import os

print("")
print("")
print("oooooo   oooooo     oooo  o8o  oooo         o8o       ooooooooo.                                          ")
print(" `888.    `888.     .8'   `\"'  `888         `\"'       `888   `Y88.                                        ")
print("  `888.   .8888.   .8'   oooo   888  oooo  oooo        888   .d88'  .oooo.    .ooooo.   .ooooo.   .oooo.o ")
print("   `888  .8'`888. .8'    `888   888 .8P'   `888        888ooo88P'  `P  )88b  d88' `\"Y8 d88' `88b d88(\"8 ")
print("    `888.8'  `888.8'      888   888888.     888        888`88b.     .oP\"888  888       888ooo888 `\"Y88b.  ")
print("     `888'    `888'       888   888 `88b.   888        888  `88b.  d8(  888  888   .o8 888    .o o.  )88b ")
print("      `8'      `8'       o888o o888o o888o o888o      o888o  o888o `Y888\"\"8o `Y8bod8P' `Y8bod8P' 8\"\"888P' ")
print("")
print("This script restores the last levels.json file.")
print("")


def restore_backup():
    source = os.path.join(os.pardir, "game/game_static/BU_levels.json")
    destination = os.path.join(os.pardir, "game/game_static/levels.json")
    copyfile(source, destination)


# APPROVE
def approved() -> bool:
    print()
    print(f"Are you sure you want to restore levels.json?")
    print(f"(You can always set it again with setTime.py)")
    print()
    print("Confirm? (y/n)")
    choice = input("> ")
    if choice == "y":
        return True
    elif choice == "n":
        return False
    else:
        return approved()


if approved():
    restore_backup()
    print("Backup restored")
else:
    print("Backup not restored - Nothing written")

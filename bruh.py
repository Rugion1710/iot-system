import keyboard
count = 0
while True:
    count += 1
    print(count)
    if keyboard.is_pressed("u"):
        break
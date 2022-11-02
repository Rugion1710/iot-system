# class Bruh:
#     def __init__(self):
#         self.robot = "bruh"
    
#     def get_name(self):
#         self.bruhhaha = "bruh"

#     def get_name2(self):
#         print(self.bruhhaha)

# bruh = Bruh()
# bruh.get_name()
# bruh.get_name2()

count = 0

class PID():
    def __init__(self):
        pass

    def rotation(self, value):
        return count < value

    def move_forward(self, condition):
        global count
        while condition():
            count += 1
            print(count)


pid = PID()

pid.move_forward(lambda: pid.rotation(90))

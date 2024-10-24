import random
import string
all_letters = string.ascii_letters

    
def shuffle_alphabet():
    # Get all uppercase and lowercase letters
    all_letters = string.ascii_letters
    
    # Convert the string to a list so we can shuffle it
    letter_list = list(all_letters)
    
    # Shuffle the list
    random.shuffle(letter_list)
    
    return letter_list

# Generate and print a shuffled alphabet
shuffled_alphabet = shuffle_alphabet()
num = 901
x = []
z = 0
y = ""
for i in range(100):
 for i in range(len(all_letters)):
    z = z + 1
    y = y + "'"
    y = y + all_letters[i]
    y = y + "' : '"
    y = y + shuffled_alphabet[i]
    y = y + "' , "
    if z == 13:
        y = y +"\n    "
        z = 0
 y = y + "' ' : ' ' , '.' : '.' , ',' : ',',"

 print(str(num)+": {")

 print(y)
 y = ""
 num = num + 1

 print("},")
 shuffled_alphabet = shuffle_alphabet()






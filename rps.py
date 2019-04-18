from msvcrt import getch
from random import randint
from time import sleep

def game():
    #auto uppercase input
    userChoice = input(">").upper()

    if userChoice == "Q": exit()

    #change input char to word
    if userChoice == 'R':
        userChoice = "Rock"
    elif userChoice == "P":
        userChoice = "Paper"
    elif userChoice == "S":
        userChoice = "Scissor"
    else:
        print(valid_keys)

    computerChoice = randomComputerChoice(1, 3)
    checkWinner(userChoice, computerChoice)

def checkWinner(userChoice, computerChoice):
    print("{} v/s {}".format(userChoice, computerChoice))
    if userChoice == computerChoice:
        print("It's a tie")
    elif ((userChoice == "Rock" and computerChoice == "Scissor") or 
            (userChoice == "Paper" and computerChoice == "Rock") or   
                (userChoice == "Scissor" and computerChoice == "Paper")):
        print("Damn the {} is tough! You win.".format(userChoice))
    else:
        print("Damn the {} is tough! Computer Wins.".format(computerChoice))

def randomComputerChoice(start, end):
    randonNumber = randint(start, end)
    if randonNumber == 1:
        return "Rock"
    elif randonNumber == 2:
        return "Paper"
    else:
        return "Scissor"

def countdown():
    n = 3
    while ( n>0 ) :
        sleep(0.5)
        print(n)
        n -= 1
    print("Go.")

def gameStart():
    print("Are you ready!! Press Enter")
    key = ord(getch())
    while True:
        if key == 13:
            game()
        else:
            print(valid_keys)

def gameEnd():
    key = ord(getch())
    while True:
        if key == 32:
            print("Come back later Senpai. Please!")
            exit()
        else: 
            print(valid_keys)
        
def main():
    print("The clasic Rock, Paper, Scissor !")
    print("Press R for rock, P for paper, S for scissor, Q to quit")
    global valid_keys = "R for rock, P for paper, S for scissor, Q to quit"

    #countdown at the start
    countdown()
    gameStart()

if __name__ == "__main__":
    main()
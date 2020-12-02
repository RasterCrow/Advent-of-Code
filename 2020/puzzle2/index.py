#read lines from file
f = open("input.txt", "r")
lines = f.read().splitlines() 
f.close()

# Part1
def part1():
    #for each password
    valid = []
    for line in range(len(lines)):
        #retrieve info from line
        min=int(lines[line].split()[0].split('-')[0])
        max=int(lines[line].split()[0].split('-')[1])
        letter=lines[line].split()[1].split(':')[0]
        password = lines[line].split()[2]
        #check if correct

        count=0
        for pswLetter in list(password):
           
            if pswLetter == letter:
                count+=1
        if count >= min and count <= max:

            valid.append(password)
    print(len(valid))
    
    
# Part 2
def part2():
    #for each password
    valid = []
    for line in range(len(lines)):
        #retrieve info from line
        index1=int(lines[line].split()[0].split('-')[0])-1
        index2=int(lines[line].split()[0].split('-')[1])-1
        letter=lines[line].split()[1].split(':')[0]
        password = list(lines[line].split()[2])
        if index2<=len(password):
            #check if correct
            if not(password[index1]==letter and password[index2]==letter):
                if password[index1]==letter or password[index2]==letter:
                    valid.append(password)
    print(len(valid))
    
part2()

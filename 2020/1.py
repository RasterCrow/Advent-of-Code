f = open("1.txt", "r")
lines = f.read().splitlines() 
f.close()
# Part1
def part1():
    for a in range(len(lines)):  
        for b in range(a,len(lines)):
            if int(lines[a])+int(lines[b])==2020:
                print(int(lines[a])*int(lines[b]))

# Part 2
def part2():
    for a in range(len(lines)):  
        for b in range(a,len(lines)):
            for c in range(b,len(lines)):
                if int(lines[a])+int(lines[b])+int(lines[c])==2020:
                    print(int(lines[a])*int(lines[b])*int(lines[c]))
    
#part1()
#part2()
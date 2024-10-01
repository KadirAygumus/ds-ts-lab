import { colleagues, friends } from './01-basics';
import { Friend, Colleague, EmailContact } from './myTypes'


function older(f: Friend): string {
    f.age += 1
    return `${f.name} is now ${f.age}`
}
console.log(older(friends[0]))


function allOlder(friends: Friend[]): string {
    return friends.map(older).join(', ');
}


console.log(allOlder(friends))


function highestExtension(cs: Colleague[]) { // Inferred retun type
    const result = cs.sort(
        (c1, c2) => c1.contact.extension - c2.contact.extension
    );
    return result[cs.length - 1];
}
console.log(highestExtension(colleagues.current));

function addColleague(colleagues: Colleague[], name: string, department: string, email: string): void {

    const newColleague: Colleague = {
        name,
        department,
        contact: {
            email,
            extension: highestExtension(colleagues).contact.extension + 1,
        },
    };

    colleagues.push(newColleague);
}

addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));

function sortColleagues(
    colleagues: Colleague[],
    sorter: (c1: Colleague, c2: Colleague) => number,
    max?: number
): EmailContact[] {
    let end = colleagues.length;
    if (max !== undefined) {
        end = max < 2 ? 1 : max
    }
    const sorted = colleagues.sort(sorter);
    const fullResult = sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
    return fullResult.slice(0, end)
}
// Test invocations
console.log(sortColleagues(colleagues.current, (a, b) => (a.contact.extension - b.contact.extension), 3));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length), 1));

function findFriends(friends: Friend[], crit: (friend: Friend) => boolean) {
    return friends
        .filter(crit) // Filter based on the criterion
        .map(friend => friend.name); // Return only the names

}
console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));
console.log(findFriends(friends, (friend) => friend.age < 35));

function addInterest(friend: Friend, interest: string): void {
    if (friend.interests !== undefined) {
        friend.interests.push(interest);
    }
    else{
        friend.interests = [];
        friend.interests.push(interest);
    }
}
addInterest(friends[0], 'Politics')
console.log(friends[0].interests)


const person = {
    firstName:"서예",
    lastName:"이",
    //아래에 매서드를 만듭니다
    fullName : function () {
        return this.lastName +  " " + this.firstName;
    }
}

const member = {
    firstName:"주현",
    lastName:"백",
}

let fullName = person.fullName.bind(member);

document.getElementById("demo").innerHTML = fullName();
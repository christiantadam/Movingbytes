const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var listblack = [];
var listname= [];
var listphonenumber=[];

function exit(){
	setTimeout(() => {
		console.log('ByeBye :)')
		process.exit();
	}, 3000);
}

function initialize(data){
	console.clear();
	listblack = [];
	listname = [];
	listphonenumber = [];
	console.log('initialize data from: ' + data);
	var fs = require("fs");
	var textByLine = fs.readFileSync(data).toString().split("\n");
	for(i = 0; i < textByLine.length; i++){
		var readByLine = textByLine[i].trim('\r').split(' ');
		var name = readByLine[0];
		var phone = readByLine[1];
		console.log(readByLine);
		listname.push(name);
		listphonenumber.push(phone);
		listblack.push(readByLine);
	}
	console.log('1. Input "check"" to check blacklist.');
	console.log('2. Input "initialize" to initialize other data.');
	console.log('3. Input "quit" to exit.');
}

initialize('blacklist.txt')

function check_blacklist(name, phone_number){
	console.log('Name: ' + name + ' Phone Number: ' + phone_number);

	if (listname.includes(name) && listphonenumber.includes(phone_number)) {
		console.log('Blacklisted');
		exit();
	}
	else{
		console.log('Not Blacklisted');
		exit();
	}
}

rl.on('line', (input) => {
	if (input == 'initialize'){
		rl.question('What is your filename? (only .txt format)',(answer)=>{
			console.log('Using function initialize now...');
			setTimeout(() => {
				initialize(namafile);
			}, 2000);
		})

	}
	else if(input.includes('check')){
		rl.question('Please insert: name<space>phone_number ',(answer)=>{
			console.log(answer);
			var paramList = answer.split(' ');
			var nama = paramList[0];
			var nomortelp = paramList[1];
			console.log('Checking blacklist for ' + nama + ' ' + nomortelp);
			check_blacklist(nama,nomortelp);
		})
	}
	else if(input == 'quit'){
		console.log('ByeBye :)')
		process.exit();
	}
	else{
		console.log('there is no such command.')
	}
});
const MorseCode = {
  ". -": "A",
  "- . . .": "B",
  "- . - .": "C",
  "- . .": "D",
  ".": "E",
  ". . - .": "F",
  "- - .": "G",
  ". . . .": "H",
  ". .": "I",
  ". - - -": "J",
  "- . -": "K",
  ". - . .": "L",
  "- -": "M",
  "- .": "N",
  "- - -": "O",
  ". - - .": "P",
  "- - . -": "Q",
  ". - .": "R",
  ". . .": "S",
  "-": "T",
  ". . -": "U",
  ". . . -": "V",
  ". - -": "W",
  "- . . -": "X",
  "- . - -": "Y",
  "- - . .": "Z",
  "- - - - -": "0",
  ". - - - -": "1",
  ". . - - -": "2",
  ". . . - -": "3",
  ". . . . -": "4",
  ". . . . .": "5",
  "- . . . .": "6",
  "- - . . .": "7",
  "- - - . .": "8",
  "- - - - .": "9",
};

const cookie =
  "connect.sid=s%3AtPfNtLVXpGhXsypxNXvKmGbcUcnipUl6.SzPYZ4p9Cf5Kwy%2Bk63EdlcapJDBKXVmDPGm%2BGJI1608";

async function fetchAssignments() {
  const response = await fetch("https://exam.ankush.wiki/assignments", {
    headers: {
      Cookie: cookie,
    },
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }
  const data = await response.json();
  console.log(data);
  console.log(data.numParts);
  return data.numParts;
}

async function fetchData(i) {
  const response = await fetch(`https://exam.ankush.wiki/data?part=${i}`, {
    headers: {
      Cookie: cookie,
    },
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.message);
  }

  const out = await response.json();
  console.log(out);
  const separatorIndex = out.data.indexOf("➡➡➡");
  const left = out.data.slice(0, separatorIndex);
  const right = out.data.slice(separatorIndex + 1);

  const leftConcatenated = left.join(" ");
  const rightConcatenated = right.join(" ");
  let digit;
  let letter;

  if (leftConcatenated.length === 9) {
    digit = MorseCode[leftConcatenated];
    letter = MorseCode[rightConcatenated];
  } else {
    const fdigit = MorseCode[leftConcatenated.slice(0, 9)].toString();
    const sdigit = MorseCode[leftConcatenated.slice(10)].toString();
    digit = parseInt(fdigit + sdigit);
    letter = MorseCode[rightConcatenated];
  }
  console.log(digit, letter);
  return { [digit]: letter };
}

async function startFetch() {
  const numparts = await fetchAssignments();
  let finalRes = {};
  console.log(numparts);

  for (let i = 1; i <= numparts; i++) {
    await new Promise((resolve) => setTimeout(resolve, 2500));
    const res = await fetchData(i);
    finalRes = { ...finalRes, ...res };
  }

  return finalRes;
}

startFetch()
  .then((finalRes) => {
    console.log(finalRes);
    const sortedArray = Object.entries(finalRes).sort((a, b) => a[0] - b[0]);
    const sortedRes = {};
    for (let i = 0; i < sortedArray.length; i++) {
      sortedRes[sortedArray[i][0]] = sortedArray[i][1];
    }
    console.log(sortedRes);
    let chaincode = "";
    for (let key in sortedRes) {
      chaincode += sortedRes[key];
    }
    console.log(chaincode);
  })
  .catch(console.error);

let decimalBTN = document.getElementById('kalk-decimal'); //wczytanie kropki
let clearBTN = document.getElementById('kalk-clear');  //wczytanie przycisku do usuwania wszystkiego z kalkulatora
let backspaceBTN = document.getElementById('kalk-backspace'); //wczytanie przycisku do usuwania ostatniej cyfry 
let displayValElement = document.getElementById('kalk-display-val');//wyświetlacz kalkulatora


let kalkNumBtn = document.getElementsByClassName('kalk-btn-n'); //tablica ze wszystkimi liczbami 
let kalkOperatorBtn = document.getElementsByClassName('kalk-btn-o'); //tablica ze wszystkimi operatorami


let displayVal = '0'; //ustawienei wartosci domyslnej kalkulatora 
let pendingVal; //zmienna do przechowyania poprzednio wyświetlanej wartości w oknie 
let evalStringArray = []; //tablica do przechowywania operacji które wciśniemy na kalkulatorze 



//wyświetlanie wybranych liczb 
let updateDisplayVal = (clickObj) => {
  let btnText = clickObj.target.innerText;

  if (displayVal == '0')
    displayVal = ''; //usuniecie wartosci wyswietlanej domyslnie na ekranie aby pierwsza kliknieta liczba nie byla np 01 

  displayVal = displayVal + btnText;
  displayValElement.innerHTML = displayVal; //wyswietlanie wybranych cyfr
}



//opdowiednie działania arytmetyczne 
let performOperation = (clickObj) => {
  let operator = clickObj.target.innerText;    

  switch (operator) {    //sprawdzanie co została kliknięte 
    case '+':
      pendingVal = displayVal;     
      displayVal = '0';
      displayValElement.innerText = displayVal;
      evalStringArray.push(pendingVal); //dodajemy kolejny elemetn do tablicy o wartosc ktora byla na ekranie przed wcisnieciem +
      evalStringArray.push('+')  //dodanie + jako kolejny element tablicy 
      break;

    case '-':
      pendingVal = displayVal;
      displayVal = '0';
      displayValElement.innerText = displayVal;
      evalStringArray.push(pendingVal);
      evalStringArray.push('-')
      break;

    case 'x':
      pendingVal = displayVal;
      displayVal = '0';
      displayValElement.innerText = displayVal;
      evalStringArray.push(pendingVal);
      evalStringArray.push('*')
      break;


    case '÷':
      pendingVal = displayVal;
      displayVal = '0';
      displayValElement.innerText = displayVal;
      evalStringArray.push(pendingVal);
      evalStringArray.push('/')
      break;

    case '=':
      evalStringArray.push(displayVal); //dodajemy kolejny elemetn do tablicy o wartosc ktora byla na ekranie przed wcisnieciem =
      let evaluation = eval(evalStringArray.join(' ')); //zliczenie wyniku 
      displayVal = evaluation ;
      displayValElement.innerText = displayVal; //wyswietlenie wyniku 
      evalStringArray=[]; //wyczyszczenei tablicy z operacjami 
      break;
      
    default:
      break;
  }
}

// dodawanie funkcji klikania do każdego elementu z tablicy
for (let i = 0; i < kalkNumBtn.length; i++) {
  kalkNumBtn[i].addEventListener('click', updateDisplayVal, false); // dla kazdego elementu w tablicy kalNumBtn
}

//przypisanie odpowiednich komend do operacji 
for (let i = 0; i < kalkOperatorBtn.length; i++) {
  kalkOperatorBtn[i].addEventListener('click', performOperation, false) // dla kazdego elementu w tablicy kalkOperatorBtn
}

//usuwanie wszystkich zapisanych danych po kliknieciu na przycisk  AC
clearBTN.onclick = () => {
  displayVal = '0';
  pendingVal = undefined;
  evalStringArray = [];
  displayValElement.innerHTML = displayVal;
}

//usuwanie ostatniego znaku. w przypadku gdy usuwamy ostatnia liczbe pojawia sie 0 aby wysiwetlacz nie byl pusty 
backspaceBTN.onclick = () => {
  let lenghtOfDisplaVal = displayVal.length;
  displayVal = displayVal.slice(0, lenghtOfDisplaVal - 1) //uciecie ostatniego znaku 
  if (displayVal == '')
    displayVal = '0';
  displayValElement.innerHTML = displayVal;
}


//dodawanie przecinka do liczb
decimalBTN.onclick = () => {
  if (!displayVal.includes('.'))
    displayVal = displayVal + '.';
  displayValElement.innerHTML = displayVal;

}





//kalkNumBtn[1].addEventListener('click', updateDisplayVal, false);
//fifeBTn.addEventListener('click', updateDisplayVal, false);

//

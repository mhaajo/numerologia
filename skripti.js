"use strict";

var numEsiintymat = [0,0,0,0,0,0,0,0,0];

function laskeMinuus() {
  var vokaalit = "aeiouyåäö";
  var vokaaliArvot = [1,5,9,6,3,7,9,1,2];
  var konsonantit = "bcdfghjklmnpqrstvwxz";
  var konsoArvot = [2,3,4,6,7,8,1,2,3,4,5,7,8,9,1,2,4,5,6,8];
  var kayttajanNimi = document.getElementById('nimi').value.toLowerCase();
  var x, y, i, summa = 0;
  var nimenPituus = kayttajanNimi.length;
  var vokaalienPituus = vokaalit.length;
  var konsonPituus = konsonantit.length;
  var vaikutelma, pyrkimys, minuus;
  var teksti ="";

  /* laske pyrkimyksen luku vokaalien numeroarvojen perusteella */
  for (x=0; x<nimenPituus; x++) {
    for (y=0; y<vokaalienPituus; y++) {
      if (kayttajanNimi.charAt(x) == vokaalit.charAt(y)) {
        summa += vokaaliArvot[y];
        /* laske montako kertaa kukin numero esiintyy nimessä */
        laskeEsiintymat(vokaaliArvot[y]);
      }
    }
  }

  pyrkimys = summaaNumerot(summa);
  summa = 0;

  /* laske vaikutelman luku konsonanttien numeroarvojen perusteella */
  for (x=0; x<nimenPituus; x++) {
    for (y=0; y<konsonPituus; y++) {
      if (kayttajanNimi.charAt(x) == konsonantit.charAt(y)) {
        summa += konsoArvot[y];
        /* laske montako kertaa kukin numero esiintyy nimessä */
        laskeEsiintymat(konsoArvot[y]);
      }
    }
  }

  vaikutelma = summaaNumerot(summa);
  /* minuus = pyrkimyksen luku + vaikutelman luku */
  minuus = summaaNumerot(pyrkimys + vaikutelma);

  /* tulosta pyrkimys, vaikutelma ja minuus sivulle css:llä stailattuna */
  document.getElementById("minuustulos").innerHTML = "<span class='efekti1'>Pyrkimyksen numerosi on: </span><span class='efekti2'>" +
  pyrkimys + "<br></span><span class='efekti1'>Vaikutelman numerosi on: </span><span class='efekti2'>" + vaikutelma +
  "<br></span><span class='efekti1'>Minuuden numerosi on: </span><span class='efekti2'>" + minuus + "</span><br><br>" +
  "Eri numeroiden esiintymät nimessäsi ovat seuraavat:";

  /* luo taulukko johon eri numreoiden esiintymät tulostetaan */
  teksti += "<table class='numerologia'> <tr><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr><tr>";

  for (i = 0; i < numEsiintymat.length; i++) {
    teksti += "<td>" + numEsiintymat[i] + "</td>";
  }
  teksti += "</tr></table>";

  document.getElementById("esiintymat").innerHTML = teksti;

  /* nollaa esiintymät taulukko */
  for (i = 0; i < numEsiintymat.length; i++) {
    numEsiintymat[i] = 0;
  }
}

function laskeEsiintymat(luku) {
  /* laske montako kertaa kukin numero esiintyy nimessä */
  switch (luku) {
    case 1:
      numEsiintymat[0]++;
      break;
    case 2:
      numEsiintymat[1]++;
      break;
    case 3:
      numEsiintymat[2]++;
      break;
    case 4:
      numEsiintymat[3]++;
      break;
    case 5:
      numEsiintymat[4]++;
      break;
    case 6:
      numEsiintymat[5]++;
      break;
    case 7:
      numEsiintymat[6]++;
      break;
    case 8:
      numEsiintymat[7]++;
      break;
    case 9:
      numEsiintymat[8]++;
      break;
  }
}

function laskeElamanpolku() {
  var summa = 0;

  /* summaa päivä, kuukausi ja vuosi alasvetovalikoista */
  summa += Number(document.getElementById('pv').value);
  summa += Number(document.getElementById('kk').value);
  summa += Number(document.getElementById('vv').value);

  /* tulosta tulos sivulle css:llä stailattuna */
  document.getElementById("polkutulos").innerHTML = "<br><span class='efekti1'>Elämänpolun numerosi on:</span> <span class='efekti2'>"
  + summaaNumerot(summa) + "</span>";
}

function summaaNumerot(luku) {
  var summa = luku;
  var x;
  var lukuString = String(luku);
  var luvunPituus = lukuString.length;


  do {
    /* tarkista onko luku mestariluku */
    if (onMestariluku(summa)) {
      return summa;
    }

    summa = 0;

    /* laske luvun numerot yhteen */
    for (x = 0; x < luvunPituus; x++) {
      summa += Number(lukuString.charAt(x));
    }

    /* ellei summa ole mestariluku, laske summan numerot */
    /* uudelleen yhteen kunnes summa on yksinumeroinen */
    lukuString = String(summa);
    luvunPituus = lukuString.length;
  } while (luvunPituus > 1)

  return summa;
}

function onMestariluku(luku) {
  switch (luku) {
    case 11:
    case 22:
    case 33:
    case 44:
    case 55:
    case 66:
    case 77:
    case 88:
    case 99:
      return true;
    default:
      return false;
  }
}

function tarkistaKentta() {
  /* regular expression jolla tarkistetaan että käyttäjä syötti */
  /* kenttään vain kirjaimia ja välilyöntejä */
  var regexp = /^([a-zA-ZåäöÅÄÖ]+\s)*[a-zA-ZåäöÅÄÖ]+$/;

  if (document.getElementById('nimi').value == "") {
    alert("Ole hyvä ja kirjoita nimesi ennenkuin painat Laske nappia.");
    return;
  }

  if (!regexp.test(document.getElementById('nimi').value)) {
    alert("Nimi saa sisältää vain kirjaimia ja välilyöntejä");
    return;
  }

  laskeMinuus();
}

function tarkistaPVM () {
  var kkPaivat = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

  var paiva = Number(document.getElementById('pv').value);
  var kuukausi = Number(document.getElementById('kk').value);
  var vuosi = Number(document.getElementById('vv').value);

  /* huomioi karkausvuosi */
  if(vuosi % 400 == 0 || (vuosi % 100 != 0 && vuosi % 4 == 0)) {
    kkPaivat[1] = 29;
  }

  /* tarkista antoiko käyttäjä vahingossa päiväksi esim. 31 */
  /* vaikka kuukaudessa on vain 30 tai 28(/29) päivää */
  if (paiva > kkPaivat[kuukausi - 1]) {
    alert("Annoit virheellisen päivämäärän.");
    return;
  }

  /* tarkista onko joku kentistä (tai kaikki) tyhjä */
  if (paiva == "0" || kuukausi == "0" || vuosi == "0") {
    alert("Ole hyvä ja anna syntymäaika ennenkuin painat Laske nappia.");
    return;
  }

  laskeElamanpolku();
}

function tyjennaKentta () {
  document.getElementById("minuustulos").innerHTML = "";
  document.getElementById("esiintymat").innerHTML = "";
}

function tyhjennaEp () {
  document.getElementById("polkutulos").innerHTML = "";
}

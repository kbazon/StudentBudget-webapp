<template>
  <div class="container-blue">
    <div class="container">
      <div class="flex items-center justify-between">
        <!-- txt -->
        <div class="text-column">
          <div class="title">
            <p>O nama</p>
          </div>
          <p class="odlomak1">
            StudentBudget je aplikacija razvijena s jednostavnim ciljem - pomoći
            studentima da preuzmu kontrolu nad svojim financijama.
          </p>
          <p class="odlomak1">
            Znamo koliko studentski život može biti izazovan, pogotovo kada je u
            pitanju upravljanje ograničenim budžetom. Kroz vlastita iskustva,
            shvatili smo koliko je važno znati gdje odlazi svaki euro i kako
            pametno planirati troškove.
          </p>
        </div>

        <!-- img-->
        <div class="image-column">
          <img
            src="~assets/sfs.jpg"
            alt="StudentBudget"
            class="rounded-image"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="container-white">
    <div class="flex items-center justify-between">
      <!-- img-->
      <div class="image-column">
        <img src="~assets/st1.png" alt="StudentBudget" class="rounded-image1" />
      </div>

      <!-- txt -->
      <div class="text-column">
        <div class="title2">
          <p>Naša misija</p>
        </div>
        <p class="odlomak2">
          Naša misija je <span class="highlight1">jednostavna</span>: učiniti
          financijsko planiranje dostupnim, jednostavnim i razumljivim za svakog
          studenta. Bez kompliciranih funkcija, bez dosadnih grafova - samo ono
          što ti zaista treba da bi znao gdje odlazi tvoj novac i kako ga možeš
          bolje rasporediti.
        </p>
        <p class="odlomak4">
          Za dodatne <span class="highlight1">nejasnoće</span> posjeti stranicu
          Kontakt
        </p>
        <q-btn
          class="btn1"
          outline
          color="primary"
          @click="$router.push('/kontakt')"
        >
          Kontakt
        </q-btn>
      </div>
    </div>
  </div>

  <div class="container-blue">
    <div class="container">
      <div class="flex items-center justify-between">
        <!-- txt -->
        <div class="text-column">
          <div class="title"></div>
          <p class="odlomak1">
            Vjerujemo da financijska pismenost treba biti dostupna svima, a
            posebno onima koji tek ulaze u svijet samostalnog upravljanja
            novcem. Zato je StudentBudget besplatan, jednostavan za korištenje i
            bez suvišnih komplikacija. Naš tim čine mladi ljudi koji su i sami
            prošli kroz studentske financijske izazove -
            <span class="highlight">zato znamo što ti treba.</span>
          </p>
        </div>

        <!-- img-->
        <div class="image-column">
          <img src="~assets/s.jpg" alt="StudentBudget" class="rounded-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@300;400;700&display=swap");

.container-blue {
  width: 100%;
  background-color: #008eff;
}
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: auto;
  padding: 40px;
}
.title {
  font-family: "Lexend Deca", sans-serif;
  margin-bottom: 25px;
  color: white;
  font-size: 30px;
  font-weight: bold;
}
.odlomak1 {
  font-family: "Lexend Deca", sans-serif;
  font-size: 17px;
  color: white;
}
.rounded-image {
  width: 100%;
  max-width: 400px;
  border-radius: 20px;
}
.highlight {
  color: #ffffff;
  font-weight: bold;
}

.container-white {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin-top: 30px;
}
.title2 {
  font-family: "Lexend Deca", sans-serif;
  margin-bottom: 25px;
  font-size: 30px;
  font-weight: bold;
}
.odlomak2 {
  font-family: "Lexend Deca", sans-serif;
  font-size: 17px;
}
.odlomak4 {
  font-family: "Lexend Deca", sans-serif;
  font-size: 17px;
  margin-top: 10px;
}
.highlight1 {
  color: #008eff;
  font-weight: bold;
}

.text-column {
  margin-left: 30px;
  flex: 1;
  text-align: left;
}
.image-column {
  flex: 1;
  display: flex;
  justify-content: center;
}

.rounded-image1 {
  width: 100%;
  max-width: 450px;
  border-radius: 30px;
}

.btn1 {
  font-family: "Lexend Deca", sans-serif;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  text-transform: none;
  margin-top: 10px;
}

.odlomak5 {
  font-family: "Lexend Deca", sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: white;
  text-align: center;
  width: 50%;
}
</style>

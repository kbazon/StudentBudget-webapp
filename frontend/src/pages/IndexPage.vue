<template>
  <div>
    <div class="image-container">
      <img src="~assets\pic2.jpg" alt="Image" />
      <div class="overlay-text">
        <p>Pametno upravljaj svojim <span class="highlight">budžetom</span>!</p>
        <q-btn
          class="btn-custom"
          label="Isprobaj StudentBudget!"
          to="/prijava"
        />
      </div>
    </div>

    <div class="citat">
      <p>
        "<span class="highlight">StudentBudget</span> - jednostavno upravljanje
        novcem za <span class="highlight">financijsku stabilnost</span>."
      </p>
      <p class="citat2">
        Tvoj partner u upravljanju financijama, pomaže ti da ostaneš na pravom
        putu prema <br />
        financijskoj stabilnosti, bez obzira na izazove studentskog života.
      </p>
    </div>
  </div>

  <div class="q-pa-md features-section">
    <div class="row justify-center q-gutter-md items-center">
      <div class="col-md-3">
        <q-card class="feature-box">
          <q-icon name="payments" class="feature-icon" />
          <p class="feature-title">Prihodi i rashodi</p>
          <p class="feature-description">Unosi svoje prihode i rashode.</p>
        </q-card>
      </div>

      <div class="col-md-3">
        <q-card class="feature-box">
          <q-icon name="wallet" class="feature-icon" />
          <p class="feature-title">Budžet</p>
          <p class="feature-description">
            Postavi mjesečni budžet i prati koliko si već potrošio.
          </p>
        </q-card>
      </div>

      <div class="col-md-3">
        <q-card class="feature-box">
          <q-icon name="category" class="feature-icon" />
          <p class="feature-title">Kategorije</p>
          <p class="feature-description">Automatska kategorizacija troškova.</p>
        </q-card>
      </div>

      <div class="col-md-3">
        <q-card class="feature-box">
          <q-icon name="smartphone" class="feature-icon" />
          <p class="feature-title">Mobilna dostupnost</p>
          <p class="feature-description">Prati svoje financije u pokretu.</p>
        </q-card>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="flex items-center justify-between">
      <!-- txt -->
      <div class="text-column">
        <div class="title">
          <p>Zašto koristiti StudentBudget?</p>
        </div>
        <p class="odlomak1">
          <span class="highlight1">Jednostavnost</span>: StudentBudget je
          dizajniran s ciljem da bude jednostavan za korištenje, čak i ako se
          tek počinješ baviti osobnim financijama. Sve funkcionalnosti su jasno
          prikazane i lako dostupne.
        </p>
        <p class="odlomak1">
          <span class="highlight1">Pristupačnost</span>: Bez obzira na to koliko
          novca imaš na svom računu, StudentBudget ti pomaže da se usmjereš na
          važno - upravljanje novcem na pametan način. Aplikacija ti omogućuje
          da planiraš, pratiš i optimiziraš svoje financije na svakom koraku.
        </p>
        <p class="odlomak1">
          <span class="highlight1">Praćenje u stvarnom vremenu</span>: Bilo da
          si na fakultetu, na putu kući ili u trgovini, uz StudentBudget možeš u
          svakom trenutku pratiti svoje financije i donijeti informirane odluke,
          bez obzira na to gdje se nalaziš.
        </p>
        <q-btn
          outline
          color="primary"
          label="O nama"
          class="btn1 mt-4"
          to="/onama"
        />
      </div>

      <!-- img-->
      <div class="image-column">
        <img src="~assets/pic4.jpg" alt="StudentBudget" class="rounded-image" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@300;400;700&display=swap");

.image-container {
  position: relative;
  width: 100%;
  max-width: 90%;
  margin: 30px auto 0;
  height: 200px;
  display: block;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 30px;
}

.overlay-text {
  font-family: "Lexend Deca", sans-serif;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}

.btn-custom {
  font-family: "Lexend Deca", sans-serif;
  border-radius: 30px;
  padding: 10px 20px;
  background-color: #008eff;
  color: white;
  border: none;
  font-size: 15px;
  font-weight: 500;
  text-transform: none;
  margin-top: 10px;
}

.highlight {
  color: #008eff;
}
.highlight1 {
  color: #008eff;
  font-weight: bold;
}

.citat {
  font-family: "Lexend Deca", sans-serif;
  text-align: center;
  font-size: 20px;
  margin-top: 40px;
  font-weight: bold;
}

.citat2 {
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  text-align: center;
  font-size: 15px;
  margin-top: 6px;
  margin-bottom: 80px;
}

.features-section {
  font-family: "Lexend Deca", sans-serif;
  text-align: center;
  position: relative;
  margin-left: 60px;
  margin-right: 60px;
}

.row {
  width: 90%;
  gap: 30px;
  margin-left: 50px;
  margin-bottom: 40px;
}

.feature-box {
  background: #ededed;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  padding: 40px;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

.feature-icon {
  font-size: 28px;
  color: #008eff;
  margin-bottom: 10px;
}

.feature-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.feature-description {
  font-size: 15px;
  color: #555;
}

.col-md-3 {
  flex: 1;
}
.container {
  margin-top: 50px !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}
.title {
  font-family: "Lexend Deca", sans-serif;
  margin-bottom: 25px;
  font-size: 28px;
  font-weight: bold;
}
.odlomak1 {
  font-family: "Lexend Deca", sans-serif;
  font-size: 16px;
}

.btn1 {
  font-family: "Lexend Deca", sans-serif;
  border-radius: 10px;
  font-size: 15px;
  font-weight: bold;
  text-transform: none;
  margin-top: 10px;
  margin-bottom: 50px;
}

.text-column {
  margin-left: 30px;
  flex: 1;
  text-align: left;
}
.image-column {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-right: 80px;
}

.rounded-image {
  width: 100%;
  max-width: 450px;
  border-radius: 30px;
}
</style>

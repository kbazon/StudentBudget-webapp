<template>
  <div class="container11">
    <div class="container12">
      <div class="top-bar">
        <p class="mjesec">🗓️ {{ trenutniMjesec }}</p>
        <div class="top-bar-buttons">
          <q-btn
            label="- Dodaj rashod"
            class="btn-rp"
            @click="openrashoddialog"
          />
          <q-btn
            label="+ Dodaj prihod"
            class="btn-rp"
            @click="openprihoddialog"
          />
        </div>
      </div>
    </div>

    <!-- RASHODI -->
    <q-dialog v-model="rashoddialog" persistent>
      <q-card>
        <q-card-section class="rashod">
          <h3 class="dodaj_rashod">🔴 Dodajte rashod</h3>
          <q-input
            v-model="rashodIznos"
            label="Iznos (€)"
            type="text"
            filled
            class="iznos"
          />
          <q-select
            v-model="odabranaKategorija"
            :options="kategorije"
            label="Odaberite kategoriju"
            filled
            class="kategorija"
          />
        </q-card-section>
        <q-card-actions>
          <q-btn
            class="btn1"
            label="Odustani"
            flat
            @click="rashoddialog = false"
          />
          <q-btn class="btn2" label="Spremi" @click="addRashod" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- PRIHODI -->
    <q-dialog v-model="prihoddialog" persistent>
      <q-card>
        <q-card-section>
          <h3 class="dodaj_rashod">🟢 Dodajte prihod</h3>
          <q-input v-model="prihodIznos" label="Iznos (€)" type="text" filled />
        </q-card-section>
        <q-card-actions>
          <q-btn
            class="btn1"
            label="Odustani"
            flat
            @click="prihoddialog = false"
          />
          <q-btn class="btn2" label="Spremi" @click="addPrihod" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- BUDŽET UNOS -->
    <q-dialog v-model="budzetpopup">
      <q-card>
        <q-card-section>
          <h3 class="budzet_nsalov">Unesite budžet za ovaj mjesec! ⭐</h3>
          <q-input v-model="noviBudzet" label="Budžet (€)" type="text" filled />
        </q-card-section>
        <q-card-actions>
          <q-btn
            class="btn1"
            label="Odustani"
            flat
            @click="budzetpopup = false"
          />
          <q-btn class="btn2" label="Spremi" @click="setBudget" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- DASHBOARD-info -->
    <div class="container-dash">
      <div class="row budget-row">
        <div class="budget-container">
          <h2 class="budzet">
            Budžet:
            <span class="ukupno">{{ ukupanBudzet }}€</span>
          </h2>
        </div>
        <div class="budget-container1">
          <h2 class="budzet1">
            Trošak:
            <span class="trosak">{{ trosak }}€</span>
          </h2>
        </div>
        <div class="budget-container2">
          <h2 class="budzet2">
            Preostali iznos:
            <span class="ostalo">{{ ostalibudzet }}€</span>
          </h2>
        </div>
      </div>
    </div>

    <div class="container13">
      <!-- NOTIF BUDŽET -->
      <div v-if="budzetnotif">
        <p class="poruka">Postavite budžet za ovaj mjesec!</p>
        <q-btn label="Postavi budžet" class="btn" @click="openbudzetpopup" />
      </div>

      <!-- ODJAVA -->
      <q-btn
        label="Odjava"
        outline
        color="black"
        class="odjava"
        unelevated
        @click="logout"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      trosak: 0,
      ostalibudzet: 0,
      ukupanBudzet: 0,
      budzetpopup: false,
      noviBudzet: "",
      budzetnotif: false,
      rashoddialog: false,
      rashodIznos: "",
      prihoddialog: false,
      prihodIznos: "",
      odabranaKategorija: "",
      kategorije: ["Hrana", "Zabava", "Prijevoz", "Stranarina"],
      mjeseci: [
        "Siječanj",
        "Veljača",
        "Ožujak",
        "Travanj",
        "Svibanj",
        "Lipanj",
        "Srpanj",
        "Kolovoz",
        "Rujan",
        "Listopad",
        "Studeni",
        "Prosinac",
      ],
      userId: null, //  prazan, postavlja se u `mounted()`
    };
  },
  // trenutni mj
  computed: {
    trenutniMjesec() {
      const today = new Date();
      return this.mjeseci[today.getMonth()];
    },
  },
  mounted() {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      this.$router.push("/prijava"); // ako korisnik nije prijavljen ide na login
    } else {
      this.userId = userId;
      this.fetchBudget(userId); // budžet za prijavljenog korisnika
    }
  },

  methods: {
    async fetchBudget(userId) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/budget/${userId}`
        );

        this.ostalibudzet = response.data.ostalibudzet;
        this.ukupanBudzet = response.data.ukupanBudzet;
        this.trosak = response.data.ukupniRashod;

        // korisnik nema budžet ili je 0-->notif
        this.budzetnotif = !this.ukupanBudzet || this.ukupanBudzet <= 0;
      } catch (error) {
        console.error("Greška kod dohvaćanja budžeta:", error);
      }
    },

    async setBudget() {
      if (!this.noviBudzet || this.noviBudzet <= 0) {
        alert("Unesite budžet!");
        return;
      }
      try {
        await axios.post("http://localhost:3000/api/set-budget", {
          userId: this.userId,
          iznos: this.noviBudzet,
        });

        this.budzetpopup = false;
        this.budzetnotif = false;
        this.fetchBudget(this.userId); // Osvježavanje podataka
      } catch (error) {
        console.error("Greška kod postavljanja budžeta:", error);
      }
    },
    openbudzetpopup() {
      this.budzetpopup = true;
    },

    async addRashod() {
      if (!this.rashodIznos || !this.odabranaKategorija) {
        alert("Molimo unesite iznos i odaberite kategoriju!");
        return;
      }
      try {
        await axios.post("http://localhost:3000/api/add-rashod", {
          userId: this.userId,
          kategorija: this.odabranaKategorija,
          iznos: this.rashodIznos,
        });

        // osvježavanje podataka
        this.fetchBudget(this.userId); // osvježavam preostali iznos

        this.rashoddialog = false; // zatvori dialog
        this.rashodIznos = ""; // očisti iznos
        this.odabranaKategorija = ""; // očisti kategoriju
      } catch (error) {
        console.error("Greška kod dodavanja rashoda:", error);
      }
    },
    openrashoddialog() {
      this.rashoddialog = true;
    },

    async addPrihod() {
      if (!this.prihodIznos) {
        alert("Molimo unesite iznos i odaberite kategoriju!");
        return;
      }
      try {
        await axios.post("http://localhost:3000/api/add-prihod", {
          userId: this.userId,
          iznos: this.prihodIznos,
        });

        // osvježavanje podataka
        this.prihoddialog = false; // zatvori dialog
        this.prihodIznos = ""; // očisti iznos
      } catch (error) {
        console.error("Greška kod dodavanja prihoda:", error);
      }
    },
    openprihoddialog() {
      this.prihoddialog = true;
    },
    logout() {
      localStorage.removeItem("userId");
      this.$router.push("/prijava");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@300;400;700&display=swap");

.container11 {
  margin: 30px;
  padding: 30px;
}
.container12 {
  margin-bottom: 20px;
}
.container13 {
  margin-top: 20px;
}
.mjesec {
  color: #000000;
  font-family: "Lexend Deca", sans-serif;
  font-size: 30px;
  font-weight: bold;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.top-bar-buttons {
  display: flex;
  gap: 20px;
}
.btn-rp {
  font-size: 15px;
  border-radius: 20px;
  font-family: "Lexend Deca", sans-serif;
  text-transform: none;
  font-weight: 700;
  background-color: #008eff;
  color: #ffffff;
}

.container-dash {
  font-family: "Lexend Deca", sans-serif;
  background-color: #dbdbdb;
  border-radius: 20px;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 40px;
}
.budget-row {
  gap: 30px;
  justify-content: center;
}
.budget-container {
  width: 100%;
  box-shadow: 0px 4px 5px #008eff;
  max-width: 250px;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 15px;
  text-align: center;
}
.budzet {
  color: #000000;
  font-size: 27px;
  font-weight: bold !important;
}
.ukupno {
  color: #008eff;
  font-weight: bold;
}

.budget-container1 {
  width: 100%;
  max-width: 250px;
  box-shadow: 0px 4px 5px #000000;
  background-color: #008eff;
  padding: 10px;
  border-radius: 15px;
  text-align: center;
}
.budzet1 {
  font-size: 27px;
  color: #ffffff;
  font-weight: bold !important;
}
.trosak {
  color: #000000;
  font-weight: bold;
}

.budget-container2 {
  width: 100%;
  max-width: 400px;
  box-shadow: 0px 4px 5px #008eff;
  background-color: #000000;
  padding: 10px;
  border-radius: 15px;
  text-align: center;
}
.budzet2 {
  font-size: 27px;
  color: #ffffff;
  font-weight: bold !important;
}
.ostalo {
  color: #008eff;
  font-weight: bold;
}
.content {
  align-items: left;
  gap: 50px;
}
.poruka {
  font-family: "Lexend Deca", sans-serif;
  font-size: 18px;
  font-weight: 600;
}
.btn {
  border-radius: 20px;
  font-size: 15px;
  font-family: "Lexend Deca", sans-serif;
  text-transform: none;
  font-weight: 700;
  background-color: #d80000;
  color: #ffffff;
}
.odjava {
  margin-top: 20px;
  font-family: "Lexend Deca", sans-serif;
  border-radius: 10px;
  border-width: 4px;
  font-size: 17px;
  font-weight: bold;
  text-transform: none;
}

.rashod,
.q-dialog,
.q-card,
.q-card-actions {
  font-family: "Lexend Deca", sans-serif;
  font-size: 18px;
  padding: 10px;
  max-width: 500px;
  width: 100%;
}
.dodaj_rashod {
  font-size: 30px;
  color: black;
  font-weight: bold;
}
.budzet_nsalov {
  font-size: 30px;
  color: black;
  font-weight: bold;
}
.btn1 {
  border-radius: 20px;
  padding: 5px 16px;
  font-family: "Lexend Deca", sans-serif;
  text-transform: none;
  font-weight: 700;
  background-color: #000000;
  color: #ffffff;
  margin-bottom: 10px;
}
.btn2 {
  border-radius: 20px;
  padding: 5px 16px;
  font-family: "Lexend Deca", sans-serif;
  text-transform: none;
  font-weight: 700;
  background-color: #008eff;
  color: #ffffff;
  margin-bottom: 10px;
}
</style>

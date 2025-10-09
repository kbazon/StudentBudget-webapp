<template>
  <q-page class="flex flex-center">
    <div class="auth-container">
      <!-- prijava -->
      <div v-if="isLogin" class="login-container">
        <h2 class="prijava">Prijava</h2>
        <q-input v-model="email" label="Email" filled class="input-field" />
        <q-input
          v-model="lozinka"
          label="Lozinka"
          type="password"
          filled
          class="input-field"
        />
        <q-btn label="Prijavi se" @click="loginUser" class="auth-btn" />
        <p v-if="errorMsg">{{ errorMsg }}</p>
        <p class="toggle-link" @click="isLogin = false">
          Nemate račun? <span class="reg">Registrirajte se</span>
        </p>
      </div>

      <!-- registracija -->
      <div v-else class="register-container">
        <h2 class="prijava">Registracija</h2>
        <q-input
          v-model="korisnickoIme"
          label="Korisničko ime"
          filled
          class="input-field"
        />
        <q-input v-model="email" label="Email" filled class="input-field" />
        <q-input
          v-model="lozinka"
          label="Lozinka"
          type="password"
          filled
          class="input-field"
        />
        <q-btn label="Registriraj se" @click="registerUser" class="auth-btn" />
        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
        <p class="toggle-link" @click="isLogin = true">
          Već imate račun? <span class="reg">Prijavite se</span>
        </p>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isLogin: true, // prijava- početni prikaz
      email: "",
      lozinka: "",
      korisnickoIme: "",
      errorMsg: "",
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post("http://localhost:3000/api/login", {
          email: this.email,
          lozinka: this.lozinka,
        });

        localStorage.setItem("userId", response.data.userId);
        this.$router.push("/dash");
      } catch (error) {
        this.errorMsg = "Neispravni podaci za prijavu.";
      }
    },
    async registerUser() {
      if (!this.korisnickoIme || !this.email || !this.lozinka) {
        this.errorMsg = "Sva polja su obavezna.";
        return;
      }

      try {
        await axios.post("http://localhost:3000/api/register", {
          korisnickoIme: this.korisnickoIme,
          email: this.email,
          lozinka: this.lozinka,
        });

        alert("Registracija uspješna! Sada se možete prijaviti.");

        this.isLogin = true; // prebacujemo korisnika na prijavu
        this.errorMsg = "";
      } catch (error) {
        this.errorMsg = "Greška kod registracije.";
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@300;400;700&display=swap");

.auth-container {
  font-family: "Lexend Deca", sans-serif;
  width: 100%;
  max-width: 400px;
  text-align: center;
  padding: 20px;
  margin-bottom: 190px;
}
.prijava {
  font-size: 30px;
  font-weight: bolder;
  margin-bottom: 15px;
  color: #000000;
}
.input-field {
  width: 100%;
  margin-bottom: 10px;
}
.auth-btn {
  font-size: 15px;
  width: 40%;
  border-radius: 30px;
  text-transform: none;
  margin-top: 10px;
  color: white;
  background-color: #008eff;
}
.error {
  color: red;
  margin-top: 10px;
}
.toggle-link {
  font-size: 16px;
  color: #000000;
  cursor: pointer;
  margin-top: 20px;
}
.reg {
  color: #008eff;
}
</style>

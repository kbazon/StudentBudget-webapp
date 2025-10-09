<template>
  <q-page class="page">
    <div class="q-pa-md">
      <h1 class="H1">Kontaktiraj nas</h1>
      <p class="problem">
        Imaš pitanje, prijedlog ili želiš podijeliti svoje iskustvo s
        aplikacijom StudentBudget? <br />Javi nam se putem forme ispod ili na
        naše kontakt podatke -
        <span class="highlight">odgovorit ćemo ti što prije!</span>
      </p>
    </div>
    <div class="q-pa-md">
      <q-input v-model="userEmail" label="Korisnik" class="input" />
      <div>
        <q-input
          v-model="message"
          label="Poruka"
          type="textarea"
          class="input2"
        />
      </div>
    </div>
    <div class="button">
      <q-btn label="Pošalji" @click="sendEmail" class="b2" />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const userEmail = ref("");
const message = ref("");

const sendEmail = async () => {
  try {
    await axios.post("http://localhost:3000/send-email", {
      email: userEmail.value,
      message: message.value,
    });
    alert("Poruka je poslana!");
  } catch (error) {
    console.error("Greška pri slanju poruke", error);
    alert("Nismo uspijeli poslati poruku.");
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@300;400;700&display=swap");

.page {
  font-family: "Lexend Deca", sans-serif;
  background-color: #008eff;
}
.H1 {
  font-weight: bold;
  font-size: 30px;
  margin-top: 0px;
  margin-bottom: 5px;
  margin-left: 10px;
  color: white;
}
.highlight {
  color: #ffffff;
  font-weight: bold;
}
.problem {
  font-size: 17px;
  margin-left: 10px;
  color: white;
}
.q-pa-md {
  font-weight: 400;
  margin-left: 20px;
  margin-right: 20px;
  padding-inline: 10px;
}
.input {
  background-color: rgb(255, 255, 255);
  border-radius: 15px;
  padding-left: 10px;
}
.input2 {
  background-color: rgb(255, 255, 255);
  border-radius: 15px;
  margin-top: 20px;
  padding-left: 10px;
}

.button {
  margin-top: 30px;
  margin-left: 40px;
}
.b2 {
  border-radius: 30px;
  text-transform: none;
  font-weight: 600;
  font-size: 16px;
  color: rgb(255, 255, 255);
  background-color: #000000;
}
</style>

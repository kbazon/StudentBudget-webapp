<template>
  <q-page class="q-pa-md">
    <h2 class="h1">💵 Transakcije</h2>
    <div class="container-trans">
      <h3>✚ Prihodi</h3>

      <!-- PRIHDODI -->
      <q-card class="q-mb-md">
        <q-card-section>
          <q-markup-table bordered flat>
            <thead>
              <tr>
                <th class="text-left">Datum</th>
                <th class="text-left">Iznos (€)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(prihod, index) in prihodi" :key="index">
                <td class="text-left">
                  {{ new Date(prihod.datum).toLocaleDateString() }}
                </td>
                <td class="text-left">{{ prihod.iznos }}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card-section>
      </q-card>

      <!-- RASHODI -->
      <h3>— Rashodi</h3>
      <q-card>
        <q-card-section>
          <q-markup-table bordered flat>
            <thead>
              <tr>
                <th class="text-left">Datum</th>
                <th class="text-left">Kategorija</th>
                <th class="text-left">Iznos (€)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(rashod, index) in rashodi" :key="index">
                <td class="text-left">
                  {{ new Date(rashod.datum).toLocaleDateString() }}
                </td>
                <td class="text-left">{{ rashod.kategorija }}</td>
                <td class="text-left">{{ rashod.iznos }}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      prihodi: [],
      rashodi: [],
      userId: null,
    };
  },
  async mounted() {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      this.$router.push("/prijava");
      return;
    }

    this.userId = userId;
    await this.fetchTransactions();
  },
  methods: {
    async fetchTransactions() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/transactions/user/${this.userId}`
        );

        this.prihodi = response.data.prihodi;
        this.rashodi = response.data.rashodi;
      } catch (error) {
        console.error("Greška kod dohvata transakcija:", error);
      }
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@300;400;700&display=swap");

.container-trans {
  background-color: #008eff;
  font-family: "Lexend Deca", sans-serif;
  border-radius: 20px;
  padding: 30px 50px;
}
.h1 {
  font-family: "Lexend Deca", sans-serif;
  font-size: 30px;
  color: black;
  font-weight: bold;
}
h2 {
  font-family: "Lexend Deca", sans-serif;
  font-size: 30px;
  color: white;
  font-weight: bold;
}
h3 {
  color: white;
  font-family: "Lexend Deca", sans-serif;
  font-size: 20px;
  font-weight: bold;
}
.q-card {
  border-radius: 15px;
  padding: 10px;
}
.q-markup-table th {
  font-size: 17px !important;
  font-weight: bold;
  font-family: "Lexend Deca", sans-serif;
}
.q-markup-table td {
  font-size: 17px !important;
  font-family: "Lexend Deca", sans-serif;
}
</style>

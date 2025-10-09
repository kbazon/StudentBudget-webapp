<template>
  <q-layout view="lHh Lpr lFf" class="custom-page-background">
    <q-header>
      <q-toolbar class="custom-toolbar">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          color="black"
        />
        <q-toolbar-title class="custom-toolbar-title">
          <router-link to="/">
            <img
              class="SB"
              alt="StudenBudget logo"
              src="~assets/Untitled-6.png"
              to="/"
            />
          </router-link>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above class="custom-drawer">
      <q-list>
        <q-item
          to="/"
          clickable
          class="menu-item"
          exact-active-class="active-item"
        >
          <q-item-section avatar>
            <q-icon name="home" class="menu-icon" />
          </q-item-section>
          <q-item-section class="menu-title">Naslovnica</q-item-section>
        </q-item>

        <q-item
          to="/dash"
          clickable
          class="menu-item"
          active-class="active-item"
        >
          <q-item-section avatar>
            <q-icon name="dashboard" class="menu-icon" />
          </q-item-section>
          <q-item-section class="menu-title">Nadzorna ploča</q-item-section>
        </q-item>

        <q-item
          to="/trans"
          clickable
          class="menu-item"
          active-class="active-item"
        >
          <q-item-section avatar>
            <q-icon name="payments" class="menu-icon" />
          </q-item-section>
          <q-item-section class="menu-title">Transakcije</q-item-section>
        </q-item>

        <q-item
          to="/onama"
          clickable
          class="menu-item"
          active-class="active-item"
        >
          <q-item-section avatar>
            <q-icon name="group" class="menu-icon" />
          </q-item-section>
          <q-item-section class="menu-title">O nama</q-item-section>
        </q-item>

        <q-item
          to="/kontakt"
          clickable
          class="menu-item"
          active-class="active-item"
        >
          <q-item-section avatar>
            <q-icon name="mail" class="menu-icon" />
          </q-item-section>
          <q-item-section class="menu-title">Kontakt</q-item-section>
        </q-item>

        <q-item
          to="/prijava"
          clickable
          class="menu-item"
          active-class="active-item"
        >
          <q-item-section avatar>
            <q-icon name="login" class="menu-icon" />
          </q-item-section>
          <q-item-section class="menu-title"
            >Prijava/Registracija</q-item-section
          >
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

defineOptions({
  name: "MainLayout",
});

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@300;400;700&display=swap");
.custom-toolbar-title {
  font-family: "Lexend Deca", sans-serif;
  user-select: none;
}

.custom-page-background {
  background-color: #ffffff;
  user-select: none;
}
.SB {
  margin-top: 10px;
  width: 100%;
  height: auto;
  max-width: 250px;
}

.black-icon {
  color: black !important;
  margin-right: 20px;
  font-size: 30px !important;
}

.custom-toolbar {
  height: 100px;
  background-color: #ffffff;
  user-select: none;
}

.menu-item {
  font-family: "Lexend Deca", sans-serif;
  margin-top: 30px;
  margin-bottom: -20px;
  padding: 10px 50px;
  user-select: none;
}

.menu-title {
  font-size: 18px;
  color: #000000;
}

.menu-icon {
  color: #000000 !important;
  font-size: 26px;
}
.active-item .menu-icon {
  color: #008eff !important;
}
</style>

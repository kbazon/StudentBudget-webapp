-- Kreiranje baze ako ne postoji
CREATE DATABASE IF NOT EXISTS studentbudget 
  DEFAULT CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE studentbudget;

-- KORISNICI
CREATE TABLE IF NOT EXISTS korisnici (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ime VARCHAR(50) NOT NULL,
    prezime VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    lozinka VARCHAR(255) NOT NULL,
    datum_registracije TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BUDZETI
CREATE TABLE IF NOT EXISTS budzeti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    korisnik_id INT NOT NULL,
    naziv VARCHAR(100) NOT NULL,
    iznos DECIMAL(10,2) NOT NULL,
    datum_postavljanja TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (korisnik_id) REFERENCES korisnici(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- PRIHODI
CREATE TABLE IF NOT EXISTS prihodi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    korisnik_id INT NOT NULL,
    iznos DECIMAL(10,2) NOT NULL,
    opis VARCHAR(255),
    datum DATE NOT NULL,
    FOREIGN KEY (korisnik_id) REFERENCES korisnici(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- RASHODI
CREATE TABLE IF NOT EXISTS rashodi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    korisnik_id INT NOT NULL,
    iznos DECIMAL(10,2) NOT NULL,
    opis VARCHAR(255),
    datum DATE NOT NULL,
    FOREIGN KEY (korisnik_id) REFERENCES korisnici(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- indeksi za brze pretrazivanje
CREATE INDEX idx_korisnik_budzeti ON budzeti (korisnik_id);
CREATE INDEX idx_korisnik_prihodi ON prihodi (korisnik_id);
CREATE INDEX idx_korisnik_rashodi ON rashodi (korisnik_id);

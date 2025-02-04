class TypeAbonnement {
  static Mois = new TypeAbonnement('Mois');
  static Annee = new TypeAbonnement('Année');

  constructor(name) {
    this.name = name;
  }
}

export { TypeAbonnement };

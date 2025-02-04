class Formules {
  constructor() {
    this.formules = [];
  }
  creer({ type, prixBase }) {
    this.formules.push({ type, prixBase });
  }
  recuperer() {
    return this.formules;
  }
}

export { Formules };

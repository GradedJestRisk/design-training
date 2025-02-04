import { TypeAbonnement } from './TypeAbonnement.js';
import { PrixBase } from './PrixBase.js';

class Formules {
  constructor() {
    this.formules = [];
  }
  creer({ type, prixBase }) {
    if (type === 'Mois') {
      this.formules.push({ type: TypeAbonnement.Mois, prixBase: new PrixBase(prixBase) });
    } else {
      this.formules.push({ type: TypeAbonnement.Annee, prixBase: new PrixBase(prixBase) });
    }
  }
  recuperer() {
    return this.formules;
  }
}

export { Formules };

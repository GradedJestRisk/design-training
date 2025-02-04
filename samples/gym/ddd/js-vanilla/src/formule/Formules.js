import { TypeAbonnement } from './TypeAbonnement.js';
import { PrixBase } from './PrixBase.js';
import { Reduction } from './Reduction.js';

class Formules {
  constructor() {
    this.formules = [];
  }
  creer({ type, prixBase, reduction }) {
    if (type === 'Mois') {
      this.formules.push({
        type: TypeAbonnement.Mois,
        prixBase: new PrixBase(prixBase),
        reduction: new Reduction(0),
      });
    } else {
      this.formules.push({
        type: TypeAbonnement.Annee,
        prixBase: new PrixBase(prixBase),
        reduction: new Reduction(10),
      });
    }
  }
  recuperer() {
    return this.formules;
  }
}

export { Formules };

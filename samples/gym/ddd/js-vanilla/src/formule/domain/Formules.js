import { TypeAbonnement } from './TypeAbonnement.js';
import { PrixBase } from './PrixBase.js';
import { Reduction } from './Reduction.js';
import { randomUUID } from 'crypto';

const REDUCTION_ANNEE = 10;
const REDUCTION_ETUDIANT = 20;

class Formules {
  constructor() {
    this.formules = [];
  }
  creer({ type, prixBase, prospectEstEtudiant = false }) {
    const reductionProspect = prospectEstEtudiant ? REDUCTION_ETUDIANT : 0;
    const id = randomUUID();
    if (type === 'Mois') {
      this.formules.push({
        id,
        type: TypeAbonnement.Mois,
        prixBase: new PrixBase(prixBase),
        reduction: new Reduction(reductionProspect),
      });
    } else {
      this.formules.push({
        id,
        type: TypeAbonnement.Annee,
        prixBase: new PrixBase(prixBase),
        reduction: new Reduction(reductionProspect + REDUCTION_ANNEE),
      });
    }
  }
  recuperer() {
    return this.formules;
  }
}

export { Formules };

import { expect } from 'chai';
import { Formules } from '../../src/formule/Formules.js';
import { TypeAbonnement } from '../../src/formule/TypeAbonnement.js';
import { PrixBase } from '../../src/formule/PrixBase.js';
import { Reduction } from '../../src/formule/Reduction.js';

describe('Unitaire - Formules', function () {
  describe('le gérant peut créer des formules', function () {
    context('au mois', function () {
      it('doit créer la formule, sans réduction', function () {
        // given
        const formules = new Formules();

        // when
        formules.creer({ type: 'Mois', prixBase: 10 });

        // then
        const actual = formules.recuperer()[0];
        expect(actual).to.deep.equal({
          type: TypeAbonnement.Mois,
          prixBase: new PrixBase(10),
          reduction: new Reduction(0),
        });
      });
    });
    context("à l'année", function () {
      it('doit créer la formule, avec une réduction de 10 pourcent', function () {
        // given
        const formules = new Formules();

        // when
        formules.creer({ type: 'Année', prixBase: 20 });

        // then
        const actual = formules.recuperer()[0];
        expect(actual).to.deep.equal({
          type: TypeAbonnement.Annee,
          prixBase: new PrixBase(20),
          reduction: new Reduction(10),
        });
      });
    });
  });
});

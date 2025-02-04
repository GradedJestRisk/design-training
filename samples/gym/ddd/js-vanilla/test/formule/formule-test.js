import { expect } from 'chai';
import { Formules } from '../../src/formule/Formules.js';

describe('Unitaire - formule', function () {
  describe('Le gérant peut créer des formules', function () {
    // Le gérant peut créer des formules au mois ou à l’année, avec un prix de base
    context('Au mois, avec un prix de base', function () {
      it('should succeed', function () {
        // given
        const formules = new Formules();

        // when
        formules.creer({ type: 'MOIS', prixBase: 10 });

        // then
        const actual = formules.recuperer()[0];
        expect(actual).to.deep.equal({ type: 'MOIS', prixBase: 10 });
      });
    });
    // Les abonnements d’un an bénéficient de 10% de réduction
    context("A l'année", function () {
      it('should succeed', function () {
        // given
        const formules = new Formules();

        // when
        formules.creer({ type: 'ANNEE', prixBase: 20 });

        // then
        const actual = formules.recuperer()[0];
        expect(actual).to.deep.equal({ type: 'ANNEE', prixBase: 20 });
      });
    });
  });
});

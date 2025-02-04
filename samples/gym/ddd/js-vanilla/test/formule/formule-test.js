import { expect } from 'chai';
import { Formules } from '../../src/formule/Formules.js';
import { TypeAbonnement } from '../../src/formule/TypeAbonnement.js';
import { PrixBase } from '../../src/formule/PrixBase.js';

describe('Unitaire - Formules', function () {
  describe('le gérant peut créer des formules', function () {
    context('au mois', function () {
      it('doit créer la formule', function () {
        // given
        const formules = new Formules();

        // when
        formules.creer({ type: 'Mois', prixBase: 10 });

        // then
        const actual = formules.recuperer()[0];
        expect(actual).to.deep.equal({ type: TypeAbonnement.Mois, prixBase: new PrixBase(10) });
      });
    });
    context("à l'année", function () {
      it('doit créer la formule', function () {
        // given
        const formules = new Formules();

        // when
        formules.creer({ type: 'Année', prixBase: 20 });

        // then
        const actual = formules.recuperer()[0];
        expect(actual).to.deep.equal({ type: TypeAbonnement.Annee, prixBase: new PrixBase(20) });
      });
    });
  });
});

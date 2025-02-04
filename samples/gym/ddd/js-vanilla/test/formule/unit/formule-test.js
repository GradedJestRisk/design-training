import * as chai from 'chai';
// eslint-disable-next-line node/no-unpublished-import
import chaiExclude from 'chai-exclude';
chai.use(chaiExclude);

import { expect } from 'chai';

import { Formules } from '../../../src/formule/domain/Formules.js';
import { TypeAbonnement } from '../../../src/formule/domain/TypeAbonnement.js';
import { PrixBase } from '../../../src/formule/domain/PrixBase.js';
import { Reduction } from '../../../src/formule/domain/Reduction.js';
describe('Unitaire - Formules', function () {
  describe('le gérant peut créer des formules', function () {
    context('pour les employés', function () {
      context('au mois', function () {
        it('doit créer la formule, sans réduction', function () {
          // given
          const formules = new Formules();

          // when
          formules.creer({ type: 'Mois', prixBase: 10 });

          // then
          const actual = formules.recuperer()[0];
          expect(actual.id).to.not.be.undefined;
          expect(actual.type).to.deep.equal(TypeAbonnement.Mois);
          expect(actual.prixBase).to.deep.equal(new PrixBase(10));
          expect(actual.reduction).to.deep.equal(new Reduction(0));
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
          expect(actual)
            .excluding('id')
            .to.deep.equal({
              type: TypeAbonnement.Annee,
              prixBase: new PrixBase(20),
              reduction: new Reduction(10),
            });
        });
      });
    });
    context('pour les étudiants', function () {
      context('au mois', function () {
        it('doit créer la formule, avec une réduction de 20 pourcent', function () {
          // given
          const prospectEstEtudiant = true;

          // when
          const formules = new Formules();
          formules.creer({ type: 'Mois', prixBase: 10, prospectEstEtudiant });

          // then
          const actual = formules.recuperer()[0];
          expect(actual)
            .excluding('id')
            .to.deep.equal({
              type: TypeAbonnement.Mois,
              prixBase: new PrixBase(10),
              reduction: new Reduction(20),
            });
        });
      });
      context("à l'année", function () {
        it('doit créer la formule, avec une réduction de 30 pourcent', function () {
          // given
          const prospectEstEtudiant = true;

          // when
          const formules = new Formules();
          formules.creer({ type: 'Année', prixBase: 10, prospectEstEtudiant });

          // then
          const actual = formules.recuperer()[0];
          expect(actual)
            .excluding('id')
            .to.deep.equal({
              type: TypeAbonnement.Annee,
              prixBase: new PrixBase(10),
              reduction: new Reduction(30),
            });
        });
      });
    });
  });
});

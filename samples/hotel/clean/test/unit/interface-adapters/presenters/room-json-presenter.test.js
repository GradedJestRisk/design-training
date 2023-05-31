import { expect } from 'chai';
import { roomJsonPresenter } from '../../../../source/interface-adapters/presenters/room-json-presenter.js';

describe('Unit | Presenters | room-json-presenter', function () {
  describe('#execute', function () {
    context('when a single room is passed', function () {
      it('should store room in stringified JSON', function () {
        // given
        const presenter = new roomJsonPresenter();
        const rooms = [{ number: 1, floor: 0, rate: 100 }];

        // when
        presenter.execute(rooms);

        // then
        expect(presenter.rooms).to.deep.equal('{"rooms":[{"number":1,"floor":0,"rate":100}]}');
      });
    });
    context('when several room are passed', function () {
      it('should store rooms in stringified JSON', function () {
        // given
        const presenter = new roomJsonPresenter();
        const rooms = [
          { number: 1, floor: 0, rate: 100 },
          { number: 2, floor: 0, rate: 100 },
        ];

        // when
        presenter.execute(rooms);

        // then
        expect(presenter.rooms).to.deep.equal(
          '{"rooms":[{"number":1,"floor":0,"rate":100},{"number":2,"floor":0,"rate":100}]}'
        );
      });
    });
  });
  describe('#get', function () {
    context('when a single room is stored', function () {
      it('should return it', function () {
        // given
        const presenter = new roomJsonPresenter();
        const rooms = [{ number: 1, floor: 0, rate: 100 }];
        presenter.execute(rooms);

        // when
        const actual = presenter.get();

        // then
        expect(actual).to.deep.equal('{"rooms":[{"number":1,"floor":0,"rate":100}]}');
      });
    });
  });
});

import { test } from 'qunit';
import moduleForAcceptance from 'rarwe/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | artists');

test('List artists', function(assert) {
    visit('/artists');

    andThen(function() {
        assert.equal(find('.artist-link').length, 2, 'All band links are rendered');
        assert.equal(find('.artist-link:contains("Radiohead")').length, 1, 'First band link contains the band name');
        assert.equal(find('.artist-link:contains("Long Distance Calling")').length, 1, 'The other band link contains the band name');
    });
});
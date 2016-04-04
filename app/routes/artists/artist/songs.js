import Ember from 'ember';
import { capitalize as capitalizeWords } from '../../../helpers/capitalize';

export default Ember.Route.extend({
    model: function() {
        return this.modelFor('artists.artist');
        // return Ember.RSVP.reject(this.modelFor('artists.artist'));
    },

    resetController: function(controller) {
        controller.set('songCreationStarted', false);
    },

    actions: {
        didTransition: function() {
            var artist = this.modelFor('artists.artist');
            var name = capitalizeWords(artist.get('name'));
            document.title = `${name} songs - Rock & Roll`;
        },

        createSong: function() {
            var controller = this.get('controller');
            var artist = this.modelFor('artists.artist');
            var title = controller.get('title');

            var song = this.store.createRecord('song', {
                title: title,
                band: artist
            });
            song.save().then(function() {
                controller.set('title', '');
            });
        },

        save: function() {
            var controller = this.get('controller'),
                song = controller.get('model');

            return song.save();
        }
    }
});
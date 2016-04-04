import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return this.modelFor('artists.artist');
    },

    actions: {

        delete: function() {
            var controller = this.get('controller'),
                artist = controller.get('model'),
                deleteArtist;

            deleteArtist = window.confirm(`Are you sure you want to delete ${artist.get('name')}?`);
            if (deleteArtist) {
                    artist.destroyRecord();
                    this.transitionTo('artists');
            }
        },

        save: function() {
            var controller = this.get('controller'),
                artist = controller.get('model');

            return artist.save();
        },
        willTransition: function(transition) {
            var controller = this.get('controller'),
                leave;

            if (controller.get('isEditing')) {
                leave = window.confirm('You have unsaved changes. Are you sure you want to leave?');
                if (leave) {
                    controller.set('isEditing', false);
                } else {
                    transition.abort();
                }
            }
        },
        didTransition: function() {
            var artist = this.modelFor('artists.artist');
            document.title = `${artist.get('name')} Details | EDM`;
        }
    }
});
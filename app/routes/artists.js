import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return this.store.findAll('band');
    },

    afterModel: function(model) {
        var artists = model;

        if (artists.length === 1) {
            this.transitionTo('artists.artist', artists.get('firstObject'));
        }
    },

    actions: {
        didTransition: function() {
            document.title = 'Artists - Electronic Dance Music';
        },
        createArtist: function() {
            var route = this,
                controller = this.get('controller');

            var artist = this.store.createRecord('band', controller.getProperties('name'));
            artist.save().then(function() {
                controller.set('name', '');
                route.transitionTo('artists.artist.songs', artist);
            });
        }
    }
});
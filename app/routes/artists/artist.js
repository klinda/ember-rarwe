import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        return this.store.findRecord('band', params.id);
    },

    afterModel: function(artist) {
        var description = artist.get('description'),
            genres = artist.get('genres');

        if (Ember.isEmpty(description) && (Ember.isEmpty(genres))) {
            this.transitionTo('artists.artist.songs');
        } else {
            this.transitionTo('artists.artist.details');
        }
    }
});
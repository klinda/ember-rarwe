import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
    this.route('artists', function() {
        this.route('artist', { path: ':id' }, function() {
            this.route('songs');
            this.route('details');
        });
    });
});

export default Router;
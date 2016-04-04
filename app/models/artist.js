import DS from 'ember-data';

export default DS.Model.extend({

    description: DS.attr(),

    genres: DS.attr(),

    name: DS.attr('string'),

    songs: DS.hasMany('song')
});
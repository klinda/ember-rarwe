import Ember from 'ember';
import { capitalize } from '../../../helpers/capitalize';

export default Ember.Controller.extend({

    title: '',

     isAddButtonDisabled: Ember.computed('title', function() {
         return Ember.isEmpty(this.get('title'));
     }),

     isEditing: false,

     noSongs: Ember.computed('model.songs.length', function() {
         return this.get('model.songs.length') === 0;
     }),

     searchTerm: '',

     matchingSongs: Ember.computed('model.songs.@each.title', 'searchTerm', function() {
         var searchTerm = this.get('searchTerm').toLowerCase();
         return this.get('model.songs').filter(function(song) {
             return song.get('title').toLowerCase().indexOf(searchTerm) !== -1;
         });
     }),

     songCreationStarted: false,

     queryParams: {
         sortBy: 'sort',
         searchTerm: 's'
     },

     sortBy: 'ratingDesc',

     sortProperties: Ember.computed('sortBy', function() {
         var options = {
             'ratingDesc': 'rating:desc,title:asc',
             'ratingAsc': 'rating:asc,title:asc',
             'titleDesc': 'title:desc',
             'titleAsc': 'title:asc'
         };
         return options[this.get('sortBy')].split(',');
     }),

     sortedSongs: Ember.computed.sort('matchingSongs', 'sortProperties'),

     canCreateSong: Ember.computed('songCreationStarted', 'model.songs.length', function() {
         return this.get('songCreationStarted') || this.get('model.songs.length');
     }),

     newSongPlaceholder: Ember.computed('model.name', function() {
         var artistName = this.get('model.name');
         return `New ${capitalize(artistName)} song`;
     }),

     actions: {

        enableSongCreation: function() {
             this.set('songCreationStarted', true);
         },

        save: function() {
            this.set('isEditing', false);
            return true;
        },

        updateRating: function(params) {
             var song = params.item,
                 rating = params.rating;

             if (song.get('rating') === rating) {
                 rating = 0;
             }

             song.set('rating', rating);
             song.save();
         }
     }
});
export default function() {
    this.transition(
        this.fromRoute('artists.artist.songs'),
        this.toRoute('artists.artist.details'),
        this.use('toRight'),
        this.reverse('toLeft')
    );

    this.transition(
        this.hasClass('artist-description'),
        this.toValue(false),
        this.use('fade', { duration: 500 })
    );
}
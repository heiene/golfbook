var mongoose    = require('mongoose');

// Tror jeg må hente inn user model her, får ikke feilmelding om jeg ikke gjør det
// men skjønner ikke hvordan den ellers kan vite hva "ref" er.  Å bruke sånn ref er vist 
// måten å gjøre det på ifølge mongoose doc: http://mongoosejs.com/docs/populate.html

// Tenkte også å lage en GolfCourse Model som man kan lage referanse til

var User 		= require('./user');
var GolfCourse 	= require('./course');
var Schema      = mongoose.Schema;


var golfRoundSchema  = new Schema({
	user_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
            required: true},
    course_id: 	{
        type: Schema.Types.ObjectId,
        ref: 'GolfCourse',
        required: true},
	hole_score: [{
        number:     Number,
        strokes:    Number,
        puts:       Number,
        chips:      Number,
        sand:       Number,
        water:      Number,
        ob:         Number }]
})


module.exports = mongoose.model('GolfRound', golfRoundSchema);

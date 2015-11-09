/**
 * Created by David on 11/2/2015.
 */
var $gameContainer = $( '#game-container' );
var $factoryEntity = $( '<div />',
    {
      class: 'factory_entity',
      html: 'Factory'
    } );
/**Note to whoever ends up writing code to link to the UI, I can leave these
 * as divs where you can replace all the text with something like "Funds "+ object.funds;"
 * or I could add a span so you would just have to set the value of the span inside of
 * these divs**/
var $quarterYear = '<div>Quarter 1 / Year 0 [00]</div>';
var $funds = '<div>Funds $000000 - 0000 / Quarter</div>';
var $perception = '<div>Perception 00</div>';
var $goals = '<div>Goals: </div>';
$gameContainer.append( $factoryEntity, '<hr>', $quarterYear, $funds, $perception );


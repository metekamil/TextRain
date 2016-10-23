
//globals
var messages = [];
var nextId = 0;
var maxMessage = 1;
var container;
var maxY = 400;
var maxX = $(document).width()-50;

//Initialize the  effect
$(document).ready( function() {
    initialize();
});

//Initialize
function initialize() {

    container = $('body');
    container.css("background-color","blue");

    for(x=0;x<maxMessage;x++) {

        var newMessage = {
            enabled : false,
            y : 0,
            x : Math.random() * maxX,
            speed : (Math.random() * 1) + 2,
            id : 'm' + x,
            selector : '#m' + x
        };
        messages.push(newMessage);

    }

    //Initialize animation
    setInterval(animateMessages,1000/60);
    addMessage('foobar1');
    //addMessage('foobar2');
    //addMessage('foobar3');

};

//Initialize a new message
function addMessage(newMessageText) {

    $.each(messages,function(index,m) {
        if (!m.enabled) {

            //Initialize new message document
            m.y = 0;
            m.x = Math.random() * maxX;
            m.speed = (Math.random() * 1) + 2;
            m.message = newMessageText;
            $(container).append("<div class='TextRain' id='" + m.id + "' >" + m.message + "</div>");

            messages[index] = m;
            m.enabled = true;

            return false;

        }
    });

}

//Animate messsages
function animateMessages()
{
    $.each(messages,function(index,m) {

        if (m.enabled)  {

            if (m.y>maxY) {

                //Terminate
                m.y = 0;
                m.x = Math.random() * maxX;
                m.speed = (Math.random() * 1)+2;
                m.enabled=false;

                messages[index] = m;
                console.log(m.id);
                $(container).remove(m.selector);

                messages[index] = m;

            }
            else {

                //Animate
                m.y = m.y + m.speed;
                messages[index] = m;

                console.log(m.y);

                $(m.selector).css('top',(m.y + 'px'));
                $(m.selector).css('left',(m.x + 'px'));
                $(m.selector).html(m.message);

            }
        }

    });
}
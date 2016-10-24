




//Initialize
function TextRain(containerId) {

    this.maxX = $(document).width()-50;
    this.maxY = $(document).height()-50;

    container = $(containerId);

    //globals
    this.messages = [];
    this.nextId = 0;
    this.maxMessage = 10;
    this.container;

    for(x=0;x<this.maxMessage;x++) {

        var newMessage = {
            enabled : false,
            y : 0,
            x : Math.random() * this.maxX,
            speed : (Math.random() * 1) + 10,
            id : 'm' + x,
            selector : '#m' + x
        };
        this.messages.push(newMessage);

    }

};


//Initialize a new message
TextRain.prototype.addMessage = function(msgText) {

    var that = this;
    var newMessageText = msgText;
    setTimeout(function(){

        $.each(that.messages,function(index,m) {
            console.log('checking', that.messages.length);
            if (!that.messages[index].enabled) {

                console.log('added new message');

                //Initialize new message document
                m.y = 0;
                m.fontsize = 20+(Math.random()*15);
                m.x = Math.random() * that.maxX;
                m.speed = (Math.random() * 1) + 2;
                m.message = newMessageText;
                $(container).append("<div class='TextRain' id='" + m.id + "' >" + m.message + "</div>");
                m.enabled = true;

                that.messages[index] = m;

                return false;

            }
        });

    },Math.random()*1500);

}

TextRain.prototype.startAnimation = function() {
    var that = this;
    this.animateMessages(that);
}

TextRain.prototype.animateMessages = function()
{
    console.log('rendering');
    var that = this;
    $.each(that.messages,function(index,m) {

        if (m.enabled)  {

            if (m.y>this.maxY) {

                m.enabled=false;
                $(m.selector).remove();
                this.messages[index] = m;

            }
            else {

                m.y = m.y + m.speed;
                m.alpha = m.y/that.maxY;

                that.messages[index] = m;

                $(m.selector).css('font-size',m.fontsize + 'px');
                $(m.selector).css('opacity',m.alpha*3);
                $(m.selector).css('top',(m.y + 'px'));
                $(m.selector).css('left',(m.x + 'px'));
                $(m.selector).html(m.message);

            }
        }
    });

    var that = this;
    setTimeout(function() {
         that.animateMessages(), 1000/30
    });

    return false;

}
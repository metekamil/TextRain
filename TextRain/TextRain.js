




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
                m.fontsize = 12+(Math.random()*20);
                m.x = Math.random() * that.maxX;
                m.speed = (Math.random() * 5);
                m.message = newMessageText;
                m.alpha = m.y / that.maxY;
                $(container).append("<div class='TextRain' id='" + m.id + "' >" + m.message + "</div>");
                $(m.selector).css('top',(m.y + 'px'));
                $(m.selector).css('left',(m.x + 'px'));
                m.enabled = true;

                that.messages[index] = m;

                return false;

            }
        });

    },Math.random()*500);

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

                //Update Object
                m.y += + m.speed;
                m.alpha = m.y/that.maxY;

                //Render Object
                $(m.selector).css('top',(m.y + 'px'));
                $(m.selector).css('left',(m.x + 'px'));
                $(m.selector).css('font-size',m.fontsize + 'px');
                $(m.selector).css('opacity',m.alpha*3);
                $(m.selector).html(m.message);

                that.messages[index] = m;


            }
        }
    });

    var that = this;
    setTimeout(function() {
         that.animateMessages(), 1000/30
    });

    return false;

}
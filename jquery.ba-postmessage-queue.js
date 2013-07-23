/**
 * Queue receive callback for add from different place.
 * backward compatibility
 * for apply - replace old call of receiveMessage( to receiveMessageQueue(
 *
 * @param callback
 * @param source_origin
 * @param delay (set only 1 times for queue )
 */
jQuery.receiveMessageQueue = function( callback, source_origin, delay ) {
    if (typeof jQuery.receiveMessageQueue.queue == 'undefined') {
        jQuery.receiveMessageQueue.queue=[];
        jQuery.receiveMessage(function(e){
            for (var i in jQuery.receiveMessageQueue.queue) {
                var source_origin = jQuery.receiveMessageQueue.queue[i].source_origin;
                var callback = jQuery.receiveMessageQueue.queue[i].callback;
                if ( ( typeof source_origin === 'string' && e.origin !== source_origin )
                    || ( $.isFunction( source_origin ) && source_origin( e.origin ) === FALSE ) ) {
                    continue;
                }
                callback( e );
            }
        },null,delay);
    }
    jQuery.receiveMessageQueue.queue.push({
        source_origin: source_origin,
        callback: callback
    });
}
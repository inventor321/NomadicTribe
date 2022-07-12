
export function timer(callback, delay) {
        var id, started, remaining = delay, running

    
        this.start = function() {
            if(remaining>0){
                running = true
                started = new Date()
                id = setTimeout(callback, remaining);
            }
            
        }
    
        this.pause = function() {
            running = false
            clearTimeout(id)
            remaining -= new Date() - started
        }
    
        this.getTimeLeft = function() {
            if (running) {
                this.pause()
                this.start()
            }
    
            return remaining
        }
    
        this.getStateRunning = function() {
            return running
        }
        console.log('Calling start')
        this.start()
    };
    

    export function intervalTimer(callback, delay) {
        var id, started, remaining = delay, running

    
        this.start = function() {
            if(remaining>0){
                running = true
                started = new Date()
                id = setInterval(callback, remaining);
            }
            
        }
    
        this.end = function() {
            clearInterval(id)
        }

        this.start()
    };
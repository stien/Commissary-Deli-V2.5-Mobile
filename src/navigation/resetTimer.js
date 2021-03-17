export const resetTimer = (noty) => {
    console.log('Reset Timer');
    clearInterval(this.timer);
    currSeconds = 0;

    if (noty == false){
    this.timer = setInterval(startIdleTimerNoNOty, 15000);

    } else {
    this.timer = setInterval(startIdleTimer, 15000);
    }
  };
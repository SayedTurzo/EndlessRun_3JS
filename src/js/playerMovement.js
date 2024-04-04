let cube;
let isJumping = false;

const setIsJumping = (value) => {
    isJumping = value;
  };

const setCube = (cubeInstance) => {
  cube = cubeInstance;
};

const keys = {
    a: { pressed: false },
    d: { pressed: false },
    s: { pressed: false },
    w: { pressed: false }
  };

let isTouching = false;
let touchStartX = 0;
let touchStartY = 0;
  
  window.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'KeyA':
        keys.a.pressed = true
        break
      case 'KeyD':
        keys.d.pressed = true
        break
      case 'KeyS':
        keys.s.pressed = true
        break
      case 'KeyW':
        keys.w.pressed = true
        break
      case 'Space':
        if (!isJumping) {
            cube.velocity.y = 0.08;
            isJumping = true; // Set isJumping to true when jumping
          }
        break
    }
  })
  
  window.addEventListener('keyup', (event) => {
    switch (event.code) {
      case 'KeyA':
        keys.a.pressed = false
        break
      case 'KeyD':
        keys.d.pressed = false
        break
      case 'KeyS':
        keys.s.pressed = false
        break
      case 'KeyW':
        keys.w.pressed = false
        break
    }
  })


  const handleTouchStart = (event) => {
    isTouching = true;
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
};

const handleTouchEnd = (event) => {
    isTouching = false;
    // Reset movement keys
    keys.a.pressed = false;
    keys.d.pressed = false;
    keys.w.pressed = false;
    keys.s.pressed = false;


    // Check if there was a tap gesture
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
        // If the movement is negligible, consider it a tap
        // Trigger jump
        if (!isJumping) {
            cube.velocity.y = 0.08;
            isJumping = true;
        }
    }
};

const handleTouchMove = (event) => {
    if (isTouching) {
        const touchEndX = event.touches[0].clientX;
        const touchEndY = event.touches[0].clientY;
        const dx = touchEndX - touchStartX;
        const dy = touchEndY - touchStartY;

        if (Math.abs(dx) > Math.abs(dy)) {
            // Horizontal swipe
            if (dx > 0) {
                // Swipe right
                keys.d.pressed = true;
            } else {
                // Swipe left
                keys.a.pressed = true;
            }
        } else {
            // Vertical swipe
            if (dy > 0) {
                // Swipe down
                keys.s.pressed = true;
            } else {
                // Swipe up
                keys.w.pressed = true;
            }
        }
    }
};

window.addEventListener('touchstart', handleTouchStart);
window.addEventListener('touchend', handleTouchEnd);
window.addEventListener('touchmove', handleTouchMove);

  
export { keys, setCube , setIsJumping }; // Export setCube function
  
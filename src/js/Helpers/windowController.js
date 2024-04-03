export function setupWindowResizeListener(sizes, camera, renderer, render) {
    window.addEventListener("resize", () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        renderer.setSize(sizes.width, sizes.height);
        render();
    });
}

// Function to handle full-screen on double click
export function setupFullscreenOnDoubleClick(canvas) {
    window.addEventListener("dblclick", () => {
        if (!document.fullscreenElement) {
            canvas.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });
}

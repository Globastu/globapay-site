// Cobe Globe Visualization for Globapay
// Using dynamic import to handle ES modules

class GlobeVisualization {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = null;
        this.globe = null;
        this.phi = 0;
        
        // Globapay brand colors optimized for bright background
        this.colors = {
            primary: '#7ED321',     // Main green
            dark: '#025b42',        // Dark green
            secondary: '#2D5A3D',   // Teal
            light: '#A8E063',       // Light green
            dots: '#2D5A3D',        // Dark dots for contrast
            glow: '#7ED321'         // Glow effect
        };
        
        this.init();
    }
    
    async init() {
        this.createCanvas();
        await this.createGlobe();
        this.handleResize();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.display = 'block';
        this.container.appendChild(this.canvas);
    }
    
    async createGlobe() {
        const { default: createGlobe } = await import('https://cdn.skypack.dev/cobe');
        this.globe = createGlobe(this.canvas, {
            devicePixelRatio: 2,
            width: this.container.offsetWidth * 2,
            height: this.container.offsetHeight * 2,
            phi: 0,
            theta: 0.3,
            dark: 0, // Bright mode
            diffuse: 0.8,
            mapSamples: 20000,
            mapBrightness: 1.5,
            baseColor: [1, 1, 1], // White base
            markerColor: [126/255, 211/255, 33/255], // Globapay green markers
            glowColor: [0.7, 0.7, 0.7], // Subtle gray glow
            opacity: 0.78, // 78% opacity
            markers: [
                // Major financial centers
                { location: [40.7128, -74.0060], size: 0.05 }, // New York
                { location: [51.5074, -0.1278], size: 0.05 },  // London
                { location: [1.3521, 103.8198], size: 0.05 },  // Singapore
                { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo
                { location: [22.3193, 114.1694], size: 0.05 }, // Hong Kong
                { location: [-23.5505, -46.6333], size: 0.05 }, // São Paulo
                { location: [19.0760, 72.8777], size: 0.05 },  // Mumbai
                { location: [25.2048, 55.2708], size: 0.05 },  // Dubai
                { location: [50.1109, 8.6821], size: 0.05 },   // Frankfurt
                { location: [-33.8688, 151.2093], size: 0.05 }, // Sydney
                { location: [6.5244, 3.3792], size: 0.05 },    // Lagos
                { location: [19.4326, -99.1332], size: 0.05 }  // Mexico City
            ],
            onRender: (state) => {
                // Auto-rotate
                this.phi += 0.005;
                state.phi = this.phi;
                
                // Pulse markers
                state.markers = state.markers?.map(marker => ({
                    ...marker,
                    size: marker.size * (0.8 + 0.2 * Math.sin(Date.now() * 0.002 + marker.location[0] * 0.1))
                }));
            }
        });
    }
    
    handleResize() {
        const updateSize = () => {
            if (this.canvas && this.container) {
                const width = this.container.offsetWidth;
                const height = this.container.offsetHeight;
                
                // Set canvas size with device pixel ratio
                const dpr = Math.min(window.devicePixelRatio, 2);
                this.canvas.width = width * dpr;
                this.canvas.height = height * dpr;
                
                this.canvas.style.width = width + 'px';
                this.canvas.style.height = height + 'px';
                
                // Update globe size
                if (this.globe) {
                    this.globe.updateSize([width * dpr, height * dpr]);
                }
            }
        };
        
        // Use ResizeObserver for real-time updates
        const resizeObserver = new ResizeObserver(updateSize);
        resizeObserver.observe(this.container);
        
        // Also listen to window resize for good measure
        window.addEventListener('resize', updateSize);
        
        // Initial size update
        setTimeout(updateSize, 100);
    }
    
    destroy() {
        if (this.globe) {
            this.globe.destroy();
        }
        if (this.canvas && this.container.contains(this.canvas)) {
            this.container.removeChild(this.canvas);
        }
    }
}

// Initialize globe when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    if (document.getElementById('globe-canvas')) {
        try {
            const globe = new GlobeVisualization('globe-canvas');
            window.globeViz = globe; // For debugging
            console.log('Globe initialized successfully');
        } catch (error) {
            console.error('Failed to initialize globe:', error);
        }
    }
});
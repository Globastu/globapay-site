// Rive Threat Map Animation for Alt Home Page
class ThreatMapVisualization {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.riveInstance = null;
        this.popupContainer = null;
        this.activePopups = new Set();
        
        // City coordinates for popup positioning (relative to canvas)
        this.cityPositions = [
            { name: 'New York', x: 0.25, y: 0.4 },
            { name: 'London', x: 0.52, y: 0.35 },
            { name: 'Tokyo', x: 0.85, y: 0.45 },
            { name: 'Singapore', x: 0.78, y: 0.65 },
            { name: 'Sydney', x: 0.88, y: 0.8 },
            { name: 'Dubai', x: 0.6, y: 0.55 },
            { name: 'Hong Kong', x: 0.82, y: 0.52 },
            { name: 'Mumbai', x: 0.68, y: 0.58 }
        ];
        
        // Payment data for randomized popups
        this.paymentData = [
            { company: 'Mastercard', amount: '$300', type: 'card' },
            { company: 'Web3', amount: '$10,000', type: 'crypto' },
            { company: 'Visa', amount: '$1,250', type: 'card' },
            { company: 'PayPal', amount: '$875', type: 'digital' },
            { company: 'Stripe', amount: '$2,400', type: 'platform' },
            { company: 'Apple Pay', amount: '$650', type: 'mobile' },
            { company: 'Google Pay', amount: '$920', type: 'mobile' },
            { company: 'Alipay', amount: '$1,800', type: 'digital' },
            { company: 'Bitcoin', amount: '$5,500', type: 'crypto' },
            { company: 'Ethereum', amount: '$3,200', type: 'crypto' },
            { company: 'USDC', amount: '$15,000', type: 'stablecoin' },
            { company: 'Bank Transfer', amount: '$8,900', type: 'bank' }
        ];
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }
    
    init() {
        if (!this.canvas) {
            console.error('Canvas element not found');
            return;
        }
        
        this.setupCanvas();
        this.createPopupContainer();
        this.loadRiveAnimation();
        this.handleResize();
    }
    
    setupCanvas() {
        // Set initial canvas size
        const container = this.canvas.parentElement;
        this.updateCanvasSize();
        
        // Style the canvas
        this.canvas.style.display = 'block';
        this.canvas.style.maxWidth = '100%';
        this.canvas.style.height = 'auto';
    }
    
    loadRiveAnimation() {
        // Check if Rive is available
        if (typeof rive === 'undefined') {
            console.error('Rive library not loaded');
            this.showFallback();
            return;
        }
        
        try {
            this.riveInstance = new rive.Rive({
                src: 'https://public.rive.app/community/runtime-files/18271-34295-animated-threat-map.riv',
                canvas: this.canvas,
                autoplay: true,
                fit: rive.Fit.Cover, // Cover the canvas while maintaining aspect ratio
                alignment: rive.Alignment.Center,
                onLoad: () => {
                    console.log('Threat map animation loaded successfully');
                    this.riveInstance.resizeDrawingSurfaceToCanvas();
                    
                    // Start popup simulation after animation loads
                    this.startPopupSimulation();
                },
                onLoadError: (error) => {
                    console.error('Failed to load Rive animation:', error);
                    this.showFallback();
                },
                onError: (error) => {
                    console.error('Rive animation error:', error);
                    this.showFallback();
                }
            });
        } catch (error) {
            console.error('Error initializing Rive animation:', error);
            this.showFallback();
        }
    }
    
    updateCanvasSize() {
        const container = this.canvas.parentElement;
        const containerWidth = container.offsetWidth;
        
        // Maintain aspect ratio based on original animation (788x320)
        const aspectRatio = 320 / 788;
        const canvasWidth = Math.min(containerWidth, 1000); // Max width of 1000px
        const canvasHeight = canvasWidth * aspectRatio;
        
        this.canvas.width = canvasWidth * window.devicePixelRatio;
        this.canvas.height = canvasHeight * window.devicePixelRatio;
        this.canvas.style.width = `${canvasWidth}px`;
        this.canvas.style.height = `${canvasHeight}px`;
        
        // Update Rive canvas if instance exists
        if (this.riveInstance) {
            this.riveInstance.resizeDrawingSurfaceToCanvas();
        }
    }
    
    handleResize() {
        // Use ResizeObserver for responsive updates
        const resizeObserver = new ResizeObserver(() => {
            this.updateCanvasSize();
        });
        resizeObserver.observe(this.canvas.parentElement);
        
        // Also listen to window resize
        window.addEventListener('resize', () => {
            setTimeout(() => this.updateCanvasSize(), 100);
        });
    }
    
    createPopupContainer() {
        // Create popup container positioned over the canvas
        this.popupContainer = document.createElement('div');
        this.popupContainer.className = 'threat-map-popups';
        this.popupContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 10;
        `;
        
        // Insert popup container after canvas
        this.canvas.parentElement.style.position = 'relative';
        this.canvas.parentElement.appendChild(this.popupContainer);
    }
    
    startPopupSimulation() {
        // Simulate arc landings with random intervals
        const showRandomPopup = () => {
            if (this.activePopups.size < 3) { // Limit concurrent popups
                const city = this.cityPositions[Math.floor(Math.random() * this.cityPositions.length)];
                const payment = this.paymentData[Math.floor(Math.random() * this.paymentData.length)];
                this.showPopup(city, payment);
            }
            
            // Schedule next popup with random delay (2-8 seconds)
            const delay = 2000 + Math.random() * 6000;
            setTimeout(showRandomPopup, delay);
        };
        
        // Start first popup after short delay
        setTimeout(showRandomPopup, 1000);
    }
    
    showPopup(city, payment) {
        const popup = document.createElement('div');
        popup.className = 'payment-popup';
        
        // Calculate position based on canvas size
        const canvasRect = this.canvas.getBoundingClientRect();
        const x = city.x * canvasRect.width;
        const y = city.y * canvasRect.height;
        
        // Style the popup
        popup.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            transform: translate(-50%, -120%);
            background: rgba(255, 255, 255, 0.95);
            border: 2px solid var(--primary-green);
            border-radius: 8px;
            padding: 8px 12px;
            font-size: 12px;
            font-weight: 600;
            color: var(--dark-teal);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: popupAppear 0.3s ease-out;
            backdrop-filter: blur(4px);
            pointer-events: none;
        `;
        
        // Set popup content
        popup.innerHTML = `
            <div style="display: flex; align-items: center; gap: 6px;">
                <span class="payment-company">${payment.company}</span>
                <span class="payment-amount" style="color: var(--primary-green);">${payment.amount}</span>
            </div>
        `;
        
        this.popupContainer.appendChild(popup);
        this.activePopups.add(popup);
        
        // Remove popup after delay
        setTimeout(() => {
            popup.style.animation = 'popupDisappear 0.3s ease-in forwards';
            setTimeout(() => {
                if (this.popupContainer.contains(popup)) {
                    this.popupContainer.removeChild(popup);
                }
                this.activePopups.delete(popup);
            }, 300);
        }, 3000); // Show for 3 seconds
    }
    
    showFallback() {
        // Show a fallback if Rive animation fails to load
        const ctx = this.canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            ctx.fillStyle = '#666';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(
                'Global Threat Map Loading...', 
                this.canvas.width / 2, 
                this.canvas.height / 2
            );
        }
    }
    
    destroy() {
        if (this.riveInstance) {
            this.riveInstance.cleanup();
            this.riveInstance = null;
        }
        
        // Clean up popup container
        if (this.popupContainer && this.popupContainer.parentElement) {
            this.popupContainer.parentElement.removeChild(this.popupContainer);
            this.popupContainer = null;
        }
        
        this.activePopups.clear();
    }
}

// Initialize the threat map when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const threatMapCanvas = document.getElementById('threat-map-canvas');
    if (threatMapCanvas) {
        window.threatMapViz = new ThreatMapVisualization('threat-map-canvas');
    }
});
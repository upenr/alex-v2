// Initialize your app
var myApp = new Framework7({
animateNavBackIcon: true,
    // Enable templates auto precompilation
    precompileTemplates: true,
    // Enabled pages rendering using Template7
    template7Pages: true,
    // Specify Template7 data for pages
    template7Data: {
        cars: [
            {
                vendor: 'AA3 Volkswagen',
                model: 'Passat',
                power: 153,
                speed: 280,
                weight: 1400,
                color: 'black',
                year: 2012,
                description: 'My car Alex!'
            },
            {
                vendor: 'Skoda',
                model: 'Superb',
                power: 152,
                speed: 260,
                weight: 1600,
                color: 'white',
                year: 2013,
                description: ''
            },
        ]
   }
});


/*  Listeners for Prop and State specifics
-------------------------------------------------- */
var api = require('socket.io-client')('/api')
,   _   = require('lodash');

/*  Listen for socket state events, and push to component if specified on initialState
-------------------------------------------------- */
var listener = {

    componentDidMount: function() {

        var component = this;

        api.on('api', function(object) {

            _.each(component.state, function(state, property) {

                if (object[property]) {

                    component.setState(object);

                }

            });

        });

    },

};

/*  Screen comes into view on the UI. Call components screenMount function
-------------------------------------------------- */
var screenMount = {

    componentDidMount: function() {

        var component = this;

        window.addEventListener("mountView", function(e) {

            if (e.detail.screen == component.props.screen) {

                component.screenMount();

            }
        });

        if (this.screenMount) {
            this.screenMount();
        };

    }
}

/*  Exports
-------------------------------------------------- */
exports.listener    = listener;
exports.screenMount = screenMount;

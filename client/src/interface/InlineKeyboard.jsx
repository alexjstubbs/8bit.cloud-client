/**
 * @jsx React.DOM
 */

var React           = require('react/addons')
,   navigationInit  = require('../js/navigation.init')
,   miniKeyboard    = require('../js/navigation.keyboard');

module.exports = React.createClass({

    getDefaultProps: function() {

    return {
            navable: true,
            navStack: 2,
            input: null,
            form: 'onScreenKeyboard'
        }
    },

    componentDidMount: function() {

        var kb = document.getElementById("KB");

        kb.classList.add("parent");

        var Keyboard = new miniKeyboard.miniKeyboard(kb);

        navigationInit.navigationInit();
       

    },

    render: function() {

        return (

            <div>
          
            </div>              
         
        );
    }
});



